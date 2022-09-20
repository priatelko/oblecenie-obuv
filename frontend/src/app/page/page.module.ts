import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomepageComponent } from './homepage/homepage.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BaseComponent } from './base.component';
import { ContainerGetterModule } from '../module/ContainerGetter/container-getter.module';
import { HeaderModule } from '../component/header/header.module';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [BrowserModule, RouterModule, TranslateModule, HeaderModule],
  declarations: [BaseComponent, HomepageComponent, PageNotFoundComponent],
  exports: [ContainerGetterModule],
})
export class PageModule {}
