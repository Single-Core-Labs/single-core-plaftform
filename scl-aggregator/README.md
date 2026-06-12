# SCL Model Aggregator

Single Core Labs - Model Aggregator Monorepo.

## Structure
- \pps/gateway\ - Rust (axum) API gateway
- \pps/router\ - Python (FastAPI) intelligent routing service  
- \pps/dashboard\ - Next.js 14 web dashboard
- \pps/billing\ - Node.js billing service (Stripe + Razorpay)
- \packages/provider-adapters\ - shared Rust provider adapter traits
- \packages/semantic-cache\ - Python SemanticCache library
- \packages/scl-cli\ - Rust CLI tool
- \infra/terraform\ - AWS infra
- \docs/\ - OpenAPI specs and markdown docs
