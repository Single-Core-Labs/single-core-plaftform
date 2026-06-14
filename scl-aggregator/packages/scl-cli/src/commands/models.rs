use crate::ui;
use anyhow::{anyhow, Context, Result};
use clap::Args;
use reqwest::Client;
use serde::Deserialize;
use std::time::Duration;

#[derive(Args)]
pub struct ModelsArgs {
    /// Filter by provider name (e.g. openai, anthropic, google)
    #[arg(short = 'p', long)]
    pub provider: Option<String>,

    /// Sort by: cost, latency, context (default: cost)
    #[arg(short, long, default_value = "cost")]
    pub sort: String,

    /// Search model names by substring
    #[arg(long)]
    pub search: Option<String>,
}

#[derive(Deserialize, Debug, Clone)]
pub struct ModelInfo {
    #[serde(alias = "name")]
    pub model: String,
    pub provider: String,
    #[serde(default = "default_context")]
    pub context_window: String,
    #[serde(default)]
    pub input_cost: f64,
    #[serde(default)]
    pub output_cost: f64,
    #[serde(default = "default_status")]
    pub status: String,
    #[serde(default)]
    pub latency_profile: String,
}

fn default_context() -> String {
    "128k".to_string()
}
fn default_status() -> String {
    "live".to_string()
}

pub async fn models_command(config: &crate::Config, args: ModelsArgs) -> Result<()> {
    let gateway_url = &config.gateway_url;
    let client = Client::new();

    let spinner = ui::create_spinner("Fetching models...");

    let response = client
        .get(format!("{}/models", gateway_url))
        .timeout(Duration::from_secs(10))
        .send()
        .await;

    spinner.finish_and_clear();

    let mut models: Vec<ModelInfo> = match response {
        Ok(resp) => {
            if !resp.status().is_success() {
                let status = resp.status();
                let body = resp.text().await.unwrap_or_else(|_| "N/A".to_string());
                return Err(anyhow!("Failed to fetch models: {} {}", status, body));
            }
            resp.json().await.context("Failed to parse models response")?
        }
        Err(e) => {
            if e.is_connect() {
                ui::print_error_box(
                    "Connection Error",
                    &format!(
                        "Cannot reach gateway at {}. Is it running?",
                        gateway_url
                    ),
                );
                return Err(anyhow!("Connection error"));
            }
            return Err(e).context("Failed to fetch models");
        }
    };

    // Filter by provider
    if let Some(ref provider_filter) = args.provider {
        let filter_lower = provider_filter.to_lowercase();
        models.retain(|m| m.provider.to_lowercase().contains(&filter_lower));
    }

    // Filter by search term
    if let Some(ref search_term) = args.search {
        let search_lower = search_term.to_lowercase();
        models.retain(|m| m.model.to_lowercase().contains(&search_lower));
    }

    // Sort
    match args.sort.as_str() {
        "cost" => models.sort_by(|a, b| a.input_cost.partial_cmp(&b.input_cost).unwrap()),
        "latency" => models.sort_by(|a, b| {
            let order = |s: &str| -> u8 {
                match s {
                    "fast" => 0,
                    "medium" => 1,
                    "slow" => 2,
                    _ => 3,
                }
            };
            order(&a.latency_profile).cmp(&order(&b.latency_profile))
        }),
        "context" => models.sort_by(|a, b| {
            let parse_ctx = |s: &str| -> u64 {
                let s = s.trim().to_lowercase();
                if s.ends_with('m') {
                    s.trim_end_matches('m')
                        .parse::<f64>()
                        .unwrap_or(0.0) as u64
                        * 1_000_000
                } else if s.ends_with('k') {
                    s.trim_end_matches('k')
                        .parse::<f64>()
                        .unwrap_or(0.0) as u64
                        * 1_000
                } else {
                    s.parse::<u64>().unwrap_or(0)
                }
            };
            parse_ctx(&b.context_window).cmp(&parse_ctx(&a.context_window))
        }),
        _ => {}
    }

    // Count unique providers
    let mut providers: Vec<String> = models.iter().map(|m| m.provider.clone()).collect();
    providers.sort();
    providers.dedup();

    // Header summary
    println!();
    println!(
        "  {} · {} · {}",
        ui::primary(&format!("{} models", models.len())),
        ui::muted(&format!("sorted by {}", args.sort)),
        ui::muted(&format!("{} providers", providers.len()))
    );
    println!();

    if models.is_empty() {
        println!("  {}", ui::muted("No models found matching your filters."));
        return Ok(());
    }

    // Table header
    let header = format!(
        "  {:<22} {:<12} {:<10} {:<10} {:<10} {}",
        "model", "provider", "context", "input", "output", "status"
    );
    println!("{}", ui::muted(&header));
    println!(
        "  {}",
        ui::muted(&"─".repeat(78))
    );

    // Table rows
    for m in &models {
        let status_icon = match m.status.as_str() {
            "live" => ui::success("● live"),
            "degraded" => ui::warning("◐ degraded"),
            "down" => ui::error("○ down"),
            _ => ui::muted(&format!("? {}", m.status)),
        };

        println!(
            "  {:<22} {:<12} {:<10} {:<10} {:<10} {}",
            ui::primary(&m.model),
            m.provider,
            m.context_window,
            format!("₹{:.3}", m.input_cost),
            format!("₹{:.3}", m.output_cost),
            status_icon
        );
    }

    println!(
        "  {}",
        ui::muted(&"─".repeat(78))
    );
    println!();

    Ok(())
}
