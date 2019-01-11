import { Component } from '@angular/core';
import { Router, Event, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';

import { WaiStatusService } from './components/header/wai-status/wai-status.service';
import { TranslateService } from '@ngx-translate/core';
import { FlashMessageService } from './services/FlashMessage/flash-message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(
    private router: Router,
    private waiService: WaiStatusService,
    private translateService: TranslateService,
    public flashMessageService: FlashMessageService
  ) {
    router.events.subscribe((routerEvent: Event) => {
      this.checkRouterEvent(routerEvent);
    });
  }

  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationCancel ||
        routerEvent instanceof NavigationError) {
      this.translateService.get('common.youNavigated').subscribe(res => {
        this.waiService.updateMessage(res, true);
      });
    }
  }

  removeFlashmessage(i) {
    this.flashMessageService.removeFlashMessage(i);
  }
}
