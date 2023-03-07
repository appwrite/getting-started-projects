import { Client } from "appwrite";

export const { PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT } = import.meta
  .env;

console.log(PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT);
const client = new Client();

client
  .setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
  .setProject(PUBLIC_APPWRITE_PROJECT);

export const appwrite = {
  client,
};
