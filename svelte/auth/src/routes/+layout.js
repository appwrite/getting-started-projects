import { appwrite } from '$lib/appwrite';

export const ssr = false;

export const load = async () => {
	try {
		return {
			account: await appwrite.account.get()
		};
	} catch {
		return {
			account: null
		};
	}
};
