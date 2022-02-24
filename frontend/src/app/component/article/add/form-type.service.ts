import { Injectable } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { merge } from 'lodash';
import { ArtikelTyp } from 'src/app/model/Entity/Article.entity';
import { Validator } from '../../../custom/validator.custom';

@Injectable({
  providedIn: 'root',
})
export class AddArticleFormTypeService {
  private commonFieldsZaradenie: { [key: string]: AbstractControl };
  private dressFieldsZaradenie: { [key: string]: AbstractControl };
  private commonFieldsPopis: { [key: string]: AbstractControl };

  constructor() {
    this.commonFieldsZaradenie = {
      typ: new FormControl(null, []),
      preKoho: new FormControl(null, [Validators.required]),
      obdobie: new FormControl(null, [Validators.required]),
      znacka: new FormControl(null, [Validators.required]),
      stav: new FormControl(null, [Validators.required]),
      material: new FormControl(null, []),
      materialDisplay: new FormControl(null, []),
    };

    this.commonFieldsPopis = {
      titulok: new FormControl(null, [Validators.required]),
      popis: new FormControl(null, [Validators.required]),
      cena: new FormControl(null, []),
      // url: new FormControl(null, []),
      // expiracia: new FormControl(null, []),
    };

    this.dressFieldsZaradenie = {
      oblecenieKategoria: new FormControl(null, [Validators.required]),
      prilezitost: new FormControl(null, [Validators.required]),
      zostrih: new FormControl(null, [Validators.required]),
      velkost: new FormGroup(
        {
          velkost: new FormControl(null),
          velkostCislo: new FormControl(null),
        },
        [
          Validator.oneOfGroup({
            velkost: [Validators.required, Validators.min(1)],
            velkostCislo: [Validators.required, Validators.min(1)],
          }),
        ]
      ),
      styl: new FormControl(null, [Validators.required]),
      zapinanie: new FormControl(null, [Validators.required]),
    };
  }

  getDress() {
    const form = new FormGroup({
      zaradenie: new FormGroup(
        merge(this.commonFieldsZaradenie, this.dressFieldsZaradenie)
      ),
      popis: new FormGroup(merge(this.commonFieldsPopis)),
    });
    form.get('zaradenie').get('typ').setValue(ArtikelTyp.dress);

    return form;
  }
}
