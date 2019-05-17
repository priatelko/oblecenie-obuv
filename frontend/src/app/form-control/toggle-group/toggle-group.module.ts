import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToggleGroupComponent} from './toggle-group.component';
import {FormModule} from 'src/app/module/SharedModule/form.module';
import {ValidationModule} from 'src/app/component/form/validation/validation.module';

@NgModule({
  declarations: [ToggleGroupComponent],
  imports: [CommonModule, FormModule, ValidationModule],
  exports: [ToggleGroupComponent],
})
export class ToggleGroupModule {}
