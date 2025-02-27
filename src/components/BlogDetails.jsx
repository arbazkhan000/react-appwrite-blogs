import { SignIn, useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppwriteService from "../service/AppwriteService";
import Loader from "./Loader";

const BlogDetails = () => {
    const [loading, setLoading] = useState(true);
    const [blogInfo, setBlogInfo] = useState(null); 
    const { id } = useParams();
    const { isSignedIn } = useUser();
    const navigate = useNavigate(); 

    const getSingleBlog = async () => {
        setLoading(true);

        try {
            const result = await AppwriteService.getBlogById(id);
            setBlogInfo(result); 
           
        } catch (error) {
            console.error("Error fetching blog:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this blog?"
        );
        if (confirmDelete) {
            try {
                await AppwriteService.deleteBlog(id);
                alert("Blog deleted successfully!");
                navigate("/"); 
            } catch (error) {
                console.error("Error deleting blog:", error);
                alert("Failed to delete blog. Please try again.");
            }
        }
    };

    const handleUpdate = () => {
        navigate(`/blog/update/${id}`); 
    };

    useEffect(() => {
        getSingleBlog();
    }, [id]);

    if (loading) {
        return <Loader />; 
    }

    if (!blogInfo) {
        return (
            <div className="text-center mt-8">
                <p>Blog not found.</p>
                <button
                    onClick={() => navigate("/")}
                    className="mt-4 px-4 py-2 bg-black text-white rounded"
                >
                    Go to Home
                </button>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center pt-[90px]">
            {isSignedIn ? (
                <div className="pt-[90px] max-w-7xl mx-auto p-4">
                    <div className="flex flex-col items-center">
                       
                        <h1 className="text-2xl sm:text-3xl font-bold mt-4">
                            {blogInfo.author}
                        </h1>
                        <p className="text-sm sm:text-base text-gray-600 mt-2">
                            {blogInfo.content}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500 mt-2">
                            Category: {blogInfo.category}
                        </p>

                        {/* Update and Delete Buttons */}
                        <div className="flex gap-4 mt-6">
                            <button
                                onClick={handleUpdate}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                            >
                                Update Blog
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                            >
                                Delete Blog
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <SignIn />
            )}
        </div>
    );
};

export default BlogDetails;
