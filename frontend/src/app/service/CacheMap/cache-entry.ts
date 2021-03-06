import {HttpResponse} from '@angular/common/http';

export interface CacheEntry {
  url: string;
  response: HttpResponse<any>;
  entryTime: number;
}

export const MAX_CACHE_AGE = 10 * 60 * 1000; // in milliseconds - 10min
export const LOCALSTORE_CACHED_REQUEST_KEY = 'cachedStorageReq';
