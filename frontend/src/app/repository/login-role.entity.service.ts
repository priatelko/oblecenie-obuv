import { Injectable } from '@angular/core';

import { EntityInterface } from './entity.interface';
import { ApiRequestService } from '../service/ApiRequest/api-request.service';
import { Observable } from 'rxjs';
import { CommonResponseModel } from '../model/Entity/CommonResponse.model';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginRoleEntityService implements EntityInterface {
  API = '/get/role';

  constructor(private apiRequestService: ApiRequestService) {}

  findAll(): Observable<LoginRoleEntity[]> {
    return this.apiRequestService
      .get<CommonResponseModel<LoginRoleEntity[]>>(this.API)
      .pipe(
        tap((a) => {console.log('repositor', a);
        }),
        map((d) => d.data as LoginRoleEntity[])
      );
  }
}

export interface LoginRoleEntity {
  id: string;
  description: string;
}
