import { appwrite } from '$lib/appwrite';

export const ssr = false;

/** @type {import('./$types').LayoutLoad} */
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
