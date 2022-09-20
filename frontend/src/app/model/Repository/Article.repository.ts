import { Injectable } from '@angular/core';

import { ApiRequestService } from '../../service/ApiRequest/api-request.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, share } from 'rxjs/operators';
import {
  BaseRepositoryService,
  BaseRepositoryInterface,
} from './Base.repository';
import { SelectService } from '../../form-control/select/select.service';
import FuzzySearch from 'fuzzy-search';
import { assign } from 'lodash';
import { appendNoDiacritics } from '../../custom/helpers';
import { DressResponseEntity } from '../Entity/DressForm.entity';
import {
  DBSimpleEntity,
  Categories,
  CategoriesChildren,
} from '../Entity/Form.entity';

@Injectable({
  providedIn: 'root',
})
export class ArticleRepositoryService
  extends BaseRepositoryService<DressResponseEntity>
  implements BaseRepositoryInterface<DressResponseEntity>
{
  dataStream: Observable<DressResponseEntity>;
  API = '/get/add-dress-article';
  dataStreamFinal: Observable<DressResponseEntity>;

  private oblecenieCategories$: Observable<Categories[]>;
  private oblecenieCategoriesFilter$ = new BehaviorSubject<Categories[]>([]);
  oblecenieCategories: Categories[];

  private brand$: Observable<DBSimpleEntity[]>;
  private brandFilter$ = new BehaviorSubject<DBSimpleEntity[]>([]);
  brand: DBSimpleEntity[];

  private material$: Observable<DBSimpleEntity[]>;
  private materialFilter$ = new BehaviorSubject<DBSimpleEntity[]>([]);
  material: DBSimpleEntity[];

  constructor(
    private apiRequestService: ApiRequestService,
    private selectService: SelectService
  ) {
    super();
    this.getApi();
  }

  findAll() {
    this.dataStream = this.apiRequestService
      .get<DressResponseEntity>(this.API)
      .pipe(map((d) => d.data as DressResponseEntity));
    return this;
  }

  result(): Observable<DressResponseEntity> {
    return this.dataStream;
  }

  private getApi() {
    this.dataStreamFinal = this.findAll().result();
  }

  getWhomOptions() {
    return this.selectService.mapToOptions<DBSimpleEntity>(
      this.dataStreamFinal.pipe(map((res) => res.whom))
    );
  }

  getSeasonOptions() {
    return this.selectService.mapToOptions<DBSimpleEntity>(
      this.dataStreamFinal.pipe(map((res) => res.season))
    );
  }

  getOccasionOptions() {
    return this.selectService.mapToOptions<DBSimpleEntity>(
      this.dataStreamFinal.pipe(map((res) => res.occasion))
    );
  }

  getFasteningOptions() {
    return this.selectService.mapToOptions<DBSimpleEntity>(
      this.dataStreamFinal.pipe(map((res) => res.fastening))
    );
  }

  getStateOptions() {
    return this.selectService.mapToOptions<DBSimpleEntity>(
      this.dataStreamFinal.pipe(map((res) => res.state))
    );
  }

  getCutOptions() {
    return this.selectService.mapToOptions<DBSimpleEntity>(
      this.dataStreamFinal.pipe(map((res) => res.cut))
    );
  }

  getSizeOptions() {
    return this.selectService.mapToOptions<DBSimpleEntity>(
      this.dataStreamFinal.pipe(map((res) => res.size))
    );
  }

  getStyleOptions() {
    return this.selectService.mapToOptions<DBSimpleEntity>(
      this.dataStreamFinal.pipe(map((res) => res.style))
    );
  }

  dressCategoriesInit() {
    this.oblecenieCategories$ = this.dataStreamFinal.pipe(
      map((res) => res.categories)
    );

    this.oblecenieCategories$.pipe(share()).subscribe((res) => {
      this.oblecenieCategories = appendNoDiacritics(res, 'title');
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

    let newTree: Categories[] = [];
    this.oblecenieCategories.forEach((rootCategory) => {
      const searcher = new FuzzySearch(rootCategory.children, ['noDiaNode']);
      const result: CategoriesChildren[] = searcher.search(string);
      if (result.length) {
        const newRoot = assign([], rootCategory);
        newRoot.children = result;
        newTree = [...newTree, newRoot];
      }
    });

    this.oblecenieCategoriesFilter$.next(newTree);
  }

  brandInit() {
    this.brand$ = this.dataStreamFinal.pipe(map((res) => res.brand));

    this.brand$.pipe(share()).subscribe((res) => {
      this.brand = appendNoDiacritics(res, 'title');
      this.brandFilter$.next(res);
    });
  }
  getBrandFilter() {
    return this.brandFilter$.asObservable();
  }
  filterBrand(string: string) {
    if (string.length < 2) {
      this.brandFilter$.next(this.brand);
      return;
    }

    const searcher = new FuzzySearch(this.brand, ['noDiaNode']);
    const result: CategoriesChildren[] = searcher.search(string);

    this.brandFilter$.next(result);
  }

  materialInit() {
    this.material$ = this.dataStreamFinal.pipe(map((res) => res.material));

    this.material$.pipe(share()).subscribe((res) => {
      this.material = appendNoDiacritics(res, 'title');
      this.materialFilter$.next(res);
    });
  }
}
