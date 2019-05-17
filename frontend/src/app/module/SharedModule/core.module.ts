import {NgModule} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {TranslateModule, TranslateService} from '@ngx-translate/core';

import {MatIconModule} from '@angular/material/icon';

import {SelectOptionDirective} from '../../directive/select-option.directive';
import {LoaderModule} from '../../component/loader/loader.module';
import {
  apiRequestServiceCreator,
  ApiRequestService,
} from 'src/app/service/ApiRequest/api-request.service';
import {VoidLinkDirective} from 'src/app/directive/void-link.directive';
import {IdentityService} from 'src/app/service/User/identity.service';
import {FlashMessageService} from 'src/app/service/FlashMessage/flash-message.service';
import {CorrectMaterialDropdownDirective} from 'src/app/directive/correct-material-dropdown';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    SelectOptionDirective,
    VoidLinkDirective,
    CorrectMaterialDropdownDirective,
  ],
  imports: [LoaderModule, MatIconModule],
  exports: [
    // modules
    CommonModule,
    TranslateModule,
    LoaderModule,
    MatIconModule,
    // directives
    SelectOptionDirective,
    VoidLinkDirective,
    CorrectMaterialDropdownDirective,
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
