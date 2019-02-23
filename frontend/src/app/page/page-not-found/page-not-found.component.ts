import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
  providers: [
    RouterLink
  ]
})
export class PageNotFoundComponent extends BaseComponent implements OnInit {}
