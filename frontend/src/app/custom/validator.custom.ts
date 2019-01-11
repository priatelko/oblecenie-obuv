import { NgControl, ValidatorFn, AbstractControl, FormControl } from '@angular/forms';
import { isUndefined, isNull } from 'lodash';
import { TranslateService } from '@ngx-translate/core';
import { ContainerInjector } from '../modules/ContainerGetter/container-getter.module';

export class Validator {

  /*
   * Validators
   */

  static sameAs(asControl: FormControl): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      return asControl.value !== control.value ? {sameAs: true} : null;
    };
  }

  static trim(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const trimmed = isNull(control.value) || Boolean(control.value.trim());
      return !trimmed ? {required: true} : null;
    };
  }

  /*
   * Helper methods
   */

  static getErrors(control: NgControl) {
    const err = [];

    if (isNull(control.errors)) {
      return err;
    }

    // Required
    if (!isUndefined(control.errors.required)) {
      err.push(this.translate('common.form.error.required'));
    }

    // Email
    if (!isUndefined(control.errors.email)) {
      err.push(this.translate('common.form.error.email'));
    }

    // Minlength
    if (!isUndefined(control.errors.minlength)) {
      err.push(this.translate('common.form.error.minlength').replace('%requiredLength', control.errors.minlength.requiredLength));
    }

    // Same As
    if (!isUndefined(control.errors.sameAs)) {
      err.push(this.translate('common.form.error.sameAs'));
    }

    return err;
  }

  static translate(key) {
    const translateService = ContainerInjector.get(TranslateService);

    let translated;

    translateService.get(key).subscribe((res) => {
      translated = res;
    });

    return translated;
  }
}
