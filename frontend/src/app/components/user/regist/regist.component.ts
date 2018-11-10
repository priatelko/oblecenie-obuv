import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { UserService } from '../user.service';
import { RoleEntityService, RoleEntity } from '../../../entity/role-entity.service';

@Component({
  selector: 'app-user-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.scss']
})
export class RegistComponent implements OnInit {

  @Input() modalRef: BsModalRef;

  registForm: FormGroup;

  roles$: Observable<RoleEntity[]>;

  constructor(
    private _userService: UserService,
    private _roleRepository: RoleEntityService,
  ) {
    this.registForm = this.createFormGroup();
  }

  ngOnInit() {
    this.roles$ = this._roleRepository.findAll();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
        email: new FormControl(null, [
          Validators.email,
          Validators.required,
          Validators.maxLength(50),
        ]),
        role: new FormControl(null, [
          Validators.required
        ]),
        passwords: new FormGroup({
            password: new FormControl(null, [
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(50)
            ]),
            passwordConfirm: new FormControl(null, [
              Validators.required
            ])
          }, {
            validators: this.passwordConfirming
          }
        )
      },
    );
  }

  private passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('passwordConfirm').value) {
        return {invalid: true};
    }
  }

  onSubmit(): void {
    this._userService.register(this.registForm.value);

    // Make sure to create a deep copy of the form-model
    // const result: ContactRequest = Object.assign({}, this.contactForm.value);
    // result.personalData = Object.assign({}, result.personalData);

    // Do useful stuff with the gathered data
    // console.log(result);
  }
}
