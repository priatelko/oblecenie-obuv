import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
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
} from '@ngx-translate/core';

import { AppComponent } from './app.component';
import { BaseModule } from './page/base.module';
import { httpInterceptorProviders } from './http-interceptor';
import { CacheMapService } from './service/CacheMap/cache-map.service';
import { WaiStatusComponent } from './component/header/wai-status/wai-status.component';
import { CoreModule } from './module/SharedModule/core.module';
import { BaseRoutingModule } from './page/base-routing.module';
import {
  createTranslateLoader,
  MyMissingTranslationHandler,
} from './module/Translator/translator.module';
import { LoaderModule } from './component/loader/loader.module';

registerLocaleData(localeSk, 'sk');

@NgModule({
  declarations: [AppComponent, WaiStatusComponent],
  imports: [
    BaseModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LoadingBarHttpClientModule,
    CoreModule,

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
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
