import {Injectable} from '@angular/core';
import {HttpRequest, HttpResponse} from '@angular/common/http';
import {Cache} from './cache';
import {
  CacheEntry,
  MAX_CACHE_AGE,
  LOCALSTORE_CACHED_REQUEST_KEY,
} from './cache-entry';
import {forEach} from 'lodash';

@Injectable()
export class CacheMapService implements Cache {
  cacheMap = new Map<string, CacheEntry>();

  get(req: HttpRequest<any>): HttpResponse<any> | null {
    const entry = this.cacheMap.get(req.urlWithParams);
    if (!entry) {
      return null;
    }
    const isExpired = Date.now() - entry.entryTime > MAX_CACHE_AGE;
    return isExpired ? null : entry.response;
  }
  put(req: HttpRequest<any>, res: HttpResponse<any>): void {
    const entry: CacheEntry = {
      url: req.urlWithParams,
      response: res,
      entryTime: Date.now(),
    };
    this.cacheMap.set(req.urlWithParams, entry);

    this.setToStorage(req.urlWithParams, res.body);
    this.deleteExpiredCache();
  }
  private deleteExpiredCache() {
    this.cacheMap.forEach(entry => {
      if (Date.now() - entry.entryTime > MAX_CACHE_AGE) {
        this.cacheMap.delete(entry.url);
      }
    });
  }

  /**
   * Local storage requests
   */
  // parseFromCache() {
  //   forEach(this.getParsedCachedStorage(), (item, key) => {
  //     this.cacheMap.set(key, JSON.parse(item));
  //   });
  // }

  setToStorage(key: string, data) {
    const cachedStorageReq = this.getParsedCachedStorage();
    cachedStorageReq[key] = JSON.stringify(data);

    localStorage.setItem(
      LOCALSTORE_CACHED_REQUEST_KEY,
      JSON.stringify(cachedStorageReq)
    );
  }

  getCachedResponse(key) {
    const parsedStorage = this.getParsedCachedStorage();
    if (parsedStorage[key]) {
      return JSON.parse(parsedStorage[key]);
    }
    return false;
  }

  getParsedCachedStorage() {
    return (
      JSON.parse(localStorage.getItem(LOCALSTORE_CACHED_REQUEST_KEY)) || {}
    );
  }
}
