import { Component, OnInit, Input } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-user-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.scss']
})
export class RegistComponent implements OnInit {

  @Input() modalRef: BsModalRef;

  constructor() { }

  ngOnInit() {
  }

}
