# Create S3 bucket for assets
resource "aws_s3_bucket" "ecs_s3" {
  bucket = "${var.app_name}-${var.app_env}-assets"
  force_destroy = true
}

data "aws_canonical_user_id" "current" {}

# Create S3 bucket policy
resource "aws_s3_bucket_acl" "ecs_s3_acl" {
  bucket     = aws_s3_bucket.ecs_s3.id
  acl        = "public-read"
  depends_on = [aws_s3_bucket_ownership_controls.ecs_s3_ownership_controls]
}

# Allow terraform to manage the bucket policy
resource "aws_s3_bucket_ownership_controls" "ecs_s3_ownership_controls" {
  bucket = aws_s3_bucket.ecs_s3.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

# Block public access to the S3 bucket
resource "aws_s3_bucket_public_access_block" "ecs_s3_permissions" {
  bucket = aws_s3_bucket.ecs_s3.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "ecs_s3_policy" {
  bucket = aws_s3_bucket.ecs_s3.bucket

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect    = "Allow",
        Principal = "*",
        Action = [
          "s3:GetObject"
        ],
        Resource = [
          "${aws_s3_bucket.ecs_s3.arn}/*"
        ]
      }
    ]
  })
}