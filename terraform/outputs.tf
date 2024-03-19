# Output the DNS name of the ALB
output "app_url" {
  value = aws_alb.ecs_alb.dns_name
}

output "env_vars" {
  sensitive = true
  value     = local.env_vars
}