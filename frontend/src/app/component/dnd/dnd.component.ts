import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
} from '@angular/common/http';
import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GLOBAL } from '../../variables/global';
import { LogService } from '../../service/Admin/log.service';
import { FlashMessageService } from '../../service/FlashMessage/flash-message.service';

@Component({
  selector: 'app-dnd',
  templateUrl: './dnd.component.html',
  styleUrls: ['./dnd.component.scss'],
})
export class DndComponent {
  @ViewChild('fileDropRef', { static: false }) fileDropEl: ElementRef;

  @Input() httpUrl: string;

  files: any[] = [];

  constructor(
    private http: HttpClient,
    private flashmessage: FlashMessageService,
    private debug: LogService
  ) {}

  /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    if (this.files[index].progress < 100) {
      this.flashmessage.info('common.response.code.-1');
      this.debug.log('Upload in progress.');
      return;
    }
    this.files.splice(index, 1);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);

      var formData: any = new FormData();
      // formData.append("name", name);
      formData.append('file', item);

      this.http
        .post(GLOBAL.url + this.httpUrl, formData, {
          reportProgress: true,
          observe: 'events',
        })
        .pipe(
          catchError((error: HttpErrorResponse) => {
            let errorMessage = '';
            if (error.error instanceof ErrorEvent) {
              // Get client-side error
              errorMessage = error.error.message;
            } else {
              // Get server-side error
              errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
              this.flashmessage.error('common.response.code.1');
            }
            this.debug.log(errorMessage);
            return throwError(errorMessage);
          })
        )
        .subscribe((event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              this.debug.log('Request has been made!');
              break;
            case HttpEventType.ResponseHeader:
              this.debug.log('Response header has been received!');
              break;
            case HttpEventType.UploadProgress:
              const eventTotal = event.total ? event.total : 0;
              item.progress = Math.round((event.loaded / eventTotal) * 100);
              this.debug.log(`Uploaded! ${item.progress}%`);
              break;
            case HttpEventType.Response:
              this.debug.log('Image Upload Successfully!', event.body);
            /*setTimeout(() => {
                item.progress = 0;
              }, 1500);*/
          }
        });
    }
    this.fileDropEl.nativeElement.value = '';
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}
