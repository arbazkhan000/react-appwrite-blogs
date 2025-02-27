const SearchBar = ({ formSubmitHandler, inputState, inputChangeHandler }) => {
    return (
        <form onSubmit={formSubmitHandler} className="w-full">
            <input
                type="text"
                placeholder="Search blogs..."
                value={inputState}
                onChange={inputChangeHandler}
                className="w-full p-2 border border-black rounded"
            />
        </form>
    );
};

export default SearchBar;
