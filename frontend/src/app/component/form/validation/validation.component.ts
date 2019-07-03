import {Component, OnInit, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Validator} from 'src/app/custom/validator.custom';
import {head} from 'lodash';

@Component({
  selector: 'app-validation',
  template: `
    <div class="alert alert-danger" role="alert" *ngIf="invalid && !closed">
      <span>{{ error }}</span>
      <button (click)="close()" type="button" class="close" aria-label="Close">
        <span aria-hidden="true" class="mat-icon">close</span>
      </button>
    </div>
  `,
})
export class ValidationComponent implements OnInit {
  @Input() formControlRef: FormControl;

  get invalid() {
    return this.formControlRef.touched && !this.formControlRef.valid;
  }

  constructor() {}

  ngOnInit() {}

  get error() {
    const errors = Validator.getErrors(this.formControlRef);
    return head(errors);
  }

  close() {
    this.formControlRef.markAsUntouched();
  }
}
