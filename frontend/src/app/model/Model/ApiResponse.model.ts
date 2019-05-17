export interface ApiResponseModel<T> {
  error?: number;
  success?: number;
  data?: T;
}
