import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { DXDataGridViewComponent } from 'src/app/shared/dx-data-grid/dx-data-grid-view/dx-data-grid-view.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { WMSReportService, WMS_Report_Inventory_Movement_ENTITY } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-goods-report-list',
  templateUrl: './goods-report-list.component.html',
  styleUrls: ['./goods-report-list.component.css']
})
export class GoodsReportListComponent  extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    injector: Injector,
    private wMSReportService: WMSReportService,
    private appSession: AppSession,
  ) { 
    super(injector);
    this.tbName = this.getRouteData('tbName');
  }

  @ViewChild('DataGridGenRowTable') DataGridGenRowTable: DXDataGridViewComponent;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  filterInput:WMS_Report_Inventory_Movement_ENTITY=new WMS_Report_Inventory_Movement_ENTITY();
  rowSelected:WMS_Report_Inventory_Movement_ENTITY=new WMS_Report_Inventory_Movement_ENTITY();
  listData:WMS_Report_Inventory_Movement_ENTITY[]=[];
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
  onClickAcction(id: number, storedName: string, param: string, keyService: string, classForm: string): void {
    switch(classForm){
      case EditPageState.add:{
        this.navigatePassParam('warehouse/opening-balance-input-output-inventory-add',[['code',this.idSelect]],new WMS_Report_Inventory_Movement_ENTITY({}),this.tbName)
        break;
      }
      case EditPageState.edit:{
        this.navigatePassParam('warehouse/opening-balance-input-output-inventory-edit',[['code',this.idSelect]],new WMS_Report_Inventory_Movement_ENTITY({}),this.tbName)
        break;
      }
      case EditPageState.save:{
        this.onLoadData();
        break;
      }
      case EditPageState.search:{
        this.onLoadData();
        break;
      }
      case EditPageState.viewDetail:{
        this.onLoadData();
        break;
      }
      case 'update_target':{
        
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
  getDataByID(storedName: string, param: string, keyService: string): void {
    throw new Error('Method not implemented.');
  }


  ngOnInit(): void {
    this.setAcction();
    this.onLoadData();
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
    this.wMSReportService.wMS_Report_Inventory_Movement({
      ...this.filterInput
    } as WMS_Report_Inventory_Movement_ENTITY).subscribe((res:WMS_Report_Inventory_Movement_ENTITY[])=>{
      this.listData = res;
      this.DataGridGenRowTable.setDataSource(res);
      this.UpdateView();
    })
  }
  onSelectedRowsData(obj:any){
    this.rowSelected = obj[0];
  }
  OnChangeDataFilter(obj:any){
    this.filterInput[obj.colName] = obj.value;
  }
}
