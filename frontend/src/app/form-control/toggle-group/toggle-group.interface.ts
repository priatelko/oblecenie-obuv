export interface ToggleOption {
  id: ToggleOptionId;
  name: string;
  checked?: boolean;
}

export type ToggleOptionId = number;

export enum ToggleType {
  Toggle = 'toggle',
  Checkbox = 'checkbox',
}
