import { Component, OnInit, Input } from '@angular/core';

export enum SvgName {
  Facebook,
  Google,
}

@Component({
  selector: 'app-svg',
  templateUrl: './svg.component.html',
  styles: [``],
})
export class SvgComponent implements OnInit {
  SvgName = SvgName;

  @Input() type: SvgName;

  constructor() {}

  ngOnInit() {}
}
