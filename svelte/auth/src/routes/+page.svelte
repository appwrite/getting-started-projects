<script>
	import { invalidateAll } from '$app/navigation';
	import NavCard from '$components/NavCard.svelte';
	import { appwrite } from '$lib/appwrite';

	export let data;

	$: loggedIn = !!data.account;

	async function logout() {
		await appwrite.account.deleteSession('current');
		await invalidateAll();
	}
</script>

<div class="u-flex u-gap-16">
	{#if loggedIn}
		<NavCard href="/profile" icon="user">Profile</NavCard>
		<NavCard icon="logout-right" on:click={logout}>Logout</NavCard>
	{:else}
		<NavCard href="/signup" icon="pencil-alt">Signup</NavCard>
		<NavCard href="/login" icon="logout-left">Login</NavCard>
	{/if}
</div>
