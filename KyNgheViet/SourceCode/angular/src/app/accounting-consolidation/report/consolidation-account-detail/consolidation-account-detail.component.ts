import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import moment from 'moment';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { DXDataGridViewReportComponent } from 'src/app/shared/dx-data-grid/dx-data-grid-view-report/dx-data-grid-view-report.component';
import { DXDataGridViewComponent } from 'src/app/shared/dx-data-grid/dx-data-grid-view/dx-data-grid-view.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { CON_Account_Book_Detail_ENTITY, CashReportService, ConsolidationReportService } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'consolidation-account-detail',
  templateUrl: './consolidation-account-detail.component.html',
  styleUrls: ['./consolidation-account-detail.component.css']
})
export class ConsolidationAccountDetailComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

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
  @Input() voucher_date_start: moment.Moment = this.getStartEndDateInMonth().startDate;
  @Input() voucher_date_end: moment.Moment = this.getStartEndDateInMonth().endDate;
  @Input() account: string = '';
  @Input() debitor_account: string = '';
  @Input() isShowToolbar:boolean = true;

  filterInput:CON_Account_Book_Detail_ENTITY=new CON_Account_Book_Detail_ENTITY();
  rowSelected:CON_Account_Book_Detail_ENTITY=new CON_Account_Book_Detail_ENTITY();
  listData:CON_Account_Book_Detail_ENTITY[]=[];
  tbName:string = 'CON_Account_Book_Detail';
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
        this.navigatePassParam('warehouse/opening-balance-input-output-inventory-add',[['code',this.idSelect]],new CON_Account_Book_Detail_ENTITY({}),this.tbName)
        break;
      }
      case EditPageState.edit:{
        this.navigatePassParam('warehouse/opening-balance-input-output-inventory-edit',[['code',this.idSelect]],new CON_Account_Book_Detail_ENTITY({}),this.tbName)
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
        this.openWindownForm('con/consolidation-by-a-account');
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
    this.filterInput.voucher_date_start = this.voucher_date_start;
    this.filterInput.voucher_date_end = this.voucher_date_end;
    this.filterInput.account = this.account;
    this.tbName = 'CON_Account_Book_Detail';
    
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
    if(!this.filterInput.account){
      this.showMessageWarning(this.translate('Vui lòng chọn tài khoản.','Choose account, please.'))
      return
    }
    this.consolidationReportService.cON_Account_Book_Detail_Search({
      ...this.filterInput
    } as CON_Account_Book_Detail_ENTITY).subscribe((res:CON_Account_Book_Detail_ENTITY[])=>{
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