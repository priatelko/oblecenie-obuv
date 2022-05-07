import { HttpEvent } from '@angular/common/http';

export interface ApiResponseModel<T> {
  error?: number;
  success?: number;
  data?: T;
  event?: HttpEvent<any>;
}

// export interface FileUpload {
//   name: string;
// }
