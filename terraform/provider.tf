terraform {
  backend "s3" {
    bucket                  = "studentshare-terraform-state"
    key                     = "terraform.tfstate"
    region                  = "eu-west-1"
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.25"
    }
  }
}

provider "aws" {
  region = var.aws_region
}
