import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';
import { TranslateModule, TranslateLoader, TranslateCompiler, MissingTranslationHandler, TranslateService } from '@ngx-translate/core';
import { createTranslateLoader, MyMissingTranslationHandler } from '../Translator/translator.module';

import { SelectOptionDirective } from '../../directive/select-option.directive';
import { LoaderModule } from '../../component/loader/loader.module';
import { apiRequestServiceCreator, ApiRequestService } from 'src/app/service/ApiRequest/api-request.service';
import { VoidLinkDirective } from 'src/app/directive/void-link.directive';
import { IdentityService } from 'src/app/service/User/identity.service';
import { FlashMessageService } from 'src/app/service/FlashMessage/flash-message.service';

@NgModule({
  declarations: [
    SelectOptionDirective,
    VoidLinkDirective
  ],
  imports: [
    BrowserModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient],
      },
      missingTranslationHandler: {provide: MissingTranslationHandler, useClass: MyMissingTranslationHandler},
      useDefaultLang: false,
      compiler: {
        provide: TranslateCompiler,
        useClass: TranslateMessageFormatCompiler
      }
    }),
    LoaderModule
  ],
  exports: [
    // modules
    BrowserModule,
    TranslateModule,
    LoaderModule,
    // directives
    SelectOptionDirective,
    VoidLinkDirective
  ],
  providers: [
    {
      provide: ApiRequestService,
      useFactory: apiRequestServiceCreator,
      deps: [HttpClient, TranslateService, IdentityService, FlashMessageService]
    },
  ]
})

export class CoreModule {}
