import {PreKoho, Obdobie} from './Article.entity';

export interface AddArticleDressEntity {
  preKoho: PreKoho[];
  obdobie: Obdobie[];
  kategorie: OblecenieKategorie[];
}

export interface OblecenieKategorie {
  item: string;
  children: OblecenieKategorieChildren[];
}

export interface OblecenieKategorieChildren {
  id: number;
  nazov: string;
  nazovNoDia: string;
}
