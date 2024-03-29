import PrimaryButton from "@/Components/PrimaryButton";
import Dropdown from "@/Components/Dropdown";
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
        <form onSubmit={submit}>
            {/* <PrimaryButton className="mt-4">See posts</PrimaryButton> */}
            <Dropdown.Link
                as="button"
                href={route("post.filtering", course.id)}
                method="get"
                className="flex"
            >
                See Posts{" "}
                <svg
                    className="ml-2"
                    height={"20px"}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                >
                    <path d="M88.7 223.8L0 375.8V96C0 60.7 28.7 32 64 32H181.5c17 0 33.3 6.7 45.3 18.7l26.5 26.5c12 12 28.3 18.7 45.3 18.7H416c35.3 0 64 28.7 64 64v32H144c-22.8 0-43.8 12.1-55.3 31.8zm27.6 16.1C122.1 230 132.6 224 144 224H544c11.5 0 22 6.1 27.7 16.1s5.7 22.2-.1 32.1l-112 192C453.9 474 443.4 480 432 480H32c-11.5 0-22-6.1-27.7-16.1s-5.7-22.2 .1-32.1l112-192z" />
                </svg>
            </Dropdown.Link>
        </form>
    );
}
