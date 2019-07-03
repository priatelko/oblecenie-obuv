export interface SelectOption {
  id: SelectOptionId;
  label: string;
  checked?: boolean;
}

export interface MultiSelectOption extends SelectOption {
  children?: MultiSelectOption[];
}

export type SelectOptionId = number | string;
