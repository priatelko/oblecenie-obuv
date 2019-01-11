import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';

import { CoreModule } from '../../modules/SharedModule/core.module';
import { HeaderComponent } from './header.component';
import { RegistModule } from '../user/regist/regist.module';
import { LoginModule } from '../user/login/login.module';
import { RegistComponent } from '../user/regist/regist.component';
import { LoginComponent } from '../user/login/login.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatMenuModule,
    // custom
    RegistModule,
    LoginModule,
    CoreModule
  ],
  declarations: [
    HeaderComponent
  ],
  entryComponents: [
    RegistComponent,
    LoginComponent
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
