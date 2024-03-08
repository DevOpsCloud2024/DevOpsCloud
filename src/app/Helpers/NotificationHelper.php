<?php

use Aws\Exception\AwsException;
use Aws\Sns\SnsClient;

/**
 * Send a warning notification to the admin.
 *
 * @param  mixed $title title of the document
 * @return void
 */
function sendWarningNotification(string $title) : void {
    $SnSclient = new SnsClient([
        'region' => 'us-east-1',
        'version' => '2010-03-31'
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