import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import moment from 'moment';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { DXDataGridViewComponent } from 'src/app/shared/dx-data-grid/dx-data-grid-view/dx-data-grid-view.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { WMSReportService, WMS_Average_Cost_Sheet_ENTITY } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-costing-of-inventory',
  templateUrl: './costing-of-inventory.component.html',
  styleUrls: ['./costing-of-inventory.component.css']
})
export class CostingOfInventoryComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    injector: Injector,
    private wMSReportService: WMSReportService,
    private appSession: AppSession,
  ) { 
    super(injector);
    this.tbName = this.getRouteData('tbName');
    this.filterInput.from_month = moment().month()+1;
    this.filterInput.to_month = moment().month()+1;
    this.filterInput.inventory_valuation_method = 2;
    // const d = this.getStartEndDateInMonth();
    // this.filterInput.voucher_date_start = d.startDate;
    // this.filterInput.voucher_date_end = d.endDate;
  }
  
  @ViewChild('DataGridGenRowTable') DataGridGenRowTable: DXDataGridViewComponent;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  filterInput:WMS_Average_Cost_Sheet_ENTITY=new WMS_Average_Cost_Sheet_ENTITY();
  rowSelected:WMS_Average_Cost_Sheet_ENTITY=new WMS_Average_Cost_Sheet_ENTITY();
  listData:WMS_Average_Cost_Sheet_ENTITY[]=[];
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
  onClickAcction(id: number, storedName: string, param: string, keyService: string, classForm: string): void {
    switch(classForm){
      case EditPageState.add:{
        this.navigatePassParam('warehouse/costing-of-inventory-add',[['code',this.idSelect]],new WMS_Average_Cost_Sheet_ENTITY({}),this.tbName)
        break;
      }
      case EditPageState.edit:{
        this.navigatePassParam('warehouse/costing-of-inventory-edit',[['code',this.idSelect]],new WMS_Average_Cost_Sheet_ENTITY({}),this.tbName)
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
        this.onCostingDatav2();
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
  ngOnInit(): void {
    this.setAcction();
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
  onCostingData(){
    if(this.filterInput.from_month > this.filterInput.to_month){
      this.showMessageError(this.translate('Tháng bắt đầu không lớn hơn tháng kết thúc','The start month cannot be greater than the end month.'))
      return;
    }
    this.BlockUI();

    this.wMSReportService.wMS_Calculate_The_Average_Costing_Search({
      ...this.filterInput,
      inventory_valuation_method:this.filterInput.inventory_valuation_method?Number(this.filterInput.inventory_valuation_method):this.filterInput.inventory_valuation_method,
      from_month:this.filterInput.from_month?Number(this.filterInput.from_month):this.filterInput.from_month,
      to_month:this.filterInput.to_month?Number(this.filterInput.to_month):this.filterInput.to_month,
      is_costing:true
    } as WMS_Average_Cost_Sheet_ENTITY).subscribe((res:WMS_Average_Cost_Sheet_ENTITY[])=>{
      this.onLoadData()
    })
  }
  onCostingDatav2(){
    if(this.filterInput.from_month > this.filterInput.to_month){
      this.showMessageError(this.translate('Tháng bắt đầu không lớn hơn tháng kết thúc','The start month cannot be greater than the end month.'))
      return;
    }
    this.BlockUI();

    this.wMSReportService.wMS_Calculate_The_Average_Costing_V2_Search({
      ...this.filterInput,
      inventory_valuation_method:this.filterInput.inventory_valuation_method?Number(this.filterInput.inventory_valuation_method):this.filterInput.inventory_valuation_method,
      from_month:this.filterInput.from_month?Number(this.filterInput.from_month):this.filterInput.from_month,
      to_month:this.filterInput.to_month?Number(this.filterInput.to_month):this.filterInput.to_month,
      is_costing:true
    } as WMS_Average_Cost_Sheet_ENTITY).subscribe((res:WMS_Average_Cost_Sheet_ENTITY[])=>{
      this.onLoadData()
    })
  }
  onCostingDataTest(){
    if(this.filterInput.from_month > this.filterInput.to_month){
      this.showMessageError(this.translate('Tháng bắt đầu không lớn hơn tháng kết thúc','The start month cannot be greater than the end month.'))
      return;
    }
    this.BlockUI();

    this.wMSReportService.wMS_Calculate_The_Average_Costing_Search({
      ...this.filterInput,
      inventory_valuation_method:this.filterInput.inventory_valuation_method?Number(this.filterInput.inventory_valuation_method):this.filterInput.inventory_valuation_method,
      from_month:this.filterInput.from_month?Number(this.filterInput.from_month):this.filterInput.from_month,
      to_month:this.filterInput.to_month?Number(this.filterInput.to_month):this.filterInput.to_month,
      is_costing:false
    } as WMS_Average_Cost_Sheet_ENTITY).subscribe((res:WMS_Average_Cost_Sheet_ENTITY[])=>{
      this.UnBlockUI();
      this.onLoadData()
      
    }) 
  }
  onLoadData(){
    if(this.filterInput.from_month > this.filterInput.to_month){
      this.showMessageError(this.translate('Tháng bắt đầu không lớn hơn tháng kết thúc','The start month cannot be greater than the end month.'))
      return;
    }
    //this.BlockUI();

    this.wMSReportService.wMS_Calculate_The_Average_Costing_Data_Search({
      ...this.filterInput,
      inventory_valuation_method:this.filterInput.inventory_valuation_method?Number(this.filterInput.inventory_valuation_method):this.filterInput.inventory_valuation_method,
      from_month:this.filterInput.from_month?Number(this.filterInput.from_month):this.filterInput.from_month,
      to_month:this.filterInput.to_month?Number(this.filterInput.to_month):this.filterInput.to_month
    } as WMS_Average_Cost_Sheet_ENTITY).subscribe((res:WMS_Average_Cost_Sheet_ENTITY[])=>{
      this.UnBlockUI()
      this.listData = res;
      this.DataGridGenRowTable.setDataSource(res);
     ;
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
