export interface SelectOption {
  id: SelectOptionId;
  label: string;
  checked?: boolean;
  disabled?: boolean;
  hidden?: boolean;
}

export interface ChildrenNode {
  children?: ChildrenNode[];
}

export interface NoDiaNode {
  noDiaNode: string;
}

export interface MultiSelectOption extends SelectOption, ChildrenNode {}

export type SelectOptionId = number | string | null;

export const BreakException = {};
