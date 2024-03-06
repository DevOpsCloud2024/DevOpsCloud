import React from 'react';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head } from '@inertiajs/react';


export default function AddType() {

    const { data, setData, post, processing, errors, reset } = useForm({
        new_type: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('types.store'), { onSuccess: () => reset() });
    };

    return (
        <section>
            <Head title="New types" />


            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    <input
                        value={data.new_type}
                        placeholder="New type of document"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={e => setData('new_type', e.target.value)}
                    />

                    <InputError message={errors.content} className="mt-2" />
                    <PrimaryButton className="mt-4" disabled={processing}>Add type</PrimaryButton>
                </form>
            </div>
            
        </section>
    );
}