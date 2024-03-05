import React from 'react';
import { Rating } from 'react-simple-star-rating'

export default function AverageRating({ post }) {
    return (
        <div>
            <Rating
                initialValue={post.average_rating}
                readonly={true}
                allowFraction={true}
                SVGstyle={{'display': 'inline'}} // To prevent stars from displaying vertically
            />
            ({post.times_rated} reviews)
        </div>
    );
}
