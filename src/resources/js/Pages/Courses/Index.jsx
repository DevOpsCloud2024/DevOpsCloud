import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Course from '@/Components/Course';
import { Head } from '@inertiajs/react';


export default function Index({ auth, courses, userCourses }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Courses" />
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    {courses.map(course =>
                        <Course key={course.id} course={course} userCourses={userCourses} admin={false} />
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
