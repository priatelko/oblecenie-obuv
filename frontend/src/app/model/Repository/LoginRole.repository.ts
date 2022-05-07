import { Injectable } from '@angular/core';

import { ApiRequestService } from '../../service/ApiRequest/api-request.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  BaseRepositoryService,
  BaseRepositoryInterface,
} from './Base.repository';
import { LoginRoleEntity } from '../Entity/LoginRole.entity';
import { ApiResponseModel } from '../Model/ApiResponse.model';

@Injectable({
  providedIn: 'root',
})
export class LoginRoleRepositoryService
  extends BaseRepositoryService<LoginRoleEntity[]>
  implements BaseRepositoryInterface<LoginRoleEntity[]>
{
  dataStream: Observable<LoginRoleEntity[]>;
  API = '/get/role';

  constructor(private apiRequestService: ApiRequestService) {
    super();
  }

  findAll() {
    this.dataStream = this.apiRequestService
      .get<LoginRoleEntity[]>(this.API)
      .pipe(map((d) => d.data as LoginRoleEntity[]));

    return this;
  }

  result(): Observable<LoginRoleEntity[]> {
    return this.dataStream;
  }

  getRoles(): Observable<LoginRoleEntity[]> {
    return this.findAll().result();
  }
}
