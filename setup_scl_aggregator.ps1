$baseDir = "d:\new website\single-core-labs-website\scl-aggregator"
New-Item -ItemType Directory -Force -Path $baseDir

# Create directories
$dirs = @(
    "apps/gateway/src",
    "apps/router/app",
    "apps/dashboard",
    "apps/billing",
    "packages/provider-adapters/src",
    "packages/semantic-cache/semantic_cache",
    "packages/scl-cli/src",
    "infra/terraform",
    "docs"
)

foreach ($dir in $dirs) {
    New-Item -ItemType Directory -Force -Path "$baseDir/$dir" | Out-Null
}

# Root files
Set-Content -Path "$baseDir/.gitignore" -Value @"
# Rust
/target/
**/*.rs.bk

# Python
__pycache__/
*.py[cod]
*$py.class
.venv/
venv/
.env

# Node
node_modules/
dist/
.next/

# Terraform
.terraform/
*.tfstate
*.tfstate.backup

# OS
.DS_Store
Thumbs.db
"@

Set-Content -Path "$baseDir/Cargo.toml" -Value @"
[workspace]
members = [
    "apps/gateway",
    "packages/provider-adapters",
    "packages/scl-cli"
]
resolver = "2"
"@

Set-Content -Path "$baseDir/package.json" -Value @"
{
  "name": "scl-aggregator",
  "private": true,
  "workspaces": [
    "apps/dashboard",
    "apps/billing"
  ],
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "lint": "turbo run lint"
  },
  "devDependencies": {
    "turbo": "latest"
  }
}
"@

Set-Content -Path "$baseDir/turbo.json" -Value @"
{
  "`$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "lint": {},
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
"@

Set-Content -Path "$baseDir/README.md" -Value @"
# SCL Model Aggregator

Single Core Labs - Model Aggregator Monorepo.

## Structure
- \`apps/gateway\` - Rust (axum) API gateway
- \`apps/router\` - Python (FastAPI) intelligent routing service  
- \`apps/dashboard\` - Next.js 14 web dashboard
- \`apps/billing\` - Node.js billing service (Stripe + Razorpay)
- \`packages/provider-adapters\` - shared Rust provider adapter traits
- \`packages/semantic-cache\` - Python SemanticCache library
- \`packages/scl-cli\` - Rust CLI tool
- \`infra/terraform\` - AWS infra
- \`docs/\` - OpenAPI specs and markdown docs
"@

# Apps

# gateway (Rust)
Set-Content -Path "$baseDir/apps/gateway/Cargo.toml" -Value @"
[package]
name = "gateway"
version = "0.1.0"
edition = "2021"

[dependencies]
axum = "0.7"
tokio = { version = "1", features = ["full"] }
provider-adapters = { path = "../../packages/provider-adapters" }
"@
Set-Content -Path "$baseDir/apps/gateway/src/main.rs" -Value @"
fn main() {
    println!("Gateway starting...");
}
"@
Set-Content -Path "$baseDir/apps/gateway/README.md" -Value "# Gateway`nRust (axum) API gateway"

# router (Python)
Set-Content -Path "$baseDir/apps/router/pyproject.toml" -Value @"
[project]
name = "router"
version = "0.1.0"
description = "Python (FastAPI) intelligent routing service"
dependencies = [
    "fastapi",
    "uvicorn",
    "semantic-cache"
]

[tool.setuptools.packages.find]
where = ["."]
"@
Set-Content -Path "$baseDir/apps/router/app/main.py" -Value @"
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "Router"}
"@
Set-Content -Path "$baseDir/apps/router/README.md" -Value "# Router`nPython (FastAPI) intelligent routing service"

# dashboard (Next.js Node)
Set-Content -Path "$baseDir/apps/dashboard/package.json" -Value @"
{
  "name": "dashboard",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.x",
    "react": "^18",
    "react-dom": "^18"
  }
}
"@
Set-Content -Path "$baseDir/apps/dashboard/README.md" -Value "# Dashboard`nNext.js 14 web dashboard"

# billing (Node.js)
Set-Content -Path "$baseDir/apps/billing/package.json" -Value @"
{
  "name": "billing",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "stripe": "^14.0.0",
    "razorpay": "^2.9.0"
  }
}
"@
Set-Content -Path "$baseDir/apps/billing/index.js" -Value @"
console.log('Billing service starting...');
"@
Set-Content -Path "$baseDir/apps/billing/README.md" -Value "# Billing`nNode.js billing service (Stripe + Razorpay)"

# Packages

# provider-adapters (Rust)
Set-Content -Path "$baseDir/packages/provider-adapters/Cargo.toml" -Value @"
[package]
name = "provider-adapters"
version = "0.1.0"
edition = "2021"

[dependencies]
"@
Set-Content -Path "$baseDir/packages/provider-adapters/src/lib.rs" -Value @"
pub trait ProviderAdapter {
    fn generate(&self);
}
"@
Set-Content -Path "$baseDir/packages/provider-adapters/README.md" -Value "# Provider Adapters`nShared Rust provider adapter traits"

# semantic-cache (Python)
Set-Content -Path "$baseDir/packages/semantic-cache/pyproject.toml" -Value @"
[project]
name = "semantic-cache"
version = "0.1.0"
description = "Python SemanticCache library"
dependencies = []

[tool.setuptools.packages.find]
where = ["."]
"@
Set-Content -Path "$baseDir/packages/semantic-cache/semantic_cache/__init__.py" -Value @"
class SemanticCache:
    pass
"@
Set-Content -Path "$baseDir/packages/semantic-cache/README.md" -Value "# Semantic Cache`nPython SemanticCache library"

# scl-cli (Rust)
Set-Content -Path "$baseDir/packages/scl-cli/Cargo.toml" -Value @"
[package]
name = "scl-cli"
version = "0.1.0"
edition = "2021"

[dependencies]
clap = "4.0"
"@
Set-Content -Path "$baseDir/packages/scl-cli/src/main.rs" -Value @"
fn main() {
    println!("SCL CLI tool");
}
"@
Set-Content -Path "$baseDir/packages/scl-cli/README.md" -Value "# SCL CLI`nRust CLI tool"

# infra/terraform
Set-Content -Path "$baseDir/infra/terraform/main.tf" -Value @"
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}
"@
Set-Content -Path "$baseDir/infra/terraform/README.md" -Value "# Terraform`nAWS infra"

# docs
Set-Content -Path "$baseDir/docs/openapi.yaml" -Value @"
openapi: 3.0.0
info:
  title: SCL Aggregator API
  version: 1.0.0
paths: {}
"@
Set-Content -Path "$baseDir/docs/README.md" -Value "# Docs`nOpenAPI specs and markdown docs"

Write-Output "Setup complete."
