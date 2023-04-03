import { PUBLIC_APPWRITE_COLLECTION, PUBLIC_APPWRITE_DB } from '$env/static/public';
import { appwrite } from '$lib/appwrite';
import { Query, type Models } from 'appwrite';

export type Framework = {
	name: string;
	release_date: string;
	stars: number;
} & Pick<Models.Document, '$id'>;

const ITEMS_PER_PAGE = 2;

export const load = async ({ url }) => {
	const page = Number(url.searchParams.get('page') || '1');
	console.log(page);

	const res = await appwrite.databases.listDocuments(
		PUBLIC_APPWRITE_DB,
		PUBLIC_APPWRITE_COLLECTION,
		[Query.limit(ITEMS_PER_PAGE), Query.offset((page - 1) * ITEMS_PER_PAGE)]
	);

	return {
		// Should we validate?
		frameworks: res.documents as unknown as Framework[],
		prevPageUrl: page > 1 ? `/?page=${page - 1}` : null,
		nextPageUrl: page < res.total / ITEMS_PER_PAGE ? `/?page=${page + 1}` : null
	};
};
