import React, { useState } from "react";
import Dropdown from "@/Components/Dropdown";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, usePage } from "@inertiajs/react";

export default function Course({ course, userCourses, admin }) {
    const { auth } = usePage().props;
    const { data, setData, patch, clearErrors, reset, errors } = useForm({
        title: course.title,
    });
    const [editing, setEditing] = useState(false);

    const submit = e => {
        e.preventDefault();
        patch(route("courses.update", course.id), { onSuccess: () => setEditing(false) });
    };

    const userEnrolled = () => {
        return userCourses.some(userCourse => userCourse.id === course.id);
    };

    return (
        <div className="p-6 flex space-x-2">
            {admin ? (
                <div className="mt-1 space-x-2 flex justify-between w-full">
                    <h1 className="text-lg text-gray-900">{course.title}</h1>
                    <Dropdown>
                        <Dropdown.Trigger>
                            <button>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-gray-400"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                </svg>
                            </button>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <button
                                className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out"
                                onClick={() => setEditing(true)}
                            >
                                Edit
                            </button>
                            <Dropdown.Link
                                as="button"
                                href={route("courses.destroy", course.id)}
                                method="delete"
                            >
                                Delete
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                    {editing ? (
                        <form onSubmit={submit}>
                            <textarea
                                value={data.content}
                                onChange={e => setData("title", e.target.value)}
                                className="mt-4 w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            ></textarea>
                            <InputError message={errors.message} className="mt-2" />
                            <div className="space-x-2">
                                <PrimaryButton className="mt-4">Save</PrimaryButton>
                                <button
                                    className="mt-4"
                                    onClick={() => {
                                        setEditing(false);
                                        reset();
                                        clearErrors();
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <></>
                    )}
                </div>
            ) : (
                <div className="space-x-2">
                    <h1 className="mt-4 text-lg text-gray-900">{course.title}</h1>
                    <Dropdown.Link as="button" className="mt-4 btn btn-blue" href={route("course.enroll", {course: course.id})} method="post">
                        {userEnrolled() ? "Quit" : "Enroll"}
                    </Dropdown.Link>
                </div>
            )}
        </div>
    );
}
