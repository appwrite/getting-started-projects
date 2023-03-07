import { PUBLIC_APPWRITE_ENDPOINT } from '$env/static/public';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const res = await fetch(`${PUBLIC_APPWRITE_ENDPOINT}/health/version`);
	const { version } = await res.json();

	return {
		version: typeof version === 'string' ? version : 'unknown'
	};
};
