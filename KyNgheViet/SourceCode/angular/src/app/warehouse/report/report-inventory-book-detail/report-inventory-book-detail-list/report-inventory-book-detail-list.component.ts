import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { on } from 'events';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { DXDataGridViewComponent } from 'src/app/shared/dx-data-grid/dx-data-grid-view/dx-data-grid-view.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { User } from 'src/app/shared/models/system/account';
import { AcctionService, SYS_ActionsOnTable_ENTITY, WMSReportService, WMS_Report_Inventory_Book_Detail_ENTITY,  } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';
@Component({
  selector: 'app-report-inventory-book-detail-list',
  templateUrl: './report-inventory-book-detail-list.component.html',
  styleUrls: ['./report-inventory-book-detail-list.component.css']
})
export class ReportInventoryBookDetailListComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    injector: Injector,
    private wMSReportService: WMSReportService,
    private appSession: AppSession,
    private acctionService: AcctionService,
  ) { 
    super(injector);
    this.tbName = this.getRouteData('tbName');
    const d = this.getStartEndDateInMonth();
    this.filterInput.voucher_date_start = d.startDate;
    this.filterInput.voucher_date_end = d.endDate;
    const that = this;
    this.closeButtonOptions = {
      text: 'Close',
      stylingMode: 'outlined',
      type: 'normal',
      onClick: () => {
        that.tbName = 'WMS_Report_Inventory_Book_Detail'
        that.setCurrenFrom(EditPageState.view)
        that.popupSetupReportVisible = false;
        that.toolbar.refreshAcction()
        that.toolbar.setAcctionForm(that.listActions)
        this.rowSelected = new WMS_Report_Inventory_Book_Detail_ENTITY()
      },
    };
  }
  @ViewChild('dialogDelete') dialogDelete: DialogAcctionComponent;
  @ViewChild('DataGridGenRowTable') DataGridGenRowTable: DXDataGridViewComponent;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  filterInput:WMS_Report_Inventory_Book_Detail_ENTITY=new WMS_Report_Inventory_Book_Detail_ENTITY();
  rowSelected:WMS_Report_Inventory_Book_Detail_ENTITY=new WMS_Report_Inventory_Book_Detail_ENTITY();
  listData:WMS_Report_Inventory_Book_Detail_ENTITY[]=[];
  listActions:SYS_ActionsOnTable_ENTITY[]=[];
  tbName:string = '';
  CurrenFrom:string = EditPageState.view;
  popupSetupReportVisible = false;
  closeButtonOptions: any;

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
        this.navigatePassParam('warehouse/inventory-book-detail-add',[['code',this.idSelect]],new WMS_Report_Inventory_Book_Detail_ENTITY({}),this.tbName)
        break;
      }
      case EditPageState.edit:{
        this.navigatePassParam('warehouse/inventory-book-detail-edit',[['code',this.idSelect]],new WMS_Report_Inventory_Book_Detail_ENTITY({}),this.tbName)
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
      case EditPageState.delete:{
        this.dialogDelete.open();
        break;
      }
    case 'view_detail_voucher':{
      if(!this.rowSelected.voucher_code) this.showMessageError(this.translate('Vui lòng chọn a số chứng từ','Choose a voucher, Please'))
      this.popupSetupReportVisible = true;
      break;
    }
      default:break;
    }
  }
  ngOnInit(): void {
    this.setAcction();
    this.onLoadData();
    this.onLoadAction();
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
    this.wMSReportService.wMS_Report_Inventory_Book_Detail_Search({
      ...this.filterInput
    } as WMS_Report_Inventory_Book_Detail_ENTITY).subscribe((res:WMS_Report_Inventory_Book_Detail_ENTITY[])=>{
      this.listData = res;
      this.DataGridGenRowTable.setDataSource(res);
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
  confirmDelete(){
   
  }
  onClickPopup(e:any){
    debugger
  }
  
  onLoadAction(){
    var user = new User();
      user = this.appSession.user;
      this.acctionService.acction_Search_byTableName(user.id, 'WMS_Report_Inventory_Book_Detail').subscribe(
        (data: any[]) => {
            this.listActions = data;
        },
        (err) => this.UnBlockUI(),
        () => {
          this.UnBlockUI();
        }
      );
  }
}
