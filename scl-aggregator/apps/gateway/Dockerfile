# Stage 1: Build the Rust binary
FROM rust:1.77-slim-bullseye AS builder

WORKDIR /usr/src/app

# Create an empty project and copy manifests to cache dependencies
RUN USER=root cargo new gateway
WORKDIR /usr/src/app/gateway

# We need to copy the provider-adapters package since gateway depends on it
COPY Cargo.toml Cargo.lock ./
COPY packages/provider-adapters ../packages/provider-adapters

# Build dependencies
# Note: since gateway is part of a workspace, we copy the root Cargo.toml as well, but for a simple Dockerfile we can just build from apps/gateway context or root.
# Assuming this Dockerfile is run from the root of the monorepo: `docker build -f apps/gateway/Dockerfile .`

COPY apps/gateway/Cargo.toml apps/gateway/Cargo.toml
COPY Cargo.toml Cargo.lock ./

RUN mkdir -p apps/gateway/src && echo "fn main() {}" > apps/gateway/src/main.rs
RUN cargo build --release -p gateway

# Copy the actual source code
COPY apps/gateway/src apps/gateway/src
COPY packages/provider-adapters/src ../packages/provider-adapters/src

# Touch main.rs to ensure cargo rebuilds it
RUN touch apps/gateway/src/main.rs

RUN cargo build --release -p gateway

# Stage 2: Create a minimal runtime image
FROM debian:bullseye-slim

WORKDIR /app

# Install OpenSSL, CA certificates
RUN apt-get update && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

COPY --from=builder /usr/src/app/target/release/gateway /app/gateway

ENV PORT=8000
ENV ROUTER_URL="http://localhost:8001"
ENV LOG_LEVEL="info"

EXPOSE 8000

CMD ["./gateway"]
