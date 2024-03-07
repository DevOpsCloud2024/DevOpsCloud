import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Course from "@/Components/Course";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, Head } from "@inertiajs/react";

export default function Index({ auth, courses }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        content: "",
    });

    const submit = e => {
        e.preventDefault();
        post(route("courses.store"), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Courses" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    <input
                        value={data.title}
                        placeholder="Title"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={e => setData("title", e.target.value)}
                    />
                    <InputError message={errors.content} className="mt-2" />
                    <PrimaryButton className="mt-4" disabled={processing}>
                        Create
                    </PrimaryButton>
                </form>

                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    {courses.map(course => (
                        <Course key={course.id} course={course} userCourses={[]} admin={true} />
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
