<?php

namespace App\Http\Controllers;

use App\Models\Course;
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
            'posts' => Post::with('user:id,name', 'labels:name', 'types:name', 'course')->latest()->get(),
            'types' => DB::table('types')->get(),
            'labels' => DB::table('labels')->get(),
            'courses' => DB::table('courses')->get(),
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
            'course_id' => 'required',
        ]);

        $validated['filepath'] = $validated['file']->store('public');
        // Remove the 'public/' prefix from the file path
        $validated['filepath'] = substr($validated['filepath'], 7);
        $validated['filepath'] = asset('storage/'.$validated['filepath']);

        $post = $request->user()->posts()->create($validated);
        $post->labels()->attach($request->label_ids);
        $post->types()->attach($request->type_ids);

        // Send notification to students enrolled in course
        $course = Course::findOrFail($validated['course_id']);
        sendCourseNotification($course->sns_topic, $course->title, $validated['title']);

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
        $types = $request->type_ids;
        $labels =$request->label_ids;
        $courses = $request->course_ids;

        $wanted_posts = DB::table('posts')
            ->join('label_post', 'posts.id', '=', 'label_post.post_id')
            ->join('post_type', 'posts.id', '=', 'post_type.post_id')
            ->select('posts.id')
            ->when($types !== null, function ($query) use ($types) {
                $query->whereIn('post_type.type_id', $types);
            })
            ->when($labels !== null, function ($query) use ($labels) {
                $query->whereIn('label_post.label_id', $labels);
            })
            ->when($courses !== null, function ($query) use ($courses) {
                $query->whereIn('posts.course_id', $courses);
            })
            ->get();

        $new_arr = Arr::pluck($wanted_posts, 'id');
        $all_posts = Post::with('user:id,name', 'labels:name', 'types:name', 'course')->latest();
        $filtered_posts = $all_posts->whereIn('id', $new_arr)->get();

        return Inertia::render('Filter', [
            'filtered_posts' => $filtered_posts,
            'types' => DB::table('types')->get(),
            'labels' => DB::table('labels')->get(),
            'courses' => DB::table('courses')->get(),
        ]);
    }

    /**
     * Rate a post.
     */
    public function rate(Post $post, int $rating): RedirectResponse
    {
        $post->rateOnce($rating, null, Auth::id());

        // Send warning notification to the admin if this post has received a lot of low ratings.
        if ($post->averageRating() < $this::WARNING_THRESHOLD_RATING && $post->timesRated() >= $this::WARNING_THRESHOLD_NUMBER) {
            sendWarningNotification($post->title);
        }

        return redirect()->back();
    }
}
