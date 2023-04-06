<script>
	import { invalidateAll } from '$app/navigation';
	import { PUBLIC_APPWRITE_COLLECTION, PUBLIC_APPWRITE_DB } from '$env/static/public';
	import { appwrite } from '$lib/appwrite';

	/** @type {HTMLDialogElement} */
	export let dialog;
	let loading = false;

	/**
	 *
	 * @param event {Event}
	 */
	async function submit(event) {
		if (loading) return;
		loading = true;
		event.preventDefault();

		const form = /** @type {HTMLFormElement} */ (event.target);
		const { name, stars, release_date } = Object.fromEntries(new FormData(form).entries());

		if (!name || !stars || !release_date) {
			return;
		}

		await appwrite.databases.createDocument(
			PUBLIC_APPWRITE_DB,
			PUBLIC_APPWRITE_COLLECTION,
			'unique()',
			{
				name,
				stars: Number(stars),
				// Should we use a type-guard/zod?
				release_date: new Date(/** @type {string} */ (release_date)).toISOString()
			}
		);
		await invalidateAll();

		dialog.close();
		loading = false;
	}
</script>

<dialog class="modal" bind:this={dialog}>
	<form class="modal-form" on:submit|preventDefault={submit}>
		<header class="modal-header">
			<h4 class="modal-title heading-level-5">Add framework</h4>

			<button
				class="button is-text is-small is-only-icon"
				aria-label="Close modal"
				on:click={() => dialog.close()}
			>
				<span class="icon-x" aria-hidden="true" />
			</button>
		</header>

		<div class="modal-content u-small">
			<div class="form u-margin-block-start-24">
				<ul class="form-list">
					<li class="form-item">
						<label class="label" for="name">Name</label>
						<div class="input-text-wrapper">
							<input
								type="name"
								class="input-text u-padding-inline-end-56"
								placeholder="Framework.js"
								name="name"
								required
							/>
						</div>
					</li>
					<li class="form-item">
						<label class="label" for="stars">Stars</label>
						<div class="input-text-wrapper">
							<input
								type="number"
								class="input-text"
								placeholder="10000"
								name="stars"
								required
								min="0"
							/>
						</div>
					</li>
					<li class="form-item">
						<label class="label" for="release_date">Release date</label>
						<div class="input-text-wrapper">
							<input type="date" class="input-text" name="release_date" required />
						</div>
					</li>
				</ul>
			</div>
		</div>

		<div class="modal-footer">
			<div class="u-flex u-main-end u-gap-16">
				<button class="button is-text" on:click={() => dialog.close()}>
					<span class="text">Cancel</span>
				</button>

				<button class="button is-secondary" type="submit" disabled={loading}>
					<span class="text">Add</span>
				</button>
			</div>
		</div>
	</form>
</dialog>
