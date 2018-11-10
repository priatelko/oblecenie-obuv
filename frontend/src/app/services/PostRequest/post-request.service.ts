import { Injectable, OnDestroy } from '@angular/core';
import { Http, RequestOptionsArgs } from '@angular/http';
import { map, take, share } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostRequestService implements OnDestroy {

  private postInProgress: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public postInProgress$ = this.postInProgress.asObservable();
  postObservable;

  constructor(
    private _http: Http,
  ) {}

  post(url, data/*, subscribe: Function*/) {
    const headers = <RequestOptionsArgs>new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

    this.postInProgress.next(true);

    const result = this._http.post(url, JSON.stringify(data), headers).
    pipe(
      map(res => res.json()),
      share()
    );

    result.subscribe((res) => {
      this.postInProgress.next(false);
      console.log('Posting...');
    }, (err) => {
      console.error('There was an error: ' + err);
    });

    return result;
  }

  ngOnDestroy() {
    console.log('unsubscribe post...');

    this.postObservable.unsubscribe().unsubscribe();
  }
}
