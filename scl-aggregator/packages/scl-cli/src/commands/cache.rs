use crate::ui;
use anyhow::{anyhow, Context, Result};
use reqwest::Client;
use serde::Deserialize;
use std::time::Duration;

#[derive(Deserialize, Debug)]
pub struct CacheStats {
    #[serde(default)]
    pub hit_rate: f64,
    #[serde(default)]
    pub entries: u64,
    #[serde(default, rename = "avgSimilarity")]
    pub avg_similarity: f64,
    #[serde(default, rename = "tokensSaved")]
    pub tokens_saved: u64,
    #[serde(default, rename = "costSaved")]
    pub cost_saved: f64,
    #[serde(default, rename = "topIntents")]
    pub top_intents: Vec<IntentStat>,
}

#[derive(Deserialize, Debug)]
pub struct IntentStat {
    pub name: String,
    pub percentage: f64,
}

fn render_bar(percentage: f64, width: usize) -> String {
    let filled = ((percentage / 100.0) * width as f64).round() as usize;
    let empty = width.saturating_sub(filled);
    format!("{}{}", "█".repeat(filled), "░".repeat(empty))
}

fn format_number(n: u64) -> String {
    if n >= 1_000_000 {
        format!("{:.1}M", n as f64 / 1_000_000.0)
    } else if n >= 1_000 {
        format!("{},{:03}", n / 1_000, n % 1_000)
    } else {
        n.to_string()
    }
}

fn format_cost(cost: f64) -> String {
    if cost >= 1_000.0 {
        format!("₹{},{:.0}", cost as u64 / 1_000, cost % 1_000.0)
    } else {
        format!("₹{:.2}", cost)
    }
}

pub async fn cache_stats_command(config: &crate::Config) -> Result<()> {
    let api_key = config.api_key.as_ref();
    let gateway_url = &config.gateway_url;
    let client = Client::new();

    let spinner = ui::create_spinner("Fetching cache statistics...");

    let mut req = client
        .get(format!("{}/cache/stats", gateway_url))
        .timeout(Duration::from_secs(10));

    if let Some(key) = api_key {
        req = req.header("Authorization", format!("Bearer {}", key));
    }

    let response = req.send().await;

    spinner.finish_and_clear();

    let stats: CacheStats = match response {
        Ok(resp) => {
            if !resp.status().is_success() {
                let status = resp.status();
                let body = resp.text().await.unwrap_or_else(|_| "N/A".to_string());
                return Err(anyhow!("Failed to fetch cache stats: {} {}", status, body));
            }
            resp.json()
                .await
                .context("Failed to parse cache stats response")?
        }
        Err(e) => {
            if e.is_connect() {
                ui::print_error_box(
                    "Connection Error",
                    &format!("Cannot reach gateway at {}.", gateway_url),
                );
                return Err(anyhow!("Connection error"));
            }
            return Err(e).context("Failed to fetch cache stats");
        }
    };

    let box_width = 49;

    println!();
    println!(
        "  ╭─ {} {}╮",
        ui::primary("semantic cache"),
        "─".repeat(box_width - 18)
    );
    println!("  │{}│", " ".repeat(box_width - 2));

    // Hit rate with bar
    let hit_bar = render_bar(stats.hit_rate, 20);
    println!(
        "  │   {:<14} {:<8} {}   │",
        ui::muted("hit rate"),
        ui::primary(&format!("{:.1}%", stats.hit_rate)),
        hit_bar
    );

    // Entries
    println!(
        "  │   {:<14} {:<30} │",
        ui::muted("entries"),
        ui::primary(&format_number(stats.entries))
    );

    // Avg similarity
    println!(
        "  │   {:<14} {:<30} │",
        ui::muted("avg sim"),
        ui::primary(&format!("{:.3}", stats.avg_similarity))
    );

    // Tokens saved
    println!(
        "  │   {:<14} {:<30} │",
        ui::muted("tokens saved"),
        ui::primary(&format_number(stats.tokens_saved))
    );

    // Cost saved
    println!(
        "  │   {:<14} {:<30} │",
        ui::muted("cost saved"),
        ui::success(&format_cost(stats.cost_saved))
    );

    println!("  │{}│", " ".repeat(box_width - 2));

    // Top cached intents
    if !stats.top_intents.is_empty() {
        println!(
            "  │   {:<44}│",
            ui::muted("top cached intents")
        );

        for intent in &stats.top_intents {
            let bar = render_bar(intent.percentage, 14);
            println!(
                "  │   {:<14} {:<5} {}  │",
                ui::primary(&intent.name),
                format!("{}%", intent.percentage as u32),
                bar
            );
        }
    }

    println!("  │{}│", " ".repeat(box_width - 2));
    println!("  ╰{}╯", "─".repeat(box_width - 2));
    println!();

    Ok(())
}
