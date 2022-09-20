import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent extends BaseComponent implements OnInit {
  cardsSize = 4;
  cardsSizeMax = 6;

  ngOnInit() {
    super.ngOnInit();
  }

  sizeCards(inc) {
    this.cardsSize = this.cardsSize + inc;
    this.cardsSize =
      this.cardsSize > this.cardsSizeMax
        ? this.cardsSizeMax
        : this.cardsSize < 1
        ? 1
        : this.cardsSize;
  }
}
