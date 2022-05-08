import {
  ValidatorFn,
  AbstractControl,
  FormControl,
  NgControl,
  FormGroup,
} from '@angular/forms';
import { isUndefined, isNull, forEach, isEmpty } from 'lodash';
import { translate } from './helpers';

export class Validator {
  /** Validators */
  static sameAs(asControl: FormControl): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return asControl.value !== control.value ? { sameAs: true } : null;
    };
  }

  static trim(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const trimmed = isNull(control.value) || Boolean(control.value.trim());
      return !trimmed ? { required: true } : null;
    };
  }

  static oneOfGroup(controlValidators): ValidatorFn {
    return (group: FormGroup): { [key: string]: any } | null => {
      let valid = false;

      // Set true validators
      forEach(group.controls, (control, controlName) => {
        control.setValidators(controlValidators[controlName]);
        control.updateValueAndValidity({
          onlySelf: true,
        });
      });

      // Validate
      forEach(group.controls, (control) => {
        if (control.valid) {
          valid = true;
        }
      });

      // Preset all validators for valid or invalid
      forEach(group.controls, (control, controlName) => {
        if (valid) {
          control.setValidators(null);
        } else {
          control.setValidators(controlValidators[controlName]);
        }
        control.updateValueAndValidity({
          onlySelf: true,
        });
      });

      return !valid ? { requiredOneOfGroup: true } : null;
    };
  }

  /** Helper methods */
  static getErrors(control: NgControl | FormControl | FormGroup) {
    const err = [];

    if (isNull(control.errors)) {
      return err;
    }

    // Email
    if (!isUndefined(control.errors.email)) {
      err.push(translate('common.form.error.email'));
    }

    // Minlength
    if (!isUndefined(control.errors.minlength)) {
      err.push(
        translate('common.form.error.minlength').replace(
          '%length',
          control.errors.minlength.requiredLength
        )
      );
    }

    // Maxlength
    if (!isUndefined(control.errors.maxlength)) {
      err.push(
        translate('common.form.error.maxlength').replace(
          '%length',
          control.errors.maxlength.requiredLength
        )
      );
    }

    // Same As
    if (!isUndefined(control.errors.sameAs)) {
      err.push(translate('common.form.error.sameAs'));
    }

    // One of group
    if (!isUndefined(control.errors.requiredOneOfGroup)) {
      err.push(translate('common.form.error.requiredOneOfGroup'));
    }

    // Required
    if (!isUndefined(control.errors.required)) {
      err.push(translate('common.form.error.required'));
    }

    return err;
  }

  static isInvalid(form: FormControl | FormGroup) {
    return form.touched && !form.valid && !isEmpty(form.errors);
  }
}
