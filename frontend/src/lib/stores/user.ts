import { writable } from "svelte/store";

export const currentUserName = writable("");
export const userNID = writable("");
export const isLoggedIn = writable(false);