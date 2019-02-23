import { Injectable } from '@angular/core';
import { indexOf, remove } from 'lodash';

@Injectable({
  providedIn: 'root'
})

export class SearchModelService {

  private searchModel: SearchModelInterface = {
    type: ['dress', 'shoes']
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
      this.searchModel.type = remove(this.searchModel.type, (n) => n === type);
    } else {
      this.searchModel.type.push(type);
    }
  }

}

type Kind = 'dress'|'shoes';

interface SearchModelInterface {
  type: Kind[];
}
