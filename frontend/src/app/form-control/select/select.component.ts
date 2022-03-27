import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  Injector,
  AfterContentInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl,
  NgControl,
} from '@angular/forms';
import { BindObservable } from 'bind-observable';
import { Observable } from 'rxjs';
import { SelectType } from './select.interface';
import { filter } from 'lodash';
import { MultiSelectOption, SelectOptionId } from '../../custom/interfaces';
import { traverseNode } from '../../custom/helpers';

@Component({
  selector: 'app-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SelectComponent,
      multi: true,
    },
  ],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent
  implements OnInit, AfterContentInit, ControlValueAccessor, OnDestroy
{
  disabled: boolean;
  value: SelectOptionId | SelectOptionId[] = [];
  selectType = SelectType;

  formControlRef: FormControl = new FormControl();

  @Input()
  @BindObservable()
  options: MultiSelectOption[] = [];
  options$: Observable<MultiSelectOption[]>;
  @Input()
  @BindObservable()
  type: SelectType = SelectType.CheckList;
  type$: Observable<SelectType>;
  @Input()
  @BindObservable()
  multiselect = true;
  multiselect$: Observable<boolean>;

  @Output() valueChange = new EventEmitter<SelectOptionId | SelectOptionId[]>();

  // Prekaza to zavretiu erroru ktory pendluje na is touched
  // @HostListener('click')
  // onHostClick() {
  //   this.onTouched();
  // }

  constructor(private injector: Injector) {}

  ngOnInit() {}

  ngAfterContentInit() {
    const ngControl: NgControl = this.injector.get(NgControl, null);

    if (ngControl) {
      this.formControlRef = ngControl.control as FormControl;
    }
  }

  ngOnDestroy() {}

  toggleEvent(selectId: SelectOptionId, checked: boolean) {
    if (!checked) {
      // Set or insert value
      if (this.multiselect) {
        (this.value as SelectOptionId[]).push(selectId);
      } else {
        this.value = selectId;
      }
    } else if (this.multiselect) {
      // Remove value
      this.value = filter(this.value as SelectOptionId[], (id) => {
        return id !== selectId;
      });
    }

    this.syncOptions();
    this.writeValue(this.value);
    this.CVA_ON_TOUCHED();
    this.CVA_ON_CHANGE(this.value);
    this.valueChange.emit(this.value);
  }

  private syncOptions() {
    traverseNode(this.options, (item) => {
      item.checked = this.multiselect
        ? (this.value as SelectOptionId[]).indexOf(item.id) >= 0
        : this.value === item.id;
    });
  }

  // API
  CVA_ON_CHANGE = (value: SelectOptionId | SelectOptionId[]) => {};
  CVA_ON_TOUCHED = () => {};

  writeValue(value: SelectOptionId | SelectOptionId[]): void {
    this.value = value || [];

    if (!this.options) {
      return;
    }

    traverseNode(this.options, (item) => {
      item.checked = this.multiselect
        ? (this.value as SelectOptionId[]).indexOf(item.id) >= 0
          ? true
          : false
        : this.value === item.id;
    });
  }

  registerOnChange(fn: (value: SelectOptionId[]) => void): void {
    this.CVA_ON_CHANGE = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.CVA_ON_TOUCHED = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
