import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MultiSelectOption } from '../../model/Entity/Form.entity';

@Injectable({
  providedIn: 'root',
})
export class SelectService {
  mapToOptions<T>(
    dataStream$: Observable<T[]>,
    idProp: number | string = 'id',
    nameProp: string = 'nazov'
  ): Observable<MultiSelectOption[]> {
    return dataStream$.pipe(
      map((data) =>
        data.map((res) => {
          return { id: res[idProp], label: res[nameProp] } as MultiSelectOption;
        })
      )
    );
  }
}
