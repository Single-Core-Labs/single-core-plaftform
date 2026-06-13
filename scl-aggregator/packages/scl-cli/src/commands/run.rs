use crate::ui;
use anyhow::{anyhow, Context, Result};
use futures_util::StreamExt;
use reqwest::{Client, Response};
use serde::{Deserialize, Serialize};
use std::time::Instant;

#[derive(Serialize, Deserialize)]
struct ChatRequest {
    model: Option<String>,
    prompt: String,
    policy: String,
}

pub async fn run_command(
    config: &crate::Config,
    prompt: String,
    model: Option<String>,
    policy: Option<String>,
    no_stream: bool,
    json: bool,
) -> Result<()> {
    // 1. Config Check
    if config.api_key.is_none() {
        ui::print_error_box("scl not configured", "Run `scl config set gateway_url <url>`\nRun `scl config set api_key <key>`");
        return Ok(());
    }

    // 2. Request
    let client = Client::new();
    let start = Instant::now();
    let spinner = if !json { Some(ui::create_spinner("Routing request...")) } else { None };

    let request_body = ChatRequest {
        model,
        prompt: prompt.clone(),
        policy: policy.unwrap_or_else(|| "quality_first".to_string()),
    };

    let response = client
        .post(format!("{}/v1/chat/completions", config.gateway_url))
        .header("Authorization", format!("Bearer {}", config.api_key.as_ref().unwrap()))
        .json(&request_body)
        .send()
        .await
        .context("Failed to send request to gateway")?;

    // 3. Handle Headers & UI
    if let Some(s) = spinner { s.finish_and_clear(); }

    if !json {
        let model = response.headers().get("X-SCL-Model").and_then(|v| v.to_str().ok()).unwrap_or("unknown");
        let provider = response.headers().get("X-SCL-Provider").and_then(|v| v.to_str().ok()).unwrap_or("unknown");
        let intent = response.headers().get("X-SCL-Intent").and_then(|v| v.to_str().ok()).unwrap_or("unknown");
        let cached = response.headers().get("X-SCL-Cached").and_then(|v| v.to_str().ok()) == Some("true");
        let cost = response.headers().get("X-SCL-Est-Cost").and_then(|v| v.to_str().ok()).unwrap_or("0.00");
        
        ui::print_route_card(model, provider, intent, &request_body.policy, cached, cost);
    }

    // 4. Stream or Full Response
    if no_stream {
        let body = response.text().await?;
        if json { println!("{}", body); } else { println!("{}", body); }
    } else {
        // Simple mock streaming logic for now
        let mut stream = response.bytes_stream();
        while let Some(item) = stream.next().await {
            let bytes = item?;
            let text = String::from_utf8_lossy(&bytes);
            print!("{}", text);
            std::io::Write::flush(&mut std::io::stdout())?;
        }
        println!();
    }

    // 5. Footer
    if !json {
        let latency = start.elapsed().as_millis();
        ui::print_footer(0, latency, "₹0.00", "0.00");
    }

    Ok(())
}
