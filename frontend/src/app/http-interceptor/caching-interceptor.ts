import {Injectable} from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
} from '@angular/common/http';
import {of} from 'rxjs';
import {tap, finalize} from 'rxjs/operators';
import {CacheMapService} from '../service/CacheMap/cache-map.service';

@Injectable({
  providedIn: 'root',
})
export class CachingInterceptor implements HttpInterceptor {
  private requestOngoingMap = new Map<string, boolean>();

  constructor(private cacheService: CacheMapService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRequestCachable(req)) {
      const requestHash = req.urlWithParams + '__' + req.method;

      // ak prave prebieha request
      if (this.requestOngoingMap.get(requestHash) === true) {
        console.log('Request is already ongoing...');
        // posleme dalej prazdy request
        return of(new HttpResponse({body: ''}));
      } else {
        // ho ulozime do prebiehajucich requestov
        this.requestOngoingMap.set(requestHash, true);
      }

      return next.handle(req).pipe(
        finalize(() => {
          console.log('Request is finished');
          this.requestOngoingMap.delete(requestHash);
        })
      );
    }

    const cachedResponse = this.cacheService.get(req);
    if (cachedResponse !== null) {
      console.log('cached response', cachedResponse);

      return of(cachedResponse);
    }

    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.cacheService.put(req, event);
        }
      })
    );
  }

  private isRequestCachable(req: HttpRequest<any>) {
    return Boolean(req.headers.get('X-CACHABLE'));
  }
}
