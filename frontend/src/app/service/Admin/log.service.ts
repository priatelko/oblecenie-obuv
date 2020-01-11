import { Injectable } from '@angular/core';
import { IdentityService } from '../User/identity.service';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  constructor(private identity: IdentityService) {}

  log(...msg: any[]) {
    if (this.identity.isAdmin) {
      console.log('Log service:', ...msg);
    }
  }
}
