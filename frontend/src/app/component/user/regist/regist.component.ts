import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { UserService } from '../../../service/User/user.service';
import { LoginRoleRepositoryService } from '../../../model/Repository/LoginRole.repository';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { untilDestroyed } from 'ngx-take-until-destroy';
import { LoginRoleEntity } from '../../../model/Entity/LoginRole.entity';
import { IdentityService } from '../../../service/User/identity.service';
import { Validator } from '../../../custom/validator.custom';

@Component({
  selector: 'app-user-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.scss'],
})
export class RegistComponent implements OnInit, OnDestroy {
  registForm: FormGroup;

  roles$: Observable<LoginRoleEntity[]>;

  // Regist mode
  componentMode = {
    mode: 'regist',
    submit: 'regist',
  };

  get isEditMode() {
    return this.dialogData && this.dialogData.editProfile === true;
  }

  constructor(
    private userService: UserService,
    private identityService: IdentityService,
    private loginRoleRepository: LoginRoleRepositoryService,
    private dialogRef: MatDialogRef<RegistComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) {
    this.registForm = this.createFormGroup();
  }

  ngOnInit() {
    this.roles$ = this.loginRoleRepository.getRoles();

    // Edit mode
    if (this.isEditMode) {
      this.componentMode = {
        mode: 'editprofile',
        submit: 'save',
      };

      this.registForm.patchValue(this.identityService.identity);
    }
  }

  createFormGroup(): FormGroup {
    const password = new FormControl(null, [
      Validators.required,
      Validator.trim(),
      Validators.minLength(6),
      Validators.maxLength(50),
    ]);

    const passwordConfirm = new FormControl(null, [
      Validators.required,
      Validator.trim(),
      Validator.sameAs(password),
    ]);

    const formGroup = new FormGroup({
      email: new FormControl(null, [
        Validators.email,
        Validators.required,
        Validator.trim(),
        Validators.maxLength(50),
      ]),
      name: new FormControl(null, [Validators.required, Validator.trim()]),
      surname: new FormControl(null, [Validators.required, Validator.trim()]),
      role: new FormControl(null, [Validators.required]),
      password,
      passwordConfirm,
    });

    if (this.isEditMode) {
      formGroup.removeControl('role');
    }

    return formGroup;
  }

  onSubmit(): void {
    this.userService
      .regist(this.registForm.value)
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        if (!res.error) {
          this.dialogRef.close();
        }
      });
  }

  ngOnDestroy() {}
}
