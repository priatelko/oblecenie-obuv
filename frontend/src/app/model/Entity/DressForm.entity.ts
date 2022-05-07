import { DBSimpleEntity, Kategorie } from './Form.entity';
import { ArticleFormEntity } from './ArticleForm.entity';

// Data response article
export interface DressResponseEntity {
  preKoho: DBSimpleEntity[];
  obdobie: DBSimpleEntity[];
  kategorie: Kategorie[];
  znacka: DBSimpleEntity[];
  prilezitost: DBSimpleEntity[];
  zostrih: DBSimpleEntity[];
  velkost: DBSimpleEntity[];
  velkostCislo: number;
  styl: DBSimpleEntity[];
  zapinanie: DBSimpleEntity[];
  stav: DBSimpleEntity[];
  material: DBSimpleEntity[];
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
