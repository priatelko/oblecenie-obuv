import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';
import { TranslateModule, TranslateLoader, TranslateCompiler, MissingTranslationHandler } from '@ngx-translate/core';
import { createTranslateLoader, MyMissingTranslationHandler } from '../Translator/translator.module';

@NgModule({
  declarations: [
  ],
  imports: [
    HttpClientModule,
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
  ],
  exports: [],
  providers: []
})

export class CoreModule {}
