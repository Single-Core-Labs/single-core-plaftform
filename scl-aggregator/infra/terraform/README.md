# SCL Model Aggregator - Terraform Infrastructure

This directory contains the Terraform configuration to deploy the SCL Model Aggregator to AWS.

## Architecture

- **Network**: VPC with 2 Public Subnets, 2 Private Subnets, and a NAT Gateway (Single in Dev, Multi in Prod).
- **Compute**: ECS Fargate Cluster running the Microservices (Gateway, Router, Cache, Billing, Dashboard).
- **Database**: RDS PostgreSQL for billing and users.
- **Cache**: ElastiCache Redis for API keys and rate-limiting.
- **Routing**: Application Load Balancer (ALB) with ACM HTTPS termination, using Route53.
- **Storage**: ECR for Docker images, S3 for export logs, CloudWatch for container logs.

## Prerequisites

1. Install [Terraform](https://developer.hashicorp.com/terraform/downloads) (>= 1.5.0)
2. Configure AWS Credentials (`aws configure` or set `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY`)
3. A registered domain name to map to Route53

## Deployment Steps

1. **Initialize Terraform**
   ```bash
   terraform init
   ```

2. **Create a `terraform.tfvars` file**
   ```hcl
   environment = "prod"
   aws_region  = "ap-south-1"
   domain_name = "sclhq.com"
   db_password = "SUPER_SECRET_SECURE_PASSWORD"
   ```

3. **Review the Plan**
   ```bash
   terraform plan
   ```

4. **Apply**
   ```bash
   terraform apply
   ```

5. **Post-Deployment**
   - The output will provide you with the ECR repository URLs.
   - Build and push your Docker images to these ECR repos.
   - The ECS services will automatically start pulling the images and spinning up tasks.
   - Note the `nameservers` output and update your domain registrar to point to the Route53 Zone.
