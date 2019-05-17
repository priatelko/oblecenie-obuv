import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {UserModel, UserLoginRoleModel} from '../../model/Model/User.model';

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
    return JSON.parse(localStorage.getItem('identity')) as UserModel;
  }
  get isBuyer() {
    return this.identity.loginRole === UserLoginRoleModel.Buyer;
  }

  get isSeller() {
    return this.identity.loginRole === UserLoginRoleModel.Seller;
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
