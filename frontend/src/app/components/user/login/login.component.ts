import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BsModalRef } from 'ngx-bootstrap/modal';

import { UserService } from '../user.service';
import { Observable } from 'rxjs';
import { RoleEntity, RoleEntityService } from '../../../entity/role-entity.service';
import { merge } from 'lodash';

@Component({
  selector: 'app-user-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input() modalRef: BsModalRef;

  loginForm: FormGroup;

  public user;
  public identity;
  public token;

  roles$: Observable<RoleEntity[]>;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _roleRepository: RoleEntityService,
  ) {
    this.loginForm = this.createFormGroup();

    this.user = {
      'email' : '',
      'password' : '',
      'getHash' : 'true'
    };
  }

  ngOnInit() {
    this.roles$ = this._roleRepository.findAll();

    this.logout();
    this.redirectIfIdentity();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
        email: new FormControl(null, [
          Validators.email,
          Validators.required,
          Validators.maxLength(50),
        ]),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(50)
        ]),
        role: new FormControl(null, [
          Validators.required
        ]),
      });
  }

  logout() {
    this._route.params.forEach((params: Params) => {

      const logout = +params['id'];
      if (logout === 1) { // delete all session
        localStorage.removeItem('identity');
        localStorage.removeItem('token');
        console.log('User logged out');

        this.identity = null;
        this.token = null;

        window.location.href = '/';
      }
    });
  }

  redirectIfIdentity() {
    const identity = this._userService.getIdentity();
    if (identity != null && identity.sub) {
      this._router.navigate(['/']);
    }
  }

  onSubmit(): void {
    this._userService.signup(merge(this.user, this.loginForm.value)).subscribe(
      response => {
        this.identity = response;

        if (this.identity.lenght <= 1) {
          console.log('Server error');
        }{
          console.log(this.identity); return;

          /*if (!this.identity.status) {
            localStorage.setItem('identity', JSON.stringify(this.identity));

            // to get token
            this.user.getHash = null;
            this._userService.signup(this.user).subscribe(
              // tslint:disable-next-line:no-shadowed-variable
              response => {
                this.token = response;

                if (this.identity.lenght <= 1) {
                  console.log('Server error');
                }{
                  if (!this.identity.status) {
                    localStorage.setItem('token', JSON.stringify(this.token));
                    window.location.href = '/';
                  }
                }
              },
              error => {
                console.log(<any>error);
              }
            );

          }*/
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
