import {PreKoho, Obdobie, Znacka, Prilezitost, Zostrih, Velkost} from './Article.entity';
import {NoDiaNode} from 'src/app/custom/interfaces';

export interface AddArticleDressEntity {
  preKoho: PreKoho[];
  obdobie: Obdobie[];
  kategorie: OblecenieKategorie[];
  znacka: Znacka[];
  prilezitost: Prilezitost[];
  zostrih: Zostrih[];
  velkost: Velkost[];
  velkostCislo: number;
}

export interface OblecenieKategorie {
  item: string;
  children: OblecenieKategorieChildren[];
}

export interface OblecenieKategorieChildren extends NoDiaNode {
  id: number;
  nazov: string;
}
