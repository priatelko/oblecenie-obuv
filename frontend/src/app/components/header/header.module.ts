import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

import { CoreModule } from '../../modules/SharedModule/core.module';
import { HeaderComponent } from './header.component';
import { RegistModule } from '../user/regist/regist.module';
import { LoginModule } from '../user/login/login.module';

@NgModule({
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    // custom
    RegistModule,
    LoginModule,
    CoreModule
  ],
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
