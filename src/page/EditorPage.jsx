import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import AppwriteService from "../service/AppwriteService";

const EditorPage = ({ isUpdate = false }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams(); 

    const [formData, setFormData] = useState({
        content: "",
        author: "",
        category: "",
        
    });

    const [categoryOptions, setCategoryOptions] = useState([
        "Technology",
        "Education",
        "Music",
        "Other",
    ]);

    useEffect(() => {
        if (isUpdate && id) {
            fetchBlogData();
        }
    }, [id, isUpdate]);

    // Fetch blog data for update
   const fetchBlogData = async () => {
       try {
           
           const blog = await AppwriteService.getBlogById(id);
           

           if (!blog) {
               toast.error("No blog found with this ID");
               return;
           }

           setFormData({
               content: blog.content || "",
               author: blog.author || "",
               category: blog.category || "",
           });
       } catch (error) {
           console.error("Error fetching blog data:", error);
           toast.error("Failed to fetch blog data.");
       }
   };


    // Handle form submission
   const [isUpdating, setIsUpdating] = useState(false);

const handleSubmit = async () => {
    const { content, author, category } = formData;

    if (!content || !author || !category) {
        toast.error("All fields are required!");
        return;
    }

    setLoading(true);
    setIsUpdating(true);

    try {

        if (isUpdate) {
            await AppwriteService.updateBlog(id, { content, author, category });
            toast.success("Blog updated successfully!");
        } else {
            await AppwriteService.createBlog({ content, author, category });
            toast.success("Blog created successfully!");
        }

        navigate("/");
    } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred. Please try again.");
    } finally {
        setLoading(false);
        setIsUpdating(false);
    }
};



    return (
        <div className="flex flex-col items-center gap-6 p-4 sm:p-6 md:p-8">
            <div className="w-full max-w-[95%] sm:max-w-[90%] md:max-w-[80%] lg:max-w-[70%] border border-solid border-black shadow-[-7px_7px_0px_#000000] bg-white p-4">
                <ReactQuill
                    theme="snow"
                    value={formData.content}
                    onChange={(value) =>
                        setFormData({ ...formData, content: value })
                    }
                    className="min-h-[200px] sm:min-h-[300px] border border-solid border-black"
                />

                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Add author name:
                    </label>
                    <input
                        value={formData.author}
                        onChange={(e) =>
                            setFormData({ ...formData, author: e.target.value })
                        }
                        type="text"
                        className="mt-1 p-2 block w-full border border-solid border-black text-sm text-gray-900 cursor-pointer"
                    />
                </div>

              

                <div className="space-y-3 mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Select Category:
                    </label>
                    <select
                        className="w-full p-2 border border-solid border-black"
                        value={formData.category}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                category: e.target.value,
                            })
                        }
                    >
                        <option value="">Select a category</option>
                        {categoryOptions.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <button
                onClick={handleSubmit}
                disabled={loading || isUpdating}
                className="p-2 px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000] hover:shadow-[-5px_5px_0px_#000000] transition-shadow duration-200"
            >
                {isUpdate
                    ? isUpdating
                        ? "Updating..."
                        : "Update Blog"
                    : "Create Blog"}
            </button>
        </div>
    );
};

export default EditorPage;
