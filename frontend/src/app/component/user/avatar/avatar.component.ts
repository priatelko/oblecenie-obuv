import { Component, OnInit } from '@angular/core';
import { IdentityService } from '../../../service/User/identity.service';

@Component({
  selector: 'app-avatar',
  template: `
    <!-- Loggede -->
    <ng-container *ngIf="identityService.isLogged">
      <img
        *ngIf="identityService.identity.avatar"
        [src]="identityService.identity.avatar"
      />
      <mat-icon *ngIf="!identityService.identity.avatar" class="big-disabled"
        >face</mat-icon
      >
    </ng-container>

    <!-- Not logged -->
    <mat-icon *ngIf="!identityService.isLogged" class="big-disabled"
      >person_search</mat-icon
    >
  `,
  styles: [
    `
      img {
        width: 6rem;
        height: 6rem;
        border-radius: 50%;
      }
      .big-success,
      .big-disabled {
        color: var(--blue);
        font-size: 7rem;
      }
      .big-disabled {
        color: var(--gray);
      }
    `,
  ],
})
export class AvatarComponent implements OnInit {
  constructor(public identityService: IdentityService) {}

  ngOnInit(): void {}
}
