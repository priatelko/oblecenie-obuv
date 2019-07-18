import {AbstractControl} from '@angular/forms';
import {has, deburr} from 'lodash';
import {ChildrenNode} from './interfaces';

export const hasRequiredField = (abstractControl: AbstractControl): boolean => {
  if (abstractControl.validator) {
    const validator = abstractControl.validator({} as AbstractControl);
    if (validator && validator.required) {
      return true;
    }
  }
  if (abstractControl['controls']) {
    for (const controlName in abstractControl['controls']) {
      if (abstractControl['controls'][controlName]) {
        if (hasRequiredField(abstractControl['controls'][controlName])) {
          return true;
        }
      }
    }
  }
  return false;
};

export function traverseNode<T>(
  items: ChildrenNode<T>[],
  iterater: (item) => void
) {
  items.forEach(i => {
    iterater(i);
    if (has(i, 'children')) {
      traverseNode<T>(i.children, iterater);
    }
  });
}

export function appendNoDiacritics(items, propertyName = 'label') {
  items.forEach(rootNode => {
    rootNode.noDiaNode = deburr(rootNode[propertyName]);
    if (has(rootNode, 'children')) {
      appendNoDiacritics(rootNode.children, propertyName);
    }
  });

  return items;
}
