// Select Id
export type SelectOptionId = number | string | null;

// Select option
export interface SelectOption {
  id: SelectOptionId;
  label: string;
  checked?: boolean;
  disabled?: boolean;
  hidden?: boolean;
}
export interface MultiSelectOption extends SelectOption, ChildrenNode {}

// Simple nodes
export interface ChildrenNode {
  children?: ChildrenNode[];
}
export interface NoDiaNode {
  noDiaNode: string;
}

// Pocitadlo id, nazov
export interface DBSimpleEntity {
  id: SelectOptionId;
  nazov: string;
}

// Kategorie
export interface Kategorie {
  item: string;
  children: KategorieChildren[];
}

export interface KategorieChildren extends NoDiaNode, DBSimpleEntity {}
