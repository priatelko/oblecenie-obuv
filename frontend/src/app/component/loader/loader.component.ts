import {Component, OnInit, Input, ChangeDetectionStrategy} from '@angular/core';

export enum LoaderSize {
  Small = 22,
  Medium = 64,
  Large = 128,
}

@Component({
  selector: 'app-loader',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  @Input() size: LoaderSize = LoaderSize.Small;

  loaderSize = LoaderSize;

  constructor() {}

  ngOnInit() {}
}
