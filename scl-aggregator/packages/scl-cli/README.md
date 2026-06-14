# SCL CLI

> The command-line interface for the [Single Core Labs Aggregator](https://singlecorelabs.in) — intelligent LLM routing, semantic caching, and provider abstraction from your terminal.

## Installation

### Quick Install (Linux / macOS)

```bash
curl -fsSL https://raw.githubusercontent.com/Single-Core-Labs/scl-aggregator/main/scripts/install-scl.sh | bash
```

### Build from Source

```bash
cd packages/scl-cli
cargo build --release
# Binary at: ../../target/release/scl
```

### Using Makefile (from monorepo root)

```bash
make build-cli       # Build release binary
make install-cli     # Copy to /usr/local/bin
```

---

## Quick Start

```bash
# 1. Configure
scl config set gateway_url https://api.sclhq.com
scl config set api_key sk-scl-your-key-here

# 2. Run your first prompt
scl run "write a binary search in rust"

# 3. Compare models
scl bench "explain quicksort" --models claude-sonnet-4,gpt-4o,gemini-2.5-flash
```

---

## Commands

### `scl run`

Send a prompt and stream the response.

```bash
scl run "write a binary search in rust"
scl run "explain monads" --model gpt-4o
scl run "summarize this" --policy cost_first
scl run "give me JSON" --json
scl run "full response" --no-stream
```

**Flags:**
| Flag | Description |
|------|-------------|
| `--model, -m` | Override model selection |
| `--policy, -p` | `quality_first` (default), `cost_first`, `latency_first` |
| `--no-stream` | Wait for full response |
| `--json` | Output raw JSON |

---

### `scl bench`

Benchmark multiple models against the same prompt in parallel.

```bash
scl bench "explain quicksort" --models claude-sonnet-4,gpt-4o,gemini-2.5-flash
scl bench "write fizzbuzz" --models claude-sonnet-4,gpt-4o --runs 3
scl bench "hello world" --models claude-sonnet-4,gpt-4o --no-responses
```

**Flags:**
| Flag | Description |
|------|-------------|
| `--models, -m` | Comma-separated model names |
| `--runs, -r` | Number of runs per model (1–5, for averaging) |
| `--no-responses` | Show table only, skip full responses |

---

### `scl route inspect`

Dry-run: see how the router would handle a prompt without calling a provider.

```bash
scl route inspect "write a binary search in rust"
scl route inspect "explain quantum computing" --policy cost_first
```

---

### `scl models`

List available models with pricing and status.

```bash
scl models                          # All models, sorted by cost
scl models --sort latency           # Sort by latency profile
scl models --provider anthropic     # Filter by provider
scl models --search flash           # Search model names
```

**Flags:**
| Flag | Description |
|------|-------------|
| `--provider, -p` | Filter by provider name |
| `--sort, -s` | `cost` (default), `latency`, `context` |
| `--search` | Substring search on model name |

---

### `scl keys`

Manage API keys.

```bash
scl keys list                       # List all keys (masked)
scl keys create --name "my-app"     # Create new key (shown once!)
scl keys revoke <key-id>            # Revoke with confirmation
```

---

### `scl cache stats`

View semantic cache performance.

```bash
scl cache stats
```

Displays: hit rate, entries, avg similarity, tokens saved, cost saved, and top cached intents.

---

### `scl config`

Manage CLI configuration.

```bash
scl config set gateway_url https://api.sclhq.com
scl config set api_key sk-scl-xxxxx
scl config set default_policy quality_first
scl config set default_model claude-sonnet-4
scl config set output_format text

scl config get api_key              # Read a single value
scl config list                     # Show all config
scl config reset                    # Delete config (with confirmation)
```

---

## Configuration Reference

Config file location: `~/.config/singlecorelabs/scl/config.toml` (Linux/macOS) or `%APPDATA%\singlecorelabs\scl\config.toml` (Windows).

```toml
gateway_url = "https://api.sclhq.com"
api_key = "sk-scl-a8f2c4e1b9d3f7a2c5e8b1d4f7a3c6e9"
default_policy = "quality_first"
default_model = "claude-sonnet-4"
output_format = "text"
```

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `gateway_url` | string | `http://localhost:8080` | SCL Gateway endpoint |
| `api_key` | string | — | Your SCL API key |
| `default_policy` | string | `quality_first` | Default routing policy |
| `default_model` | string | — | Default model override |
| `output_format` | string | `text` | Output format: `text` or `json` |

---

## Shell Completions

Shell completions are generated at build time. After building:

### Bash

```bash
# Add to ~/.bashrc
source <(scl completions bash)
# Or copy the generated file:
cp target/release/build/scl-cli-*/out/completions/scl.bash ~/.local/share/bash-completion/completions/scl
```

### Zsh

```bash
# Add to ~/.zshrc
cp target/release/build/scl-cli-*/out/completions/_scl ~/.zsh/completions/_scl
# Then: compinit
```

### Fish

```bash
cp target/release/build/scl-cli-*/out/completions/scl.fish ~/.config/fish/completions/scl.fish
```

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NO_COLOR` | Set to disable colored output (respects [no-color.org](https://no-color.org)) |
| `SCL_GATEWAY_URL` | Override gateway URL (takes precedence over config) |

---

## License

MIT — Single Core Labs
