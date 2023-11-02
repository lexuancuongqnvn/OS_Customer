import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnInit, Optional, Output } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { AppConsts } from 'src/app/app-consts.component';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { ApiBase, API_BASE_URL, FileManagerService } from 'src/app/shared/service-proxies/api-shared';

@Component({
  selector: 'input-image-cropper',
  templateUrl: './input-image-cropper.component.html',
  styleUrls: ['./input-image-cropper.component.css']
})
export class InputImageCropperComponent extends ApiBase implements OnInit {
  private http: HttpClient;
  private baseUrl: string;
  public refValue: any;
  public opened = false;
  fileToUpload: any;
  @Input() tableName:string;
  @Input() colName:string;
  @Input() title:string = 'Select file... ';
  @Input() baseUrl_direct:string = '';
  @Input() multiple:boolean = false;
  @Input() isBase64:boolean = false;
  @Input() isDomain:boolean = false;
  @Input() aspectRatio:any = 1/1;
  @Input() cropperMinHeight:number = 768;
  @Input() cropperMaxWidth:number = 768;
  @Input() cropperMaxHeight:number = 768;
  @Input() cropperMinWidth:number = 768;
  @Input() imageBase64:string = '';
  @Output() ValueOutput: EventEmitter<any> = new EventEmitter();
  @BlockUI() blockUI: NgBlockUI;
  constructor(
    private ref: ChangeDetectorRef,
    private fileService: FileManagerService,
    @Inject(AppSession) configuration: AppSession,
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string
  ) {
    super(configuration);
    this.http = http;
    this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
  }
  ngOnInit(): void {
    debugger
  }
  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileChangeEvent(e: any): void {
    if(e?.target?.files.length == 0)return;
    this.fileToUpload = e?.target?.files;
    let max_size = AppConsts.limit_length_uploadfile;
    if( this.fileToUpload [0].size > (max_size*1024*1024)){
      alert('File không được phép vượt quá '+max_size+'Mb');
      return;
    }
    if(this.isBase64)this.ValueOutput.emit(e.base64)
    else if(this.isDomain) this.postFiles_domain()
    else this.postFiles();
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
  }
  imageLoaded(image: LoadedImage):void {
      // show cropper
  }
  cropperReady() {
      // cropper ready
  }
  loadImageFailed() {
      // show message
  }
  async postFiles(): Promise<any> {
    if (this.fileToUpload == undefined) return;
    const formData: FormData = new FormData();
    for (var i = 0; i < this.fileToUpload.length; i++)
      formData.append('MyFile', this.fileToUpload[i]);

    formData.append('Type', '1');
    formData.append('tbName', this.tableName);
    formData.append('colName', this.colName);
    // options.headers = options.headers.append('Authorization', `${this.authToken}`);
    let options_: any = {
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    };
    this.transformOptions(options_);
    var url = this.baseUrl;
    if(this.baseUrl_direct != '')url= this.baseUrl_direct;
    this.blockUI.start();
    this.http.post(url + '/api/FileManager/PostFileNoHosting', formData,
      {
        headers: options_.headers
      }).subscribe(responses=>{
        this.ValueOutput.emit(responses['path'].replace());
        this.blockUI.stop();
      }),
      (err) => {
        alert('File không được phép vượt quá '+AppConsts.limit_length_uploadfile+'Mb');
      },
      () => {
        alert('File không được phép vượt quá '+AppConsts.limit_length_uploadfile+'Mb');
      };
  }
  async postFiles_domain(): Promise<any> {
    if (this.fileToUpload == undefined) return;
    const formData: FormData = new FormData();
    for (var i = 0; i < this.fileToUpload.length; i++)
      formData.append('MyFile', this.fileToUpload[i]);

    formData.append('tbName', this.tableName);
    formData.append('colName', this.colName);
    // options.headers = options.headers.append('Authorization', `${this.authToken}`);
    let options_: any = {
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    };
    this.transformOptions(options_);
    this.blockUI.start();
    return await this.http.post(this.baseUrl + '/api/FileManager/PostFile', formData,
      {
        headers: options_.headers
      }).subscribe(responses=>{
        this.ValueOutput.emit(responses['path'].replace());
        this.blockUI.stop();
      });
  }
}
