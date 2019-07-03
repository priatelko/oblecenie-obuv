import {Injectable} from '@angular/core';

import {ApiRequestService} from '../../service/ApiRequest/api-request.service';
import {Observable, BehaviorSubject} from 'rxjs';
import {map, share, first} from 'rxjs/operators';
import {
  BaseRepositoryService,
  BaseRepositoryInterface,
} from './Base.repository';
import {
  AddArticleDressEntity,
  OblecenieKategorie,
  OblecenieKategorieChildren,
} from '../Entity/AddArticleDress.entity';
import {ToggleGroupService} from 'src/app/form-control/toggle-group/toggle-group.service';
import {PreKoho, Obdobie} from '../Entity/Article.entity';
import FuzzySearch from 'fuzzy-search';
import {assign, deburr} from 'lodash';

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
    private toggleGroupService: ToggleGroupService
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
    return this.toggleGroupService.mapToOptions<PreKoho>(
      this.dataStreamFinal.pipe(map(res => res.preKoho))
    );
  }

  getObdobieOptions() {
    return this.toggleGroupService.mapToOptions<Obdobie>(
      this.dataStreamFinal.pipe(map(res => res.obdobie))
    );
  }

  dressCategoriesInit() {
    this.oblecenieCategories$ = this.dataStreamFinal.pipe(
      map(res => res.kategorie)
    );

    this.oblecenieCategories$.pipe(share()).subscribe(res => {
      this.oblecenieCategories = this.appendNoDiacriticsCategories(res);
      this.oblecenieCategoriesFilter$.next(res);
    });
  }

  private appendNoDiacriticsCategories(
    categories: OblecenieKategorie[]
  ): OblecenieKategorie[] {
    categories.forEach(rootCategory => {
      rootCategory.children.forEach(child => {
        child.nazovNoDia = deburr(child.nazov);
      });
    });

    return categories;
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
      const searcher = new FuzzySearch(rootCategory.children, ['nazovNoDia']);
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
