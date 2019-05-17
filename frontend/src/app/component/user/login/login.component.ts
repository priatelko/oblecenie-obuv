import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';

import {untilDestroyed} from 'ngx-take-until-destroy';

import {UserService} from '../../../service/User/user.service';
import {Observable} from 'rxjs';
import {LoginRoleRepositoryService} from '../../../model/Repository/LoginRole.repository';
import {MatDialogRef, MatDialog} from '@angular/material';
import {ForgottenComponent} from '../forgotten/forgotten.component';
import {GLOBAL} from '../../../service/global';
import {LoginRoleEntity} from '../../../model/Entity/LoginRole.entity';

@Component({
  selector: 'app-user-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  roles$: Observable<LoginRoleEntity[]>;

  confirmationError: boolean;
  badCredentials: boolean;

  constructor(
    private userService: UserService,
    private loginRoleRepository: LoginRoleRepositoryService,
    private dialogRef: MatDialogRef<LoginComponent>,
    private dialog: MatDialog
  ) {
    this.loginForm = this.createFormGroup();
  }

  ngOnInit() {
    this.roles$ = this.loginRoleRepository.getRoles();
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
        Validators.maxLength(50),
      ]),
      role: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit(): void {
    const login = this.userService.login(this.loginForm.value);

    login.pipe(untilDestroyed(this)).subscribe(response => {
      this.confirmationError = false;
      this.badCredentials = false;

      if (response.error) {
        switch (response.error) {
          case 4:
            this.badCredentials = true;
            break;
          case 6:
            this.confirmationError = true;
            break;
        }
      } else {
        this.dialogRef.close();
      }
    });
  }

  sendConfirmation() {
    this.userService.sendConfirmation(this.loginForm.value.email);
  }

  forgotPassword() {
    this.dialog.open(ForgottenComponent, {
      width: GLOBAL.dialogWidth.sm,
    });
  }

  ngOnDestroy() {}
}
