import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoggingInterceptor } from './logging-interceptor';
import { CachingInterceptor } from './caching-interceptor';
import { LoadingIndicatorInterceptor } from './loading-indicator-interceptor';
import { MultiplePreventInterceptor } from './multiple-prevent-interceptor';

export const httpInterceptorProviders = [
  // { provide: HTTP_INTERCEPTORS, useClass: MultiplePreventInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoadingIndicatorInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
];
