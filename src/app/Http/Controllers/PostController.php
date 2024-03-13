<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Posts/Index', [
            'posts' => Post::with('user:id,name', 'labels:name', 'types:name')->latest()->get(),
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
        $validated['filepath'] = asset('storage/'.$validated['filepath']);

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

        DB::table('post_type')
            ->where('post_id', $post->id)
            ->delete();

        DB::table('label_post')
            ->where('post_id', $post->id)
            ->delete();

        return redirect(route('posts.index'));
    }

    public function filtering(Request $request)
    {
        if ($request->type_ids === null) {
            if ($request->label_ids === null) {
                return redirect(route('filter'));
            }

            $wanted_posts = DB::table('label_post')
                ->select('label_post.post_id')
                ->whereIn('label_post.label_id', $request->label_ids)
                ->get();

        } else {
            if ($request->label_ids === null) {
                $wanted_posts = DB::table('post_type')
                    ->select('post_type.post_id')
                    ->whereIn('post_type.type_id', $request->type_ids)
                    ->get();

            } else {
                $wanted_posts = DB::table('post_type')
                    ->join('label_post', 'label_post.post_id', '=', 'post_type.post_id')
                    ->select('post_type.post_id')
                    ->whereIn('post_type.type_id', $request->type_ids)
                    ->whereIn('label_post.label_id', $request->label_ids)
                    ->get();
            }
        }

        $new_arr = Arr::pluck($wanted_posts, 'post_id');

        $all_posts = Post::with('user:id,name', 'labels:name', 'types:name')->latest();

        $filtered_posts = $all_posts->whereIn('id', $new_arr)->get();

        return Inertia::render('Filter', [
            'filtered_posts' => $filtered_posts,
            'types' => DB::table('types')->get(),
            'labels' => DB::table('labels')->get(),
            'label_post' => DB::table('label_post')->get(),
            'post_type' => DB::table('post_type')->get(),
        ]);
    }

    /**
     * Rate a post.
     */
    public function rate(Post $post, int $rating)
    {
        $post->rateOnce($rating, null, Auth::id());

        return redirect()->back();
    }
}
