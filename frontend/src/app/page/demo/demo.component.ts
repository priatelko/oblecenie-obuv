import { Component, OnInit } from '@angular/core';
import {
  FlashMessageService,
  FlashMessageTypes,
} from 'src/app/service/FlashMessage/flash-message.service';
import { BaseComponent } from '../base.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})
export class DemoComponent extends BaseComponent implements OnInit {
  constructor(
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected viewportScroller: ViewportScroller,
    private fms: FlashMessageService
  ) {
    super(activatedRoute);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  serveFlash(type) {
    const msg = `Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Et dolorem iure praesentium obcaecati quia adipisci minima dolor dolores quisquam,
    libero minus neque quidem corporis`;

    switch (type) {
      case FlashMessageTypes.Error:
        this.fms.error(msg);
        break;
      case FlashMessageTypes.Warning:
        this.fms.warning(msg);
        break;
      case FlashMessageTypes.Success:
        this.fms.success(msg);
        break;
      case FlashMessageTypes.Info:
        this.fms.info(msg);
        break;
    }
  }
}
