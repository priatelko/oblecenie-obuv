import {Observable} from 'rxjs';

export interface BaseRepositoryInterface<T> {
  readonly API: string;
  dataStream: Observable<T>;

  findAll();
  result();
}

export abstract class BaseRepositoryService<T>
  implements BaseRepositoryInterface<T> {
  API: string;
  dataStream: Observable<T>;

  findAll() {}
  result() {}
}
