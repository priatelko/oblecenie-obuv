import {NgModule} from '@angular/core';
import {FormControlDirective} from 'src/app/directive/form-control.directive';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';

@NgModule({
  declarations: [
    // directives
    FormControlDirective,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
  ],
  exports: [
    ReactiveFormsModule,
    FormControlDirective,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    MatSlideToggleModule,
    MatCheckboxModule,
  ],
  providers: [],
})
export class FormModule {}
