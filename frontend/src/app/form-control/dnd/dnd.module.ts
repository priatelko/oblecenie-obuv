import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ValidationModule } from '../../component/form/validation/validation.module';
import { DndComponent } from './dnd.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { PluralTranslatePipe } from '../../pipe/pluralTranslate.pipe';
import { DndDirective } from './dnd.directive';

@NgModule({
  declarations: [DndComponent, DndDirective, PluralTranslatePipe],
  imports: [
    CommonModule,
    ValidationModule,
    TranslateModule,

    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
  ],
  exports: [DndComponent],
})
export class DndModule {}
