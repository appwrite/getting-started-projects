import { PUBLIC_APPWRITE_COLLECTION, PUBLIC_APPWRITE_DB } from '$env/static/public';
import { appwrite } from '$lib/appwrite';
import { Query } from 'appwrite';

const ITEMS_PER_PAGE = 2;

export const load = async ({ url }) => {
	const page = Number(url.searchParams.get('page') || '1');

	const { total, documents } = await appwrite.databases.listDocuments(
		PUBLIC_APPWRITE_DB,
		PUBLIC_APPWRITE_COLLECTION,
		[Query.limit(ITEMS_PER_PAGE), Query.offset((page - 1) * ITEMS_PER_PAGE)]
	);

	return {
		frameworks: /** @type {import('$lib/types').Framework[]} */ (
			/** @type {unknown} */ (documents)
		),
		prevPageUrl: page > 1 ? `/?page=${page - 1}` : null,
		nextPageUrl: page < total / ITEMS_PER_PAGE ? `/?page=${page + 1}` : null
	};
};
