import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import moment from 'moment';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { FormEditV2Component } from 'src/app/shared/form/form-edit-v2/form-edit-v2.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { Accounting_VAT_Input_ENTITY, CAT_Tax_ENTITY, ERPCommonService, ERPCommon_ENTITY, P24_D_ENTITY, P24_M_ENTITY, PurchaseVoucherService, SalesVATService } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'p24-m-edit',
  templateUrl: './p24-m-edit.component.html',
  styleUrls: ['./p24-m-edit.component.css']
})
export class P24MEditComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    injector: Injector,
    private salesVATService: SalesVATService,
    private purchaseVoucherService: PurchaseVoucherService,
    private eRPCommonService: ERPCommonService,
    private appSession: AppSession
  ) { 
    super(injector);
    if(this.getRouteData('voucher_code') == this.getVoucherCodeByName('P24')){
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
    }else{
      this.editPageState = EditPageState.edit;
      this.InputMaster['sys_TableName'] = this.tbName;
      this.InputMaster.voucher_code = this.getVoucherCodeByName('P24');
      this.appSession.setVoucherCode(this.InputMaster.voucher_code);
      this.InputMaster.code = this.idSelect;
    }
    
  }
  @ViewChild('FromEditV2') fromEditV2: FormEditV2Component;
  @ViewChild('dialogDelete') dialogDelete: DialogAcctionComponent;
  @ViewChild('dialogConfirmVAT') dialogConfirmVAT: DialogAcctionComponent;
  @Input() rowSelected: any = '';
  tbName:string = 'P24_M';
  rowGridSelected:any = null;
  onRefreshGrid:boolean = false;
 
  InputMaster:P24_M_ENTITY=new P24_M_ENTITY();
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
    this.purchaseVoucherService.p24_M_Delete(this.InputMaster).subscribe(res=>{
      this.showMessage(res.message,res.status);
      this.navigatePassParam('purchase/return-merchandise-authorization-with-outbound-delivery-note',[['code',this.InputMaster.code],['voucher_date',this.InputMaster.voucher_date.format('YYYY-MM-DD')]],new P24_M_ENTITY({}),this.tbName)
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
        this.navigatePassParam('purchase/return-merchandise-authorization-with-outbound-delivery-note-add',[['code','']],new P24_M_ENTITY({}),this.tbName)

        break;
      }
      case EditPageState.edit:{
        this.navigatePassParam('purchase/return-merchandise-authorization-with-outbound-delivery-note-edit',[['code',this.InputMaster.code],['voucher_date',this.InputMaster.voucher_date.format('YYYY-MM-DD')]],new P24_M_ENTITY({}),this.tbName)
        break;
      }
      case EditPageState.save:{
        if(this.InputMaster.p24_D){
          const i42D: P24_D_ENTITY[] = this.InputMaster.p24_D.map((obj: any) => {
            let item = new P24_D_ENTITY();
            for (const [key, value] of Object.entries(obj)) {
              item[key] = value;
            }
            return item;
          });
          this.InputMaster.p24_D = i42D;
        }
        if(this.InputMaster.accounting_vat_inputs){
          const D: Accounting_VAT_Input_ENTITY[] = this.InputMaster.accounting_vat_inputs.map((obj: any) => {
            let item = new Accounting_VAT_Input_ENTITY();
            for (const [key, value] of Object.entries(obj)) {
              item[key] = value;
            }
            return item;
          });
          this.InputMaster.accounting_vat_inputs = D;
        }

        if(!this.InputMaster.code){
          this.purchaseVoucherService.p24_M_Insert(this.InputMaster).subscribe(res=>{
            this.showMessage(res.message,res.status);
            if(res.status == 0){
              this.InputMaster.code = res.ref_code;
              this.navigatePassParam('purchase/return-merchandise-authorization-with-outbound-delivery-note-view-detail',[['code',this.InputMaster.code],['voucher_date',this.InputMaster.voucher_date.format('YYYY-MM-DD')]],new P24_M_ENTITY({}),this.tbName)
            }
          })
        }else{
          this.purchaseVoucherService.p24_M_Update(this.InputMaster).subscribe(res=>{
            this.showMessage(res.message,res.status);
            if(res.status == 0)this.navigatePassParam('purchase/return-merchandise-authorization-with-outbound-delivery-note-view-detail',[['code',this.InputMaster.code],['voucher_date',this.InputMaster.voucher_date.format('YYYY-MM-DD')]],new P24_M_ENTITY({}),this.tbName)

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
    this.initCombobox();
    if((this.editPageState == EditPageState.viewDetail || this.editPageState == EditPageState.edit) && !this.InputMaster.code){
      this.InputMaster.code = this.rowSelected.voucher_master_code;
      this.InputMaster.voucher_date  = this.rowSelected.voucher_date;
      if(this.InputMaster.voucher_date) this.InputMaster.voucher_date = moment(this.InputMaster.voucher_date).utc(true)
       
      this.onLoadData();
    }
  }
  handleValueChanged(event: any) {
    if(event.dataField == 'is_tax'){
      if(this.InputMaster.code && this.InputMaster[event.dataField] != event.value){
        this.InputMaster[event.dataField]= event.value;
        this.dialogConfirmVAT.open()
      } 
      else {
        this.InputMaster[event.dataField]= event.value;
        this.updateVATIN();
      }
    }
    this.InputMaster[event.dataField]= event.value;
    if(event.dataField == 'tax_code'){
      this.cat_Tax = this.cat_Taxs.find(t=>t.code == event.value);
    }
    else if (event.dataField == 'invoice_no')
    {
      for(var i = 0 ; i < this.InputMaster.accounting_vat_inputs.length ; i ++){
        this.InputMaster.accounting_vat_inputs[i].invoice_no = event.value
      }
      this.onRefreshGrid = !this.onRefreshGrid;
    }
    else if (event.dataField == 'seri_no')
    {
      for(var i = 0 ; i < this.InputMaster.accounting_vat_inputs.length ; i ++){
        this.InputMaster.accounting_vat_inputs[i].series_no = event.value
      }
      this.onRefreshGrid = !this.onRefreshGrid;
    }
    else if(event.dataField == 'tax_code'){
      this.cat_Tax = this.cat_Taxs.find(t=>t.code == event.value);
    }
    else if(event.dataField == 'p24_D' && this.InputMaster.p24_D){
      this.updateVATIN();
    }
    this.InputMaster[event.dataField]= event.value;

    this.caculateSumMoney();
    this.UpdateView();
  }
  updateVATIN(e:any = undefined){
    if(this.InputMaster.is_tax){
      for(var i = 0 ; i < this.InputMaster.p24_D.length ; i ++){
        let s33D = this.InputMaster.p24_D[i];
        let vatOutAuto = new Accounting_VAT_Input_ENTITY({
            voucher_date:this.InputMaster.voucher_date,
            invoice_date:this.InputMaster.voucher_date,
            invoice_no:this.InputMaster.invoice_no,
            series_no:this.InputMaster.seri_no,
            customer_code:this.InputMaster.customer_code,
            customer_name:this.InputMaster.customer_name,
            address:this.InputMaster.address,
            goods_code:s33D.goods_code,
            notes:s33D.goods_name,
            tax_account:this.InputMaster.tax_account,
            tax_code:this.InputMaster.tax_code,
            debitor_account:this.InputMaster.debitor_account,
        })as Accounting_VAT_Input_ENTITY;
        if(!this.InputMaster.accounting_vat_inputs) this.InputMaster.accounting_vat_inputs = [];
        if(!this.InputMaster.accounting_vat_inputs[i]){
          this.InputMaster.accounting_vat_inputs.push(new Accounting_VAT_Input_ENTITY({...vatOutAuto,code:this.newID}) as Accounting_VAT_Input_ENTITY)
        }else{
          let tax = this.cat_Taxs.find(t=>t.code == this.InputMaster.tax_code);
          this.InputMaster.accounting_vat_inputs[i].voucher_date=this.InputMaster.voucher_date;
          this.InputMaster.accounting_vat_inputs[i].invoice_date=this.InputMaster.voucher_date;
          this.InputMaster.accounting_vat_inputs[i].invoice_no=this.InputMaster.invoice_no;
          this.InputMaster.accounting_vat_inputs[i].series_no=this.InputMaster.seri_no;
          this.InputMaster.accounting_vat_inputs[i].customer_code=this.InputMaster.customer_code;
          this.InputMaster.accounting_vat_inputs[i].customer_name=this.InputMaster.customer_name;
          this.InputMaster.accounting_vat_inputs[i].address=this.InputMaster.address;
          this.InputMaster.accounting_vat_inputs[i].goods_code=s33D.goods_code;
          this.InputMaster.accounting_vat_inputs[i].notes=s33D.goods_name;
          this.InputMaster.accounting_vat_inputs[i].quantity=s33D.quantity;
          this.InputMaster.accounting_vat_inputs[i].price=s33D.price;
          this.InputMaster.accounting_vat_inputs[i].tax_account=this.InputMaster.tax_account;
          this.InputMaster.accounting_vat_inputs[i].tax_code=this.InputMaster.tax_code;
          this.InputMaster.accounting_vat_inputs[i].debitor_account=this.InputMaster.debitor_account;
          this.InputMaster.accounting_vat_inputs[i].total_money=s33D.arise;
          this.InputMaster.accounting_vat_inputs[i].total_money_fc=s33D.arise_fc;
          this.InputMaster.accounting_vat_inputs[i].tax_rate=tax.tax;
          this.InputMaster.accounting_vat_inputs[i].tax =s33D.arise*(tax.tax/100);
          this.InputMaster.accounting_vat_inputs[i].tax_fc =s33D.arise_fc * (tax.tax/100);
        }
      }
    }else this.InputMaster.accounting_vat_inputs = []
 
    this.onRefreshGrid = !this.onRefreshGrid;
  }
  async caculateSumMoney(){
    if (this.InputMaster.exchange_rate == 1){
      try{
        this.InputMaster.total_money_goods = this.InputMaster.p24_D.reduce((accumulator, currentObject) => {
          return accumulator + currentObject.arise;
        }, 0);
       
        this.InputMaster.tax_money = this.formatDefaultNumber(this.InputMaster.total_money_goods * (this.getTax.tax/100));
        this.InputMaster.total_money = this.formatDefaultNumber(this.InputMaster.total_money_goods + this.InputMaster.tax_money);

        this.InputMaster.tax_money_fc = 0 
        this.InputMaster.total_money_fc = 0 
        this.InputMaster.total_money_goods = 0 
      }catch{}
    }else{
      try{
        this.InputMaster.total_money_goods_fc = this.InputMaster.p24_D.reduce((accumulator, currentObject) => {
          return accumulator + currentObject.arise_fc;
        }, 0);
        this.InputMaster.tax_money_fc = this.formatDefaultNumber(this.InputMaster.total_money_goods_fc * (this.getTax.tax/100));
        this.InputMaster.total_money_fc = this.formatDefaultNumber(this.InputMaster.total_money_goods_fc + this.InputMaster.tax_money_fc);
      }catch{}
      this.InputMaster.tax_money = this.formatDefaultNumber(this.InputMaster.tax_money_fc * this.InputMaster.exchange_rate);
      this.InputMaster.total_money_goods = this.formatDefaultNumber(this.InputMaster.total_money_goods_fc * this.InputMaster.exchange_rate);
      this.InputMaster.total_money = this.formatDefaultNumber(this.InputMaster.total_money_fc * this.InputMaster.exchange_rate);
    }
  }
  onSelectedRowsDataInput(event: any) {
    this.rowGridSelected = event;
  }
  HandleRowsDataGridInput(event: any) {
   
    
    this.UpdateView();
  }
  selectedRowsGridData(e: any){
    debugger
  }
  onSelectedRowsDataOutput(event: any) {
    this.rowGridSelected = event;
  }
  HandleRowsDataGridOutput(event: any) {
    if(this.editPageState !== EditPageState.add) return;
    try{ if (event.dataField == 'customer_code')
      {
        this.InputMaster.customer_name = event.value[0].name;
        this.InputMaster.address = event.value[0].address;
      }
      else if (event.dataField == 'tax_code')
        this.InputMaster.tax_account = event.value[0].tax_account;
      else if (event.dataField == 'profession_code')
      {
        this.InputMaster.description = event.value[0].notes;
        this.InputMaster.debitor_account = event.value[0].account1;
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
    this.purchaseVoucherService.p24_M_Search(new P24_M_ENTITY({
      // voucher_date:moment(this.InputMaster.voucher_date).utc(true),
      code:this.InputMaster.code,
      voucher_code:this.getVoucherCodeByName('P24')
    }) as P24_M_ENTITY).subscribe((resonse:P24_M_ENTITY[])=>{
      if(resonse[0])
        this.InputMaster = resonse[0];
    })
  }
  get getTax():CAT_Tax_ENTITY{
    if(this.cat_Tax.tax) return this.cat_Tax
    else return this.cat_Taxs.find(t=>t.code == this.InputMaster.tax_code)
  }
  async initCombobox(){
    this.cat_Taxs = await this.salesVATService.cAT_Tax_Search(new CAT_Tax_ENTITY()).toPromise()
  }
}
