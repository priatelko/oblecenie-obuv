import { Injectable } from '@angular/core';
import { has } from 'lodash';
import { MultiSelectOption } from '../../model/Entity/Form.entity';
import { SelectType } from '../../form-control/select/select.interface';

@Injectable({
  providedIn: 'root',
})
export class ModalFilterService {
  transformItems<T, C>(
    items: T[],
    transformFunc: (item: T) => MultiSelectOption,
    childrenProp?: string,
    transformChildFunc?: (item: C) => MultiSelectOption
  ): MultiSelectOption[] {
    return this.traverseItems<T, C>(
      items,
      transformFunc,
      childrenProp,
      transformChildFunc
    );
  }

  private traverseItems<T, C>(
    items: T[],
    transformFunc: (item: T) => MultiSelectOption,
    childrenProp?: string,
    transformChildFunc?: (item: C) => MultiSelectOption
  ): MultiSelectOption[] {
    return items.map((item) => {
      const transformedItem = transformFunc(item);

      if (childrenProp && has(item, childrenProp)) {
        transformedItem.children = this.traverseItems(
          item[childrenProp],
          transformChildFunc,
          childrenProp,
          transformChildFunc
        );
      }
      return transformedItem;
    });
  }
}

export interface ModalFilterOptions {
  header: string;
  checkType?: SelectType;
  multiselect?: boolean;
  items: MultiSelectOption[];
  search?: boolean;
  required?: boolean;
  minSearchLength?: number;
  defaultValue?: number | number[];
}
