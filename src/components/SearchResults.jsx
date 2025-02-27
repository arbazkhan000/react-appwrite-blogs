import { Link } from "react-router-dom";

const SearchResults = ({ results, onResultClick }) => {
    return (
        <div className="absolute w-full bg-white border border-black rounded mt-2 z-10">
            {results.map((blog) => (
                <Link to={`/blog/${blog.$id}`} key={blog.$id}>
                    <div
                        onClick={() => onResultClick(blog)}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                        <h3 className="font-bold">{blog.author}</h3>
                        <p className="text-sm text-gray-600">{blog.category}</p>
                        <p className="text-sm">
                            {blog.content.substring(0, 50)}...
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default SearchResults;
