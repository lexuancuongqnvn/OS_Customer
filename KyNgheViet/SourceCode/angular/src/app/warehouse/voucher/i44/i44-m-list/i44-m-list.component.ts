import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { DXDataGridViewComponent } from 'src/app/shared/dx-data-grid/dx-data-grid-view/dx-data-grid-view.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { I44_M_ENTITY, WarehouseService, WMSVoucherService } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-i44-m-list',
  templateUrl: './i44-m-list.component.html',
  styleUrls: ['./i44-m-list.component.css']
})
export class I44MListComponent  extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    injector: Injector,
    private wMSVoucherService: WMSVoucherService,
    private appSession: AppSession,
  ) { 
    super(injector);
    this.tbName = this.getRouteData('tbName');
    this.filterInput.voucher_code = this.getRouteData('voucher_code');
    this.appSession.setVoucherCode(this.filterInput.voucher_code);
  }

  @ViewChild('DataGridGenRowTable') DataGridGenRowTable: DXDataGridViewComponent;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  @ViewChild('dialogDelete') dialogDelete: DialogAcctionComponent;

  filterInput:I44_M_ENTITY=new I44_M_ENTITY();
  rowSelected:I44_M_ENTITY=new I44_M_ENTITY();
  listGenRowTable:I44_M_ENTITY[]=[];
  tbName:string = 'I44_M';
  CurrenFrom:string = EditPageState.view;

  onAdd(): void {
    throw new Error('Method not implemented.');
  }
  onUpdate(item: any): void {
    throw new Error('Method not implemented.');
  }
  onDelete(item: any): void {
    this.filterInput.code = this.idSelect;
    this.wMSVoucherService.i44_M_Delete(new I44_M_ENTITY({
      ...this.rowSelected,
      code:this.idSelect,
      voucher_code:this.appSession.getVoucherCode,
      company_code:this.appSession.user.company_code
    }) as I44_M_ENTITY).subscribe(res=>{
      this.showMessage(res.message,res.status);
      this.filterInput.code = ''
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
        this.navigatePassParam('warehouse/goods-transfer-add',[['code',this.idSelect]],new I44_M_ENTITY({}),this.tbName)
        break;
      }
      case EditPageState.edit:{
        this.navigatePassParam('warehouse/goods-transfer-edit',[['code',this.idSelect],['voucher_date',this.rowSelected.voucher_date.format('YYYY-MM-DD')]],new I44_M_ENTITY({}),this.tbName)
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
        this.navigatePassParam('warehouse/goods-transfer-view-detail',[['code',this.idSelect],['voucher_date',this.rowSelected.voucher_date.format('YYYY-MM-DD')]],new I44_M_ENTITY({}),this.tbName)

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
    this.wMSVoucherService.i44_M_Search({
      ...this.filterInput
    } as I44_M_ENTITY).subscribe((res:I44_M_ENTITY[])=>{
      this.listGenRowTable = res;
      this.DataGridGenRowTable.setDataSource(res);
      this.UpdateView();
    })
  }
  onSelectedRowsData(obj:any){
    this.rowSelected = obj[0];
  }
}