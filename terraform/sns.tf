resource "aws_sns_topic" "document_warning" {
  name = "WarningAboutDocument"
}

resource "aws_sns_topic_policy" "ecs_sns" {
  arn   = aws_sns_topic.document_warning.arn

  policy = data.aws_iam_policy_document.sns_topic_policy.json
}

data "aws_iam_policy_document" "sns_topic_policy" {
  policy_id = "sns_topic_policy"

  statement {
    actions = [
      "SNS:Subscribe",
      "SNS:SetTopicAttributes",
      "SNS:RemovePermission",
      "SNS:Receive",
      "SNS:Publish",
      "SNS:ListSubscriptionsByTopic",
      "SNS:GetTopicAttributes",
      "SNS:DeleteTopic",
      "SNS:AddPermission"
    ]

    condition {
      test     = "ArnEquals"
      variable = "aws:SourceArn"
      values   = [
        aws_ecs_task_definition.ecs_task_webserver.arn,
        aws_ecs_task_definition.ecs_task_migration.arn,
        aws_ecs_task_definition.ecs_task_scheduler.arn,
        aws_ecs_task_definition.ecs_task_worker.arn
      ]
    }

    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }

    resources = [aws_sns_topic.document_warning.arn]
  }
}

resource "aws_sns_topic_subscription" "admin_subscription" {
    topic_arn = aws_sns_topic.document_warning.arn
    protocol  = "email"
    endpoint  = "o.a.erkemeij@gmail.com"
}