use std::env;
use std::fs;
use std::path::PathBuf;

// We need to include the CLI definition for shell completion generation.
// Since clap_complete needs the Command definition, we replicate a minimal
// version here. In a real project, you'd factor the CLI struct into a
// shared lib crate; for now we use clap's builder API to mirror the derive.

fn build_cli() -> clap::Command {
    clap::Command::new("scl")
        .version(env!("CARGO_PKG_VERSION"))
        .about("SCL CLI — The Single Core Labs Aggregator CLI")
        .subcommand(
            clap::Command::new("run")
                .about("Send a prompt to the SCL Aggregator and stream the response")
                .arg(clap::Arg::new("prompt").required(true))
                .arg(clap::Arg::new("model").short('m').long("model"))
                .arg(clap::Arg::new("policy").short('p').long("policy"))
                .arg(clap::Arg::new("no-stream").long("no-stream").action(clap::ArgAction::SetTrue))
                .arg(clap::Arg::new("json").long("json").action(clap::ArgAction::SetTrue)),
        )
        .subcommand(
            clap::Command::new("bench")
                .about("Benchmark multiple models against the same prompt")
                .arg(clap::Arg::new("prompt").required(true))
                .arg(clap::Arg::new("models").short('m').long("models").value_delimiter(','))
                .arg(clap::Arg::new("runs").short('r').long("runs").default_value("1"))
                .arg(clap::Arg::new("no-responses").long("no-responses").action(clap::ArgAction::SetTrue)),
        )
        .subcommand(
            clap::Command::new("route")
                .about("Route inspection and debugging")
                .subcommand(
                    clap::Command::new("inspect")
                        .about("Inspect how the router would handle a prompt")
                        .arg(clap::Arg::new("prompt").required(true))
                        .arg(clap::Arg::new("policy").short('p').long("policy")),
                ),
        )
        .subcommand(
            clap::Command::new("models")
                .about("List available models with pricing and status")
                .arg(clap::Arg::new("provider").short('p').long("provider"))
                .arg(clap::Arg::new("sort").short('s').long("sort").default_value("cost"))
                .arg(clap::Arg::new("search").long("search")),
        )
        .subcommand(
            clap::Command::new("keys")
                .about("Manage API keys")
                .subcommand(clap::Command::new("list").about("List all API keys"))
                .subcommand(
                    clap::Command::new("create")
                        .about("Create a new API key")
                        .arg(clap::Arg::new("name").short('n').long("name").required(true)),
                )
                .subcommand(
                    clap::Command::new("revoke")
                        .about("Revoke an API key by ID")
                        .arg(clap::Arg::new("id").required(true)),
                ),
        )
        .subcommand(
            clap::Command::new("cache")
                .about("View semantic cache statistics")
                .subcommand(clap::Command::new("stats").about("Show cache hit rates and savings")),
        )
        .subcommand(
            clap::Command::new("config")
                .about("Manage CLI configuration")
                .subcommand(
                    clap::Command::new("set")
                        .about("Set a configuration value")
                        .arg(clap::Arg::new("key").required(true))
                        .arg(clap::Arg::new("value").required(true)),
                )
                .subcommand(
                    clap::Command::new("get")
                        .about("Get a configuration value")
                        .arg(clap::Arg::new("key").required(true)),
                )
                .subcommand(clap::Command::new("list").about("List all configuration values"))
                .subcommand(clap::Command::new("reset").about("Reset configuration to defaults")),
        )
}

fn main() {
    // Generate shell completions at build time
    let outdir = PathBuf::from(env::var("OUT_DIR").unwrap_or_else(|_| ".".to_string()));
    let completions_dir = outdir.join("completions");
    fs::create_dir_all(&completions_dir).expect("Failed to create completions directory");

    let mut cmd = build_cli();

    for shell in &[
        clap_complete::Shell::Bash,
        clap_complete::Shell::Zsh,
        clap_complete::Shell::Fish,
    ] {
        clap_complete::generate_to(*shell, &mut cmd, "scl", &completions_dir)
            .expect("Failed to generate shell completions");
    }

    println!("cargo:warning=Shell completions generated in {:?}", completions_dir);
}
