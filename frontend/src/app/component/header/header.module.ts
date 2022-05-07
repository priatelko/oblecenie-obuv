import { NgModule } from '@angular/core';

import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

import { UserModule } from '../user/user.module';
import { AddModule } from '../article/add/add.module';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,

    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatButtonModule,

    UserModule,
    AddModule,
  ],
  declarations: [HeaderComponent],
  // entryComponents: [RegistComponent, LoginComponent, ForgottenComponent],
  exports: [HeaderComponent],
})
export class HeaderModule {}
