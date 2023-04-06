<script>
	import { PUBLIC_APPWRITE_COLLECTION_ID, PUBLIC_APPWRITE_DB_ID } from '$env/static/public';
	import { appwrite } from '$lib/appwrite';

	import { messages } from '$stores/messages';
	import { userId } from '$stores/user';
	import { Permission, Role } from 'appwrite';
	import { fly } from 'svelte/transition';

	/** @type {import('$lib/types').Source} */
	export let source;

	let value = '';

	/** @type {HTMLInputElement} */
	let input;

	/** @type {import('$lib/types').Message[]} */
	let localMessages = [];

	messages.subscribe((value) => {
		if (value.length > localMessages.length) {
			localMessages = value;
		}
	});

	async function sendMessage() {
		if (!value || !$userId) return;

		const message = {
			text: value,
			source
		};
		localMessages = [...localMessages, message];
		appwrite.databases.createDocument(
			PUBLIC_APPWRITE_DB_ID,
			PUBLIC_APPWRITE_COLLECTION_ID,
			'unique()',
			message,
			[Permission.read(Role.user($userId))]
		);
		value = '';
		input.focus();
	}
</script>

<div class="card">
	<div class="messages">
		<ul class="u-grid u-gap-16">
			{#each localMessages as message}
				<li in:fly={{ y: 32 }}>
					<span data-message={message.source === source ? 'sent' : 'incoming'}>
						{message.text}
					</span>
				</li>
			{:else}
				No messages
			{/each}
		</ul>
	</div>

	<form
		class="u-flex u-cross-center u-gap-4 u-margin-block-start-32"
		on:submit|preventDefault={sendMessage}
	>
		<div class="input-text-wrapper">
			<input class="input-text" type="text" bind:value placeholder="Hey there!" bind:this={input} />
		</div>
		<button class="button" disabled={!value}>Send message</button>
	</form>
</div>

<style>
	.card {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 40rem;
		width: 25rem;
	}

	.messages {
		overflow-y: scroll;
		flex-grow: 1;
	}

	li {
		display: flex;
	}

	li span {
		display: block;
		border-radius: 0.25rem;
		padding-block: 0.5rem;
		padding-inline: 1rem;
		max-width: 15rem;
	}

	li span[data-message='sent'] {
		--clr: hsl(343, 98%, 65%);
		background-color: var(--clr);
		border: 1px solid var(--clr);
		color: white;
		margin-left: auto;
	}

	li span[data-message='incoming'] {
		background-color: hsl(0, 0%, 100%);
		border: 1px solid hsl(0, 0%, 80%);
	}

	.input-text-wrapper {
		flex-grow: 1;
	}
</style>
