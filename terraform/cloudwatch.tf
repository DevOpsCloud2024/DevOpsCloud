# Create a log group for the webserver.
resource "aws_cloudwatch_log_group" "ecs_webserver_logs" {
  name              = "${var.app_name}-${var.app_env}-webserver-logs"
  retention_in_days = 3

  tags = {
    Name        = "${var.app_name}-webserver-logs"
    Environment = var.app_env
  }
}

# Create a log group for the worker.
resource "aws_cloudwatch_log_group" "ecs_worker_logs" {
  name              = "${var.app_name}-${var.app_env}-worker-logs"
  retention_in_days = 3

  tags = {
    Name        = "${var.app_name}-worker-logs"
    Environment = var.app_env
  }
}

# Create a log group for the scheduler.
resource "aws_cloudwatch_log_group" "ecs_scheduler_logs" {
  name              = "${var.app_name}-${var.app_env}-scheduler-logs"
  retention_in_days = 3

  tags = {
    Name        = "${var.app_name}-scheduler-logs"
    Environment = var.app_env
  }
}

# Create a log group for the migration.
resource "aws_cloudwatch_log_group" "ecs_migration_logs" {
  name              = "${var.app_name}-${var.app_env}-migration-logs"
  retention_in_days = 3

  tags = {
    Name        = "${var.app_name}-migration-logs"
    Environment = var.app_env
  }
}

resource "aws_cloudwatch_event_rule" "ecr_push_event" {
  name = "ecr-push-event"
  description = "Event for ECR pushes"
  event_pattern = jsonencode({
    detail-type: [
      "ECR Image Action"
    ]
    source: [
      "aws.ecr"
    ]
    detail: {
      action-type: [
        "PUSH"
      ]

      repository-name: [
        "${aws_ecr_repository.laravel_ecr_repo.name}"
      ]
      result: [
        "SUCCESS"
      ]
    }
  })
}


resource "aws_cloudwatch_event_target" "migrate" {
  rule = aws_cloudwatch_event_rule.ecr_push_event.name
  arn = aws_ecs_cluster.ecs_cluster.arn
  role_arn = aws_iam_role.ecs_tasks_execution_role.arn

  ecs_target {
    task_count = 1
    task_definition_arn = aws_ecs_task_definition.ecs_task_migration.arn

    network_configuration {
      subnets          = aws_subnet.ecs_public.*.id
      assign_public_ip = true
      security_groups  = [aws_security_group.ecs_tasks.id]
    }
  }
}
