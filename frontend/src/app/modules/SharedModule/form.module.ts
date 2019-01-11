import { NgModule } from '@angular/core';
import { FormControlDirective } from 'src/app/directive/form-control.directive';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    // directives
    FormControlDirective
  ],
  imports: [
    ReactiveFormsModule
  ],
  exports: [
    ReactiveFormsModule,
    FormControlDirective
  ],
  providers: []
})

export class FormModule {}
