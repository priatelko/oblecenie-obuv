import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import { finalize, tap } from 'rxjs/operators';
import { isUndefined } from 'lodash';
import { FlashMessageService } from '../service/FlashMessage/flash-message.service';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor (private flashmessage: FlashMessageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const startTime = Date.now();
    let status: string;
    let responseStatus = 200;

    return next.handle(req).pipe(
        tap(
          event => {
            status = '';
            if (event instanceof HttpResponse) {
              status = 'succeeded';
            }
          },
          error => {
            status = 'failed';
              // Zobrazime len runtime chyby
              console.error('Request error', error.status);
              responseStatus = error.status;

            if (!isUndefined(error.error.error) && !isUndefined(error.error.error.message)) {
              this.flashmessage.error('common.response.code.1');
            }
          }
        ),
        finalize(() => {
          const elapsedTime = Date.now() - startTime;
          const message = req.method + ' ' + req.urlWithParams + ' ' + status
          + ' in ' + elapsedTime + 'ms';

          console.log(message);

          if (responseStatus !== 200) {
            this.flashmessage.error('common.response.code.1');
          }
        })
    );
  }
}
