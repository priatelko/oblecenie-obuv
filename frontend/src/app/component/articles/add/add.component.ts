import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {ArtikelTyp} from '../../../model/Entity/Article.entity';
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

  @Input() addKind: ArtikelTyp;

  // Dress
  oblecenieKategorieFilter: FormControl = new FormControl();

  get oblecenieKategorieFilter$() {
    return this.addArticleDressRepository.getDressCategoriesFilter();
  }

  constructor(
    private addArticleDressRepository: AddArticleDressRepositoryService,
    private dialog: MatDialog,
    private modalFilterService: ModalFilterService
  ) {
    this.addOblecenieForm = this.createOblecenieFormGroup();
  }

  createOblecenieFormGroup(): FormGroup {
    return new FormGroup({
      typ: new FormControl(null, []),
      preKoho: new FormControl(null, [Validators.required]),
      obdobie: new FormControl(null, [Validators.required]),
      oblecenieKategoria: new FormControl(null, [Validators.required]),
      znacka: new FormControl(null, []),
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
    this.preKoho$ = this.addArticleDressRepository.getPreKohoOptions();
    this.obdobie$ = this.addArticleDressRepository.getObdobieOptions();
    this.addArticleDressRepository.dressCategoriesInit();

    this.oblecenieKategorieFilter.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(string => {
        this.addArticleDressRepository.filterDressCategories(string);
      });

    // chooseKind(kind: ArtikelTyp) {
    //   this.chosenKind = kind;
    //   this.addOblecenieForm.get('typ').patchValue(kind);
    // }
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
  // protected filterKategorie(string) {
  // this.addArticleDressRepository.filterDressCategories(string);
  // if (!this.banks) {
  //   return;
  // }
  // // get the search keyword
  // let search = this.bankFilterCtrl.value;
  // if (!search) {
  //   this.filteredBanks.next(this.banks.slice());
  //   return;
  // } else {
  //   search = search.toLowerCase();
  // }
  // // filter the banks
  // this.filteredBanks.next(
  //   this.banks.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
  // );
  // }

  openCategoryFilterDialog() {
    const data: ModalFilterOptions = {
      header: 'component.article.add.kategoria',
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

    this.dialog.open(ModalFilterComponent, {
      width: GLOBAL.dialogWidth.lg,
      data,
    });
  }
}
