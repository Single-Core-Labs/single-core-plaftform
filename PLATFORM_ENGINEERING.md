# SCL Platform Engineering Documentation

This document outlines the engineering standards, architectural patterns, and integration guidelines for the Single Core Labs (SCL) ecosystem.

## 1. Architectural Philosophy

The SCL platform is built on the principles of **Performance, Observability, and Scalability**. We utilize a polyglot microservices architecture where the choice of language is driven by the specific requirements of each service.

- **Rust**: High-performance networking and proxying (Gateway).
- **Python**: Machine learning, vector search, and complex routing logic.
- **TypeScript/Next.js**: User interfaces and developer dashboards.

## 2. Service Integration Standards

### API Design
- **RESTful**: All internal and external services communicate via REST/HTTP.
- **Payload Format**: Strictly JSON (OpenAI-compatible where applicable).
- **Documentation**: All services MUST maintain an up-to-date `openapi.yaml` or provide `/docs` (FastAPI).

### Cross-Service Authentication
1. **Client -> Gateway**: Bearer Token (API Key).
2. **Gateway -> Internal Services**: Mutual TLS (mTLS) in production; Shared Secret + Service Header in development.

## 3. Data Engineering & Storage

### Relational Data (Postgres/Supabase)
- **Source of Truth**: User accounts, billing, usage quotas, and audit logs.
- **Migration Policy**: All schema changes must be versioned migrations in the `supabase/migrations` folder.

### Vector Data (ChromaDB)
- **Usage**: Semantic caching of prompt-response pairs.
- **Index**: HNSW (Hierarchical Navigable Small World) for fast nearest-neighbor search.

## 4. Security Framework

### Key Management
- API Keys are stored hashed in the database.
- The `scl_` prefix is mandatory for all user-facing keys.
- Secret rotation is handled via the SCL Dashboard.

### Data Privacy
- PII (Personally Identifiable Information) must be scrubbed before logging to external observers.
- Semantic cache only stores hashed or anonymized representations where possible.

## 5. Deployment & Observability

### Infrastructure as Code (IaC)
- **Terraform**: All AWS resources (ECR, ECS, RDS) are defined in `scl-aggregator/infra/terraform`.
- No manual infrastructure changes are permitted in staging or production.

### Monitoring Stack
- **Logging**: Structured JSON logging across all services.
- **Tracing**: OpenTelemetry (OTel) for distributed tracing across Rust and Python services.
- **Metrics**: Prometheus/Grafana for real-time performance monitoring.

## 6. Development Lifecycle

### Branching & PRs
- Feature branches (`feat/`) and bug fixes (`fix/`) are merged via Pull Requests.
- CI/CD pipelines MUST pass (Build, Lint, Test) before merging.

### Quality Assurance
- **Rust**: Mandatory `cargo fmt` and `cargo clippy`.
- **Python**: Mandatory `ruff` linting and `pytest` coverage > 80% for core logic.
- **Frontend**: ESlint and Prettier enforcement.

---
*End of Engineering Docs*
