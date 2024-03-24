import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { DXDataGridViewComponent } from 'src/app/shared/dx-data-grid/dx-data-grid-view/dx-data-grid-view.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { DialogAcctionV2Component } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component-v2';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { WMSReportService, WMS_Report_Inventory_Book_Detail_ENTITY, WMS_Report_Inventory_Import_Export_ENTITY,  } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-report-inventory-import-export-list',
  templateUrl: './report-inventory-import-export-list.component.html',
  styleUrls: ['./report-inventory-import-export-list.component.css']
})
export class ReportInventoryImportExportListComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    injector: Injector,
    private wMSReportService: WMSReportService,
    private appSession: AppSession,
  ) { 
    super(injector);
    this.tbName = this.getRouteData('tbName');
    const d = this.getQuarterDates(new Date());
  
    this.filterInput.voucher_date_start = this.convertDateToMomentUTC(d.startDate);
    this.filterInput.voucher_date_end = this.convertDateToMomentUTC(d.endDate);
  }
  
  @ViewChild('DataGridGenRowTable') DataGridGenRowTable: DXDataGridViewComponent;
  @ViewChild('DataGridnventoryBookDetail') DataGridnventoryBookDetail: DXDataGridViewComponent;
  @ViewChild('dialogViewDetail') dialogViewDetail: DialogAcctionV2Component;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  filterInput:WMS_Report_Inventory_Import_Export_ENTITY=new WMS_Report_Inventory_Import_Export_ENTITY();
  filterInputBookDetail:WMS_Report_Inventory_Book_Detail_ENTITY=new WMS_Report_Inventory_Book_Detail_ENTITY();
  rowSelected:WMS_Report_Inventory_Import_Export_ENTITY=new WMS_Report_Inventory_Import_Export_ENTITY();
  listData:WMS_Report_Inventory_Import_Export_ENTITY[]=[];
  listDataBookDetail:WMS_Report_Inventory_Book_Detail_ENTITY[]=[];
  tbName:string = '';
  CurrenFrom:string = EditPageState.view;

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
    throw new Error('Method not implemented.');
  }
  onClickAcctionBookDetail(e:any): void {
    switch(e.classForm){
      case EditPageState.search:{
        this.onLoadDataBookDetail()
        break;
      }
      
      default:break;
    }
  }
  onClickAcction(id: number, storedName: string, param: string, keyService: string, classForm: string): void {
    switch(classForm){
      case EditPageState.add:{
        break;
      }
      case EditPageState.edit:{
        break;
      }
      case EditPageState.save:{
        break;
      }
      case EditPageState.search:{
        this.onLoadData();
        break;
      }
      case EditPageState.viewDetail:{
        this.filterInputBookDetail.goods_code = this.rowSelected.goods_code;
        this.filterInputBookDetail.goods_symbol = this.rowSelected.goods_code;
        this.filterInputBookDetail.voucher_date_start = this.filterInput.voucher_date_start;
        this.filterInputBookDetail.voucher_date_end = this.filterInput.voucher_date_end;
        this.dialogViewDetail.open();
        this.dialogViewDetail.setAcction();

        break;
      }
      case 'search_detail':{
        
        break;
      }
      case 'close_book':{
        
      break;
    }
    case 'open_book':{
     
      break;
    }
      default:break;
    }
  }
  ngOnInit(): void {
    this.setAcction();
    // this.onLoadData();
  }
  setAcction(){
    if(this.toolbar){
       this.toolbar.setUiAction(this);
    }
    else
      setTimeout(() => {
        this.setAcction();
      }, 50);
  }
  onLoadData(){
    this.BlockUI();
    this.wMSReportService.wMS_Report_Inventory_Import_Export_Search({
      ...this.filterInput
    } as WMS_Report_Inventory_Import_Export_ENTITY).subscribe((res:WMS_Report_Inventory_Import_Export_ENTITY[])=>{
      this.listData = res;
      this.DataGridGenRowTable.setDataSource(res);
      this.UnBlockUI();
      this.UpdateView();
    })
  }
  onLoadDataBookDetail(){
    this.BlockUI();
    this.wMSReportService.wMS_Report_Inventory_Book_Detail_Search({
      ...this.filterInputBookDetail
    } as WMS_Report_Inventory_Book_Detail_ENTITY).subscribe((res:WMS_Report_Inventory_Book_Detail_ENTITY[])=>{
      this.listDataBookDetail = res;
      this.DataGridnventoryBookDetail.setDataSource(res);
      this.UnBlockUI();
      this.UpdateView();
    })
  }
  onSelectedRowsData(obj:any){
    this.rowSelected = obj[0];
  }
  OnChangeDataFilter(obj:any){
    this.filterInput[obj.colName] = obj.value;
  }
  OnChangeDataFilterBookDetail(obj:any){
    this.filterInputBookDetail[obj.colName] = obj.value;
  }
  onSelectedRowsDataBookDetail(obj:any){
    this.rowSelected = obj[0];
  } 
  selectRowBookDetail(obj:any){
    this.rowSelected = obj[0];
  }
}
