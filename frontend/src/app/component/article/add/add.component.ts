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
  Categories,
  CategoriesChildren,
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
import { pairwise, startWith } from 'rxjs/operators';

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
  addOblecenieFormZaradenieSize: FormGroup;

  whom$: Observable<MultiSelectOption[]>;
  season$: Observable<MultiSelectOption[]>;
  style$: Observable<MultiSelectOption[]>;
  brand$: Observable<MultiSelectOption[]>;
  occasion$: Observable<MultiSelectOption[]>;
  fastening$: Observable<MultiSelectOption[]>;
  state$: Observable<MultiSelectOption[]>;
  cut$: Observable<SelectOption[]>;
  size$: Observable<SelectOption[]>;

  @Input() addKind: ArtikelTyp;

  // Dress
  oblecenieCategoriesFilter: FormControl = new FormControl();
  oblecenieBrandFilter: FormControl = new FormControl();

  dndLimit = this.identityService.limit.ArticleImageUpload;

  get oblecenieCategoriesFilter$() {
    return this.addArticleDressRepository.getDressCategoriesFilter();
  }
  get oblecenieBrandFilter$() {
    return this.addArticleDressRepository.getBrandFilter();
  }

  get isSizeInvalid() {
    return Validator.isInvalid(
      this.addOblecenieFormZaradenie.get('size') as FormGroup
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

  trackByFn(index, item: Categories) {
    return item.item;
  }
  // trackByIdFn(index, item: CategoriesChildren) {
  //   return item.id;
  // }
  trackByIdFn: TrackByFunction<any> = (index: number, item: any) => item.id;

  ngOnInit() {
    this.addOblecenieForm = this.formType.getDress();
    this.addOblecenieFormPopis = this.addOblecenieForm.get(
      'description'
    ) as FormGroup;
    this.addOblecenieFormZaradenie = this.addOblecenieForm.get(
      'categorize'
    ) as FormGroup;
    this.addOblecenieFormZaradenieSize = this.addOblecenieFormZaradenie.get(
      'size'
    ) as FormGroup;

    this.whom$ = this.addArticleDressRepository.getWhomOptions();
    this.season$ = this.addArticleDressRepository.getSeasonOptions();
    this.style$ = this.addArticleDressRepository.getStyleOptions();
    this.occasion$ = this.addArticleDressRepository.getOccasionOptions();
    this.fastening$ = this.addArticleDressRepository.getFasteningOptions();
    this.state$ = this.addArticleDressRepository.getStateOptions();
    this.cut$ = this.addArticleDressRepository.getCutOptions();
    this.size$ = this.addArticleDressRepository.getSizeOptions();
    this.addArticleDressRepository.dressCategoriesInit();
    this.addArticleDressRepository.brandInit();
    this.addArticleDressRepository.materialInit();

    // Not used now
    // this.oblecenieCategoriesFilter.valueChanges
    //   .pipe(untilDestroyed(this))
    //   .subscribe((value) => {
    //     console.log('category filter');

    //     this.addArticleDressRepository.filterDressCategories(value);
    //   });
    // this.oblecenieBrandFilter.valueChanges
    //   .pipe(untilDestroyed(this))
    //   .subscribe((value) => {
    //     this.addArticleDressRepository.filterBrand(value);
    //   });
    // end not used

    // Velkost, disable jedno alebo druhe, ak je vyplnene uz
    this.addOblecenieFormZaradenieSize.valueChanges
      .pipe(startWith({ size: null, sizeNum: null }), pairwise())
      .subscribe(([prev, next]) => {
        if (prev.size === next.size && prev.sizeNum === next.sizeNum) {
          return;
        }
        if (next.size) {
          this.addOblecenieFormZaradenie.get('size').get('sizeNum').disable();
        } else {
          this.addOblecenieFormZaradenie.get('size').get('sizeNum').enable();
        }
        if (next.sizeNum) {
          this.addOblecenieFormZaradenie.get('size').get('size').disable();
        } else {
          this.addOblecenieFormZaradenie.get('size').get('size').enable();
        }
      });

    // this.formDress.on('change', function () {
    //   console.log('what happend');
    // });

    // chooseKind(kind: ArtikelTyp) {
    //   this.chosenKind = kind;
    //   this.addOblecenieForm.get('type').patchValue(kind);
    // }

    // setTimeout(() => {
    //   this.addOblecenieForm.get('material').setValue('niexo');

    //   this.oblecenieCategoriesFilter$.subscribe(res => {
    //     console.log(res);

    //     this.addOblecenieForm.get('dressCategory').setValue(8);
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
      header: 'component.article.add.categorize.category',
      required: true,
      defaultValue: this.addOblecenieFormZaradenie.get('dressCategory').value,
      multiselect: false,
      checkType: SelectType.Radio,
      items: this.modalFilterService.transformItems<
        Categories,
        CategoriesChildren
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
            label: item.title,
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
          this.addOblecenieFormZaradenie.get('dressCategory').setValue(value);
        }
      });
  }

  openBrandFilterDialog() {
    const data: ModalFilterOptions = {
      header: 'component.article.add.categorize.brand',
      required: true,
      multiselect: false,
      minSearchLength: 2,
      defaultValue: this.addOblecenieFormZaradenie.get('brand').value,
      checkType: SelectType.Radio,
      items: this.modalFilterService.transformItems<
        DBSimpleEntity,
        DBSimpleEntity
      >(this.addArticleDressRepository.brand, (item): MultiSelectOption => {
        return {
          id: item.id,
          label: item.title,
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
          this.addOblecenieFormZaradenie.get('brand').setValue(value);
        }
      });
  }

  openMaterialFilterDialog() {
    const data: ModalFilterOptions = {
      header: 'component.article.add.categorize.material',
      required: false,
      defaultValue: this.addOblecenieFormZaradenie.get('material').value,
      items: this.modalFilterService.transformItems<
        DBSimpleEntity,
        DBSimpleEntity
      >(this.addArticleDressRepository.material, (item): MultiSelectOption => {
        return {
          id: item.id,
          label: item.title,
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
            .map((item) => item.title);

          this.addOblecenieFormZaradenie.get('material').setValue(res);
          this.addOblecenieFormZaradenie
            .get('materialDisplay')
            .setValue(materialNames.join(', '));
        }
      });
  }

  debug() {
    console.log(this.addOblecenieForm);
  }
  loadForm() {
    this.articleService.loadForm(this.addOblecenieForm);
  }
}
