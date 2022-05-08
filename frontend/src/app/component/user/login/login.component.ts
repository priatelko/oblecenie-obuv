import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UserManagerService } from '../../../service/User/user-manager.service';
import { Observable } from 'rxjs';
import { LoginRoleRepositoryService } from '../../../model/Repository/LoginRole.repository';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ForgottenComponent } from '../forgotten/forgotten.component';
import { GLOBAL } from '../../../variables/global';
import { LoginRoleEntity } from '../../../model/Entity/LoginRole.entity';

import { SvgName } from '../../../custom/svg/svg.component';

import {
  SocialAuthService,
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialUser,
} from 'angularx-social-login';
import { RegistComponent } from '../regist/regist.component';
import { SocialProvider } from '../../../model/Model/User.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
@UntilDestroy()
@Component({
  selector: 'app-user-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  SvgName = SvgName;

  loginForm: FormGroup;
  roles$: Observable<LoginRoleEntity[]>;

  confirmationError: boolean;

  socialChoosen: SocialProvider;
  socialLogin = false;
  userProvider = SocialProvider;

  constructor(
    private userService: UserManagerService,
    private loginRoleRepository: LoginRoleRepositoryService,
    private dialogRef: MatDialogRef<LoginComponent>,
    private dialog: MatDialog,
    private socialAuthService: SocialAuthService
  ) {
    this.loginForm = this.createFormGroup();
  }

  ngOnInit() {
    this.roles$ = this.loginRoleRepository.getRoles();

    this.socialAuthService.authState
      .pipe(untilDestroyed(this))
      .subscribe((user: SocialUser) => {
        if (user == null) {
          return;
        }
        const values = {
          provider: user.provider.toLocaleLowerCase(),
          token: user.authToken,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: this.loginForm.value.role,
        };

        this.login(values);
      });
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
    if (this.socialChoosen === SocialProvider.Facebook) {
      this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    } else if (this.socialChoosen === SocialProvider.Google) {
      this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    } else {
      this.login(this.loginForm.value);
    }
  }

  login(values: object): void {
    if (!this.loginForm.valid) {
      return;
    }

    const login = this.userService.login(values);

    login.pipe(untilDestroyed(this)).subscribe((response) => {
      this.confirmationError = false;

      if (response.error) {
        switch (response.error) {
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

  openRegistModal() {
    this.dialog.open(RegistComponent, {
      width: GLOBAL.dialogWidth.md,
    });
  }

  socialPrepareSign(socialPlatform: SocialProvider) {
    if (this.socialChoosen === socialPlatform) {
      this.socialChoosen = null;
      return;
    }

    this.socialChoosen = socialPlatform;

    // Remove email and password validity
    this.loginForm.get('email').setValidators(null);
    this.loginForm.get('email').updateValueAndValidity();
    this.loginForm.get('password').setValidators(null);
    this.loginForm.get('password').updateValueAndValidity();

    // if (!this.loginForm.valid) {
    //   this.loginForm.get('role').markAsTouched();
    //   this.loginForm.updateValueAndValidity();
    //   return;
    // }
  }

  test() {
    console.log(this.socialAuthService.authState);
  }

  // testEnd() {
  //   const request = this.apiRequestService.get<any>(
  //     '/user/test'
  //   );

  //   request.subscribe((res) => {
  //     console.log(res);
  //   });
  // }

  debug() {
    console.log(this.loginForm);
  }
}
