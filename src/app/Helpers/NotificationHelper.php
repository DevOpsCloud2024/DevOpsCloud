<?php

use App\Mail\NotificationMail;
use Aws\Exception\AwsException;
use Aws\Sns\SnsClient;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Mail;

/**
 * Send a warning notification to the admin.
 *
 * @param  mixed  $title  title of the document
 */
function sendWarningNotification(string $title): void
{
    if (App::environment(['local'])) {
        // In local environment, send mail with Mailhog.
        sendLocalMail($title);
    } else {
        // In production environment, send SNS notification.
        sendNotification($title);
    }
}

/**
 * Sends Mailhog email.
 *
 * @param  string  $title  title of document
 */
function sendLocalMail(string $title): void
{
    Mail::to('test@mailhog.local')->send(new NotificationMail($title));
}

/**
 * Sends SNS notification.
 *
 * @param  string  $title  title of document
 */
function sendNotification(string $title): void
{
    $SnSclient = new SnsClient([
        'region' => 'us-east-1',
        'version' => '2010-03-31',
    ]);

    $message = "The document \"$title\" is receiving low ratings. Please consider taking action.";
    $topic = 'arn:aws:sns:us-east-1:031648496160:WarningAboutDocument';

    try {
        $result = $SnSclient->publish([
            'Message' => $message,
            'TopicArn' => $topic,
        ]);
    } catch (AwsException $e) {
        error_log($e->getMessage());
    }
}
