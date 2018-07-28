import { NgModule } from '@angular/core';
import {
  RouterModule, Routes, PreloadAllModules,
} from '@angular/router';

import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HomepageComponent } from './pages/homepage/homepage.component';

const appRoutes: Routes = [
  { path: '',   component: HomepageComponent, pathMatch: 'full', data: { title: 'page.homepage.title' } },
  { path: '**', component: PageNotFoundComponent, data: { title: 'page.pageNotFound.title' } }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      preloadingStrategy: PreloadAllModules,
      enableTracing: false
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
