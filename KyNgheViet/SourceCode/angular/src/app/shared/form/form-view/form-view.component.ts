import { ChangeDetectorRef, Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { GridViewComponent } from '../../grid/grid-view/grid-view.component';
import { BreadcrumbComponent } from '../../layout/breadcrumb/breadcrumb.component';
import { DialogAcctionComponent } from '../../layout/dialogs/acction/dialog-acction.component';
import { LayoutComponentBase } from '../../layout/layoutBase';
import { ToolbarComponent } from '../../layout/toolbar/toolbar.component';
import { SYS_GenRowTable, SYS_GenRowTable_Detail } from '../../service-proxies/api-shared';
import { DrawerService } from '../../shared.service';
import { CommonService } from '../../ultilities/commonService';
import { EditPageState } from '../../ultilities/enum/edit-page-state';
import { InterfaceModels } from '../../ultilities/interface-base';
import { IUiAction } from '../../ultilities/ui-action';

@Component({
  selector: 'form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.css']
})
export class FormViewComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    private drawerService: DrawerService,
    private injector: Injector,
    private commonService: CommonService,
    private interfaceModels: InterfaceModels
  ) {
    super(injector);
    this.clearOninit();
  }
  getDataByID(storedName: string, param: string, keyService: string): void {
    throw new Error('Method not implemented.');
  }

  // @ViewChild('breadcrumb') breadcrumb: BreadcrumbComponent;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  @ViewChild('gridView') gridView: GridViewComponent;
  @ViewChild('dialogDelete') dialogDelete: DialogAcctionComponent;
  @Input() CurrenFrom: string = EditPageState.view;
  key: string = 'MenuService';
  inputModel: Object = {};
  Data: any[];
  sYS_GenRowTable: SYS_GenRowTable;
  sYS_GenRowTableDetail: SYS_GenRowTable_Detail[] = [];
  inputFilter: SYS_GenRowTable_Detail[];
  tableName: string = 'tb_TestTheme';

  form: FormGroup = new FormGroup({
    size: new FormControl(null, Validators.required),
  });

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
    this.commonService.ListService.find(element => element['Key'] == this.key)[this.key]
    ['service'][this.commonService.ListService.find(element => element['Key'] == this.key)[this.key]['acctions']['search']](this.inputModel).subscribe(
      (data: any[]) => {
        // this.gridView.RefreshGrid(this.tableName);
      },
      (err) => console.error(err),
      () => {
        //isloading = true
      }
    )
  }
  acctionCurrent: object = {};
  onClickAcction(id: number, storedName: string, param: string, keyService: string, classForm: string): void {
    this.acctionCurrent = { id: id, storedName: storedName, param: param, keyService: keyService, classForm: classForm }
    this.setRoleCurrent(id);
    var t = this.getRoleCurren_byId(id);
    var item = this.getRoleCurren();
    if (item.link != null && item.link != undefined && item.link != '') {
      var link = item.link;
      switch (classForm) {
        case EditPageState.add:
          this.navigatePassParam(link, null, null);
          break;
        case EditPageState.edit:
          this.navigatePassParam(link, { code: this.getIdSelected() }, { filterInput: JSON.stringify(this.inputMaster) });
          break;
        case EditPageState.viewDetail:
          this.navigatePassParam(link, { code: this.getIdSelected() }, { filterInput: JSON.stringify(this.inputMaster) });
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
            ['service'][storedName].toLocaleString().indexOf('JSON.stringify(body)') > 0
          )

        if (!isBody) input = _p;
        else input = p;
      } else {
        input = this.inputModel;
      }
      input = this.interfaceModels.ListItem[this.tableName].fromJS(input)
      this.acctionCurrent['input'] = input;
      if (t['classForm'] == 'delete') {
        this.dialogDelete.open();
      } else {
        this.commonService.ListService.find(element => element['Key'] == this.key)[this.key]
        ['service'][storedName](input).subscribe(
          (data: any[]) => {
            this.setInputMaster(data, this.tableName);
            this.gridView.RefreshGrid();
            this.UpdateView();
          },
          (err) => console.error(err),
          () => {
            this.UnBlockUI();
          }
        )
      }

    }
  }
  onResetSearch(): void {
    throw new Error('Method not implemented.');
  }
  confirmDelete(): void {
    try {
      this.key = this.acctionCurrent['keyService'];
      this.commonService.ListService.find(element => element['Key'] == this.key)[this.key]
      ['service'][this.acctionCurrent['storedName']](this.getIdSelected()).subscribe(
        (data: any[]) => {
          this.showSuccess();
          this.gridView.Data = this.gridView.Data.filter(e => e['code'] != this.getIdSelected())
          this.setInputMaster(this.gridView.Data, this.tableName);
          this.gridView.RefreshGrid();
          this.UpdateView();
        },
        (err) => console.error(err),
        () => {
          this.UnBlockUI();
        }
      )
    } catch (e) {
      this.showMessageError('Đã có lỗi xảy ra, Xin vui lòng thử lại')
    }
  }
  ngOnInit(): void {
    this.drawerService.getGenrowItems(this.tableName, this);
    var t = this.getRoleCurren_byFormName(this.CurrenFrom);
    if (t) {
      this.setRoleCurrent(t.code)
    }
  }
  renderListFilter() {
    this.inputFilter = [];
    this.sYS_GenRowTableDetail.forEach(e => {
      if (e.alloW_SEARCH)
        this.inputFilter.push(e);
    });
  }
  completeCallback(grow: SYS_GenRowTable[]) {
    this.sYS_GenRowTable = grow.filter(e => e.tablE_NAME == this.tableName).shift();
    this.sYS_GenRowTableDetail = this.sYS_GenRowTable.syS_GenRowTable_Detail;
    // this.renderGenrow(this.sYS_GenRowTable);
    this.renderListFilter();
    this.toolbar.setUiAction(this);
    this.UpdateView();
  }
  renderGenrow(grow: SYS_GenRowTable) {
    var t = this.getAcctionForm().find(e => e['tbName'] == grow.tablE_NAME)
    this.AddItemsBread(
      {
        text: t.name,
        title: grow.name,
        level: 1,
        link: t.link
      }
    );
    // this.breadcrumb.refreshBreadCrumb();
    this.UpdateView();
  }

  GetdData(obj: any, col: string, type: number): void {
    // if (type == 5 || type == 9 || type == 11) {
    //   var stillUtc = moment.utc(obj['v']).toDate();
    //   obj['v'] = moment(stillUtc).local().format('YYYY-MM-DDTHH:mm:ss');
    // }
    if (type == 16) {
      this.inputModel[obj['tbName']][obj['p']][obj['col']] = obj['v'];
    }
    else if (obj['v'] != null) {
      this.inputModel[col] = obj['v'];
    }
    this.UpdateView();
  }
  public value = "";
  valswitch: boolean = true;

}
