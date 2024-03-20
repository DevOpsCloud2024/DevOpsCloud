# Output the DNS name of the ALB
output "app_url" {
  value = aws_alb.ecs_alb.dns_name
}

output "laravel_repo" {
  value = aws_ecr_repository.laravel_ecr_repo.repository_url
}

output "nginx_repo" {
  value = aws_ecr_repository.nginx_ecr_repo.repository_url
}