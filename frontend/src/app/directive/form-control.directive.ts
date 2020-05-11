import {
  Directive,
  ElementRef,
  HostListener,
  AfterViewInit,
  Input,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { Validator } from '../custom/validator.custom';
import { hasRequiredField } from '../custom/helpers';

@Directive({
  selector: '[appFormControl]',
})
export class FormControlDirective implements AfterViewInit {
  errEl = document.createElement('div');
  closeEl = document.createElement('button');
  textSpan = document.createElement('span');
  errors = [];
  closeError = false;

  constructor(private el: ElementRef, private control: NgControl) {}

  @HostListener('change', ['$event'])
  @HostListener('blur', ['$event'])
  onEvent(e) {
    this.errors = Validator.getErrors(this.control);
    this.validate(e);
  }

  ngAfterViewInit() {
    // this.el.nativeElement.classList.add('form-control');
    this.prepareValidation();
  }

  prepareValidation() {
    const errMsgId = 'formControl' + this.control.name + 'Err';

    // Construt Error message
    this.errEl.id = errMsgId;
    this.errEl.classList.add(
      'alert',
      'alert-float',
      'alert-danger',
      'd-none',
      'mb-0'
    );
    this.errEl.setAttribute('role', 'alert');

    this.closeEl.setAttribute('type', 'button');
    this.closeEl.setAttribute('class', 'close');
    this.closeEl.setAttribute('aria-label', 'Close');
    this.closeEl.setAttribute('class', 'close');
    const closeIcon = document.createElement('span');
    closeIcon.setAttribute('aria-hidden', 'true');
    closeIcon.setAttribute('class', 'mat-icon');
    closeIcon.innerText = 'close';
    this.closeEl.appendChild(closeIcon);
    this.closeEl.onclick = () => {
      this.closeError = true;
      this.errEl.classList.add('d-none');
    };
    this.errEl.append(this.textSpan, this.closeEl);

    /** ARIA */
    // DescribedBy
    this.el.nativeElement.setAttribute('aria-describedby', errMsgId);
    // Required
    if (this.el.nativeElement.hasAttribute('required')) {
      this.el.nativeElement.setAttribute('aria-required', 'true');
    }
    // Invalid
    this.invalid();

    this.el.nativeElement.parentNode.parentNode.parentNode.appendChild(
      this.errEl
    );
  }

  validate(e) {
    // Close button clicked, ignore validating
    if (
      e.relatedTarget &&
      e.relatedTarget.tagName === 'BUTTON' &&
      e.relatedTarget.classList.contains('close')
    ) {
      return;
    }

    this.invalid();

    if (this.errors.length === 0 || this.control.untouched) {
      this.errEl.classList.add('d-none');
      return;
    }

    this.textSpan.innerHTML = this.errors[0];
    this.errEl.classList.remove('d-none');
  }

  invalid() {
    this.el.nativeElement.setAttribute('aria-invalid', 'false');

    if (this.control.invalid) {
      this.el.nativeElement.setAttribute('aria-invalid', 'true');
    }
  }
}
