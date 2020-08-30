import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validator } from 'src/app/custom/validator.custom';
import { head } from 'lodash';

@Component({
  selector: 'app-validation',
  template: `
    <div
      class="alert alert-float alert-danger"
      role="alert"
      *ngIf="invalid && error"
    >
      <span>{{ error }}</span>
      <button (click)="close()" type="button" class="close" aria-label="Close">
        <span aria-hidden="true" class="mat-icon">close</span>
      </button>
    </div>
  `,
  styles: [
    `
      :host {
        position: relative;
        display: block;
        width: 100%;
      }
    `,
  ],
})
export class ValidationComponent implements OnInit {
  @Input() formControlRef: FormControl;
  @Input() formGroupRef: FormGroup;

  get invalid() {
    const x = this.formControlRef
      ? this.formControlRef.touched && !this.formControlRef.valid
      : this.formGroupRef
      ? this.formGroupRef.touched && !this.formGroupRef.valid
      : false;

    return x;
  }

  constructor() {}

  ngOnInit() {}

  get error() {
    const errors = this.formControlRef
      ? Validator.getErrors(this.formControlRef)
      : this.formGroupRef
      ? Validator.getErrors(this.formGroupRef)
      : [];

    return errors.length ? head(errors) : false;
  }

  close() {
    this.formGroupRef
      ? this.formGroupRef.markAsUntouched()
      : this.formControlRef.markAsUntouched();
  }
}
