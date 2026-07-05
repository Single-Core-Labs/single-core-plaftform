
resource "aws_elasticache_subnet_group" "main" {
  name       = "scl-${var.environment}-redis-subnet"
  subnet_ids = module.vpc.private_subnets
}

resource "aws_security_group" "redis" {
  name        = "scl-${var.environment}-redis-sg"
  description = "Allow Redis traffic from ECS"
  vpc_id      = module.vpc.vpc_id

  ingress {
    from_port       = 6379
    to_port         = 6379
    protocol        = "tcp"
    security_groups = [aws_security_group.ecs_tasks.id]
  }
}

resource "aws_elasticache_replication_group" "redis" {
  replication_group_id       = "scl-${var.environment}-redis"
  description                = "Redis for API key caching and rate limiting"
  node_type                  = "cache.t4g.micro"
  port                       = 6379
  parameter_group_name       = "default.redis7.cluster.on"
  automatic_failover_enabled = true
  num_node_groups            = 1
  replicas_per_node_group    = 1

  subnet_group_name          = aws_elasticache_subnet_group.main.name
  security_group_ids         = [aws_security_group.redis.id]
}
