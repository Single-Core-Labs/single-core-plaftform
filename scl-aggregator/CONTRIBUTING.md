# Contributing to SCL Model Aggregator

Welcome! This guide will help you set up your local development environment to contribute to the Single Core Labs Model Aggregator.

## Prerequisites

- **Docker & Docker Compose**: For running the full stack locally.
- **Rust**: For the `scl-cli` and `gateway`. (Install via `rustup`)
- **Python (uv)**: For the `router` and `cache` services. (Install `uv`)
- **Node.js**: For `billing` and `dashboard`. (v22+)

## Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Single-Core-Labs/scl-aggregator.git
   cd scl-aggregator
   ```

2. **Configure Environment Variables:**
   Copy the example environment file and fill in your API keys (like Anthropic, OpenAI, etc., if you want to test routing to them).
   ```bash
   cp .env.example .env
   ```

3. **Start the Stack:**
   We use `docker-compose` to run the Gateway, Router, Cache, Billing, Dashboard, Postgres, Redis, and ChromaDB together.
   ```bash
   make dev
   ```
   *This is equivalent to `docker-compose up`.*

4. **Initialize the Database (Billing Service):**
   While the stack is running, apply the Prisma migrations to set up the Postgres tables:
   ```bash
   make migrate
   ```

## Development Workflow

### Useful Make Commands

- `make build` : Builds all Docker images for the stack.
- `make dev` : Starts all services locally in the foreground.
- `make logs` : Tails the logs of all running Docker services.
- `make test` : Runs all test suites across Rust, Python, and Node.js.
- `make lint` : Runs linters (`clippy`, `ruff`, `eslint`) across the codebase.
- `make clean` : Tears down the Docker compose environment and wipes volumes (DB/Cache data).

### Working on the CLI (`scl-cli`)

The CLI is written in Rust. You can build and install it locally without Docker:

```bash
make install-cli
```
*Note: This will install the `scl` binary to your path (e.g. `/usr/local/bin` or `~/.cargo/bin`).*

To test CLI commands against your local stack:
```bash
scl config set gateway_url http://localhost:8000
scl run "Hello world"
```

## Repository Structure

- `apps/gateway`: High-performance Rust API gateway.
- `apps/router`: Python semantic router.
- `apps/cache`: Python semantic caching layer using ChromaDB.
- `apps/billing`: Node.js Express billing service with Prisma/Postgres.
- `apps/dashboard`: Next.js web dashboard.
- `packages/scl-cli`: The `scl` command-line tool.
- `packages/semantic-cache`: Shared Python semantic cache utilities.

## Pull Requests

1. Create a branch from `main` (`feature/your-feature`).
2. Make your changes.
3. Ensure `make lint` and `make test` pass.
4. Open a PR with a clear description of the problem and your solution.
