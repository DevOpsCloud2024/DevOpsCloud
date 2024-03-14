<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        if (auth()->user()->is_admin) {
            return Inertia::render('Courses/IndexAdmin', [
                'courses' => Course::get(),
            ]);
        }

        return Inertia::render('Courses/Index', [
            'courses' => Course::get(),
            'user' => auth()->user(),
            'userCourses' => auth()->user()->courses,
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
        // $this->authorize('create');
        $validated = $request->validate([
            'title' => 'required|string|max:128',
        ]);

        // Create a new course instance
        $course = new Course();

        // Fill the course instance with validated data
        $course->title = $validated['title'];

        // Save the course to the database
        $course->save();

        return redirect()->route('courses.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Course $course)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Course $course)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Course $course): RedirectResponse
    {
        $this->authorize('update', $course);
        $validated = $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $course->update($validated);

        return redirect(route('courses.index'));
    }

    /**
     * Enroll user out or in to course.
     */
    public function enroll(Course $course): RedirectResponse
    {
        $user = auth()->user();
        $enrolled = $user->courses->contains($course->id);
        if ($enrolled) {
            // Remove the enrollment of the authenticated user in the specified course
            $user->courses()->detach($course->id);
        } else {
            // Enroll the authenticated user in the specified course
            $user->courses()->attach($course->id);
        }

        return redirect(route('courses.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course)
    {
        $this->authorize('delete', $course);
        $course->delete();

        return redirect(route('courses.index'));
    }
}
