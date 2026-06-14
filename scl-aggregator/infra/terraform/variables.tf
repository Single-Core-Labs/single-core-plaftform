variable "aws_region" {
  description = "Primary AWS region"
  type        = string
  default     = "ap-south-1"
}

variable "environment" {
  description = "Deployment environment (dev/prod)"
  type        = string
  default     = "dev"
}

variable "domain_name" {
  description = "Domain name for Route53 and ACM (e.g., sclhq.com)"
  type        = string
}

variable "db_password" {
  description = "Password for RDS PostgreSQL"
  type        = string
  sensitive   = true
}

variable "services" {
  description = "List of services to deploy"
  type        = list(string)
  default     = ["gateway", "router", "cache", "billing", "dashboard"]
}
