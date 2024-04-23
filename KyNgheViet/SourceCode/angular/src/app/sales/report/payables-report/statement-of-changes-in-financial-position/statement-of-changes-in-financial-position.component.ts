import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { DXDataGridViewReportComponent } from 'src/app/shared/dx-data-grid/dx-data-grid-view-report/dx-data-grid-view-report.component';
import { DXDataGridViewComponent } from 'src/app/shared/dx-data-grid/dx-data-grid-view/dx-data-grid-view.component';
import { DialogPreviewPrintComponent } from 'src/app/shared/layout/dialogs/dialog-preview-print/dialog-preview-print.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { SALE_Statement_Of_Changes_In_Financial_Position_ENTITY, CashReportService, SalesReportService, SALE_Accounts_Receivable_Ledger_ENTITY } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';
import { AccountsReceivableLedgerComponent } from '../accounts-receivable-ledger/accounts-receivable-ledger.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';

@Component({
  selector: 'app-statement-of-changes-in-financial-position',
  templateUrl: './statement-of-changes-in-financial-position.component.html',
  styleUrls: ['./statement-of-changes-in-financial-position.component.css']
})
export class StatementOfChangesInFinancialPositionComponent  extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    injector: Injector,
    private salesReportService: SalesReportService,
    private appSession: AppSession,
  ) { 
    super(injector);
    this.tbName = this.getRouteData('tbName');
    this.filterInput.voucher_code = this.getRouteData('voucher_code');
    const d = this.getStartEndDateInMonth();
    this.filterInput.voucher_date_start = d.startDate;
    this.filterInput.voucher_date_end = d.endDate;
    this.filterInput.account = '131';
   
  }

  @ViewChild('DataGridGenRowTable') DataGridGenRowTable: DXDataGridViewReportComponent;
  @ViewChild('FormAccountsReceivableLedger') FormAccountsReceivableLedger: AccountsReceivableLedgerComponent;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  @ViewChild('dialogPreviewPrint') dialogPreviewPrint: DialogPreviewPrintComponent;
  @ViewChild('dialogViewDetail') dialogViewDetail: DialogAcctionComponent;

  filterInput:SALE_Statement_Of_Changes_In_Financial_Position_ENTITY=new SALE_Statement_Of_Changes_In_Financial_Position_ENTITY();
  rowSelected:SALE_Statement_Of_Changes_In_Financial_Position_ENTITY=new SALE_Statement_Of_Changes_In_Financial_Position_ENTITY();
  rowDetailSelected:SALE_Accounts_Receivable_Ledger_ENTITY=new SALE_Accounts_Receivable_Ledger_ENTITY();
  listData:SALE_Statement_Of_Changes_In_Financial_Position_ENTITY[]=[];
  tbName:string = '';
  CurrenFrom:string = EditPageState.view;
  w:number = screen.width * 0.95;
  get isEnableViewDeail():Boolean{
    return (!this.rowDetailSelected || !this.rowDetailSelected.code)?true:false
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
    alert('Đang cập nhật')
  }
  onSave(): void {
    throw new Error('Method not implemented.');
  }
  onSearch(): void {
    this.FormAccountsReceivableLedger.onLoadData()
  }
  onResetSearch(): void {
    throw new Error('Method not implemented.');
  }
  OnSelectRow(e:any): void {
   this.rowDetailSelected = e;
  }
  onClickAcction(id: number, storedName: string, param: string, keyService: string, classForm: string): void {
    switch(classForm){
      case EditPageState.add:{
        this.navigatePassParam('warehouse/opening-balance-input-output-inventory-add',[['code',this.idSelect]],new SALE_Statement_Of_Changes_In_Financial_Position_ENTITY({}),this.tbName)
        break;
      }
      case EditPageState.edit:{
        this.navigatePassParam('warehouse/opening-balance-input-output-inventory-edit',[['code',this.idSelect]],new SALE_Statement_Of_Changes_In_Financial_Position_ENTITY({}),this.tbName)
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
        this.dialogViewDetail.open();
        setTimeout(() => {
          this.FormAccountsReceivableLedger.tbName = 'SALE_Accounts_Receivable_Ledger_Search';
          this.FormAccountsReceivableLedger.filterInput = this.filterInput;
          this.FormAccountsReceivableLedger.filterInput.customer_code = this.rowSelected.customer_code;
          this.FormAccountsReceivableLedger.onLoadData()
        }, 200);
        break;
      }
      case EditPageState.PrintReport:{
        this.dialogPreviewPrint.onPrint(this.tbName,this.filterInput)
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
    this.salesReportService.sALE_Statement_Of_Changes_In_Financial_Position_Search({
      ...this.filterInput
    } as SALE_Statement_Of_Changes_In_Financial_Position_ENTITY).subscribe((res:SALE_Statement_Of_Changes_In_Financial_Position_ENTITY[])=>{
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
