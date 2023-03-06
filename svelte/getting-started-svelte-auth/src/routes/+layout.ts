import { appwrite } from '$lib/appwrite';
import type { LayoutLoad } from './$types';

export const ssr = false;

export const load: LayoutLoad = async () => {
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
