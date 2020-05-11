import { PreKoho, Obdobie, Znacka, Stav, Material } from './Article.entity';
import {
  Zapinanie,
  Prilezitost,
  Zostrih,
  Velkost,
  Styl,
  Kategorie,
} from './Dress';

export interface AddArticleDressEntity {
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
  material: Material;
}
