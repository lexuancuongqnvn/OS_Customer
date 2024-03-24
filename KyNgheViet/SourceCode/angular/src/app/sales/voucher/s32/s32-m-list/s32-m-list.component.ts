import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { DXDataGridViewComponent } from 'src/app/shared/dx-data-grid/dx-data-grid-view/dx-data-grid-view.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { DialogPreviewPrintComponent } from 'src/app/shared/layout/dialogs/dialog-preview-print/dialog-preview-print.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { S32_M_ENTITY, SalesVoucherService, WMSVoucherService } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 's32-m-list',
  templateUrl: './s32-m-list.component.html',
  styleUrls: ['./s32-m-list.component.css']
})
export class S32MListComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    injector: Injector,
    private salesVoucherService: SalesVoucherService,
    private appSession: AppSession,
  ) { 
    super(injector);
    if(this.getRouteData('voucher_code') == this.getVoucherCodeByName('S32')){
      this.tbName = this.getRouteData('tbName');
      this.filterInput.voucher_code = this.getRouteData('voucher_code');
    }else{
      this.filterInput.voucher_code = this.getVoucherCodeByName('S32');
    }
  }

  @ViewChild('DataGridGenRowTable') DataGridGenRowTable: DXDataGridViewComponent;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  @ViewChild('dialogDelete') dialogDelete: DialogAcctionComponent;
  @ViewChild('dialogPreviewPrint') dialogPreviewPrint: DialogPreviewPrintComponent;

  filterInput:S32_M_ENTITY=new S32_M_ENTITY();
  rowSelected:S32_M_ENTITY=new S32_M_ENTITY();
  listGenRowTable:S32_M_ENTITY[]=[];
  tbName:string = 'S32_M';
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
    this.salesVoucherService.s32_M_Delete(this.filterInput).subscribe(res=>{
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
        this.navigatePassParam('sales-invoice-with-goods-delivery-note-add',[['code',this.idSelect]],new S32_M_ENTITY({}),this.tbName)
        break;
      }
      case EditPageState.edit:{
        this.navigatePassParam('sales-invoice-with-goods-delivery-note-edit',[['code',this.idSelect],['voucher_date',this.rowSelected.voucher_date.format('YYYY-MM-DD')]],new S32_M_ENTITY({}),this.tbName)
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
        this.navigatePassParam('sales-invoice-with-goods-delivery-note-view-detail',[['code',this.idSelect],['voucher_date',this.rowSelected.voucher_date.format('YYYY-MM-DD')]],new S32_M_ENTITY({}),this.tbName)
        break;
      }
      case EditPageState.delete:{
        this.dialogDelete.open();
        break;
      }
      case 'print':{
        if(!this.rowSelected.code)this.showMessageWarning(this.translate('Vui lòng chọn một dòng dữ liệu','Choose a row'))
        this.dialogPreviewPrint.onPrint(this.tbName,this.rowSelected)
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
    this.filterInput.s32_D = [];
    this.filterInput.accounting_VAT_Outputs = [];
    this.filterInput.s32_KIT = [];
    this.salesVoucherService.s32_M_Search({
      ...this.filterInput
    } as S32_M_ENTITY).subscribe((res:S32_M_ENTITY[])=>{
      this.listGenRowTable = res;
      this.DataGridGenRowTable.setDataSource(res);
      this.UpdateView();
    })
  }
  onSelectedRowsData(obj:any){
    this.rowSelected = obj[0];
  }
}