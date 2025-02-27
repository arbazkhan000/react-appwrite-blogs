import {
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
} from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    const [scroll, setScroll] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScroll(true);
            } else {
                setScroll(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                scroll ? "bg-white shadow-lg py-4" : "bg-transparent py-6"
            }`}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
                {/* Logo */}
                <h2
                    onClick={() => navigate("/")}
                    className="text-xl sm:text-2xl font-bold"
                >
                    Blogify
                </h2>

                <div className="flex items-center space-x-5">
                    {/* Show "Create Blog" button only if the user is signed in */}
                    <Link to={"/blog/create"}>
                        <SignedIn>
                            <button className="p-2 border border-solid border-black shadow-[-7px_7px_0px_#000000] cursor-pointer">
                                Create Blog
                            </button>
                        </SignedIn>
                    </Link>

                    {/* Show SignInButton if the user is signed out, otherwise show UserButton */}
                    <SignedOut>
                        <SignInButton>
                            <button className="p-2 border border-solid border-black shadow-[-7px_7px_0px_#000000] hover:shadow-[-5px_5px_0px_#000000] transition-shadow duration-200">
                                Sign In
                            </button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </div>
        </header>
    );
};

export default Header;
