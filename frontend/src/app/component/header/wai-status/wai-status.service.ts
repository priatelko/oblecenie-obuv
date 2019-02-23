import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WaiStatusService {

  status$: Subject<WaiStatus> = new Subject();

  constructor() {}

  updateMessage(msg, assertive = false) {
    console.log('WAI service', msg);
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
