import { PUBLIC_APPWRITE_COLLECTION_ID, PUBLIC_APPWRITE_DB_ID } from '$env/static/public';
import { appwrite } from '$lib/appwrite';
import { messages } from '$stores/messages';
import { userId } from '$stores/user';
import type { LayoutLoad } from './$types';

async function getSession() {
	try {
		const user = await appwrite.account.get();
		return user.$id;
	} catch {
		const session = await appwrite.account.createAnonymousSession();
		return session.userId;
	}
}

export const ssr = false;

export const load: LayoutLoad = async () => {
	const session = await getSession();
	const response = await appwrite.databases.listDocuments(
		PUBLIC_APPWRITE_DB_ID,
		PUBLIC_APPWRITE_COLLECTION_ID
	);

	// Should we do validation here?
	messages.set(response.documents as any);
	userId.set(session);
};
