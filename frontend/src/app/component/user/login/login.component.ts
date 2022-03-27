import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { untilDestroyed } from 'ngx-take-until-destroy';

import { UserService } from '../../../service/User/user.service';
import { Observable } from 'rxjs';
import { LoginRoleRepositoryService } from '../../../model/Repository/LoginRole.repository';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ForgottenComponent } from '../forgotten/forgotten.component';
import { GLOBAL } from '../../../variables/global';
import { LoginRoleEntity } from '../../../model/Entity/LoginRole.entity';

/*import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider,
} from 'angular-6-social-login';*/
import { SvgName } from '../../../custom/svg/svg.component';
import { isNil } from 'lodash';
import { ApiRequestService } from '../../../service/ApiRequest/api-request.service';

export enum SocialPlatform {
  Facebook,
  Google,
}

@Component({
  selector: 'app-user-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  SvgName = SvgName;
  SocialPlatform = SocialPlatform;

  socialLogin: SocialPlatform;

  loginForm: FormGroup;
  roles$: Observable<LoginRoleEntity[]>;

  confirmationError: boolean;
  badCredentials: boolean;

  constructor(
    private userService: UserService,
    private loginRoleRepository: LoginRoleRepositoryService,
    private dialogRef: MatDialogRef<LoginComponent>,
    private dialog: MatDialog,
    // private socialAuthService: AuthService,
    private apiRequestService: ApiRequestService
  ) {
    this.loginForm = this.createFormGroup();
  }

  get isSocial() {
    return !isNil(this.socialLogin);
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
    // Social login
    if (!isNil(this.socialLogin)) {
      this.socialSignIn(this.socialLogin);
      return;
    }

    this.login(this.loginForm.value);
  }

  login(values: object): void {
    const login = this.userService.login(values);

    login.pipe(untilDestroyed(this)).subscribe((response) => {
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

  socialSignIn(socialPlatform: SocialPlatform) {
    this.socialLogin = socialPlatform;

    if (!this.loginForm.valid) {
      this.loginForm.get('role').markAsTouched();
      this.loginForm.get('role').updateValueAndValidity();
      this.loginForm.updateValueAndValidity();
      return;
    }

    /*let socialPlatformProvider;
    if (socialPlatform === SocialPlatform.Facebook) {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform === SocialPlatform.Google) {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then((userData) => {
      console.log(userData);
      const values = {
        provider: userData.provider,
        token: userData.token,
        role: this.loginForm.value.role,
      };

      this.login(values);
    });*/
  }

  // test() {
  //   console.log(this.socialAuthService.authState);
  //   // this.socialAuthService.signOut().then((userData) => {
  //   //   console.log(userData, 'out');
  //   // });
  // }

  // testEnd() {
  //   const request = this.apiRequestService.get<ApiResponseModel<any>>(
  //     '/user/test'
  //   );

  //   request.subscribe((res) => {
  //     console.log(res);
  //   });
  // }

  ngOnDestroy() {}
}
