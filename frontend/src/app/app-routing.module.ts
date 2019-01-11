import { NgModule } from '@angular/core';
import {
  RouterModule, PreloadAllModules,
} from '@angular/router';

import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HomepageComponent } from './pages/homepage/homepage.component';

const pagesRoutes = [
  { path: '', component: HomepageComponent, pathMatch: 'full', data: { title: 'page.homepage.title' } },
  { path: 'demo', loadChildren: './pages/demo/demo.module#DemoModule'},
  { path: '**', component: PageNotFoundComponent, data: { title: 'page.pageNotFound.title' } }
];

@NgModule({
  imports: [
    RouterModule.forRoot(pagesRoutes, {
      preloadingStrategy: PreloadAllModules,
      enableTracing: false
    })
  ],
  exports: [

  ]
})
export class AppRoutingModule {}
