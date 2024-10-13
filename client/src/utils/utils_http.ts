import { currentEnv } from "./utils_env";

const defaultOpts = {
	method: "GET",
};

const fetchWithAuth = (url: string, options: RequestInit = defaultOpts) => {
	const { method = "GET", signal = AbortSignal.timeout(10000) } = options;
	try {
		return fetch(url, {
			...options,
			method,
			signal,
			headers: {
				Authorization:
					"Basic " + btoa(currentEnv.user + ":" + currentEnv.password),
			},
		});
	} catch (error) {
		return error;
	}
};

export { fetchWithAuth };
