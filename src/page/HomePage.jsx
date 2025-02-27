import { useEffect, useState } from "react";
import {
    Blogs,
    Category,
    SearchBar,
    SearchResults,
} from "../components/ImportCompo";
import Loader from "../components/Loader";
import AppwriteService from "../service/AppwriteService";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const [inputState, setInputState] = useState("");
    const [blogs, setBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate =useNavigate();

    useEffect(() => {
        fetchAllBlogs();
    }, []);

    const fetchAllBlogs = async () => {
        try {
            const allBlogs = await AppwriteService.getAllBlogs();
            if (!allBlogs) throw new Error("No blogs found.");
            setBlogs(allBlogs);
            setFilteredBlogs(allBlogs);
            setError(null);
        } catch (error) {
            console.error("Error fetching blogs:", error);
            setError("Failed to fetch blogs. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryFilter = (category) => {
        setSelectedCategory(category);
        setFilteredBlogs(
            category === "All"
                ? blogs
                : blogs.filter((blog) => blog.category === category)
        );
    };

    const inputChangeHandler = (e) => {
        const searchQuery = e.target.value;
        setInputState(searchQuery);
        filterBlogs(searchQuery);
    };

    const filterBlogs = (searchQuery) => {
        setSearchResults(
            searchQuery.trim()
                ? blogs.filter(
                      (blog) =>
                          blog.content
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase()) ||
                          blog.author
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase()) ||
                          blog.category
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase())
                  )
                : []
        );
    };

    const handleSearchResultClick = (blog) => {
        setSelectedBlog(blog);
        setInputState("");
        setSearchResults([]);
    };

    if (loading) return <Loader />;

    return (
        <div className="w-full min-h-screen pt-[90px] flex flex-col items-center">
            <section className="w-full text-center py-8">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                    Latest Blogs
                </h1>
                <p className="text-sm sm:text-base md:text-lg max-w-[600px] mx-auto">
                    Stay updated with the latest blog posts and articles.
                </p>
            </section>

            <section className="w-full flex justify-center">
                <div className="w-full max-w-[600px] px-5 sm:px-0 relative">
                    <SearchBar
                        formSubmitHandler={(e) => e.preventDefault()}
                        inputState={inputState}
                        inputChangeHandler={inputChangeHandler}
                    />
                    {searchResults.length > 0 && (
                        <SearchResults
                            results={searchResults}
                            onResultClick={handleSearchResultClick}
                        />
                    )}
                </div>
            </section>

            {selectedBlog && (
                <section className="w-full flex justify-center mt-8">
                    <div className="w-full max-w-[1200px] px-5 sm:px-10 border border-black p-4 rounded">
                        <h2 className="text-xl font-bold">
                            {selectedBlog.author}
                        </h2>
                        <p className="text-sm text-gray-600">
                            {selectedBlog.category}
                        </p>
                        <p className="mt-2">{selectedBlog.content}</p>
                    </div>
                </section>
            )}

            <section className="w-full flex justify-center mt-10">
                <div className="w-full max-w-[1200px] px-5 sm:px-10">
                    <Category
                        selectedCategory={selectedCategory}
                        onCategoryChange={handleCategoryFilter}
                    />
                </div>
            </section>

            <section className="w-full flex justify-center mt-16">
                <div className="w-full max-w-[1200px] px-5 sm:px-10">
                    {filteredBlogs.length > 0 ? (
                        <Blogs blogs={filteredBlogs} />
                    ) : (
                        <div className="text-center ">
                            
                            <p>No blogs found.</p>
                            
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default HomePage;
