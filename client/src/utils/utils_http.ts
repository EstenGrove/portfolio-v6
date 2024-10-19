import { currentEnv } from "./utils_env";

const defaultOpts = {
	method: "GET",
	headers: {
		Authorization: "Basic " + btoa(currentEnv.user + ":" + currentEnv.password),
	},
};

// ##TODOS:
// - Fix CORs errors
// - Un-comment 'headers' & 'mode' when site is deployed/live
const fetchWithAuth = (url: string, options: RequestInit = defaultOpts) => {
	const {
		method = "GET",
		// headers = defaultOpts.headers,
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

const fetchImage = async (imageName: string) => {
	const url = "http://localhost:3000" + "/something/" + imageName;

	try {
		const req = await fetch(url);
		const res = await req.blob();
		return res;
	} catch (error) {
		return error;
	}
};

export { fetchWithAuth, fetchImage };
