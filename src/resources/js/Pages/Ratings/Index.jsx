import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head } from '@inertiajs/react';
 
export default function Index({ auth }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        rating: 5,
    });
 
    const submit = (e) => {
        e.preventDefault();
        post(route('ratings.store'), { onSuccess: () => reset() });
    };
 
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Ratings" />
 
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    <input
                        type="number"
                        value={data.rating}
                        placeholder="Enter your rating"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={e => setData('rating', parseInt(e.target.value, 10))}
                    />
                    <InputError message={errors.rating} className="mt-2" />
                    <PrimaryButton className="mt-4" disabled={processing}>Rate</PrimaryButton>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}