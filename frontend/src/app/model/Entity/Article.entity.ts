// Article entities
export enum ArtikelTyp {
  dress = 'ARTICLE_DRESS',
  shoes = 'ARTICLE_SHOES',
}

export interface PreKoho {
  id: number;
  nazov: string;
}

export interface Obdobie {
  id: number;
  nazov: string;
}

export interface Stav {
  id: number;
  nazov: string;
}

export interface Material {
  id: number;
  nazov: string;
}

export interface Znacka {
  id: number;
  nazov: string;
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
