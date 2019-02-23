import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSpinner } from '@angular/material';

@NgModule({
  declarations: [
    MatSpinner,
  ],
  imports: [
    BrowserAnimationsModule,
  ],
  exports: [
    BrowserAnimationsModule,
    MatSpinner
  ],
  providers: []
})

export class MaterialModule {}
