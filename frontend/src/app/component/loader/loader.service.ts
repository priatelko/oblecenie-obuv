import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private overlayLoader$ = new BehaviorSubject<boolean>(false);

  overlayLoaderOn() {
    this.overlayLoader$.next(true);
  }

  overlayLoaderOff() {
    this.overlayLoader$.next(false);
  }

  overlayLoaderValue() {
    return this.overlayLoader$.getValue();
  }
}
