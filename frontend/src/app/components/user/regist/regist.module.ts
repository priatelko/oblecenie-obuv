import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { MatDialogModule } from '@angular/material/dialog';

import { RegistComponent } from './regist.component';
import { CoreModule } from '../../../modules/SharedModule/core.module';
import { MaterialModule } from '../../../modules/SharedModule/material.module';
import { FormModule } from 'src/app/modules/SharedModule/form.module';


@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    CoreModule,
    MaterialModule,
    MatDialogModule,
    FormModule
  ],
  declarations: [
    RegistComponent,
  ],
  exports: [
    RegistComponent,
    CoreModule
  ]
})
export class RegistModule { }
