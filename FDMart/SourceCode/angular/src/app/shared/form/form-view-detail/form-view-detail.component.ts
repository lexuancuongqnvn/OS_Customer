import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { element } from 'protractor';
import { AppSession } from '../../app-session/app-session';
import { GridEditComponent } from '../../grid/grid-edit/grid-edit.component';
import { BreadcrumbComponent } from '../../layout/breadcrumb/breadcrumb.component';
import { LayoutComponentBase } from '../../layout/layoutBase';
import { ToolbarComponent } from '../../layout/toolbar/toolbar.component';
import { SYS_GenRowTable, SYS_GenRowTable_Detail, Tb_TestTheme_Sub1_ENTITY } from '../../service-proxies/api-shared';
import { DrawerService } from '../../shared.service';
import { CommonService } from '../../ultilities/commonService';
import { EditPageState } from '../../ultilities/enum/edit-page-state';
import { InterfaceModels } from '../../ultilities/interface-base';
import { IUiAction } from '../../ultilities/ui-action';


@Component({
  selector: 'app-form-view-detail',
  templateUrl: './form-view-detail.component.html',
  styleUrls: ['./form-view-detail.component.css']
})
export class FormViewDetailComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    private appSession: AppSession,
    private drawerService: DrawerService,
    private injector: Injector,
    private commonService: CommonService,
    private interfaceModels: InterfaceModels
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
  @Input() CurrenFrom: string = EditPageState.viewDetail;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  // @ViewChild('breadcrumb') breadcrumb: BreadcrumbComponent;
  @ViewChild('gridEdit') gridEdit: GridEditComponent;

  editPageState: EditPageState;
  inputFilter: SYS_GenRowTable_Detail[];
  codeEdit: string = '';
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
    for (var i = 0; i < param.split(',').length; i++) {
      var name = param.split(',')[i];
      _p.push(this.inputModel[name]);
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
        this.setArrayFiles(this.arrayFiles);
        this.renderForBindingFile();
        this.UnBlockUI();
      }
    )
  }
  onClickAcction(id: number, storedName: string, param: string, keyService: string, classForm: string): void {
    this.setRoleCurrent(id);
    var item = this.getRoleCurren();
    if (item.link != null && item.link != undefined && item.link != '') {
      var link = item.link;
      switch (classForm) {
        case EditPageState.add:
          this.navigatePassParam(link, null, null);
          break;
        case EditPageState.edit:
          this.navigatePassParam(link, { code: this.codeEdit }, { filterInput: JSON.stringify(this.inputMaster) });
          break;
        case EditPageState.viewDetail:
          this.navigatePassParam(link, { code: this.codeEdit }, { filterInput: JSON.stringify(this.inputMaster) });
          break;
      }
    }
    else {
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
            ['service'][storedName].toLocaleString().indexOf('encodeURIComponent') > 0
          )

        if (isBody) input = _p;
        else input = p;
      } else {
        input = this.inputModel;
      }
      input = this.interfaceModels.ListItem[this.tableName].fromJS(input)
      this.commonService.ListService.find(element => element['Key'] == this.key)[this.key]
      ['service'][storedName](input).subscribe(
        (data: any[]) => {
          this.setInputMaster(data, this.tableName);
          // this.gridView.RefreshGrid();
          this.UpdateView();
        },
        (err) => console.error(err),
        () => {
          this.UnBlockUI();
        }
      )
    }
  }
  onClickAcction1(id: number, storedName: string, param: string, keyService: string, classForm: string): void {
    var t = this.getRoleCurren_byId(id);
    if (t['classForm'] == 'save') {
      t = this.getRoleCurren();
      storedName = t['storedName'];
      param = t['param'];
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
          ['service'][storedName].toLocaleString().indexOf('encodeURIComponent') > 0
        )

      if (isBody) input = _p;
      else input = p;
    } else {
      input = this.inputModel;
    }
    input = this.interfaceModels.ListItem[this.tableName].fromJS(input)
    // for (const [key, value] of Object.entries(input)) {
    //   if (Array.isArray(value)) {
    //     for (var i = 0; i < input[key].length; i++) {
    //       input[key][i] = this.interfaceModels.ListItem[key].fromJS(input[key][i]);
    //       input[key][i]['id'] = parseInt(input[key][i]['id'])
    //     }
    //   }
    // }

    this.commonService.ListService.find(element => element['Key'] == this.key)[this.key]
    ['service'][storedName](input).subscribe(
      (data: Object) => {
        alert('successfull')
        this.UpdateView()
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
    this.inputModel['code'] = this.codeEdit;
    this.inputModel['tbName'] = this.tableName;
    this.drawerService.getGenrowItems(this.tableName, this);
    var t = this.getRoleCurren_byFormName(this.CurrenFrom);
    if (t) {
      this.setRoleCurrent(t.id)
    }
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
  getValueFile(value: any[], col: string, tbName: string, ref_MasterID: number): void {
    let i = 0;
    let v_Of = this.arrayFiles.filter(e => e['tbName'] == tbName && e['colName'] == col && e['ref_MasterID'] == ref_MasterID);
    if (v_Of.length == 0 && value.length > 0) {
      value.forEach(e => {
        e['id'] = this.getId();
        this.arrayFiles.push(e);
      })
    } else {
      v_Of.forEach(e => {
        let j = 0, srt_i = '';
        for (var i = 0; i < value.length; i++) {
          var element = value[i];
          //add,update,delete
          let temp = v_Of.filter(e => e['id'] == element['id']);
          if (temp['length'] > 0) {//update
            var index0 = this.arrayFiles.indexOf(e);
            var index1 = v_Of.indexOf(e);
            this.arrayFiles[index0]['path'] = element['path'];
            this.arrayFiles[index0]['fileName'] = element['fileName'];
            this.arrayFiles[index0]['size'] = element['size'];
            this.arrayFiles[index0]['tbName'] = element['tbName'];
            this.arrayFiles[index0]['colName'] = element['colName'];
            this.arrayFiles[index0]['ref_MasterID'] = ref_MasterID;
            this.arrayFiles[index0]['description'] = element['description'];
            this.arrayFiles[index0]['datE_EDIT'] = new Date();
            this.arrayFiles[index0]['accounT_ID'] = this.appSession.user.id;
            v_Of.splice(index1, 1);
          }
          else if (parseInt(element['id']) < 0) {//add
            let v = {
              id: this.getId(),
              path: element['path'],
              fileName: element['fileName'],
              size: element['size'],
              tbName: element['tbName'],
              colName: element['colName'],
              ref_MasterID: ref_MasterID,
              description: element['description'],
              datE_ADD: new Date(),
              datE_EDIT: new Date(),
              accounT_ID: this.appSession.user.id
            }
            this.arrayFiles.push(v);
          }
          if (srt_i != '') srt_i += ';';
          srt_i += i;
        }
        for (var i = 0; i < srt_i.split(';').length; i++)
          value.splice(i, 1);
      });
      v_Of.forEach(e => {
        var index = this.arrayFiles.indexOf(e);
        this.arrayFiles.splice(index, 1);
      })
    }
    this.setArrayFiles(this.arrayFiles);
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
