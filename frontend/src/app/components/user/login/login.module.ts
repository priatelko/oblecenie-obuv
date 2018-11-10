import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { LoginComponent } from './login.component';
import { CoreModule } from '../../../modules/SharedModule/core.module';
import { MaterialModule } from '../../../modules/SharedModule/material.module';


@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ReactiveFormsModule,
    CoreModule,
    MaterialModule
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
