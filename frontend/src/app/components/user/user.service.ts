import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map, share } from 'rxjs/operators';
import { GLOBAL } from '../../services/global';
import { FlashMessageService } from '../../services/FlashMessage/flash-message.service';
import { PostRequestService } from '../../services/PostRequest/post-request.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public identity;
  public token;

  constructor(
    private _http: Http,
    private _flashmessage: FlashMessageService,
    private _postRequestService: PostRequestService
  ) {}

  signup(userToLogin) {
    const req = this._postRequestService.post(`${GLOBAL.url}/user/login`, userToLogin);

    req.subscribe((res) => {
      if (res.error) {
        this._flashmessage.addMessage('component.user-regist.error.' + res.error, 'danger');
      } else {
        console.log('User logged');
        this._flashmessage.addMessage('component.user-regist.success', 'success');
      }
    });

    return req;

    // const json = JSON.stringify(userToLogin);
    // const params = `json=${json}`;
    // const headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

    // return this._http.post(`${GLOBAL.url}/login`, params, {headers: headers}).pipe(
    //   map(res => res.json())
    // );
  }

  getIdentity() {
    this.identity = JSON.parse(localStorage.getItem('identity'));

    return this.identity;
  }

  getToken() {
    this.token = JSON.parse(localStorage.getItem('token'));

    return this.token;
  }

  register(userToRegister) {
    return this._postRequestService.post(`${GLOBAL.url}/user/new`, userToRegister)
    .subscribe((res) => {
      if (res.error) {
        this._flashmessage.addMessage('component.user-regist.error.' + res.error, 'danger');
      } else {
        console.log('User registered');
        this._flashmessage.addMessage('component.user-regist.success', 'success');
      }
    });
  }

  updateUser(userToUpdate) {
    const json 	= JSON.stringify(userToUpdate);
    const token = this.getToken();
    const params = `json=${json}&authorization=${token}`;
    const headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

    return this._http.post(`${GLOBAL.url}/user/edit`, params, {headers: headers}).pipe(
      map(res => res.json())
    );
  }

  getTask(token, id) {
    const params  = `authorization=${token}`;
    const headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

    return this._http.post(`${GLOBAL.url}/task/detail/${id}`, params, {headers: headers}).pipe(
      map(res => res.json())
    );
  }
}
