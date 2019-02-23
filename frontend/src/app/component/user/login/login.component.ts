import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UserService } from '../../../service/User/user.service';
import { Observable, Subscription } from 'rxjs';
import { LoginRoleEntity, LoginRoleEntityService } from '../../../repository/login-role.entity.service';
import { merge } from 'lodash';
import { MatDialogRef } from '@angular/material';
import { CommonResponseModel } from 'src/app/model/Entity/CommonResponse.model';

@Component({
  selector: 'app-user-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  loginSubscription: Subscription;
  roles$: Observable<LoginRoleEntity[]>;
  confirmationError: boolean;

  constructor(
    private userService: UserService,
    private roleRepository: LoginRoleEntityService,
    private dialogRef: MatDialogRef<LoginComponent>
  ) {
    this.loginForm = this.createFormGroup();
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
    const login = this.userService.login(this.loginForm.value);

    this.loginSubscription = login.subscribe(
      response => {
        if (!response.error) {
          this.dialogRef.close();
        } else if (response.error === 6) {
          this.confirmationError = true;
        } else {
          this.confirmationError = false;
        }
      }
    );
  }

  sendConfirmation() {
    this.userService.sendConfirmation(this.loginForm.value.email);
  }

  ngOnDestroy() {
    if (!(this.loginSubscription instanceof Subscription)) {
      return;
    }

    this.loginSubscription.unsubscribe();
  }

}
