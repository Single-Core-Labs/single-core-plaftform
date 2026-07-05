use crate::Config;
use anyhow::{anyhow, Context, Result};
use clap::{Args, value_parser};
use futures_util::future::join_all;
use futures_util::TryStreamExt;
use reqwest::{Client, Response, StatusCode};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::time::{Duration, Instant};
use tokio::time::sleep;

#[derive(Args)]
pub struct BenchArgs {
    pub prompt: String,
    #[arg(short, long, value_delimiter = ',')]
    pub models: Vec<String>,
    #[arg(short, long, default_value = "1", value_parser = value_parser!(u32).range(1..=5))]
    pub runs: u32,
    #[arg(long)]
    pub no_responses: bool,
}

#[derive(Serialize, Deserialize)]
struct ChatRequest {
    model: Option<String>,
    prompt: String,
    policy: String,
}

#[derive(Deserialize)]
struct ChatCompletionChunk {
    choices: Vec<Choice>,
}

#[derive(Deserialize)]
struct Choice {
    delta: Delta,
}

#[derive(Deserialize)]
struct Delta {
    content: Option<String>,
}

pub async fn bench_command(config: &Config, args: BenchArgs) -> Result<()> {
    // 1. Config Check
    let api_key = config.api_key.as_ref().context("API key not configured")?;
    let gateway_url = &config.gateway_url;

    println!("Benchmarking {} models · {} run(s) each", args.models.len(), args.runs);

    let client = Client::new();
    let mut all_model_results: HashMap<String, Vec<BenchRunResult>> = HashMap::new();

    for run_idx in 0..args.runs {
        if args.runs > 1 {
            println!("
--- Run {}/{} ---", run_idx + 1, args.runs);
        }

        let mut tasks = Vec::new();
        for model in &args.models {
            tasks.push(run_benchmark_for_model(
                &client,
                gateway_url,
                api_key,
                &args.prompt,
                model.clone(),
            ));
        }

        let results = join_all(tasks).await;

        for (model_name, result) in args.models.iter().zip(results) {
            all_model_results
                .entry(model_name.clone())
                .or_default()
                .push(result?); // Handle error from run_benchmark_for_model
        }
    }


    // Render table
    println!("
");
    println!("┌──────────────────────┬──────────┬─────────┬────────┬───────────┬──────────────┐");
    println!("│ model                │ provider │ latency │ tokens │ cost      │ winner       │");
    println!("├──────────────────────┼──────────┼─────────┼────────┼───────────┼──────────────┤");
    
    for model_name in &args.models {
        if let Some(results_for_model) = all_model_results.get(model_name) {
            let mut total_latency_ms = 0;
            let mut total_tokens = 0;
            let mut total_cost = 0.0;
            let mut latencies = Vec::new();

            for res in results_for_model {
                total_latency_ms += res.latency_ms;
                total_tokens += res.tokens;
                total_cost += res.cost_value;
                latencies.push(res.latency_ms as f64);
            }

            let avg_latency = total_latency_ms / results_for_model.len() as u128;
            let avg_tokens = total_tokens / results_for_model.len() as u64;
            let avg_cost = total_cost / results_for_model.len() as f64;

            let std_dev_latency = if results_for_model.len() > 1 {
                let mean = latencies.iter().sum::<f64>() / latencies.len() as f64;
                let variance = latencies.iter().map(|&val| (val - mean).powi(2)).sum::<f64>() / (latencies.len() - 1) as f64;
                format!("± {}ms", (variance.sqrt() as u32))
            } else {
                "".to_string()
            };

            let provider_name = results_for_model.first().map(|r| r.provider.clone()).unwrap_or_else(|| "unknown".to_string());
            let winner = ""; // Placeholder for winner logic

            println!(
                "│ {:<20} │ {:<8} │ {:<7} │ {:<6} │ {:<9} │ {:<12} │",
                model_name,
                provider_name,
                format!("{}ms {}", avg_latency, std_dev_latency).trim(),
                avg_tokens,
                format!("₹{:.3}", avg_cost),
                winner
            );
        }
    }

    // Fix the table footer printing (changed '┬' to '┴')
    println!("└──────────────────────┴──────────┴─────────┴────────┴───────────┴──────────────┘");

    // Display full responses
    if !args.no_responses {
        for model_name in &args.models {
            if let Some(results_for_model) = all_model_results.get(model_name) {
                println!("
--- Response for {} ---", model_name);
                for (idx, res) in results_for_model.iter().enumerate() {
                    if args.runs > 1 {
                        println!("--- Run {}/{} ---", idx + 1, args.runs);
                    }
                    println!("{}", res.full_response);
                }
            }
        }
    }

    Ok(())
}

#[derive(Debug)] // Add Debug for easier error handling
struct BenchRunResult {
    provider: String,
    latency_ms: u128,
    tokens: u64,
    cost_value: f64,
    full_response: String,
}

async fn run_benchmark_for_model(
    client: &Client,
    gateway_url: &str,
    api_key: &str,
    prompt: &str,
    model: String,
) -> Result<BenchRunResult> {
    let start = Instant::now();
    let request_body = ChatRequest {
        model: Some(model.clone()),
        prompt: prompt.to_string(),
        policy: "quality_first".to_string(), // Default policy for bench
    };

    let mut response: Response;
    let mut retries = 0;
    const MAX_RETRIES: u32 = 3;
    let mut backoff = Duration::from_secs(1);

    loop {
        let req_builder = client
            .post(format!("{}/v1/chat/completions", gateway_url))
            .header("Authorization", format!("Bearer {}", api_key))
            .json(&request_body)
            .timeout(Duration::from_secs(30)); // Add a request timeout

        let res = req_builder.send().await;

        match res {
            Ok(r) => {
                response = r;
                match response.status() {
                    StatusCode::OK => break, // Success, exit loop
                    StatusCode::UNAUTHORIZED => return Err(anyhow!("Unauthorized API key for model {}", model)),
                    StatusCode::TOO_MANY_REQUESTS => {
                        let retry_after = response.headers()
                            .get("Retry-After")
                            .and_then(|v| v.to_str().ok())
                            .and_then(|s| s.parse::<u64>().ok())
                            .unwrap_or(5);
                        return Err(anyhow!("Rate limit exceeded for model {}. Retry after {}s.", model, retry_after));
                    },
                    StatusCode::SERVICE_UNAVAILABLE => {
                        if retries < MAX_RETRIES {
                            sleep(backoff).await;
                            retries += 1;
                            backoff *= 2;
                            continue;
                        } else {
                            return Err(anyhow!("Service unavailable for model {} after multiple retries", model));
                        }
                    },
                    _ => {
                        let status = response.status();
                        let body = response.text().await.unwrap_or_else(|_| "N/A".to_string());
                        return Err(anyhow!("API Error for model {}: Status {}: {}", model, status, body));
                    }
                }
            },
            Err(e) => {
                if e.is_timeout() {
                    return Err(anyhow!("Request timed out for model {}", model));
                } else if e.is_connect() {
                    return Err(anyhow!("Connection error to gateway for model {}: {}", model, e));
                } else {
                    return Err(e).context(format!("Failed to send request to gateway for model {}", model));
                }
            }
        }
    }

    let provider_name = response.headers().get("X-SCL-Provider").and_then(|v| v.to_str().ok()).map(|s| s.to_string()).unwrap_or_else(|| "unknown".to_string());
    let actual_cost_str = response.headers().get("X-SCL-Actual-Cost").and_then(|v| v.to_str().ok()).map(|s| s.to_string()).unwrap_or_else(|| "₹0.00".to_string());
    let cost_value = actual_cost_str.trim_start_matches('₹').parse::<f64>().unwrap_or(0.0);


    let mut full_response_content = String::new();
    let mut total_tokens = 0;

    let mut stream = response.bytes_stream();
    while let Some(item_result) = stream.try_next().await? {
        let bytes = item_result;
        let sse_event = String::from_utf8_lossy(&bytes);

        for line in sse_event.lines() {
            if line.starts_with("data: ") {
                let json_str = &line["data: ".len()..];
                if let Ok(value) = serde_json::from_str::<ChatCompletionChunk>(json_str) {
                    if let Some(content) = value.choices.first().and_then(|c| c.delta.content.as_ref()) {
                        full_response_content.push_str(content);
                        total_tokens += content.split_whitespace().count() as u64; // Crude token count
                    }
                }
            }
        }
    }

    let duration = start.elapsed();

    Ok(BenchRunResult {
        provider: provider_name,
        latency_ms: duration.as_millis(),
        tokens: total_tokens,
        cost_value,
        full_response: full_response_content,
    })
}