export interface CommonResponseModel<T> {
  error?: number;
  success?: number;
  data?: T;
}
