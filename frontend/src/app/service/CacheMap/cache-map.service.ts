import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Cache } from './cache';
import {
  CacheEntry,
  MAX_CACHE_AGE,
  LOCALSTORE_CACHED_REQUEST_KEY,
} from './cache-entry';

@Injectable()
export class CacheMapService implements Cache {
  get(req: HttpRequest<any>): HttpResponse<any> | null {
    const storage = this.getStorageMap();
    const entry = storage.get(req.urlWithParams);

    if (!entry) {
      return null;
    }

    const isExpired = Date.now() - entry.entryTime > MAX_CACHE_AGE;
    return isExpired
      ? null
      : new HttpResponse({
          body: entry.response,
        });
  }
  put(req: HttpRequest<any>, res: HttpResponse<any>): void {
    const entry: CacheEntry = {
      url: req.urlWithParams,
      response: res.body,
      entryTime: Date.now(),
    };

    this.setKeyToLocalStorage(req.urlWithParams, entry);
    this.deleteExpiredCache();
  }

  private deleteExpiredCache() {
    const storage = this.getStorageMap();
    storage.forEach((entry) => {
      if (Date.now() - entry.entryTime > MAX_CACHE_AGE) {
        storage.delete(entry.url);
      }
    });
    this.saveStorageMap(storage);
  }

  /**
   * Local storage
   */
  setKeyToLocalStorage(key, data) {
    const storage = this.getStorageMap();
    storage.set(key, data);

    this.saveStorageMap(storage);
  }

  getKeyFromLocalStore(key) {
    const parsedStorage = this.getStorageMap();
    if (parsedStorage[key]) {
      return JSON.parse(parsedStorage[key]);
    }
    return false;
  }

  getStorageMap(): Map<string, CacheEntry> {
    return new Map(
      JSON.parse(localStorage.getItem(LOCALSTORE_CACHED_REQUEST_KEY))
    );
  }
  saveStorageMap(map: Map<string, CacheEntry>) {
    localStorage.setItem(
      LOCALSTORE_CACHED_REQUEST_KEY,
      JSON.stringify(Array.from(map.entries()))
    );
  }
}
