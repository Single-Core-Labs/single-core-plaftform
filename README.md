# Single Core Labs

**AI Infrastructure Platform — Marketing Website & SCL Aggregator**

Unified monorepo for Single Core Labs' high-performance marketing site and the distributed backend platform for intelligent LLM routing, semantic caching, and multi-provider abstraction.

---

## Architecture

```
single-core-platform
├── src/                    # Marketing website (React 19, Vite 8, Tailwind v4)
├── scripts/                # Build, prerender, and sitemap generation
├── public/                 # Static assets
└── scl-aggregator/         # Backend monorepo (Turborepo)
    ├── apps/
    │   ├── gateway/        # Rust Axum API gateway
    │   ├── router/         # Python FastAPI routing engine
    │   ├── cache/          # Python FastAPI semantic cache (ChromaDB)
    │   ├── dashboard/      # Next.js 14 admin dashboard
    │   └── billing/        # Node.js/TS billing service (Stripe, Razorpay)
    ├── packages/
    │   ├── provider-adapters/  # Rust provider traits (OpenAI, Anthropic, etc.)
    │   ├── semantic-cache/     # Python vector search library
    │   └── scl-cli/            # Rust CLI (route cards, benchmark, cache inspect)
    └── infra/              # Terraform (AWS — VPC, ECS, RDS, Redis, ALB)
```

---

## Marketing Website

SEO-optimized landing and product pages with smooth scroll, Framer Motion animations, and Puppeteer-based prerendering.

**Stack:** React 19, Vite 8, Tailwind CSS v4, Framer Motion 12, Lenis, Supabase

```bash
npm install
npm run dev
```

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build + generate sitemap + prerender |
| `npm run lint` | ESLint check |
| `npm run ci` | Lint + build |

---

## SCL Aggregator

Polyglot AI infrastructure platform — routes LLM requests through intelligent provider selection, semantic caching, and usage-based billing.

**Services:**

| Service | Language | Role |
|---------|----------|------|
| Gateway | Rust (Axum) | Auth, rate limiting, SSE streaming |
| Router | Python (FastAPI) | Intent classification, model selection |
| Cache | Python (ChromaDB) | Semantic response caching |
| Dashboard | Next.js 14 | API key management, usage analytics |
| Billing | Node.js/TS | Credit system, Stripe & Razorpay |

```bash
cd scl-aggregator
npm install
turbo run dev
```

---

## Requirements

- **Node.js** 20+ (`.nvmrc`)
- **npm** 10+
- **Rust** (for Gateway, Provider Adapters, CLI)
- **Python** 3.11+ (for Router, Cache)
- **Docker** (for local stack via `scl-aggregator/docker-compose.yml`)

---

## Documentation

| Document | Contents |
|----------|----------|
| [PLATFORM_ENGINEERING.md](./PLATFORM_ENGINEERING.md) | Engineering standards, security, integrations |
| [context.md](./context.md) | Full codebase orientation |
| [scl-aggregator/context.md](./scl-aggregator/context.md) | Backend services deep dive |

---

© 2026 Single Core Labs. All rights reserved.
