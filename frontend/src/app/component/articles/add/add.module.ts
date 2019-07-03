import {NgModule} from '@angular/core';
import {MatButtonModule, MatProgressSpinnerModule} from '@angular/material';
import {CoreModule} from 'src/app/module/SharedModule/core.module';
import {FormModule} from 'src/app/module/SharedModule/form.module';
import {ToggleGroupModule} from 'src/app/form-control/toggle-group/toggle-group.module';
import {AddComponent} from './add.component';
import {DressComponent} from './dress/dress.component';
import {RouterModule} from '@angular/router';
import {LoaderModule} from '../../loader/loader.module';
import {ModalFilterModule} from '../../modal-filter/modal-filter.module';
import {ModalFilterComponent} from '../../modal-filter/modal-filter.component';

@NgModule({
  imports: [
    RouterModule,
    MatButtonModule,
    // custom
    CoreModule,
    FormModule,
    ToggleGroupModule,
    MatProgressSpinnerModule,
    LoaderModule,
    ModalFilterModule,
  ],
  declarations: [AddComponent, DressComponent],
  entryComponents: [ModalFilterComponent],
  exports: [AddComponent],
})
export class AddModule {}
