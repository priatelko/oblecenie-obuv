import {Injectable} from '@angular/core';
import {ToggleOption} from './toggle-group.interface';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ToggleGroupService {
  mapToOptions<T>(
    dataStream$: Observable<T[]>,
    idProp: number | string = 'id',
    nameProp: string = 'nazov'
  ): Observable<ToggleOption[]> {
    return dataStream$.pipe(
      map(data =>
        data.map(res => {
          return {id: res[idProp], name: res[nameProp]} as ToggleOption;
        })
      )
    );
  }
}
