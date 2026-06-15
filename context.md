# Single Core Labs - Codebase Context

Last updated: 2026-06-14

This file is a comprehensive orientation guide for the Single Core Labs codebase, covering both the marketing website and the model aggregator backend services.

## Architecture Overview

The project consists of two primary domains:

1.  **Frontend Website**: A high-performance React-based marketing site for Single Core Labs.
2.  **SCL Aggregator**: A distributed backend system for intelligent LLM routing, semantic caching, billing, and provider abstraction.

## Codebase Structure

```text
.
├── src/                    # React Website Frontend
├── scripts/                # Website build/prerender scripts
├── public/                 # Website static assets
└── scl-aggregator/         # Backend Monorepo
    ├── apps/               # Services
    │   ├── gateway/        # Rust Axum API Gateway
    │   ├── router/         # Python FastAPI Routing Engine
    │   ├── cache/          # Python FastAPI Semantic Cache Service
    │   ├── dashboard/      # Next.js 14 Web Dashboard (NextAuth, shadcn/ui, Tailwind)
    │   └── billing/        # Node.js/TS Express Billing Service (Prisma, Stripe, Razorpay)
    ├── packages/           # Shared Libraries
    │   ├── provider-adapters/ # Rust Provider Traits & Impls
    │   ├── semantic-cache/    # Python Vector Search Library
    │   └── scl-cli/           # Rust Management CLI (clap, indicatif, bench, config)
    ├── infra/              # Terraform AWS configurations (VPC, ECS, RDS, Redis, ALB)
    ├── docs/               # API specs (OpenAPI - Pending)
    ├── docker-compose.yml  # Local stack configuration
    └── Makefile            # Local development orchestration (dev, build, test, lint, logs)
```

---

## 1. Frontend Website (Root)

### Tech Stack

- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion 12 + Lenis (Smooth Scroll)
- **Deployment**: Render (Static Site) with Puppeteer Prerendering

### Routing & Navigation

- Routes are managed in `src/App.jsx`.
- Navigation data is shared between `src/lib/constants.js` and `src/components/Navbar.jsx`.
- **Key Pages**: Home, Solutions, Enterprise, Research, Blog, Contact.

### Content System

- **Blog**: Metadata in `src/data/blog-posts.json`, content components in `src/content/blog/`.
- **Prerendering**: `scripts/prerender.mjs` generates static HTML for SEO.

---

## 2. SCL Aggregator (Backend)

The aggregator is a high-performance LLM routing platform built as a polyglot microservices monorepo.

### Core Services

#### API Gateway (`apps/gateway`)

- **Language**: Rust (Axum, Tokio)
- **Role**: Entry point for LLM requests. Handles authentication, Redis rate limiting, chunked SSE streaming, and telemetry.

#### Router (`apps/router`)

- **Language**: Python (FastAPI)
- **Role**: Intelligent model selection based on intent classification (e.g. coding, creative) and user policy (cost_first, speed_first).

#### Semantic Cache Service (`apps/cache`)

- **Language**: Python (FastAPI, ChromaDB, sentence-transformers)
- **Role**: High-performance semantic caching for LLM responses using cosine similarity thresholds.

#### Billing Service (`apps/billing`)

- **Language**: Node.js / TypeScript (Express, Prisma, PostgreSQL)
- **Role**: Atomic credit deductions based on token usage. Contains Stripe (USD) and Razorpay (INR) webhook handlers for credit top-ups.

#### Dashboard (`apps/dashboard`)

- **Language**: Next.js 14 (App Router)
- **Role**: User-facing web portal for managing keys and viewing usage. Currently fully scaffolded with Tailwind, shadcn/ui, and NextAuth.js (GitHub/Google).

### Shared Packages

#### Provider Adapters (`packages/provider-adapters`)

- **Language**: Rust
- **Role**: Standardizes LLM provider APIs (OpenAI, Anthropic, Google, Groq, Together).

#### Semantic Cache Library (`packages/semantic-cache`)

- **Language**: Python
- **Role**: Vector-search implementation used by the Cache Service.

#### SCL CLI (`packages/scl-cli`)

- **Language**: Rust (clap, indicatif, colored)
- **Role**: Terminal UI for developers. Features rich route cards, live streaming spinners, concurrent benchmarking (`bench`), and local cache inspection.

---

## 3. Infrastructure & Tooling

### Development Tools

- **Rust**: Managed via `Cargo`.
- **Python**: Managed via `uv`.
- **Node.js**: Managed via `npm`.
- **Docker Compose**: Entire stack runs locally via `make dev`.

### Infrastructure (AWS Terraform)

Located in `scl-aggregator/infra/terraform`.

- **Network**: VPC across 2 AZs, public/private subnets, NAT Gateway.
- **Compute**: ECS Fargate Cluster managing microservices.
- **Data**: RDS PostgreSQL (Billing), ElastiCache Redis (Gateway Auth/Rate Limits).
- **Routing**: ALB with ACM SSL termination routing via Route53.

## Editing Checklist

1.  **Adding a Service**: Register it in `scl-aggregator/apps/`, update `docker-compose.yml`, and add to `context.md`.
2.  **Modifying Routing**: Update `router_app/routing.py` and ensure the Gateway is aware of any new endpoints.
3.  **Frontend Changes**: Ensure any new public routes are added to `scripts/sitemap-config.mjs` and `scripts/prerender.mjs`.
