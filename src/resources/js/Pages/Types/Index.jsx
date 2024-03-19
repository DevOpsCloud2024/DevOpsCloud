import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import AddType from "./Partials/AddType";
import AddLabel from "./Partials/AddLabel";

export default function Index({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="New types" />

            <div>
                <AddType />
            </div>

            <div>
                <AddLabel />
            </div>
        </AuthenticatedLayout>
    );
}
