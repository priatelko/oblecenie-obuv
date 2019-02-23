import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { GLOBAL } from '../global';
import { isUndefined, isEmpty } from 'lodash';
import { TranslateService } from '@ngx-translate/core';
import { IdentityService } from '../User/identity.service';
import { map, tap, share, finalize } from 'rxjs/operators';
import { FlashMessageService } from '../FlashMessage/flash-message.service';
import { CommonResponseModel } from 'src/app/model/Entity/CommonResponse.model';

@Injectable()
export class ApiRequestService {
  // Extending the HttpClient through the Angular DI.
  constructor(
    private http: HttpClient,
    private translateService: TranslateService,
    private identityService: IdentityService,
    private flashmessage: FlashMessageService
  ) {
    // If you don't want to use the extended versions in some cases you can access the public property and use the original one.
    // for ex. this.httpClient.http.get(...)
  }

  get<T>(endPoint: string, options?: RequestOptions): Observable<CommonResponseModel<T>> {
    options = this.defaultOptions(options, true);
    return this.apiResultFlashMessage<T>(this.http.get<T>(GLOBAL.url + endPoint, options));
  }

  post<T>(endPoint: string, params: Object, options?: RequestOptions): Observable<CommonResponseModel<T>> {
    options = this.defaultOptions(options);
    return this.apiResultFlashMessage<T>(this.http.post<T>(GLOBAL.url + endPoint, params, options));
  }

  put<T>(endPoint: string, params: Object, options?: RequestOptions): Observable<CommonResponseModel<T>> {
    options = this.defaultOptions(options);
    return this.apiResultFlashMessage<T>(this.http.put<T>(GLOBAL.url + endPoint, params, options));
  }

  delete<T>(endPoint: string, options?: RequestOptions): Observable<CommonResponseModel<T>> {
    options = this.defaultOptions(options);
    return this.apiResultFlashMessage<T>(this.http.delete<T>(GLOBAL.url + endPoint, options));
  }

  /** Helpers methods */
  private defaultOptions(options: RequestOptions, cachable = false): RequestOptions {
    if (isUndefined(options)) {
      options = {};
    }
    // Language
    if (options.headers instanceof HttpHeaders) {
      options.headers = options.headers.append('X-LANG', this.translateService.currentLang);
    } else {
      options.headers = new HttpHeaders({
        'X-LANG': this.translateService.currentLang
      });
    }

    // Authentifikacia
    if (this.identityService.identity && this.identityService.identity.token) {
      options.headers = options.headers.append('X-AUTH-TOKEN', this.identityService.identity.token);
    }

    // Ak necachujeme, dalej mozeme preskocit
    if (!cachable) {
      return options;
    }

    if (isUndefined(options.cachable) || options.cachable !== false) {
      options.headers = options.headers.append('X-CACHABLE', '1');
    }

    return options;
  }

  private apiResultFlashMessage<T>(request: Observable<CommonResponseModel<T>>) {
    return request.pipe(
      map(res => (isEmpty(res) ? { error: -1 } : res)),
      tap((res: CommonResponseModel<T>) => {
        console.log('hglaska', res);

          if (res.error) {
            this.flashmessage.error('common.response.code.' + res.error);
          } else if (res.success) {
            this.flashmessage.success('common.response.code.' + res.success);
          }
      }),
      share()
    );
  }
}

export interface RequestOptions {
  headers?: HttpHeaders;
  observe?: 'body';
  params?: HttpParams;
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  body?: any;
  cachable?: boolean;
}
export function apiRequestServiceCreator(
  http: HttpClient,
  translateService: TranslateService,
  identityService: IdentityService,
  flashmessage: FlashMessageService
) {
  return new ApiRequestService(http, translateService, identityService, flashmessage);
}
