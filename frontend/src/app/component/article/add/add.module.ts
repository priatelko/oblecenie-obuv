import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CoreModule } from '../../../module/SharedModule/core.module';
import { FormModule } from '../../../module/SharedModule/form.module';
import { SelectModule } from '../../../form-control/select/select.module';
import { AddComponent } from './add.component';
import { RouterModule } from '@angular/router';
import { LoaderModule } from '../../loader/loader.module';
import { ModalFilterModule } from '../../modal-filter/modal-filter.module';
import { ValidationModule } from '../../form/validation/validation.module';
import { DndComponent } from '../../dnd/dnd.component';
import { DndDirective } from 'src/app/directive/dnd.directive';

@NgModule({
  imports: [
    RouterModule,
    MatButtonModule,

    // custom
    CoreModule,
    FormModule,
    SelectModule,
    MatProgressSpinnerModule,
    LoaderModule,
    ModalFilterModule,
    ValidationModule,
  ],
  declarations: [AddComponent, DndComponent, DndDirective],
  // entryComponents: [ModalFilterComponent],
  exports: [AddComponent],
})
export class AddModule {}
