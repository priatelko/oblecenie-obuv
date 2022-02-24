import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';

import { HomepageComponent } from './homepage/homepage.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const pagesRoutes = [
  {
    path: '',
    component: HomepageComponent,
    pathMatch: 'full',
    data: { title: 'page.homepage.title' },
  },
  {
    path: 'demo',
    loadChildren: () => import('./demo/demo.module').then((m) => m.DemoModule),
  },
  {
    path: 'pridat-tovar',
    loadChildren: () =>
      import('./add-article/add-article.module').then(
        (m) => m.AddArticleModule
      ),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: { title: 'page.pageNotFound.title' },
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
