import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  UserModel,
  UserLoginRoleModel,
  UserRoleModel,
} from '../../model/Model/User.model';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {
  identity: UserModel;

  constructor(private translateService: TranslateService) {
    this.identity = JSON.parse(localStorage.getItem('identity'));
  }

  /** Methods */
  updateUser(res) {
    this.identity = res;
    localStorage.setItem('identity', JSON.stringify(res));
  }

  logout() {
    this.identity = null;
    localStorage.removeItem('identity');
  }

  get isBuyer() {
    return this.identity.loginRole === UserLoginRoleModel.Buyer;
  }

  get isSeller() {
    return this.identity.loginRole === UserLoginRoleModel.Seller;
  }

  get isAdmin() {
    return (
      this.identity && this.identity.roles.indexOf(UserRoleModel.Admin) > -1
    );
  }

  get logged() {
    return this.identity && this.identity.token;
  }

  get roleName() {
    let translated;
    this.translateService
      .get('common.user.' + this.identity.loginRole)
      .subscribe((res) => {
        translated = res;
      });

    return translated;
  }
}
