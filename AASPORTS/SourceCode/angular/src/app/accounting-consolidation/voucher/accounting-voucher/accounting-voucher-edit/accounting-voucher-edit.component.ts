import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import moment from 'moment';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { FormEditV2Component } from 'src/app/shared/form/form-edit-v2/form-edit-v2.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { Accounting_VAT_Input_ENTITY, C51_D_ENTITY, C51_M_ENTITY, CAT_Customer_ENTITY, CAT_Profession_ENTITY, CAT_Tax_ENTITY, ConsolidationVoucherService, ERPCommonService, ERPCommon_ENTITY, SalesVATService } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-accounting-voucher-edit',
  templateUrl: './accounting-voucher-edit.component.html',
  styleUrls: ['./accounting-voucher-edit.component.css']
})
export class AccountingVoucherEditComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    injector: Injector,
    private salesVATService: SalesVATService,
    private consolidationVoucherService: ConsolidationVoucherService,
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
  @ViewChild('dialogConfirmAccount') dialogConfirmAccount: DialogAcctionComponent;
  @ViewChild('dialogConfirmVAT') dialogConfirmVAT: DialogAcctionComponent;
  @ViewChild('dialogreSetCustomer') dialogreSetCustomer: DialogAcctionComponent;

  tbName:string = 'C51_M';
  rowGridSelected:any = null;
  onRefreshGrid:boolean = false;
 
  InputMaster:C51_M_ENTITY=new C51_M_ENTITY();
  editPageState:string = EditPageState.edit;
  cat_Taxs:CAT_Tax_ENTITY[] = [];
  cat_Tax:CAT_Tax_ENTITY = new CAT_Tax_ENTITY();
  ProfessionSelected:CAT_Profession_ENTITY=new CAT_Profession_ENTITY();
  CustomerSelected:CAT_Customer_ENTITY=new CAT_Customer_ENTITY();

  onAdd(): void {
    throw new Error('Method not implemented.');
  }
  onUpdate(item: any): void {
    throw new Error('Method not implemented.');
  }
  onDelete(item: any): void {
    this.consolidationVoucherService.c51_M_Delete(this.InputMaster).subscribe(res=>{
      this.showMessage(res.message,res.status);
      this.navigatePassParam('accounting-voucher',[['code',this.InputMaster.code],['voucher_date',this.InputMaster.voucher_date.format('YYYY-MM-DD')]],new C51_M_ENTITY({}),this.tbName)
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
        this.navigatePassParam('accounting-voucher-add',[['code','']],new C51_M_ENTITY({}),this.tbName)
        break;
      }
      case EditPageState.edit:{
        this.navigatePassParam('accounting-voucher-edit',[['code',this.InputMaster.code],['voucher_date',this.InputMaster.voucher_date.format('YYYY-MM-DD')]],new C51_M_ENTITY({}),this.tbName)
        break;
      }
      case EditPageState.save:{
        if(this.InputMaster.c51_D){
          const D: C51_D_ENTITY[] = this.InputMaster.c51_D.map((obj: any) => {
            let item = new C51_D_ENTITY();
            for (const [key, value] of Object.entries(obj)) {
              item[key] = value;
            }
            return item;
          });
          this.InputMaster.c51_D = D;
        }
        if(this.InputMaster.accounting_vat_inputs){
          const V: Accounting_VAT_Input_ENTITY[] = this.InputMaster.accounting_vat_inputs.map((obj: any) => {
            let item = new Accounting_VAT_Input_ENTITY();
            for (const [key, value] of Object.entries(obj)) {
              item[key] = value;
            }
            return item;
          });
          this.InputMaster.accounting_vat_inputs = V;
        }

        if(!this.InputMaster.code){
          this.consolidationVoucherService.c51_M_Insert(this.InputMaster).subscribe(res=>{
            this.showMessage(res.message,res.status);
            if(res.status == 0){
              this.InputMaster.code = res.ref_code;
              this.navigatePassParam('accounting-voucher-view-detail',[['code',this.InputMaster.code],['voucher_date',this.InputMaster.voucher_date.format('YYYY-MM-DD')]],new C51_M_ENTITY({}),this.tbName)
            }
          })
        }else{
          this.consolidationVoucherService.c51_M_Update(this.InputMaster).subscribe(res=>{
            this.showMessage(res.message,res.status);
            if(res.status == 0)this.navigatePassParam('accounting-voucher-view-detail',[['code',this.InputMaster.code],['voucher_date',this.InputMaster.voucher_date.format('YYYY-MM-DD')]],new C51_M_ENTITY({}),this.tbName)

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
  onSetCustomer(e:any=undefined){
    if(e){
      this.InputMaster.customer_name = this.CustomerSelected.name;
      this.UpdateEditV2();
    }
    if(this.CustomerSelected && this.CustomerSelected.code){
      for(var i = 0 ; i < this.InputMaster.c51_D.length ; i ++){
        this.InputMaster.c51_D[i].customer_code = this.CustomerSelected.code;
        this.InputMaster.c51_D[i].customer_name = this.CustomerSelected.name;
        this.InputMaster.c51_D[i].description =  this.InputMaster.description;
      }
      this.CustomerSelected = null;
      this.onRefreshGrid = !this.onRefreshGrid;
    }
  }
  updateAccount(e:any = undefined){
    if(!this.ProfessionSelected || !this.ProfessionSelected.code) return;
    for(var i = 0 ; i < this.InputMaster.c51_D.length ; i ++){
      this.InputMaster.c51_D[i].debitor_account = this.ProfessionSelected.account1;
      this.InputMaster.c51_D[i].creditor_account = this.ProfessionSelected.balance_account1;
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
        this.onUpdatVAT();
      }
    } else if(event.dataField == 'tax_code'){
      this.cat_Tax = this.cat_Taxs.find(t=>t.code == event.value);
    }
    else if(event.dataField == 'c51_D' && this.InputMaster.c51_D){
      this.onUpdatVAT()
      this.updateAccount()
      this.onSetCustomer();
    }
    this.InputMaster[event.dataField]= event.value;

    this.caculateSumMoney();
    this.UpdateView();
  }
  onUpdatVAT(e:any = undefined){
    if(this.InputMaster.is_tax){
      for(var i = 0 ; i < this.InputMaster.c51_D.length ; i ++){
        let s33D = this.InputMaster.c51_D[i];
        let vatOutAuto = new Accounting_VAT_Input_ENTITY({
            voucher_date:this.InputMaster.voucher_date,
            invoice_date:this.InputMaster.voucher_date,
            // invoice_no:this.InputMaster.invoice_no,
            // series_no:this.InputMaster.series_no,
            customer_code:this.InputMaster.customer_code,
            customer_name:this.InputMaster.customer_name,
            //address:this.InputMaster.address,
            goods_code:s33D.goods_code,
            //notes:s33D.goods_name,
            tax_account:this.InputMaster.tax_account,
            // tax_code:this.InputMaster.tax_code,
        })as Accounting_VAT_Input_ENTITY;
        if(!this.InputMaster.accounting_vat_inputs) this.InputMaster.accounting_vat_inputs = [];
        if(!this.InputMaster.accounting_vat_inputs[i]){
          this.InputMaster.accounting_vat_inputs.push(new Accounting_VAT_Input_ENTITY({...vatOutAuto,code:this.newID}) as Accounting_VAT_Input_ENTITY)
        }else{
          //let tax = this.cat_Taxs.find(t=>t.code == this.InputMaster.accounting_vat_inputs[i].tax_code);
          this.InputMaster.accounting_vat_inputs[i].voucher_date=this.InputMaster.voucher_date;
          this.InputMaster.accounting_vat_inputs[i].invoice_date=this.InputMaster.voucher_date;
          // this.InputMaster.accounting_vat_inputs[i].invoice_no=this.InputMaster.invoice_no;
          // this.InputMaster.accounting_vat_inputs[i].series_no=this.InputMaster.series_no;
          this.InputMaster.accounting_vat_inputs[i].customer_code=this.InputMaster.customer_code;
          this.InputMaster.accounting_vat_inputs[i].customer_name=this.InputMaster.customer_name;
          // this.InputMaster.accounting_vat_inputs[i].address=this.InputMaster.address;
          this.InputMaster.accounting_vat_inputs[i].goods_code=s33D.goods_code;
          // this.InputMaster.accounting_vat_inputs[i].notes=s33D.goods_name;
          // this.InputMaster.accounting_vat_inputs[i].quantity=s33D.quantity;
          // this.InputMaster.accounting_vat_inputs[i].price=s33D.price;
          this.InputMaster.accounting_vat_inputs[i].tax_account=this.InputMaster.tax_account;
          // this.InputMaster.accounting_vat_inputs[i].tax_code=this.InputMaster.tax_code;
          // this.InputMaster.accounting_vat_inputs[i].debitor_account=this.InputMaster.creditor_account;
          this.InputMaster.accounting_vat_inputs[i].total_money=s33D.arise;
          this.InputMaster.accounting_vat_inputs[i].total_money_fc=s33D.arise_fc;
          // this.InputMaster.accounting_vat_inputs[i].tax_rate=tax.tax;
          // this.InputMaster.accounting_vat_inputs[i].tax =s33D.arise*(tax.tax/100);
          // this.InputMaster.accounting_vat_inputs[i].tax_fc =s33D.arise_fc * (tax.tax/100);
        }
      }
    } else  this.InputMaster.accounting_vat_inputs = [];
    this.onRefreshGrid = !this.onRefreshGrid;
  }
  async caculateSumMoney(){
    try{
      this.InputMaster.arise = this.InputMaster.c51_D.reduce((accumulator, currentObject) => {
        return accumulator + currentObject.arise;
      }, 0);
      this.InputMaster.arise_fc = this.formatDefaultNumber(this.InputMaster.arise * this.InputMaster.exchange_rate);
      this.InputMaster.total_tax_money = this.InputMaster.accounting_vat_inputs.reduce((accumulator, currentObject) => {
        return accumulator + currentObject.tax;
      }, 0);
      this.InputMaster.total_tax_money = this.formatDefaultNumber(this.InputMaster.total_tax_money);
      this.InputMaster.total_amount_with_tax = this.formatDefaultNumber(this.InputMaster.total_tax_money + this.InputMaster.arise);
    }catch{}
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
  HandleRowsDataGridOutput(event: any) {
    if (event.dataField == 'profession_code') {
      this.ProfessionSelected =  event.value[0];
      if(this.InputMaster.c51_D && this.InputMaster.c51_D.length > 0) this.dialogConfirmAccount.open();
    }
    else if (event.dataField == 'customer_code') {
      this.CustomerSelected =  event.value[0];
      if(this.InputMaster.c51_D && this.InputMaster.c51_D.length > 0) this.dialogreSetCustomer.open();
    }
    if(this.editPageState !== EditPageState.add) return;
    try{ if (event.dataField == 'customer_code')
      {
        this.InputMaster.customer_name = event.value[0].name;
      }
      else if (event.dataField == 'tax_code')
        this.InputMaster.tax_account = event.value[0].tax_account;
      else if (event.dataField == 'profession_code')
      {
        this.InputMaster.description = event.value[0].notes;
        this.InputMaster.tax_account = event.value[0].balance_account1;
      }
      else if (event.dataField == 'code_fc')
        this.InputMaster.exchange_rate = event.value[0].exchange_rate;
      this.UpdateEditV2()
    }catch{}
    this.UpdateView();
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
    this.consolidationVoucherService.c51_M_Search(new C51_M_ENTITY({
      // voucher_date:moment(this.InputMaster.voucher_date).utc(true),
      code:this.InputMaster.code,
      voucher_code:this.appSession.getVoucherCode
    }) as C51_M_ENTITY).subscribe((resonse:C51_M_ENTITY[])=>{
      if(resonse[0])
        this.InputMaster = resonse[0];
      else
        {
          // this.showMessageError('Không tìm thấy dữ liệu.')
          this.goBack();
        }
    })
  }

  async initCombobox(){
    this.cat_Taxs = await this.salesVATService.cAT_Tax_Search(new CAT_Tax_ENTITY()).toPromise()
  }

}
