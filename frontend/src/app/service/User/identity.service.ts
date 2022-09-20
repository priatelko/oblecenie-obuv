import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  UserModel,
  UserBussinesRoleModel,
  UserRoleModel,
  SocialProvider,
} from '../../model/Model/User.model';

// User services limits between payd and free
enum ServiceLimits {
  ArticleImageUpload = 3,
}
enum ServiceLimitsExtra {
  ArticleImageUpload = 9,
}

@Injectable({
  providedIn: 'root',
})
export class IdentityService {
  identity: UserModel;

  constructor(private translateService: TranslateService) {
    this.identity = JSON.parse(localStorage.getItem('identity'));

    if (!this.identity) {
      // Default anonym identity
      this.identity = {
        loginRole: UserBussinesRoleModel.Anonym,
      };
    }
  }

  /** Methods */
  updateIdentity(res: UserModel) {
    this.identity = res;
    localStorage.setItem('identity', JSON.stringify(res));
  }

  logout() {
    this.identity = { loginRole: UserBussinesRoleModel.Anonym };
    localStorage.removeItem('identity');

    // continue as anonym
    this.updateIdentity(this.identity);
  }

  // Getters
  get isAnonym() {
    return this.identity.loginRole === UserBussinesRoleModel.Anonym;
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
  get limit() {
    return this.isAnonym ? ServiceLimits : ServiceLimitsExtra;
  }

  // logged
  get isBuyer() {
    return this.identity.loginRole === UserBussinesRoleModel.Buyer;
  }

  get isSeller() {
    return this.identity.loginRole === UserBussinesRoleModel.Seller;
  }
  get isAdmin() {
    return (
      !this.isAnonym && this.identity.roles.indexOf(UserRoleModel.Admin) > -1
    );
  }
  get isExtra() {
    return !this.isAnonym && this.identity.extra;
  }
  get isLogged() {
    return !this.isAnonym && this.identity.token;
  }
  get isSocial() {
    if (!this.isLogged) {
      return false;
    }
    return this.identity.provider !== SocialProvider.Local;
  }
  get isGoogle() {
    return this.isSocial && this.identity.provider === SocialProvider.Google;
  }
  get isFacebook() {
    return this.isSocial && this.identity.provider === SocialProvider.Facebook;
  }
}
