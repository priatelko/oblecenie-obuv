import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Observable, Subscription } from 'rxjs';

import { UserService } from '../../../service/User/user.service';
import { LoginRoleEntityService, LoginRoleEntity } from '../../../repository/login-role.entity.service';
import { Validator } from 'src/app/custom/validator.custom';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IdentityService } from 'src/app/service/User/identity.service';

@Component({
  selector: 'app-user-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.scss']
})
export class RegistComponent implements OnInit, OnDestroy {
  registForm: FormGroup;
  registSubscription: Subscription;

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
    private roleRepository: LoginRoleEntityService,
    private dialogRef: MatDialogRef<RegistComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) {
    this.registForm = this.createFormGroup();
  }

  ngOnInit() {
    this.roles$ = this.roleRepository.findAll();

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
      Validator.sameAs(password)
    ]);

    const formGroup = new FormGroup({
        email: new FormControl(null, [
          Validators.email,
          Validators.required,
          Validator.trim(),
          Validators.maxLength(50),
        ]),
        role: new FormControl(null, [
          Validators.required
        ]),
        password,
        passwordConfirm
      },
    );

    if (this.isEditMode) {
      formGroup.addControl('name', new FormControl(null, [Validators.required, Validator.trim()]));
      formGroup.addControl('surname', new FormControl(null, [Validators.required, Validator.trim()]));
      formGroup.removeControl('role');
    }

    return formGroup;
  }

  onSubmit(): void {
    this.registSubscription = this.userService.regist(this.registForm.value).subscribe((res) => {
      console.log('regist', res);

      if (!res.error) {
        // this.dialogRef.close();
      }
    });
  }

  ngOnDestroy() {
    if (!(this.registSubscription instanceof Subscription)) {
      return;
    }

    this.registSubscription.unsubscribe();
  }
}
