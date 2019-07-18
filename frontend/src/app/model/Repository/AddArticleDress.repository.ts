import {Injectable} from '@angular/core';

import {ApiRequestService} from '../../service/ApiRequest/api-request.service';
import {Observable, BehaviorSubject} from 'rxjs';
import {map, share} from 'rxjs/operators';
import {
  BaseRepositoryService,
  BaseRepositoryInterface,
} from './Base.repository';
import {
  AddArticleDressEntity,
  OblecenieKategorie,
  OblecenieKategorieChildren,
} from '../Entity/AddArticleDress.entity';
import {SelectService} from 'src/app/form-control/select/select.service';
import {PreKoho, Obdobie} from '../Entity/Article.entity';
import FuzzySearch from 'fuzzy-search';
import {assign} from 'lodash';
import {appendNoDiacritics} from 'src/app/custom/helpers';

@Injectable({
  providedIn: 'root',
})
export class AddArticleDressRepositoryService
  extends BaseRepositoryService<AddArticleDressEntity>
  implements BaseRepositoryInterface<AddArticleDressEntity> {
  dataStream: Observable<AddArticleDressEntity>;
  API = '/get/add-dress-article';
  dataStreamFinal: Observable<AddArticleDressEntity>;

  private oblecenieCategories$: Observable<OblecenieKategorie[]>;
  private oblecenieCategoriesFilter$ = new BehaviorSubject<
    OblecenieKategorie[]
  >([]);
  oblecenieCategories: OblecenieKategorie[];

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
      .pipe(map(d => d.data as AddArticleDressEntity));

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
      this.dataStreamFinal.pipe(map(res => res.preKoho))
    );
  }

  getObdobieOptions() {
    return this.selectService.mapToOptions<Obdobie>(
      this.dataStreamFinal.pipe(map(res => res.obdobie))
    );
  }

  dressCategoriesInit() {
    this.oblecenieCategories$ = this.dataStreamFinal.pipe(
      map(res => res.kategorie)
    );

    this.oblecenieCategories$.pipe(share()).subscribe(res => {
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

    let newTree: OblecenieKategorie[] = [];
    this.oblecenieCategories.forEach(rootCategory => {
      const searcher = new FuzzySearch(rootCategory.children, ['noDiaNode']);
      const result: OblecenieKategorieChildren[] = searcher.search(string);
      if (result.length) {
        const newRoot = assign([], rootCategory);
        newRoot.children = result;
        newTree = [...newTree, newRoot];
      }
    });

    this.oblecenieCategoriesFilter$.next(newTree);
  }
}
