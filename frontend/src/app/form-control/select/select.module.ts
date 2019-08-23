import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SelectComponent} from './select.component';
import {FormModule} from 'src/app/module/SharedModule/form.module';
import {ValidationModule} from 'src/app/component/form/validation/validation.module';
import {MatRadioModule} from '@angular/material/radio';
import {MatListModule} from '@angular/material/list';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [SelectComponent],
  imports: [
    CommonModule,
    FormModule,
    ValidationModule,
    MatListModule,
    MatRadioModule,
    TranslateModule,
  ],
  exports: [SelectComponent],
})
export class SelectModule {}
