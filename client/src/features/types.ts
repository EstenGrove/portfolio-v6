export type TStatus = "IDLE" | "PENDING" | "FULFILLED" | "REJECTED";
export type TResponseStatus = "SUCCESS" | "FAILED";

export type IResponseData<T> = T;

export interface IResponse<T> {
	Status: TResponseStatus;
	Data: IResponseData<T>;
	Message?: string | null;
	Results?: string | number;
	ErrorMessage?: string | null;
	ErrorStack?: string | null;
}
