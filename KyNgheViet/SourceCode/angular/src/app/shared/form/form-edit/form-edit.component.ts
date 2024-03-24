import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { element } from 'protractor';
import { AppSession } from '../../app-session/app-session';
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
  selector: 'app-form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.css']
})
export class FormEditComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

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
    this.codeEdit = this.getRouteParam('code');
    this.tableName = this.getRouteData('table');
    this.key = this.getRouteData('key');
  }

  @Input() tableName: string = '';
  @Input() key: string;
  @Input() CurrenFrom: string = EditPageState.edit;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  // @ViewChild('breadcrumb') breadcrumb: BreadcrumbComponent;
  @ViewChild('gridEdit') gridEdit: GridEditComponent;

  editPageState: EditPageState;
  inputFilter: SYS_GenRowTable_Detail[];
  IdEdit: number = -1;
  codeEdit: string = '';
  public value = "";
  valswitch: boolean = true;
  isloadingData: boolean = true;
  inputModel: Object = {};
  Data: any[];
  arrayFiles: any[] = [];
  sYS_GenRowTable: SYS_GenRowTable;
  sYS_GenRowTableDetail: SYS_GenRowTable_Detail[];
  GenRowTableEditDetail: SYS_GenRowTable_Detail[];

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
    for (var i = 0; i < param.split(',').length; i++) {
      var name = param.split(',')[i];
      _p.push([this.inputModel[name]]);
      p[name] = this.inputModel[name];
    }
    isBody =
      (
        this.commonService.ListService.find(element => element['Key'] == this.key)[this.key]
        ['service'][storedName].toLocaleString().indexOf('JSON.stringify(body)') > 0
      )
    let input = null;
    if (!isBody) input = _p;
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
        this.IdEdit = data.id;
        this.UpdateView()
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
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
    input = this.interfaceModels.ListItem[this.tableName].fromJS(input);

    this.commonService.ListService.find(element => element['Key'] == this.key)[this.key]
    ['service'][storedName](input).subscribe(
      (data: Object) => {
        if (data['Status'] == 0) {
          if (this.getisTypeFile) {
            this.saveFile(data['CodeAddNew']);
            if (t['rollNext'] != null) {
              this.navigatePassParam(t['rollNext'], { code: data['code'] }, { filterInput: JSON.stringify(this.inputMaster) });
            }
            this.showSuccess();
            this.UpdateView()
          } else {
            this.showSuccess();
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
    this.inputModel['code'] = this.codeEdit;
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
        text: this.acctionName,
        title: grow.name,
        level: 2,
        link: t.link
      }
    );
    // this.breadcrumb.refreshBreadCrumb();
    this.UpdateView();
  }
  getValueFile(value: Object, col: string, tbName: string, ref_MasterID: string): void {
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
    // if (v_Of.length == 0 && _value.length > 0) {
    //   _value.forEach(e => {
    //     this.arrayFiles.push(e);
    //   })
    // } else {
    //   for (var i = 0; i < _value.length; i++) {
    //     var element = _value[i];
    //     //add,update,delete
    //     let temp = v_Of.filter(e => e['id'] == element['id']);
    //     var t = this.arrayFiles.find(e => e['id'] == element['id']);
    //     var index0 = this.arrayFiles.indexOf(t);
    //     var index1 = v_Of.indexOf(t);
    //     if (temp['length'] > 0) {//update
    //       this.arrayFiles[index0]['path'] = element['path'];
    //       this.arrayFiles[index0]['fileName'] = element['fileName'];
    //       this.arrayFiles[index0]['size'] = element['size'];
    //       this.arrayFiles[index0]['tbName'] = element['tbName'];
    //       this.arrayFiles[index0]['colName'] = element['colName'];
    //       this.arrayFiles[index0]['lastModified'] = element['lastModified'];
    //       this.arrayFiles[index0]['ref_MasterID'] = ref_MasterID;
    //       this.arrayFiles[index0]['description'] = element['description'];
    //       this.arrayFiles[index0]['datE_EDIT'] = new Date();
    //       this.arrayFiles[index0]['accounT_ID'] = this.appSession.user().id;
    //       v_Of.splice(index1, 1);
    //     } else {
    //       this.arrayFiles.push(element);
    //       v_Of.splice(index1, 1);
    //     }
    //   }
    //   v_Of.forEach(e => {
    //     var index = this.arrayFiles.indexOf(e);
    //     this.arrayFiles.splice(index, 1);
    //   })
    // }

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
