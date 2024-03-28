import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import moment from 'moment';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { FormEditV2Component } from 'src/app/shared/form/form-edit-v2/form-edit-v2.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { Accounting_VAT_Input_ENTITY, CAT_Profession_ENTITY, CAT_Tax_ENTITY, ERPCommonService, ERPCommon_ENTITY, P21_D_ENTITY, P21_M_ENTITY, PurchaseVoucherService, SalesVATService } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-p21-m-edit',
  templateUrl: './p21-m-edit.component.html',
  styleUrls: ['./p21-m-edit.component.css']
})
export class P21MEditComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

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
  @ViewChild('dialogConfirmVAT') dialogConfirmVAT: DialogAcctionComponent;
  @ViewChild('dialogreSetAccount') dialogreSetAccount: DialogAcctionComponent;

  tbName:string = 'P21_M';
  rowGridSelected:any = null;
  onRefreshGrid:boolean = false;
 
  InputMaster:P21_M_ENTITY=new P21_M_ENTITY();
  ProfessionSelected:CAT_Profession_ENTITY=new CAT_Profession_ENTITY();
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
    this.purchaseVoucherService.p21_M_Delete(this.InputMaster).subscribe(res=>{
      this.showMessage(res.message,res.status);
      this.navigatePassParam('purchase/service-purchase-invoice',[['code',this.InputMaster.code],['voucher_date',this.InputMaster.voucher_date.format('YYYY-MM-DD')]],new P21_M_ENTITY({}),this.tbName)
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
        this.navigatePassParam('purchase/service-purchase-invoice-edit',[['code',this.InputMaster.code],['voucher_date',this.InputMaster.voucher_date.format('YYYY-MM-DD')]],new P21_M_ENTITY({}),this.tbName)
        break;
      }
      case EditPageState.save:{
        if(this.InputMaster.p21_D){
          const i42D: P21_D_ENTITY[] = this.InputMaster.p21_D.map((obj: any) => {
            let item = new P21_D_ENTITY();
            for (const [key, value] of Object.entries(obj)) {
              item[key] = value;
            }
            return item;
          });
          this.InputMaster.p21_D = i42D;
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
          this.purchaseVoucherService.p21_M_Insert(this.InputMaster).subscribe(res=>{
            this.showMessage(res.message,res.status);
            if(res.status == 0){
              this.InputMaster.code = res.ref_code;
              this.navigatePassParam('purchase/service-purchase-invoice-view-detail',[['code',this.InputMaster.code],['voucher_date',this.InputMaster.voucher_date.format('YYYY-MM-DD')]],new P21_M_ENTITY({}),this.tbName)
            }
          })
        }else{
          this.purchaseVoucherService.p21_M_Update(this.InputMaster).subscribe(res=>{
            this.showMessage(res.message,res.status);
            if(res.status == 0)this.navigatePassParam('purchase/service-purchase-invoice-view-detail',[['code',this.InputMaster.code],['voucher_date',this.InputMaster.voucher_date.format('YYYY-MM-DD')]],new P21_M_ENTITY({}),this.tbName)

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
  }
  handleValueChanged(event: any) {
    if(event.dataField == 'is_tax'){
      if(this.InputMaster.code && this.InputMaster[event.dataField] != event.value){
        this.InputMaster[event.dataField]= event.value;
        this.dialogConfirmVAT.open()
      } 
      else {
        this.InputMaster[event.dataField]= event.value;
        this.onGenVATInput();
      }
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
    }else if(event.dataField == 'tax_code'){
      this.cat_Tax = this.cat_Taxs.find(t=>t.code == event.value);
    }
    else if(event.dataField == 'p21_D' && this.InputMaster.p21_D){
      this.onGenVATInput()
    }
    
    this.InputMaster[event.dataField]= event.value;

    this.caculateSumMoney();
    this.UpdateView();
  }
  onUpdateAccount(e:any = undefined){
    for(var i = 0 ; i < this.InputMaster.p21_D.length ; i ++){
      this.InputMaster.p21_D[i].debitor_account = this.ProfessionSelected.account1
    }
    this.onRefreshGrid = !this.onRefreshGrid;
  }
  onGenVATInput(e:any = undefined){
    if(this.InputMaster.is_tax){
      for(var i = 0 ; i < this.InputMaster.p21_D.length ; i ++){
        let p21D = this.InputMaster.p21_D[i];
        let vatOutAuto = new Accounting_VAT_Input_ENTITY({
            voucher_date:moment(this.InputMaster.voucher_date).utc(true),
            invoice_date:moment(this.InputMaster.voucher_date).utc(true),
            invoice_no:this.InputMaster.invoice_no,
            series_no:this.InputMaster.seri_no,
            customer_code:this.InputMaster.customer_code,
            customer_name:this.InputMaster.customer_name,
            address:this.InputMaster.address,
            tax_account:this.InputMaster.tax_account,
            tax_code:this.InputMaster.tax_code,
            debitor_account:this.InputMaster.creditor_account,
        })as Accounting_VAT_Input_ENTITY;
        if(!this.InputMaster.accounting_vat_inputs) this.InputMaster.accounting_vat_inputs = [];
        if(!this.InputMaster.accounting_vat_inputs[i]){
          this.InputMaster.accounting_vat_inputs.push(new Accounting_VAT_Input_ENTITY({...vatOutAuto,code:this.newID}) as Accounting_VAT_Input_ENTITY)
        }else{
          let tax = this.cat_Taxs.find(t=>t.code == this.InputMaster.tax_code);
          this.InputMaster.accounting_vat_inputs[i].voucher_date=moment(this.InputMaster.voucher_date).utc(true);
          this.InputMaster.accounting_vat_inputs[i].invoice_date=moment(this.InputMaster.voucher_date).utc(true);
          this.InputMaster.accounting_vat_inputs[i].invoice_no=this.InputMaster.invoice_no;
          this.InputMaster.accounting_vat_inputs[i].series_no=this.InputMaster.seri_no;
          this.InputMaster.accounting_vat_inputs[i].customer_code=this.InputMaster.customer_code;
          this.InputMaster.accounting_vat_inputs[i].customer_name=this.InputMaster.customer_name;
          this.InputMaster.accounting_vat_inputs[i].address=this.InputMaster.address;
          this.InputMaster.accounting_vat_inputs[i].description=this.InputMaster.description;
          //this.InputMaster.accounting_vat_inputs[i].goods_code=p21D.goods_code;
          this.InputMaster.accounting_vat_inputs[i].quantity=1;
          //this.InputMaster.accounting_vat_inputs[i].price=p21D.money_goods;
          this.InputMaster.accounting_vat_inputs[i].tax_account=this.InputMaster.tax_account;
          this.InputMaster.accounting_vat_inputs[i].tax_code=this.InputMaster.tax_code;
          this.InputMaster.accounting_vat_inputs[i].debitor_account=this.InputMaster.creditor_account;
          this.InputMaster.accounting_vat_inputs[i].total_money=p21D.arise;
          this.InputMaster.accounting_vat_inputs[i].total_money_fc=p21D.arise_fc;
          this.InputMaster.accounting_vat_inputs[i].tax_rate=tax.tax;
          this.InputMaster.accounting_vat_inputs[i].tax =p21D.arise*(tax.tax/100);
          this.InputMaster.accounting_vat_inputs[i].tax_fc =p21D.arise_fc * (tax.tax/100);
        }
      }
    }else  this.InputMaster.accounting_vat_inputs = [];
   
    this.onRefreshGrid = !this.onRefreshGrid;
  }

  async caculateSumMoney(){
    if (this.InputMaster.exchange_rate == 1){
      try{
        this.InputMaster.tax_money = this.InputMaster.accounting_vat_inputs.reduce((accumulator, currentObject) => {
          return accumulator + currentObject.tax;
        }, 0);
        this.InputMaster.money_goods = this.InputMaster.p21_D.reduce((accumulator, currentObject) => {
          return accumulator + currentObject.arise;
        }, 0);
        this.InputMaster.total_money = this.InputMaster.tax_money + this.InputMaster.money_goods;
      }catch{}
      this.InputMaster.money_goods_fc = 0;
      this.InputMaster.tax_money_fc =  0;
      this.InputMaster.money_goods_fc =  0;
      this.InputMaster.total_money_fc =  0;
    }else{
      try{
        try{
          this.InputMaster.tax_money_fc = this.InputMaster.accounting_vat_inputs.reduce((accumulator, currentObject) => {
            return accumulator + currentObject.tax_fc;
          }, 0);
          this.InputMaster.money_goods_fc = this.InputMaster.p21_D.reduce((accumulator, currentObject) => {
            return accumulator + currentObject.arise_fc;
          }, 0);
          this.InputMaster.total_money_fc = this.InputMaster.tax_money_fc + this.InputMaster.money_goods_fc;
        }catch{}
        this.InputMaster.money_goods = this.formatDefaultNumber(this.InputMaster.money_goods_fc * this.InputMaster.exchange_rate)
        this.InputMaster.tax_money = this.InputMaster.tax_money_fc * this.InputMaster.exchange_rate
        this.InputMaster.money_goods = this.InputMaster.money_goods_fc * this.InputMaster.exchange_rate
        this.InputMaster.total_money = this.InputMaster.tax_money + this.InputMaster.money_goods;
      }catch{}
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
    if (event.dataField == 'profession_code') {
      this.ProfessionSelected =  event.value[0];
      if(this.InputMaster.p21_D && this.InputMaster.p21_D.length > 0) this.dialogreSetAccount.open();
    }
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
    this.purchaseVoucherService.p21_M_Search(new P21_M_ENTITY({
      // voucher_date:moment(this.InputMaster.voucher_date).utc(true),
      code:this.InputMaster.code,
      voucher_code:this.appSession.getVoucherCode
    }) as P21_M_ENTITY).subscribe((resonse:P21_M_ENTITY[])=>{
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
