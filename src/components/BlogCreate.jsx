import React from "react";
import EditorPage from "../page/EditorPage";
import { useParams } from "react-router-dom";

const BlogCreate = ({ isUpdate }) => {
    const { id } = useParams();

    return (
        <div className="max-w-7xl mx-auto pt-[90px] p-4 sm:p-6 md:p-8">
            <h2 className="text-xl pt-12 sm:text-2xl md:text-3xl font-semibold text-center mb-6">
                {isUpdate ? "Update Blog" : "Create a New Blog"}
            </h2>
            <EditorPage isUpdate={isUpdate} />
        </div>
    );
};

export default BlogCreate;
