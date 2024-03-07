import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Post from '@/Components/Post';
import React, { useState } from 'react';
import Select from 'react-select';

export default function Filter({ auth, posts, types, labels, label_post, post_type }) {
    const [chosen_labels_ids, setLabel] = useState([]);
    const [chosen_types_ids, setTypes] = useState([]);

    let options_types = []
    types.map(t => options_types.push({value: t.id, label:t.name}))
    let options_labels = []
    labels.map(l => options_labels.push({value: l.id, label:l.name}))

    const [results, setResults] = useState([]);

    function filtering() {
        let founds = [];
        if (chosen_labels_ids.length != 0) {
            founds = label_post.filter(lp => chosen_labels_ids.includes(lp.label_id) ).map(lp => lp.post_id)
        }

        if (chosen_types_ids.length == 0) {
            setResults(founds)
        } else {
            let founds2 = [];
            if (chosen_labels_ids.length != 0) {
                founds2 = post_type.filter(pt => chosen_types_ids.includes(pt.type_id) && founds.includes(pt.post_id)).map(pt => pt.post_id)
            } else {
                founds2 = post_type.filter(pt => chosen_types_ids.includes(pt.type_id) ).map(pt => pt.post_id)
            }
            setResults(founds2)
        }
    }


    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Filter" />

            <div>
                {chosen_labels_ids}
                {chosen_types_ids}
            </div>

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <Select
                    isMulti
                    placeholder="Types"
                    name="colors"
                    options={options_types}
                    className="type"
                    classNamePrefix="select"
                    isSearchable="true"
                    isClearable="true"
                    onChange={chosen => setTypes(chosen.map(c => c.value))}
                />
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
                    {posts.filter(post => results.includes(post.id)).map(filtered =>
                        <Post key={filtered.id} post={filtered} />
                    )}
                </div>
            </div>
            
        </AuthenticatedLayout>
    );
}
