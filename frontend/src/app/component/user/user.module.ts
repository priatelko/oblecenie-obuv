import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { LoginComponent } from './login/login.component';
import { CoreModule } from '../../module/SharedModule/core.module';
import { FormModule } from 'src/app/module/SharedModule/form.module';
import { RegistComponent } from './regist/regist.component';
import { ForgottenComponent } from './forgotten/forgotten.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderModule } from '../loader/loader.module';
import { SvgComponent } from 'src/app/custom/svg/svg.component';

@NgModule({
  imports: [
    FormModule,
    CoreModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    LoaderModule,
  ],
  declarations: [
    LoginComponent,
    RegistComponent,
    ForgottenComponent,
    SvgComponent,
  ],
  exports: [],
})
export class UserModule {}
