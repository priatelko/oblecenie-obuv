import { Injectable } from '@angular/core';

import { EntityInterface } from './entity-interface';
import { ApiRequestService } from '../services/ApiRequest/api-request.service';
import { Observable } from 'rxjs';

export interface RoleEntity {
  id: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class RoleEntityService implements EntityInterface {

  API = '/get/role';

  constructor(
    private apiRequestService: ApiRequestService
  ) {}

  findAll(): Observable<RoleEntity[]> {
    return this.apiRequestService.Get<RoleEntity[]>(this.API);
  }
}
