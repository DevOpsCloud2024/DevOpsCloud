# Output the DNS name of the ALB
output "app_url" {
  value = aws_alb.ecs_alb.dns_name
}

# Output the ECS cluster name
output "ecs_cluster_name" {
  value = aws_ecs_cluster.ecs_cluster.name
}

# Output the web service name
output "ecs_service_webserver_name" {
  value = aws_ecs_service.ecs_service_webserver.name
}

output "ecs_service_worker_name" {
  value = aws_ecs_service.ecs_service_worker_name.name
}

output "ecs_service_scheduler_name" {
  value = aws_ecs_service.ecs_service_scheduler_name.name
}