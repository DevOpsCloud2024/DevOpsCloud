import React from "react";
import { Rating } from "react-simple-star-rating";

export default function AverageRating({ post }) {
    return (
        <div>
            <Rating
                initialValue={post.average_rating}
                readonly={true}
                allowFraction={true}
                SVGstyle={{ display: "inline" }} // To prevent stars from displaying vertically
            />
            <p className="inline ml-2">({post.times_rated} review{post.times_rated == 1 ? "" : "s"})</p>
        </div>
    );
}
