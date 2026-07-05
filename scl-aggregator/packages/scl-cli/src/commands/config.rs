use crate::ui;
use anyhow::{Context, Result};
use std::fs;
use std::io::{self, Write};
use std::path::PathBuf;

/// Extended config struct with all supported keys.
/// Note: The canonical Config struct lives in main.rs;
/// this module provides the command handlers for `scl config`.

fn get_config_path() -> Result<PathBuf> {
    let proj_dirs = directories::ProjectDirs::from("com", "singlecorelabs", "scl")
        .context("Could not find home directory")?;
    let config_dir = proj_dirs.config_dir();
    fs::create_dir_all(config_dir)?;
    Ok(config_dir.join("config.toml"))
}

fn mask_api_key(key: &str) -> String {
    if key.len() <= 8 {
        return "****".to_string();
    }
    let prefix = &key[..6];
    let suffix = &key[key.len() - 4..];
    format!("{}...{}", prefix, suffix)
}

pub fn config_set_command(config: &mut crate::Config, key: &str, value: &str) -> Result<()> {
    match key {
        "gateway_url" => {
            config.gateway_url = value.to_string();
            println!("  {}  {} = {}", ui::success("✓"), ui::muted("gateway_url"), ui::primary(value));
        }
        "api_key" => {
            config.api_key = Some(value.to_string());
            println!(
                "  {}  {} = {}",
                ui::success("✓"),
                ui::muted("api_key"),
                ui::primary(&mask_api_key(value))
            );
        }
        "default_policy" => {
            let valid = ["quality_first", "cost_first", "latency_first"];
            if !valid.contains(&value) {
                ui::print_error_box(
                    "Invalid policy",
                    &format!("Must be one of: {}", valid.join(", ")),
                );
                return Ok(());
            }
            config.default_policy = Some(value.to_string());
            println!("  {}  {} = {}", ui::success("✓"), ui::muted("default_policy"), ui::primary(value));
        }
        "default_model" => {
            config.default_model = Some(value.to_string());
            println!("  {}  {} = {}", ui::success("✓"), ui::muted("default_model"), ui::primary(value));
        }
        "output_format" => {
            let valid = ["text", "json"];
            if !valid.contains(&value) {
                ui::print_error_box(
                    "Invalid format",
                    &format!("Must be one of: {}", valid.join(", ")),
                );
                return Ok(());
            }
            config.output_format = Some(value.to_string());
            println!("  {}  {} = {}", ui::success("✓"), ui::muted("output_format"), ui::primary(value));
        }
        _ => {
            ui::print_error_box(
                "Unknown config key",
                &format!(
                    "Valid keys: gateway_url, api_key, default_policy, default_model, output_format"
                ),
            );
            return Ok(());
        }
    }

    // Save updated config
    let path = get_config_path()?;
    let content = toml::to_string(config)?;
    fs::write(path, content)?;

    Ok(())
}

pub fn config_get_command(config: &crate::Config, key: &str) -> Result<()> {
    let value = match key {
        "gateway_url" => Some(config.gateway_url.clone()),
        "api_key" => config.api_key.as_ref().map(|k| mask_api_key(k)),
        "default_policy" => config.default_policy.clone(),
        "default_model" => config.default_model.clone(),
        "output_format" => config.output_format.clone(),
        _ => {
            ui::print_error_box(
                "Unknown config key",
                "Valid keys: gateway_url, api_key, default_policy, default_model, output_format",
            );
            return Ok(());
        }
    };

    match value {
        Some(v) => println!("  {} = {}", ui::muted(key), ui::primary(&v)),
        None => println!("  {} = {}", ui::muted(key), ui::muted("(not set)")),
    }

    Ok(())
}

pub fn config_list_command(config: &crate::Config) -> Result<()> {
    println!();
    println!("  {}", ui::primary("SCL Configuration"));
    println!("  {}", ui::muted(&"─".repeat(40)));

    let entries: Vec<(&str, Option<String>)> = vec![
        ("gateway_url", Some(config.gateway_url.clone())),
        (
            "api_key",
            config.api_key.as_ref().map(|k| mask_api_key(k)),
        ),
        ("default_policy", config.default_policy.clone()),
        ("default_model", config.default_model.clone()),
        ("output_format", config.output_format.clone()),
    ];

    for (key, value) in entries {
        match value {
            Some(v) => println!("  {:<18} {}", ui::muted(key), ui::primary(&v)),
            None => println!("  {:<18} {}", ui::muted(key), ui::muted("(not set)")),
        }
    }

    println!();

    let path = get_config_path()?;
    println!("  {}", ui::muted(&format!("config file: {}", path.display())));
    println!();

    Ok(())
}

pub fn config_reset_command() -> Result<()> {
    print!(
        "  {}  Delete config and reset all settings? [y/N] ",
        ui::warning("⚠")
    );
    io::stdout().flush()?;

    let mut input = String::new();
    io::stdin().read_line(&mut input)?;
    let input = input.trim().to_lowercase();

    if input != "y" && input != "yes" {
        println!("  {}", ui::muted("Cancelled."));
        return Ok(());
    }

    let path = get_config_path()?;
    if path.exists() {
        fs::remove_file(&path)?;
        println!("  {}  Config reset. Run `scl config set` to reconfigure.", ui::success("✓"));
    } else {
        println!("  {}", ui::muted("No config file found. Nothing to reset."));
    }

    Ok(())
}
