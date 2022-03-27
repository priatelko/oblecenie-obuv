export interface ApiResponseModel<T> {
  error?: number;
  success?: number;
  data?: T;
}

// export interface FileUpload {
//   name: string;
// }
