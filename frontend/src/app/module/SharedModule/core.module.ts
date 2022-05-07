import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { SelectOptionDirective } from '../../directive/select-option.directive';
import {
  apiRequestServiceCreator,
  ApiRequestService,
} from '../../service/ApiRequest/api-request.service';
import { VoidLinkDirective } from '../../directive/void-link.directive';
import { IdentityService } from '../../service/User/identity.service';
import { FlashMessageService } from '../../service/FlashMessage/flash-message.service';
import { LogService } from '../../service/Admin/log.service';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
  if (parentModule) {
    throw new Error(
      `${moduleName} has already been loaded. Import Core modules in the AppModule only.`
    );
  }
}

@NgModule({
  declarations: [SelectOptionDirective, VoidLinkDirective],
  imports: [],
  exports: [
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatIconModule,
  ],
  providers: [
    {
      provide: ApiRequestService,
      useFactory: apiRequestServiceCreator,
      deps: [
        HttpClient,
        TranslateService,
        IdentityService,
        FlashMessageService,
        LogService,
      ],
    },
  ],
})
export class CoreModule {}
