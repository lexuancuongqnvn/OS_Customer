import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { DXDataGridViewReportComponent } from 'src/app/shared/dx-data-grid/dx-data-grid-view-report/dx-data-grid-view-report.component';
import { DXDataGridViewComponent } from 'src/app/shared/dx-data-grid/dx-data-grid-view/dx-data-grid-view.component';
import { DialogPreviewPrintComponent } from 'src/app/shared/layout/dialogs/dialog-preview-print/dialog-preview-print.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { SALE_Year_End_Balance_Sheet_Compilation_ENTITY, CashReportService, SalesReportService } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-year-end-balance-sheet-compilation',
  templateUrl: './year-end-balance-sheet-compilation.component.html',
  styleUrls: ['./year-end-balance-sheet-compilation.component.css']
})
export class YearEndBalanceSheetCompilationComponent  extends LayoutComponentBase implements OnInit, IUiAction<any> {

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
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  @ViewChild('dialogPreviewPrint') dialogPreviewPrint: DialogPreviewPrintComponent;

  filterInput:SALE_Year_End_Balance_Sheet_Compilation_ENTITY=new SALE_Year_End_Balance_Sheet_Compilation_ENTITY();
  rowSelected:SALE_Year_End_Balance_Sheet_Compilation_ENTITY=new SALE_Year_End_Balance_Sheet_Compilation_ENTITY();
  listData:SALE_Year_End_Balance_Sheet_Compilation_ENTITY[]=[];
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
        this.navigatePassParam('warehouse/opening-balance-input-output-inventory-add',[['code',this.idSelect]],new SALE_Year_End_Balance_Sheet_Compilation_ENTITY({}),this.tbName)
        break;
      }
      case EditPageState.edit:{
        this.navigatePassParam('warehouse/opening-balance-input-output-inventory-edit',[['code',this.idSelect]],new SALE_Year_End_Balance_Sheet_Compilation_ENTITY({}),this.tbName)
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
    this.salesReportService.sALE_Year_End_Balance_Sheet_Compilation_Search({
      ...this.filterInput
    } as SALE_Year_End_Balance_Sheet_Compilation_ENTITY).subscribe((res:SALE_Year_End_Balance_Sheet_Compilation_ENTITY[])=>{
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
