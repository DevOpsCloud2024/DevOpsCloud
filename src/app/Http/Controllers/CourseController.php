<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Helpers\NotificationHelper;
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

        // Create an SNS topic
        $result = createTopic($course->title);
        if ($result !== false) {
            $course->sns_topic = $result;
        }

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
            // Delete SNS subscription
            $subscription = $user->courses()->where('course_id', $course->id)->first()->pivot->sns_subscription;
            deleteSubscription($subscription);

            // Remove the enrollment of the authenticated user in the specified course
            $user->courses()->detach($course->id);

        } else {
            // Subscribe to SNS topic
            $subscription = subscribeToTopic($user->email, $course->sns_topic);

            // Enroll the authenticated user in the specified course
            if ($subscription !== false) {
                confirmSubscription($subscription, $course->sns_topic);
                $user->courses()->attach($course->id, ['sns_subscription' => $subscription]);
            } else {
                $user->courses()->attach($course->id);
            }
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
