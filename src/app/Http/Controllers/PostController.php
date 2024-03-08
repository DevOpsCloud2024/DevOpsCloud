<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    /** If the rating falls below this treshold, the admin receives a warning. */
    const WARNING_THRESHOLD_RATING = 2.0;

    /** Minimum number of ratings needed before a warning is send. */
    const WARNING_THRESHOLD_NUMBER = 1;

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Posts/Index', [
            'posts' => Post::with('user:id,name')->latest()->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:64',
            'content' => 'required|string|max:255',
            'file' => 'required|file:pdf',
        ]);

        $validated['filepath'] = $validated['file']->store('public');
        // Remove the 'public/' prefix from the file path
        $validated['filepath'] = substr($validated['filepath'], 7);
        $validated['filepath'] = asset('storage/'.$validated['filepath']);

        $request->user()->posts()->create($validated);

        return redirect()->route('posts.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post): RedirectResponse
    {
        $this->authorize('update', $post);
        $validated = $request->validate([
            'content' => 'required|string|max:255',
        ]);

        $post->update($validated);

        return redirect(route('posts.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post): RedirectResponse
    {
        $this->authorize('delete', $post);
        $post->delete();

        return redirect(route('posts.index'));
    }

    /**
     * Rate a post.
     */
    public function rate(Post $post, int $rating): RedirectResponse
    {
        $post->rateOnce($rating, null, Auth::id());

        // Send a warning notification to the admin if this post has received a lot of low ratings.
        if ($post->averageRating() < $this::WARNING_THRESHOLD_RATING && $post->timesRated() >= $this::WARNING_THRESHOLD_NUMBER) {
            sendWarningNotification($post->title);
        }

        return redirect()->back();
    }
}
