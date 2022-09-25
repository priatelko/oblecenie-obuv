import { Injectable } from '@angular/core';
import { ApiRequestService } from '../ApiRequest/api-request.service';
import { UserModel } from '../../model/Model/User.model';
import { IdentityService } from './identity.service';
import { HttpParams } from '@angular/common/http';
import { LogService } from '../Admin/log.service';
import * as _ from 'lodash';
import { dndFileToImgPaths } from '../../custom/helpers';

@Injectable({
  providedIn: 'root',
})
export class UserManagerService {
  constructor(
    private apiRequestService: ApiRequestService,
    private identityService: IdentityService,
    private debug: LogService
  ) {}

  // Check identity from backend
  loggedBECheck() {
    const request = this.apiRequestService.get<UserModel>(
      '/user/logged-check',
      {
        cachable: false,
      }
    );

    request.subscribe((res) => {
      if (res.success) {
        this.debug.log('User has been logged from BackEnd');
        this.identityService.updateIdentity(res.data);
      } else {
        this.debug.log('Bad authorization, going to logout from FE');
        this.identityService.logout();
      }
    });
  }

  login(userToLogin) {
    const request = this.apiRequestService.post<UserModel>(
      '/user/login',
      userToLogin
    );

    request.subscribe((res) => {
      if (res.success) {
        this.debug.log('User logged in');
        this.identityService.updateIdentity(res.data);
      }
    });

    return request;
  }

  regist(userToRegister) {
    // Normalize avatar
    dndFileToImgPaths(userToRegister.avatar);

    const request = this.apiRequestService.post<UserModel>(
      '/user/new',
      userToRegister
    );

    request.subscribe((res) => {
      if (res.success) {
        this.debug.log('User signed up or profil updated');
        this.identityService.updateIdentity(res.data);
      }
    });

    return request;
  }

  changeRole() {
    const request = this.apiRequestService.get<UserModel>('/user/change-role', {
      cachable: false,
    });

    request.subscribe((res) => {
      if (res.success) {
        this.debug.log('User role has changed');
        this.identityService.updateIdentity(res.data);
      }
    });

    return request;
  }

  sendConfirmation(email) {
    let params = new HttpParams();
    params = params.append('email', encodeURIComponent(email));

    const request = this.apiRequestService.get<UserModel>(
      '/user/send-confirmation',
      { params, cachable: false }
    );

    request.subscribe((res) => {
      if (!res.error) {
        this.debug.log('Regist confirmation sent');
      }
    });

    return request;
  }

  applyConfirmation(hash) {
    const request = this.apiRequestService.get<UserModel>(
      '/user/apply-confirmation/' + encodeURIComponent(hash),
      { cachable: false }
    );

    request.subscribe((res) => {
      if (res.success) {
        this.debug.log('Regist confirmed');
      }
    });

    return request;
  }

  forgottenPassword(email) {
    let params = new HttpParams();
    params = params.append('email', encodeURIComponent(email));

    const request = this.apiRequestService.get<UserModel>(
      '/user/forgotten-password',
      { params, cachable: false }
    );

    request.subscribe((res) => {
      if (res.success) {
        this.debug.log('Forgotten password sent');
      }
    });

    return request;
  }

  confirmForgottenPassword(hash) {
    const request = this.apiRequestService.get<UserModel>(
      '/user/confirm-forgotten-password/' + hash,
      { cachable: false }
    );

    request.subscribe((res) => {
      if (res.success) {
        this.debug.log('Password was reset');
      }
    });

    return request;
  }

  logout() {
    const request = this.apiRequestService.get<UserModel>('/user/logout', {
      cachable: false,
    });

    request.subscribe((res) => {
      if (res.success) {
        this.debug.log('User logged out');
        this.identityService.logout();
      }
    });
  }
}
