import { SelectOptionId } from './Form.entity';

// Article entities
export enum ArtikelTyp {
  dress = 'ARTICLE_DRESS',
  shoes = 'ARTICLE_SHOES',
}

// Form article
export interface ArticleFormEntity {
  type: ArtikelTyp;
  whom: Number[];
  season: Number[];
  brand: Number;
  state: Number[];
  material: Number[];
  title: String;
  description: String;
  price: Number;
}

export interface ImageEntity {
  imgPath: string;
  progress: number;
}
