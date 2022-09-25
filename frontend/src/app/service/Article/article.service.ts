import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ArtikelTyp } from '../../model/Entity/ArticleForm.entity';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor() {}

  loadForm(form: FormGroup) {
    form.patchValue({
      description: {
        title: 'test',
        description: 'test',
        photo: [
          'https://localhost:4200/be/img/_temp/300658214_6323146.jpg',
          'https://localhost:4200/be/img/_temp/632c8de962455.jpg',
        ],
        price: null,
      },
      categorize: {
        whom: [1, 3],
        season: 1,
        brand: 1,
        state: [1, 3],
        material: [1, 3],
        materialDisplay: 'loprem...',
        type: ArtikelTyp.dress,
        dressCategory: 10,
        occasion: [1, 3],
        cut: 1,
        size: {
          size: 2,
          sizeNum: '',
        },
        style: [1, 3],
        fastening: [1, 3],
        notes: 'Hkasdjkaj sdajd jasdj asj adjs ',
      },
    });

    form.updateValueAndValidity();
  }
}
