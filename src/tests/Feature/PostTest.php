<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Post;
use Illuminate\Http\UploadedFile;

class PostTest extends TestCase
{
    use RefreshDatabase;

    public function test_successful_post_creation(): void
    {
        $user = User::factory()->create(); // Need to be logged in

        $response = $this->actingAs($user)
            ->post('/posts', [
                'title' => 'Post Title',
                'content' => 'This is a post',
                'file' => UploadedFile::fake()->create('summary.pdf')
            ]);
    
        $this->assertDatabaseHas('posts', [
            'title' => 'Post Title'
        ]);
    
        $this->assertDatabaseCount('posts', 1);
    }

    public function test_not_logged_in(): void
    {
        $response = $this->post('/posts', [
                'title' => 'Post Title',
                'content' => 'This is a post',
                'file' => UploadedFile::fake()->create('summary.pdf')
            ]);
    
        $this->assertDatabaseCount('posts', 0);
    }

    public function test_no_file_present(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->post('/posts', [
                'title' => 'Post Title',
                'content' => 'This is a post',
                'file' => ''
            ]);
    
        $this->assertDatabaseCount('posts', 0);
    }

    public function test_successful_post_deletion(): void
    {
        $user = User::factory()->create();

        $post = $user->posts()->create([
            'title' => 'Post Title',
            'content' => 'This is a post',
            'file' => UploadedFile::fake()->create('summary.pdf'),
            'filepath' => 'summary.pdf'
        ]);

        $this->assertDatabaseCount('posts', 1);

        // Must be user that created the post.
        $response = $this->actingAs($user)->delete('/posts/' . $post->id);

        $this->assertDatabaseMissing('posts', [
            'title' => 'Post Title',
           ]);
    
        $this->assertDatabaseCount('posts', 0);
    }

    public function test_no_deletion_different_user(): void
    {
        $user = User::factory()->create();

        $post = $user->posts()->create([
            'title' => 'Post Title',
            'content' => 'This is a post',
            'file' => UploadedFile::fake()->create('summary.pdf'),
            'filepath' => 'summary.pdf'
        ]);

        $this->assertDatabaseCount('posts', 1);

        $different_user = User::factory()->create();
        $response = $this->actingAs($different_user)->delete('/posts/' . $post->id);

        $this->assertDatabaseHas('posts', [
            'title' => 'Post Title',
           ]);
    
        $this->assertDatabaseCount('posts', 1);
    }

    public function test_successful_deletion_admin(): void
    {
        $user = User::factory()->create();

        $post = $user->posts()->create([
            'title' => 'Post Title',
            'content' => 'This is a post',
            'file' => UploadedFile::fake()->create('summary.pdf'),
            'filepath' => 'summary.pdf'
        ]);

        $this->assertDatabaseCount('posts', 1);

        $admin = User::factory()->create(['is_admin' => true]);
        $response = $this->actingAs($admin)->delete('/posts/' . $post->id);

        $this->assertDatabaseMissing('posts', [
            'title' => 'Post Title',
           ]);
    
        $this->assertDatabaseCount('posts', 0);
    }
}
