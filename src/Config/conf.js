export const envConfig = {
    Appwrite_url: String(import.meta.env.VITE_APPWRITE_URL),
    Appwrite_Project_id: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    Appwrite_Database_id: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    Appwrite_Collection_id: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    Appwrite_Buckets_id: String(import.meta.env.VITE_APPWRITE_BUCKETS_ID),
};

Object.freeze(envConfig);
