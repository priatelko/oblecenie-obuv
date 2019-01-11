import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { MatDialogModule } from '@angular/material/dialog';

import { LoginComponent } from './login.component';
import { CoreModule } from '../../../modules/SharedModule/core.module';
import { MaterialModule } from '../../../modules/SharedModule/material.module';
import { FormModule } from 'src/app/modules/SharedModule/form.module';


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
    LoginComponent
  ],
  exports: [
    LoginComponent,
    CoreModule
  ]
})
export class LoginModule { }
