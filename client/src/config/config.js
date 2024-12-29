import { Client, Storage } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67712c81003dc4b0188c');

export const storage = new Storage(client);
