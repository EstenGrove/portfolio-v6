import { currentEnv } from "./utils_env";

const defaultOpts = {
	method: "GET",
	headers: {
		Authorization: "Basic " + btoa(currentEnv.user + ":" + currentEnv.password),
	},
};

const fetchWithAuth = (url: string, options: RequestInit = defaultOpts) => {
	const {
		method = "GET",
		headers = defaultOpts.headers,
		signal = AbortSignal.timeout(10000),
	} = options;

	try {
		return fetch(url, {
			...options,
			method,
			signal,
			// mode: "same-origin",
			headers: {
				// ...headers,
			},
		});
	} catch (error) {
		return error;
	}
};

export { fetchWithAuth };
