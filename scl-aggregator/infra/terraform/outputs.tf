output "alb_dns_name" {
  description = "DNS name of the application load balancer"
  value       = aws_lb.main.dns_name
}

output "ecr_repo_urls" {
  description = "ECR Repository URLs for each service"
  value       = { for k, v in aws_ecr_repository.services : k => v.repository_url }
}

output "rds_endpoint" {
  description = "RDS PostgreSQL endpoint"
  value       = aws_db_instance.postgres.endpoint
}

output "redis_endpoint" {
  description = "ElastiCache Redis primary endpoint"
  value       = aws_elasticache_replication_group.redis.primary_endpoint_address
}

output "nameservers" {
  description = "Nameservers for the Route53 zone"
  value       = aws_route53_zone.main.name_servers
}
