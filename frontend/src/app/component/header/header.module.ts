import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';

import { CoreModule } from '../../module/SharedModule/core.module';
import { HeaderComponent } from './header.component';
import { UserModule } from '../user/user.module';
import { RegistComponent } from '../user/regist/regist.component';
import { LoginComponent } from '../user/login/login.component';
import { ForgottenComponent } from '../user/forgotten/forgotten.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatMenuModule,
    // custom
    UserModule,
    CoreModule
  ],
  declarations: [
    HeaderComponent
  ],
  entryComponents: [
    RegistComponent,
    LoginComponent,
    ForgottenComponent
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
