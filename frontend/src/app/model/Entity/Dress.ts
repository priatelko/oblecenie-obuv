import { NoDiaNode } from '../../custom/interfaces';
import {
  ArticleFormEntity,
  Material,
  Obdobie,
  PreKoho,
  Stav,
  Znacka,
} from './Article.entity';

export interface Kategorie {
  item: string;
  children: KategorieChildren[];
}

export interface KategorieChildren extends NoDiaNode {
  id: number;
  nazov: string;
}

export interface Prilezitost {
  id: number;
  nazov: string;
}

export interface Zostrih {
  id: number;
  nazov: string;
}

export interface Velkost {
  id: number;
  nazov: string;
}

export interface Styl {
  id: number;
  nazov: string;
}

export interface Zapinanie {
  id: number;
  nazov: string;
}

// Data response article
export interface DressFormDataEntity {
  preKoho: PreKoho[];
  obdobie: Obdobie[];
  kategorie: Kategorie[];
  znacka: Znacka[];
  prilezitost: Prilezitost[];
  zostrih: Zostrih[];
  velkost: Velkost[];
  velkostCislo: number;
  styl: Styl[];
  zapinanie: Zapinanie[];
  stav: Stav[];
  material: Material[];
}

// Form article
export interface DressFormEntity extends ArticleFormEntity {
  oblecenieKategoria: Number;
  prilezitost: Number[];
  zostrih: Number;
  velkost: { velkost: Number; velkostCislo: Number };
  styl: Number[];
  zapinanie: Number[];
}
