import { PUBLIC_APPWRITE_COLLECTION, PUBLIC_APPWRITE_DB } from '$env/static/public';
import { appwrite } from '$lib/appwrite';
import { messages } from '$stores/messages';
import { userId } from '$stores/user';

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

export const load = async () => {
	const session = await getSession();
	const { documents } = await appwrite.databases.listDocuments(
		PUBLIC_APPWRITE_DB,
		PUBLIC_APPWRITE_COLLECTION
	);

	messages.set(/** @type {import('$lib/types').Message[]} */ (/** @type {unknown} */ (documents)));
	userId.set(session);
};
