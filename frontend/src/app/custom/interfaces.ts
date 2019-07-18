export interface SelectOption {
  id: SelectOptionId;
  label: string;
  checked?: boolean;
  disabled?: boolean;
}

export interface ChildrenNode<T> {
  children?: ChildrenNode<T>[] & T[];
}

export interface NoDiaNode {
  noDiaNode: string;
}

export interface MultiSelectOption
  extends SelectOption,
    ChildrenNode<SelectOption> {}

export type SelectOptionId = number | string | null;
