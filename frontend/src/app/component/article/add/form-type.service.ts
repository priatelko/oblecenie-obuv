import { Injectable } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { merge } from 'lodash';
import { Validator } from '../../../custom/validator.custom';

@Injectable()
export class AddArticleFormTypeService {
  private commonFields: { [key: string]: AbstractControl };
  private dressFields: { [key: string]: AbstractControl };

  constructor() {
    this.commonFields = {
      typ: new FormControl(null, []),
      preKoho: new FormControl(null, [Validators.required]),
      obdobie: new FormControl(null, [Validators.required]),
      znacka: new FormControl(null, [Validators.required]),
      stav: new FormControl(null, [Validators.required]),
      material: new FormControl(null, []),
      titulok: new FormControl(null, []),
      popis: new FormControl(null, []),
      cena: new FormControl(null, []),
      url: new FormControl(null, []),
      expiracia: new FormControl(null, []),
    };

    this.dressFields = {
      oblecenieKategoria: new FormControl(null, [Validators.required]),
      prilezitost: new FormControl(null, [Validators.required]),
      zostrih: new FormControl(null, [Validators.required]),
      velkost: new FormGroup(
        {
          velkost: new FormControl(null, [
            Validators.required,
            Validators.min(1),
          ]),
          velkostCislo: new FormControl(null, [
            Validators.required,
            Validators.min(1),
          ]),
        },
        [Validator.oneOfGroup()]
      ),
      styl: new FormControl(null, [Validators.required]),
      zapinanie: new FormControl(null, [Validators.required]),
    };
  }

  getDress() {
    return new FormGroup(merge(this.commonFields, this.dressFields));
  }
}
