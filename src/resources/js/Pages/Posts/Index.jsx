import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Post from '@/Components/Post';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head } from '@inertiajs/react';


export default function Index({ auth, posts }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        content: '',
        file: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('posts.store'), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Posts" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    <input
                        value={data.title}
                        placeholder="Title"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={e => setData('title', e.target.value)}
                    />
                    <textarea
                        value={data.content}
                        placeholder="What do you want to share??"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={e => setData('content', e.target.value)}
                    ></textarea>
                    <input
                        type="file"
                        accept=".pdf"
                        className="block w-full border-gray-300 rounded-md shadow-sm text-sm text-gray-900 cursor-pointer bg-gray-50 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={e => setData('file', e.target.files[0])}
                    />
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">Allowed filetypes: .PDF (MAX. 5 Mb).</p>

                    <InputError message={errors.content} className="mt-2" />
                    <PrimaryButton className="mt-4" disabled={processing}>Post</PrimaryButton>
                </form>

                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    {posts.map(post =>
                        <Post key={post.id} docpost={post} />
                    )}
                    </div>
            </div>
        </AuthenticatedLayout>
    );
}
