<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Type;
use App\Models\Label;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Posts/Index', [
            'posts' => Post::with('user:id,name')->latest()->get(),
            'types' => DB::table('types')->get(),
            'labels' => DB::table('labels')->get(),
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
        $validated['filepath'] = asset('storage/' . $validated['filepath']);

        $post = $request->user()->posts()->create($validated);
        $post->labels()->attach($request->label_ids);
        $post->types()->attach($request->type_ids);

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
}
