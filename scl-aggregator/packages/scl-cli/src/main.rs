mod commands;
mod ui;

use anyhow::{Context, Result};
use clap::{Parser, Subcommand};
use serde::{Deserialize, Serialize};
use std::fs;
use std::path::PathBuf;
use directories::ProjectDirs;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Config {
    pub gateway_url: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub api_key: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub default_policy: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub default_model: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub output_format: Option<String>,
}

impl Default for Config {
    fn default() -> Self {
        Self {
            gateway_url: "http://localhost:8080".to_string(),
            api_key: None,
            default_policy: None,
            default_model: None,
            output_format: None,
        }
    }
}

#[derive(Parser)]
#[command(name = "scl")]
#[command(version, about = "SCL CLI — The Single Core Labs Aggregator CLI", long_about = None)]
struct Cli {
    #[command(subcommand)]
    command: Commands,
}

#[derive(Subcommand)]
enum Commands {
    /// Send a prompt to the SCL Aggregator and stream the response
    Run {
        /// The prompt to send
        prompt: String,
        /// Override model selection (e.g. claude-sonnet-4, gpt-4o)
        #[arg(short, long)]
        model: Option<String>,
        /// Routing policy: quality_first, cost_first, latency_first
        #[arg(short, long)]
        policy: Option<String>,
        /// Wait for full response instead of streaming
        #[arg(long)]
        no_stream: bool,
        /// Output raw JSON instead of formatted UI
        #[arg(long)]
        json: bool,
    },
    /// Benchmark multiple models against the same prompt
    Bench(commands::bench::BenchArgs),
    /// Route inspection and debugging
    Route {
        #[command(subcommand)]
        action: RouteAction,
    },
    /// Manage API keys
    Keys {
        #[command(subcommand)]
        action: KeysAction,
    },
    /// List available models with pricing and status
    Models(commands::models::ModelsArgs),
    /// View semantic cache statistics
    Cache {
        #[command(subcommand)]
        action: CacheAction,
    },
    /// Manage CLI configuration
    Config {
        #[command(subcommand)]
        action: ConfigAction,
    },
}

#[derive(Subcommand)]
enum RouteAction {
    /// Inspect how the router would handle a prompt (dry-run)
    Inspect(commands::inspect::InspectArgs),
}

#[derive(Subcommand)]
enum KeysAction {
    /// List all API keys
    List,
    /// Create a new API key
    Create {
        /// A human-readable name for the key
        #[arg(short, long)]
        name: String,
    },
    /// Revoke an API key by ID
    Revoke {
        /// The key ID to revoke
        id: String,
    },
}

#[derive(Subcommand)]
enum CacheAction {
    /// Show semantic cache hit rates and savings
    Stats,
}

#[derive(Subcommand)]
enum ConfigAction {
    /// Set a configuration value
    Set {
        /// Config key (gateway_url, api_key, default_policy, default_model, output_format)
        key: String,
        /// Value to set
        value: String,
    },
    /// Get a configuration value
    Get {
        /// Config key to read
        key: String,
    },
    /// List all configuration values
    List,
    /// Reset configuration to defaults
    Reset,
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

#[tokio::main]
async fn main() -> Result<()> {
    let cli = Cli::parse();
    let mut config = load_config()?;

    match cli.command {
        // ── Config ──────────────────────────────────────────
        Commands::Config { action } => match action {
            ConfigAction::Set { key, value } => {
                commands::config::config_set_command(&mut config, &key, &value)?;
            }
            ConfigAction::Get { key } => {
                commands::config::config_get_command(&config, &key)?;
            }
            ConfigAction::List => {
                commands::config::config_list_command(&config)?;
            }
            ConfigAction::Reset => {
                commands::config::config_reset_command()?;
            }
        },

        // ── Run ─────────────────────────────────────────────
        Commands::Run {
            prompt,
            model,
            policy,
            no_stream,
            json,
        } => {
            commands::run::run_command(&config, prompt, model, policy, no_stream, json).await?;
        }

        // ── Bench ───────────────────────────────────────────
        Commands::Bench(args) => {
            commands::bench::bench_command(&config, args).await?;
        }

        // ── Route ───────────────────────────────────────────
        Commands::Route { action } => match action {
            RouteAction::Inspect(args) => {
                commands::inspect::inspect_command(&config, args).await?;
            }
        },

        // ── Models ──────────────────────────────────────────
        Commands::Models(args) => {
            commands::models::models_command(&config, args).await?;
        }

        // ── Keys ────────────────────────────────────────────
        Commands::Keys { action } => match action {
            KeysAction::List => {
                commands::keys::keys_list_command(&config).await?;
            }
            KeysAction::Create { name } => {
                commands::keys::keys_create_command(&config, name).await?;
            }
            KeysAction::Revoke { id } => {
                commands::keys::keys_revoke_command(&config, id).await?;
            }
        },

        // ── Cache ───────────────────────────────────────────
        Commands::Cache { action } => match action {
            CacheAction::Stats => {
                commands::cache::cache_stats_command(&config).await?;
            }
        },
    }

    Ok(())
}
