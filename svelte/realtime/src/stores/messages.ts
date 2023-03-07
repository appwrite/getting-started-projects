import { writable } from 'svelte/store';

export type Message = {
	sessionId: string;
	source: 'left' | 'right';
	text: string;
};

export const messages = writable<Message[]>([]);
