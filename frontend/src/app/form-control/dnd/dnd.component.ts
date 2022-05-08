import { HttpEventType } from '@angular/common/http';
import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  AfterContentInit,
  Injector,
  OnInit,
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
import * as _ from 'lodash';
import { enumImageContext, enumSize } from '../../model/Model/Appearance';
import { translate, validFields } from '../../custom/helpers';

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
export class DndComponent
  implements OnInit, AfterContentInit, ControlValueAccessor
{
  @ViewChild('fileDropRef', { static: false }) fileDropEl: ElementRef;

  @Input() multiple = true;
  @Input() limit: number;
  @Input() size: enumSize;
  @Input() context: enumImageContext;

  formControlRef: FormControl = new FormControl();
  limitErrorText = '';

  files: DndFile[] = [];
  disabled: boolean;
  removingValidationError = false;

  enumSize = enumSize;

  // default
  sizeClasses = {
    iconUpload: 'mat-icon--hg',
    title: 'h3',
  };

  constructor(
    private flashmessage: FlashMessageService,
    private debug: LogService,
    private injector: Injector,
    private apiRequestService: ApiRequestService,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    // Size classes
    if (this.size === enumSize.sm) {
      this.sizeClasses.iconUpload = 'mat-icon--lg';
      this.sizeClasses.title = 'h4 m-0';
    }
  }

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
    // Required Inputs
    if (!validFields(this.limit, this.context)) {
      return;
    }

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
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: DndFile[]) {
    // Over limit
    if (this.files.length + files.length > this.limit) {
      this.invalidateLimit();
      return;
    }
    for (const item of files) {
      this.files.push(item);

      item.progress = 0;

      const formData: any = new FormData();
      formData.append('context', this.context);
      formData.append('file', item);

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

  private invalidateLimit() {
    this.limitErrorText = translate('common.form.error.maxlength').replace(
      '%length',
      this.limit
    );
    setTimeout(() => {
      this.limitErrorText = null;
    }, 5000);
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
