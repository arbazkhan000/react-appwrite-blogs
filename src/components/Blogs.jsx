import { useNavigate } from "react-router-dom";

const Blogs = ({ blogs }) => {
    const navigate = useNavigate();
    return (
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {blogs.map((blog) => (
                <div
                    onClick={() => navigate(`/blog/${blog.$id}`)}
                    key={blog.$id}
                    className=" p-2 border border-solid border-black shadow-[-7px_7px_0px_#000000] hover:shadow-[-5px_5px_0px_#000000] transition-shadow duration-200 cursor-pointer"
                >
                    <h2 className="text-xl font-bold">{blog.author}</h2>
                    <p className="text-sm text-gray-600">{blog.category}</p>
                    <p className="mt-2">{blog.content.slice(0, 30)}...</p>
                </div>
            ))}
        </div>
    );
};

export default Blogs;
