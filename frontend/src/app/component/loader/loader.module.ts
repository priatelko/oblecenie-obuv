import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {LoaderComponent} from './loader.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  imports: [TranslateModule, MatProgressSpinnerModule],
  declarations: [LoaderComponent],
  exports: [LoaderComponent],
})
export class LoaderModule {}
