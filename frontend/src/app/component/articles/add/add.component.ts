import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {ArtikelTyp, Znacka} from '../../../model/Entity/Article.entity';
import {AddArticleDressRepositoryService} from '../../../model/Repository/AddArticleDress.repository';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {LoaderSize} from '../../loader/loader.component';
import {MatDialog} from '@angular/material';
import {ModalFilterComponent} from '../../modal-filter/modal-filter.component';
import {GLOBAL} from 'src/app/variables/global';
import {
  ModalFilterOptions,
  ModalFilterService,
} from '../../modal-filter/modal-filter.service';
import {
  OblecenieKategorie,
  OblecenieKategorieChildren,
} from 'src/app/model/Entity/AddArticleDress.entity';
import {MultiSelectOption} from 'src/app/custom/interfaces';
import {SelectType} from 'src/app/form-control/select/select.interface';
import {first} from 'lodash';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddComponent implements OnInit, OnDestroy {
  articleKind = ArtikelTyp;
  loaderSize = LoaderSize;

  addOblecenieForm: FormGroup;

  preKoho$: Observable<MultiSelectOption[]>;
  obdobie$: Observable<MultiSelectOption[]>;
  znacka$: Observable<MultiSelectOption[]>;

  @Input() addKind: ArtikelTyp;

  // Dress
  oblecenieKategorieFilter: FormControl = new FormControl();
  oblecenieZnackaFilter: FormControl = new FormControl();

  get oblecenieKategorieFilter$() {
    return this.addArticleDressRepository.getDressCategoriesFilter();
  }
  get oblecenieZnackaFilter$() {
    return this.addArticleDressRepository.getZnackaFilter();
  }

  constructor(
    private addArticleDressRepository: AddArticleDressRepositoryService,
    private dialog: MatDialog,
    private modalFilterService: ModalFilterService
  ) {}

  trackByFn(index, item: OblecenieKategorie) {
    return item.item;
  }
  trackByIdFn(index, item: OblecenieKategorieChildren) {
    return item.id;
  }

  createOblecenieFormGroup(): FormGroup {
    return new FormGroup({
      typ: new FormControl(null, []),
      preKoho: new FormControl(null, [Validators.required]),
      obdobie: new FormControl(null, [Validators.required]),
      oblecenieKategoria: new FormControl(null, [Validators.required]),
      znacka: new FormControl(null, [Validators.required]),
      stav: new FormControl(null, []),
      material: new FormControl(null, []),
      titulok: new FormControl(null, []),
      popis: new FormControl(null, []),
      cena: new FormControl(null, []),
      url: new FormControl(null, []),
      expiracia: new FormControl(null, []),
    });
  }

  ngOnInit() {
    this.addOblecenieForm = this.createOblecenieFormGroup();

    this.preKoho$ = this.addArticleDressRepository.getPreKohoOptions();
    this.obdobie$ = this.addArticleDressRepository.getObdobieOptions();
    this.addArticleDressRepository.dressCategoriesInit();
    this.addArticleDressRepository.znackaInit();

    this.oblecenieKategorieFilter.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(string => {
        this.addArticleDressRepository.filterDressCategories(string);
      });
    this.oblecenieZnackaFilter.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(string => {
        this.addArticleDressRepository.filterZnacka(string);
      });

    // chooseKind(kind: ArtikelTyp) {
    //   this.chosenKind = kind;
    //   this.addOblecenieForm.get('typ').patchValue(kind);
    // }

    // setTimeout(() => {
    //   this.addOblecenieForm.get('material').setValue('niexo');

    //   this.oblecenieKategorieFilter$.subscribe(res => {
    //     console.log(res);

    //     this.addOblecenieForm.get('oblecenieKategoria').setValue(8);
    //   });
    // }, 2000);
  }

  ngOnDestroy() {}

  onSubmit(): void {
    // const forgottenPass = this.userService.forgottenPassword(this.forgottenForm.value.email);
    // this.forgottenSubscription = forgottenPass.subscribe(
    //   response => {
    //     if (response.error === 6) {
    //       this.confirmationError = true;
    //     } else {
    //       this.confirmationError = false;
    //     }
    //   }
    // );
  }

  /** Helpers */
  openCategoryFilterDialog() {
    const data: ModalFilterOptions = {
      header: 'component.article.add.kategoria',
      required: true,
      multiselect: false,
      checkType: SelectType.Radio,
      items: this.modalFilterService.transformItems<
        OblecenieKategorie,
        OblecenieKategorieChildren
      >(
        this.addArticleDressRepository.oblecenieCategories,
        (item): MultiSelectOption => {
          return {
            id: null,
            label: item.item,
          };
        },
        'children',
        (item): MultiSelectOption => {
          return {
            id: item.id,
            label: item.nazov,
          };
        }
      ),
    };

    this.dialog
      .open(ModalFilterComponent, {
        width: GLOBAL.dialogWidth.lg,
        data,
      })
      .beforeClose()
      .subscribe(res => {
        const value = first(res);
        if (value) {
          this.addOblecenieForm.get('oblecenieKategoria').setValue(value);
        }
      });
  }

  openZnackaFilterDialog() {
    const data: ModalFilterOptions = {
      header: 'component.article.add.znacka',
      required: true,
      multiselect: false,
      minSearchLength: 2,
      checkType: SelectType.Radio,
      items: this.modalFilterService.transformItems<Znacka, Znacka>(
        this.addArticleDressRepository.znacka,
        (item): MultiSelectOption => {
          return {
            id: item.id,
            label: item.nazov,
          };
        }
      ),
    };

    this.dialog
      .open(ModalFilterComponent, {
        width: GLOBAL.dialogWidth.lg,
        data,
      })
      .beforeClose()
      .subscribe(res => {
        const value = first(res);
        if (value) {
          this.addOblecenieForm.get('znacka').setValue(value);
        }
      });
  }
}
