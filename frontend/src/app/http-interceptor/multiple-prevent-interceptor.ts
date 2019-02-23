import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor,  HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable()
export class MultiplePreventInterceptor implements HttpInterceptor {

  ongoingRequests = [];

  constructor() {}

  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('multiple check');

      // Request is ongoing
    if (this.ongoingRequests.includes(req.urlWithParams)) {
      console.log('skipped', req.urlWithParams, req.method);
      return of(new HttpResponse());
    }

    console.log('ide teraz', req.method);

    this.ongoingRequests.push(req.urlWithParams);

    return next
      .handle(req)
      .pipe(
        finalize(() => {
          console.log('multiple final req');
          // this.ongoingRequests;
        })
      );
  }
}
