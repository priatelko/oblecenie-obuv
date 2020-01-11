import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LogService } from 'src/app/service/Admin/log.service';

@Injectable({
  providedIn: 'root'
})
export class WaiStatusService {

  status$: Subject<WaiStatus> = new Subject();

  constructor(private debug: LogService) {}

  updateMessage(msg, assertive = false) {

    this.debug.log('WAI service', msg);
    this.status$.next({
      message: msg,
      assertive: assertive
    });
  }
}

export interface WaiStatus {
  message: string;
  assertive: boolean;
}
