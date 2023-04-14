<script>
	import { invalidateAll } from '$app/navigation';
	import { appwrite } from '$lib/appwrite';

	let showPassword = false;
	let loading = false;
	/** @type {string | null} */
	let formError = null;

	/**
	 * @param {Event} event
	 */
	async function handleSubmit(event) {
		event.preventDefault();
		loading = true;
		formError = null;

		const form = /** @type {HTMLFormElement} */ (event.target);
		const formData = /** @type Record<
			string,
			string | undefined
		> */ (Object.fromEntries(new FormData(form).entries()));

		const { name, email, password } = formData;
		if (!name || !email || !password) {
			formError = 'Please fill out all fields';
			loading = false;
			return;
		}

		try {
			await appwrite.account.create('unique()', email, password, name);
			await appwrite.account.createEmailSession(email, password);
			await invalidateAll();
		} catch (e) {
			formError = /** @type {import('appwrite').AppwriteException} */ (e).message;
		}
		loading = false;
	}
</script>

<div class="card">
	<div class="u-flex u-main-space-between u-cross-center">
		<h6 class="heading-level-6">Signup</h6>
	</div>
	<form class="form u-margin-block-start-24" method="post" on:submit={handleSubmit}>
		<ul class="form-list">
			<li class="form-item">
				<label class="label" for="name">Name</label>
				<div class="input-text-wrapper">
					<input
						type="text"
						class="input-text u-padding-inline-end-56"
						placeholder="Jane Doe"
						name="name"
						id="name"
						required
					/>
				</div>
			</li>

			<li class="form-item">
				<label class="label" for="email">Email</label>
				<div class="input-text-wrapper">
					<input
						type="email"
						class="input-text u-padding-inline-end-56"
						placeholder="janedoe@appwrite.io"
						name="email"
						id="email"
						required
					/>
				</div>
			</li>
			<li class="form-item">
				<label class="label" for="password">Password</label>
				<div class="input-text-wrapper" style="--amount-of-buttons: 1;">
					<input
						type={showPassword ? 'text' : 'password'}
						name="password"
						id="password"
						class="input-text"
						placeholder="SuperSecretPassword"
						required
						minlength="8"
					/>
					<button
						class="show-password-button"
						aria-label="show password"
						type="button"
						on:click={() => (showPassword = !showPassword)}
					>
						<span
							class:icon-eye={!showPassword}
							class:icon-eye-off={showPassword}
							aria-hidden="true"
						/>
					</button>
				</div>
			</li>
		</ul>
		<div class="form-footer u-grid u-gap-16">
			<!-- Should we use alerts? -->
			{#if formError}
				<p class=" u-text-center u-color-text-danger">{formError}</p>
			{/if}
			<div class="u-flex u-main-end u-gap-12">
				<a href="/" class="button is-secondary" type="button">Go back</a>
				<button class="button" type="submit" disabled={loading}>Signup</button>
			</div>
		</div>
	</form>
</div>

<style>
	.card {
		width: 30rem;
		max-width: calc(100vw - 2rem);
	}
</style>
