import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeSk from '@angular/common/locales/sk';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
// for Http import LoadingBarHttpModule:
import { LoadingBarHttpModule } from '@ngx-loading-bar/http';
// for Router import LoadingBarRouterModule:
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
// for Core import LoadingBarModule:
import { LoadingBarModule } from '@ngx-loading-bar/core';

import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';
import {
  TranslateModule,
  TranslateLoader,
  TranslateCompiler,
  MissingTranslationHandler,
  TranslateService,
} from '@ngx-translate/core';

import { AppComponent } from './app.component';
import { PageModule } from './page/page.module';
import { httpInterceptorProviders } from './http-interceptor';
import { CacheMapService } from './service/CacheMap/cache-map.service';
import { WaiStatusComponent } from './component/header/wai-status/wai-status.component';
import { BaseRoutingModule } from './page/base-routing.module';
import {
  createTranslateLoader,
  MyMissingTranslationHandler,
} from './module/Translator/translator.module';
import { LoaderModule } from './component/loader/loader.module';

import {
  FacebookLoginProvider,
  SocialLoginModule,
  SocialAuthServiceConfig,
  GoogleLoginProvider,
} from 'angularx-social-login';
import { environment } from 'src/environments/environment';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import {
  ApiRequestService,
  apiRequestServiceCreator,
} from './service/ApiRequest/api-request.service';
import { IdentityService } from './service/User/identity.service';
import { FlashMessageService } from './service/FlashMessage/flash-message.service';
import { LogService } from './service/Admin/log.service';

registerLocaleData(localeSk, 'sk');

@NgModule({
  declarations: [AppComponent, WaiStatusComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LoadingBarHttpClientModule,
    SocialLoginModule,

    MatProgressBarModule,
    MatIconModule,

    PageModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useClass: MyMissingTranslationHandler,
      },
      useDefaultLang: false,
      compiler: {
        provide: TranslateCompiler,
        useClass: TranslateMessageFormatCompiler,
      },
    }),

    // for Http use:
    LoadingBarHttpModule,
    // for Router use:
    LoadingBarRouterModule,
    // for HttpClient use:
    LoadingBarHttpClientModule,
    // for Core use:
    LoadingBarModule,

    BaseRoutingModule,
    LoaderModule,
  ],
  exports: [],

  providers: [
    ...httpInterceptorProviders,
    CacheMapService,
    { provide: Cache, useClass: CacheMapService },
    // { provide: LOCALE_ID, deps: [TranslateService], useFactory: (service) => service.currentLang },
    { provide: LOCALE_ID, useValue: 'sk' },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.googleClientId),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(environment.facebookAppId),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
    {
      provide: ApiRequestService,
      useFactory: apiRequestServiceCreator,
      deps: [
        HttpClient,
        TranslateService,
        IdentityService,
        FlashMessageService,
        LogService,
      ],
    },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
