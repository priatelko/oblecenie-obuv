import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ElementRef,
} from '@angular/core';
import { SearchModelService } from '../../model/Model/Search.model';
import { MatDialog } from '@angular/material/dialog';
import { RegistComponent } from '../user/regist/regist.component';
import { LoginComponent } from '../user/login/login.component';
import { ForgottenComponent } from '../user/forgotten/forgotten.component';
import { UserManagerService } from '../../service/User/user-manager.service';
import { GLOBAL } from '../../variables/global';
import { IdentityService } from '../../service/User/identity.service';
import { SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() title: string;
  @Input() subTitle: string;
  @Input() backLink: string;

  constructor(
    public el: ElementRef,
    private searchModel: SearchModelService,
    private dialog: MatDialog,
    private userService: UserManagerService,
    private chd: ChangeDetectorRef,
    public identityService: IdentityService,
    private socialAuthService: SocialAuthService
  ) {}

  /** Filter switch */
  isActiveSearchType(type): boolean {
    return this.searchModel.isActiveType(type);
  }
  setActiveSearchType(type): void {
    this.searchModel.setActiveType(type);
  }

  /** Modals */
  openEditProfileModal() {
    this.dialog.open(RegistComponent, {
      data: { editProfile: true },
      width: GLOBAL.dialogWidth.md,
    });
  }
  openLoginModal() {
    this.dialog
      .open(LoginComponent, {
        width: GLOBAL.dialogWidth.sm,
      })
      .beforeClosed()
      .subscribe(() => {
        this.chd.detectChanges();
      });
  }

  /** Actions */
  changeRole() {
    const res = this.userService.changeRole();
    res.subscribe((_res) => {
      this.chd.detectChanges();
    });
  }
  logout() {
    this.userService.logout();
    this.chd.detectChanges();
  }
}
