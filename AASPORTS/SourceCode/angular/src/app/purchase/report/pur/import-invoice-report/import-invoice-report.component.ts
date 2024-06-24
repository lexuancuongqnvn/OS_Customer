import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { DXDataGridViewReportComponent } from 'src/app/shared/dx-data-grid/dx-data-grid-view-report/dx-data-grid-view-report.component';
import { DialogPreviewPrintComponent } from 'src/app/shared/layout/dialogs/dialog-preview-print/dialog-preview-print.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { PUR_Aggregate_Cost_Coupon_Print_ENTITY, PUR_Import_Invoice_Report_ENTITY, PurchaseReportService } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-import-invoice-report',
  templateUrl: './import-invoice-report.component.html',
  styleUrls: ['./import-invoice-report.component.css']
})
export class ImportInvoiceReportComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    injector: Injector,
    private purchaseReportService: PurchaseReportService,
    private appSession: AppSession,
  ) { 
    super(injector);
    this.tbName = this.getRouteData('tbName');
    this.filterInput.voucher_code = this.getRouteData('voucher_code');
    const d = this.getStartEndDateInMonth();
    this.filterInput.voucher_date_start = d.startDate;
    this.filterInput.voucher_date_end = d.endDate;
   
  }

  @ViewChild('DataGridGenRowTable') DataGridGenRowTable: DXDataGridViewReportComponent;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  @ViewChild('dialogPreviewPrint') dialogPreviewPrint: DialogPreviewPrintComponent;

  filterInput:PUR_Import_Invoice_Report_ENTITY=new PUR_Import_Invoice_Report_ENTITY();
  rowSelected:PUR_Import_Invoice_Report_ENTITY=new PUR_Import_Invoice_Report_ENTITY();
  listData:PUR_Import_Invoice_Report_ENTITY[]=[];
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
        this.navigatePassParam('warehouse/opening-balance-input-output-inventory-add',[['code',this.idSelect]],new PUR_Import_Invoice_Report_ENTITY({}),this.tbName)
        break;
      }
      case EditPageState.edit:{
        this.navigatePassParam('warehouse/opening-balance-input-output-inventory-edit',[['code',this.idSelect]],new PUR_Import_Invoice_Report_ENTITY({}),this.tbName)
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
    }
    this.BlockUI();
    this.purchaseReportService.pUR_Import_Invoice_Report_Search({
      ...this.filterInput
    } as PUR_Import_Invoice_Report_ENTITY).subscribe((res:PUR_Import_Invoice_Report_ENTITY[])=>{
      this.listData = res;
      this.DataGridGenRowTable.setDataSource(res);
      this.UpdateView();
      this.UnBlockUI();
    })
  }
  onSelectedRowsData(obj:any){
    this.rowSelected = obj[0];
  }
  OnChangeDataFilter(obj:any){
    this.filterInput[obj.colName] = obj.value;
  }

}
