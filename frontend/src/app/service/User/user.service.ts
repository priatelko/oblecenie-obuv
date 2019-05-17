import {Injectable} from '@angular/core';
import {FlashMessageService} from '../FlashMessage/flash-message.service';
import {ApiRequestService} from '../ApiRequest/api-request.service';
import {UserModel} from 'src/app/model/Model/User.model';
import {IdentityService} from './identity.service';
import {HttpParams} from '@angular/common/http';
import {ApiResponseModel} from '../../model/Model/ApiResponse.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private flashmessage: FlashMessageService,
    private apiRequestService: ApiRequestService,
    private identityService: IdentityService
  ) {}

  login(userToLogin) {
    const request = this.apiRequestService.post<ApiResponseModel<UserModel>>(
      '/user/login',
      userToLogin
    );

    request.subscribe(res => {
      if (res.success) {
        console.log('User logged in');
        this.identityService.updateUser(res.data);
      }
    });

    return request;
  }

  regist(userToRegister) {
    const request = this.apiRequestService.post<ApiResponseModel<UserModel>>(
      '/user/new',
      userToRegister
    );

    request.subscribe(res => {
      if (res.success) {
        console.log('User signed up or profil updated');
        this.identityService.updateUser(res.data);
      }
    });

    return request;
  }

  changeRole() {
    const request = this.apiRequestService.get<ApiResponseModel<UserModel>>(
      '/user/change-role',
      {cachable: false}
    );

    request.subscribe(res => {
      if (res.success) {
        console.log('User role has changed');
        this.identityService.updateUser(res.data);
      }
    });

    return request;
  }

  sendConfirmation(email) {
    let params = new HttpParams();
    params = params.append('email', encodeURIComponent(email));

    const request = this.apiRequestService.get<ApiResponseModel<UserModel>>(
      '/user/send-confirmation',
      {params, cachable: false}
    );

    request.subscribe(res => {
      if (!res.error) {
        console.log('Regist confirmation sent');
      }
    });

    return request;
  }

  applyConfirmation(hash) {
    const request = this.apiRequestService.get<ApiResponseModel<UserModel>>(
      '/user/apply-confirmation/' + encodeURIComponent(hash),
      {cachable: false}
    );

    request.subscribe(res => {
      if (res.success) {
        console.log('Regist confirmed');
      }
    });

    return request;
  }

  forgottenPassword(email) {
    let params = new HttpParams();
    params = params.append('email', encodeURIComponent(email));

    const request = this.apiRequestService.get<ApiResponseModel<UserModel>>(
      '/user/forgotten-password',
      {params, cachable: false}
    );

    request.subscribe(res => {
      if (res.success) {
        console.log('Forgotten password sent');
      }
    });

    return request;
  }

  confirmForgottenPassword(hash) {
    const request = this.apiRequestService.get<ApiResponseModel<UserModel>>(
      '/user/confirm-forgotten-password/' + hash,
      {cachable: false}
    );

    request.subscribe(res => {
      if (res.success) {
        console.log('Password was reset');
      }
    });

    return request;
  }

  logout() {
    this.identityService.logout();
    this.flashmessage.success('common.user.logout');
    console.log('User logged out');
  }
}
