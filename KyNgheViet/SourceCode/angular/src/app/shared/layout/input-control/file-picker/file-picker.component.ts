import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, Inject, Injector, Input, OnInit, Optional, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AppConsts } from 'src/app/app-consts.component';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { User } from 'src/app/shared/models/system/account';
import { ApiBase, API_BASE_URL, FileManagerService, FileRecord } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
let _tempFiles: any[];
@Component({
  selector: 'file-picker',
  templateUrl: './file-picker.component.html',
  styleUrls: ['./file-picker.component.css']
})
export class FilePickerComponent extends ApiBase implements OnInit {
  private http: HttpClient;
  private baseUrl: string;
  public refValue: any;
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
  @Input() accounT_ID: number;
  @Input() id: string;
  @Input() codeEdit: string;
  @Input() key: string;
  @Input() colName: string;
  @Input() CurrenFrom: string;
  @Input() tableName: string;
  @Input() pageTitle: string;
  @Input() myFiles: any[] = [];
  @Input() multiple: Boolean = false;
  @Output() ValueFilesOutput: EventEmitter<Object> = new EventEmitter();
  tempFiles: any[] = [];
  @BlockUI() blockUI: NgBlockUI;
  fileForm = new FormGroup({
    altText: new FormControl(''),
    description: new FormControl('')
  });
  fileToUpload: any;
  handleFileInput(e: any) {
    this.fileToUpload = e?.target?.files;
    if(this.fileToUpload.length > (AppConsts.limit_length_uploadfile*1024)){
      alert('File không được phép vượt quá '+AppConsts.limit_length_uploadfile+'Mb');
      return;
    }
    if (!this.multiple) {
      this.tempFiles = [];
      this.clearAllDataUpload();
    }
    for (var i = 0; i < this.fileToUpload.length; i++) {
      this.fileToUpload[i]['id'] = this.NewID;
      this.setDataUpload(this.fileToUpload[i]);
    }
    this.addFile(this.fileToUpload);
  }
  dataAfter(): any[] {
    this.tempFiles = [];
    if (!this.multiple) {
      this.myFiles.forEach(e => {
        if (e['key']) this.key = e['key']
      })
      if (this.myFiles[0])
        this.tempFiles.push(this.myFiles[0]);
      else
        this.tempFiles = [];
    } else {
      this.myFiles.forEach(e => {
        if (e['key']) this.key = e['key']
        else
          this.tempFiles.push(e);
      })
    }

    return this.tempFiles;
  }
  dataBefor(): any[] {
    return this.tempFiles;
  }
  ngOnInit(): void {
  }
  get disabledButton(): boolean {
    return this.CurrenFrom == EditPageState.view || this.CurrenFrom == EditPageState.viewDetail;
  }
  async postFiles(): Promise<any> {
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
    return await this.http.post(this.baseUrl + '/api/FileManager/PostFile', formData,
      {
        headers: options_.headers
      }).subscribe();
  }
  public opened = false;
  public addFile(data: any) {
    for (var i = 0; i < data.length; i++) {
      let t = {
        id: data[i]['id'],
        path: '',
        code: '',
        index: i,
        tbName: this.tableName,
        colName: this.colName,
        description: '',
        lastModified: data[i]['lastModified'],
        accounT_ID: this.accounT_ID,
        ref_MasterID: this.codeEdit,
        fileName: data[i]['name'],
        size: data[i]['size']
      };
      this.tempFiles.push(t);
    }
    this.ref.detectChanges();
    // this.ValueFilesOutput.emit(this.myFiles);
  }
  public delete(id: number) {
    this.tempFiles = this.tempFiles.filter(e => e.id != id);
    this.deleteDataUpload_ById(id);
    this.ref.detectChanges();
  }
  clearAll() {
    this.tempFiles = [];
    this.clearAllDataUpload();
    this.ref.detectChanges();
  }
  public close(status) {
    if (status == 'yes') {
      this.myFiles = this.tempFiles;
      console.log(this.myFiles)
      this.refValue = { fileOld: this.myFiles, fileNew: this.getDataUpload, id: this.id, key: this.key }
      this.ValueFilesOutput.emit(this.refValue);
    } else {
      this.tempFiles = this.myFiles;
    }
    this.opened = false;
  }
  niceBytes(x): string {
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let l = 0, n = parseInt(x, 10) || 0;
    while (n >= 1024 && ++l) {
      n = n / 1024;
    }
    return (n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
  }
  get NewID(): number {
    let id = -Math.floor(Math.random() * 1001);
    if (this.getDataUpload.filter(e => e['id'] == id).length > 0) this.NewID;
    return id;
  }
  public open() {
    this.tempFiles = this.dataAfter();
    this.clearAllDataUpload();
    this.opened = true;
    this.ref.detectChanges();
  }
  async postFiles_v2(listData:any,id_farther:string,stored:string,callback:Function): Promise<any> {
    if (listData == undefined) return;
    const formData: FormData = new FormData();
    for (var i = 0; i < listData.length; i++)
      formData.append('MyFile', listData[i].value);

    formData.append('ref_master_code', id_farther);
    formData.append('stored',stored);
    let options_: any = {
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    };
    this.transformOptions(options_);
    return await this.http.post(this.baseUrl + '/api/FileManager/PostFile_v2', formData,
      {
        headers: options_.headers
      }).subscribe((respond)=>{
        callback(respond);
      });
  }
}
