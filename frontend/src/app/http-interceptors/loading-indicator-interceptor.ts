import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor,  HttpHandler, HttpRequest } from '@angular/common/http';
import { LoadingIndicatorService } from '../services/Loading-indicator/loading-indicator.service';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoadingIndicatorInterceptor implements HttpInterceptor {

  constructor(private loadingIndicatorService: LoadingIndicatorService) {}

  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // emit onStarted event before request execution
    this.loadingIndicatorService.onStarted(req);

    return next
      .handle(req)
      .pipe(
        // emit onFinished event after request execution
        finalize(() => this.loadingIndicatorService.onFinished(req))
      )
      ;
  }
}
