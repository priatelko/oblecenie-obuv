import {PreKoho, Obdobie, Znacka} from './Article.entity';
import {NoDiaNode} from 'src/app/custom/interfaces';

export interface AddArticleDressEntity {
  preKoho: PreKoho[];
  obdobie: Obdobie[];
  kategorie: OblecenieKategorie[];
  znacka: Znacka[];
}

export interface OblecenieKategorie {
  item: string;
  children: OblecenieKategorieChildren[];
}

export interface OblecenieKategorieChildren extends NoDiaNode {
  id: number;
  nazov: string;
}
