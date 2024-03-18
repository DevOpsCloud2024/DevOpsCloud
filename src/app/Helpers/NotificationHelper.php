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
 * Sends Mailhog email for local testing.
 *
 * @param  string  $title  title of document
 */
function sendLocalMail(string $title): void
{
    Mail::to('test@mailhog.local')->send(new NotificationMail($title, route('posts.index')));
}

/**
 * Sends SNS notification.
 *
 * @param  mixed  $title  title of document
 * @return bool whether it succeeded or not
 */
function sendNotification(string $title): bool
{
    $SnSclient = new SnsClient([
        'region' => 'us-east-1',
        'version' => '2010-03-31',
    ]);

    $link = route('posts.index');
    $message = "The document \"$title\" is receiving low ratings. Please consider taking action here: $link.";
    $topic = 'arn:aws:sns:us-east-1:031648496160:WarningAboutDocument';

    try {
        $result = $SnSclient->publish([
            'Message' => $message,
            'TopicArn' => $topic,
        ]);

        return true;
    } catch (AwsException $e) {
        error_log($e->getMessage());

        return false;
    }
}

/**
 * Creates a new SNS topic for a course.
 *
 * @param  string  $course  course name
 * @return string ARN of new topic, or false if it failed
 */
function createTopic(string $course): string|false
{
    if (App::environment(['local'])) {
        return false;
    }

    $SnSclient = new SnsClient([
        'region' => 'us-east-1',
        'version' => '2010-03-31',
    ]);

    try {
        $result = $SnSclient->createTopic([
            'Name' => $course,
        ]);

        return $result->get('TopicArn');
    } catch (AwsException $e) {
        error_log($e->getMessage());

        return false;
    }
}

/**
 * Deletes a topic.
 *
 * @param  ?string  $topic  ARN of topic
 * @return bool whether it succeeded or not
 */
function deleteTopic(?string $topic): bool
{
    if (App::environment(['local']) || !isset($topic)) {
        return false;
    }

    $SnSclient = new SnsClient([
        'region' => 'us-east-1',
        'version' => '2010-03-31',
    ]);

    try {
        $result = $SnSclient->deleteTopic([
            'TopicArn' => $topic,
        ]);

        return true;
    } catch (AwsException $e) {
        error_log($e->getMessage());

        return false;
    }
}

/**
 * Subscribe a user to an SNS topic.
 *
 * @param  string  $email  email of user
 * @param  ?string  $topic  SNS topic
 * @return string ARN of new subscription, or false if it failed
 */
function subscribeToTopic(string $email, ?string $topic): string|false
{
    if (App::environment(['local']) || !isset($topic)) {
        return false;
    }

    $SnSclient = new SnsClient([
        'region' => 'us-east-1',
        'version' => '2010-03-31',
    ]);

    try {
        $result = $SnSclient->subscribe([
            'Protocol' => 'email',
            'Endpoint' => $email,
            'ReturnSubscriptionArn' => true,
            'TopicArn' => $topic,
        ]);

        return $result->get('SubscriptionArn');
    } catch (AwsException $e) {
        error_log($e->getMessage());

        return false;
    }
}

/**
 * Confirms subscription to an SNS topic.
 *
 * @param  ?string  $subscription  subscription ARN
 * @param  ?string  $topic  topic ARN
 * @return bool whether it succeeded or not
 */
function confirmSubscription(?string $subscription, ?string $topic): bool
{
    if (App::environment(['local']) || !isset($subscription, $topic)) {
        return false;
    }

    $SnSclient = new SnsClient([
        'region' => 'us-east-1',
        'version' => '2010-03-31',
    ]);

    try {
        $result = $SnSclient->confirmSubscription([
            'Token' => $subscription,
            'TopicArn' => $topic,
        ]);

        return true;
    } catch (AwsException $e) {
        error_log($e->getMessage());

        return false;
    }
}

/**
 * Delete subscription to an SNS topic.
 *
 * @param  ?string  $subscription  subscription ARN
 * @return bool whether it succeeded or not
 */
function deleteSubscription(?string $subscription): bool
{
    if (App::environment(['local']) || !isset($subscription)) {
        return false;
    }

    $SnSclient = new SnsClient([
        'region' => 'us-east-1',
        'version' => '2010-03-31',
    ]);

    try {
        $result = $SnSclient->unsubscribe([
            'SubscriptionArn' => $subscription,
        ]);

        return true;
    } catch (AwsException $e) {
        error_log($e->getMessage());

        return false;
    }
}

/**
 * Sends a notification to subscribers when a new document is uploaded.
 *
 * @param  ?string $topic topic ARN
 * @param  string $course course name
 * @param  string $title title of document
 * @return bool whether it succeeded or not
 */
function sendCourseNotification(?string $topic, string $course, string $title): bool
{
    if (App::environment(['local']) || !isset($topic)) {
        return false;
    }

    $SnSclient = new SnsClient([
        'region' => 'us-east-1',
        'version' => '2010-03-31',
    ]);

    $link = route('posts.index');
    $message = "A new document \"$title\" was uploaded for course \"$course\". You can view it here: $link.";

    try {
        $result = $SnSclient->publish([
            'Message' => $message,
            'TopicArn' => $topic,
        ]);

        return true;
    } catch (AwsException $e) {
        error_log($e->getMessage());

        return false;
    }
}
