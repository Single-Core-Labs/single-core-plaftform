use crate::ui;
use anyhow::{anyhow, Context, Result};
use futures_util::StreamExt;
use reqwest::{Client, Response, StatusCode};
use serde::{Deserialize, Serialize};
use std::time::{Duration, Instant};
use tokio::time::sleep;

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

pub async fn run_command(
    config: &crate::Config,
    prompt: String,
    model: Option<String>,
    policy: Option<String>,
    no_stream: bool,
    json_output: bool, // Renamed 'json' to 'json_output' to avoid conflict with `json()` method
) -> Result<()> {
    // 1. Config Check
    let api_key = config.api_key.as_ref().context("API key not configured")?;
    let gateway_url = &config.gateway_url;

    // 2. Request setup
    let client = Client::new();
    let start_time = Instant::now();
    let spinner = if !json_output { Some(ui::create_spinner("Routing request...")) } else { None };

    let request_body = ChatRequest {
        model,
        prompt: prompt.clone(),
        policy: policy.unwrap_or_else(|| "quality_first".to_string()),
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
                    StatusCode::UNAUTHORIZED => {
                        if let Some(s) = spinner { s.finish_and_clear(); }
                        ui::print_error_box("Authentication Error", "Invalid API key. Run `scl config set api_key <key>`");
                        return Err(anyhow!("Unauthorized"));
                    },
                    StatusCode::TOO_MANY_REQUESTS => {
                        if let Some(s) = spinner { s.finish_and_clear(); }
                        let retry_after = response.headers()
                            .get("Retry-After")
                            .and_then(|v| v.to_str().ok())
                            .and_then(|s| s.parse::<u64>().ok())
                            .unwrap_or(5);
                        ui::print_error_box("Rate Limit Exceeded", &format!("Too many requests. Please try again after {} seconds.", retry_after));
                        return Err(anyhow!("Rate limited"));
                    },
                    StatusCode::SERVICE_UNAVAILABLE => {
                        if retries < MAX_RETRIES {
                            if let Some(s) = spinner.as_ref() { s.set_message(format!("Service unavailable, retrying in {:?}...", backoff)); }
                            sleep(backoff).await;
                            retries += 1;
                            backoff *= 2;
                            continue;
                        } else {
                            if let Some(s) = spinner { s.finish_and_clear(); }
                            ui::print_error_box("Service Unavailable", "The SCL Aggregator is currently unavailable. Please try again later.");
                            return Err(anyhow!("Service unavailable after multiple retries"));
                        }
                    },
                    _ => {
                        if let Some(s) = spinner { s.finish_and_clear(); }
                        let status = response.status();
                        let body = response.text().await.unwrap_or_else(|_| "N/A".to_string());
                        ui::print_error_box("API Error", &format!("Received status {}: {}", status, body));
                        return Err(anyhow!("API Error: Status {}", status));
                    }
                }
            },
            Err(e) => {
                if e.is_timeout() {
                    if let Some(s) = spinner { s.finish_and_clear(); }
                    ui::print_error_box("Request Timeout", "The request timed out. Consider trying with `--policy latency_first`.");
                    return Err(anyhow!("Request timed out"));
                } else if e.is_connect() {
                    if let Some(s) = spinner { s.finish_and_clear(); }
                    ui::print_error_box("Connection Error", &format!("Failed to connect to gateway at {}. Is it running?", gateway_url));
                    return Err(anyhow!("Connection error: {}", e));
                } else {
                    if let Some(s) = spinner { s.finish_and_clear(); }
                    return Err(e).context("Failed to send request to gateway");
                }
            }
        }
    }

    // Extract headers before consuming the response body
    let model_name = response.headers().get("X-SCL-Model").and_then(|v| v.to_str().ok()).map(|s| s.to_string()).unwrap_or_else(|| "unknown".to_string());
    let provider_name = response.headers().get("X-SCL-Provider").and_then(|v| v.to_str().ok()).map(|s| s.to_string()).unwrap_or_else(|| "unknown".to_string());
    let intent_name = response.headers().get("X-SCL-Intent").and_then(|v| v.to_str().ok()).map(|s| s.to_string()).unwrap_or_else(|| "unknown".to_string());
    let cached_str = response.headers().get("X-SCL-Cached").and_then(|v| v.to_str().ok()).map(|s| s.to_string());
    let is_cached = cached_str == Some("true".to_string());
    let estimated_cost = response.headers().get("X-SCL-Est-Cost").and_then(|v| v.to_str().ok()).map(|s| s.to_string()).unwrap_or_else(|| "₹0.00".to_string());
    let actual_cost = response.headers().get("X-SCL-Actual-Cost").and_then(|v| v.to_str().ok()).map(|s| s.to_string()).unwrap_or_else(|| "₹0.00".to_string());


    // 3. Clear spinner and print route card
    if let Some(s) = spinner { s.finish_and_clear(); }

    if !json_output {
        ui::print_route_card(
            &model_name,
            &provider_name,
            &intent_name,
            &request_body.policy,
            is_cached,
            &estimated_cost,
        );
    }

    // 4. Stream or Full Response
    let mut total_tokens = 0;

    if no_stream {
        let body = response.text().await?;
        if json_output {
            println!("{}", body);
        } else {
            print!("{}", body); // Use print! instead of println! for consistency before footer
            total_tokens = body.split_whitespace().count() as u64; // Crude token count
        }
    } else {
        let mut stream = response.bytes_stream();
        while let Some(item) = stream.next().await {
            let bytes = item?;
            let sse_event = String::from_utf8_lossy(&bytes);

            // Each chunk might contain multiple SSE events or partial events
            for line in sse_event.lines() {
                if line.starts_with("data: ") {
                    let json_str = &line["data: ".len()..];
                    if json_output {
                        // If json_output is true, print raw JSON chunk
                        println!("{}", json_str);
                    } else {
                        // Parse JSON to extract delta.content
                        if let Ok(value) = serde_json::from_str::<ChatCompletionChunk>(json_str) {
                            if let Some(content) = value.choices.first().and_then(|c| c.delta.content.as_ref()) {
                                print!("{}", content);
                                std::io::Write::flush(&mut std::io::stdout())?;
                                total_tokens += content.split_whitespace().count() as u64; // Crude token count
                            }
                        }
                    }
                }
            }
        }
        if !json_output {
            println!(); // Newline after streaming content
        }
    }

    // 5. Footer
    if !json_output {
        let latency = start_time.elapsed().as_millis();
        let cache_savings = if is_cached { "100%" } else { "0%" }; // Placeholder for actual savings calculation
        ui::print_footer(total_tokens, latency, &actual_cost, cache_savings);
    }

    Ok(())
}
