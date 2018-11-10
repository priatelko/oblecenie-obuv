import { Component } from '@angular/core';
import { WaiStatusService, WaiStatus } from './wai-status.service';

@Component({
  selector: 'app-wai-status',
  templateUrl: './wai-status.component.html',
  styleUrls: ['./wai-status.component.scss']
})
export class WaiStatusComponent {

  status: WaiStatus = {
    message: '',
    assertive: false
  };

  constructor(
    private _waiService: WaiStatusService
  ) {
    this._waiService.status$.subscribe((res) => {
      if (!res) {
        return;
      }

      setTimeout(() => {
        this.status = res;
        this.startClear();
      }, 50);
    });
  }

  startClear() {
    setTimeout(() => {
      this.status.message = '';
      this.status.assertive = false;
    }, 500);
  }
}
