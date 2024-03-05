import React from 'react';
import { router } from '@inertiajs/react'
import { Rating } from 'react-simple-star-rating'

export default function Post({ post }) {
    const handleRating = (rate) => {
        router.post(route('post.rate', {'post': post.id, 'rating': rate}));
    }

    return (
        <div>
            Rate this document:
            <Rating
                onClick={handleRating}
                initialValue={post.user_average_rating}
                SVGstyle={{'display': 'inline'}} // To prevent stars from displaying vertically
            />
        </div>
    );
}
