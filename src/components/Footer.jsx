import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedin,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className=" py-10">
            <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Brand & About */}
                <div>
                    <h2 className="text-2xl font-bold">Blogify</h2>
                    <p className="text-gray-600 mt-2">
                        Your go-to source for insightful blogs on various
                        topics.
                    </p>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col space-y-2">
                    <h3 className="text-lg font-semibold">Quick Links</h3>
                    <Link to="/" className="text-gray-600 hover:text-black">
                        Home
                    </Link>
                    <Link to="#" className="text-gray-600 hover:text-black">
                        Blogs
                    </Link>
                    <Link
                        to="#"
                        className="text-gray-600 hover:text-black"
                    >
                        About
                    </Link>
                    <Link
                        to="#"
                        className="text-gray-600 hover:text-black"
                    >
                        Contact
                    </Link>
                </div>

                {/* Newsletter & Social Media */}
                <div>
                    <h3 className="text-lg font-semibold">
                        Subscribe to Newsletter
                    </h3>
                    <form className="mt-3 flex">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="px-3 py-2 w-full text-black rounded-l focus:outline-none"
                        />
                       
                    </form>

                    {/* Social Links */}
                    <div className="flex space-x-4 mt-4">
                        <a
                            href="#"
                            className="text-gray-600 hover:text-black text-lg"
                        >
                            <FaFacebookF />
                        </a>
                        <a
                            href="#"
                            className="text-gray-600 hover:text-black text-lg"
                        >
                            <FaTwitter />
                        </a>
                        <a
                            href="#"
                            className="text-gray-600 hover:text-black text-lg"
                        >
                            <FaInstagram />
                        </a>
                        <a
                            href="#"
                            className="text-gray-600 hover:text-black text-lg"
                        >
                            <FaLinkedin />
                        </a>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="mt-8 text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} Blogify. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
