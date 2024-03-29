import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtikelTyp } from '../../model/Entity/ArticleForm.entity';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss'],
})
export class AddArticleComponent extends BaseComponent implements OnInit {
  addKind: ArtikelTyp;
  title: string;
  subTitle: string;
  backLink: string;
  wrapperClass: string;

  constructor(protected activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }
  ngOnInit() {
    super.ngOnInit();
    this.addKind = this.activatedRoute.snapshot.data.sub;

    switch (this.addKind) {
      default:
        this.title = 'component.article.add.title';
        this.subTitle = 'component.article.add.perex';
        break;
      case ArtikelTyp.dress:
        this.title = 'component.article.add.dress.title';
        this.subTitle = 'component.article.add.dress.perex';
        this.backLink = '../';
        this.wrapperClass = 'wrapper-dress';
        break;
      case ArtikelTyp.shoes:
        this.title = 'component.article.add.shoes.title';
        this.subTitle = 'component.article.add.shoes.perex';
        this.backLink = '../';
        this.wrapperClass = 'wrapper-shoes';
        break;
    }
  }
}
