import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { SelectOptionDirective } from '../../directive/select-option.directive';
import {
  apiRequestServiceCreator,
  ApiRequestService,
} from 'src/app/service/ApiRequest/api-request.service';
import { VoidLinkDirective } from 'src/app/directive/void-link.directive';
import { IdentityService } from 'src/app/service/User/identity.service';
import { FlashMessageService } from 'src/app/service/FlashMessage/flash-message.service';
import { CommonModule } from '@angular/common';

import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angular-6-social-login';
import { GLOBAL } from 'src/app/variables/global';

export function getAuthServiceConfigs() {
  return new AuthServiceConfig([
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider(GLOBAL.facebookAppId),
    },
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider(GLOBAL.googleClientId),
    },
  ]);
}

@NgModule({
  declarations: [SelectOptionDirective, VoidLinkDirective],
  imports: [MatIconModule, SocialLoginModule],
  exports: [
    // modules
    CommonModule,
    TranslateModule,
    MatIconModule,
    MatTooltipModule,
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
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs,
    },
  ],
})
export class CoreModule {}
