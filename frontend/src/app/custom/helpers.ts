import { AbstractControl } from '@angular/forms';
import { has, deburr, assign, some, forEach } from 'lodash';
import { ChildrenNode } from '../model/Entity/Form.entity';

import FuzzySearch from 'fuzzy-search';

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

export function traverseNode(
  items: ChildrenNode[],
  iterater: (item, path?, depth?) => void | boolean,
  pathNodes = [],
  depth = 0
) {
  forEach(items, (i) => {
    if (depth === 0) {
      pathNodes = [];
    }

    if (has(i, 'children')) {
      pathNodes.push(i);
    }

    if (iterater(i, pathNodes, depth) === false) {
      return false;
    }

    if (has(i, 'children')) {
      traverseNode(i.children, iterater, pathNodes, ++depth);
      --depth;
    }
  });
}

export function appendNoDiacritics(items, propertyName = 'label') {
  items.forEach((rootNode) => {
    rootNode.noDiaNode = deburr(rootNode[propertyName]);
    if (has(rootNode, 'children')) {
      appendNoDiacritics(rootNode.children, propertyName);
    }
  });

  return items;
}

export function searchInModel(
  model,
  needle: string,
  minSearchLength = 3,
  propertyName = 'noDiaNode'
) {
  if (needle.length < minSearchLength) {
    // Show all nodes
    traverseNode(model, (item) => {
      item.hidden = false;
    });
    return model;
  }

  // Hide all nodes
  traverseNode(model, (item) => {
    item.hidden = true;
  });

  needle = deburr(needle);

  // Search root
  const searcherRoot = new FuzzySearch(model, [propertyName]);
  const resultRoot = searcherRoot.search(needle);
  resultRoot.forEach((itemSearch) => {
    if (some(model, itemSearch)) {
      itemSearch.hidden = false;
    }
  });

  traverseNode(model, (item, path, depth) => {
    if (item.children) {
      const searcherChildren = new FuzzySearch(item.children, [propertyName]);
      const resultChildren = searcherChildren.search(needle);

      const isResult = Boolean(resultChildren.length);

      resultChildren.forEach((itemChild) => {
        itemChild.hidden = false;
      });

      // Enable root
      if (isResult && path.length) {
        path.forEach((itemPath) => {
          itemPath.hidden = false;
        });
      }
    }
  });

  return model;
}
