<script>
	import Chat from '$components/Chat.svelte';
	import { PUBLIC_APPWRITE_COLLECTION, PUBLIC_APPWRITE_DB } from '$env/static/public';
	import { appwrite } from '$lib/appwrite';
	import { messages } from '$stores/messages';
	import { onMount } from 'svelte';

	/**
	 * Sleeps for a given amount of time
	 * @param ms {number}
	 */
	function sleep(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	onMount(() => {
		return appwrite.client.subscribe(
			`databases.${PUBLIC_APPWRITE_DB}.collections.${PUBLIC_APPWRITE_COLLECTION}.documents`,
			async ({ payload }) => {
				await sleep(1000);
				messages.update((prev) => [...prev, /** @type {import('$lib/types').Message} */ (payload)]);
			}
		);
	});
</script>

<div class="container">
	<div>
		<div class="u-flex u-gap-32 u-margin-block-start-32 u-cross-center">
			<Chat source="left" />
			<i class="icon-switch-horizontal" />
			<Chat source="right" />
		</div>
	</div>
</div>

<style>
	.container {
		display: grid;
		place-items: center;
		min-height: 100vh;
	}

	i {
		font-size: 2rem;
	}
</style>
