export interface DefaultResponse {
  code: string;
  message: string;
}

export interface ResponseWithData<T> extends DefaultResponse {
  data: T;
}
