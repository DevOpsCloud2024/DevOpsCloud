import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Head } from "@inertiajs/react";
import Post from "@/Components/Post";
import React, { useState } from "react";
import Select from "react-select";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";

export default function Filter({ auth, filtered_posts, types, labels, courses}) {
    let options_types = [];
    types.map(t => options_types.push({ value: t.id, label: t.name }));
    let options_labels = [];
    labels.map(l => options_labels.push({ value: l.id, label: l.name }));
    let options_courses = [];
    courses.map(c => options_courses.push({ value: c.id, label: c.title }));

    const { data, setData, get, processing, errors, reset } = useForm({
        type_ids: [],
        label_ids: [],
        course_ids: [],
    });

    const submit = e => {
        e.preventDefault();
        get(route("post.filtering"), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Filter" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    <div>
                        <Select
                            isMulti
                            placeholder="Types"
                            name="colors"
                            options={options_types}
                            className="type"
                            classNamePrefix="select"
                            isSearchable="true"
                            isClearable="true"
                            onChange={chosen =>
                                setData(
                                    "type_ids",
                                    chosen.map(c => c.value)
                                )
                            }
                        />
                    </div>

                    <div>
                        <Select
                            isMulti
                            placeholder="Labels"
                            name="colors"
                            options={options_labels}
                            className="type"
                            classNamePrefix="select"
                            isSearchable="true"
                            isClearable="true"
                            onChange={chosen =>
                                setData(
                                    "label_ids",
                                    chosen.map(c => c.value)
                                )
                            }
                        />
                    </div>

                    <div>
                        <Select
                            isMulti
                            placeholder="Courses"
                            name="colors"
                            options={options_courses}
                            className="type"
                            classNamePrefix="select"
                            isSearchable="true"
                            isClearable="true"
                            onChange={chosen =>
                                setData(
                                    "course_ids",
                                    chosen.map(c => c.value)
                                )
                            }
                        />
                    </div>

                    <InputError message={errors.content} className="mt-2" />
                    <PrimaryButton className="mt-4" disabled={processing}>
                        Filter
                    </PrimaryButton>
                </form>
            </div>

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    {filtered_posts.map(filtered_post => (
                        <Post key={filtered_post.id} post={filtered_post} />
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
