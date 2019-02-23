import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { MatDialogModule } from '@angular/material/dialog';

import { LoginComponent } from './login/login.component';
import { CoreModule } from '../../module/SharedModule/core.module';
import { MaterialModule } from '../../module/SharedModule/material.module';
import { FormModule } from 'src/app/module/SharedModule/form.module';
import { RegistComponent } from './regist/regist.component';
import { ForgottenComponent } from './forgotten/forgotten.component';


@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormModule,
    CoreModule,
    MaterialModule,
    MatDialogModule
  ],
  declarations: [
    LoginComponent,
    RegistComponent,
    ForgottenComponent
  ],
  exports: [

  ]
})
export class UserModule { }
