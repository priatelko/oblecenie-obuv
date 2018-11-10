import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { LoaderComponent } from './loader.component';
import { MaterialModule } from '../../modules/SharedModule/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule
  ],
  declarations: [
    LoaderComponent
  ],
  exports: [
    LoaderComponent,
    MaterialModule
  ]
})
export class LoaderModule { }
