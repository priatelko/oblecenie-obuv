import { Component, TemplateRef } from '@angular/core';
import { SearchModelService } from '../../models/SearchModel/search-model.service';
import { MatDialog } from '@angular/material';
import { RegistComponent } from '../user/regist/regist.component';
import { LoginComponent } from '../user/login/login.component';
import { UserService } from 'src/app/services/User/user.service';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  constructor(
    public searchModel: SearchModelService,
    private dialog: MatDialog,
    public userService: UserService
  ) {}

  // Filter switch
  isActiveSearchType(type): boolean {
    return this.searchModel.isActiveType(type);
  }

  setActiveSearchType(type): void {
    this.searchModel.setActiveType(type);
  }

  // Modals
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

  // Actions
  changeRole() {
    this.userService.changeRole();
  }
}
