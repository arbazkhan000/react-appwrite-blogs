import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const BlogCard = ({ id,  content, author, category }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/blog/${id}`)}
            className="border border-solid border-black shadow-[-7px_7px_0px_#000000] overflow-hidden flex flex-col w-full max-w-[350px] mx-auto cursor-pointer hover:shadow-[-10px_10px_0px_#000000] transition-shadow duration-300"
        >
            

            {/* Content */}
            <div className="p-4 flex flex-col gap-2">
                <span className="text-xs sm:text-sm md:text-base text-gray-500 font-medium">
                    {category}
                </span>
                <h3 className="text-lg sm:text-xl font-semibold">{author}</h3>
                <p className="text-sm sm:text-sm text-gray-700">{content}</p>
            </div>
        </div>
    );
};



export default BlogCard;
