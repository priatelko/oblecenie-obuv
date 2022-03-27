import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { AddArticleComponent } from './add-article.component';
import { HeaderModule } from '../../component/header/header.module';
import { CoreModule } from '../../module/SharedModule/core.module';
import { AddModule } from '../../component/article/add/add.module';
import { ArtikelTyp } from '../../model/Entity/Article.entity';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AddArticleComponent,
    data: { title: 'page.add-article.title' },
  },
  {
    path: 'oblecenie',
    component: AddArticleComponent,
    data: { sub: ArtikelTyp.dress, title: 'page.add-article.dress-title' },
  },
  {
    path: 'obuv',
    component: AddArticleComponent,
    data: { sub: ArtikelTyp.shoes, title: 'page.add-article.shoes-title' },
  },
];

@NgModule({
  imports: [
    CoreModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    HeaderModule,
    AddModule,
  ],
  declarations: [AddArticleComponent],
  exports: [AddArticleComponent, CoreModule],
})
export class AddArticleModule {}
