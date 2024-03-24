import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import moment from 'moment';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { FormEditV2Component } from 'src/app/shared/form/form-edit-v2/form-edit-v2.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { CAT_Tax_ENTITY, ERPCommonService, ERPCommon_ENTITY, P26_D_ENTITY, P26_M_ENTITY, PurchaseVoucherService, SalesVATService } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-p26-m-edit',
  templateUrl: './p26-m-edit.component.html',
  styleUrls: ['./p26-m-edit.component.css']
})
export class P26MEditComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    injector: Injector,
    private salesVATService: SalesVATService,
    private purchaseVoucherService: PurchaseVoucherService,
    private eRPCommonService: ERPCommonService,
    private appSession: AppSession
  ) { 
    super(injector);
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
      this.InputMaster.voucher_date  = this.getRouteParamObj('voucher_date');
      if(this.InputMaster.voucher_date) this.InputMaster.voucher_date = moment(this.InputMaster.voucher_date).utc(true)
      this.onLoadData();
    }
  }
  @ViewChild('FromEditV2') fromEditV2: FormEditV2Component;
  @ViewChild('dialogDelete') dialogDelete: DialogAcctionComponent;
  tbName:string = 'P26_M';
  rowGridSelected:any = null;
  onRefreshGrid:boolean = false;
 
  InputMaster:P26_M_ENTITY=new P26_M_ENTITY();
  editPageState:string = EditPageState.edit;
  cat_Taxs:CAT_Tax_ENTITY[] = [];
  cat_Tax:CAT_Tax_ENTITY = new CAT_Tax_ENTITY();
  onAdd(): void {
    throw new Error('Method not implemented.');
  }
  onUpdate(item: any): void {
    throw new Error('Method not implemented.');
  }
  onDelete(item: any): void {
    this.purchaseVoucherService.p26_M_Delete(this.InputMaster).subscribe(res=>{
      this.showMessage(res.message,res.status);
      this.navigatePassParam('purchase/payment-documents-based-on-invoices',[['code',this.InputMaster.code],['voucher_date',this.InputMaster.voucher_date.format('YYYY-MM-DD')]],new P26_M_ENTITY({}),this.tbName)
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
      
        break;
      }
      case EditPageState.edit:{
        this.navigatePassParam('purchase/payment-documents-based-on-invoices-edit',[['code',this.InputMaster.code],['voucher_date',this.InputMaster.voucher_date.format('YYYY-MM-DD')]],new P26_M_ENTITY({}),this.tbName)
        break;
      }
      case EditPageState.save:{
        if(this.InputMaster.p26_D){
          const i42D: P26_D_ENTITY[] = this.InputMaster.p26_D.map((obj: any) => {
            let item = new P26_D_ENTITY();
            for (const [key, value] of Object.entries(obj)) {
              item[key] = value;
            }
            return item;
          });
          this.InputMaster.p26_D = i42D;
        }
       
        if(!this.InputMaster.code){
          this.purchaseVoucherService.p26_M_Insert(this.InputMaster).subscribe(res=>{
            this.showMessage(res.message,res.status);
            if(res.status == 0){
              this.InputMaster.code = res.ref_code;
              this.navigatePassParam('purchase/payment-documents-based-on-invoices-view-detail',[['code',this.InputMaster.code],['voucher_date',this.InputMaster.voucher_date.format('YYYY-MM-DD')]],new P26_M_ENTITY({}),this.tbName)
            }
          })
        }else{
          this.purchaseVoucherService.p26_M_Update(this.InputMaster).subscribe(res=>{
            this.showMessage(res.message,res.status);
            if(res.status == 0)this.navigatePassParam('purchase/payment-documents-based-on-invoices-view-detail',[['code',this.InputMaster.code],['voucher_date',this.InputMaster.voucher_date.format('YYYY-MM-DD')]],new P26_M_ENTITY({}),this.tbName)

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
  onRefreshGridOutput(event: any) {
    this.onRefreshGrid = event;
  }
  ngOnInit(): void {
  }
  handleValueChanged(event: any) {
    if(event.dataField == 'tax_code'){
      this.cat_Tax = this.cat_Taxs.find(t=>t.code == event.value);
    }
    else if(event.dataField == 'P26_D' && this.InputMaster.p26_D){
     
    }
    
    this.InputMaster[event.dataField]= event.value;
    this.caculateSumMoney();
    this.UpdateView();
  }
  async caculateSumMoney(){
    if (this.InputMaster.exchange_rate == 1){
      try{
        this.InputMaster.total_money = this.InputMaster.p26_D.reduce((accumulator, currentObject) => {
          return accumulator + currentObject.payment;
        }, 0);
      }catch{}
    }else{
      try{
        this.InputMaster.total_money_fc= this.InputMaster.p26_D.reduce((accumulator, currentObject) => {
          return accumulator + currentObject.payment_fc;
        }, 0);
        this.InputMaster.total_money = this.InputMaster.total_money_fc * this.InputMaster.exchange_rate;
      }catch{}
    }
  }
  selectedRowsGridData(e: any){
    if(e.e.event.length>0 && e.cell.columN_NAME == 'p26_D'){
      let p = new P26_D_ENTITY();
      p.debitor_account = e.e.event[0].creditor_account;
      p.code_fc = e.e.event[0].code_fc;
      p.invoice_exchange_rate = e.e.event[0].exchange_rate;
      p.payment_required_fc = e.e.event[0].total_money_fc;
      p.payment_required = e.e.event[0].total_money;
      p.invoice_exchange_rate = e.e.event[0].exchange_rate;
      p.payment_fc = this.formatDefaultNumber(this.InputMaster.p26_D[e.e.cell.rowIndex].payment_fc);
      p.payment = this.formatDefaultNumber(this.InputMaster.p26_D[e.e.cell.rowIndex].payment);
      p.remaining_asset_acquisition_money_fc = this.formatDefaultNumber(p.payment_required_fc-p.payment_fc);
      p.remaining_asset_acquisition_money = this.formatDefaultNumber(p.payment_required-p.payment);
      this.InputMaster.p26_D[e.e.cell.rowIndex]=new P26_D_ENTITY(
        {...this.InputMaster.p26_D[e.e.cell.rowIndex],...p} as P26_D_ENTITY)
      
      
        this.onRefreshGrid = !this.onRefreshGrid;
    }
  }
  onSelectedRowsDataInput(event: any) {
    this.rowGridSelected = event;
  }
  HandleRowsDataGridInput(event: any) {
   
    
    this.UpdateView();
  }
  onSelectedRowsDataOutput(event: any) {
    this.rowGridSelected = event;
  }
  async HandleRowsDataGridOutput(event: any) {
    if(this.editPageState !== EditPageState.add) return;
    try{ if (event.dataField == 'customer_code')
      {
        this.InputMaster.address = event.value[0].address;
        this.InputMaster.customer_name = event.value[0].name;
      }
      else if (event.dataField == 'profession_code')
      {
        this.InputMaster.description = event.value[0].notes;
        this.InputMaster.creditor_account = event.value[0].balance_account1;
      }
      else if (event.dataField == 'code_fc')
        this.InputMaster.exchange_rate = event.value[0].exchange_rate;
      
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
    this.purchaseVoucherService.p26_M_Search(new P26_M_ENTITY({
      //voucher_date:moment(this.InputMaster.voucher_date).utc(true),
      code:this.InputMaster.code,
      voucher_code:this.appSession.getVoucherCode
    }) as P26_M_ENTITY).subscribe((resonse:P26_M_ENTITY[])=>{
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
