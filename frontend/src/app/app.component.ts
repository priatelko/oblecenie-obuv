import { Component } from '@angular/core';
import { Router, Event, NavigationEnd, NavigationError, NavigationCancel, ActivatedRoute } from '@angular/router';

import { WaiStatusService } from './component/header/wai-status/wai-status.service';
import { TranslateService } from '@ngx-translate/core';
import { FlashMessageService } from './service/FlashMessage/flash-message.service';
import { QueryCommandsService } from './service/Query-commands/query-commands.service';

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
    private flashMessageService: FlashMessageService,
    private queryComands: QueryCommandsService
  ) {
    // Set translation lang
    this.translateService.setDefaultLang('sk');
    this.translateService.use('sk');

    this.router.events.subscribe((routerEvent: Event) => {
      this.checkRouterEvent(routerEvent);
    });
  }

  /** Methods */
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

  /** Getters */
  get flashMessages() {
    return this.flashMessageService.flashmessages;
  }
}
