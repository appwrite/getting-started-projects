import { writable } from 'svelte/store';

/** @type {import('svelte/store').Writable<import('appwrite').Models.Document[]>} */
export const messages = writable([]);
