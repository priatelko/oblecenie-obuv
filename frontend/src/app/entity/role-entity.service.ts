import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { EntityInterface } from './entity-interface';
import { GLOBAL } from '../services/global';

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
    private http: HttpClient
  ) {}

  findAll(): Observable<any[]> {
    return this.http.get<any[]>(GLOBAL.url + this.API);
  }
}
