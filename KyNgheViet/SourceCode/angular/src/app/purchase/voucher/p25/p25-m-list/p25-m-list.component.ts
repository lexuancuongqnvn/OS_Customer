import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { DXDataGridViewComponent } from 'src/app/shared/dx-data-grid/dx-data-grid-view/dx-data-grid-view.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { P25_M_ENTITY, PurchaseVoucherService } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-p25-m-list',
  templateUrl: './p25-m-list.component.html',
  styleUrls: ['./p25-m-list.component.css']
})
export class P25MListComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    injector: Injector,
    private purchaseVoucherService: PurchaseVoucherService,
    private appSession: AppSession,
  ) { 
    super(injector);
    this.tbName = this.getRouteData('tbName');
    //this.filterInput.voucher_date = this.getFullVoucherDate;;
    this.filterInput.voucher_code = this.getRouteData('voucher_code');
  }

  @ViewChild('DataGridGenRowTable') DataGridGenRowTable: DXDataGridViewComponent;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  @ViewChild('dialogDelete') dialogDelete: DialogAcctionComponent;
  filterInput:P25_M_ENTITY=new P25_M_ENTITY();
  rowSelected:P25_M_ENTITY=new P25_M_ENTITY();
  listData:P25_M_ENTITY[]=[];
  tbName:string = 'P25_M';
  CurrenFrom:string = EditPageState.view;

  onAdd(): void {
    throw new Error('Method not implemented.');
  }
  onUpdate(item: any): void {
    throw new Error('Method not implemented.');
  }
  onDelete(item: any): void {
    this.filterInput = this.rowSelected;
    this.filterInput.code = this.idSelect;
    this.filterInput.voucher_date = this.rowSelected.voucher_date;
    this.filterInput.voucher_code = this.rowSelected.voucher_code;
    this.purchaseVoucherService.p25_M_Delete(this.filterInput).subscribe(res=>{
      this.showMessage(res.message,res.status);
      this.filterInput.code = '';
      this.onLoadData()
    })
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
        this.navigatePassParam('purchase/purchase-cost-documents-add',[['code',this.idSelect]],new P25_M_ENTITY({}),this.tbName)
        break;
      }
      case EditPageState.edit:{
        this.navigatePassParam('purchase/purchase-cost-documents-edit',[['code',this.idSelect],['voucher_date',this.rowSelected.voucher_date.format('YYYY-MM-DD')]],new P25_M_ENTITY({}),this.tbName)
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
        this.navigatePassParam('purchase/purchase-cost-documents-view-detail',[['code',this.idSelect],['voucher_date',this.rowSelected.voucher_date.format('YYYY-MM-DD')]],new P25_M_ENTITY({}),this.tbName)

        break;
      }
      case EditPageState.delete:{
        this.dialogDelete.open();
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
    this.filterInput.p25_D = [];
    this.filterInput.accounting_vat_inputs = [];
    this.purchaseVoucherService.p25_M_Search({
      ...this.filterInput
    } as P25_M_ENTITY).subscribe((res:P25_M_ENTITY[])=>{
      this.listData = res;
      this.DataGridGenRowTable.setDataSource(res);
      this.UpdateView();
    })
  }
  onSelectedRowsData(obj:any){
    this.rowSelected = obj[0];
  }
}
