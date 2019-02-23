import { Injectable } from '@angular/core';
import { FlashMessageService } from '../FlashMessage/flash-message.service';
import { ApiRequestService } from '../ApiRequest/api-request.service';
import { UserModel } from 'src/app/model/Entity/User.model';
import { share } from 'rxjs/operators';
import { CommonResponseModel } from 'src/app/model/Entity/CommonResponse.model';
import { IdentityService } from './identity.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private flashmessage: FlashMessageService,
    private apiRequestService: ApiRequestService,
    private identityService: IdentityService
  ) {}

  login(userToLogin) {
    return this.apiRequestService.post<CommonResponseModel<UserModel>>('/user/login', userToLogin);
  }

  regist(userToRegister) {
    /*const request =*/ return this.apiRequestService.post<CommonResponseModel<UserModel>>('/user/new', userToRegister);

    // request.subscribe((res) => {
    //   if (res.success) {
    //     this.identityService.updateUser(res.data);
    //   }
    // });

    return request.pipe(
      share()
    );
  }

  changeRole() {
    const request = this.apiRequestService.get<CommonResponseModel<UserModel>>('/user/change-role', {cachable: false});

    request.subscribe((res) => {
      if (res.error) {
        this.flashmessage.error('common.response.code.' + res.error);
      } else {
        console.log('User role has changed');
        this.identityService.updateUser(res.data);
        this.flashmessage.success('component.user-role-changed.success');
      }
    });

    return request;
  }

  sendConfirmation(email) {
    const request = this.apiRequestService.get<CommonResponseModel<UserModel>>(
      '/user/send-confirmation/' + encodeURIComponent(email).replace('.', '%DOT%'), {cachable: false});

    request.subscribe((res) => {
      if (res.error) {
        this.flashmessage.error('common.response.code.' + res.error);
      } else {
        console.log('Regist confirmation sent');
        this.flashmessage.success('common.response.code.' + res.success);
      }
    });

    return request;
  }

  applyConfirmation(hash) {
    console.log('confirm');

    const request = this.apiRequestService.get<CommonResponseModel<UserModel>>(
      '/user/apply-confirmation/' + encodeURIComponent(hash), {cachable: false});

    request.subscribe((res) => {
      if (res.error) {
        this.flashmessage.error('common.response.code.' + res.error);
      } else {
        console.log('Regist confirmed');
        this.flashmessage.success('common.response.code.' + res.success);
      }
    });

    return request;
  }

  forgottenPassword(email) {
    const request = this.apiRequestService.get<CommonResponseModel<UserModel>>(
      '/user/forgotten-password/' + encodeURIComponent(email).replace('.', '%DOT%'), {cachable: false});

    request.subscribe((res) => {
      if (res.error) {
        this.flashmessage.error('common.response.code.' + res.error);
      } else {
        console.log('Forgotten password sent');
        this.flashmessage.success('common.response.code.' + res.success);
      }
    });

    return request;
  }

  confirmForgottenPassword(hash) {
    const request = this.apiRequestService.get<CommonResponseModel<UserModel>>(
      '/user/confirm-forgotten-password/' + hash, {cachable: false});

    request.subscribe((res) => {
      if (res.error) {
        this.flashmessage.error('common.response.code.' + res.error);
      } else {
        console.log('Password was reset');
        this.flashmessage.success('common.response.code.' + res.success);
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
