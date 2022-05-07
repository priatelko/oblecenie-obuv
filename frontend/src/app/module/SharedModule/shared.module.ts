import { NgModule } from '@angular/core';
import { FormControlDirective } from '../../directive/form-control.directive';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DndComponent } from '../../form-control/dnd/dnd.component';
import { DndDirective } from '../../directive/dnd.directive';
import { ValidationModule } from '../../component/form/validation/validation.module';
import { SelectOptionDirective } from '../../directive/select-option.directive';
import { VoidLinkDirective } from '../../directive/void-link.directive';
// import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';

@NgModule({
  declarations: [
    // directives
    // FormControlDirective,
    // DndDirective,
    // DndComponent,
    // // directives
    // SelectOptionDirective,
    // VoidLinkDirective,
  ],
  imports: [
    // ReactiveFormsModule,
    // FormsModule,
    // MatInputModule,
    // MatSelectModule,
    // ValidationModule,
    //NgxMatSelectSearchModule,
  ],
  exports: [
    // ReactiveFormsModule,
    // FormControlDirective,
    // FormsModule,
    // MatInputModule,
    // MatSelectModule,
    // //NgxMatSelectSearchModule,
    // MatSlideToggleModule,
    // MatCheckboxModule,
    // ValidationModule,
    // // MatIconModule,
    // // MatTooltipModule,
  ],
  providers: [],
})
export class SharedModule {}
