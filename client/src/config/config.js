import { Client, Storage } from "appwrite";

const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_PROJECTENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECTID);

export const storage = new Storage(client);
