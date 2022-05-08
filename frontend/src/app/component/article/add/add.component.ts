import { Component, OnInit, Input, TrackByFunction } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ArtikelTyp } from '../../../model/Entity/ArticleForm.entity';
import { ArticleRepositoryService } from '../../../model/Repository/Article.repository';
import { LoaderSize } from '../../loader/loader.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalFilterComponent } from '../../modal-filter/modal-filter.component';
import { GLOBAL } from '../../../variables/global';
import {
  ModalFilterOptions,
  ModalFilterService,
} from '../../modal-filter/modal-filter.service';

import {
  DBSimpleEntity,
  Kategorie,
  KategorieChildren,
  MultiSelectOption,
  SelectOption,
} from '../../../model/Entity/Form.entity';
import { SelectType } from '../../../form-control/select/select.interface';
import { includes } from 'lodash';
import { AddArticleFormTypeService } from './form-type.service';
import { Validator } from '../../../custom/validator.custom';
import { IdentityService } from '../../../service/User/identity.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LoginComponent } from '../../user/login/login.component';
import { ArticleService } from '../../../service/Article/article.service';
import { enumImageContext } from '../../../model/Model/Appearance';

@UntilDestroy()
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddComponent implements OnInit {
  articleKind = ArtikelTyp;
  loaderSize = LoaderSize;

  SelectType = SelectType;
  enumImageContext = enumImageContext;

  formStep = 1;

  addOblecenieForm: FormGroup;
  addOblecenieFormPopis: FormGroup;
  addOblecenieFormZaradenie: FormGroup;
  addOblecenieFormZaradenieVelkost: FormGroup;

  preKoho$: Observable<MultiSelectOption[]>;
  obdobie$: Observable<MultiSelectOption[]>;
  styl$: Observable<MultiSelectOption[]>;
  znacka$: Observable<MultiSelectOption[]>;
  prilezitost$: Observable<MultiSelectOption[]>;
  zapinanie$: Observable<MultiSelectOption[]>;
  stav$: Observable<MultiSelectOption[]>;
  zostrih$: Observable<SelectOption[]>;
  velkost$: Observable<SelectOption[]>;

  @Input() addKind: ArtikelTyp;

  // Dress
  oblecenieKategorieFilter: FormControl = new FormControl();
  oblecenieZnackaFilter: FormControl = new FormControl();

  dndLimit = this.identityService.limit.ArticleImageUpload;

  get oblecenieKategorieFilter$() {
    return this.addArticleDressRepository.getDressCategoriesFilter();
  }
  get oblecenieZnackaFilter$() {
    return this.addArticleDressRepository.getZnackaFilter();
  }

  get isVelkostInvalid() {
    return Validator.isInvalid(
      this.addOblecenieFormZaradenie.get('velkost') as FormGroup
    );
  }

  constructor(
    private addArticleDressRepository: ArticleRepositoryService,
    private dialog: MatDialog,
    private modalFilterService: ModalFilterService,
    private formType: AddArticleFormTypeService,
    private articleService: ArticleService,
    public identityService: IdentityService
  ) {}

  trackByFn(index, item: Kategorie) {
    return item.item;
  }
  // trackByIdFn(index, item: KategorieChildren) {
  //   return item.id;
  // }
  trackByIdFn: TrackByFunction<any> = (index: number, item: any) => item.id;

  ngOnInit() {
    this.addOblecenieForm = this.formType.getDress();
    this.addOblecenieFormPopis = this.addOblecenieForm.get(
      'popis'
    ) as FormGroup;
    this.addOblecenieFormZaradenie = this.addOblecenieForm.get(
      'zaradenie'
    ) as FormGroup;
    this.addOblecenieFormZaradenieVelkost = this.addOblecenieFormZaradenie.get(
      'velkost'
    ) as FormGroup;

    this.preKoho$ = this.addArticleDressRepository.getPreKohoOptions();
    this.obdobie$ = this.addArticleDressRepository.getObdobieOptions();
    this.styl$ = this.addArticleDressRepository.getStylOptions();
    this.prilezitost$ = this.addArticleDressRepository.getPrilezitostOptions();
    this.zapinanie$ = this.addArticleDressRepository.getZapinanieOptions();
    this.stav$ = this.addArticleDressRepository.getStavOptions();
    this.zostrih$ = this.addArticleDressRepository.getZostrihOptions();
    this.velkost$ = this.addArticleDressRepository.getVelkostOptions();
    this.addArticleDressRepository.dressCategoriesInit();
    this.addArticleDressRepository.znackaInit();
    this.addArticleDressRepository.materialInit();

    this.oblecenieKategorieFilter.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        this.addArticleDressRepository.filterDressCategories(value);
      });
    this.oblecenieZnackaFilter.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        this.addArticleDressRepository.filterZnacka(value);
      });

    // this.formDress.on('change', function () {
    //   console.log('what happend');
    // });

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

    // this.changeStep(2);
  }

  changeStep(step: number | null = null) {
    // Mark fields as touched
    switch (this.formStep) {
      case 1:
        this.addOblecenieFormPopis.markAllAsTouched();
        break;
      case 2:
        this.addOblecenieFormZaradenie.markAllAsTouched();
        break;
    }

    if (step === null) {
      this.formStep++;
    } else {
      this.formStep = step;
    }

    // Login
    if (step === 3 && !this.identityService.isLogged) {
      this.dialog.open(LoginComponent, {
        width: GLOBAL.dialogWidth.sm,
      });
    }
  }

  uploadImagesComplete(e) {
    // Zachytavanie chyb sa deje automaticky
    /*if (e.event instanceof HttpResponse) {
      if (e.event.body.error) {
        this.flashmessage.error('common.response.code.15');
      } else if (e.event.body.success) {
      }
    }*/
  }

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
      header: 'component.article.add.categorize.kategoria',
      required: true,
      defaultValue: this.addOblecenieForm
        .get('zaradenie')
        .get('oblecenieKategoria').value,
      multiselect: false,
      checkType: SelectType.Radio,
      items: this.modalFilterService.transformItems<
        Kategorie,
        KategorieChildren
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
      .beforeClosed()
      .subscribe((value) => {
        if (value) {
          this.addOblecenieForm
            .get('zaradenie')
            .get('oblecenieKategoria')
            .setValue(value);
        }
      });
  }

  openZnackaFilterDialog() {
    const data: ModalFilterOptions = {
      header: 'component.article.add.categorize.znacka',
      required: true,
      multiselect: false,
      minSearchLength: 2,
      defaultValue: this.addOblecenieFormZaradenie.get('znacka').value,
      checkType: SelectType.Radio,
      items: this.modalFilterService.transformItems<
        DBSimpleEntity,
        DBSimpleEntity
      >(this.addArticleDressRepository.znacka, (item): MultiSelectOption => {
        return {
          id: item.id,
          label: item.nazov,
        };
      }),
    };

    this.dialog
      .open(ModalFilterComponent, {
        width: GLOBAL.dialogWidth.lg,
        data,
      })
      .beforeClosed()
      .subscribe((value) => {
        if (value) {
          this.addOblecenieFormZaradenie.get('znacka').setValue(value);
        }
      });
  }

  openMaterialFilterDialog() {
    const data: ModalFilterOptions = {
      header: 'component.article.add.categorize.material',
      required: true,
      defaultValue: this.addOblecenieFormZaradenie.get('material').value,
      items: this.modalFilterService.transformItems<
        DBSimpleEntity,
        DBSimpleEntity
      >(this.addArticleDressRepository.material, (item): MultiSelectOption => {
        return {
          id: item.id,
          label: item.nazov,
        };
      }),
    };

    this.dialog
      .open(ModalFilterComponent, {
        width: GLOBAL.dialogWidth.lg,
        data,
      })
      .beforeClosed()
      .subscribe((res) => {
        if (res) {
          const materialNames = this.addArticleDressRepository.material
            .filter((item) => includes(res, item.id))
            .map((item) => item.nazov);

          this.addOblecenieFormZaradenie.get('material').setValue(res);
          this.addOblecenieForm
            .get('zaradenie')
            .get('materialDisplay')
            .setValue(materialNames.join(', '));
        }
      });
  }

  debug() {
    console.log(this.addOblecenieForm);
  }
  loadForm() {
    this.addOblecenieForm.setValue(this.articleService.loadForm());
  }
}
