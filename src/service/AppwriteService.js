// appwriteConfig.js
import {
    Client,
    Databases,
    ID,
    Permission,
    Query,
    Role,
    Storage,
} from "appwrite";
import { envConfig } from "../Config/conf";

// Initialize Appwrite client
const client = new Client();

client
    .setEndpoint(envConfig.Appwrite_url) // Your Appwrite endpoint
    .setProject(envConfig.Appwrite_Project_id); // Your project ID

// Initialize services
const databases = new Databases(client);
const storage = new Storage(client);

// Database and collection IDs
const databaseId = envConfig.Appwrite_Database_id;
const blogCollectionId = envConfig.Appwrite_Collection_id;

// Blog service functions
const AppwriteService = {
    // Get all blogs
    getAllBlogs: async (category = "") => {
        try {
            let queries = [];

            if (category) {
                queries.push(Query.equal("category", category));
            }

            const response = await databases.listDocuments(
                databaseId,
                blogCollectionId,
                queries
            );

            return response.documents;
        } catch (error) {
            console.error("Error fetching blogs:", error);
            throw error;
        }
    },

    // Get single blog by ID
    getBlogById: async (id) => {
        try {
            return await databases.getDocument(
                databaseId,
                blogCollectionId,
                id
            );
        } catch (error) {
            console.error("Error fetching blog:", error);
            throw error;
        }
    },

    createBlog: async (blogData) => {
        try {
            return await databases.createDocument(
                databaseId,
                blogCollectionId,
                ID.unique(),
                {
                    content: blogData.content,
                    author: blogData.author,
                    category: blogData.category,
                }
            );
        } catch (error) {
            console.error("Error creating blog:", error);
            throw error;
        }
    },

    // Update existing blog
    updateBlog: async (id, blogData) => {
        try {
            return await databases.updateDocument(
                databaseId,
                blogCollectionId,
                id,
                blogData // Ensure data is correctly structured
            );
        } catch (error) {
            console.error("Error updating blog:", error);
            throw error;
        }
    },

    // Delete blog
    deleteBlog: async (id) => {
        try {
            return await databases.deleteDocument(
                databaseId,
                blogCollectionId,
                id
            );
        } catch (error) {
            console.error("Error deleting blog:", error);
            throw error;
        }
    },
};

export default AppwriteService;
