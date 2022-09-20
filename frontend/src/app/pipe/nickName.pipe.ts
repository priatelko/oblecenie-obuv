import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nickname',
})
export class NickNamePipe implements PipeTransform {
  transform(name: string, lastName: string): string {
    return name + ' ' + lastName.slice(0, 1) + '.';
  }
}
