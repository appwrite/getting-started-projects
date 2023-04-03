import { writable } from 'svelte/store';

export type Message = {
	source: 'left' | 'right';
	text: string;
};

export const messages = writable<Message[]>([]);
