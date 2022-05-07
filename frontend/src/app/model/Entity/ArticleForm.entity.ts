import { SelectOptionId } from './Form.entity';

// Article entities
export enum ArtikelTyp {
  dress = 'ARTICLE_DRESS',
  shoes = 'ARTICLE_SHOES',
}

// Form article
export interface ArticleFormEntity {
  typ: ArtikelTyp;
  preKoho: Number[];
  obdobie: Number[];
  znacka: Number;
  stav: Number[];
  material: Number[];
  titulok: String;
  popis: String;
  cena: Number;
}

export interface ImageEntity {
  imgPath: string;
}
