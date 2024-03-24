import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { element } from 'protractor';
import { AppSession } from '../../app-session/app-session';
import { GridAddComponent } from '../../grid/grid-add/grid-add.component';
import { GridEditComponent } from '../../grid/grid-edit/grid-edit.component';
import { BreadcrumbComponent } from '../../layout/breadcrumb/breadcrumb.component';
import { FilePickerInterface } from '../../layout/input-control/file-picker/file-picker-interface.service';
import { LayoutComponentBase } from '../../layout/layoutBase';
import { ToolbarComponent } from '../../layout/toolbar/toolbar.component';
import { File_ENTITY, SYS_GenRowTable, SYS_GenRowTable_Detail, Tb_TestTheme_Sub1_ENTITY } from '../../service-proxies/api-shared';
import { DrawerService } from '../../shared.service';
import { CommonService } from '../../ultilities/commonService';
import { EditPageState } from '../../ultilities/enum/edit-page-state';
import { InterfaceModels } from '../../ultilities/interface-base';
import { IUiAction } from '../../ultilities/ui-action';


@Component({
  selector: 'app-form-add',
  templateUrl: './form-add.component.html',
  styleUrls: ['./form-add.component.css']
})
export class FormAddComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    private appSession: AppSession,
    private drawerService: DrawerService,
    private injector: Injector,
    private commonService: CommonService,
    private interfaceModels: InterfaceModels,
    private filePicker: FilePickerInterface
  ) {
    super(injector);
    this.clearOninit();
    this.editPageState = this.getRouteData('editPageState');
    this.tableName = this.getRouteData('table');
    this.key = this.getRouteData('key');
  }

  @Input() tableName: string = '';
  @Input() key: string;
  @Input() CurrenFrom: string = EditPageState.add;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  // @ViewChild('breadcrumb') breadcrumb: BreadcrumbComponent;
  @ViewChild('gridAdd') gridAdd: GridAddComponent;

  editPageState: EditPageState;
  inputFilter: SYS_GenRowTable_Detail[];
  IdEdit: number = -1;
  public value = "";
  valswitch: boolean = true;
  isTypeFile: boolean = false;
  isloadingData: boolean = true;
  inputModel: Object = {};
  Data: any[];
  arrayFiles: any[] = this.getArrayFiles();
  sYS_GenRowTable: SYS_GenRowTable;
  sYS_GenRowTableDetail: SYS_GenRowTable_Detail[];
  GenRowTableEditDetail: SYS_GenRowTable_Detail[];

  onAdd(): void {
    throw new Error('Method not implemented.');
  }
  onUpdate(item: any): void {
    throw new Error('Method not implemented.');
  }
  onDelete(item: any): void {
    throw new Error('Method not implemented.');
  }
  onApprove(item: any): void {
    throw new Error('Method not implemented.');
  }
  onViewDetail(item: any): void {
    throw new Error('Method not implemented.');
  }
  onSave(): void {
    throw new Error('Method not implemented.');
  }
  onSearch(): void {
    throw new Error('Method not implemented.');
  }
  onResetSearch(): void {
    throw new Error('Method not implemented.');
  }
  getDataByID(storedName: string, param: string, keyService: string): void {
    this.BlockUI();
    var isBody = true;
    this.key = keyService;
    let p = {}, _p = [];
    param = storedName.split('[')[1].replace(']', '');
    storedName = storedName.split('[')[0];
    for (var i = 0; i < param.split(';').length; i++) {
      var name = param.split(';')[i];
      _p.push(this.inputModel[name]);
      p[name] = this.inputModel[name];
    }
    isBody =
      (
        this.commonService.ListService.find(element => element['Key'] == this.key)[this.key]
        ['service'][storedName].toLocaleString().indexOf('encodeURIComponent') > 0
      )
    let input = null;
    if (isBody) input = _p;
    else input = p;
    let inputModel_T = this.inputModel;
    this.commonService.ListService.find(element => element['Key'] == this.key)[this.key]
    ['service'][storedName](input).subscribe(
      (data: any) => {
        Object.keys(data).forEach(function (key) {
          inputModel_T[key] = data[key];
        });
        this.inputModel = inputModel_T;
        this.isloadingData = false;
        this.UpdateView()
      },
      (err) => this.UnBlockUI(),
      () => {
        this.setArrayFiles(this.arrayFiles);
        this.renderForBindingFile();
        this.UnBlockUI();
      }
    )
  }
  public saveFile(code: string) {
    this.filePicker.fileToUpload = this.getNewFile;
    let t = [];
    this.getArrayFiles().forEach(e => {
      e['code'] = code;
      t.push(File_ENTITY.fromJS(e))
    });
    this.filePicker.listFiles = t;
    let respond = this.filePicker.postFiles();
    console.log(respond)
  }
  onClickAcction(id: number, storedName: string, param: string, keyService: string, classForm: string): void {
    var t = this.getRoleCurren_byId(id);
    if (t['classForm'] == 'save') {
      var _t = this.getRoleCurren();
      storedName = _t['storedName'];
      param = _t['param'];
    } else
      this.setRoleCurrent(id);

    var isBody = true;
    let input = null; let p = {}, _p = [];
    this.key = keyService;
    if (param != null && param != undefined && param != '') {
      for (var i = 0; i < param.split(';').length; i++) {
        var name = param.split(';')[i];
        _p.push(this.inputModel[name]);
        p[name] = this.inputModel[name];
      }
      isBody =
        (
          this.commonService.ListService.find(element => element['Key'] == this.key)[this.key]
          ['service'][storedName].toLocaleString().indexOf('JSON.stringify(body)') > 0
        )

      if (isBody) input = _p;
      else input = p;
    } else {
      input = this.inputModel;
    }
    input = this.interfaceModels.ListItem[this.tableName].fromJS(input)

    this.commonService.ListService.find(element => element['Key'] == this.key)[this.key]
    ['service'][storedName](input).subscribe(
      (data: Object) => {
        if (data['Status'] == 0) {
          if (this.getisTypeFile) {
            this.saveFile(data['CodeAddNew']);
            if (t['rollNext'] != null) {
              this.navigatePassParam(t['rollNext'], { code: data['code'] }, { filterInput: JSON.stringify(this.inputMaster) });
            }
            this.showSuccess()
            this.UpdateView()
          } else {
            this.showSuccess()
            if (t['rollNext'] != null) {
              this.navigatePassParam(t['rollNext'], { code: data['code'] }, { filterInput: JSON.stringify(this.inputMaster) });
            }
            this.UpdateView()
          }
        } else {
          alert(data['Message'])
        }
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
  }
  form: FormGroup = new FormGroup({
    size: new FormControl(null, Validators.required),
  });
  ngOnInit(): void {
    // this.key = 'MenuService';
    this.inputModel['id'] = this.IdEdit;
    this.inputModel['tbName'] = this.tableName;
    this.drawerService.getGenrowItems(this.tableName, this);

  }

  renderListFilter() {
    this.inputFilter = [];
    this.sYS_GenRowTableDetail.forEach(e => {
      if (e.displaY_STATUS == 1)
        this.inputFilter.push(e);
    });
  }

  completeCallback(grow: any[]) {
    this.toolbar.setUiAction(this);
    this.sYS_GenRowTable = grow.filter(e => e.tablE_NAME == this.tableName).shift();
    this.setGenrowTable(this.tableName, this.sYS_GenRowTable);
    this.GenRowTableEditDetail = grow.filter(e => e.tablE_NAME != this.tableName);

    this.sYS_GenRowTableDetail = this.sYS_GenRowTable.syS_GenRowTable_Detail;

    switch (this.editPageState) {
      case EditPageState.add:
        // this.renderGenrow(this.sYS_GenRowTable);
        this.renderListFilter();
        break;
      case EditPageState.edit:
        // this.renderGenrow(this.sYS_GenRowTable);
        this.renderListFilter();
        this.callGetDataByID();
        break;
      case EditPageState.viewDetail:
        // this.renderGenrow(this.sYS_GenRowTable);
        this.renderListFilter();
        this.callGetDataByID();
        break;
    }
    this.UpdateView();
  }
  callGetDataByID() {
    this.requestEdit = this.getRequestEdit();
    if (this.requestEdit['onInit'] == undefined) {
      setTimeout(() => {
        this.callGetDataByID();
      }, 1);
    } else {
      this.getDataByID(this.requestEdit['onInit'], '', this.key);
    }

  }
  renderGenrow(grow: SYS_GenRowTable) {
    var t = this.getAcctionForm().find(e => e['tbName'] == grow.tablE_NAME)
    this.AddItemsBread(
      {
        text: t.name,
        title: grow.name,
        level: 2,
        link: t.link
      }
    );
    // this.breadcrumb.refreshBreadCrumb();
    this.UpdateView();
  }
  getValueFile(value: any[], col: string, tbName: string, ref_MasterID: number): void {
    this.arrayFiles = this.getArrayFiles();
    // ref_MasterID = value['code'];
    let _value = value['v']['fileOld'];
    //begin gen new upload
    let _fileNew = value['v']['fileNew'];
    let fileNew = _value.filter(e => e['id'] < 0);
    _fileNew.forEach(e => {
      let _v = this.getNewFile; _v.push(e)
      this.setNewFile(_v);
    });

    //delete file validate
    // let _v = this.getNewFile, __v = this.getNewFile;
    // for (var _i = 0; _i < _v.length; _i++) {
    //   if (fileNew.filter(e => e['lastModified'] == _v[_i]['lastModified']).length == 0)
    //     __v = __v.splice(__v.indexOf(_v[_i]), 1);
    // }
    // this.setNewFile(__v);
    //end gen new upload

    let v_Of = this.arrayFiles.filter(e => e['tbName'] != tbName && e['colName'] != col && e['ref_MasterID'] != ref_MasterID);
    _value.forEach(element => {
      v_Of.push(element);
    });
    _value.push({ key: value['key'] })
    this.setValueEditNoUpdate(value['key'], _value);
    this.setArrayFiles(v_Of);
    this.UpdateData();
  }
  getId(): number {
    let id = -Math.floor(Math.random() * 1001);
    if (this.arrayFiles.filter(e => e['id'] == id).length > 0) this.getId();
    return id;
  }
  GetdData(obj: any, col: string, type: number): void {
    // if (type == 5 || type == 9 || type == 11)
    //   obj['v'] = new Date(obj['v'].getFullYear(), obj['v'].getMonth(), obj['v'].getDay(), obj['v'].getHours(), obj['v'].getMinutes(), obj['v'].getSeconds());
    if (type == 6 || type == 7 || type == 8) {//files
      this.arrayFiles.push(obj['v']);
    } else if (type == 16) {
      this.inputModel[obj['tbName']][obj['p']][obj['col']] = obj['v'];
    }
    else if (obj['v'] != null) {
      this.inputModel[col] = obj['v'];
    }
    this.UpdateView();
  }

}
