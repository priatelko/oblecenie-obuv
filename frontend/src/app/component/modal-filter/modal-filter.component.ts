import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {ModalFilterOptions} from './modal-filter.service';
import {LoaderSize} from '../loader/loader.component';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-modal-filter',
  templateUrl: './modal-filter.component.html',
  styleUrls: ['./modal-filter.component.scss'],
})
export class ModalFilterComponent implements OnInit {
  data: ModalFilterOptions;
  loaderSize = LoaderSize;

  filterControl = new FormControl();

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: ModalFilterOptions) {
    this.data = this.dialogData;
    console.log(this.data);
  }

  onSubmit() {}

  ngOnInit() {}
}
