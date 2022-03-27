import {
  Component,
  Inject,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalFilterOptions } from './modal-filter.service';
import { LoaderSize } from '../loader/loader.component';
import { FormControl, Validators } from '@angular/forms';
import { SelectType } from '../../form-control/select/select.interface';
import { merge, some } from 'lodash';
import { MultiSelectOption, BreakException } from '../../custom/interfaces';
import {
  appendNoDiacritics,
  searchInModel,
  traverseNode,
} from '../../custom/helpers';

@Component({
  selector: 'app-modal-filter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './modal-filter.component.html',
  styleUrls: ['./modal-filter.component.scss'],
})
export class ModalFilterComponent implements OnInit {
  defaultData: Partial<ModalFilterOptions> = {
    search: true,
    minSearchLength: 3,
    checkType: SelectType.CheckList,
    multiselect: true,
  };
  data: ModalFilterOptions;
  dataFinal: MultiSelectOption[];
  loaderSize = LoaderSize;

  selectType = SelectType;

  filterControl = new FormControl();
  filterSearchControl = new FormControl();
  searchValue = '';

  get isAnyData() {
    let notAnyHidden = false;

    traverseNode(this.dataFinal, (item) => {
      if (!item.hidden) {
        notAnyHidden = true;
        return false;
      }
    });

    return notAnyHidden;
  }

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: ModalFilterOptions) {
    this.data = merge(this.defaultData, this.dialogData);
    this.data.items = appendNoDiacritics(this.data.items);
    this.dataFinal = this.data.items;
  }

  onSubmit() {}

  ngOnInit() {
    if (this.data.required) {
      this.filterControl.setValidators([Validators.required]);
    }

    this.filterSearchControl.valueChanges.subscribe((val) => {
      this.searchValue = val;
      this.dataFinal = searchInModel(
        this.data.items,
        val,
        this.data.minSearchLength
      );
    });

    // Default value
    if (this.data.defaultValue) {
      this.filterControl.setValue(this.data.defaultValue);
    }
  }
}
