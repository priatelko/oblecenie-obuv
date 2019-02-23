import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { ContainerInjector } from '../module/ContainerGetter/container-getter.module';

@Component({
  template: ''
})
export class BaseComponent implements OnInit {

  private titleService;
  protected translateService;

  constructor(
    protected activatedRoute: ActivatedRoute
  ) {
      // Get services manually
    this.titleService = ContainerInjector.get(Title);
    this.translateService = ContainerInjector.get(TranslateService);
  }

  ngOnInit() {
    this.setRouteTitle();
    this.setHTMLlangAttr();
  }

  protected setRouteTitle() {
    const langKey = this.activatedRoute.snapshot.data['title'];

    if (!langKey) {
      console.warn('Translation route missing.');
      return;
    }

    this.translateService.get(langKey).subscribe((res: string) => {
      this.titleService.setTitle(res);
    });
  }

  private setHTMLlangAttr() {
    document.getElementsByTagName('html')[0].setAttribute('lang', this.translateService.currentLang);
  }

}
