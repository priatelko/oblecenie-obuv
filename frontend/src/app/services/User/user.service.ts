import { Injectable } from '@angular/core';
import { FlashMessageService } from '../FlashMessage/flash-message.service';
import { ApiRequestService } from '../ApiRequest/api-request.service';
import { TranslateService } from '@ngx-translate/core';
import { UserModel } from 'src/app/models/User.model';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private flashmessage: FlashMessageService,
    private apiRequestService: ApiRequestService,
    private translateService: TranslateService
  ) {}

  /**
   * Getters
   */
  get role() {
    let translated;

    this.translateService.get('common.user.' + this.identity.loginRole).subscribe((res) => {
      translated = res;
    });

    return translated;
  }

  get logged() {
    return this.identity && this.identity.token;
  }

  get identity() {
    return JSON.parse(localStorage.getItem('identity')) as UserModel;
  }


  /**
   * Methods
   */
  login(userToLogin) {
    const request = this.apiRequestService.Post<UserModel>('/user/login', userToLogin).pipe(
      share()
    );

    request.subscribe((res) => {
      if (res.error) {
        this.flashmessage.error('common.response.error.' + res.error);
      } else {
        console.log('User logged in');
        this.updateUser(res);
        this.flashmessage.success('component.user-login.success');
      }
    }, error => {
      console.error('ERROR:', <any>error);
    });

    return request;
  }

  regist(userToRegister, editMode = false) {
    const request = this.apiRequestService.Post<UserModel>('/user/new', userToRegister).pipe(
      share()
    );

    request.subscribe((res) => {
      if (res.error) {
        this.flashmessage.error('common.response.error.' + res.error);
      } else {
        if (!editMode) {
          console.log('User registered and logged in');
          this.flashmessage.success('component.user-regist.success');
        } else {
          console.log('User was updated');
          this.flashmessage.success('component.user-editprofile.success');
        }

        this.updateUser(res);
      }
    }, error => {
      console.error('ERROR:', <any>error);
    });

    return request;
  }

  changeRole() {
    const request = this.apiRequestService.Get<UserModel>('/user/change-role', {cachable: false}).pipe(
      share()
    );

    request.subscribe((res) => {
      if (res.error) {
        this.flashmessage.error('common.response.error.' + res.error);
      } else {
        console.log('User role has changed');
        this.updateUser(res);
        this.flashmessage.success('component.user-role-changed.success');
      }
    }, error => {
      console.error('ERROR:', <any>error);
      this.flashmessage.error('common.response.error.' + error.error.error);
    });

    return request;
  }

  logout() {
    localStorage.removeItem('identity');

    console.log('User logged out');
    this.flashmessage.success('common.user.logout');
  }

  updateUser(res) {
    localStorage.setItem('identity', JSON.stringify(res));
  }
}
