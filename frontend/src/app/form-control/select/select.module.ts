import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select.component';
import { TranslateModule } from '@ngx-translate/core';
import { ValidationModule } from '../../component/form/validation/validation.module';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [SelectComponent],
  imports: [
    CommonModule,
    ValidationModule,
    TranslateModule,

    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatListModule,
    MatCheckboxModule,
    MatSlideToggleModule,
  ],
  exports: [SelectComponent],
})
export class SelectModule {}
