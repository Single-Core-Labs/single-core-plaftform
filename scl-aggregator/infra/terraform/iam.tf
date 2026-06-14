data "aws_iam_policy_document" "ecs_task_assume_role" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

# ECS Task Execution Role (Pull from ECR, push logs to CloudWatch)
resource "aws_iam_role" "ecs_execution" {
  name               = "scl-${var.environment}-ecs-execution-role"
  assume_role_policy = data.aws_iam_policy_document.ecs_task_assume_role.json
}

resource "aws_iam_role_policy_attachment" "ecs_execution_policy" {
  role       = aws_iam_role.ecs_execution.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

# ECS Task Role (Access AWS resources from inside the container, e.g., S3, Parameter Store)
resource "aws_iam_role" "ecs_task" {
  name               = "scl-${var.environment}-ecs-task-role"
  assume_role_policy = data.aws_iam_policy_document.ecs_task_assume_role.json
}

# Example specific policy for the task (least-privilege)
resource "aws_iam_policy" "ecs_task_custom" {
  name        = "scl-${var.environment}-ecs-task-policy"
  description = "Custom permissions for SCL services"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "s3:PutObject",
          "s3:GetObject"
        ]
        Effect   = "Allow"
        Resource = "${aws_s3_bucket.logs.arn}/*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "ecs_task_custom_attachment" {
  role       = aws_iam_role.ecs_task.name
  policy_arn = aws_iam_policy.ecs_task_custom.arn
}

# S3 Bucket for general app logs/exports
resource "aws_s3_bucket" "logs" {
  bucket = "scl-${var.environment}-app-logs"
}
