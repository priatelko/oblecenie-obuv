import { NgModule } from '@angular/core';

import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

import { CoreModule } from '../../module/SharedModule/core.module';
import { UserModule } from '../user/user.module';
import { RegistComponent } from '../user/regist/regist.component';
import { LoginComponent } from '../user/login/login.component';
import { ForgottenComponent } from '../user/forgotten/forgotten.component';
import { FormModule } from '../../module/SharedModule/form.module';
import { AddModule } from '../article/add/add.module';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule,
    MatMenuModule,
    MatDividerModule,
    MatButtonModule,
    // custom
    UserModule,
    CoreModule,
    FormModule,
    AddModule,
  ],
  declarations: [HeaderComponent],
  // entryComponents: [RegistComponent, LoginComponent, ForgottenComponent],
  exports: [HeaderComponent],
})
export class HeaderModule {}
