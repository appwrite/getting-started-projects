import { PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT } from '$env/static/public';
import { Account, Client, Databases } from 'appwrite';

const client = new Client();
client.setEndpoint(PUBLIC_APPWRITE_ENDPOINT).setProject(PUBLIC_APPWRITE_PROJECT);

export const appwrite = {
	client,
	databases: new Databases(client),
	account: new Account(client)
};
