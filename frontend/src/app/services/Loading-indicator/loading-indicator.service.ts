import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { WaiStatusService } from '../../components/header/wai-status/wai-status.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingIndicatorService {

  constructor(
    private waiService: WaiStatusService,
    private translateService: TranslateService
    ) {}

  loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  /**
   * Stores all currently active requests
   */
  private requests: HttpRequest<any>[] = [];

  /**
   * Adds request to the storage and notifies observers
   */
  onStarted(req: HttpRequest<any>): void {
    this.requests.push(req);
    // this.notify();
    this.translateService.get('common.requestLoading').subscribe(res => {
      this.waiService.updateMessage(res, true);
    });
  }

  /**
   * Removes request from the storage and notifies observers
   */
  onFinished(req: HttpRequest<any>): void {
    const index = this.requests.indexOf(req);
    if (index !== -1) {
      this.requests.splice(index, 1);
    }
    // this.notify();
    this.translateService.get('common.requestLoaded').subscribe(res => {
      this.waiService.updateMessage(res, true);
    });
  }

  /**
   * Notifies observers about whether there are any requests on fly
   */
  private notify(): void {
    setTimeout(() => {
      this.loading$.next(this.requests.length !== 0);
    });
  }

}
