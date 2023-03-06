<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="card">
	<div class="avatar is-size-x-large"><span class="icon-user" /></div>
	<h1 class="heading-level-5">{data.account?.name}</h1>
	<a href="/" class="button is-secondary u-margin-block-start-16" type="button">Go back</a>
</div>

<style>
	.card {
		width: 15rem;
		max-width: calc(100vw - 2rem);

		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
