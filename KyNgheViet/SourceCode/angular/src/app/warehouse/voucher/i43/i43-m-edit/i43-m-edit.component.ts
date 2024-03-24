import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import moment from 'moment';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { FormEditV2Component } from 'src/app/shared/form/form-edit-v2/form-edit-v2.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ERPCommonService, ERPCommon_ENTITY, I43_D_ENTITY, I43_M_ENTITY, WarehouseService, WMSVoucherService, CAT_Goods_Configuration_ENTITY } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'i43-m-edit',
  templateUrl: './i43-m-edit.component.html',
  styleUrls: ['./i43-m-edit.component.css']
})
export class I43MEditComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    injector: Injector,
    private wMSVoucherService: WMSVoucherService,
    private eRPCommonService: ERPCommonService,
    private appSession: AppSession
  ) { 
    super(injector);
    if(this.getRouteData('voucher_code') == this.getVoucherCodeByName('I43')){
      this.editPageState = this.getRouteData('editPageState');
      this.tbName = this.getRouteData('tbName');
      this.InputMaster['sys_TableName'] = this.tbName;
      this.InputMaster.voucher_code = this.getRouteData('voucher_code');
      this.appSession.setVoucherCode(this.InputMaster.voucher_code);
      if(this.editPageState == EditPageState.add){
        this.InputMaster.voucher_date = moment();
        this.onGetVoucherNo();
      }else if(this.editPageState == EditPageState.edit || this.editPageState == EditPageState.viewDetail){
        this.InputMaster.code = this.getRouteParamObj('code');
        // this.InputMaster.voucher_date  = this.getRouteParamObj('voucher_date');
        // if(this.InputMaster.voucher_date) this.InputMaster.voucher_date = moment(this.InputMaster.voucher_date).utc(true)
        this.onLoadData();
      }
    }else{
      this.editPageState = EditPageState.edit;
      this.InputMaster['sys_TableName'] = this.tbName;
      this.InputMaster.voucher_code = this.getVoucherCodeByName('I43');
      this.appSession.setVoucherCode(this.InputMaster.voucher_code);
      this.InputMaster.code = this.idSelect;
    }
    
  }
  @ViewChild('FromEditV2') fromEditV2: FormEditV2Component;
  @ViewChild('dialogDelete') dialogDelete: DialogAcctionComponent;
  @Input() rowSelected: any = '';
  tbName:string = 'I43_M';
  rowGridSelected:any = null;
 
  InputMaster:I43_M_ENTITY=new I43_M_ENTITY();
  editPageState:string = EditPageState.edit;
  onAdd(): void {
    throw new Error('Method not implemented.');
  }
  onUpdate(item: any): void {
    throw new Error('Method not implemented.');
  }
  onDelete(item: any): void {
    this.wMSVoucherService.i43_M_Delete(this.InputMaster).subscribe(res=>{
      this.showMessage(res.message,res.status);
      this.navigatePassParam('warehouse/goods-delivery-note',[['code',this.InputMaster.code],['voucher_date',this.InputMaster.voucher_date.format('YYYY-MM-DD')]],new I43_M_ENTITY({}),this.tbName)
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
  onClickAcctionResponse(e:any): void {
    switch(e.classForm){
      case EditPageState.add:{
        this.navigatePassParam('warehouse/goods-delivery-note-add',[['code','']],new I43_M_ENTITY({}),this.tbName)
        break;
      }
      case EditPageState.edit:{
        this.navigatePassParam('warehouse/goods-delivery-note-edit',[['code',this.InputMaster.code],['voucher_date',this.InputMaster.voucher_date.format('YYYY-MM-DD')]],new I43_M_ENTITY({}),this.tbName)
        break;
      }
      case EditPageState.save:{
        if(this.InputMaster.i43_D){
          const i42D: I43_D_ENTITY[] = this.InputMaster.i43_D.map((obj: any) => {
            let item = new I43_D_ENTITY();
            for (const [key, value] of Object.entries(obj)) {
              item[key] = value;
            }
            return item;
          });
          this.InputMaster.i43_D = i42D;
        }
        if(this.InputMaster.cat_goods_configurations){
          const D: CAT_Goods_Configuration_ENTITY[] = this.InputMaster.cat_goods_configurations.map((obj: any) => {
            let item = new CAT_Goods_Configuration_ENTITY();
            for (const [key, value] of Object.entries(obj)) {
              item[key] = value;
            }
            return item;
          });
          this.InputMaster.cat_goods_configurations = D;
        }
        if(!this.InputMaster.code){
          this.wMSVoucherService.i43_M_Insert(this.InputMaster).subscribe(res=>{
            this.showMessage(res.message,res.status);
            if(res.status == 0){
              this.InputMaster.code = res.ref_code;
              this.navigatePassParam('warehouse/goods-delivery-note-view-detail',[['code',this.InputMaster.code],['voucher_date',this.InputMaster.voucher_date.format('YYYY-MM-DD')]],new I43_M_ENTITY({}),this.tbName)
            }
          })
        }else{
          this.wMSVoucherService.i43_M_Update(this.InputMaster).subscribe(res=>{
            this.showMessage(res.message,res.status);
            if(res.status == 0)this.navigatePassParam('warehouse/goods-delivery-note-view-detail',[['code',this.InputMaster.code],['voucher_date',this.InputMaster.voucher_date.format('YYYY-MM-DD')]],new I43_M_ENTITY({}),this.tbName)

          })
        }
        break;
      }
      case EditPageState.search:{
        break;
      }
      case EditPageState.viewDetail:{
       
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
  onClickAcction(id: number, storedName: string, param: string, keyService: string, classForm: string): void {
   
  }
  getDataByID(storedName: string, param: string, keyService: string): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    if((this.editPageState == EditPageState.viewDetail || this.editPageState == EditPageState.edit) && !this.InputMaster.code){
      this.InputMaster.code = this.rowSelected.voucher_master_code;
      this.InputMaster.voucher_date  = this.rowSelected.voucher_date;
      if(this.InputMaster.voucher_date) this.InputMaster.voucher_date = moment(this.InputMaster.voucher_date).utc(true)
       
      this.onLoadData();
    }
  }
  handleValueChanged(event: any) {

    this.InputMaster[event.dataField]= event.value;
    this.caculateSumMoney();
    this.UpdateView();
  }
  async caculateSumMoney(){
    try{
      this.InputMaster.total_money = this.InputMaster.i43_D.reduce((accumulator, currentObject) => {
        return accumulator + currentObject.arise;
      }, 0);
    }catch{}
  }
  onSelectedRowsDataOutput(event: any) {
    this.rowGridSelected = event;
  }
  HandleRowsDataGridOutput(event: any) {
    if(this.editPageState !== EditPageState.add) return;
    try{
      if (event.dataField == 'customer_code')
        this.InputMaster['customer_name'] = event.value[0].name;
      if (event.dataField == 'profession_code')
        this.InputMaster['notes'] = event.value[0].notes;
      if (event.dataField == 'code_fc')
        this.InputMaster['exchange_rate'] = event.value[0].exchange_rate;
    }catch{}
    this.UpdateEditV2();
  }
  onGetVoucherNo(){
    this.eRPCommonService.eRP_Common_Generate_Voucher_No(new ERPCommon_ENTITY({
      company_code:this.appSession.user.company_code,
      voucher_code:this.appSession.getVoucherCode,
      voucher_date:this.InputMaster.voucher_date
    }) as ERPCommon_ENTITY).subscribe((res)=>{
      if(res.status != 0) this.showMessageError(res.message);
      else this.InputMaster.voucher_no = res.result;
    })
  }
  onLoadData(){
    this.wMSVoucherService.i43_M_Search(new I43_M_ENTITY({
      code:this.InputMaster.code,
      voucher_code:this.getVoucherCodeByName('I43')
    }) as I43_M_ENTITY).subscribe((resonse:I43_M_ENTITY[])=>{
      if(resonse[0])
        this.InputMaster = resonse[0];
      else
        {
          // this.showMessageError('Không tìm thấy dữ liệu.')
          this.goBack();
        }
    })
  }
}
