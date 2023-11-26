import {
  NgModule, Component, Pipe, PipeTransform, enableProdMode, OnInit, Injector, Input, Output, EventEmitter, ViewChild,
} from '@angular/core';
import { saveAs } from 'file-saver-es';
import themes from 'devextreme/ui/themes';
import { DatePipe } from '@angular/common';
import { Workbook } from 'exceljs';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { jsPDF } from 'jspdf';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { Location } from '@angular/common';
import { EmployeeService, ExportAPIService, GenRowTableService, HRM_Employee_ENTITY, ReportViewerService, SYS_GenRowTable, SYS_GenRowTable_Detail, SYS_Menu, SYS_Report_Infomation_Detail_ENTITY, SYS_Report_Infomation_Detail_Signature_Employee_ENTITY, SYS_Report_Infomation_Detail_Signature_ENTITY, SYS_Report_Infomation_ENTITY, SYS_Report_Infomation_Version_ENTITY } from '../../service-proxies/api-shared';
import { LayoutComponentBase } from '../../layout/layoutBase';
import { AppSession } from '../../app-session/app-session';
import { EditPageState } from '../../ultilities/enum/edit-page-state';
import moment, { Moment } from 'moment';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import { AppConsts } from 'src/app/app-consts.component';

@Component({
  selector: 'osoft-data-grid',
  templateUrl: './dx-data-grid-view.component.html',
  styleUrls: ['./dx-data-grid-view.component.css'],
})
export class DXDataGridViewComponent extends LayoutComponentBase implements OnInit {
  allMode: string;
  checkBoxesMode: string;
  currentFilter: any;
  applyFilterTypes: any;
  saleAmountHeaderFilter: any;
  showHeaderFilter: boolean;
  menu:SYS_Menu = new SYS_Menu()
  menuCode:string='';
  genRowTable:SYS_GenRowTable=new SYS_GenRowTable();
  genRowTableDetail: SYS_GenRowTable_Detail[] = [];
  genRowTableDetailFilter: SYS_GenRowTable_Detail[] = [];
  dataFilter:object={};
  now:moment.Moment =moment();
  popupVisible = false;
  popupSetupVisible = false;
  popupSetupReportVisible = false;
  saveButtonOptions: any;
  editButtonOptions: any;
  editReportButtonOptions:any;
  @Input() dataSource:any[]=[];
  @Input() dataSourceFilter:any[]=[];
  @Input() currentSelectedRowKeys:any[]=[];
  @Input() type:string=null;
  @Input() tableName:string=null;
  @Input() height:number=null;
  @Input() selection:Boolean=true;
  @Input() editing:Boolean=false;
  @Input() isFilter:Boolean=false;
  @Input() isShowComponentFilter:Boolean=false;
  @Input() showFilterRow:Boolean=false;
  @Input() keyExpr:string='code';
  @Input() tbName:string='';
  @Output() OnSelectRow: EventEmitter<any> = new EventEmitter();
  @Output() selectedRowsDataOutput: EventEmitter<any> = new EventEmitter();
  @Output() onClickOK: EventEmitter<any> = new EventEmitter();
  @Output() onClickCancel: EventEmitter<any> = new EventEmitter();
  @Output() OnSelectAllRow: EventEmitter<any> = new EventEmitter();
  @Output() OnChangeDataFilter: EventEmitter<any> = new EventEmitter();
  @Input() editPageState: string = EditPageState.view;
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;
  listEmployeeAll: HRM_Employee_ENTITY[]=[]
  listEmployee: SYS_Report_Infomation_Detail_Signature_ENTITY[]=[]
  signItemReportSelected: SYS_Report_Infomation_Detail_Signature_ENTITY=new SYS_Report_Infomation_Detail_Signature_ENTITY();
  listVersionReport:SYS_Report_Infomation_Version_ENTITY[]=[];
  listSign: SYS_Report_Infomation_Detail_Signature_ENTITY[]=[];
  dataSourceTemplate:SYS_Report_Infomation_ENTITY[]=[];
  selectedItem:any;
  selectedTypeItem:any;
  selectedPositionSign:any;
  listTypeReport:any[]=[{
    ID:1,
    Name:'.xlsx'
  },{
    ID:2,
    Name:'.pdf'
  },{
    ID:2,
    Name:'.doc'
  }]
  listPositionSign:any[]=[{
    ID:1,
    Name:this.translate('Trái','Left')
  },{
    ID:2,
    Name:this.translate('Giữa','Center')
  },{
    ID:3,
    Name:this.translate('Phải','Right')
  }]
  listTemplateReport: any[]=[];
  rowReportSelected:SYS_Report_Infomation_ENTITY = new SYS_Report_Infomation_ENTITY();
  companies:any[]=[{id:0,text:this.translate('Click để lọc dữ liệu','Click for filter')}]
  listTypeDateFilter:any[] = [
    {
      id:1,
      text:this.appSession.user.language_id == 1?'Theo ngày':'Day'
    },
    {
      id:2,
      text:this.appSession.user.language_id == 1?'Theo Tuần':'Week'
    },
    {
      id:3,
      text:this.appSession.user.language_id == 1?'Theo Tháng':'Month'
    },
    {
      id:4,
      text:this.appSession.user.language_id == 1?'Theo Quý':'  Quarter'
    },
    {
      id:5,
      text:this.appSession.user.language_id == 1?'Theo 6 tháng đầu năm':'The first six months of the year'
    },
    {
      id:6,
      text:this.appSession.user.language_id == 1?'Theo 6 tháng cuối năm':'The last six months of the year'
    },
    {
      id:7,
      text:this.appSession.user.language_id == 1?'Theo Năm':'Year'
    }
  ]
  defaultDateFilter:number = 1;
  filterDateFrom:moment.Moment = moment();
  filterDateTo:moment.Moment = moment();
  fileData: any;

