import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { ContainerInjector } from '../module/ContainerGetter/container-getter.module';
import { WaiStatusService } from '../component/header/wai-status/wai-status.service';
import { combineLatest } from 'rxjs';

@Component({
  template: '',
})
export class BaseComponent implements OnInit {
  private titleService;
  private waiService;
  private translateService;

  constructor(protected activatedRoute: ActivatedRoute) {
    // Get services manually
    this.titleService = ContainerInjector.get(Title);
    this.translateService = ContainerInjector.get(TranslateService);
    this.waiService = ContainerInjector.get(WaiStatusService);
  }

  ngOnInit() {
    this.setTitles();
    this.setHTMLlangAttr();
  }

  private setTitles() {
    // HTML title
    const langKey = this.activatedRoute.snapshot.data['title'];
    if (!langKey) {
      console.warn('Translation route missing.');
      return;
    }
    this.translateService.get(langKey).subscribe((res: string) => {
      this.titleService.setTitle(res);
    });

    // WAI navigate
    combineLatest(
      this.translateService.get('common.youNavigated'),
      this.translateService.get(langKey)
    ).subscribe(([youNavigated, title]) => {
      this.waiService.updateMessage(youNavigated + ' ' + title, true);
    });
  }

  private setHTMLlangAttr() {
    document
      .getElementsByTagName('html')[0]
      .setAttribute('lang', this.translateService.currentLang);
  }
}
