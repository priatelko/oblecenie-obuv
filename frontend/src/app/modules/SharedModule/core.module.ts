import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';
import { TranslateModule, TranslateLoader, TranslateCompiler, MissingTranslationHandler } from '@ngx-translate/core';
import { createTranslateLoader, MyMissingTranslationHandler } from '../Translator/translator.module';

import { SelectOptionDirective } from '../../directive/select-option.directive';
import { LoaderModule } from '../../components/loader/loader.module';
import { apiRequestServiceCreator, ApiRequestService } from 'src/app/services/ApiRequest/api-request.service';

@NgModule({
  declarations: [
    SelectOptionDirective
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
    BrowserModule,
    TranslateModule,
    SelectOptionDirective,
    LoaderModule
  ],
  providers: [
    {
      provide: ApiRequestService,
      useFactory: apiRequestServiceCreator,
      deps: [HttpClient]
    },
  ]
})

export class CoreModule {}
