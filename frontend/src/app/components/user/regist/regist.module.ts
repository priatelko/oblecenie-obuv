import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { RegistComponent } from './regist.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule
  ],
  declarations: [
    RegistComponent
  ],
  exports: [
    RegistComponent
  ]
})
export class RegistModule { }
