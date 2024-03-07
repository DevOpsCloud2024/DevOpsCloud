import React, { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, usePage } from '@inertiajs/react';
 
export default function Course({ course, userCourses, admin }) {
    const { auth } = usePage().props;
    const { data, setData, patch, clearErrors, reset, errors } = useForm({
        users: course.users
    });
    const [enrolledCourses, setEnrolledCourses] = useState(userCourses);

    const submit = (e) => {
        setEnrolledCourses((prevEnrolledCourses) =>
                    prevEnrolledCourses.includes(course.id)
                        ? prevEnrolledCourses.filter((id) => id !== course.id)
                        : [...prevEnrolledCourses, course.id]);
        e.preventDefault();
        patch(route('courses.update', course.id));
    };

    const userEnrolled = () => {
        return userCourses.some(userCourse => userCourse.id === course.id);
    };

    return (
        <div className="p-6 flex space-x-2">
            <form onSubmit={submit}>
                <div className="space-x-2">
                    <h1 className="mt-4 text-lg text-gray-900">{course.title}</h1>
                    {admin ? <></> : <PrimaryButton className="mt-4">{userEnrolled() ? 'Quit' : 'Enroll'}</PrimaryButton>}
                </div>
            </form>
        </div>
    );
}
