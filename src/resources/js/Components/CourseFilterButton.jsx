import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";

export default function CourseFilterButton({ course }) {
    const { data, setData, get, processing, errors, reset } = useForm({
        course_ids: [course.id],
    });

    const submit = e => {
        e.preventDefault();
        get(route("post.filtering"), { onSuccess: () => reset() });
    };

    return (
        <div className="p-6 flex space-x-2">
            <form onSubmit={submit}>
                <div className="space-x-2">
                    <PrimaryButton className="mt-4">
                        See posts
                    </PrimaryButton>
                </div>
            </form>
        </div>
    );
}
