import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppConsts } from 'src/app/app-consts.component';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { DXDataGridViewComponent } from 'src/app/shared/dx-data-grid/dx-data-grid-view/dx-data-grid-view.component';
import { TreeListReportComponent } from 'src/app/shared/dx-tree-list/tree-list-report/tree-list-report.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { CON_Statement_Of_Cash_Flows_Report_ENTITY, CashReportService, ConsolidationReportService } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';
import { ConsolidationByAAccountComponent } from '../consolidation-by-a-account/consolidation-by-a-account.component';

@Component({
  selector: 'app-statement-of-cash-flows',
  templateUrl: './statement-of-cash-flows.component.html',
  styleUrls: ['./statement-of-cash-flows.component.css']
})
export class StatementOfCashFlowsComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    injector: Injector,
    private consolidationReportService: ConsolidationReportService,
    private appSession: AppSession,
  ) { 
    super(injector);
    this.tbName = this.getRouteData('tbName');
    const d = this.getStartEndDateInMonth();
    this.filterInput.voucher_date_start = d.startDate;
    this.filterInput.voucher_date_end = d.endDate;
  }

  @ViewChild('DataGridGenRowTable') DataGridGenRowTable: TreeListReportComponent;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  @ViewChild('dialogConsolidationByAAccount') dialogConsolidationByAAccount: DialogAcctionComponent;
  @ViewChild('FormConsolidationByAAccount') FormConsolidationByAAccount: ConsolidationByAAccountComponent;

  filterInput:CON_Statement_Of_Cash_Flows_Report_ENTITY=new CON_Statement_Of_Cash_Flows_Report_ENTITY();
  rowSelected:CON_Statement_Of_Cash_Flows_Report_ENTITY=new CON_Statement_Of_Cash_Flows_Report_ENTITY();
  listData:CON_Statement_Of_Cash_Flows_Report_ENTITY[]=[];
  tbName:string = '';
  CurrenFrom:string = EditPageState.view;
  w:number = screen.width * 0.95;

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
    this.FormConsolidationByAAccount.onViewDetail(item)
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
        this.navigatePassParam('warehouse/opening-balance-input-output-inventory-add',[['code',this.idSelect]],new CON_Statement_Of_Cash_Flows_Report_ENTITY({}),this.tbName)
        break;
      }
      case EditPageState.edit:{
        this.navigatePassParam('warehouse/opening-balance-input-output-inventory-edit',[['code',this.idSelect]],new CON_Statement_Of_Cash_Flows_Report_ENTITY({}),this.tbName)
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
        this.filterInput.account = this.rowSelected.account;
        this.dialogConsolidationByAAccount.open();
       setTimeout(() => {
        this.FormConsolidationByAAccount.filterInput.voucher_date_start = this.filterInput.voucher_date_start;
        this.FormConsolidationByAAccount.filterInput.voucher_date_end = this.filterInput.voucher_date_end;
        this.FormConsolidationByAAccount.filterInput.account = this.filterInput.account;
        this.FormConsolidationByAAccount.onLoadData();
       }, 200);
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
  }onLoadDataConsolidationByAAccount(){
    this.FormConsolidationByAAccount.onLoadData();
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
    this.consolidationReportService.cON_Statement_Of_Cash_Flows_Report_Search({
      ...this.filterInput
    } as CON_Statement_Of_Cash_Flows_Report_ENTITY).subscribe((res:CON_Statement_Of_Cash_Flows_Report_ENTITY[])=>{
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
