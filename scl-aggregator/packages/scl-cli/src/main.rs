mod ui;
use clap::{Parser, Subcommand};
use std::fs;
use std::path::PathBuf;
use serde::{Deserialize, Serialize};
use directories::ProjectDirs;
use anyhow::{Context, Result};

#[derive(Serialize, Deserialize, Debug)]
struct Config {
    gateway_url: String,
    api_key: Option<String>,
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
        Commands::Run { prompt, .. } => {
            ui::print_header("scl run");
            let spinner = ui::create_spinner("Routing request...");
            
            // Simulate work
            tokio::time::sleep(std::time::Duration::from_secs(2)).await;
            spinner.finish_and_clear();
            
            ui::print_route_card("claude-sonnet-4", "Anthropic", "code", "quality_first", false, "₹0.042");
            println!("This is a streaming response...");
            ui::print_footer(1842, 241, "₹0.038", "₹0.019");
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
