import { PUBLIC_APPWRITE_COLLECTION_ID, PUBLIC_APPWRITE_DB_ID } from '$env/static/public';
import { appwrite } from '$lib/appwrite';
import { session } from '$lib/session';
import { messages } from '$stores/messages';
import { Query } from 'appwrite';
import type { LayoutLoad } from './$types';

export const ssr = false;

export const load: LayoutLoad = async () => {
	const response = await appwrite.databases.listDocuments(
		PUBLIC_APPWRITE_DB_ID,
		PUBLIC_APPWRITE_COLLECTION_ID,
		[Query.equal('sessionId', session)]
	);

	// Should we do validation here?
	messages.set(response.documents as any);
};
