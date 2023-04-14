import { Client, Databases } from "appwrite";

export const {
  PUBLIC_APPWRITE_ENDPOINT,
  PUBLIC_APPWRITE_PROJECT,
  PUBLIC_APPWRITE_DB,
  PUBLIC_APPWRITE_COLLECTION,
} = import.meta.env;

const client = new Client();

client
  .setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
  .setProject(PUBLIC_APPWRITE_PROJECT);

export const appwrite = {
  client,
  databases: new Databases(client),
};
