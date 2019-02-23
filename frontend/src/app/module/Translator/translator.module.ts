import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MissingTranslationHandlerParams, MissingTranslationHandler } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export class MyMissingTranslationHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams) {
    return 'Missing translation key: ' + params.key;
  }
}
