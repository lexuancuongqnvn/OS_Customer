import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, Inject, Injector, Input, OnInit, Optional, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { User } from 'src/app/shared/models/system/account';
import { ApiBase, API_BASE_URL, FileManagerService, FileRecord, UploadFilesService, Upload_ENTITY } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import {saveAs} from 'file-saver';
let _tempFiles: any[];

@Component({
  selector: 'input-filepicker',
  templateUrl: './input-filepicker.component.html',
  styleUrls: ['./input-filepicker.component.css']
})
export class InputFilepickerComponent extends ApiBase implements OnInit {
  private http: HttpClient;
  private baseUrl: string;
  public refValue: any;
  constructor(
    private ref: ChangeDetectorRef,
    private fileService: FileManagerService,
    private uploadFilesService:UploadFilesService,
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
  tempFiles: Upload_ENTITY[] = [];
  @BlockUI() blockUI: NgBlockUI;
  fileForm = new FormGroup({
    altText: new FormControl(''),
    description: new FormControl('')
  });
  fileToUpload: any;
  handleFileInput(e: any) {
    this.fileToUpload = e?.target?.files;
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
  async loadFile(codeEdit){
    var p = new Upload_ENTITY();
    p.tbName = this.tableName;
    p.colName = this.colName;
    p.ref_MasterID = codeEdit;
    p.accounT_ID = this.accounT_ID;
    this.uploadFilesService.sYS_Upload_Search(p).subscribe(
      (data:any)=>{
        this.myFiles = data;
        this.open();
    })
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
      var t = new Upload_ENTITY();
      t.id = data[i]['id'];
      t.path = '';
      t.code = '';
      t.index = i;
      t.tbName = this.tableName;
      t.colName = this.colName;
      t.description = '';
      t.lastModified = data[i]['lastModified'];
      t.accounT_ID = this.accounT_ID;
      t.ref_MasterID = this.codeEdit;
      t.fileName = data[i]['name'];
      t.size = data[i]['size'];
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
  public async download(targetUrl: string,fileName:string) {
    const formData: FormData = new FormData();
    formData.append('filePath',targetUrl);
    let options_: any = {
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    };
    this.transformOptions(options_);
    
    this.http.get(this.baseUrl + '/api/FileManager/DownloadByPath?filePath='+targetUrl, {responseType: "blob", headers:  options_.headers})
    .subscribe(blob => {
      saveAs(blob, fileName);
    });
    // return await this.http.get(this.baseUrl + '/api/FileManager/DownloadByPath', formData,
    //   {
    //     headers: options_.headers
    //   }).subscribe(blob=>{
    //     saveAs(blob,"name");
    //   });
  }
  clearAll() {
    this.tempFiles = [];
    this.clearAllDataUpload();
    this.ref.detectChanges();
  }
  public async save(ref_master_code:string,callback:Function){
    await this.postFiles_v3(this.tempFiles,ref_master_code,'SYS_Upload_Save',callback);
  }
  public savePath(respond:any){
    
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
  
  async postFiles_v3(listData:any,id_farther:string,stored:string,callback:Function): Promise<any> {
    if (listData == undefined) return;
    var list_old = []
    for(var i = 0 ; i < listData.length ; i++)
    {
      if(listData[i]['id'] > 0)
      {
        var temp = new Upload_ENTITY();
        temp['id'] = listData[i].id;
        temp['path'] = listData[i].path;
        temp['path_encode'] = '';
        temp['code'] = listData[i].code;
        temp['fileName'] = listData[i].fileName;
        temp['name'] = listData[i].fileName;
        temp['size'] = listData[i].size;
        temp['tbName'] = this.tableName;
        temp['column_key'] = "";
        temp['colName'] = this.colName;
        temp['stored'] = '';
        temp['ref_MasterID'] = listData[i].ref_MasterID;
        temp['ref_master_code'] = "";
        temp['index'] = 0;
        temp['status'] = 0;
        temp['message'] = '';
        temp['description'] = '';
        temp['lastModified'] = "";
        temp['XML_Data'] = '';
        temp['datE_ADD'] = listData[i].datE_ADD;
        temp['datE_ADD'] = listData[i].datE_ADD;
        temp['accounT_ID'] = 0;
        list_old.push(temp);
      }
    }
    this.uploadFilesService.sYS_Upload_Save(list_old).subscribe(
      async (data:any)=>{
        if(this.getDataUpload.length == 0){
          callback();
          return null;
        }
        else{
          const formData: FormData = new FormData();
          for (var i = 0; i < this.getDataUpload.length; i++)
            formData.append('MyFile', this.getDataUpload[i]);

          formData.append('tbName', this.tableName);
          formData.append('colName', this.colName);
          formData.append('ref_master_code', id_farther);
          formData.append('stored', stored);
          let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
              'Accept': 'application/json'
            })
          };
          this.transformOptions(options_);
          return await this.http.post(this.baseUrl + '/api/FileManager/PostFile_v3', formData,
            {
              headers: options_.headers
            }).subscribe((respond) => {
              callback();
            });
        }
    })
    
  }
}
