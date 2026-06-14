use crate::ui;
use anyhow::{anyhow, Context, Result};
use reqwest::Client;
use serde::{Deserialize, Serialize};
use std::io::{self, Write};
use std::time::Duration;

#[derive(Deserialize, Debug)]
pub struct ApiKeyInfo {
    pub name: String,
    pub key: String,
    #[serde(default)]
    pub created: String,
    #[serde(default)]
    pub last_used: String,
    #[serde(default)]
    pub requests: u64,
    #[serde(default)]
    pub spend: f64,
}

#[derive(Serialize)]
struct CreateKeyRequest {
    name: String,
}

#[derive(Deserialize)]
struct CreateKeyResponse {
    key: String,
    name: String,
    id: String,
}

fn mask_key(key: &str) -> String {
    if key.len() <= 8 {
        return "****".to_string();
    }
    let prefix = &key[..3];
    let suffix = &key[key.len() - 4..];
    format!("{}...{}", prefix, suffix)
}

pub async fn keys_list_command(config: &crate::Config) -> Result<()> {
    let api_key = config.api_key.as_ref().context("API key not configured")?;
    let gateway_url = &config.gateway_url;
    let client = Client::new();

    let spinner = ui::create_spinner("Fetching API keys...");

    let response = client
        .get(format!("{}/keys", gateway_url))
        .header("Authorization", format!("Bearer {}", api_key))
        .timeout(Duration::from_secs(10))
        .send()
        .await;

    spinner.finish_and_clear();

    let keys: Vec<ApiKeyInfo> = match response {
        Ok(resp) => {
            if !resp.status().is_success() {
                let status = resp.status();
                let body = resp.text().await.unwrap_or_else(|_| "N/A".to_string());
                return Err(anyhow!("Failed to fetch keys: {} {}", status, body));
            }
            resp.json().await.context("Failed to parse keys response")?
        }
        Err(e) => {
            if e.is_connect() {
                ui::print_error_box(
                    "Connection Error",
                    &format!("Cannot reach gateway at {}.", gateway_url),
                );
                return Err(anyhow!("Connection error"));
            }
            return Err(e).context("Failed to fetch keys");
        }
    };

    if keys.is_empty() {
        println!();
        println!("  {}", ui::muted("No API keys found. Create one with `scl keys create --name <name>`"));
        println!();
        return Ok(());
    }

    println!();
    println!("  {}", ui::primary(&format!("{} API keys", keys.len())));
    println!();

    // Table header
    let header = format!(
        "  {:<16} {:<20} {:<14} {:<14} {:<10} {}",
        "name", "key", "created", "last used", "requests", "spend"
    );
    println!("{}", ui::muted(&header));
    println!(
        "  {}",
        ui::muted(&"─".repeat(86))
    );

    for k in &keys {
        let masked = mask_key(&k.key);
        println!(
            "  {:<16} {:<20} {:<14} {:<14} {:<10} {}",
            ui::primary(&k.name),
            ui::muted(&masked),
            ui::muted(&k.created),
            ui::muted(&k.last_used),
            k.requests,
            format!("₹{:.2}", k.spend)
        );
    }

    println!(
        "  {}",
        ui::muted(&"─".repeat(86))
    );
    println!();

    Ok(())
}

pub async fn keys_create_command(config: &crate::Config, name: String) -> Result<()> {
    let api_key = config.api_key.as_ref().context("API key not configured")?;
    let gateway_url = &config.gateway_url;
    let client = Client::new();

    let spinner = ui::create_spinner("Creating API key...");

    let request_body = CreateKeyRequest { name: name.clone() };

    let response = client
        .post(format!("{}/keys", gateway_url))
        .header("Authorization", format!("Bearer {}", api_key))
        .json(&request_body)
        .timeout(Duration::from_secs(10))
        .send()
        .await;

    spinner.finish_and_clear();

    match response {
        Ok(resp) => {
            if !resp.status().is_success() {
                let status = resp.status();
                let body = resp.text().await.unwrap_or_else(|_| "N/A".to_string());
                return Err(anyhow!("Failed to create key: {} {}", status, body));
            }

            let created: CreateKeyResponse =
                resp.json().await.context("Failed to parse key creation response")?;

            println!();
            println!("  {}  Key created for \"{}\"", ui::success("✓"), ui::primary(&created.name));
            println!();
            println!(
                "  {}  Copy this key now. It will not be shown again.",
                ui::warning("⚠")
            );
            println!("  {}", ui::primary(&created.key));
            println!();
            println!("  {}  {}", ui::muted("id"), ui::muted(&created.id));
            println!();
        }
        Err(e) => {
            if e.is_connect() {
                ui::print_error_box(
                    "Connection Error",
                    &format!("Cannot reach gateway at {}.", gateway_url),
                );
                return Err(anyhow!("Connection error"));
            }
            return Err(e).context("Failed to create key");
        }
    }

    Ok(())
}

pub async fn keys_revoke_command(config: &crate::Config, id: String) -> Result<()> {
    let api_key = config.api_key.as_ref().context("API key not configured")?;
    let gateway_url = &config.gateway_url;
    let client = Client::new();

    // Confirmation prompt
    let masked = mask_key(&id);
    print!(
        "  Revoke {}? This cannot be undone. [y/N] ",
        ui::warning(&masked)
    );
    io::stdout().flush()?;

    let mut input = String::new();
    io::stdin().read_line(&mut input)?;
    let input = input.trim().to_lowercase();

    if input != "y" && input != "yes" {
        println!("  {}", ui::muted("Cancelled."));
        return Ok(());
    }

    let spinner = ui::create_spinner("Revoking key...");

    let response = client
        .delete(format!("{}/keys/{}", gateway_url, id))
        .header("Authorization", format!("Bearer {}", api_key))
        .timeout(Duration::from_secs(10))
        .send()
        .await;

    spinner.finish_and_clear();

    match response {
        Ok(resp) => {
            if !resp.status().is_success() {
                let status = resp.status();
                let body = resp.text().await.unwrap_or_else(|_| "N/A".to_string());
                return Err(anyhow!("Failed to revoke key: {} {}", status, body));
            }
            println!("  {}  Key revoked.", ui::success("✓"));
        }
        Err(e) => {
            if e.is_connect() {
                ui::print_error_box(
                    "Connection Error",
                    &format!("Cannot reach gateway at {}.", gateway_url),
                );
                return Err(anyhow!("Connection error"));
            }
            return Err(e).context("Failed to revoke key");
        }
    }

    Ok(())
}