  constructor(
    injector: Injector,
    private appSession: AppSession,
    private genRowTableService: GenRowTableService,
    private employeeService: EmployeeService,
    private exportAPIService: ExportAPIService,
    private reportViewerService: ReportViewerService,
    ) {
    super(injector);
    this.allMode = 'allPages';
    this.showHeaderFilter = true;
    this.checkBoxesMode = themes.current().startsWith('material') ? 'always' : 'onClick';
    this.applyFilterTypes = [{
      key: 'auto',
      name: 'Immediately',
    }, {
      key: 'onClick',
      name: 'On Button Click',
    }];
    this.currentFilter = this.applyFilterTypes[0].key;
    this.orderHeaderFilter = this.orderHeaderFilter.bind(this);

    this.editPageState = this.getRouteData('editPageState');
    this.saveButtonOptions = {
      icon: 'save',
      text: this.translate('Lưu','Save'),
      onClick(e) {
        debugger       
      },
    };
    this.editReportButtonOptions = {
      icon: 'save',
      text: this.translate('Lưu','Save'),
      onClick(e) {
        debugger       
      },
    };
    this.editButtonOptions = {
      icon: 'edit',
      text: this.translate('Chỉnh sửa','Edit'),
      onClick(e) {
        this.btnPopupSetupReportClick();
      },
    };
  }
  saveSignReport(e){
    debugger
  }
  onReportPreview(e){
    this.reportViewerService.getFile().subscribe((data:any)=>{
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.fileData = e.target.result;
      };
      reader.readAsDataURL(new Blob([data]));
    })
  }
  onDisposing(e){
    this.signItemReportSelected = e.itemData;
    this.signItemReportSelected.from_index = e.itemIndex+1;
    var empInfo = this.listEmployeeAll.find(em=>em.code == this.signItemReportSelected.employee_code)
    var siInfo = this.listSign[e.itemIndex];
    this.signItemReportSelected.employee_info = new SYS_Report_Infomation_Detail_Signature_Employee_ENTITY();
    this.signItemReportSelected.employee_info.role_name = siInfo.role_name?siInfo.role_name: empInfo.title_name;
    this.signItemReportSelected.employee_info.sub_role_name =siInfo.sub_role_name?siInfo.sub_role_name:empInfo.sub_sign_title_name;
    this.signItemReportSelected.employee_info.default_sign = AppConsts.baseUrl+ empInfo.signature;
    this.signItemReportSelected.employee_info.full_name =siInfo.show_sign_fullname?siInfo.show_sign_fullname: empInfo.fullName;
  }
  onDragStart(e) {
    e.itemData = e.fromData[e.fromIndex];
    this.signItemReportSelected = new SYS_Report_Infomation_Detail_Signature_ENTITY();
  }

  public onAdd(e:any) {
    e.toData.splice(e.toIndex, 0, e.itemData);
    this.signItemReportSelected = new SYS_Report_Infomation_Detail_Signature_ENTITY();
  }

  public onRemove(e:any) {
    e.fromData.splice(e.fromIndex, 1);
    this.signItemReportSelected = new SYS_Report_Infomation_Detail_Signature_ENTITY();
  }
  saveReportDetail(){
    for(var i = 1 ; i <= this.listSign.length; i++)
      {
        this.listSign[i-1].from_index = i;
      }
    
    this.rowReportSelected.sYS_Report_Infomation_Details[0].sYS_Report_Infomation_Detail_Signatures = this.listSign
    this.BlockUI()
    this.exportAPIService.sYS_Report_Infomation_Update(this.rowReportSelected).subscribe(res=>{
      this.showMessage(res.message,res.status)
      this.popupSetupReportVisible = false;
      this.btnExportClick();
      this.UpdateView();
      this.UnBlockUI()
    })
  }
  onReorder(e:any) {
    // this.onRemove(e);
    // this.onAdd(e);
    e.fromData.splice(e.fromIndex, 1);
    e.toData.splice(e.toIndex, 0, e.itemData);
  }
  onchangeFilter(e:any,rows:SYS_GenRowTable_Detail,colName:string){
    // switch(rows.typE_ID){
    //   case 5:
    //   case 9:
    //   case 10:
    //   case 11:

    //     break;
    // }
    this.dataFilter[colName]=e.value;
    this.OnChangeDataFilter.emit({colName:rows.columN_NAME,data:this.dataFilter})
  }
  cellTemplate(container, options) {
      const noBreakSpace = '\u00A0';
      let text = '';
      try{
        text = (options.value || []).map((element) => options.column.lookup.calculateCellValue(element)).join(', ');
      }catch{
        text = options.value;
      }
      container.textContent = text || noBreakSpace;
      container.title = text;
  }
  cellTemplateNumber(container, options){
    try {
      const noBreakSpace = '\u00A0';
      let text = options.value.toLocaleString('en-US', { minimumFractionDigits: 2 });
      if(typeof options.value === 'object'){
        text = noBreakSpace
      }
      container.textContent = text || noBreakSpace;
      container.title = text;
    } catch (error) {
      
    }
  }
  cellTemplateDate5(container, options,e){
    try {
      const noBreakSpace = '\u00A0';
      let format =  'DD/MM/yyyy';
      const text = options.value && moment(options.value).format(format);
      container.textContent = text || noBreakSpace;
      container.title = text;
      container.style.textAlign = "right"
    } catch (error) {
      
    }
  }
  cellTemplateDate9(container, options,e){
    try {
      const noBreakSpace = '\u00A0';
      let format = 'DD/MM/yyyy hh:mm';
      const text = options.value && moment(options.value).format(format);
      container.textContent = text || noBreakSpace;
      container.title = text;
      container.style.textAlign = "right"
    } catch (error) {
      
    }
  }
  cellTemplateDate11(container, options,e){
    try {
      const noBreakSpace = '\u00A0';
      let format = 'HH:mm';
      const text = options.value && moment(options.value).format(format);
      container.textContent = text || noBreakSpace;
      container.title = text;
      container.style.textAlign = "right"
    } catch (error) {
      
    }
  }
  customizeDate(data) {
    return `First: ${new DatePipe('en-US').transform(data.value, 'MMM dd, yyyy')}`;
  }
  calculateCellValue(data) {
    return [data.Title, data.FirstName, data.LastName].join(' ');
  }
  onSelectRow(e:any) {
    this.currentSelectedRowKeys = e.selectedRowKeys;
    this.OnSelectRow.emit(e.currentSelectedRowKeys);
    this.OnSelectAllRow.emit(e.selectedRowKeys);
    this.selectedRowsDataOutput.emit(e.selectedRowsData);
  }
  ngOnInit(): void {
    // this.dataGrid.instance.refresh();
    this.onLoadGenRowTableDetail();
  }
  setDataSource(data:any){
    this.dataSource = data;
    // if(this.dataSource && this.dataSource.length > 0)
    //   this.dataSource.forEach((data, index)=>{data['no'] = (index+1)})
    this.UpdateView();
  }
  onClickBtnOK(){
    this.onClickOK.emit()
  }
  onClickBtnCancel(){
    this.onClickCancel.emit()
  }
  onChangeTypeFilterDate(e:any,rows:SYS_GenRowTable_Detail,colName:string){
    //this.defaultDateFilter = e.value;
    switch(e.value){
      case 1:
        const now = new Date();
        this.filterDateFrom = this.convertMomentToMomentUTC(now,0,0,0,1);
        this.filterDateFrom = this.convertMomentToMomentUTC(this.filterDateFrom,23,59,59,0);
      break;
      case 2:
        const currentDate = new Date();
        const currentDay = currentDate.getDay();
        
        // Calculate the start date of the week (Sunday)
        currentDate.setDate(currentDate.getDate() - currentDay);
        const startDate = new Date(currentDate);
        
        // Calculate the end date of the week (Saturday)
        currentDate.setDate(currentDate.getDate() + 6);
        const endDate = new Date(currentDate);
        this.filterDateFrom = this.convertDateToMomentUTC(startDate,0,0,0,1);
        this.filterDateTo= this.convertDateToMomentUTC(endDate,23,59,59,0);
      break;
      case 3:
       // Example usage:
        const today = new Date(); // Current date
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth() + 1; // Note: Months are zero-based, so we add 1.
        const startDateM = new Date(currentYear, currentMonth - 1, 1);
  
        // Create a Date object for the last day of the given month
        // To do this, we go to the next month's first day and subtract one day
        const endDateM = new Date(currentYear, currentMonth, 0);
        this.filterDateFrom = this.convertDateToMomentUTC(startDateM,0,0,0,1);
        this.filterDateTo= this.convertDateToMomentUTC(endDateM,23,59,59,0);
      break;
      case 4:
        const currentDateQ = new Date(); // You can pass any date as input
        const quarterDates = this.getQuarterDates(currentDate);
        this.filterDateFrom = this.convertDateToMomentUTC(quarterDates.startDate,0,0,0,1);
        this.filterDateTo= this.convertDateToMomentUTC(quarterDates.endDate,23,59,59,0);
      break;
      case 5:
        const year = (new Date()).getFullYear(); // Replace with the desired year
        const { startDateF6, endDateF6 } = this.getFirstSixMonthsDates(year);
        this.filterDateFrom = this.convertDateToMomentUTC(startDateF6,0,0,0,1);
        this.filterDateTo= this.convertDateToMomentUTC(endDateF6,23,59,59,0);
      break;
      case 6:
        const { startDateL6, endDateL6 } = this.getLastSixMonthsDates();
        this.filterDateFrom = this.convertDateToMomentUTC(startDateL6,0,0,0,1);
        this.filterDateTo= this.convertDateToMomentUTC(endDateL6,23,59,59,0);
      break;
      case 7:
        const year1 = (new Date()).getFullYear();
        const s = new Date(year1,1,1)
        const e = new Date(year1,12,31)
        this.filterDateFrom = this.convertDateToMomentUTC(s,0,0,0,1);
        this.filterDateTo= this.convertDateToMomentUTC(e,23,59,59,0);
      break;
    }
    this.dataFilter[rows.columN_NAME+'_start'] = this.filterDateFrom;
    this.dataFilter[rows.columN_NAME+'_end'] = this.filterDateTo;
    this.OnChangeDataFilter.emit({colName:rows.columN_NAME,data:this.dataFilter})
  }
  getQuarterDates(inputDate: Date): { startDate: Date; endDate: Date } {
    const year = inputDate.getFullYear();
    const month = inputDate.getMonth();
  
    let quarterStartMonth: number;
    let quarterEndMonth: number;
  
    if (month >= 0 && month <= 2) {
      // First quarter (Q1): January 1 - March 31
      quarterStartMonth = 0;
      quarterEndMonth = 2;
    } else if (month >= 3 && month <= 5) {
      // Second quarter (Q2): April 1 - June 30
      quarterStartMonth = 3;
      quarterEndMonth = 5;
    } else if (month >= 6 && month <= 8) {
      // Third quarter (Q3): July 1 - September 30
      quarterStartMonth = 6;
      quarterEndMonth = 8;
    } else {
      // Fourth quarter (Q4): October 1 - December 31
      quarterStartMonth = 9;
      quarterEndMonth = 11;
    }
  
    const startDate = new Date(year, quarterStartMonth, 1);
    const endDate = new Date(year, quarterEndMonth + 1, 0);
  
    return { startDate, endDate };
  }
  getFirstSixMonthsDates(year: number): { startDateF6: Date, endDateF6: Date } {
    const startDateF6 = new Date(year, 0, 1); // January is month 0
    const endDateF6 = new Date(year, 5, 30); // June is month 5 (0-based), assuming a non-leap year
    
    // Add one day to the end date to make it inclusive of the entire last day of June
    endDateF6.setDate(endDateF6.getDate() + 1);
    
    return { startDateF6, endDateF6 };
  }
  getLastSixMonthsDates(): { startDateL6: Date, endDateL6: Date } {
    const today = new Date();
    const year = today.getFullYear();
  
    // Calculate the start date of the last six months
    const startMonth = today.getMonth() - 5; // Subtract 5 to go back 6 months
    const startDateL6 = new Date(year, startMonth, 1);
  
    // Calculate the end date of the last six months
    const endDateL6 = new Date(year, today.getMonth() + 1, 0);
  
    return { startDateL6, endDateL6 };
  }
  getDataFilter(colName:string):any{
    return this.dataFilter[colName]?this.dataFilter[colName]:null;
  }
  getColumnPositionName(columnNumber):string {
    let columnName = '';
    while (columnNumber > 0) {
      const remainder = (columnNumber - 1) % 26; // Subtract 1 to make it 0-based
      columnName = String.fromCharCode(65 + remainder) + columnName;
      columnNumber = Math.floor((columnNumber - 1) / 26);
    }
    return columnName;
  }
  genRowSign(totalColumn:number,totalSign:number):any[]{
    var result = [];
    var l = totalColumn/totalSign
    if(l> 1){
      var f = 1;
      for(var i = 0 ; i < totalSign ;i++){
        result.push({from:f,to:f+parseInt(l.toString())});
        f = f+parseInt(l.toString());
      }
      return result;
    }
    return [{from:1,to:totalColumn}];
  }
  onSelectRowReport(e:any){
    this.rowReportSelected = e.selectedRowsData[0];
  }
  async btnPopupSetupReportClick(){
    if(!this.rowReportSelected.sYS_Report_Infomation_Details || this.rowReportSelected.sYS_Report_Infomation_Details.length==0)this.rowReportSelected.sYS_Report_Infomation_Details = [new SYS_Report_Infomation_Detail_ENTITY()]
    this.listEmployeeAll = await this.employeeService.hRM_Employee_Search(new HRM_Employee_ENTITY({user_login:this.appSession.user.code,type:'ALL'})).toPromise()
    this.listEmployee = [];
    this.listEmployeeAll.forEach(emp=>{
      this.listEmployee.push(new SYS_Report_Infomation_Detail_Signature_ENTITY({
        employee_code:emp.code,
        text:emp.text
      }))
    })
    this.BlockUI();
    this.listVersionReport = await this.exportAPIService.sYS_Report_Infomation_Version_Search(new SYS_Report_Infomation_Version_ENTITY({master_code:this.rowReportSelected.code})).toPromise();
    
    this.rowReportSelected.sYS_Report_Infomation_Details = await this.exportAPIService.sYS_Report_Infomation_Detail_Search(new SYS_Report_Infomation_Detail_ENTITY({
      master_code:this.rowReportSelected.code
    })).toPromise();
    this.listSign = await this.exportAPIService.sYS_Report_Infomation_Detail_Signature_Search(new SYS_Report_Infomation_Detail_Signature_ENTITY({sys_report_infomation_detail_code:this.rowReportSelected.sYS_Report_Infomation_Details[0].code})).toPromise()
    this.popupSetupReportVisible = true;
    this.UpdateView()
    this.UnBlockUI();
  }
  async btnExportClick(){
    this.exportAPIService.sYS_Report_Infomation_Search(new SYS_Report_Infomation_ENTITY({
      table_name:this.tableName,
      employee_code:this.appSession.user.code
    })).subscribe(res=>{
      this.dataSourceTemplate = res;
      this.selectedItem = this.dataSourceTemplate.find(r=>r.is_default == true);
      if(!this.selectedItem)this.selectedItem = this.dataSourceTemplate[0]
      this.popupVisible = true;
      this.UpdateView()
    })
  }
  onEditReport(){
    this.popupSetupVisible = true;
  }
  async onExporting(e) {
    this.exportAPIService.sYS_Report_Infomation_Search(new SYS_Report_Infomation_ENTITY(
      {
        table_name:this.tableName,
        employee_code:this.appSession.user.code,
        code:this.selectedItem.code
      }
    )as SYS_Report_Infomation_ENTITY).subscribe((reportInfo:SYS_Report_Infomation_ENTITY[])=>{
      var companyInfo = reportInfo[0].sYS_List_Companys[0];
      if (this.selectedTypeItem.Name === '.xlsx' || this.selectedTypeItem.Name == 'EXCEL'){//https://github.com/exceljs/exceljs
        const rowBegin = 7;
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet(reportInfo[0].name);
        
        exportDataGrid({
          component: this.dataGrid.instance,//e.component,
          worksheet,
          topLeftCell: { row: 2+rowBegin, column: 1 },
          autoFilterEnabled: true,
        }).then((cellRange) => {
          const autoFilter = worksheet.autoFilter;
          const from = autoFilter['from'];
          const to = autoFilter['to'];
          //Begin header
          worksheet.addConditionalFormatting( {
            ref: 'A9:'+this.getColumnPositionName(to.column)+'9',
            rules: [
              {
                type: 'expression',
                formulae: ['MOD(ROW()+COLUMN(),1)=0'],
                style: {fill: {type: 'pattern', pattern: 'solid', bgColor: {argb: '164478'}},font:{color:{argb:'FFFFFF','theme': 1},bold:true }}
              } as any
            ]
          })
            //Company info
          
          const companyNane = worksheet.getRow(1);
          companyNane.getCell(1).value = this.translate('Công ty','Company')+': ';
          companyNane.getCell(1).alignment = { horizontal: 'left' };
          companyNane.getCell(2).value = companyInfo.name;
          const companyAddress = worksheet.getRow(2);
          companyAddress.getCell(1).value = 'Địa chỉ: ';
          companyAddress.getCell(1).alignment = { horizontal: 'left' };
          companyAddress.getCell(2).value = companyInfo.address;
          const companyTax = worksheet.getRow(3);
          companyTax.getCell(1).value = 'Mã số thuế: ';
          companyTax.getCell(1).alignment = { horizontal: 'left' };
          companyTax.getCell(2).value = companyInfo.tax;
          const companyPhone = worksheet.getRow(4);
          companyPhone.getCell(1).value = 'Điện thoại: ';
          companyPhone.getCell(1).alignment = { horizontal: 'left' };
          companyPhone.getCell(2).value = companyInfo.tel;
  
          const qrcode = 'data:image/png;base64,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'
          const imageId2 = workbook.addImage({
            base64: qrcode,
            extension: 'png',
          });
          worksheet.addImage(imageId2,{
            tl: { col: to.column - 1, row: 0 },
            ext: { width: 70, height: 70 }
          });
  
          const headerRow = worksheet.getRow(rowBegin);
          headerRow.height = 30;
          worksheet.mergeCells(rowBegin, 1, rowBegin, to.column);
    
          headerRow.getCell(1).value = reportInfo[0].name;
          headerRow.getCell(1).font = { name: 'Segoe UI Light', size: 22,bold:true };
          headerRow.getCell(1).alignment = { horizontal: 'center' };
          //End header
  
          //Begin sign
          if(reportInfo[0].sYS_Report_Infomation_Details && reportInfo[0].sYS_Report_Infomation_Details.length>0)
            if(reportInfo[0].sYS_Report_Infomation_Details[0].sYS_Report_Infomation_Detail_Signatures && reportInfo[0].sYS_Report_Infomation_Details[0].sYS_Report_Infomation_Detail_Signatures.length>0){
              let rowSign = this.genRowSign(to.column,reportInfo[0].sYS_Report_Infomation_Details[0].sYS_Report_Infomation_Detail_Signatures.length);
              for(var i = 0 ; i < reportInfo[0].sYS_Report_Infomation_Details[0].sYS_Report_Infomation_Detail_Signatures.length ; i ++){
                  var sign = reportInfo[0].sYS_Report_Infomation_Details[0].sYS_Report_Infomation_Detail_Signatures[i];
                  var employee_info = reportInfo[0].sYS_Report_Infomation_Details[0].sYS_Report_Infomation_Detail_Signatures[i].employee_info;
                  var indexCell = 2;
                  switch(sign.position){
                    case 1: //Left
                          indexCell = rowSign[i].from
                    break;
                    case 2: // Center
                          var c = (rowSign[i].from+rowSign[i].to)/2
                          indexCell = parseInt(c.toString())
                    break;
                    case 3: // Right
                      indexCell = rowSign[i].to
                    break;
                  }
                  const signRowIndex = cellRange.to.row + rowBegin;
                  if (sign.is_role_name){
                    const signRow = worksheet.getRow(signRowIndex);
                    signRow.getCell(indexCell).value = employee_info.role_name;
                    signRow.getCell(indexCell).font = { italic: false,bold:true };
                    signRow.getCell(indexCell).alignment = { horizontal: 'center' };
                  }
          
                  const signSubRowIndex = signRowIndex+1;
                  if (sign.is_sub_role_name){
                    const signRowSub = worksheet.getRow(signSubRowIndex);
                    signRowSub.getCell(indexCell).value = sign.sub_role_name;
                    signRowSub.getCell(indexCell).font = { italic: true,bold:false };
                    signRowSub.getCell(indexCell).alignment = { horizontal: 'center' };
                  }
          
                  const signImgRowIndex = signSubRowIndex + 1;
                  if (sign.is_show_default_sign){
                    const signImgRow = worksheet.getRow(signImgRowIndex);
                    const imageSign = workbook.addImage({
                      base64: employee_info.default_sign,
                      extension: 'png',
                    });
                    signImgRow.getCell(indexCell).alignment = { horizontal: 'center' };
                    worksheet.addImage(imageSign, this.getColumnPositionName(indexCell)+signImgRowIndex+':'+this.getColumnPositionName(indexCell)+(signImgRowIndex+3)+'');
            
                  }
                  
                  const signDateRowIndex = signImgRowIndex+4;
                  if (sign.is_show_date_sign) {
                    const signDateRow = worksheet.getRow(signDateRowIndex);
                    signDateRow.getCell(indexCell).value = sign.show_date_sign;
                    signDateRow.getCell(indexCell).font = { italic: false, bold: true };
                    signDateRow.getCell(indexCell).alignment = { horizontal: 'center' };
                  }
          
                  const signFullnameRowIndex = signDateRowIndex+1;
                  if(sign.is_show_sign_fullname){
                    const signFullnameRow = worksheet.getRow(signFullnameRowIndex);
                    signFullnameRow.getCell(indexCell).value = employee_info.sign_fullname;
                    signFullnameRow.getCell(indexCell).font = { italic: false,bold:true };
                    signFullnameRow.getCell(indexCell).alignment = { horizontal: 'center' };
                  }

          
                }
            }

          //End sign
  
          //Begin footer
          const footerRowIndex = cellRange.to.row + rowBegin +8;
          const footerRow = worksheet.getRow(footerRowIndex);
          worksheet.mergeCells(footerRowIndex, 1, footerRowIndex, to.column-1);
    
          footerRow.getCell(1).value =reportInfo[0].sYS_Report_Infomation_Details[0].title_footer;
          footerRow.getCell(1).font = { color: { argb: reportInfo[0].sYS_Report_Infomation_Details[0].color_title_footer?reportInfo[0].sYS_Report_Infomation_Details[0].color_title_footer:'BFBFBF' }, italic: true };
          footerRow.getCell(1).alignment = { horizontal: 'left' };
  
          footerRow.getCell(to.column).value = reportInfo[0].sYS_Report_Infomation_Details[0].no_footer;
          footerRow.getCell(to.column).font = { color: { argb: reportInfo[0].sYS_Report_Infomation_Details[0].color_no_footer?reportInfo[0].sYS_Report_Infomation_Details[0].color_no_footer:'BFBFBF' }, italic: false,bold:true };
          footerRow.getCell(to.column).alignment = { horizontal: 'right' };
  
          //End footer
        }).then(() => {
          workbook.xlsx.writeBuffer().then((buffer) => {
            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), reportInfo[0].name+'.xlsx');
          });
        });
        // exportDataGrid({
        //   component: e.component,
        //   worksheet,
        //   autoFilterEnabled: true,
        // }).then(() => {
        //   workbook.xlsx.writeBuffer().then((buffer) => {
        //     saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
        //   });
        // });
      }
      else if (this.selectedTypeItem.Name === '.pdf'){
        const doc = new jsPDF();
        exportDataGridToPdf({
            jsPDFDocument: doc,
            component: this.dataGrid.instance
        }).then(() => {
            doc.save('Companies.pdf');
        })
      }
      e.cancel = true;
    })
   
  }
  get getDataSource():any{
    return this.isFilter?this.dataSourceFilter:this.dataSource;
  }
  onChangeReportMaster(e:any,col:string){
    this.rowReportSelected[col] = e.value;
  }
  onChangeReportDetail(e:any,col:string){
    this.rowReportSelected.sYS_Report_Infomation_Details[0][col] = e.value;
  }
  onChangeSignReportDetail(e:any,col:string){
    if(col == 'sub_role_name')
      {
        this.signItemReportSelected.employee_info.sub_role_name = e.value;
      }
    this.signItemReportSelected[col] = e.value;
    this.listSign[this.signItemReportSelected.from_index-1].show_sign_fullname = this.signItemReportSelected.employee_info.full_name 
    this.listSign[this.signItemReportSelected.from_index-1] = this.signItemReportSelected;
  }
  orderHeaderFilter(data) {
    data.dataSource.postProcess = (results) => {
      results.push({
        text: 'Weekends',
        value: 'weekends',
      });
      return results;
    };
  }
  onLoadGenRowTableDetail(){
    this.BlockUI();
    this.genRowTableService.sYS_GenRowTable_Search({
      ...new SYS_GenRowTable(),
      userID:this.appSession.user.id,
      type:this.type,
      tablE_NAME:this.tableName,
      form:this.editPageState,
      syS_GenRowTable_Detail:[
        new SYS_GenRowTable_Detail({
          displaY_LIST:true,
          alloW_SEARCH:true
        }as SYS_GenRowTable_Detail)
      ]
    } as SYS_GenRowTable).subscribe((data:SYS_GenRowTable[])=>{
      this.genRowTable = data[0];
      this.tbName = this.genRowTable.code;
      this.genRowTableDetail = this.genRowTable.syS_GenRowTable_Detail.filter(e=> e.displaY_LIST == true);
      this.genRowTableDetailFilter = this.genRowTable.syS_GenRowTable_Detail.filter(e=>e.alloW_SEARCH == true);
      this.UpdateView();
      this.UnBlockUI();
    },
    (err) => {
        if (err.status == 401) {
          this.cookieService.remove('userlogin');
          this.cookieService.remove('allowShowTheme');
          this.router.navigateByUrl('/login');
        }
    })
  }
}

