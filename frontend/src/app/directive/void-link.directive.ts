import { Directive, OnInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[appVoidLink]'
})
export class VoidLinkDirective implements OnInit {

  constructor(
    private el: ElementRef
    ) {}

  ngOnInit() {
    this.el.nativeElement.setAttribute('href', 'javascript:void(0);');
  }

}
