import { Directive, ElementRef, HostListener, AfterViewInit, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Validator } from '../custom/validator.custom';

@Directive({
  selector: '[appFormControl]'
})
export class FormControlDirective implements AfterViewInit {

  errEl = document.createElement('div');
  errors = [];

  constructor(
    private el: ElementRef,
    private control: NgControl
  ) {}

  @Input('emptyOption') emptyOption = false;

  @HostListener('input')
  @HostListener('blur')
  @HostListener('focus')
  @HostListener('change')
  onEvent() {
    this.errors = Validator.getErrors(this.control);
    this.validate();
  }

  ngAfterViewInit() {
    this.prepareValidation();
    this.makeEmptyOption();
  }

  prepareValidation() {
    const errMsgId = 'formControl' + this.control.name + 'Err';

    // Construt Error message
    this.errEl.id = errMsgId;
    this.errEl.classList.add('alert', 'alert-danger', 'd-none');
    this.errEl.setAttribute('role', 'alert');

    /** ARIA */
    // DescribedBy
    this.el.nativeElement.setAttribute('aria-describedby', errMsgId);
    // Required
    if (this.el.nativeElement.hasAttribute('required')) {
      this.el.nativeElement.setAttribute('aria-required', 'true');
    }
    // Invalid
    this.invalid();

    this.el.nativeElement.parentNode.appendChild(this.errEl);
  }

  makeEmptyOption() {
    if (!this.emptyOption) {
      return;
    }

    const option = document.createElement('option');
    option.innerHTML = '---';
    this.el.nativeElement.insertBefore(option, this.el.nativeElement.getElementsByTagName('OPTION')[0]);
    this.el.nativeElement.selectedIndex = 0;
  }

  validate() {
    this.invalid();

    if (this.errors.length === 0 || this.control.untouched) {
      this.errEl.classList.add('d-none');
      return;
    }

    this.errEl.innerText = this.errors[0];
    this.errEl.classList.remove('d-none');
  }

  invalid() {
    this.el.nativeElement.setAttribute('aria-invalid', 'false');

    if (this.control.invalid) {
      this.el.nativeElement.setAttribute('aria-invalid', 'true');
    }
  }

}
