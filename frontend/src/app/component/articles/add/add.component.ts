import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {ToggleOption} from 'src/app/form-control/toggle-group/toggle-group.interface';
import {ArtikelTyp} from '../../../model/Entity/Article.entity';
import {AddArticleDressRepositoryService} from '../../../model/Repository/AddArticleDress.repository';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit, OnDestroy {
  articleKind = ArtikelTyp;

  addOblecenieForm: FormGroup;

  preKoho$: Observable<ToggleOption[]>;
  obdobie$: Observable<ToggleOption[]>;

  @Input() addKind: ArtikelTyp;

  // Dress
  oblecenieKategorieFilter: FormControl = new FormControl();

  get oblecenieKategorieFilter$() {
    return this.addArticleDressRepository.getDressCategoriesFilter();
  }

  constructor(
    private addArticleDressRepository: AddArticleDressRepositoryService,
    protected activatedRoute: ActivatedRoute
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
    this.addArticleDressRepository.getDressCategoriesInit();

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
}
