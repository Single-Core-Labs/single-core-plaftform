# Single Core Labs - Codebase Context

Last updated: 2026-06-12

This file is a comprehensive orientation guide for the Single Core Labs codebase, covering both the marketing website and the model aggregator backend services.

## Architecture Overview

The project consists of two primary domains:
1.  **Frontend Website**: A high-performance React-based marketing site for Single Core Labs.
2.  **SCL Aggregator**: A distributed backend system for intelligent LLM routing, semantic caching, and provider abstraction.

## Codebase Structure

```text
.
├── src/                    # React Website Frontend
├── scripts/                # Website build/prerender scripts
├── public/                 # Website static assets
└── scl-aggregator/         # Backend Monorepo (Turbo-managed)
    ├── apps/               # Services
    │   ├── gateway/        # Rust Axum API Gateway
    │   ├── router/         # Python FastAPI Routing Engine
    │   ├── cache/          # Python FastAPI Semantic Cache Service
    │   ├── dashboard/      # Next.js 14 Web Dashboard (App Router, shadcn/ui)
    │   └── billing/        # Node.js Billing Service
    ├── packages/           # Shared Libraries
    │   ├── provider-adapters/ # Rust Provider Traits & Impls
    │   ├── semantic-cache/    # Python Vector Search Library
    │   └── scl-cli/           # Rust Management CLI
    ├── infra/              # Terraform AWS configurations
    └── docs/               # API specs (OpenAPI)
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

The aggregator is a monorepo managed by **Turbo** and **Cargo Workspaces**.

### Core Services

#### API Gateway (`apps/gateway`)
- **Language**: Rust (Axum)
- **Role**: Entry point for LLM requests. Handles authentication, logging, and forwards requests to the Router or directly to providers.
- **Key Files**: `src/main.rs`, `src/proxy.rs`, `src/middleware/auth.rs`.

#### Router (`apps/router`)
- **Language**: Python (FastAPI)
- **Role**: Intelligent model selection based on intent (code, reasoning, vision, etc.) and user policy (cost_first, quality_first, latency_first).
- **Integration**: Calls the Semantic Cache service before selecting a model.
- **Key Files**: `router_app/main.py`, `router_app/routing.py`, `router_app/cache.py`.

#### Semantic Cache Service (`apps/cache`)
- **Language**: Python (FastAPI)
- **Role**: High-performance semantic caching for LLM responses.
- **Backend**: Uses `chromadb` for vector storage and `sentence-transformers` for embeddings.
- **Key Files**: `cache_app/main.py`.

### Shared Packages

#### Provider Adapters (`packages/provider-adapters`)
- **Language**: Rust
- **Role**: Common traits and implementations for different LLM providers (OpenAI, Anthropic, Google, Groq, Together).
- **Key Files**: `src/traits.rs`, `src/providers/*.rs`.

#### Semantic Cache Library (`packages/semantic-cache`)
- **Language**: Python
- **Role**: The core vector-search implementation used by the Cache Service.
- **Key Files**: `src/semantic_cache/cache.py`.

---

## 3. Infrastructure & Tooling

### Development Tools
- **Rust**: Managed via `Cargo`.
- **Python**: Managed via `uv` (preferred) or `pip`.
- **Node.js**: Managed via `npm` and `Turbo`.
- **IaC**: Terraform in `scl-aggregator/infra/terraform`.

### Build & CI/CD
- **Website**: `npm run build` triggers sitemap generation and Puppeteer prerendering.
- **Aggregator**: `turbo build` orchestrates builds across all services.
- **GitHub Actions**: `.github/workflows/ci.yml` handles linting and building for both frontend and backend.

## Important Implementation Notes

- **Domain Consistency**: The website currently uses `https://singlecorelabs.in` for SEO/Sitemap and `https://singlecorelabs.com` in some components. Align to `.in` for production.
- **Environment Variables**:
  - Frontend: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`.
  - Backend: `CACHE_URL`, `DATABASE_URL`, `STRIPE_KEY`, etc.
- **Data Stores**:
  - Website: Supabase (Contact submissions).
  - Cache: ChromaDB (Local persistent storage).
  - Billing/Dashboard: Postgres (via Supabase).

## Editing Checklist

1.  **Adding a Service**: Register it in `scl-aggregator/apps/`, update `turbo.json`, and add to `context.md`.
2.  **Modifying Routing**: Update `router_app/routing.py` and ensure the Gateway is aware of any new endpoints.
3.  **Frontend Changes**: Ensure any new public routes are added to `scripts/sitemap-config.mjs` and `scripts/prerender.mjs`.
