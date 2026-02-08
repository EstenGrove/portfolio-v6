import { AsyncResponse } from "../features/types";
import { contact, currentEnv } from "./utils_env";
import { fetchWithAuth } from "./utils_http";

export interface ContactMeValues {
	firstName: string;
	lastName: string;
	email: string;
	message: string;
}

export interface ContactMeResp {
	WasSuccessful: boolean;
	Error: string | null;
}

export type ContactMeResponse = AsyncResponse<ContactMeResp>;

export const sendContactMe = async (values: ContactMeValues) => {
	const url = currentEnv.base + contact.submit;

	try {
		const request = (await fetchWithAuth(url, {
			method: "POST",
			body: JSON.stringify({
				contactForm: values,
			}),
		})) as Response;
		const response = await request.json();
		return response.Data as ContactMeResp;
	} catch (error) {
		return error;
	}
};
