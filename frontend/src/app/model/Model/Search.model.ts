import {Injectable} from '@angular/core';
import {indexOf, remove} from 'lodash';
import {ArtikelTyp} from '../Entity/Article.entity';

@Injectable({
  providedIn: 'root',
})
export class SearchModelService {
  private searchModel: SearchModelInterface = {
    type: [ArtikelTyp.dress, ArtikelTyp.shoes],
  };

  /** Getters */
  set type(type) {
    this.searchModel.type = type;
  }
  get type() {
    return this.searchModel.type;
  }

  /** Helper methods */
  isActiveType(type): boolean {
    return indexOf(this.searchModel.type, type) > -1;
  }

  setActiveType(type): void {
    if (this.isActiveType(type)) {
      this.searchModel.type = remove(this.searchModel.type, n => n === type);
    } else {
      this.searchModel.type.push(type);
    }
  }
}

interface SearchModelInterface {
  type: ArtikelTyp[];
}
