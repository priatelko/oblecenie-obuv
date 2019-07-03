import {NgModule} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {TranslateModule, TranslateService} from '@ngx-translate/core';

import {MatIconModule} from '@angular/material/icon';

import {SelectOptionDirective} from '../../directive/select-option.directive';
import {
  apiRequestServiceCreator,
  ApiRequestService,
} from 'src/app/service/ApiRequest/api-request.service';
import {VoidLinkDirective} from 'src/app/directive/void-link.directive';
import {IdentityService} from 'src/app/service/User/identity.service';
import {FlashMessageService} from 'src/app/service/FlashMessage/flash-message.service';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [SelectOptionDirective, VoidLinkDirective],
  imports: [MatIconModule],
  exports: [
    // modules
    CommonModule,
    TranslateModule,
    MatIconModule,
    // directives
    SelectOptionDirective,
    VoidLinkDirective,
  ],
  providers: [
    {
      provide: ApiRequestService,
      useFactory: apiRequestServiceCreator,
      deps: [
        HttpClient,
        TranslateService,
        IdentityService,
        FlashMessageService,
      ],
    },
  ],
})
export class CoreModule {}
