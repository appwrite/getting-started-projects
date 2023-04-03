import type { Models } from 'appwrite';
import { writable } from 'svelte/store';

export const userId = writable<string | null>(null);
