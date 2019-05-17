import { NgModule } from '@angular/core';
import { ValidationComponent } from './validation.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CoreModule } from 'src/app/module/SharedModule/core.module';


@NgModule({
  imports: [
    CoreModule,
    MatFormFieldModule
  ],
  declarations: [
    ValidationComponent
  ],
  exports: [
    ValidationComponent
  ]
})
export class ValidationModule { }
