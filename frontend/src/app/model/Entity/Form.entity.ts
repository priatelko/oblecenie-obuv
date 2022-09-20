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

// Pocitadlo id, title
export interface DBSimpleEntity {
  id: SelectOptionId;
  title: string;
}

// Categories
export interface Categories {
  item: string;
  children: CategoriesChildren[];
}

export interface CategoriesChildren extends NoDiaNode, DBSimpleEntity {}
