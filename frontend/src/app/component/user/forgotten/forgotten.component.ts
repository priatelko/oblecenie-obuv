import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/User/user.service';
import { Subscription } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-forgotten',
  templateUrl: './forgotten.component.html',
  styleUrls: ['./forgotten.component.scss'],
})
export class ForgottenComponent {
  forgottenForm: FormGroup;
  confirmationError: boolean;
  forgottenSubscription: Subscription;

  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<ForgottenComponent>
  ) {
    this.forgottenForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      email: new FormControl(null, [
        Validators.email,
        Validators.required,
        Validators.maxLength(50),
      ]),
    });
  }

  onSubmit(): void {
    const forgottenPass = this.userService.forgottenPassword(
      this.forgottenForm.value.email
    );

    this.forgottenSubscription = forgottenPass.subscribe((response) => {
      if (response.error === 6) {
        this.confirmationError = true;
      } else {
        this.confirmationError = false;
      }

      if (response.success === 12 || response.error === 13) {
        this.dialogRef.close();
      }
    });
  }

  sendConfirmation() {
    this.userService.sendConfirmation(this.forgottenForm.value.email);
  }
}
