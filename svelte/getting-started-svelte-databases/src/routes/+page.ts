import { PUBLIC_APPWRITE_COLLECTION, PUBLIC_APPWRITE_DB } from '$env/static/public';
import { appwrite } from '$lib/appwrite';
import type { Models } from 'appwrite';
import type { PageLoad } from './$types';

export type Framework = {
	name: string;
	release_date: string;
	stars: number;
} & Pick<Models.Document, '$id'>;

export const load: PageLoad = async () => {
	const res = await appwrite.databases.listDocuments(
		PUBLIC_APPWRITE_DB,
		PUBLIC_APPWRITE_COLLECTION
		// We should probably limit to the current user only
	);

	return {
		// Should we validate?
		frameworks: res.documents as unknown as Framework[]
	};
};
