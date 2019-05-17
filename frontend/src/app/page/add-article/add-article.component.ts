import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../base.component';
import {ActivatedRoute} from '@angular/router';
import {ArtikelTyp} from 'src/app/model/Entity/Article.entity';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss'],
})
export class AddArticleComponent extends BaseComponent implements OnInit {
  addKind: ArtikelTyp;

  constructor(protected activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }
  ngOnInit() {
    super.ngOnInit();
    this.addKind = this.activatedRoute.snapshot.data.sub;
  }
}
