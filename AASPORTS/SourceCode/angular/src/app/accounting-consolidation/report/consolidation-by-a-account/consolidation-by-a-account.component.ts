import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import moment from 'moment';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { DXDataGridViewComponent } from 'src/app/shared/dx-data-grid/dx-data-grid-view/dx-data-grid-view.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { CON_Account_Consolidation_By_A_Account_ENTITY, CashReportService, ConsolidationReportService } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';
import { ConsolidationAccountDetailComponent } from '../consolidation-account-detail/consolidation-account-detail.component';
import { DXDataGridViewReportComponent } from 'src/app/shared/dx-data-grid/dx-data-grid-view-report/dx-data-grid-view-report.component';
import { DialogPreviewPrintComponent } from 'src/app/shared/layout/dialogs/dialog-preview-print/dialog-preview-print.component';


@Component({
  selector: 'consolidation-by-a-account',
  templateUrl: './consolidation-by-a-account.component.html',
  styleUrls: ['./consolidation-by-a-account.component.css']
})
export class ConsolidationByAAccountComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    injector: Injector,
    private consolidationReportService: ConsolidationReportService,
    private appSession: AppSession,
  ) { 
    super(injector);
    this.tbName = this.getRouteData('tbName');
    
    if(!this.getRouteParamObj('voucher_date_start')){
      this.filterInput.voucher_date_start = this.getRouteParamObj('voucher_date_start');
      this.filterInput.voucher_date_end = this.getRouteParamObj('voucher_date_end');
      this.filterInput.account = this.getRouteParamObj('account');
    }
  }

  @ViewChild('DataGridGenRowTable') DataGridGenRowTable: DXDataGridViewReportComponent;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  @ViewChild('dialogConsolidationAccountDetail') dialogConsolidationAccountDetail: DialogAcctionComponent;
  @ViewChild('FormConsolidationAccountDetail') FormConsolidationAccountDetail: ConsolidationAccountDetailComponent;
  @ViewChild('dialogPreviewPrint') dialogPreviewPrint: DialogPreviewPrintComponent;

  @Input() voucher_date_start: moment.Moment = this.getStartEndDateInMonth().startDate;
  @Input() voucher_date_end: moment.Moment = this.getStartEndDateInMonth().endDate;
  @Input() account: string = '';
  @Input() isShowToolbar:boolean = true;
  w:number = screen.width * 0.95;

  filterInput:CON_Account_Consolidation_By_A_Account_ENTITY=new CON_Account_Consolidation_By_A_Account_ENTITY();
  rowSelected:CON_Account_Consolidation_By_A_Account_ENTITY=new CON_Account_Consolidation_By_A_Account_ENTITY();
  listData:CON_Account_Consolidation_By_A_Account_ENTITY[]=[];
  tbName:string = 'CON_Account_Consolidation_By_A_Account';
  CurrenFrom:string = EditPageState.view;
  
  get isEnableViewDeail():Boolean{
    return (!this.rowSelected || (this.rowSelected.account && this.rowSelected.debitor_account))?true:false
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
  onViewDetail(item: number): void {
    if(item == 1){
      this.filterInput.debitor_account = this.rowSelected.debitor_account;
      this.dialogConsolidationAccountDetail.open();
     setTimeout(() => {
      this.FormConsolidationAccountDetail.filterInput.voucher_date_start = this.filterInput.voucher_date_start;
      this.FormConsolidationAccountDetail.filterInput.voucher_date_end = this.filterInput.voucher_date_end;
      this.FormConsolidationAccountDetail.filterInput.account = this.filterInput.account;
      this.FormConsolidationAccountDetail.filterInput.debitor_account = this.filterInput.debitor_account;
      this.FormConsolidationAccountDetail.onLoadData();
     }, 200);
    }else{
      alert('Đang cập nhật')
    }

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
        this.navigatePassParam('warehouse/opening-balance-input-output-inventory-add',[['code',this.idSelect]],new CON_Account_Consolidation_By_A_Account_ENTITY({}),this.tbName)
        break;
      }
      case EditPageState.edit:{
        this.navigatePassParam('warehouse/opening-balance-input-output-inventory-edit',[['code',this.idSelect]],new CON_Account_Consolidation_By_A_Account_ENTITY({}),this.tbName)
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
        this.filterInput.debitor_account = this.rowSelected.debitor_account;
        this.dialogConsolidationAccountDetail.open();
       setTimeout(() => {
        this.FormConsolidationAccountDetail.filterInput.voucher_date_start = this.filterInput.voucher_date_start;
        this.FormConsolidationAccountDetail.filterInput.voucher_date_end = this.filterInput.voucher_date_end;
        this.FormConsolidationAccountDetail.filterInput.account = this.filterInput.account;
        this.FormConsolidationAccountDetail.filterInput.debitor_account = this.filterInput.debitor_account;
        this.FormConsolidationAccountDetail.onLoadData();
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
    this.filterInput.voucher_date_start = this.voucher_date_start;
    this.filterInput.voucher_date_end = this.voucher_date_end;
    this.filterInput.account = this.account;
    this.tbName = 'CON_Account_Consolidation_By_A_Account';
    if(this.isShowToolbar)this.setAcction();
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
    // this.filterInput.voucher_date_start = this.voucher_date_start;
    // this.filterInput.voucher_date_end = this.voucher_date_end;
    // this.filterInput.account = this.account;
    this.consolidationReportService.cON_Account_Consolidation_By_A_Account_Search({
      ...this.filterInput
    } as CON_Account_Consolidation_By_A_Account_ENTITY).subscribe((res:CON_Account_Consolidation_By_A_Account_ENTITY[])=>{
      this.listData = res;
      this.DataGridGenRowTable.setDataSource(res);
      this.UpdateView();
    })
  }
  onLoadDataConsolidationAccountDetail(){
    this.FormConsolidationAccountDetail.onLoadData()
  }
  onSelectedRowsData(obj:any){
    this.rowSelected = obj[0];
  }
  OnChangeDataFilter(obj:any){
    this.filterInput[obj.colName] = obj.value;
  }
}