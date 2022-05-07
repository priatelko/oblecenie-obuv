import { HttpEventType } from '@angular/common/http';
import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  AfterContentInit,
  Injector,
} from '@angular/core';
import { LogService } from '../../service/Admin/log.service';
import { FlashMessageService } from '../../service/FlashMessage/flash-message.service';
import {
  ControlValueAccessor,
  FormControl,
  NgControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { ApiRequestService } from '../../service/ApiRequest/api-request.service';
import { ApiResponseModel } from '../../model/Model/ApiResponse.model';
import { ImageEntity } from 'src/app/model/Entity/ArticleForm.entity';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { IdentityService } from 'src/app/service/User/identity.service';
import * as _ from 'lodash';

interface DndFile extends File {
  progress: number;
  imgPath: SafeUrl;
}

@Component({
  selector: 'app-dnd',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DndComponent,
      multi: true,
    },
  ],
  templateUrl: './dnd.component.html',
  styleUrls: ['./dnd.component.scss'],
})
export class DndComponent implements AfterContentInit, ControlValueAccessor {
  @ViewChild('fileDropRef', { static: false }) fileDropEl: ElementRef;

  @Input() limit: number;

  formControlRef: FormControl = new FormControl();

  files: DndFile[] = [];
  disabled: boolean;
  removingValidationError = false;

  constructor(
    private flashmessage: FlashMessageService,
    private debug: LogService,
    private injector: Injector,
    private apiRequestService: ApiRequestService,
    private domSanitizer: DomSanitizer,
    private identityService: IdentityService
  ) {}

  ngAfterContentInit() {
    const ngControl: NgControl = this.injector.get(NgControl, null);

    if (ngControl) {
      this.formControlRef = ngControl.control as FormControl;
    }
  }

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
    this.prepareFilesList(files.files);
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
    if (this.formControlRef) {
      this.formControlRef.updateValueAndValidity();
    }
    this.cleanFiles();
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: DndFile[]) {
    // remove possibly dump node
    this.cleanFiles();

    for (const item of files) {
      // Over limit
      if (this.files.length + 1 > this.limit) {
        this.files.push(null);
        // after 3sec remove null node, so error
        if (!this.removingValidationError) {
          this.removingValidationError = true;
          setTimeout(() => {
            this.cleanFiles();
            this.removingValidationError = false;
          }, 3000);
        }
      } else {
        this.files.push(item);

        item.progress = 0;

        const formData: any = new FormData();
        // formData.append("name", name);
        formData.append('file', item);

        // TODO: zmenit `any` za model co sa vrati
        this.apiRequestService
          .postEvents<ImageEntity>('/upload-image', formData)
          .subscribe((data: ApiResponseModel<ImageEntity>) => {
            switch (data.event.type) {
              case HttpEventType.UploadProgress:
                const eventTotal = data.event.total ? data.event.total : 0;
                item.progress = Math.round(
                  (data.event.loaded / eventTotal) * 100
                );
                break;
              case HttpEventType.Response:
                item.imgPath = this.domSanitizer.bypassSecurityTrustUrl(
                  environment.urlBe + data.data.imgPath
                );
                this.debug.log('Image Upload Successfully!', data);
            }
          });
      }
    }

    //this.formControlRef.updateValueAndValidity();

    this.CVA_ON_TOUCHED();
    this.CVA_ON_CHANGE(this.files);

    this.writeValue(this.files);
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

  cleanFiles() {
    this.files = _.reduce(
      this.files,
      (result, value) => {
        if (value !== null) {
          result.push(value);
        }
        return result;
      },
      []
    );

    this.formControlRef.setValue(this.files);
  }

  // CVA
  CVA_ON_CHANGE = (files: DndFile[]) => {};
  CVA_ON_TOUCHED = () => {};

  writeValue(files: DndFile[]): void {
    this.files = files || [];
  }

  registerOnChange(fn: (files: DndFile[]) => void): void {
    this.CVA_ON_CHANGE = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.CVA_ON_TOUCHED = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
