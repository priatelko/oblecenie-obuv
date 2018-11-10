import { Directive, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { PostRequestService } from '../services/PostRequest/post-request.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appLoading]'
})
export class LoadingDirective implements OnInit, OnDestroy {

  private postInprogressSubject: Subscription;

  constructor(
    private el: ElementRef,
    private _postRequestService: PostRequestService
    ) {}

  ngOnInit() {
    this.postInprogressSubject = this._postRequestService.postInProgress$.subscribe((res) => {
      if (res) {
        this.el.nativeElement.setAttribute('disabled', 'disabled');
      } else {
        this.el.nativeElement.removeAttribute('disabled');
      }
    });
  }

  ngOnDestroy() {
    this.postInprogressSubject.unsubscribe();
  }

}
