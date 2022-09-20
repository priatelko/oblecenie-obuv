import { DBSimpleEntity, Categories } from './Form.entity';
import { ArticleFormEntity } from './ArticleForm.entity';

// Data response article
export interface DressResponseEntity {
  whom: DBSimpleEntity[];
  season: DBSimpleEntity[];
  categories: Categories[];
  brand: DBSimpleEntity[];
  occasion: DBSimpleEntity[];
  cut: DBSimpleEntity[];
  size: DBSimpleEntity[];
  sizeNum: number;
  style: DBSimpleEntity[];
  fastening: DBSimpleEntity[];
  state: DBSimpleEntity[];
  material: DBSimpleEntity[];
}

// Form article
export interface DressFormEntity extends ArticleFormEntity {
  dressCategory: Number;
  occasion: Number[];
  cut: Number;
  size: { size: Number; sizeNum: Number };
  style: Number[];
  fastening: Number[];
}
