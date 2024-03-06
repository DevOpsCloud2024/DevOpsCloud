import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Post from '@/Components/Post';
import React, { useState } from 'react';

export default function Filter({ auth, posts }) {

    const [filter, setFilter] = useState('');
    const handleInputChange = (event) => {
        setFilter(event.target.value);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Filter" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <input
                        value={filter}
                        placeholder="State"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    {posts.filter(post => post.title == filter).map(filtered =>
                        <Post key={filtered.id} post={filtered} />
                    )}
                </div>
            </div>
            
        </AuthenticatedLayout>
    );
}
