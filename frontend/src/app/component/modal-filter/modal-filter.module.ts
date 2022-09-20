import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalFilterComponent } from './modal-filter.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SelectModule } from '../../form-control/select/select.module';
import { LoaderModule } from '../loader/loader.module';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ModalFilterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,

    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,

    SelectModule,
    LoaderModule,
  ],
})
export class ModalFilterModule {}
