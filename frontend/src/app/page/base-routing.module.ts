import {NgModule} from '@angular/core';
import {RouterModule, PreloadAllModules} from '@angular/router';

import {HomepageComponent} from './homepage/homepage.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

const pagesRoutes = [
  {
    path: '',
    component: HomepageComponent,
    pathMatch: 'full',
    data: {title: 'page.homepage.title'},
  },
  {path: 'demo', loadChildren: './demo/demo.module#DemoModule'},
  {
    path: 'add-article',
    loadChildren: './add-article/add-article.module#AddArticleModule',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: {title: 'page.pageNotFound.title'},
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(pagesRoutes, {
      preloadingStrategy: PreloadAllModules,
      enableTracing: false,
    }),
  ],
  exports: [],
})
export class BaseRoutingModule {}
