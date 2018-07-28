import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BaseModule } from './pages/base.module';
import { CoreModule } from './modules/SharedModule/core-shared.module';
import { RegistComponent } from './user/regist/regist.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistComponent
  ],
  imports: [
    AppRoutingModule,
    BaseModule,
  ],
  exports: [
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {}
