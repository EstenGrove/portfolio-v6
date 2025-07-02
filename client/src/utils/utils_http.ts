import { AsyncResponse } from "../features/types";

export interface FetchOptions {
	method?: "GET" | "POST" | "PUT" | "DELETE";
	headers?: HeadersInit;
	body?: string;
}

const defaultOpts: FetchOptions = {
	method: "GET",
};

const fetchWithAuth = <T extends any>(
	url: string,
	options: FetchOptions = defaultOpts
): AsyncResponse<T> => {
	return fetch(url, {
		...(options as RequestInit),
		// credentials: "include",
	});
};

const sleep = (ms: number = 650) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(ms);
		}, ms);
	});
};

const fetchImage = async (imageName: string) => {
	const url = "http://localhost:3004" + "/something/" + imageName;

	try {
		const req = await fetch(url);
		const res = await req.blob();
		return res;
	} catch (error) {
		return error;
	}
};

export { fetchWithAuth, fetchImage, sleep };
