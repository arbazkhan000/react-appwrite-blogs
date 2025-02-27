import React from "react";

const Loader = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-12 h-12 border-4 border-dashed border-black rounded-full animate-spin"></div>
        </div>
    );
};

export default Loader;
