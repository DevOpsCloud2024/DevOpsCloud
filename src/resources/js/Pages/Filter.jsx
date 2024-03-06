import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Post from '@/Components/Post';
import React, { useState } from 'react';
import Select from 'react-select';

export default function Filter({ auth, posts, types, labels, label_post }) {

    const [filter, setFilter] = useState('');
    const handleInputChange = (event) => {
        setFilter(event.target.value);
    };

    const [labels_ids, setLabel] = useState('');

    let options_types = []
    types.map(t => options_types.push({value: t.id, label:t.name}))
    let options_labels = []
    labels.map(l => options_labels.push({value: l.id, label:l.name}))


    // $users = DB::table('users')
    //                 ->whereIn('id', [1, 2, 3])
    //                 ->get();
    const [test, setTest] = useState('');

    function filtering() {
        setTest("posa")
        console.log("werk!")
    }


    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Filter" />

            <div>
                {labels_ids}
                {test}
            </div>

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

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <Select
                    isMulti
                    placeholder="Labels"
                    name="colors"
                    options={options_labels}
                    className="type"
                    classNamePrefix="select"
                    isSearchable="true"
                    isClearable="true"
                    onChange={chosen => setLabel(chosen.map(c => c.value))}
                />
            </div>

            <button variant="success" onClick={filtering}>
                Filter
            </button>

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
