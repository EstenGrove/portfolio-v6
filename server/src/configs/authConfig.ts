import { API_USER } from "../utils/utils_env";

const authConfig = {
	...API_USER,
	invalidUserMessage: "Nice try bozo",
};

export { authConfig };
