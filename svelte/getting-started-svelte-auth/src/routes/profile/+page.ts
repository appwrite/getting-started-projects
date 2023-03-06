import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	const { account } = await parent();
	if (!account) {
		throw redirect(303, '/');
	}
};
