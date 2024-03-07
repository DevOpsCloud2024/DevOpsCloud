import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Course from "@/Components/Course";
import { Head } from "@inertiajs/react";

export default function Index({ auth, courses, user, userCourses }) {
    // const [enrolledCourses, setEnrolledCourses] = useState(userCourses);

    // const toggleEnrollment = async (course) => {
    //     try {
    //         let courseId = course.id;
    //         const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content'); // Fetch CSRF token from meta tag
    //         const response = await fetch(route('courses.update', {course: course, enroll: !enrolledCourses.includes(courseId)}), {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 "Accept": "application/json",
    //                 "X-Requested-With": "XMLHttpRequest",
    //                 'X-CSRF-TOKEN': csrfToken,
    //             },
    //             body: JSON.stringify({user: user})
    //         });

    //         if (response.ok) {
    //             // Update the enrolled courses state
    //             setEnrolledCourses((prevEnrolledCourses) =>
    //                 prevEnrolledCourses.includes(courseId)
    //                     ? prevEnrolledCourses.filter((id) => id !== courseId)
    //                     : [...prevEnrolledCourses, courseId]
    //             );
    //         } else {
    //             // Handle error response from the server
    //             console.error('Failed to toggle enrollment');
    //         }
    //     } catch (error) {
    //         // Handle network errors or other exceptions
    //         console.error('Error toggling enrollment:', error);
    //     }
    // }

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Courses" />
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    {courses.map(course => (
                        <Course
                            key={course.id}
                            course={course}
                            userCourses={userCourses}
                            admin={false}
                        />
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
