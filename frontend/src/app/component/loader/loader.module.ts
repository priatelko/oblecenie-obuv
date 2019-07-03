import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {LoaderComponent} from './loader.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {CoreModule} from 'src/app/module/SharedModule/core.module';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    TranslateModule,
    MatProgressSpinnerModule,
  ],
  declarations: [LoaderComponent],
  exports: [LoaderComponent],
})
export class LoaderModule {}
