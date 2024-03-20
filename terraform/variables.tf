variable "app_name" {
  type    = string
  default = "studentshare"
}

variable "app_env" {
  type    = string
  default = "production"
}

variable "aws_region" {
  type        = string
  description = "AWS region where the infrastructure will be created"
  default     = "eu-west-1"
}

variable "vpc_cidr" {
  description = "IP address range to use in VPC"
  default     = "172.16.0.0/16"
}

variable "az_count" {
  description = "Number of Availability zones"
  default     = "2"
}

variable "subnet_count" {
  description = "Number of subnets"
  default     = "2"
}

variable "admin_emails" {
  description = "Email addresses of the admin users"
  type        = list(string)
  default     = [
    "o.a.erkemeij@gmail.com",
    "stefan.vlastuin@gmail.com"
  ]
}

variable "app_key" {
  description = "Application key for Laravel"
  type        = string
}
