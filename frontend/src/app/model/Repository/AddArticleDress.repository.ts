import { Injectable } from '@angular/core';

import { ApiRequestService } from '../../service/ApiRequest/api-request.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, share } from 'rxjs/operators';
import {
  BaseRepositoryService,
  BaseRepositoryInterface,
} from './Base.repository';
import { AddArticleDressEntity } from '../Entity/AddArticleDress.entity';
import { SelectService } from 'src/app/form-control/select/select.service';
import { PreKoho, Obdobie, Znacka, Stav } from '../Entity/Article.entity';
import FuzzySearch from 'fuzzy-search';
import { assign } from 'lodash';
import { appendNoDiacritics } from 'src/app/custom/helpers';
import {
  Kategorie,
  Prilezitost,
  Zostrih,
  Velkost,
  Styl,
  KategorieChildren,
  Zapinanie,
} from '../Entity/Dress';

@Injectable({
  providedIn: 'root',
})
export class AddArticleDressRepositoryService
  extends BaseRepositoryService<AddArticleDressEntity>
  implements BaseRepositoryInterface<AddArticleDressEntity> {
  dataStream: Observable<AddArticleDressEntity>;
  API = '/get/add-dress-article';
  dataStreamFinal: Observable<AddArticleDressEntity>;

  private oblecenieCategories$: Observable<Kategorie[]>;
  private oblecenieCategoriesFilter$ = new BehaviorSubject<Kategorie[]>([]);
  oblecenieCategories: Kategorie[];

  private znacka$: Observable<Znacka[]>;
  private znackaFilter$ = new BehaviorSubject<Znacka[]>([]);
  znacka: Znacka[];

  constructor(
    private apiRequestService: ApiRequestService,
    private selectService: SelectService
  ) {
    super();
    this.getApi();
  }

  findAll() {
    this.dataStream = this.apiRequestService
      .get<AddArticleDressEntity>(this.API)
      .pipe(map((d) => d.data as AddArticleDressEntity));
    return this;
  }

  result(): Observable<AddArticleDressEntity> {
    return this.dataStream;
  }

  private getApi() {
    this.dataStreamFinal = this.findAll().result();
  }

  getPreKohoOptions() {
    return this.selectService.mapToOptions<PreKoho>(
      this.dataStreamFinal.pipe(map((res) => res.preKoho))
    );
  }

  getObdobieOptions() {
    return this.selectService.mapToOptions<Obdobie>(
      this.dataStreamFinal.pipe(map((res) => res.obdobie))
    );
  }

  getPrilezitostOptions() {
    return this.selectService.mapToOptions<Prilezitost>(
      this.dataStreamFinal.pipe(map((res) => res.prilezitost))
    );
  }

  getZapinanieOptions() {
    return this.selectService.mapToOptions<Zapinanie>(
      this.dataStreamFinal.pipe(map((res) => res.zapinanie))
    );
  }

  getStavOptions() {
    return this.selectService.mapToOptions<Stav>(
      this.dataStreamFinal.pipe(map((res) => res.stav))
    );
  }

  getZostrihOptions() {
    return this.selectService.mapToOptions<Zostrih>(
      this.dataStreamFinal.pipe(map((res) => res.zostrih))
    );
  }

  getVelkostOptions() {
    return this.selectService.mapToOptions<Velkost>(
      this.dataStreamFinal.pipe(map((res) => res.velkost))
    );
  }

  getStylOptions() {
    return this.selectService.mapToOptions<Styl>(
      this.dataStreamFinal.pipe(map((res) => res.styl))
    );
  }

  dressCategoriesInit() {
    this.oblecenieCategories$ = this.dataStreamFinal.pipe(
      map((res) => res.kategorie)
    );

    this.oblecenieCategories$.pipe(share()).subscribe((res) => {
      this.oblecenieCategories = appendNoDiacritics(res, 'nazov');
      this.oblecenieCategoriesFilter$.next(res);
    });
  }
  getDressCategoriesFilter() {
    return this.oblecenieCategoriesFilter$.asObservable();
  }
  filterDressCategories(string: string) {
    if (string.length < 3) {
      this.oblecenieCategoriesFilter$.next(this.oblecenieCategories);
      return;
    }

    let newTree: Kategorie[] = [];
    this.oblecenieCategories.forEach((rootCategory) => {
      const searcher = new FuzzySearch(rootCategory.children, ['noDiaNode']);
      const result: KategorieChildren[] = searcher.search(string);
      if (result.length) {
        const newRoot = assign([], rootCategory);
        newRoot.children = result;
        newTree = [...newTree, newRoot];
      }
    });

    this.oblecenieCategoriesFilter$.next(newTree);
  }

  znackaInit() {
    this.znacka$ = this.dataStreamFinal.pipe(map((res) => res.znacka));

    this.znacka$.pipe(share()).subscribe((res) => {
      this.znacka = appendNoDiacritics(res, 'nazov');
      this.znackaFilter$.next(res);
    });
  }
  getZnackaFilter() {
    return this.znackaFilter$.asObservable();
  }
  filterZnacka(string: string) {
    if (string.length < 2) {
      this.znackaFilter$.next(this.znacka);
      return;
    }

    const searcher = new FuzzySearch(this.znacka, ['noDiaNode']);
    const result: KategorieChildren[] = searcher.search(string);

    this.znackaFilter$.next(result);
  }
}
