import { ClerkProvider } from "@clerk/clerk-react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import { BlogCreate, BlogDetails, Blogs } from "./components/ImportCompo.js";
import "./index.css";
import { HomePage } from "./page/ImportPage.js";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <HomePage /> }, // Default home route
            { path: "blog", element: <Blogs /> }, // Blog listing page
            { path: "blog/:id", element: <BlogDetails /> }, // Single blog page
            { path: "blog/create", element: <BlogCreate /> }, // Create blog page
            {
                path: "blog/update/:id",
                element: <BlogCreate isUpdate={true} />,
            }, // Update blog page
            
        ],
    },
]);

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
            <Toaster position="top-center" reverseOrder={false} />
            <RouterProvider router={router} />
        </ClerkProvider>
    </StrictMode>
);
