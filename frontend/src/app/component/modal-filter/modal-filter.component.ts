import {
  Component,
  Inject,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {ModalFilterOptions} from './modal-filter.service';
import {LoaderSize} from '../loader/loader.component';
import {FormControl} from '@angular/forms';
import {SelectType} from 'src/app/form-control/select/select.interface';
import {merge} from 'lodash';
import {MultiSelectOption} from 'src/app/custom/interfaces';
import {appendNoDiacritics} from 'src/app/custom/helpers';

@Component({
  selector: 'app-modal-filter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './modal-filter.component.html',
  styleUrls: ['./modal-filter.component.scss'],
})
export class ModalFilterComponent implements OnInit {
  defaultData: Partial<ModalFilterOptions> = {
    search: true,
    checkType: SelectType.CheckList,
    multiselect: true,
  };
  data: ModalFilterOptions;
  dataFinal: MultiSelectOption[];
  loaderSize = LoaderSize;

  selectType = SelectType;

  filterControl = new FormControl();
  filterSearchControl = new FormControl();

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: ModalFilterOptions) {
    this.data = merge(this.defaultData, this.dialogData);
    this.dataFinal = appendNoDiacritics(this.data.items);
  }

  onSubmit() {}

  cancelSearch() {
    console.log('cancedl search');
  }

  ngOnInit() {
    this.filterSearchControl.valueChanges.subscribe(val => {
      console.log(this.dataFinal);
    });
  }
}
