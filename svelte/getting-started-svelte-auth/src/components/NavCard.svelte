<script lang="ts">
	export let href: string | undefined = undefined;
	export let icon: string;
</script>

<svelte:element this={href ? 'a' : 'button'} class="card" {href} on:click on:keydown on:keyup>
	<div class="u-grid">
		<span class={`icon-${icon}`} />
		<span class="heading-level-7"><slot /></span>
	</div>
</svelte:element>

<style>
	.card {
		display: grid;
		place-items: center;
		width: 8rem;
		height: 8rem;
		padding: 0;

		text-align: center;
	}

	.card [class^='icon-'] {
		font-size: 1.5rem;
	}
</style>
