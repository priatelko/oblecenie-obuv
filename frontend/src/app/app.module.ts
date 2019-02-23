import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeSk from '@angular/common/locales/sk';

import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
// for Http import LoadingBarHttpModule:
import { LoadingBarHttpModule } from '@ngx-loading-bar/http';
// for Router import LoadingBarRouterModule:
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
// for Core import LoadingBarModule:
import { LoadingBarModule } from '@ngx-loading-bar/core';

import { AppComponent } from './app.component';
import { BaseModule } from './page/base.module';
import { CoreModule } from './module/SharedModule/core.module';
import { httpInterceptorProviders } from './http-interceptor';
import { CacheMapService } from './service/CacheMap/cache-map.service';
import { WaiStatusComponent } from './component/header/wai-status/wai-status.component';
import { AppRoutingModule } from './app-routing.module';

registerLocaleData(localeSk, 'sk');

@NgModule({
  declarations: [
    AppComponent,
    WaiStatusComponent
  ],
  imports: [
    BaseModule,
    HttpClientModule,
    LoadingBarHttpClientModule,
    CoreModule,

    // for Http use:
    LoadingBarHttpModule,
    // for Router use:
    LoadingBarRouterModule,
    // for HttpClient use:
    LoadingBarHttpClientModule,
    // for Core use:
    LoadingBarModule.forRoot(),

    AppRoutingModule,
  ],
  exports: [
    HttpClientModule
  ],

  providers: [
    ...httpInterceptorProviders,
    CacheMapService,
    { provide: Cache, useClass: CacheMapService },
    // { provide: LOCALE_ID, deps: [TranslateService], useFactory: (service) => service.currentLang },
    { provide: LOCALE_ID, useValue: 'sk' },
  ],

  bootstrap: [AppComponent]
})

export class AppModule {}
