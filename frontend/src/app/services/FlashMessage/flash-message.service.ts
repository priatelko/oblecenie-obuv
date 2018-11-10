import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type FlashMessageTypes = 'secondary' | 'success' | 'danger';

export interface FlashMessage {
  message: string;
  type: FlashMessageTypes;
}

@Injectable({
  providedIn: 'root'
})
export class FlashMessageService {

  private message: Subject<FlashMessage> = new Subject();
  public message$ = this.message.asObservable();

  constructor() { }

  public addMessage(msg, type: FlashMessageTypes = 'secondary') {
    this.message.next({
      message: msg,
      type: type,
    });
  }
}
