import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  Injector,
  AfterContentInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl,
  NgControl,
} from '@angular/forms';
import {BindObservable} from 'bind-observable';
import {Observable} from 'rxjs';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {ToggleType} from './toggle-group.interface';
import {filter} from 'lodash';
import {MultiSelectOption, SelectOptionId} from 'src/app/custom/interfaces';

@Component({
  selector: 'app-toggle-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ToggleGroupComponent,
      multi: true,
    },
  ],
  template: `
    <app-validation
      *ngIf="formControlRef"
      [formControlRef]="formControlRef"
    ></app-validation>
    <div *ngFor="let toggle of options$ | async">
      <mat-slide-toggle
        *ngIf="(type$ | async) == toggleType.Toggle"
        [disabled]="disabled"
        [checked]="toggle.checked"
        (change)="toggleEvent($event, toggle.id)"
        >{{ toggle.label }}</mat-slide-toggle
      >
      <mat-checkbox
        *ngIf="(type$ | async) == toggleType.Checkbox"
        [disabled]="disabled"
        [checked]="toggle.checked"
        (change)="toggleEvent($event, toggle.id)"
        >{{ toggle.label }}</mat-checkbox
      >
    </div>
  `,
  styleUrls: ['./toggle-group.component.scss'],
})
export class ToggleGroupComponent
  implements OnInit, AfterContentInit, ControlValueAccessor, OnDestroy {
  MultiSelectOptions: MultiSelectOption[];
  disabled: boolean;
  value: SelectOptionId[] = [];
  toggleType = ToggleType;

  formControlRef: FormControl = new FormControl();

  @Input()
  @BindObservable()
  options: MultiSelectOption[];
  options$: Observable<MultiSelectOption[]>;
  @Input()
  @BindObservable()
  type: ToggleType = ToggleType.Checkbox;
  type$: Observable<ToggleType>;

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

  toggleEvent($event: MatSlideToggleChange, toggleId: SelectOptionId) {
    if ($event.checked) {
      this.value.push(toggleId);
    } else {
      this.value = filter(this.value, id => {
        return id !== toggleId;
      });
    }

    this.writeValue(this.value);
    this.onTouched();
    this.onChange(this.value);
  }

  // API
  onChange = (value: SelectOptionId[]) => {};
  onTouched = () => {};

  writeValue(value: SelectOptionId[]): void {
    value = value || [];
    this.value = value;

    this.options.forEach(opt => {
      opt.checked = value.indexOf(opt.id) >= 0 ? true : false;
    });
  }

  registerOnChange(fn: (value: SelectOptionId[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
