resource "aws_ecr_repository" "laravel_ecr_repo" {
  name                 = "laravel-repo"
  image_tag_mutability = "MUTABLE"

  force_delete = true
}

resource "aws_ecr_repository" "nginx_ecr_repo" {
  name                 = "nginx-repo"
  image_tag_mutability = "MUTABLE"

  force_delete = true
}

resource "aws_ecr_lifecycle_policy" "laravel_ecr_policy" {
  repository = aws_ecr_repository.laravel_ecr_repo.name

  policy = jsonencode({
    rules = [
      {
        rulePriority = 1,
        description = "Keep the last 3 images",

        selection = {
          countNumber = 3,
          countType   = "imageCountMoreThan"
          tagStatus   = "any"
        }

        action = {
          type = "expire"
        },
      }
    ]
  })
}