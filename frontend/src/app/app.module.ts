import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
// for Http import LoadingBarHttpModule:
import { LoadingBarHttpModule } from '@ngx-loading-bar/http';
// for Router import LoadingBarRouterModule:
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
// for Core import LoadingBarModule:
import { LoadingBarModule } from '@ngx-loading-bar/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BaseModule } from './pages/base.module';
import { CoreModule } from './modules/SharedModule/core.module';
import { httpInterceptorProviders } from './http-interceptors';
import { CacheMapService } from './services/CacheMap/cache-map.service';
import { WaiStatusComponent } from './components/header/wai-status/wai-status.component';

@NgModule({
  declarations: [
    AppComponent,
    WaiStatusComponent
  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    BaseModule,
    LoadingBarHttpClientModule,
    CoreModule,

    // for Http use:
    LoadingBarHttpModule,
    // for Router use:
    LoadingBarRouterModule,
    // for HttpClient use:
    LoadingBarHttpClientModule,
    // for Core use:
    LoadingBarModule.forRoot()
  ],
  exports: [
    HttpClientModule
  ],

  providers: [
    ...httpInterceptorProviders,
    CacheMapService,
    { provide: Cache, useClass: CacheMapService }
  ],

  bootstrap: [AppComponent]
})

export class AppModule {}
