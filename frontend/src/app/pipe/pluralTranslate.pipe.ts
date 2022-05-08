import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pluralTranslate',
  pure: false,
})
export class PluralTranslatePipe implements PipeTransform {
  transform(key: string, number: number, simple = false): string {
    // Simple, one or more
    if (simple) {
      return `${key}.${
        number === 0 ? 'none' : number === 1 ? 'singular' : 'plural'
      }`;
    }

    // SK
    return `${key}.${
      number === 0 || number > 4 ? '05' : number === 1 ? '1' : '24'
    }`;

    // EN
    // return `${key}.${
    //   number === 0 ? 'none' : number === 1 ? 'singular' : 'plural'
    // }`
  }
}
