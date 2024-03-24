import React, { useState } from "react";
import Dropdown from "@/Components/Dropdown";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import CourseFilterButton from "@/Components/CourseFilterButton";
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
                <div className="w-full">
                    <div className="mt-1 space-x-2 flex justify-between w-full">
                        {editing ? (
                            <form onSubmit={submit}>
                                <input
                                    type="text"
                                    placeholder="Enter new course title..."
                                    value={data.title}
                                    onChange={e => setData("title", e.target.value)}
                                    className="text-lg text-gray-900"
                                ></input>
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
                            <h1 className="text-lg text-gray-900">{course.title}</h1>
                        )}
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
                                <CourseFilterButton course={course} />
                                <button
                                    className="flex w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out"
                                    onClick={() => setEditing(true)}
                                >
                                    Edit{" "}
                                    <svg
                                        className="ml-2"
                                        height={"20px"}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                    >
                                        <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                                    </svg>
                                </button>
                                <Dropdown.Link
                                    as="button"
                                    href={route("courses.destroy", course.id)}
                                    method="delete"
                                    className="flex"
                                >
                                    Delete{" "}
                                    <svg
                                        className="ml-2"
                                        height={"20px"}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512"
                                    >
                                        <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                                    </svg>
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </div>
            ) : (
                <div className="flex justify-between w-full items-center">
                    <div>
                        <h1 className="mt-4 text-lg text-gray-900">{course.title}</h1>
                        <Dropdown.Link
                            as="button"
                            style={{ width: "auto" }}
                            className="inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150 false mt-4"
                            href={route("course.enroll", { course: course.id })}
                            method="post"
                        >
                            {userEnrolled() ? "Quit" : "Enroll"}
                        </Dropdown.Link>
                    </div>

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
                            <CourseFilterButton course={course} />
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            )}
        </div>
    );
}
