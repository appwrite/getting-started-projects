<script lang="ts">
	import '@appwrite.io/pink';
	import '@appwrite.io/pink-icons';
	import '@fontsource/poppins/400.css';
	import '@fontsource/poppins/500.css';
	import '@fontsource/poppins/600.css';
	import '@fontsource/poppins/700.css';
</script>

<div class="container">
	<div>
		<slot />
	</div>
</div>

<style>
	.container {
		display: grid;
		place-items: center;
		min-height: 100vh;
	}
</style>
