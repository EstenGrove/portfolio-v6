export type TResponseStatus = "SUCCESS" | "FAILED";
export interface IApiDefault<T> {
	Status: TResponseStatus;
	Data: T | null;
	Message?: string;
	Results?: string | number;
	ErrorMsg?: string | null;
	ErrorStack?: string | null;
}

const getResponseOk = <T extends object>(data: T): IApiDefault<T> => {
	const results: number = Object?.keys(data)?.length || 0;

	return {
		Status: "SUCCESS",
		Data: data,
		Results: results,
		ErrorMsg: null,
		ErrorStack: null,
	};
};
const getResponseError = <T extends object>(
	err: Error,
	data: T = {} as T
): IApiDefault<T> => {
	const results: number = Object?.keys(data)?.length || 0;

	return {
		Status: "FAILED",
		Data: {
			...data,
		},
		Results: results,
		ErrorMsg: err.message,
		ErrorStack: err.stack,
	};
};

export { getResponseOk, getResponseError };
