import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalFilterComponent} from './modal-filter.component';
import {CoreModule} from 'src/app/module/SharedModule/core.module';
import {MatDialogModule} from '@angular/material/dialog';
import {FormModule} from 'src/app/module/SharedModule/form.module';
import {ToggleGroupModule} from 'src/app/form-control/toggle-group/toggle-group.module';
import {LoaderModule} from '../loader/loader.module';

@NgModule({
  declarations: [ModalFilterComponent],
  imports: [
    CoreModule,
    CommonModule,
    MatDialogModule,
    FormModule,
    ToggleGroupModule,
    LoaderModule,
  ],
})
export class ModalFilterModule {}
