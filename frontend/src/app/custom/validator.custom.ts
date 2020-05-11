import {
  ValidatorFn,
  AbstractControl,
  FormControl,
  NgControl,
  FormGroup,
} from '@angular/forms';
import {isUndefined, isNull, forEach} from 'lodash';
import {TranslateService} from '@ngx-translate/core';
import {ContainerInjector} from '../module/ContainerGetter/container-getter.module';

export class Validator {
  /** Validators */
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

  static oneOfGroup(): ValidatorFn {
    return (group: FormGroup): {[key: string]: any} | null => {
      let valid = false;
      forEach(group.controls, (control) => {
        if (group.touched && control.valid) {
          valid = true;
        }
      });

      return !valid ? {requiredOneOfGroup: true} : null;
    };
  }

  /** Helper methods */
  static getErrors(control: NgControl | FormControl | FormGroup) {
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
      err.push(
        this.translate('common.form.error.minlength').replace(
          '%requiredLength',
          control.errors.minlength.requiredLength
        )
      );
    }

    // Same As
    if (!isUndefined(control.errors.sameAs)) {
      err.push(this.translate('common.form.error.sameAs'));
    }

    // One of group
    if (!isUndefined(control.errors.requiredOneOfGroup)) {
      err.push(this.translate('common.form.error.requiredOneOfGroup'));
    }

    return err;
  }

  static translate(key) {
    const translateService = ContainerInjector.get(TranslateService);

    let translated;

    translateService.get(key).subscribe(res => {
      translated = res;
    });

    return translated;
  }
}
