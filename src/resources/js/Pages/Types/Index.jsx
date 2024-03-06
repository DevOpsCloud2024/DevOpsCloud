import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import AddType from './Partials/AddType';
import AddLabel from './Partials/AddLabel';

export default function Index({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="New types" />


            <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                <AddType/>
            </div>

            <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                <AddLabel/>
            </div>
            
        </AuthenticatedLayout>
    );
}
