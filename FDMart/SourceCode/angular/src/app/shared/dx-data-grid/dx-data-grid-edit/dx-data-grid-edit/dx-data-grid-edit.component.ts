import { AfterViewInit, Component, EventEmitter, Injector, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Service1, Status } from './dx-data-grid-edit.service';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import themes from 'devextreme/ui/themes';
import { GenRowTableService, ReferenceService, REFERENCE_ENTITY, REFERENCE_V3_Param, SYS_GenRowTable, SYS_GenRowTable_Detail, SYS_Menu, Token, User } from 'src/app/shared/service-proxies/api-shared';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { AppSession } from 'src/app/shared/app-session/app-session';
import ArrayStore from 'devextreme/data/array_store';
import { DxDataGridComponent, DxSwitchComponent } from 'devextreme-angular';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import moment from 'moment';
import { CellClickEvent } from 'devextreme/ui/data_grid';
import { ECDH } from 'crypto';
@Component({
  selector: 'osoft-data-grid-edit',
  templateUrl: './dx-data-grid-edit.component.html',
  styleUrls: ['./dx-data-grid-edit.component.css']
})
export class DxDataGridEditComponent extends LayoutComponentBase implements OnInit   {

  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;

  allMode: string;
  checkBoxesMode: string;
  employees: object;
  tasks: object;
  statuses: Status[];
  dropDownOptions: object;
  editorOptions: object;
  url: string;
  events: Array<string> = [];
  autoResizeEnabled: boolean = true;
  isDropBoxOpened: boolean = false;
  onRefreshGridT: boolean = false;
  arrayValueDropDown: any[] = [];
  arrayValueDropDownSelected: any[] = [];
  selectedItemKeys: any[] = [];

  menu: SYS_Menu = new SYS_Menu()
  menuCode: string = '';
  genRowTable: SYS_GenRowTable = new SYS_GenRowTable();
  genRowTableDetail: SYS_GenRowTable_Detail[] = [];
  @Input() title: string = 'Bảng chi tiết';
  @Input() dataSource: any[] = [];
  @Input() tableName: string = '';
  @Input() type: string = null;
  @Input() isShowTitle: boolean = true;
  @Input() onRefreshGrid: boolean = false;
  @Input() keyExpr: string = 'code';
  @Input() column_name: string = '';
  @Input() InputMaster: any = {};
  @Input() editPageState: string = EditPageState.edit;
  @Output() selectedRowsDataOutput: EventEmitter<any> = new EventEmitter();
  @Output() selectedRowsGridDataOutput: EventEmitter<any> = new EventEmitter();
  @Output() HandleValueChangedOutput: EventEmitter<any> = new EventEmitter();
  @Output() HandleDataSourceOutput: EventEmitter<any> = new EventEmitter();
  @Output() HandleCopydOutput: EventEmitter<any> = new EventEmitter();
  @Output() HandleAdddOutput: EventEmitter<any> = new EventEmitter();
  @Output() HandleDeletedOutput: EventEmitter<any> = new EventEmitter();


  constructor(service: Service1,
    injector: Injector,
    private appSession: AppSession,
    private genRowTableService: GenRowTableService,
    private referenceService: ReferenceService
  ) {
    super(injector);
    this.allMode = 'allPages';
    this.checkBoxesMode = themes.current().startsWith('material') ? 'always' : 'onClick';
    this.dropDownOptions = { width: 500 };
    this.editorOptions = {
      itemTemplate: 'statusTemplate',
    };
    this.url = 'https://js.devexpress.com/Demos/Mvc/api/CustomEditors';
    //this.statuses = service.getStatuses();
    // this.tasks = createStore({
    //   key: 'ID',
    //   loadUrl: `${this.url}/Tasks`,
    //   updateUrl: `${this.url}/UpdateTask`,
    //   insertUrl: `${this.url}/InsertTask`,
    //   onBeforeSend(method, ajaxOptions) {
    //     ajaxOptions.xhrFields = { withCredentials: true };
    //   },
    // });
    // this.employees = createStore({
    //   key: 'ID',
    //   loadUrl: `${this.url}/Employees`,
    //   onBeforeSend(method, ajaxOptions) {
    //     ajaxOptions.xhrFields = { withCredentials: true };
    //   },
    // });

    var stateMenu = JSON.parse(localStorage.getItem('stateMenu'));
    this.menu = stateMenu['lv0'];
    this.menuCode = this.menu.code;
    if (stateMenu['lv1']) {
      this.menu.syS_Menu_Sub = stateMenu['lv1'];
    }
    this.editPageState = this.getRouteData('editPageState');
    this.setCurrenFrom(this.editPageState);
  }
  get refreshGrid():boolean{
    if(this.onRefreshGrid != this.onRefreshGridT) {
      this.onRefreshGridT = this.onRefreshGrid;
      try{  this.dataGrid.instance.refresh();} catch{}
      return this.onRefreshGrid;
    }
    else 
    return this.onRefreshGridT;
  }
  get isNew(): boolean {
    return this.InputMaster.code ? false : true;
  }
  get isDisabled(): boolean {
    return this.editPageState == EditPageState.viewDetail ? true : false;
  }
  get editing(): boolean {
    return !(this.editPageState == EditPageState.viewDetail ? true : false);
  }
  public valueDropDownBox(v: string): any {
    return v ? v.split(';') : [];
  }
  logEvent(eventName) {
    this.events.unshift(eventName);
  }
  onSelectionChanged(selectedRowKeys, cellInfo, dropDownBoxComponent) {
    cellInfo.setValue(selectedRowKeys[0]);
    if (selectedRowKeys.length > 0) {
      dropDownBoxComponent.close();
    }
  }


