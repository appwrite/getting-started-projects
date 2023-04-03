<script lang="ts">
	import { PUBLIC_APPWRITE_COLLECTION_ID, PUBLIC_APPWRITE_DB_ID } from '$env/static/public';
	import { appwrite } from '$lib/appwrite';

	import { messages, type Message } from '$stores/messages';
	import { userId } from '$stores/user';
	import { Permission, Role } from 'appwrite';
	import { fly } from 'svelte/transition';

	export let source: 'left' | 'right';

	let value = '';
	let input: HTMLInputElement;

	let localMessages: Message[] = [];

	messages.subscribe((value) => {
		if (value.length > localMessages.length) {
			localMessages = value;
		}
	});

	async function sendMessage() {
		if (!value || !$userId) return;

		const message: Message = {
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
		console.log(input);
	}
</script>

<div class="card">
	<div class="messages">
		<ul class="u-grid u-gap-16">
			{#each localMessages as message, index (index)}
				<li in:fly|local={{ y: 32 }}>
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
		height: 50rem;
		width: 25rem;
	}

	.messages {
		overflow-y: scroll;
		padding-inline-end: 1rem;
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

	li span[data-message='incoming'] {
		--clr: hsl(120, 70%, 90%);
		background-color: var(--clr);
		border: 1px solid var(--clr);
	}

	li span[data-message='sent'] {
		background-color: hsl(0, 0%, 100%);
		border: 1px solid hsl(0, 0%, 80%);
		margin-left: auto;
	}

	.input-text-wrapper {
		flex-grow: 1;
	}
</style>
