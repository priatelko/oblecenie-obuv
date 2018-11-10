import { Component, TemplateRef } from '@angular/core';
import { SearchModelService } from '../../models/SearchModel/search-model.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  registModalRef: BsModalRef;
  loginModalRef: BsModalRef;

  constructor(
    public searchModel: SearchModelService,
    private modalService: BsModalService
  ) {}

  // Filter switch
  isActiveSearchType(type): boolean {
    return this.searchModel.isActiveType(type);
  }

  setActiveSearchType(type): void {
    this.searchModel.setActiveType(type);
  }

  // Modals
  openRegistModal(template: TemplateRef<any>) {
    this.registModalRef = this.modalService.show(template, {class: 'modal-lg'});
  }
  openLoginModal(template: TemplateRef<any>) {
    this.loginModalRef = this.modalService.show(template, {class: 'modal-lg'});
  }
}
