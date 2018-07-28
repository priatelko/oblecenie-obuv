import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TranslateModule } from '@ngx-translate/core';
import { ModalModule } from 'ngx-bootstrap/modal';

import { HeaderComponent } from './header.component';
import { RegistModule } from '../user/regist/regist.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),

    RegistModule
  ],
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
