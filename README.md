# Single Core Labs Ecosystem

Unified repository for Single Core Labs' high-performance marketing website and the **SCL Aggregator** platform.

## 🚀 Overview

This repository is a monorepo that houses two primary domains:

1.  **Marketing Website**: A React-based, SEO-optimized marketing site for Single Core Labs.
2.  **SCL Aggregator**: A distributed AI platform for intelligent LLM routing, semantic caching, and unified provider abstraction.

---

## 🏗️ Architecture & Monorepo Structure

```text
.
├── src/                    # Website: React 19 Frontend
├── scl-aggregator/         # Aggregator: Backend Monorepo (Turbo-managed)
│   ├── apps/               # Services (Gateway, Router, Cache, Dashboard, Billing)
│   ├── packages/           # Shared Libraries (Provider Adapters, Semantic Cache)
│   └── infra/              # Infrastructure as Code (Terraform)
├── scripts/                # Shared build & deployment scripts
└── public/                 # Website static assets
```

For a deep dive into the architecture, see [PLATFORM_ENGINEERING.md](./PLATFORM_ENGINEERING.md) and [context.md](./context.md).

---

## 🌐 Marketing Website

High-performance site built with **React 19**, **Vite 8**, and **Tailwind CSS v4**.

- **Tech Stack**: Framer Motion 12, Lenis Smooth Scroll, Supabase.
- **SEO**: Puppeteer-based prerendering and dynamic sitemap generation.
- **Deployment**: Automated via [Render](https://render.com) (defined in `render.yaml`).

### Quick Start (Website)
```bash
npm install
npm run dev
```

---

## ⚡ SCL Aggregator

A polyglot AI infrastructure platform managed by **Turborepo**.

- **API Gateway**: High-speed Rust (Axum) proxy with unified authentication.
- **Intelligent Router**: Python (FastAPI) engine for dynamic model selection.
- **Semantic Cache**: Vector-based caching using ChromaDB and SentenceTransformers.
- **Web Dashboard**: Next.js 14 dashboard for usage analytics and key management.

### Quick Start (Aggregator)
```bash
cd scl-aggregator
npm install
turbo run dev
```

---

## 🛠️ Development Standards

- **Node.js**: 20+ (managed via `.nvmrc`)
- **Package Manager**: npm 10+
- **Monorepo Tooling**: [Turborepo](https://turbo.build/)
- **Infrastructure**: Terraform (AWS)

### Global Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Starts the marketing website locally |
| `npm run build` | Builds the marketing website + sitemap |
| `npm run ci` | Lint + build check for the website |

For backend commands, navigate to `scl-aggregator` and use `turbo` or `cargo` commands as documented in `scl-aggregator/README.md`.

---

## 📜 Documentation

- **[PLATFORM_ENGINEERING.md](./PLATFORM_ENGINEERING.md)**: Engineering standards, security, and integration guidelines.
- **[context.md](./context.md)**: Comprehensive codebase orientation and architectural mapping.
- **[scl-aggregator/context.md](./scl-aggregator/context.md)**: Deep dive into backend services and AI logic.

---

## 🚢 CI/CD

On every push to `main`, our [GitHub Workflows](.github/workflows/) execute:
- **Website CI**: Build validation, linting, and prerendering.
- **Backend CI**: Rust builds, Python testing, and Docker image validation.

Deployment for the website is handled by **Render**, while the Aggregator services are containerized via **Docker** and deployed to **AWS**.

---
© 2026 Single Core Labs. All rights reserved.
