import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HomepageComponent } from './homepage/homepage.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ListComponent } from '../component/articles/list/list.component';
import { BaseComponent } from './base.component';
import { ContainerGetterModule } from '../module/ContainerGetter/container-getter.module';
import { HeaderModule } from '../component/header/header.module';
import { CoreModule } from '../module/SharedModule/core.module';

@NgModule({
  imports: [
    CoreModule,
    RouterModule,
    CommonModule,
    HeaderModule
  ],
  declarations: [
    BaseComponent,
    HomepageComponent,
    PageNotFoundComponent,
    ListComponent
  ],
  exports: [
    ContainerGetterModule,
    CommonModule,
    CoreModule
  ]
})
export class BaseModule { }
