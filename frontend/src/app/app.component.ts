import { Component } from '@angular/core';
import { Router, Event, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';

import { WaiStatusService } from './components/header/wai-status/wai-status.service';
import { TranslateService } from '@ngx-translate/core';
import { FlashMessageService, FlashMessage } from './services/FlashMessage/flash-message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  flashmessage: FlashMessage[] = [];

  constructor(
    private _router: Router,
    private _waiService: WaiStatusService,
    private _translateService: TranslateService,
    private _flashMessage: FlashMessageService
  ) {
    _router.events.subscribe((routerEvent: Event) => {
      this.checkRouterEvent(routerEvent);
    });

    _flashMessage.message$.subscribe((res) => {
      this.flashmessage.push(res);
    });
  }

  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationCancel ||
        routerEvent instanceof NavigationError) {
      this._translateService.get('common.youNavigated').subscribe(res => {
        this._waiService.updateMessage(res, true);
      });
    }
  }

  removeFlashmessage(i) {
    this.flashmessage.splice(i, 1);
  }
}
