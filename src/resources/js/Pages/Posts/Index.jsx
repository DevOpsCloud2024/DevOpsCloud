import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Post from "@/Components/Post";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, Head } from "@inertiajs/react";

export default function Index({ auth, posts }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        content: "",
        file: "",
    });

    const submit = e => {
        e.preventDefault();
        post(route("posts.store"), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    <input
                        value={data.title}
                        placeholder="Title"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-t-md shadow-sm"
                        onChange={e => setData("title", e.target.value)}
                    />
                    <textarea
                        value={data.content}
                        placeholder="What do you want to share?"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 shadow-sm"
                        onChange={e => setData("content", e.target.value)}
                    ></textarea>
                    <input
                        type="file"
                        accept=".pdf"
                        className="block w-full border-gray-300 rounded-b-md shadow-sm text-sm text-gray-900 cursor-pointer bg-gray-50 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={e => setData("file", e.target.files[0])}
                    />
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">
                        Allowed filetypes: .PDF (MAX. 5 MB).
                    </p>

                    <InputError message={errors.content} className="mt-2" />
                    <PrimaryButton className="mt-4" disabled={processing}>
                        Post <svg fill="#ffffff" className="ml-2" width={"20px"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376V479.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z"/></svg>
                    </PrimaryButton>
                </form>

                <hr className="mt-4"/>

                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    {posts.map(post => (
                        <Post key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
