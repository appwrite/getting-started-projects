import { writable } from 'svelte/store';

export const messages = writable(/** @type {import('$lib/types').Message[]} */ ([]));