  calculateFilterExpression(filterValue, selectedFilterOperation, target) {
    if (target === 'search' && typeof (filterValue) === 'string') {
      return [(this as any).dataField, 'contains', filterValue];
    }
    return function (data) {
      return (data.AssignedEmployee || []).indexOf(filterValue) !== -1;
    };
  }
  onOpenedDropDownOption(e: any, cell: any, items: any, key: any) {
    this.arrayValueDropDown = cell.value;
    this.isDropBoxOpened = true;
  }
  mapDataCondittons(caculate:string):boolean{
    try{
      if (this.InputMaster)
      {
        for (const [key, value] of Object.entries(this.InputMaster)) {
          caculate = caculate.replace(`[${key}]`, `${value}`);
        };  
        caculate = caculate.replace(`=`, ``);
        let result = eval(caculate);
        return result;
      }
      return true;
    }catch{
      return true;
    }
  }
  filtercolumn(){
    try{
      this.genRowTableDetail.forEach((e)=>{
        if(!e.displaY_CONDITIONS || this.mapDataCondittons(e.displaY_CONDITIONS))
        {
          e.iS_HIDDEN=false;
        }else{
          e.iS_HIDDEN=true;
        }
      });
    }catch{}
  }
  get onGetColumn():SYS_GenRowTable_Detail[]{
    return this.genRowTableDetail;
    return this.genRowTableDetail.filter(e=>e.iS_HIDDEN === false);
  }
  mapReferenceInputMaster(s:string):string{
    if (this.InputMaster)
     {
      for (const [key, value] of Object.entries(this.InputMaster)) {
         s = this.replaceAsync(`[${key}]`,value,s);
      };
     }
    return s;
  }
  onCellClick(event: CellClickEvent, genrow: SYS_GenRowTable_Detail[]) {
    // Access the clicked cell's information
    this.filtercolumn();
    try {
      const cellData = event.data;
      const columnName = event.column.dataField;
      const row = genrow.find(r => r.columN_NAME == columnName)
      const type_id = row.typE_ID;
      let reference = row.reference;
      if (type_id == 27 || type_id == 28) {
        try{
          this.genRowTableDetail.filter(r => r.shoW_REFERENCE == true).forEach(async e=>{
            if(reference.includes('{'+e.columN_NAME+'}') || (reference.includes('[') && reference.includes(']'))){
             reference = this.mapReferenceInputMaster(reference);
              for(var i = 0; i < this.genRowTableDetail.length;i++){
                if(this.genRowTableDetail[i].code == row.code){
                  let objRow = this.dataSource[event.rowIndex];
                  let itemReload = await this.referenceService.reference_V3_Search(new REFERENCE_V3_Param({
                    reference: reference,
                    master_data: this.checkAndConvertToObject(objRow)
                  }) as REFERENCE_V3_Param).toPromise()
                  this.genRowTableDetail[i].editoroptions.itemsFilter = itemReload ? itemReload[0].outputData : [];
                  this.genRowTableDetail[i].editoroptions.isFilter = true;
                  break;
                }
              }
            }
          })
        }catch{
        }
        this.isDropBoxOpened = true;
      }
    } catch { }
  }
  onClosedDropDownOption(e: any, cell: any, items: any, key: any, row: any) {
    // let filter = items.filter(f=>this.arrayValueDropDown.includes(f.code));
    // let v = [];
    // filter.forEach(f=>v.push(f[key]));
    if (!this.dataSource[cell.rowIndex]) {
      this.dataSource[cell.rowIndex] = {};
      // this.dataSource[cell.rowIndex][this.keyExpr] = 'NEW-'+Math.random()+(new Date()).getTime();
    }
    this.dataSource[cell.rowIndex][cell.column.dataField] = this.arrayValueDropDown;
    this.arrayValueDropDown = [];
    this.isDropBoxOpened = false;
    try {
      var arrDefault = this.genRowTableDetail.filter(r => r.defaulT_VALUE != null && r.defaulT_VALUE != '' && r.columN_NAME !== cell.column.dataField && r.defaulT_VALUE.startsWith('='));
      arrDefault.forEach(element => {
        let objRow = this.dataSource[cell.rowIndex];
        let caculate = element.defaulT_VALUE;

        for (const [key, value] of Object.entries(objRow)) {
          const regex = new RegExp(`{${key}}`, 'g'); 
          caculate = caculate.replace(regex, `${value}`);
        };
        if (this.InputMaster)
          for (const [key, value] of Object.entries(this.InputMaster)) {
            caculate = caculate.replace(`[${key}]`, `${value}`);
          };
        caculate = caculate.replace(`=`, ``);
        try {
          let result = eval(caculate);

          this.dataSource[cell.rowIndex][element.columN_NAME] = result;
          this.dataGrid.instance.refresh();
          this.HandleValueChangedOutput.emit({ rowIndex: cell.rowIndex, dataField: element.columN_NAME, row: element, value: result, dataSource: this.dataSource });

        } catch { }
        
      });
    } catch { }
    try {
      var arrDefault2 = this.genRowTableDetail.filter(r => r.defaulT_VALUE != null && r.defaulT_VALUE != '' && r.columN_NAME !== cell.column.dataField && r.defaulT_VALUE.includes('[') && r.defaulT_VALUE.includes(']') && !r.defaulT_VALUE.startsWith('='));
      arrDefault2.forEach(element => {
        let caculate = element.defaulT_VALUE;
        let result
        if (this.InputMaster)
          for (const [key, value] of Object.entries(this.InputMaster)) {
            if (`[${key}]` == caculate)
              result = value
          };
        if (this.dataSource[cell.rowIndex][element.columN_NAME] === undefined || this.dataSource[cell.rowIndex][element.columN_NAME] === null) {
          if(element.typE_ID == 27 || element.typE_ID == 28)result= result.split(';')
          this.dataSource[cell.rowIndex][element.columN_NAME] = result;
          this.dataGrid.instance.refresh();
          this.HandleValueChangedOutput.emit({ rowIndex: cell.rowIndex, dataField: element.columN_NAME, row: element, value: result, dataSource: this.dataSource });
        }
      });
    } catch { }
    try {
      let objRow = this.dataSource[cell.rowIndex];
      if (objRow[row.columN_NAME] && this.genRowTableDetail.filter(r => r.shoW_REFERENCE == true && r.columN_NAME === row.columN_NAME).length > 0) {
        var arrDefault3 = this.genRowTableDetail.filter(r => (r.editortype === 'Multirow' || r.editortype === 'dxTagBox' || r.editortype === 'dxSelectBox') && r.reference.includes('{') && r.reference.includes('}'));
        arrDefault3.forEach(async element => {
          let itemReload = await this.referenceService.reference_V3_Search(new REFERENCE_V3_Param({
            reference: element.reference,
            master_data: this.checkAndConvertToObject(objRow)
          }) as REFERENCE_V3_Param).toPromise()
          element.editoroptions.itemsFilter = itemReload ? itemReload[0].outputData : []
          element.editoroptions.isFilter = true;
        })
      }
    } catch { }
    this.HandleValueChangedOutput.emit({ rowIndex: cell.rowIndex, dataField: cell.column.dataField, row: row, value: this.dataSource[cell.rowIndex][cell.column.dataField], dataSource: this.dataSource });

    // e.stopPropagation();
  }
  onSavTagboxMultiOption(e: any, cell: any, items: any, key: any, row: any) {
    // let filter = items.filter(f=>this.arrayValueDropDown.includes(f.code));
    // let v = [];
    // filter.forEach(f=>v.push(f[key]));
    if (!this.dataSource[cell.rowIndex]) {
      this.dataSource[cell.rowIndex] = {};
      // this.dataSource[cell.rowIndex][this.keyExpr] = 'NEW-'+Math.random()+(new Date()).getTime();
    }
    this.dataSource[cell.rowIndex][cell.column.dataField] = e.value;
    this.arrayValueDropDown = [];
    this.isDropBoxOpened = false;
    try {
      var arrDefault = this.genRowTableDetail.filter(r => r.defaulT_VALUE != null && r.defaulT_VALUE != '' && r.columN_NAME !== cell.column.dataField && r.defaulT_VALUE.startsWith('='));
      arrDefault.forEach(element => {
        let objRow = this.dataSource[cell.rowIndex];
        let caculate = element.defaulT_VALUE;

        for (const [key, value] of Object.entries(objRow)) {
          caculate = caculate.replace(`{${key}}`, `${value}`);
        };
        if (this.InputMaster)
          for (const [key, value] of Object.entries(this.InputMaster)) {
            caculate = caculate.replace(`[${key}]`, `${value}`);
          };
        caculate = caculate.replace(`=`, ``);
        try {
          let result = eval(caculate);

          this.dataSource[cell.rowIndex][element.columN_NAME] = result;
          this.dataGrid.instance.refresh();
          this.HandleValueChangedOutput.emit({ rowIndex: cell.rowIndex, dataField: element.columN_NAME, row: element, value: result, dataSource: this.dataSource });

        } catch { }
       
      });
    } catch { }
    try {
      var arrDefault2 = this.genRowTableDetail.filter(r => r.defaulT_VALUE != null && r.defaulT_VALUE != '' && r.columN_NAME !== cell.column.dataField && r.defaulT_VALUE.includes('[') && r.defaulT_VALUE.includes(']') && !r.defaulT_VALUE.startsWith('='));
      arrDefault2.forEach(element => {
        let caculate = element.defaulT_VALUE;
        let result
        if (this.InputMaster)
          for (const [key, value] of Object.entries(this.InputMaster)) {
            if (`[${key}]` == caculate)
              result = value
          };
        if (this.dataSource[cell.rowIndex][element.columN_NAME] === undefined || this.dataSource[cell.rowIndex][element.columN_NAME] === null) {
          if(element.typE_ID == 27 || element.typE_ID == 28)result= result.split(';')
          this.dataSource[cell.rowIndex][element.columN_NAME] = result;
          this.dataGrid.instance.refresh();
          this.HandleValueChangedOutput.emit({ rowIndex: cell.rowIndex, dataField: element.columN_NAME, row: element, value: result, dataSource: this.dataSource });
        }
      });
    } catch { }
    try {
      let objRow = this.dataSource[cell.rowIndex];
      if (objRow[row.columN_NAME] && this.genRowTableDetail.filter(r => r.shoW_REFERENCE == true && r.columN_NAME === row.columN_NAME).length > 0) {
        var arrDefault3 = this.genRowTableDetail.filter(r => (r.editortype === 'Multirow' || r.editortype === 'dxTagBox' || r.editortype === 'dxSelectBox') && r.reference.includes('{') && r.reference.includes('}'));
        arrDefault3.forEach(async element => {
          let itemReload = await this.referenceService.reference_V3_Search(new REFERENCE_V3_Param({
            reference: element.reference,
            master_data: this.checkAndConvertToObject(objRow)
          }) as REFERENCE_V3_Param).toPromise()
          element.editoroptions.itemsFilter = itemReload ? itemReload[0].outputData : []
          element.editoroptions.isFilter = true;
        })
      }
    } catch { }
    this.HandleValueChangedOutput.emit({ rowIndex: cell.rowIndex, dataField: cell.column.dataField, row: row, value: this.dataSource[cell.rowIndex][cell.column.dataField], dataSource: this.dataSource });

    // e.stopPropagation();
  }
  onSaveDropDownOption(e: any, cell: any, items: any, key: any, row: any) {
    // let filter = items.filter(f=>this.arrayValueDropDown.includes(f.code));
    // let v = [];
    // filter.forEach(f=>v.push(f[key]));
    if (!this.dataSource[cell.rowIndex]) {
      this.dataSource[cell.rowIndex] = {};
      // this.dataSource[cell.rowIndex][this.keyExpr] = 'NEW-'+Math.random()+(new Date()).getTime();
    }
    if (this.arrayValueDropDownSelected.length > 0) {
      var arrDefault = this.genRowTableDetail.filter(r => r.defaulT_VALUE != null && r.defaulT_VALUE != '' && r.columN_NAME !== cell.column.dataField && r.defaulT_VALUE.startsWith(cell.column.dataField + '.'));
      arrDefault.forEach(element => {
        var col = element.defaulT_VALUE.replace(cell.column.dataField + '.', '');
        let result = this.arrayValueDropDownSelected[0][col];
        this.dataSource[cell.rowIndex][element.columN_NAME] = result;
        this.HandleValueChangedOutput.emit({ rowIndex: cell.rowIndex, dataField: element.columN_NAME, row: element, value: result, dataSource: this.dataSource });
      });
      this.dataGrid.instance.refresh();
    }
    this.dataSource[cell.rowIndex][cell.column.dataField] = this.arrayValueDropDown;
    this.arrayValueDropDown = [];
    this.isDropBoxOpened = false;
    try {
      var arrDefault = this.genRowTableDetail.filter(r => r.defaulT_VALUE != null && r.defaulT_VALUE != '' && r.columN_NAME !== cell.column.dataField && r.defaulT_VALUE.startsWith('='));
       arrDefault.forEach(element => {
        let objRow = this.dataSource[cell.rowIndex];
        let caculate = element.defaulT_VALUE;

        for (const [key, value] of Object.entries(objRow)) {
          caculate = caculate.replace(`{${key}}`, `${value}`);
        };
        if (this.InputMaster)
          for (const [key, value] of Object.entries(this.InputMaster)) {
            caculate = caculate.replace(`[${key}]`, `${value}`);
          };
        caculate = caculate.replace(`=`, ``);

       try{
        let result = eval(caculate);

        this.dataSource[cell.rowIndex][element.columN_NAME] = result;
        this.dataGrid.instance.refresh();
        this.HandleValueChangedOutput.emit({ rowIndex: cell.rowIndex, dataField: element.columN_NAME, row: element, value: result, dataSource: this.dataSource });
       }catch{}
      });
    } catch { }
    try {
      var arrDefault2 = this.genRowTableDetail.filter(r => r.defaulT_VALUE != null && r.defaulT_VALUE != '' && r.columN_NAME !== cell.column.dataField && r.defaulT_VALUE.includes('[') && r.defaulT_VALUE.includes(']') && !r.defaulT_VALUE.startsWith('='));
      arrDefault2.forEach(element => {
        let caculate = element.defaulT_VALUE;
        let result
        if (this.InputMaster)
          for (const [key, value] of Object.entries(this.InputMaster)) {
            if (`[${key}]` == caculate)
              result = value
          };
        if (this.dataSource[cell.rowIndex][element.columN_NAME] === undefined || this.dataSource[cell.rowIndex][element.columN_NAME] === null) {
          if(element.typE_ID == 27 || element.typE_ID == 28)result= result.split(';')
          this.dataSource[cell.rowIndex][element.columN_NAME] = result;
          this.dataGrid.instance.refresh();
          this.HandleValueChangedOutput.emit({ rowIndex: cell.rowIndex, dataField: element.columN_NAME, row: element, value: result, dataSource: this.dataSource });
        }
      });
    } catch { }
    try {
      let objRow = this.dataSource[cell.rowIndex];
      if (objRow[row.columN_NAME] && this.genRowTableDetail.filter(r => r.shoW_REFERENCE == true && r.columN_NAME === row.columN_NAME).length > 0) {
        var arrDefault3 = this.genRowTableDetail.filter(r => (r.editortype === 'Multirow' || r.editortype === 'dxTagBox' || r.editortype === 'dxSelectBox') && r.reference.includes('{') && r.reference.includes('}'));
        arrDefault3.forEach(async element => {
          let itemReload = await this.referenceService.reference_V3_Search(new REFERENCE_V3_Param({
            reference: element.reference,
            master_data: this.checkAndConvertToObject(objRow)
          }) as REFERENCE_V3_Param).toPromise()
          element.editoroptions.itemsFilter = itemReload ? itemReload[0].outputData : []
          element.editoroptions.isFilter = true;
        })
      }
    } catch { }

    // try{
    //   var arrDefault = this.genRowTableDetail.filter(r=>r.defaulT_VALUE != null && r.defaulT_VALUE != '' && r.columN_NAME !== cell.column.dataField && r.defaulT_VALUE.startsWith('='));
    //   arrDefault.forEach(element => {
    //     let objRow = this.dataSource[cell.rowIndex];
    //     let caculate = element.defaulT_VALUE;

    //     for (const [key, value] of Object.entries(objRow)){
    //       caculate = caculate.replace(`{${key}}`,`${value}`);
    //     };
    //     if(this.InputMaster)
    //       for (const [key, value] of Object.entries(this.InputMaster)){
    //         caculate = caculate.replace(`[${key}]`,`${value}`);
    //       };
    //     caculate = caculate.replace(`=`,``);
    //     let result = eval(caculate);

    //     this.dataSource[cell.rowIndex][element.columN_NAME] = result;
    //     this.HandleValueChangedOutput.emit({rowIndex:cell.rowIndex,dataField:element.columN_NAME,row:element,value:result,dataSource:this.dataSource});
    //   });
    // }catch{}
    // try{
    //   var arrDefault2 =  this.genRowTableDetail.filter(r=>r.defaulT_VALUE != null && r.defaulT_VALUE != '' && r.columN_NAME !== cell.column.dataField && r.defaulT_VALUE.includes('[') && r.defaulT_VALUE.includes(']') && !r.defaulT_VALUE.startsWith('='));
    //   arrDefault2.forEach(element => {
    //     let caculate = element.defaulT_VALUE;
    //     let result
    //     if(this.InputMaster)
    //       for (const [key, value] of Object.entries(this.InputMaster)){
    //         if(`[${key}]`==caculate)
    //         result = value
    //       };

    //     this.dataSource[cell.rowIndex][element.columN_NAME] = result;
    //     this.HandleValueChangedOutput.emit({rowIndex:cell.rowIndex,dataField:element.columN_NAME,row:element,value:result,dataSource:this.dataSource});
    //   });
    // }catch{}
    // try{
    //   let objRow = this.dataSource[cell.rowIndex];
    //   if(objRow[row.columN_NAME] && this.genRowTableDetail.filter(r=>r.shoW_REFERENCE==true && r.columN_NAME === row.columN_NAME).length>0)
    //   {
    //     var arrDefault3 = this.genRowTableDetail.filter(r=>(r.editortype === 'Multirow'||r.editortype === 'dxTagBox'||r.editortype === 'dxSelectBox')  && r.reference.includes('{') && r.reference.includes('}'));
    //     arrDefault3.forEach(async element => {
    //       let itemReload =  await this.referenceService.reference_V3_Search(new REFERENCE_V3_Param({
    //         reference:element.reference,
    //         master_data:this.checkAndConvertToObject(objRow)
    //       }) as REFERENCE_V3_Param).toPromise()
    //       element.editoroptions.items = itemReload? itemReload[0].outputData:[]
    //     })
    //   }
    // }catch{}
    this.HandleValueChangedOutput.emit({ rowIndex: cell.rowIndex, dataField: cell.column.dataField, row: row, value: this.dataSource[cell.rowIndex][cell.column.dataField], dataSource: this.dataSource });

    // e.stopPropagation();
  }
  ngOnInit(): void {
    //this.dataGrid.instance.refresh();
    this.onLoadGenRowTableDetail();
  }
  public isObject(variable: any): boolean {
    return typeof variable === 'object' && variable !== null;
  }
  setDataSource(data: any) {
    this.dataSource = data;
    this.UpdateView();
  }
  onLoadGenRowTableDetail() {
    this.BlockUI();
    this.genRowTableService.sYS_GenRowTable_Search({
      ...new SYS_GenRowTable(),
      userID: this.appSession.user.id,
      type: this.type,
      tablE_NAME: this.tableName,
      form: this.editPageState,
      syS_GenRowTable_Detail: [
        new SYS_GenRowTable_Detail({
          displaY_EDIT: true
        } as SYS_GenRowTable_Detail)
      ]
    } as SYS_GenRowTable).subscribe(async (data: SYS_GenRowTable[]) => {
      this.genRowTable = data[0];
      await this.setEditorOptions(this.genRowTable.syS_GenRowTable_Detail);
      this.genRowTableDetail = this.genRowTable.syS_GenRowTable_Detail;
      this.filtercolumn();
      this.UpdateView();
      this.UnBlockUI();
    })
  }
  cellTemplate27(container, options) {
    const noBreakSpace = '\u00A0';
    const text = (options.value || []).map((element) => options.column.lookup.calculateCellValue(element)).join(', ');
    container.textContent = text || noBreakSpace;
    container.title = text;
  }
  cellTemplate(container, options) {
    const noBreakSpace = '\u00A0';
    const text = (options.value || []).map((element) => options.column.lookup.calculateCellValue(element)).join(', ');
    container.textContent = text || noBreakSpace;
    container.title = text;
  }
  cellTemplateNumber(container, options) {
    try {
      const noBreakSpace = '\u00A0';
      const text = options.value.toLocaleString('en-US', { minimumFractionDigits: 2 });
      container.textContent = text || noBreakSpace;
      container.title = text;
      container.style.textAlign = "right"
    } catch (error) {

    }
  }
  cellTemplateDate5(container, options, e) {
    try {
      const noBreakSpace = '\u00A0';
      let format = 'DD/MM/yyyy';
      const text = options.value && moment(options.value).format(format);
      container.textContent = text || noBreakSpace;
      container.title = text;
      container.style.textAlign = "right"
    } catch (error) {

    }
  }
  cellTemplateDate9(container, options, e) {
    try {
      const noBreakSpace = '\u00A0';
      let format = 'DD/MM/yyyy';
      const text = options.value && moment(options.value).format(format);
      container.textContent = text || noBreakSpace;
      container.title = text;
      container.style.textAlign = "right"
    } catch (error) {

    }
  }
  cellTemplateDate11(container, options, e) {
    try {
      const noBreakSpace = '\u00A0';
      let format = '';
      const text = options.value && moment(options.value).format(format);
      container.textContent = text || noBreakSpace;
      container.title = text;
      container.style.textAlign = "right"
    } catch (error) {

    }
  }
  async setEditorOptions(data: SYS_GenRowTable_Detail[]): Promise<void> {
    var dxSelectBoxT = 1;
    var dxTextBoxT = 1;
    var dxNumberBoxT = 1;
    var dxDateBoxT = 1;
    var dxCheckBoxT = 1;
    var dxSwitchT = 1;
    var dxRadioGroupT = 1;
    var dxTextAreaT = 1;
    var dxTagBoxT = 1;
    var dxTextPhoneBoxT = 1;
    var MultirowT = 1;
    for (var i = 0; i < data.length; i++) {
      let dt = data[i];
      switch (dt.editortype) {
        case 'dxTextBox':
          dt.editoroptions = {
            disabled: this.isDisabled ? this.isDisabled : (this.isDisabled ? this.isDisabled : (this.isNew ? false : !dt.alloW_EDIT)),
            width: '100%',
            showClearButton: true,
            stt: dxTextBoxT,
            value: ''
          }
          dxTextBoxT++;
          break;
        case 'dxNumberBox':
          dt.editoroptions = {
            disabled: this.isDisabled ? this.isDisabled : (this.isDisabled ? this.isDisabled : (this.isNew ? false : !dt.alloW_EDIT)),
            width: '100%',
            showClearButton: true,
            stt: dxNumberBoxT
          }
          dxNumberBoxT++;
          break;
        case 'dxDateBox':
          dt.editoroptions = {
            disabled: this.isDisabled ? this.isDisabled : (this.isDisabled ? this.isDisabled : (this.isNew ? false : !dt.alloW_EDIT)),
            width: '100%',
            showClearButton: true,
            stt: dxDateBoxT
          }
          dxDateBoxT++;
          break;
        case 'dxSelectBox':
          let items1 = await this.referenceService.reference_V2_Search(new REFERENCE_ENTITY({
            code: dt.code,
            userID: this.appSession.user.id,
            code_master: this.InputMaster.code,
            user: new User({
              id: this.appSession.user.id,
              username: this.appSession.user.username,
              // password:this.appSession.user.password,
              // confirm_password:this.appSession.user,
              token: new Token({
                value: this.appSession.user.token
              }) as Token,
              avatar: this.appSession.user.avatar,
              firstName: this.appSession.user.firstName,
              lastName: this.appSession.user.lastName,
              roleID: this.appSession.user.roleID,
              roleName: this.appSession.user.roleName,
              languageId: Number(this.appSession.user.language ? this.appSession.user.language : '1'),
              code: this.appSession.user.code,
              branch: this.appSession.user.branch,
              department: this.appSession.user.department,
              title_code: this.appSession.user.title_code,
              position_code: this.appSession.user.position_code,
              level: this.appSession.user.level,
              company_code: this.appSession.user.company_code,
              voucher_year: this.getVoucherDate()
            })
          }) as REFERENCE_ENTITY).toPromise()
          let slbValue = '';

          if (dt.typE_ID == 24) {
            dt.editoroptions = {
              disabled: this.isDisabled ? this.isDisabled : (this.isDisabled ? this.isDisabled : (this.isNew ? false : !dt.alloW_EDIT)),
              width: '100%',
              value: slbValue,
              items: new ArrayStore({
                data: items1[0].outputData,
                key: dt.valueexpr,
              }),
              itemsFilter:new ArrayStore({
                data: items1[0].outputData,
                key: dt.valueexpr,
              }),
              isFilter:false,
              searchEnabled: true,
              showClearButton: true,
              stt: dxSelectBoxT,
              optionWidth: (screen.width * 0.6)
            }
          } else {
            let itemsNo = [];
            if (dt.typE_ID == 27) {
              items1[0].outputData.forEach((data, index) => {
                itemsNo.push({ ...data, no: index + 1 });
              });
            } else itemsNo = items1[0].outputData
            dt.editoroptions = {
              disabled: this.isDisabled ? this.isDisabled : (this.isDisabled ? this.isDisabled : (this.isNew ? false : !dt.alloW_EDIT)),
              width: '100%',
              value: slbValue,
              items: itemsNo,
              itemsFilter:itemsNo,
              isFilter:false,
              searchEnabled: true,
              showClearButton: true,
              stt: dxSelectBoxT,
              optionWidth: (screen.width * 0.6)
            }
          }
          dxSelectBoxT++;
          break;
        case 'dxCheckBox':
          dt.editoroptions = {
            disabled: this.isDisabled ? this.isDisabled : (this.isDisabled ? this.isDisabled : (this.isNew ? false : !dt.alloW_EDIT)),
            width: '100%',
            stt: dxCheckBoxT
          }
          dxCheckBoxT++;
          break;
        case 'dxSwitch':
          dt.editoroptions = {
            disabled: this.isDisabled ? this.isDisabled : (this.isDisabled ? this.isDisabled : (this.isNew ? false : !dt.alloW_EDIT)),
            width: 50,
            stt: dxSwitchT
          }
          dxSwitchT++;
          break;
        case 'dxRadioGroup':
          dt.editoroptions = {
            disabled: this.isDisabled ? this.isDisabled : (this.isDisabled ? this.isDisabled : (this.isNew ? false : !dt.alloW_EDIT)),
            width: '100%',
            stt: dxRadioGroupT
          }
          dxRadioGroupT++;
          break;
        case 'dxTextArea':
          dt.editoroptions = {
            disabled: this.isDisabled ? this.isDisabled : (this.isDisabled ? this.isDisabled : (this.isNew ? false : !dt.alloW_EDIT)),
            width: '100%',
            height: 90,
            maxLength: 200,
            stt: dxTextAreaT
          }
          dxTextAreaT++;
          break;
        case 'dxTagBox':
          let items = await this.referenceService.reference_V2_Search(new REFERENCE_ENTITY({
            code: dt.code,
            userID: this.appSession.user.id,
            code_master: this.InputMaster.code,
            user: new User({
              id: this.appSession.user.id,
              username: this.appSession.user.username,
              // password:this.appSession.user.password,
              // confirm_password:this.appSession.user,
              token: new Token({
                value: this.appSession.user.token
              }) as Token,
              avatar: this.appSession.user.avatar,
              firstName: this.appSession.user.firstName,
              lastName: this.appSession.user.lastName,
              roleID: this.appSession.user.roleID,
              roleName: this.appSession.user.roleName,
              languageId: Number(this.appSession.user.language ? this.appSession.user.language : '1'),
              code: this.appSession.user.code,
              branch: this.appSession.user.branch,
              department: this.appSession.user.department,
              title_code: this.appSession.user.title_code,
              position_code: this.appSession.user.position_code,
              level: this.appSession.user.level,
              company_code: this.appSession.user.company_code,
              voucher_year: this.getVoucherDate()
            })
          }) as REFERENCE_ENTITY).toPromise()
          let value = [];
          let itemsNo = [];
          items[0].outputData.forEach((data, index) => {
            itemsNo.push({ ...data, no: index + 1 });
          });
          // itemsNo.forEach(obj => {
          //   Object.entries(obj).forEach(([key, value]) => {
          //     if (typeof value === 'object') {
          //       obj[key] = null;
          //     }
          //     else if (value) 
          //         if(value.toString().startsWith('ARRAY[') && value.toString().endsWith(']')){
          //           obj[key] = obj[key].toString().replace('ARRAY[','');
          //           let index = obj[key].lastIndexOf(']');
          //           obj[key] = obj[key].slice(0, index).trim().split(';');
          //         }
          //   });
          // })
          dt.editoroptions = {
            disabled: this.isDisabled ? this.isDisabled : (this.isDisabled ? this.isDisabled : (this.isNew ? false : !dt.alloW_EDIT)),
            width: '100%',
            value: value,
            items: itemsNo,
            itemsFilter:itemsNo,
            isFilter:false,
            searchEnabled: true,
            showClearButton: true,
            stt: dxTagBoxT,
            optionWidth: (screen.width * 0.6)
          }
          dxTagBoxT++;
          break;
        case 'dxTextPhoneBox':
          dt.editoroptions = {
            disabled: this.isDisabled ? this.isDisabled : (this.isDisabled ? this.isDisabled : (this.isNew ? false : !dt.alloW_EDIT)),
            width: '100%',
            mask: '+1 (X00) 000-0000',
            maskRules: { X: /[02-9]/ },
            showClearButton: true,
            stt: dxTextPhoneBoxT
          }
          dxTextPhoneBoxT++;
          break;
        case 'Multirow':
          let items2 = await this.referenceService.reference_V2_Search(new REFERENCE_ENTITY({
            code: dt.code,
            userID: this.appSession.user.id,
            code_master: this.InputMaster.code,
            user: new User({
              id: this.appSession.user.id,
              username: this.appSession.user.username,
              // password:this.appSession.user.password,
              // confirm_password:this.appSession.user,
              token: new Token({
                value: this.appSession.user.token
              }) as Token,
              avatar: this.appSession.user.avatar,
              firstName: this.appSession.user.firstName,
              lastName: this.appSession.user.lastName,
              roleID: this.appSession.user.roleID,
              roleName: this.appSession.user.roleName,
              languageId: Number(this.appSession.user.language ? this.appSession.user.language : '1'),
              code: this.appSession.user.code,
              branch: this.appSession.user.branch,
              department: this.appSession.user.department,
              title_code: this.appSession.user.title_code,
              position_code: this.appSession.user.position_code,
              level: this.appSession.user.level,
              company_code: this.appSession.user.company_code,
              voucher_year: this.getVoucherDate()
            })
          }) as REFERENCE_ENTITY).toPromise()
          let value2 = [];
          dt.editoroptions = {
            disabled: this.isDisabled ? this.isDisabled : (this.isDisabled ? this.isDisabled : (this.isNew ? false : !dt.alloW_EDIT)),
            width: '100%',
            items: items2[0].outputData,
            itemsFilter:items2[0].outputData,
            isFilter:false,
            searchEnabled: true,
            showClearButton: true,
            stt: MultirowT
          }
          MultirowT++;
          break;
        default:
          dt.editoroptions = {
            disabled: this.isDisabled ? this.isDisabled : (this.isDisabled ? this.isDisabled : (this.isNew ? false : !dt.alloW_EDIT)),
            width: '100%',
            stt: 1
          }
          break;
      }
    }
    this.genRowTableDetail = data;

    this.isRender = true;
  }
  selectionChanged(data: any) {
    this.selectedItemKeys = data.selectedRowKeys;
  }
  deleteRecords(key: string) {
    this.selectedItemKeys.forEach((itemKey) => {
      this.dataSource = this.dataSource.filter(e => e[key] != itemKey)
      this.HandleDeletedOutput.emit({ key: key, item: itemKey });
    });
    this.dataGrid.instance.refresh();
  }
  AddRecords(key: string) {
    var obj = {};
    obj[this.keyExpr] = this.newID;
    this.dataSource.push(obj);
    this.dataGrid.instance.refresh();
    this.HandleAdddOutput.emit(obj);
  }
  cloneIconClick(e: any, key: string, colName: string) {
    this.selectedItemKeys.forEach((itemKey) => {
      var row1 = {}, row2 = this.dataSource.find(r => r[key] == itemKey);
      let allData = this.InputMaster[colName];
      row1 = allData.find(r => r[key] == itemKey);
      if (allData && row1) {
        for (const [key1, value] of Object.entries(row2)) {
          row2[key1] = row1[key1] ? row1[key1] : row2[key1];
        };
      }

      let rowCopy = { ...row2 };
      rowCopy[key] = this.newID;
      this.dataSource.push(rowCopy);
      this.HandleCopydOutput.emit(rowCopy);
    });
    this.dataGrid.instance.refresh();

  }
  setDataSelectBox24(row: SYS_GenRowTable_Detail, cell: any): string {
    debugger;
    return '';
  }
  changeTextBox2(e: any, cell: any, row: any) {
    if (!this.dataSource[cell.rowIndex]) {
      this.dataSource[cell.rowIndex] = {};
      // this.dataSource[cell.rowIndex][this.keyExpr] = 'NEW-'+Math.random()+(new Date()).getTime();
    }
    this.dataSource[cell.rowIndex][cell.column.dataField] = e.value;
    try {
      var arrDefault = this.genRowTableDetail.filter(r => r.defaulT_VALUE != null && r.defaulT_VALUE != '' && r.columN_NAME !== cell.column.dataField && r.defaulT_VALUE.startsWith('='));
      arrDefault.forEach(element => {
        let objRow = this.dataSource[cell.rowIndex];
        let caculate = element.defaulT_VALUE;

        for (const [key, value] of Object.entries(objRow)) {
          caculate = caculate.replace(`{${key}}`, `${value}`);
        };
        if (this.InputMaster)
          for (const [key, value] of Object.entries(this.InputMaster)) {
            caculate = caculate.replace(`[${key}]`, `${value}`);
          };
        caculate = caculate.replace(`=`, ``);
        try {
          let result = eval(caculate);
          this.dataSource[cell.rowIndex][element.columN_NAME] = result;
          this.dataGrid.instance.refresh();
          this.HandleValueChangedOutput.emit({ rowIndex: cell.rowIndex, dataField: element.columN_NAME, row: element, value: result, dataSource: this.dataSource });

        } catch { }
       
      });
    } catch { }

    try {
      var arrDefault2 = this.genRowTableDetail.filter(r => r.defaulT_VALUE != null && r.defaulT_VALUE != '' && r.columN_NAME !== cell.column.dataField && r.defaulT_VALUE.includes('[') && r.defaulT_VALUE.includes(']') && !r.defaulT_VALUE.startsWith('='));
      arrDefault2.forEach(element => {
        let caculate = element.defaulT_VALUE;
        let result
        if (this.InputMaster)
          for (const [key, value] of Object.entries(this.InputMaster)) {
            if (`[${key}]` == caculate)
              result = value
          };
        if (this.dataSource[cell.rowIndex][element.columN_NAME] === undefined || this.dataSource[cell.rowIndex][element.columN_NAME] === null) {
          if(element.typE_ID == 27 || element.typE_ID == 28)result= result.split(';')
          this.dataSource[cell.rowIndex][element.columN_NAME] = result;
          this.dataGrid.instance.refresh();
          this.HandleValueChangedOutput.emit({ rowIndex: cell.rowIndex, dataField: element.columN_NAME, row: element, value: result, dataSource: this.dataSource });
        }
      });
    } catch { }

    try {
      let objRow = this.dataSource[cell.rowIndex];
      if (objRow[row.columN_NAME] && this.genRowTableDetail.filter(r => r.shoW_REFERENCE == true && r.columN_NAME === row.columN_NAME).length > 0) {
        var arrDefault3 = this.genRowTableDetail.filter(r => (r.editortype === 'Multirow' || r.editortype === 'dxTagBox' || r.editortype === 'dxSelectBox') && r.reference.includes('{') && r.reference.includes('}'));
        arrDefault3.forEach(async element => {
          let itemReload = await this.referenceService.reference_V3_Search(new REFERENCE_V3_Param({
            reference: element.reference,
            master_data: this.checkAndConvertToObject(objRow)
          }) as REFERENCE_V3_Param).toPromise()
          element.editoroptions.itemsFilter = itemReload ? itemReload[0].outputData : []
          element.editoroptions.isFilter = true;
        })
      }
    } catch { }

    this.HandleValueChangedOutput.emit({ rowIndex: cell.rowIndex, dataField: cell.column.dataField, row: row, value: this.dataSource[cell.rowIndex][cell.column.dataField], dataSource: this.dataSource });

  }
  changeCheckBox23(e: any, cell: any, row: any) {
    if (!this.dataSource[cell.rowIndex]) {
      this.dataSource[cell.rowIndex] = {};
      // this.dataSource[cell.rowIndex][this.keyExpr] = 'NEW-'+Math.random()+(new Date()).getTime();
    }
    this.dataSource[cell.rowIndex][cell.column.dataField] = e.value;
    try {
      var arrDefault = this.genRowTableDetail.filter(r => r.defaulT_VALUE != null && r.defaulT_VALUE != '' && r.columN_NAME !== cell.column.dataField && r.defaulT_VALUE.startsWith('='));
      arrDefault.forEach(element => {
        let objRow = this.dataSource[cell.rowIndex];
        let caculate = element.defaulT_VALUE;

        for (const [key, value] of Object.entries(objRow)) {
          caculate = caculate.replace(`{${key}}`, `${value}`);
        };
        if (this.InputMaster)
          for (const [key, value] of Object.entries(this.InputMaster)) {
            caculate = caculate.replace(`[${key}]`, `${value}`);
          };
        caculate = caculate.replace(`=`, ``);
        try {
          let result = eval(caculate);

          this.dataSource[cell.rowIndex][element.columN_NAME] = result;
          this.dataGrid.instance.refresh();
          this.HandleValueChangedOutput.emit({ rowIndex: cell.rowIndex, dataField: element.columN_NAME, row: element, value: result, dataSource: this.dataSource });

        } catch { }

      });
    } catch { }
    try {
      var arrDefault2 = this.genRowTableDetail.filter(r => r.defaulT_VALUE != null && r.defaulT_VALUE != '' && r.columN_NAME !== cell.column.dataField && r.defaulT_VALUE.includes('[') && r.defaulT_VALUE.includes(']') && !r.defaulT_VALUE.startsWith('='));
      arrDefault2.forEach(element => {
        let caculate = element.defaulT_VALUE;
        let result
        if (this.InputMaster)
          for (const [key, value] of Object.entries(this.InputMaster)) {
            if (`[${key}]` == caculate)
              result = value
          };
        if (this.dataSource[cell.rowIndex][element.columN_NAME] === undefined || this.dataSource[cell.rowIndex][element.columN_NAME] === null) {
          if(element.typE_ID == 27 || element.typE_ID == 28)result= result.split(';')
          this.dataSource[cell.rowIndex][element.columN_NAME] = result;
          this.dataGrid.instance.refresh();
          this.HandleValueChangedOutput.emit({ rowIndex: cell.rowIndex, dataField: element.columN_NAME, row: element, value: result, dataSource: this.dataSource });
        }
      });
    } catch { }
    try {
      let objRow = this.dataSource[cell.rowIndex];
      if (objRow[row.columN_NAME] && this.genRowTableDetail.filter(r => r.shoW_REFERENCE == true && r.columN_NAME === row.columN_NAME).length > 0) {
        var arrDefault3 = this.genRowTableDetail.filter(r => (r.editortype === 'Multirow' || r.editortype === 'dxTagBox' || r.editortype === 'dxSelectBox') && r.reference.includes('{') && r.reference.includes('}'));
        arrDefault3.forEach(async element => {
          let itemReload = await this.referenceService.reference_V3_Search(new REFERENCE_V3_Param({
            reference: element.reference,
            master_data: this.checkAndConvertToObject(objRow)
          }) as REFERENCE_V3_Param).toPromise()
          element.editoroptions.itemsFilter = itemReload ? itemReload[0].outputData : []
          element.editoroptions.isFilter = true;
        })
      }
    } catch { }
    this.HandleValueChangedOutput.emit({ rowIndex: cell.rowIndex, dataField: cell.column.dataField, row: row, value: this.dataSource[cell.rowIndex][cell.column.dataField], dataSource: this.dataSource });
    this.dataGrid.instance.refresh();
  }
  handleValueChangedDate(e: any, cell: any, row: any) {
    this.dataSource[cell.rowIndex][cell.column.dataField] = e;
    this.HandleValueChangedOutput.emit({ rowIndex: cell.rowIndex, dataField: cell.column.dataField, row: row, value: e, dataSource: this.dataSource });
  }
  changeNumberBox1(e: any, cell: any, row: any) {
    if (!this.dataSource[cell.rowIndex]) {
      this.dataSource[cell.rowIndex] = {};
      // this.dataSource[cell.rowIndex][this.keyExpr] = 'NEW-'+Math.random()+(new Date()).getTime();
    }
    this.dataSource[cell.rowIndex][cell.column.dataField] = e.value;
    try {
      var arrDefault = this.genRowTableDetail.filter(r => r.defaulT_VALUE != null && r.defaulT_VALUE != '' && r.columN_NAME !== cell.column.dataField && r.defaulT_VALUE.startsWith('='));
      arrDefault.forEach(element => {
        let objRow = this.dataSource[cell.rowIndex];
        let caculate = element.defaulT_VALUE;

        for (const [key, value] of Object.entries(objRow)) {
          if (caculate.includes(`{${key}}`)) {
            caculate = this.replaceAsync('{'+key+'}',`${value}`,caculate);
          }
        };
        if (this.InputMaster)
          for (const [key, value] of Object.entries(this.InputMaster)) {
            if (caculate.includes(`[${key}]`)) {
              caculate = this.replaceAsync('['+key+']',`${value}`,caculate);
            }
          };
        caculate = caculate.replace(`=`, ``);
        try {
          let result = eval(caculate);

          this.dataSource[cell.rowIndex][element.columN_NAME] = result;
          this.dataGrid.instance.refresh();
          this.HandleValueChangedOutput.emit({ rowIndex: cell.rowIndex, dataField: element.columN_NAME, row: element, value: result, dataSource: this.dataSource });

        } catch { }
       
      });
    } catch { }
    try {
      var arrDefault2 = this.genRowTableDetail.filter(r => r.defaulT_VALUE != null && r.defaulT_VALUE != '' && r.columN_NAME !== cell.column.dataField && r.defaulT_VALUE.includes('[') && r.defaulT_VALUE.includes(']') && !r.defaulT_VALUE.startsWith('='));
      arrDefault2.forEach(element => {
        let caculate = element.defaulT_VALUE;
        let result
        if (this.InputMaster)
          for (const [key, value] of Object.entries(this.InputMaster)) {
            if (`[${key}]` == caculate)
              result = value
          };
        if (this.dataSource[cell.rowIndex][element.columN_NAME] === undefined || this.dataSource[cell.rowIndex][element.columN_NAME] === null) {
          if(element.typE_ID == 27 || element.typE_ID == 28)result= result.split(';')
          this.dataSource[cell.rowIndex][element.columN_NAME] = result;
          this.dataGrid.instance.refresh();
          this.HandleValueChangedOutput.emit({ rowIndex: cell.rowIndex, dataField: element.columN_NAME, row: element, value: result, dataSource: this.dataSource });
        }
      });
    } catch { }
    try {
      let objRow = this.dataSource[cell.rowIndex];
      if (objRow[row.columN_NAME] && this.genRowTableDetail.filter(r => r.shoW_REFERENCE == true && r.columN_NAME === row.columN_NAME).length > 0) {
        var arrDefault3 = this.genRowTableDetail.filter(r => (r.editortype === 'Multirow' || r.editortype === 'dxTagBox' || r.editortype === 'dxSelectBox') && r.reference.includes('{') && r.reference.includes('}'));
        arrDefault3.forEach(async element => {
          let itemReload = await this.referenceService.reference_V3_Search(new REFERENCE_V3_Param({
            reference: element.reference,
            master_data: this.checkAndConvertToObject(objRow)
          }) as REFERENCE_V3_Param).toPromise()
          element.editoroptions.itemsFilter = itemReload ? itemReload[0].outputData : []
          element.editoroptions.isFilter = true;
        })
      }
    } catch { }
    this.HandleValueChangedOutput.emit({ rowIndex: cell.rowIndex, dataField: cell.column.dataField, row: row, value: this.dataSource[cell.rowIndex][cell.column.dataField], dataSource: this.dataSource });

  }
  changeTextAreaBox17(e: any, cell: any, row: any) {
    if (!this.dataSource[cell.rowIndex]) {
      this.dataSource[cell.rowIndex] = {};
      // this.dataSource[cell.rowIndex][this.keyExpr] = 'NEW-'+Math.random()+(new Date()).getTime();
    }
    this.dataSource[cell.rowIndex][cell.column.dataField] = e.value;
    try {
      var arrDefault = this.genRowTableDetail.filter(r => r.defaulT_VALUE != null && r.defaulT_VALUE != '' && r.columN_NAME !== cell.column.dataField && r.defaulT_VALUE.startsWith('='));
      arrDefault.forEach(element => {
        let objRow = this.dataSource[cell.rowIndex];
        let caculate = element.defaulT_VALUE;

        for (const [key, value] of Object.entries(objRow)) {
          caculate = caculate.replace(`{${key}}`, `${value}`);
        };
        if (this.InputMaster)
          for (const [key, value] of Object.entries(this.InputMaster)) {
            caculate = caculate.replace(`[${key}]`, `${value}`);
          };
        caculate = caculate.replace(`=`, ``);
        try {
          let result = eval(caculate);

          this.dataSource[cell.rowIndex][element.columN_NAME] = result;
          this.dataGrid.instance.refresh();
          this.HandleValueChangedOutput.emit({ rowIndex: cell.rowIndex, dataField: element.columN_NAME, row: element, value: result, dataSource: this.dataSource });

        } catch { }

      });
    } catch { }
    try {
      var arrDefault2 = this.genRowTableDetail.filter(r => r.defaulT_VALUE != null && r.defaulT_VALUE != '' && r.columN_NAME !== cell.column.dataField && r.defaulT_VALUE.includes('[') && r.defaulT_VALUE.includes(']') && !r.defaulT_VALUE.startsWith('='));
      arrDefault2.forEach(element => {
        let caculate = element.defaulT_VALUE;
        let result
        if (this.InputMaster)
          for (const [key, value] of Object.entries(this.InputMaster)) {
            if (`[${key}]` == caculate)
              result = value
          };
        if (this.dataSource[cell.rowIndex][element.columN_NAME] === undefined || this.dataSource[cell.rowIndex][element.columN_NAME] === null) {
          if(element.typE_ID == 27 || element.typE_ID == 28)result= result.split(';')
          this.dataSource[cell.rowIndex][element.columN_NAME] = result;
          this.dataGrid.instance.refresh();
          this.HandleValueChangedOutput.emit({ rowIndex: cell.rowIndex, dataField: element.columN_NAME, row: element, value: result, dataSource: this.dataSource });
        }
      });
    } catch { }
    try {
      let objRow = this.dataSource[cell.rowIndex];
      if (objRow[row.columN_NAME] && this.genRowTableDetail.filter(r => r.shoW_REFERENCE == true && r.columN_NAME === row.columN_NAME).length > 0) {
        var arrDefault3 = this.genRowTableDetail.filter(r => (r.editortype === 'Multirow' || r.editortype === 'dxTagBox' || r.editortype === 'dxSelectBox') && r.reference.includes('{') && r.reference.includes('}'));
        arrDefault3.forEach(async element => {
          let itemReload = await this.referenceService.reference_V3_Search(new REFERENCE_V3_Param({
            reference: element.reference,
            master_data: this.checkAndConvertToObject(objRow)
          }) as REFERENCE_V3_Param).toPromise()
          element.editoroptions.itemsFilter = itemReload ? itemReload[0].outputData : []
          element.editoroptions.isFilter = true;
        })
      }
    } catch { }
    this.HandleValueChangedOutput.emit({ rowIndex: cell.rowIndex, dataField: cell.column.dataField, row: row, value: this.dataSource[cell.rowIndex][cell.column.dataField], dataSource: this.dataSource });

  }
  changeSelectBox24(e: any, cell: any, row: any) {
    if (!this.dataSource[cell.rowIndex]) {
      this.dataSource[cell.rowIndex] = {};
    }
    this.dataSource[cell.rowIndex][cell.column.dataField] = e.value;
    try {
      var arrDefault = this.genRowTableDetail.filter(r => r.defaulT_VALUE != null && r.defaulT_VALUE != '' && r.columN_NAME !== cell.column.dataField && r.defaulT_VALUE.startsWith('='));
      arrDefault.forEach(element => {
        let objRow = this.dataSource[cell.rowIndex];
        let caculate = element.defaulT_VALUE;

        for (const [key, value] of Object.entries(objRow)) {
          caculate = caculate.replace(`{${key}}`, `${value}`);
        };
        if (this.InputMaster)
          for (const [key, value] of Object.entries(this.InputMaster)) {
            caculate = caculate.replace(`[${key}]`, `${value}`);
          };
        caculate = caculate.replace(`=`, ``);
        try {
          let result = eval(caculate);

          this.dataSource[cell.rowIndex][element.columN_NAME] = result;
          this.dataGrid.instance.refresh();
          this.HandleValueChangedOutput.emit({ rowIndex: cell.rowIndex, dataField: element.columN_NAME, row: element, value: result, dataSource: this.dataSource });

        } catch { }

      });
    } catch { }
    try {
      var arrDefault2 = this.genRowTableDetail.filter(r => r.defaulT_VALUE != null && r.defaulT_VALUE != '' && r.columN_NAME !== cell.column.dataField && r.defaulT_VALUE.includes('[') && r.defaulT_VALUE.includes(']') && !r.defaulT_VALUE.startsWith('='));
      arrDefault2.forEach(element => {
        let caculate = element.defaulT_VALUE;
        let result
        if (this.InputMaster)
          for (const [key, value] of Object.entries(this.InputMaster)) {
            if (`[${key}]` == caculate)
              result = value
          };
        if (this.dataSource[cell.rowIndex][element.columN_NAME] === undefined || this.dataSource[cell.rowIndex][element.columN_NAME] === null) {
          if(element.typE_ID == 27 || element.typE_ID == 28)result= result.split(';')
          this.dataSource[cell.rowIndex][element.columN_NAME] = result;
          this.dataGrid.instance.refresh();
          this.HandleValueChangedOutput.emit({ rowIndex: cell.rowIndex, dataField: element.columN_NAME, row: element, value: result, dataSource: this.dataSource });
        }
      });
    } catch { }
    try {
      let objRow = this.dataSource[cell.rowIndex];
      if (objRow[row.columN_NAME] && this.genRowTableDetail.filter(r => r.shoW_REFERENCE == true && r.columN_NAME === row.columN_NAME).length > 0) {
        var arrDefault3 = this.genRowTableDetail.filter(r => (r.editortype === 'Multirow' || r.editortype === 'dxTagBox' || r.editortype === 'dxSelectBox') && r.reference.includes('{') && r.reference.includes('}'));
        arrDefault3.forEach(async element => {
          let itemReload = await this.referenceService.reference_V3_Search(new REFERENCE_V3_Param({
            reference: element.reference,
            master_data: this.checkAndConvertToObject(objRow)
          }) as REFERENCE_V3_Param).toPromise()
          element.editoroptions.itemsFilter = itemReload ? itemReload[0].outputData : []
          element.editoroptions.isFilter = true;
        })
      }
    } catch { }
    this.HandleValueChangedOutput.emit({ rowIndex: cell.rowIndex, dataField: cell.column.dataField, row: row, value: this.dataSource[cell.rowIndex][cell.column.dataField], dataSource: this.dataSource });

  }
  onSelectRowGridDropdown(event: any, cell: any, column: SYS_GenRowTable_Detail) {
    this.arrayValueDropDown = event;
  }
  onSelectRowGridDropdown2(event: any, cell: any, column: SYS_GenRowTable_Detail) {
    this.arrayValueDropDownSelected = event;
    if (column.typE_ID == 27 && event.length > 0) {
      this.onSaveDropDownOption(event, cell, null, null, column)
      this.isDropBoxOpened = false;
    }
    this.selectedRowsGridDataOutput.emit({event:event,cell:cell});
  }
}
