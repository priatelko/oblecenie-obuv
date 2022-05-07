import { NgModule } from '@angular/core';
import { ValidationComponent } from './validation.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, MatInputModule, MatFormFieldModule, MatIconModule],
  declarations: [ValidationComponent],
  exports: [ValidationComponent],
})
export class ValidationModule {}
