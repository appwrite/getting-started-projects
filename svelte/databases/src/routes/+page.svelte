<script>
	import { invalidateAll } from '$app/navigation';
	import { PUBLIC_APPWRITE_COLLECTION, PUBLIC_APPWRITE_DB } from '$env/static/public';
	import { appwrite } from '$lib/appwrite';

	import AddModal from './AddModal.svelte';
	import EditModal from './EditModal.svelte';

	export let data;

	/**
	 * Formats a number to a human readable format
	 * @param num {number}
	 *
	 */
	function formatNumber(num) {
		if (num > 999 && num < 1000000) {
			const decimalPoints = num % 1000 === 0 ? 0 : 1;
			return (num / 1000).toFixed(decimalPoints) + 'k';
		}

		return num;
	}

	/**
	 * Formats a date to a human readable format
	 * @param date {string}
	 */
	function formatDate(date) {
		const d = new Date(date);
		return d.toLocaleDateString('en-UK', {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		});
	}

	/** @type {HTMLDialogElement} */
	let addModal;

	/** @type {HTMLDialogElement} */
	let editModal;
	/** @type {import('$lib/types').Framework | null} */
	let editingFramework = null;

	/**
	 * @param id {string}
	 */
	async function handleDelete(id) {
		await appwrite.databases.deleteDocument(PUBLIC_APPWRITE_DB, PUBLIC_APPWRITE_COLLECTION, id);
		await invalidateAll();
	}
</script>

<div class="wrapper">
	<button class="button" on:click={() => addModal.showModal()}>
		<span class="icon-plus" aria-hidden="true" />
		<span class="text"> Add framework </span>
	</button>

	<div class="table-with-scroll">
		<div class="table-wrapper">
			<table class="table is-selected-columns-mobile">
				<thead class="table-thead">
					<tr class="table-row">
						<th class="table-thead-col" style="--p-col-width:140">
							<span class="eyebrow-heading-3">Name</span>
						</th>
						<th class="table-thead-col" style="--p-col-width:140">
							<span class="eyebrow-heading-3">Stars</span>
						</th>
						<th class="table-thead-col" style="--p-col-width:200">
							<span class="eyebrow-heading-3">Release date</span>
						</th>
						<th class="table-thead-col" style="--p-col-width:40" />
					</tr>
				</thead>
				<tbody class="table-tbody">
					<!-- Deal with empty state -->
					{#each data.frameworks as framework}
						<tr class="table-row">
							<td class="table-col" data-title="Name">
								<span class="text">{framework.name}</span>
							</td>
							<td class="table-col" data-title="Stars">
								<div class="tag"><span class="text">{formatNumber(framework.stars)}</span></div>
							</td>
							<td class="table-col" data-title="Release Date">
								<time class="text">{formatDate(framework.release_date)}</time>
							</td>
							<td class="table-col u-overflow-visible">
								<div class="u-flex u-cross-center">
									<button
										class="button is-text is-only-icon"
										aria-label="more options"
										on:click={() => {
											editingFramework = {
												...framework,
												// to yyyy-mm-dd
												release_date: new Date(framework.release_date).toISOString().slice(0, 10)
											};
											editModal.showModal();
										}}
									>
										<span class="icon-pencil" aria-hidden="true" />
									</button>
									<button
										class="button is-text is-only-icon"
										aria-label="more options"
										on:click={() => handleDelete(framework.$id)}
									>
										<span class="icon-trash" aria-hidden="true" />
									</button>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

	<nav class="pagination">
		<a
			href={data.prevPageUrl}
			class="button is-text"
			class:is-disabled={data.prevPageUrl === null}
			aria-label="prev page"
		>
			<span class="icon-cheveron-left" aria-hidden="true" />
			<span class="text">Prev</span>
		</a>

		<a
			href={data.nextPageUrl}
			class="button is-text"
			class:is-disabled={data.nextPageUrl === null}
			aria-label="next page"
		>
			<span class="text">Next</span>
			<span class="icon-cheveron-right" aria-hidden="true" />
		</a>
	</nav>
</div>

<AddModal bind:dialog={addModal} />
<EditModal bind:dialog={editModal} framework={editingFramework} />

<style>
	.wrapper {
		width: 55rem;
		max-width: calc(100vw - 2rem);

		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: flex-end;
	}
</style>
