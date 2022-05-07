import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpResponse,
} from '@angular/common/http';
import { finalize, tap } from 'rxjs/operators';
import { FlashMessageService } from '../service/FlashMessage/flash-message.service';
import { LogService } from '../service/Admin/log.service';
import { IdentityService } from '../service/User/identity.service';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor(
    private flashmessage: FlashMessageService,
    private debug: LogService,
    private identityService: IdentityService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const startTime = Date.now();
    let status: string;
    let responseStatus = 200;
    let responseBody = '';

    return next.handle(req).pipe(
      tap(
        (event) => {
          status = '';
          if (event instanceof HttpResponse) {
            status = 'succeeded';
          }
        },
        (error) => {
          status = 'failed';
          // Zobrazime len runtime chyby
          responseStatus = error.status;
          responseBody = error.error;

          // all server errors
          if (responseStatus !== 200) {
            this.checkForInvokeLogout(error.error);
          }
        }
      ),
      finalize(() => {
        const elapsedTime = Date.now() - startTime;
        const message =
          req.method +
          ' ' +
          req.urlWithParams +
          ' ' +
          status +
          ' in ' +
          elapsedTime +
          'ms';

        this.debug.log(message);

        // // server OK - 200
        // if (responseStatus === 200) {
        //   this.checkForInvokeLogout(responseBody);
        // }
      })
    );
  }

  checkForInvokeLogout(body) {
    // !isUndefined(error.error.error) && !isUndefined(error.error.error.message)
    this.debug.log(body);
    if (body.error) {
      if (body.error === -11) {
        this.identityService.logout();
      }
    } else {
      this.flashmessage.error('common.response.code.1');
    }
  }
}
