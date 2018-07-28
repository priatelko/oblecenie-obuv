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
  public ngxTranslateService;

  constructor(public activatedRoute: ActivatedRoute) {

      // Get manually services
    this.titleService = ContainerInjector.get(Title);
    this.ngxTranslateService = ContainerInjector.get(TranslateService);

      // Set translation lang
    this.ngxTranslateService.setDefaultLang('sk');
    this.ngxTranslateService.use('sk');
  }

  protected setRouteTitle() {
    const langKey = this.activatedRoute.snapshot.data['title'];

    this.ngxTranslateService.get(langKey).subscribe((res: string) => {
      this.titleService.setTitle(res);
    });
  }

  ngOnInit() {
    this.setRouteTitle();
  }

}
