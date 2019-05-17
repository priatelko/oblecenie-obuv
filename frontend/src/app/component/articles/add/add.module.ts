import {NgModule} from '@angular/core';
import {MatButtonModule, MatProgressSpinnerModule} from '@angular/material';
import {CoreModule} from 'src/app/module/SharedModule/core.module';
import {FormModule} from 'src/app/module/SharedModule/form.module';
import {ToggleGroupModule} from 'src/app/form-control/toggle-group/toggle-group.module';
import {AddComponent} from './add.component';
import {DressComponent} from './dress/dress.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    RouterModule,
    MatButtonModule,
    // custom
    CoreModule,
    FormModule,
    ToggleGroupModule,
    MatProgressSpinnerModule,
  ],
  declarations: [AddComponent, DressComponent],
  exports: [AddComponent],
})
export class AddModule {}
