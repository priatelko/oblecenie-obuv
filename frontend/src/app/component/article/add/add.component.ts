import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  ArtikelTyp,
  Material,
  Znacka,
} from '../../../model/Entity/Article.entity';
import { ArticleRepositoryService } from '../../../model/Repository/Article.repository';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { LoaderSize } from '../../loader/loader.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalFilterComponent } from '../../modal-filter/modal-filter.component';
import { GLOBAL } from '../../../variables/global';
import {
  ModalFilterOptions,
  ModalFilterService,
} from '../../modal-filter/modal-filter.service';

import { MultiSelectOption, SelectOption } from '../../../custom/interfaces';
import { SelectType } from '../../../form-control/select/select.interface';
import { includes } from 'lodash';
import { AddArticleFormTypeService } from './form-type.service';
import { KategorieChildren, Kategorie } from '../../../model/Entity/Dress';
import { Validator } from '../../../custom/validator.custom';
import { HttpResponse } from '@angular/common/http';
import { FlashMessageService } from '../../../service/FlashMessage/flash-message.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddComponent implements OnInit, OnDestroy {
  articleKind = ArtikelTyp;
  loaderSize = LoaderSize;
  APIuploadImage = GLOBAL.APIuploadImage;

  SelectType = SelectType;

  formStep = 1;

  addOblecenieForm: FormGroup;

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

  get oblecenieKategorieFilter$() {
    return this.addArticleDressRepository.getDressCategoriesFilter();
  }
  get oblecenieZnackaFilter$() {
    return this.addArticleDressRepository.getZnackaFilter();
  }

  get isVelkostInvalid() {
    return Validator.isInvalid(
      this.addOblecenieForm.get('zaradenie').get('velkost') as FormGroup
    );
  }

  constructor(
    private addArticleDressRepository: ArticleRepositoryService,
    private dialog: MatDialog,
    private modalFilterService: ModalFilterService,
    private formType: AddArticleFormTypeService,
    private flashmessage: FlashMessageService
  ) {}

  trackByFn(index, item: Kategorie) {
    return item.item;
  }
  trackByIdFn(index, item: KategorieChildren) {
    return item.id;
  }

  ngOnInit() {
    this.addOblecenieForm = this.formType.getDress();

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

  ngOnDestroy() {}

  changeStep(step: number | null = null) {
    if (step === null) {
      this.formStep++;
    } else {
      this.formStep = step;
    }
  }

  uploadImagesComplete(e) {
    if (e.event instanceof HttpResponse) {
      if (e.event.body.error) {
        this.flashmessage.error('common.response.code.15');
      } else if (e.event.body.success) {
      }
    }
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
      defaultValue: this.addOblecenieForm.get('zaradenie').get('znacka').value,
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
      .beforeClosed()
      .subscribe((value) => {
        if (value) {
          this.addOblecenieForm.get('zaradenie').get('znacka').setValue(value);
        }
      });
  }

  openMaterialFilterDialog() {
    const data: ModalFilterOptions = {
      header: 'component.article.add.categorize.material',
      required: true,
      defaultValue: this.addOblecenieForm.get('zaradenie').get('material')
        .value,
      items: this.modalFilterService.transformItems<Material, Material>(
        this.addArticleDressRepository.material,
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
      .subscribe((res) => {
        if (res) {
          const materialNames = this.addArticleDressRepository.material
            .filter((item) => includes(res, item.id))
            .map((item) => item.nazov);

          this.addOblecenieForm.get('zaradenie').get('material').setValue(res);
          this.addOblecenieForm
            .get('zaradenie')
            .get('materialDisplay')
            .setValue(materialNames.join(', '));
        }
      });
  }
}
