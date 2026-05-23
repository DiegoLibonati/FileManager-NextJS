export interface DefaultResponse {
  code: string;
  message: string;
}

export type ResponseWithData<T> = DefaultResponse & ResponseData<T>;

export interface ResponseData<T> {
  data: T;
  error?: never;
}

export interface ResponseError {
  data?: never;
  error: string;
}
