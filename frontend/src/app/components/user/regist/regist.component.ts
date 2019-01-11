import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Observable, Subscription } from 'rxjs';

import { UserService } from '../../../services/User/user.service';
import { RoleEntityService, RoleEntity } from '../../../entity/role-entity.service';
import { Validator } from 'src/app/custom/validator.custom';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-user-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.scss']
})
export class RegistComponent implements OnInit, OnDestroy {
  registForm: FormGroup;
  registSubscription: Subscription;

  roles$: Observable<RoleEntity[]>;

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
    private roleRepository: RoleEntityService,
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

      this.registForm.patchValue(this.userService.identity);
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
    this.registSubscription = this.userService.regist(this.registForm.value, this.isEditMode).subscribe((res) => {
      if (!res.error) {
        this.dialogRef.close();
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
