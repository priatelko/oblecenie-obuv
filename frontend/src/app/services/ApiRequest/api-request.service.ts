import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';

import { GLOBAL } from '../global';
import { isUndefined } from 'lodash';
import { UserModel } from 'src/app/models/User.model';

export interface IRequestOptions {
  headers?: HttpHeaders;
  observe?: 'body';
  params?: HttpParams;
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  body?: any;
  cachable?: boolean;
}

export function apiRequestServiceCreator(http: HttpClient) {
  return new ApiRequestService(http);
}

@Injectable()
export class ApiRequestService {

  // Extending the HttpClient through the Angular DI.
  public constructor(
    public http: HttpClient
  ) {
    // If you don't want to use the extended versions in some cases you can access the public property and use the original one.
    // for ex. this.httpClient.http.get(...)
  }

  /**
   * GET request
   * @param {string} endPoint it doesn't need / in front of the end point
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public Get<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
    options = this.defaultOptions(options, true);
    return this.http.get<T>(GLOBAL.url + endPoint, options);
  }

  /**
   * POST request
   * @param {string} endPoint end point of the api
   * @param {Object} params body of the request.
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public Post<T>(endPoint: string, params: Object, options?: IRequestOptions): Observable<T> {
    options = this.defaultOptions(options);
    return this.http.post<T>(GLOBAL.url + endPoint, params, options);
  }

  /**
   * PUT request
   * @param {string} endPoint end point of the api
   * @param {Object} params body of the request.
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public Put<T>(endPoint: string, params: Object, options?: IRequestOptions): Observable<T> {
    options = this.defaultOptions(options);
    return this.http.put<T>(GLOBAL.url + endPoint, params, options);
  }

  /**
   * DELETE request
   * @param {string} endPoint end point of the api
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public Delete<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
    options = this.defaultOptions(options);
    return this.http.delete<T>(GLOBAL.url + endPoint, options);
  }


  private defaultOptions(options: IRequestOptions, cachable = false): IRequestOptions {
      // Authentifikacia
    const auth = JSON.parse(localStorage.getItem('identity')) as UserModel;
    if (auth && auth.token) {
      if (isUndefined(options)) {
        options = {
          headers: new HttpHeaders({'X-AUTH-TOKEN': auth.token})
        };
      } else if (options.headers instanceof HttpHeaders) {
        options.headers.append('X-AUTH-TOKEN', auth.token);
      } else {
        options.headers = new HttpHeaders({'X-AUTH-TOKEN': auth.token});
      }
    }

      // Ak necachujeme, dalej mozeme preskocit;
    if (!cachable) {
      return options;
    }

    if (isUndefined(options)) {
      options = {
        headers: new HttpHeaders({'X-CACHABLE': '1'})
      };
    } else if ((isUndefined((options.cachable) || options.cachable !== false))) {
      if (options.headers instanceof HttpHeaders) {
        options.headers.append('X-CACHABLE', '1');
      } else {
        options.headers = new HttpHeaders({'X-CACHABLE': '1'});
      }
    }

    return options;
  }
}
