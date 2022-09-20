import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UserManagerService } from '../../../service/User/user-manager.service';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IdentityService } from '../../../service/User/identity.service';
import { Validator } from '../../../custom/validator.custom';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { enumImageContext, enumSize } from '../../../model/Model/Appearance';

@UntilDestroy()
@Component({
  selector: 'app-user-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.scss'],
})
export class RegistComponent implements OnInit {
  registForm: FormGroup;

  enumSize = enumSize;
  enumImageContext = enumImageContext;

  // Regist mode
  componentMode = {
    mode: 'regist',
    submit: 'regist',
  };

  get isEditMode() {
    return this.dialogData && this.dialogData.editProfile === true;
  }
  get isSocial() {
    return this.identityService.isSocial;
  }

  constructor(
    private userService: UserManagerService,
    private identityService: IdentityService,
    private dialogRef: MatDialogRef<RegistComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) {
    this.registForm = this.createFormGroup();
  }

  ngOnInit() {
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
      avatar: new FormControl(null),
      password,
      passwordConfirm,
    });

    if (this.isSocial) {
      formGroup.removeControl('email');
      formGroup.removeControl('password');
      formGroup.removeControl('passwordConfirm');
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
}
