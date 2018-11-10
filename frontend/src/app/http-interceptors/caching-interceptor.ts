import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler } from '@angular/common/http';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CacheMapService } from '../services/CacheMap/cache-map.service';

const CACHABLE_URL = '/api/get';

@Injectable({
  providedIn: 'root'
})
export class CachingInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];

  constructor(
    private _cache: CacheMapService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRequestCachable(req)) {
      return next.handle(req);
    }
    const cachedResponse = this._cache.get(req);
    if (cachedResponse !== null) {
      return of(cachedResponse);
    }

    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this._cache.put(req, event);
        }
      })
    );
  }

  private isRequestCachable(req: HttpRequest<any>) {
    return (req.method === 'GET') && (req.url.indexOf(CACHABLE_URL) > -1);
  }
}
