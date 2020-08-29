import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { FlashMessageService } from './service/FlashMessage/flash-message.service';
import { QueryCommandsService } from './service/Query-commands/query-commands.service';
import { LoaderSize } from './component/loader/loader.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loaderSize = LoaderSize;

  constructor(
    private translateService: TranslateService,
    private flashMessageService: FlashMessageService,
    private queryComands: QueryCommandsService
  ) {
    // Set translation lang
    this.translateService.setDefaultLang('sk');
    this.translateService.use('sk');
  }

  ngOnInit() {}

  removeFlashmessage(i) {
    this.flashMessageService.removeFlashMessage(i);
  }

  /** Getters */
  get flashMessages() {
    return this.flashMessageService.flashmessages;
  }
}
