import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { DXDataGridViewReportComponent } from 'src/app/shared/dx-data-grid/dx-data-grid-view-report/dx-data-grid-view-report.component';
import { DXDataGridViewComponent } from 'src/app/shared/dx-data-grid/dx-data-grid-view/dx-data-grid-view.component';
import { DialogPreviewPrintComponent } from 'src/app/shared/layout/dialogs/dialog-preview-print/dialog-preview-print.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { SALE_Accounts_Receivable_Ledger_ENTITY, CashReportService, SalesReportService } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'accounts-receivable-ledger',
  templateUrl: './accounts-receivable-ledger.component.html',
  styleUrls: ['./accounts-receivable-ledger.component.css']
})
export class AccountsReceivableLedgerComponent  extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    injector: Injector,
    private salesReportService: SalesReportService,
    private appSession: AppSession,
  ) { 
    super(injector);
    if(this.isShowToolbar){
      this.tbName = this.getRouteData('tbName');
      this.filterInput.voucher_code = this.getRouteData('voucher_code');
      const d = this.getStartEndDateInMonth();
      this.filterInput.voucher_date_start = d.startDate;
      this.filterInput.voucher_date_end = d.endDate;
    }
  }

  @ViewChild('DataGridGenRowTable') DataGridGenRowTable: DXDataGridViewReportComponent;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  @ViewChild('dialogPreviewPrint') dialogPreviewPrint: DialogPreviewPrintComponent;
  @Input() voucher_date_start: moment.Moment = this.getStartEndDateInMonth().startDate;
  @Input() voucher_date_end: moment.Moment = this.getStartEndDateInMonth().endDate;
  @Input() account: string = '';
  @Input() debitor_account: string = '';
  @Input() isShowToolbar:boolean = true;
  @Output() OnSelectRow: EventEmitter<SALE_Accounts_Receivable_Ledger_ENTITY> = new EventEmitter();
  
  filterInput:SALE_Accounts_Receivable_Ledger_ENTITY=new SALE_Accounts_Receivable_Ledger_ENTITY();
  rowSelected:SALE_Accounts_Receivable_Ledger_ENTITY=new SALE_Accounts_Receivable_Ledger_ENTITY();
  listData:SALE_Accounts_Receivable_Ledger_ENTITY[]=[];
  tbName:string = 'SALE_Accounts_Receivable_Ledger_Search';
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
        this.navigatePassParam('warehouse/opening-balance-input-output-inventory-add',[['code',this.idSelect]],new SALE_Accounts_Receivable_Ledger_ENTITY({}),this.tbName)
        break;
      }
      case EditPageState.edit:{
        this.navigatePassParam('warehouse/opening-balance-input-output-inventory-edit',[['code',this.idSelect]],new SALE_Accounts_Receivable_Ledger_ENTITY({}),this.tbName)
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
    if(!this.filterInput.voucher_date_start || !this.filterInput.voucher_date_end){
      this.showMessageWarning(this.translate('Vui lòng chọn thời gian lọc.','Filter date not empty'))
      return
    }else if(!this.filterInput.account){
      this.showMessageWarning(this.translate('Vui lòng chọn tài khoản lọc.','Filter account not empty'))
      return
    }else if(!this.filterInput.customer_code){
      this.showMessageWarning(this.translate('Vui lòng chọn khách hàng lọc','Customer code not empty'))
      return
    }
    this.salesReportService.sALE_Accounts_Receivable_Ledger_Search({
      ...this.filterInput
    } as SALE_Accounts_Receivable_Ledger_ENTITY).subscribe((res:SALE_Accounts_Receivable_Ledger_ENTITY[])=>{
      this.listData = res;
      this.DataGridGenRowTable.setDataSource(res);
      this.UpdateView();
    })
  }
  onSelectedRowsData(obj:any){
    this.rowSelected = obj[0];
    this.OnSelectRow.emit(this.rowSelected);
  }
  OnChangeDataFilter(obj:any){
    this.filterInput[obj.colName] = obj.value;
  }



}
