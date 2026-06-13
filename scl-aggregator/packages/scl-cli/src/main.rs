mod ui;
mod commands;

use clap::{Parser, Subcommand};
use std::fs;
use std::path::PathBuf;
use serde::{Deserialize, Serialize};
use directories::ProjectDirs;
use anyhow::{Context, Result};

#[derive(Serialize, Deserialize, Debug)]
pub struct Config {
    pub gateway_url: String,
    pub api_key: Option<String>,
}

impl Default for Config {
    fn default() -> Self {
        Self {
            gateway_url: "http://localhost:8080".to_string(),
            api_key: None,
        }
    }
}

#[derive(Parser)]
#[command(name = "scl")]
#[command(about = "SCL CLI for interacting with the SCL Aggregator", long_about = None)]
struct Cli {
    #[command(subcommand)]
    command: Commands,
}

#[derive(Subcommand)]
enum Commands {
    Run {
        prompt: String,
        #[arg(short, long)]
        model: Option<String>,
        #[arg(short, long)]
        policy: Option<String>,
        #[arg(long)]
        no_stream: bool,
        #[arg(long)]
        json: bool,
    },
    Bench {
        prompt: String,
        #[arg(short, long, value_delimiter = ',')]
        models: Vec<String>,
    },
    Route {
        #[command(subcommand)]
        action: RouteAction,
    },
    Keys {
        #[command(subcommand)]
        action: KeysAction,
    },
    Models,
    Cache {
        #[command(subcommand)]
        action: CacheAction,
    },
    Config {
        #[command(subcommand)]
        action: ConfigAction,
    },
}

#[derive(Subcommand)]
enum RouteAction {
    Inspect { prompt: String },
}

#[derive(Subcommand)]
enum KeysAction {
    List,
    Create { #[arg(short, long)] name: String },
    Revoke { id: String },
}

#[derive(Subcommand)]
enum CacheAction {
    Stats,
}

#[derive(Subcommand)]
enum ConfigAction {
    Set { key: String, value: String },
}

fn get_config_path() -> Result<PathBuf> {
    let proj_dirs = ProjectDirs::from("com", "singlecorelabs", "scl")
        .context("Could not find home directory")?;
    let config_dir = proj_dirs.config_dir();
    fs::create_dir_all(config_dir)?;
    Ok(config_dir.join("config.toml"))
}

fn load_config() -> Result<Config> {
    let path = get_config_path()?;
    if !path.exists() {
        return Ok(Config::default());
    }
    let content = fs::read_to_string(path)?;
    Ok(toml::from_str(&content)?)
}

fn save_config(config: &Config) -> Result<()> {
    let path = get_config_path()?;
    let content = toml::to_string(config)?;
    fs::write(path, content)?;
    Ok(())
}

#[tokio::main]
async fn main() -> Result<()> {
    let cli = Cli::parse();
    let config = load_config()?;

    match cli.command {
        Commands::Config { action } => match action {
            ConfigAction::Set { key, value } => {
                let mut config = config;
                match key.as_str() {
                    "gateway_url" => config.gateway_url = value,
                    "api_key" => config.api_key = Some(value),
                    _ => println!("Unknown config key: {}", key),
                }
                save_config(&config)?;
                println!("Config updated.");
            }
        },
        Commands::Run { prompt, model, policy, no_stream, json } => {
            commands::run::run_command(&config, prompt, model, policy, no_stream, json).await?;
        }
        Commands::Models => {
            ui::render_table(
                vec!["Model".to_string(), "Provider".to_string(), "Price".to_string()],
                vec![
                    vec!["gpt-4o".to_string(), "OpenAI".to_string(), "₹0.01".to_string()],
                    vec!["claude-3-opus".to_string(), "Anthropic".to_string(), "₹0.02".to_string()],
                ]
            );
        }
        _ => println!("Command not yet implemented"),
    }
    Ok(())
}
