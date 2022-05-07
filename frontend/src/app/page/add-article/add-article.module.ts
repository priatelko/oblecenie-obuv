import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { AddArticleComponent } from './add-article.component';
import { HeaderModule } from '../../component/header/header.module';
import { AddModule } from '../../component/article/add/add.module';
import { ArtikelTyp } from '../../model/Entity/ArticleForm.entity';
import { TranslateModule } from '@ngx-translate/core';

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
    TranslateModule,
    RouterModule.forChild(routes),

    MatButtonModule,

    HeaderModule,
    AddModule,
  ],
  declarations: [AddArticleComponent],
  exports: [AddArticleComponent],
})
export class AddArticleModule {}
