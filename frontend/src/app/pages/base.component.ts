import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { ContainerInjector } from '../modules/ContainerGetter/container-getter.module';

@Component({
  template: ''
})
export class BaseComponent implements OnInit {

  private titleService;
  public translateService;

  constructor(
    public activatedRoute: ActivatedRoute
  ) {
      // Get services manually
    this.titleService = ContainerInjector.get(Title);
    this.translateService = ContainerInjector.get(TranslateService);

      // Set translation lang
    this.translateService.setDefaultLang('sk');
    this.translateService.use('sk');
  }

  ngOnInit() {
    this.setRouteTitle();
    this.setHTMLlangAttr();
  }

  protected setRouteTitle() {
    const langKey = this.activatedRoute.snapshot.data['title'];

    this.translateService.get(langKey).subscribe((res: string) => {
      this.titleService.setTitle(res);
    });
  }

  private setHTMLlangAttr() {
    document.getElementsByTagName('html')[0].setAttribute('lang', this.translateService.currentLang);
  }

}
