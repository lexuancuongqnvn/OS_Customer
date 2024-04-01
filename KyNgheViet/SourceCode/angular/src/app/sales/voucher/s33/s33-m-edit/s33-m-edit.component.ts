import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import moment from 'moment';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { FormEditV2Component } from 'src/app/shared/form/form-edit-v2/form-edit-v2.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { Accounting_VAT_Output_ENTITY, CAT_Customer_ENTITY, CAT_Profession_ENTITY, CAT_Tax_ENTITY, ERPCommonService, ERPCommon_ENTITY, S33_D_ENTITY, S33_M_ENTITY, SalesVATService, SalesVoucherService } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 's33-m-edit',
  templateUrl: './s33-m-edit.component.html',
  styleUrls: ['./s33-m-edit.component.css']
})
export class S33MEditComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    injector: Injector,
    private salesVATService: SalesVATService,
    private salesVoucherService: SalesVoucherService,
    private eRPCommonService: ERPCommonService,
    private appSession: AppSession
  ) { 
    super(injector);
    if(this.getRouteData('voucher_code') == this.getVoucherCodeByName('S33')){
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
      this.InputMaster.voucher_code = this.getVoucherCodeByName('S33');
      this.appSession.setVoucherCode(this.InputMaster.voucher_code);
      this.InputMaster.code = this.idSelect;
    }
  }
  @ViewChild('FromEditV2') fromEditV2: FormEditV2Component;
  @ViewChild('dialogDelete') dialogDelete: DialogAcctionComponent;
  @ViewChild('dialogConfirmVAT') dialogConfirmVAT: DialogAcctionComponent;
  @ViewChild('dialogConfirmAccount') dialogConfirmAccount: DialogAcctionComponent;
  @Input() rowSelected: any = '';
  tbName:string = 'S33_M';
  rowGridSelected:any = null;
  ProfessionSelected:CAT_Profession_ENTITY=new CAT_Profession_ENTITY();
  CustomerSelected:CAT_Customer_ENTITY=new CAT_Customer_ENTITY();
 
  InputMaster:S33_M_ENTITY=new S33_M_ENTITY();
  editPageState:string = EditPageState.edit;
  cat_Taxs:CAT_Tax_ENTITY[] = [];
  cat_Tax:CAT_Tax_ENTITY = new CAT_Tax_ENTITY();
  onRefreshGrid:boolean = false;
  onAdd(): void {
    throw new Error('Method not implemented.');
  }
  onUpdate(item: any): void {
    throw new Error('Method not implemented.');
  }
  onDelete(item: any): void {
    this.salesVoucherService.s33_M_Delete(this.InputMaster).subscribe(res=>{
      this.showMessage(res.message,res.status);
      this.navigatePassParam('sales/discount-invoice-and-sales-return',[['code',this.idSelect]],new S33_M_ENTITY({}),this.tbName)    })
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
        this.navigatePassParam('sales/discount-invoice-and-sales-return-add',[['code','']],new S33_M_ENTITY({}),this.tbName)
        break;
      }
      case EditPageState.edit:{
        this.navigatePassParam('sales/discount-invoice-and-sales-return-edit',[['code',this.InputMaster.code],['voucher_date',this.InputMaster.voucher_date.format('YYYY-MM-DD')]],new S33_M_ENTITY({}),this.tbName)
        break;
      }
      case EditPageState.save:{
        if(this.InputMaster.s33_D){
          const i42D: S33_D_ENTITY[] = this.InputMaster.s33_D.map((obj: any) => {
            let item = new S33_D_ENTITY();
            for (const [key, value] of Object.entries(obj)) {
              item[key] = value;
            }
            return item;
          });
          this.InputMaster.s33_D = i42D;
        }
        if(this.InputMaster.accounting_VAT_Outputs){
          const D: Accounting_VAT_Output_ENTITY[] = this.InputMaster.accounting_VAT_Outputs.map((obj: any) => {
            let item = new Accounting_VAT_Output_ENTITY();
            for (const [key, value] of Object.entries(obj)) {
              item[key] = value;
            }
            return item;
          });
          this.InputMaster.accounting_VAT_Outputs = D;
        }
        
        if(!this.InputMaster.code){
          this.salesVoucherService.s33_M_Insert(this.InputMaster).subscribe(res=>{
            this.showMessage(res.message,res.status);
            if(res.status == 0){
              this.InputMaster.code = res.ref_code;
              this.navigatePassParam('sales/discount-invoice-and-sales-return-view-detail',[['code',this.InputMaster.code],['voucher_date',this.InputMaster.voucher_date.format('YYYY-MM-DD')]],new S33_M_ENTITY({}),this.tbName)
            }
          })
        }else{
          this.salesVoucherService.s33_M_Update(this.InputMaster).subscribe(res=>{
            this.showMessage(res.message,res.status);
            if(res.status == 0)this.navigatePassParam('sales/discount-invoice-and-sales-return-view-detail',[['code',this.InputMaster.code],['voucher_date',this.InputMaster.voucher_date.format('YYYY-MM-DD')]],new S33_M_ENTITY({}),this.tbName)

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
    this.initCombobox();
    if((this.editPageState == EditPageState.viewDetail || this.editPageState == EditPageState.edit) && !this.InputMaster.code){
      this.InputMaster.code = this.rowSelected.voucher_master_code;
      this.InputMaster.voucher_date  = this.rowSelected.voucher_date;
      if(this.InputMaster.voucher_date) this.InputMaster.voucher_date = moment(this.InputMaster.voucher_date).utc(true)
       
      this.onLoadData();
    }
  }
  updateAccount(e:any = undefined){
    if(!this.ProfessionSelected || !this.ProfessionSelected.code) return;
    for(var i = 0 ; i < this.InputMaster.s33_D.length ; i ++){
      this.InputMaster.s33_D[i].sales_returns_account = this.ProfessionSelected.account1;
    }
    this.ProfessionSelected = null;
    this.onRefreshGrid = !this.onRefreshGrid;
  }
  handleValueChanged(event: any) {
    if(event.dataField == 'is_tax'){
      if(this.InputMaster.code && this.InputMaster[event.dataField] != event.value){
        this.InputMaster[event.dataField]= event.value;
        this.dialogConfirmVAT.open()
      } 
      else {
        this.InputMaster[event.dataField]= event.value;
        this.updateVATOUT();
      }
    }
    this.InputMaster[event.dataField]= event.value;
    if(event.dataField == 'tax_code'){
      this.cat_Tax = this.cat_Taxs.find(t=>t.code == event.value);
    }
    else if (event.dataField == 'invoice_no')
    {
      for(var i = 0 ; i < this.InputMaster.accounting_VAT_Outputs.length ; i ++){
        this.InputMaster.accounting_VAT_Outputs[i].invoice_no = event.value
      }
      this.onRefreshGrid = !this.onRefreshGrid;
    }
    else if (event.dataField == 'series_no')
    {
      for(var i = 0 ; i < this.InputMaster.accounting_VAT_Outputs.length ; i ++){
        this.InputMaster.accounting_VAT_Outputs[i].series_no = event.value
      }
      this.onRefreshGrid = !this.onRefreshGrid;
    }else if(event.dataField == 'tax_code'){
      this.cat_Tax = this.cat_Taxs.find(t=>t.code == event.value);
    }else if(event.dataField == 's33_D' && this.InputMaster.s33_D){
      this.updateVATOUT();
      this.updateAccount();
    }

    this.InputMaster[event.dataField]= event.value;
    this.caculateSumMoney();
    this.UpdateView();
  }
  updateVATOUT(e:any = undefined){
    if(this.InputMaster.is_tax){
      for(var i = 0 ; i < this.InputMaster.s33_D.length ; i ++){
        let s33D = this.InputMaster.s33_D[i];
        let vatOutAuto = new Accounting_VAT_Output_ENTITY({
            voucher_date:this.InputMaster.voucher_date,
            invoice_date:this.InputMaster.voucher_date,
            invoice_no:this.InputMaster.invoice_no,
            series_no:this.InputMaster.series_no,
            customer_code:this.InputMaster.customer_code,
            customer_name:this.InputMaster.customer_name,
            address:this.InputMaster.address,
            goods_code:s33D.goods_code,
            notes:s33D.goods_name,
            tax_account:this.InputMaster.tax_account,
            tax_code:this.InputMaster.tax_code,
            debitor_account:this.InputMaster.creditor_account,
        })as Accounting_VAT_Output_ENTITY;
        if(!this.InputMaster.accounting_VAT_Outputs) this.InputMaster.accounting_VAT_Outputs = [];
        if(!this.InputMaster.accounting_VAT_Outputs[i]){
          this.InputMaster.accounting_VAT_Outputs.push(new Accounting_VAT_Output_ENTITY({...vatOutAuto,code:this.newID}) as Accounting_VAT_Output_ENTITY)
        }else{
          let tax = this.cat_Taxs.find(t=>t.code == this.InputMaster.tax_code);
          this.InputMaster.accounting_VAT_Outputs[i].voucher_date=this.InputMaster.voucher_date;
          this.InputMaster.accounting_VAT_Outputs[i].invoice_date=this.InputMaster.voucher_date;
          this.InputMaster.accounting_VAT_Outputs[i].invoice_no=this.InputMaster.invoice_no;
          this.InputMaster.accounting_VAT_Outputs[i].series_no=this.InputMaster.series_no;
          this.InputMaster.accounting_VAT_Outputs[i].customer_code=this.InputMaster.customer_code;
          this.InputMaster.accounting_VAT_Outputs[i].customer_name=this.InputMaster.customer_name;
          this.InputMaster.accounting_VAT_Outputs[i].address=this.InputMaster.address;
          this.InputMaster.accounting_VAT_Outputs[i].goods_code=s33D.goods_code;
          this.InputMaster.accounting_VAT_Outputs[i].notes=s33D.goods_name;
          this.InputMaster.accounting_VAT_Outputs[i].tax_account=this.InputMaster.tax_account;
          this.InputMaster.accounting_VAT_Outputs[i].tax_code=this.InputMaster.tax_code;
          this.InputMaster.accounting_VAT_Outputs[i].debitor_account=this.InputMaster.creditor_account;
          this.InputMaster.accounting_VAT_Outputs[i].total_money=-s33D.arise;
          this.InputMaster.accounting_VAT_Outputs[i].total_money_fc=-s33D.arise_fc;
          this.InputMaster.accounting_VAT_Outputs[i].tax_rate=tax.tax;
          this.InputMaster.accounting_VAT_Outputs[i].tax =-s33D.arise*(tax.tax/100);
          this.InputMaster.accounting_VAT_Outputs[i].tax_fc =-s33D.arise_fc * (tax.tax/100);
        }
      }
      this.onRefreshGrid = !this.onRefreshGrid;
    }else {
      this.InputMaster.accounting_VAT_Outputs = [];
      this.onRefreshGrid = !this.onRefreshGrid;
    }
  }
  onRefreshGridOutput(event: any) {
    this.onRefreshGrid = event;
  }
  async caculateSumMoney(){
    if (this.InputMaster.exchange_rate == 1){
      try{
        this.InputMaster.total_money_goods = this.InputMaster.s33_D.reduce((accumulator, currentObject) => {
          return accumulator + currentObject.arise;
        }, 0);
        this.InputMaster.discount_money = this.formatDefaultNumber(this.InputMaster.discount_money)
        this.InputMaster.tax_money = this.formatDefaultNumber(this.InputMaster.total_money_goods * (this.getTax.tax/100));
        this.InputMaster.total_money = this.formatDefaultNumber(this.InputMaster.total_money_goods + this.InputMaster.tax_money + this.InputMaster.discount_money);

        this.InputMaster.discount_money_fc = 0;
        this.InputMaster.tax_money_fc = 0;
        this.InputMaster.total_money_fc = 0;
        this.InputMaster.total_money_goods_fc = 0;
      }catch{}
    }else{
      try{
        this.InputMaster.total_money_goods_fc = this.InputMaster.s33_D.reduce((accumulator, currentObject) => {
          return accumulator + currentObject.arise_fc;
        }, 0);
        this.InputMaster.tax_money_fc = this.formatDefaultNumber(this.InputMaster.total_money_goods_fc * (this.getTax.tax/100));
        this.InputMaster.total_money_fc = this.formatDefaultNumber(this.InputMaster.total_money_goods_fc + this.InputMaster.tax_money_fc + this.InputMaster.discount_money_fc);
        
      }catch{}
      this.InputMaster.discount_money = this.formatDefaultNumber(this.InputMaster.discount_money_fc * this.InputMaster.exchange_rate)
      this.InputMaster.tax_money = this.formatDefaultNumber(this.InputMaster.tax_money_fc * this.InputMaster.exchange_rate);
      this.InputMaster.total_money_goods = this.formatDefaultNumber(this.InputMaster.total_money_goods_fc * this.InputMaster.exchange_rate);
      this.InputMaster.total_money = this.formatDefaultNumber(this.InputMaster.total_money_fc * this.InputMaster.exchange_rate);
    }
  }
 
  onSelectedRowsDataOutput(event: any) {
    this.rowGridSelected = event;
  }
  HandleRowsDataGridOutput(event: any) {
    if (event.dataField == 'profession_code') {
      this.ProfessionSelected =  event.value[0];
      if(this.InputMaster.s33_D && this.InputMaster.s33_D.length > 0) this.dialogConfirmAccount.open();
    }
    if(this.editPageState !== EditPageState.add) return;
    try{
      if (event.dataField == 'profession_code')
      {
        this.InputMaster.creditor_account = event.value[0].account1;
        this.InputMaster.description = event.value[0].notes;
      }
      else if (event.dataField == 'seller_code')
        this.InputMaster.seller_name = event.value[0].name;
      else if (event.dataField == 'customer_code')
      {
        this.InputMaster.customer_name = event.value[0].name;
        this.InputMaster.address = event.value[0].address;
      }
      else if (event.dataField == 'tax_code')
        this.InputMaster.tax_account = event.value[0].tax_account;
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
    this.salesVoucherService.s33_M_Search(new S33_M_ENTITY({
      //voucher_date:moment(this.InputMaster.voucher_date).utc(true),
      code:this.InputMaster.code,
      voucher_code:this.getVoucherCodeByName('S33')
    }) as S33_M_ENTITY).subscribe((resonse:S33_M_ENTITY[])=>{
      if(resonse[0])
        this.InputMaster = resonse[0];
      else
        {
          // this.showMessageError('Không tìm thấy dữ liệu.')
          this.goBack();
        }
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
