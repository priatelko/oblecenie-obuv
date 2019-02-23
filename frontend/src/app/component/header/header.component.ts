import { Component } from '@angular/core';
import { SearchModelService } from '../../model/SearchModel/search-model.service';
import { MatDialog } from '@angular/material';
import { RegistComponent } from '../user/regist/regist.component';
import { LoginComponent } from '../user/login/login.component';
import { ForgottenComponent } from '../user/forgotten/forgotten.component';
import { UserService } from 'src/app/service/User/user.service';
import { GLOBAL } from '../../service/global';
import { IdentityService } from 'src/app/service/User/identity.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  constructor(
    private searchModel: SearchModelService,
    private dialog: MatDialog,
    private userService: UserService,
    public identityService: IdentityService
  ) {}

  /** Filter switch */
  isActiveSearchType(type): boolean {
    return this.searchModel.isActiveType(type);
  }
  setActiveSearchType(type): void {
    this.searchModel.setActiveType(type);
  }

  /** Modals */
  openRegistModal() {
    this.dialog.open(RegistComponent, {
      width: GLOBAL.dialogWidth
    });
  }
  openEditProfileModal() {
    this.dialog.open(RegistComponent, {
      data: {editProfile: true},
      width: GLOBAL.dialogWidth
    });
  }
  openLoginModal() {
    this.dialog.open(LoginComponent, {
      width: GLOBAL.dialogWidth
    });
  }
  openForgottenPasswordModal() {
    this.dialog.open(ForgottenComponent, {
      width: GLOBAL.dialogWidth
    });
  }

  /** Actions */
  changeRole() {
    this.userService.changeRole();
  }
  logout() {
    this.userService.logout();
  }
}
