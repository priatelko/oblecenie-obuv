import { Injectable } from '@angular/core';
import { ArtikelTyp } from '../../model/Entity/ArticleForm.entity';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor() {}

  loadForm() {
    return {
      description: {
        title: 'test',
        description: 'test',
        photo: 'https://localhost:4200/be/img/_temp/631e095c95da1.jpg',
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
          sizeNum: 25,
        },
        style: [1, 3],
        fastening: [1, 3],
        notes: '',
      },
    };
  }
}
