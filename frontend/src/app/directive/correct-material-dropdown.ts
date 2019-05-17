import { Directive, Input, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { MatMenu } from '@angular/material';

@Directive({
  selector: '[appCorrectMaterialDropdown]'
})
export class CorrectMaterialDropdownDirective implements AfterViewInit {

  @Input('appCorrectMaterialDropdown') appCorrectMaterialDropdown: ElementRef;

  constructor(
    private host: MatMenu,
    private el: ElementRef
    ) {}

  ngAfterViewInit() {
    console.log('correct', this.appCorrectMaterialDropdown, this.el, this.host);
  }

}
