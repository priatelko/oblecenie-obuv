import { NgModule } from '@angular/core';

import { HomepageComponent } from './homepage/homepage.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ListComponent } from '../components/articles/list/list.component';
import { BaseComponent } from './base.component';

import { ContainerGetterModule } from '../modules/ContainerGetter/container-getter.module';
import { HeaderModule } from '../components/header/header.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../modules/SharedModule/core.module';

@NgModule({
  imports: [
    CoreModule,
    RouterModule,
    CommonModule,
    HeaderModule,
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
