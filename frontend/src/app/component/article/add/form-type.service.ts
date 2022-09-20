import { Injectable } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { merge } from 'lodash';
import { ArtikelTyp } from '../../../model/Entity/ArticleForm.entity';
import { Validator } from '../../../custom/validator.custom';
import { IdentityService } from '../../../service/User/identity.service';

@Injectable({
  providedIn: 'root',
})
export class AddArticleFormTypeService {
  private commonFieldsZaradenie: { [key: string]: AbstractControl };
  private dressFieldsZaradenie: { [key: string]: AbstractControl };
  private commonFieldsPopis: { [key: string]: AbstractControl };

  constructor(public identityService: IdentityService) {
    this.commonFieldsZaradenie = {
      type: new FormControl(null, []),
      whom: new FormControl(null, [Validators.required]),
      season: new FormControl(null, [Validators.required]),
      brand: new FormControl(null, [Validators.required]),
      state: new FormControl(null, [Validators.required]),
      material: new FormControl(null, []),
      materialDisplay: new FormControl(null, []),
      notes: new FormControl(null, []),
    };

    this.commonFieldsPopis = {
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      photo: new FormControl(null, [
        Validators.required,
        Validators.maxLength(this.identityService.limit.ArticleImageUpload),
      ]),
      price: new FormControl(null, []),
      // url: new FormControl(null, []),
      // expiracia: new FormControl(null, []),
    };

    this.dressFieldsZaradenie = {
      dressCategory: new FormControl(null, [Validators.required]),
      occasion: new FormControl(null, [Validators.required]),
      cut: new FormControl(null, [Validators.required]),
      size: new FormGroup(
        {
          size: new FormControl(null),
          sizeNum: new FormControl(null),
        },
        [
          Validator.oneOfGroup({
            size: [Validators.required, Validators.min(1)],
            sizeNum: [Validators.required, Validators.min(1)],
          }),
        ]
      ),
      style: new FormControl(null, [Validators.required]),
      fastening: new FormControl(null, [Validators.required]),
    };
  }

  getDress() {
    const form = new FormGroup({
      categorize: new FormGroup(
        merge(this.commonFieldsZaradenie, this.dressFieldsZaradenie)
      ),
      description: new FormGroup(this.commonFieldsPopis),
    });
    form.get('categorize').get('type').setValue(ArtikelTyp.dress);

    return form;
  }
}
