import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {UserModel, UserLoginRoleModel, UserRoleModel} from '../../model/Model/User.model';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {
  constructor(private translateService: TranslateService) {}

  /** Methods */
  updateUser(res) {
    localStorage.setItem('identity', JSON.stringify(res));
  }

  logout() {
    localStorage.removeItem('identity');
  }

  /** Getters */
  get identity(): UserModel {
    const identity = JSON.parse(localStorage.getItem('identity'));

    if (identity && identity.roles) {
      identity.roles = JSON.parse(identity.roles) || [];
    }

    return identity as UserModel;
  }
  get isBuyer() {
    return this.identity.loginRole === UserLoginRoleModel.Buyer;
  }

  get isSeller() {
    return this.identity.loginRole === UserLoginRoleModel.Seller;
  }

  get isAdmin() {
    return this.identity && this.identity.roles.indexOf(UserRoleModel.Admin) > -1;
  }

  get logged() {
    return this.identity && this.identity.token;
  }

  get roleName() {
    let translated;
    this.translateService
      .get('common.user.' + this.identity.loginRole)
      .subscribe(res => {
        translated = res;
      });

    return translated;
  }
}
