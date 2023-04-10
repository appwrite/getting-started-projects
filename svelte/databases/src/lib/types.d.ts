import type { Models } from 'appwrite';

export type Framework = {
	name: string;
	release_date: string;
	stars: number;
} & Pick<Models.Document, '$id'>;
