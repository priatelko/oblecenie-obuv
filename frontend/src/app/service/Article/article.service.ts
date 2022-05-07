import { Injectable } from '@angular/core';
import { ArtikelTyp } from '../../model/Entity/ArticleForm.entity';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor() {}

  loadForm() {
    return {
      popis: {
        titulok: 'test',
        popis: 'test',
        foto: [
          {
            progress: 100,
            imgPath:
              'https://localhost:4200/img/articles/temp/IMG_20220418_091317_367.jpg',
          },
        ],
        cena: null,
      },
      zaradenie: {
        preKoho: [1, 3],
        obdobie: 1,
        znacka: 1,
        stav: [1, 3],
        material: [1, 3],
        materialDisplay: 'loprem...',
        typ: ArtikelTyp.dress,
        oblecenieKategoria: 10,
        prilezitost: [1, 3],
        zostrih: 1,
        velkost: {
          velkost: 2,
          velkostCislo: 25,
        },
        styl: [1, 3],
        zapinanie: [1, 3],
      },
    };
  }
}
