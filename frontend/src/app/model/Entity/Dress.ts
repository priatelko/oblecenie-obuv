import { NoDiaNode } from 'src/app/custom/interfaces';

export interface Kategorie {
  item: string;
  children: KategorieChildren[];
}

export interface KategorieChildren extends NoDiaNode {
  id: number;
  nazov: string;
}

export interface Prilezitost {
  id: number;
  nazov: string;
}

export interface Zostrih {
  id: number;
  nazov: string;
}

export interface Velkost {
  id: number;
  nazov: string;
}

export interface Styl {
  id: number;
  nazov: string;
}

export interface Zapinanie {
  id: number;
  nazov: string;
}
