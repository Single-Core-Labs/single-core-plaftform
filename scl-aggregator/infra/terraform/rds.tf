resource "aws_db_subnet_group" "main" {
  name       = "scl-${var.environment}-db-subnet"
  subnet_ids = module.vpc.private_subnets

  tags = {
    Name = "SCL DB Subnet Group"
  }
}

resource "aws_security_group" "rds" {
  name        = "scl-${var.environment}-rds-sg"
  description = "Allow Postgres traffic from ECS"
  vpc_id      = module.vpc.vpc_id

  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.ecs_tasks.id]
  }
}

resource "aws_db_instance" "postgres" {
  identifier        = "scl-${var.environment}-postgres"
  engine            = "postgres"
  engine_version    = "16"
  instance_class    = "db.t4g.micro"
  allocated_storage = 20

  db_name  = "scl_billing"
  username = "postgres"
  password = var.db_password

  db_subnet_group_name   = aws_db_subnet_group.main.name
  vpc_security_group_ids = [aws_security_group.rds.id]

  skip_final_snapshot = var.environment == "dev"
  publicly_accessible = false
}
