import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalFilterComponent } from './modal-filter.component';
import { CoreModule } from '../../module/SharedModule/core.module';
import { MatDialogModule } from '@angular/material/dialog';
import { FormModule } from '../../module/SharedModule/form.module';
import { SelectModule } from '../../form-control/select/select.module';
import { LoaderModule } from '../loader/loader.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ModalFilterComponent],
  imports: [
    CoreModule,
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    FormModule,
    SelectModule,
    LoaderModule,
  ],
})
export class ModalFilterModule {}
