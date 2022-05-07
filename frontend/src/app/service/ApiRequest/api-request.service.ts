import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { isUndefined, isEmpty } from 'lodash';
import { TranslateService } from '@ngx-translate/core';
import { IdentityService } from '../User/identity.service';
import { map, tap, share, switchMap } from 'rxjs/operators';
import { FlashMessageService } from '../FlashMessage/flash-message.service';
import { ApiResponseModel } from '../../model/Model/ApiResponse.model';
import { LogService } from '../Admin/log.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiRequestService {
  // Extending the HttpClient through the Angular DI.
  constructor(
    private http: HttpClient,
    private translateService: TranslateService,
    private identityService: IdentityService,
    private flashmessage: FlashMessageService,
    private debug: LogService
  ) {
    // If you don't want to use the extended versions in some cases you can access the public property and use the original one.
    // for ex. this.httpClient.http.get(...)
  }

  get<T>(
    endPoint: string,
    options?: HttpExtendedOptions
  ): Observable<ApiResponseModel<T>> {
    options = this.defaultOptions(options, true);
    return this.apiResultFlashMessage<T>(
      this.http.get<T>(environment.urlApi + endPoint, options)
    );
  }

  post<T>(
    endPoint: string,
    params: Object,
    options?: HttpExtendedOptions
  ): Observable<ApiResponseModel<T>> {
    options = this.defaultOptions(options);
    return this.apiResultFlashMessage<T>(
      this.http.post<T>(environment.urlApi + endPoint, params, options)
    );
  }

  postEvents<T>(
    endPoint: string,
    params: Object,
    options?
  ): Observable<ApiResponseModel<T>> {
    options = options || {};
    options.multi = true;
    options.reportProgress = true;
    options.observe = 'events';
    options = this.defaultOptions(options);
    return this.apiResultFlashMessageEvent<T>(
      this.http.post<T>(environment.urlApi + endPoint, params, options)
    );
  }

  put<T>(
    endPoint: string,
    params: Object,
    options?: HttpExtendedOptions
  ): Observable<ApiResponseModel<T>> {
    options = this.defaultOptions(options);
    return this.apiResultFlashMessage<T>(
      this.http.put<T>(environment.urlApi + endPoint, params, options)
    );
  }

  delete<T>(
    endPoint: string,
    options?: HttpExtendedOptions
  ): Observable<ApiResponseModel<T>> {
    options = this.defaultOptions(options);
    return this.apiResultFlashMessage<T>(
      this.http.delete<T>(environment.urlApi + endPoint, options)
    );
  }

  /** Helpers methods */
  private defaultOptions(
    options: HttpExtendedOptions,
    cachable = false
  ): HttpOptions {
    if (isUndefined(options)) {
      options = {};
    }

    // Language
    if (options.headers instanceof HttpHeaders) {
      options.headers = options.headers.append(
        'X-LANG',
        this.translateService.currentLang
      );
    } else {
      options.headers = new HttpHeaders({
        'X-LANG': this.translateService.currentLang,
      });
    }

    // Authentifikacia
    if (this.identityService.identity && this.identityService.identity.token) {
      options.headers = options.headers.append(
        'X-AUTH-TOKEN',
        this.identityService.identity.token
      );
    }

    // na co som to sem dal?
    // options.headers = options.headers.append(
    //   'Content-Type',
    //   'application/json'
    // );

    // Multiple request
    if (options.multi) {
      options.headers = options.headers.append('X-MULTI', '1');
    }

    // Ak necachujeme, dalej mozeme preskocit
    if (!cachable) {
      return options;
    }

    if (isUndefined(options.cachable) || options.cachable !== false) {
      options.headers = options.headers.append('X-CACHABLE', '1');
    }

    return options as HttpOptions;
  }

  private apiResultFlashMessage<T>(request: Observable<T>) {
    return request.pipe(
      map((res) => (isEmpty(res) ? { error: -1 } : res)),
      tap((res: ApiResponseModel<T>) => {
        if (res.error && res.error !== -10) {
          // -10 is void error
          this.flashmessage.error('common.response.code.' + res.error);
        } else if (res.success && res.success !== -10) {
          this.flashmessage.success('common.response.code.' + res.success);
        }
      }),
      share()
    );
  }

  private apiResultFlashMessageEvent<T>(request: Observable<HttpEvent<any>>) {
    return request.pipe(
      tap((event: HttpEvent<any>) => {
        if (event.type === HttpEventType.Response) {
          if (event.body.error && event.body.error !== -10) {
            // -10 is void error
            this.flashmessage.error('common.response.code.' + event.body.error);
          } else if (event.body.success && event.body.success !== -10) {
            this.flashmessage.success(
              'common.response.code.' + event.body.success
            );
          }
        }
      }),
      switchMap((event: HttpEvent<any>): Observable<ApiResponseModel<T>> => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            const eventTotal = event.total ? event.total : 0;
            const progress = Math.round((event.loaded / eventTotal) * 100);
            this.debug.log(`Uploaded ${progress}%`);
            return of<ApiResponseModel<T>>({
              event,
            });
          case HttpEventType.Response:
            this.debug.log('File Upload Successfully!', event.body);
            const res = event.body;
            res.event = event;
            return of<ApiResponseModel<T>>(res);
          default:
            const typesWord = [
              'Sent',
              'UploadProgress',
              'ResponseHeader',
              'DownloadProgress',
              'Response',
              'User',
            ];
            this.debug.log('Response event type:', typesWord[event.type]);
            return of<ApiResponseModel<T>>({ event });
        }
      }),
      share()
    );
  }
}

interface HttpExtendedOptions extends HttpOptions {
  cachable?: boolean;
  multi?: boolean;
}
interface HttpOptions {
  headers?: HttpHeaders;
  observe?: 'body';
  params?: HttpParams;
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  body?: any;
}
export function apiRequestServiceCreator(
  http: HttpClient,
  translateService: TranslateService,
  identityService: IdentityService,
  flashmessage: FlashMessageService,
  debug: LogService
) {
  return new ApiRequestService(
    http,
    translateService,
    identityService,
    flashmessage,
    debug
  );
}
