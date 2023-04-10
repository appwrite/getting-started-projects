import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
	const { account } = await parent();
	if (account) {
		throw redirect(303, '/');
	}
}
