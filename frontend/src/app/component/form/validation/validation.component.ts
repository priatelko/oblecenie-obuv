import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validator } from '../../../custom/validator.custom';
import { head } from 'lodash';

@Component({
  selector: 'app-validation',
  template: `
    <div
      *ngIf="invalid && error"
      class="alert alert-float alert-danger"
      role="alert"
    >
      <mat-icon class="mr-2" aria-label="common.tooltipAria"
        >report_problem</mat-icon
      >
      <span>{{ error }}</span>
    </div>
  `,
  styles: [
    `
      :host {
        position: relative;
        display: block;
        width: 100%;
      }
      .alert {
        user-select: none;
        cursor: auto;
      }
      .alert:hover {
        opacity: 0.5;
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
}
