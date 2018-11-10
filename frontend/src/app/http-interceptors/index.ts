import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoggingInterceptor } from './logging-interceptor';
import { CachingInterceptor } from './caching-interceptor';
import { LoadingIndicatorInterceptor } from './loading-indicator-interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: LoadingIndicatorInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true }
];
