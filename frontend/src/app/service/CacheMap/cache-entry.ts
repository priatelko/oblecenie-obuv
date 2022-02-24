import { HttpResponse } from '@angular/common/http';

export interface CacheEntry {
  url: string;
  response: HttpResponse<any>;
  entryTime: number;
}

export const MAX_CACHE_AGE = 6 * 60 * 60 * 1000; // in milliseconds - 6hod
export const LOCALSTORE_CACHED_REQUEST_KEY = 'cachedStorageReq';
