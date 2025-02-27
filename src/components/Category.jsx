const Category = ({ selectedCategory, onCategoryChange }) => {
    const categories = ["All", "Technology", "Education", "Music", "Other"];

    return (
        <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((category, index) => (
                <button
                    key={index}
                    onClick={() => onCategoryChange(category)}
                    className={`px-4 py-2 border border-black rounded ${
                        selectedCategory === category
                            ? "bg-black text-white"
                            : "bg-white text-black"
                    }`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default Category;
