# SCL Aggregator Platform Context

Last updated: 2026-06-12

This document provides a deep dive into the architecture, services, and operational workflows of the SCL Aggregator platform.

## 1. System Vision
The SCL Aggregator is a unified "AI Intelligence Layer" that sits between client applications and various LLM providers. It transforms a fragmented ecosystem of AI APIs into a single, intelligent, and cost-optimized interface.

**Core Value Props:**
- **Dynamic Routing**: Automatically selects the best model for a task (Code vs. Creative vs. Vision).
- **Semantic Caching**: Reduces costs by >30% by serving semantically similar requests from a vector cache.
- **Provider Neutrality**: Swap providers (OpenAI, Anthropic, Google) with zero code changes in the client.
- **Enterprise Controls**: Centralized auth, billing, and usage monitoring.

## 2. Platform Architecture

The platform follows a distributed, microservices-based architecture optimized for low-latency proxying and high-accuracy routing.

### Data Flow
1.  **Request**: Client -> Gateway (Auth check) -> Router.
2.  **Cache Check**: Router -> Cache Service (Semantic lookup).
3.  **Route**: If cache miss, Router selects Provider -> Gateway forwards request.
4.  **Response**: Provider -> Gateway (Log usage) -> Client.

### Service Matrix

| Service | Language | Port | Primary Responsibility |
| :--- | :--- | :--- | :--- |
| **Gateway** | Rust (Axum) | 8080 | Auth, High-speed proxying, Logging |
| **Router** | Python (FastAPI) | 8001 | Intent classification, Model selection |
| **Cache Service** | Python (FastAPI) | 8002 | Semantic vector search (ChromaDB) |
| **Dashboard** | Next.js 14 | 3000 | Usage analytics and API key management |
| **Billing** | Node.js | 8003 | Stripe/Razorpay integration and credit tracking |

---

## 3. Tech Stack & Standards

### Languages & Frameworks
- **Rust**: Used for performance-critical path (Gateway). Uses `Axum` and `Tokio`.
- **Python**: Used for AI-heavy logic (Router, Cache). Uses `FastAPI` and `uv` for dependency management.
- **TypeScript**: Used for Dashboard and Billing.

### Data Persistence
- **ChromaDB**: High-performance vector database for semantic caching.
- **Postgres (Supabase)**: Relational data for users, billing, and usage logs.
- **Redis**: Optional layer for session management (TBD).

### Infrastructure
- **Monorepo Management**: [Turbo](https://turbo.build/) orchestrates builds and tasks.
- **Containerization**: Each service includes a `Dockerfile` for deployment.
- **IaC**: Terraform located in `infra/terraform` targets AWS.

---

## 4. Key Implementation Details

### Semantic Caching (`packages/semantic-cache`)
- Uses `SentenceTransformers` (`all-MiniLM-L6-v2`) to create 384-dimension embeddings.
- Similarity is measured using **Cosine Distance**.
- Default threshold: `0.92`.

### Intelligent Routing (`apps/router`)
- Intent is detected via regex and keyword mapping on the message content.
- Policies:
    - `cost_first`: Min($/1k tokens).
    - `latency_first`: Prefers "fast" latency profiles (e.g., Groq, Haiku).
    - `quality_first`: Prefers high-parameter models (e.g., Opus, GPT-4o).

### Provider Abstraction (`packages/provider-adapters`)
- Uses a unified `ChatProvider` trait in Rust.
- Standardizes input/output formats across OpenAI, Anthropic, and Google.

### SCL Management CLI (`packages/scl-cli`)
- **Language**: Rust
- **Role**: Developer interface for platform interaction.
- **Key Commands**: `run` (streaming), `bench` (comparison), `route` (inspection), `keys` (management), `models` (listing), `cache` (stats), `config` (setup).
- **Configuration**: Stored at `~/.scl/config.toml`.
- **Dependencies**: Uses `clap` for parsing, `tokio` for async networking, `reqwest` for API calls, and custom `ui` module for terminal styling.

---

## 5. Developer Workflow
...
### Prerequisites
- Rust (Stable)
- Python 3.11+ (with `uv` installed)
- Node.js 20+

### Local Development
To start the core platform services:

```bash
# In scl-aggregator root
turbo run dev
```

### Running Tests
- **Rust**: `cargo test`
- **Python**: `uv run pytest` (inside the service directory)

### Service Naming Convention
To avoid collision in monorepo contexts:
- Router app: `router_app`
- Cache app: `cache_app`

## 6. Deployment & CI/CD
- **CI**: GitHub Actions run on every PR to verify Rust builds, Python tests, and Linting.
- **Docker**: Images are built and pushed to AWS ECR.
- **Terraform**: Applied via CI/CD for staging/production updates.
