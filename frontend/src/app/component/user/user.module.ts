import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { LoginComponent } from './login/login.component';
import { RegistComponent } from './regist/regist.component';
import { ForgottenComponent } from './forgotten/forgotten.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderModule } from '../loader/loader.module';
import { SvgComponent } from '../../custom/svg/svg.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DndModule } from '../../form-control/dnd/dnd.module';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,

    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatOptionModule,
    MatTooltipModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,

    LoaderModule,
    DndModule,
  ],
  declarations: [
    LoginComponent,
    RegistComponent,
    ForgottenComponent,
    SvgComponent,
  ],
  exports: [MatInputModule, LoginComponent, RegistComponent],
})
export class UserModule {}
