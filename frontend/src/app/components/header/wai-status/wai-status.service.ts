import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface WaiStatus {
  message: string;
  assertive: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class WaiStatusService {

  public status$: Subject<WaiStatus> = new Subject();

  constructor() {}

  public updateMessage(msg, assertive = false) {
    this.status$.next({
      message: msg,
      assertive: assertive
    });
  }
}
