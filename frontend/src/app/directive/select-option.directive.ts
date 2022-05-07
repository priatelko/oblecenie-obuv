import { Directive, Input, OnInit, ElementRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Directive({
  selector: '[appSelectOption]',
})
export class SelectOptionDirective implements OnInit {
  @Input('appSelectOption') appSelectOpt: object;

  constructor(
    private el: ElementRef,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.buildOption();
  }

  buildOption() {
    this.el.nativeElement.innerHTML = this.getText(this.appSelectOpt);
    this.el.nativeElement.setAttribute(
      'value',
      this.getValue(this.appSelectOpt)
    );
  }

  getText(data) {
    switch (true) {
      // Default value - vyberte si
      case typeof data.default !== 'undefined' && data.default === true:
        let transDefault = '';
        this.translateService.get('common.choose').subscribe((res) => {
          transDefault = res;
        });
        return transDefault;

      // Mozne hodnoty
      case typeof data.description !== 'undefined':
        return data.description;
    }
  }

  getValue(data) {
    switch (true) {
      // Default value - vyberte si, ziadne value
      case typeof data.default !== 'undefined' && data.default === true:
        return '';

      // Mozne hodnoty
      case typeof data.id !== 'undefined':
        return data.id;
    }
  }
}
