import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UserService } from '../../../services/User/user.service';
import { Observable, Subscription } from 'rxjs';
import { RoleEntity, RoleEntityService } from '../../../entity/role-entity.service';
import { merge } from 'lodash';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-user-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  loginSubscription: Subscription;

  roles$: Observable<RoleEntity[]>;

  public user;

  constructor(
    private userService: UserService,
    private roleRepository: RoleEntityService,
    private dialogRef: MatDialogRef<LoginComponent>
  ) {
    this.loginForm = this.createFormGroup();

    this.user = {
      'email' : '',
      'password' : ''
    };
  }

  ngOnInit() {
    this.roles$ = this.roleRepository.findAll();
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

  onSubmit(): void {
    const login = this.userService.login(merge(this.user, this.loginForm.value));

    this.loginSubscription = login.subscribe(
      response => {
        if (!response.error) {
          this.dialogRef.close();
        }
      }
    );
  }

  ngOnDestroy() {
    if (!(this.loginSubscription instanceof Subscription)) {
      return;
    }

    this.loginSubscription.unsubscribe();
  }

}
