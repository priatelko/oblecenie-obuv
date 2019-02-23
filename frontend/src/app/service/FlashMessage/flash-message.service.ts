import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { filter } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class FlashMessageService {
  readonly AUTOCLOSE_MS = 1000 * 15; // 15sec

  public flashmessages: FlashMessage[] = [];

  private message: Subject<FlashMessage> = new Subject();
  private message$ = this.message.asObservable();

  constructor() {
    this.message$.subscribe((res) => {
      this.flashmessages.unshift(res);
    });
  }

  public info(msg) {
    const message: FlashMessage = {
      message: msg,
      type: FlashMessageTypes.Info,
      class: 'info',
      icon: 'info',
      date: new Date()
    };
    this.message.next(message);

    this.autoClose(message);
  }

  public success(msg) {
    const message: FlashMessage = {
      message: msg,
      type: FlashMessageTypes.Success,
      class: 'success',
      icon: 'check_circle',
      date: new Date()
    };
    this.message.next(message);

    this.autoClose(message);
  }

  public warning(msg) {
    const message: FlashMessage = {
      message: msg,
      type: FlashMessageTypes.Warning,
      class: 'warning',
      icon: 'warning',
      date: new Date()
    };
    this.message.next(message);

    this.autoClose(message);
  }

  public error(msg) {
    const message: FlashMessage = {
      message: msg,
      type: FlashMessageTypes.Error,
      class: 'danger',
      icon: 'error',
      date: new Date()
    };
    this.message.next(message);

    this.autoClose(message);
  }

  public removeFlashMessage(message: FlashMessage) {
    this.flashmessages = filter(this.flashmessages, (o) => {
      return o !== message;
    });
  }

  private autoClose(message: FlashMessage) {
    if (message.type === FlashMessageTypes.Info || message.type === FlashMessageTypes.Success) {
      setTimeout(() => {
        this.removeFlashMessage(message);
      }, this.AUTOCLOSE_MS);
    }
  }
}

export enum FlashMessageTypes {
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
  Error = 'error'
}

export interface FlashMessage {
  message: string;
  type: FlashMessageTypes;
  class: string;
  icon: string;
  date: Date;
}
