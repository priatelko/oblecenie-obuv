import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SelectModule } from '../../../form-control/select/select.module';
import { AddComponent } from './add.component';
import { RouterModule } from '@angular/router';
import { LoaderModule } from '../../loader/loader.module';
import { ModalFilterModule } from '../../modal-filter/modal-filter.module';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DndModule } from '../../../form-control/dnd/dnd.module';
import { CommonModule } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { ValidationModule } from '../../form/validation/validation.module';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule,

    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatOptionModule,

    ValidationModule,
    SelectModule,
    LoaderModule,
    ModalFilterModule,
    DndModule,
  ],
  declarations: [AddComponent],
  // entryComponents: [ModalFilterComponent],
  exports: [AddComponent],
})
export class AddModule {}
