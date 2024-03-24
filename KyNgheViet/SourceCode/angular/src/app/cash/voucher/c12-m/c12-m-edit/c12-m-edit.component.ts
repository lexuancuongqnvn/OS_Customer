import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import moment from 'moment';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { FormEditV2Component } from 'src/app/shared/form/form-edit-v2/form-edit-v2.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { Accounting_VAT_Input_ENTITY, C12_D_ENTITY, C12_M_ENTITY, CAT_Customer_ENTITY, CAT_Profession_ENTITY, CashVoucherService, ERPCommonService, ERPCommon_ENTITY } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-c12-m-edit',
  templateUrl: './c12-m-edit.component.html',
  styleUrls: ['./c12-m-edit.component.css']
})
export class C12MEditComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    injector: Injector,
    private cashVoucherService: CashVoucherService,
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
  @ViewChild('dialogreSetAccount') dialogreSetAccount: DialogAcctionComponent;
  @ViewChild('dialogreSetCustomer') dialogreSetCustomer: DialogAcctionComponent;
  tbName:string = 'cash/payment-voucher_M';
  rowGridSelected:any = null;
  onRefreshGrid:boolean = false;
 
  InputMaster:C12_M_ENTITY=new C12_M_ENTITY();
  ProfessionSelected:CAT_Profession_ENTITY=new CAT_Profession_ENTITY();
  CustomerSelected:CAT_Customer_ENTITY=new CAT_Customer_ENTITY();
  editPageState:string = EditPageState.edit;

  onAdd(): void {
    throw new Error('Method not implemented.');
  }
  onUpdate(item: any): void {
    throw new Error('Method not implemented.');
  }
  onDelete(item: any): void {
    this.cashVoucherService.c12_M_Delete(this.InputMaster).subscribe(res=>{
      this.showMessage(res.message,res.status);
      this.navigatePassParam('cash/payment-voucher',[['code',this.InputMaster.code],['voucher_date',this.InputMaster.voucher_date.format('YYYY-MM-DD')]],new C12_M_ENTITY({}),this.tbName)
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
        this.navigatePassParam('cash/payment-voucher-add',[['code','']],new C12_M_ENTITY({}),this.tbName)

        break;
      }
      case EditPageState.edit:{
        this.navigatePassParam('cash/payment-voucher-edit',[['code',this.InputMaster.code],['voucher_date',this.InputMaster.voucher_date.format('YYYY-MM-DD')]],new C12_M_ENTITY({}),this.tbName)
        break;
      }
      case EditPageState.save:{
        if(this.InputMaster.c12_d){
          const D: C12_D_ENTITY[] = this.InputMaster.c12_d.map((obj: any) => {
            let item = new C12_D_ENTITY();
            for (const [key, value] of Object.entries(obj)) {
              item[key] = value;
            }
            return item;
          });
          this.InputMaster.c12_d = D;
        }
       
        if(!this.InputMaster.code){
          this.cashVoucherService.c12_M_Insert(this.InputMaster).subscribe(res=>{
            this.showMessage(res.message,res.status);
            if(res.status == 0){
              this.InputMaster.code = res.ref_code;
              this.navigatePassParam('cash/payment-voucher-view-detail',[['code',this.InputMaster.code],['voucher_date',this.InputMaster.voucher_date.format('YYYY-MM-DD')]],new C12_M_ENTITY({}),this.tbName)
            }
          })
        }else{
          this.cashVoucherService.c12_M_Update(this.InputMaster).subscribe(res=>{
            this.showMessage(res.message,res.status);
            if(res.status == 0)this.navigatePassParam('cash/payment-voucher-view-detail',[['code',this.InputMaster.code],['voucher_date',this.InputMaster.voucher_date.format('YYYY-MM-DD')]],new C12_M_ENTITY({}),this.tbName)

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
  onSetAccount(){
    for(var i = 0 ; i < this.InputMaster.c12_d.length ; i ++){
      this.InputMaster.c12_d[i].debitor_account = this.ProfessionSelected.account1;
    }
    this.onRefreshGrid = !this.onRefreshGrid;
  }
  onSetCustomer(){
    this.InputMaster.address = this.CustomerSelected.address;
    this.InputMaster.customer_name = this.CustomerSelected.name;
    for(var i = 0 ; i < this.InputMaster.c12_d.length ; i ++){
      this.InputMaster.c12_d[i].customer_code = this.CustomerSelected.code;
      this.InputMaster.c12_d[i].customer_name = this.CustomerSelected.name;
      this.InputMaster.c12_d[i].description =  this.CustomerSelected.address;
    }
    this.onRefreshGrid = !this.onRefreshGrid;
  }
  handleValueChanged(event: any) {

    this.InputMaster[event.dataField]= event.value;
    if(event.dataField == 'c12_d' && this.InputMaster.c12_d){
      for(var i = 0 ; i < this.InputMaster.c12_d.length ; i ++){
        this.onSetAccount();
        this.onSetCustomer();
        //let c12D = this.InputMaster.c12_d[i];
        
        // let vatOutAuto = new Accounting_VAT_Input_ENTITY({
        //     voucher_date:this.InputMaster.voucher_date,
        //     invoice_date:this.InputMaster.voucher_date,
        //     customer_code:this.InputMaster.customer_code,
        //     customer_name:this.InputMaster.customer_name,
        //     address:this.InputMaster.address,
        //     goods_code:c12D.goods_code,
        //     notes:this.InputMaster.customer_name,
        //     tax_account:this.InputMaster.tax_account,
        //     debitor_account:this.InputMaster.creditor_account,
        // })as Accounting_VAT_Input_ENTITY;
        // if(!this.InputMaster.accounting_vat_inputs) this.InputMaster.accounting_vat_inputs = [];
        // if(!this.InputMaster.accounting_vat_inputs[i]){
        //   this.InputMaster.accounting_vat_inputs.push(new Accounting_VAT_Input_ENTITY({...vatOutAuto,code:this.newID}) as Accounting_VAT_Input_ENTITY)
        // }else{
        //   this.InputMaster.accounting_vat_inputs[i].voucher_date=this.InputMaster.voucher_date;
        //   this.InputMaster.accounting_vat_inputs[i].invoice_date=this.InputMaster.voucher_date;
        //   this.InputMaster.accounting_vat_inputs[i].customer_code=this.InputMaster.customer_code;
        //   this.InputMaster.accounting_vat_inputs[i].customer_name=this.InputMaster.customer_name;
        //   this.InputMaster.accounting_vat_inputs[i].address=this.InputMaster.address;
        //   this.InputMaster.accounting_vat_inputs[i].goods_code=c12D.goods_code;
        //   this.InputMaster.accounting_vat_inputs[i].tax_account=this.InputMaster.tax_account;
        //   this.InputMaster.accounting_vat_inputs[i].debitor_account=this.InputMaster.creditor_account;
        //   this.InputMaster.accounting_vat_inputs[i].total_money=c12D.arise;
        //   this.InputMaster.accounting_vat_inputs[i].total_money_fc=c12D.arise_fc;
        // }
      }
      //this.onRefreshGrid = !this.onRefreshGrid;
    }
    this.caculateSumMoney();
    this.UpdateView();
  }
  async caculateSumMoney(){
    try{
      this.InputMaster.arise = this.InputMaster.c12_d.reduce((accumulator, currentObject) => {
        return accumulator + currentObject.arise;
      }, 0);
      this.InputMaster.tax_money = this.InputMaster.accounting_vat_inputs.reduce((accumulator, currentObject) => {
        return accumulator + currentObject.tax;
      }, 0);
      this.InputMaster.total_arise = this.formatDefaultNumber(this.InputMaster.arise + this.InputMaster.tax_money);
      
      this.InputMaster.arise_fc = this.formatDefaultNumber(this.InputMaster.arise * this.InputMaster.exchange_rate);
      this.InputMaster.tax_money_fc = this.formatDefaultNumber(this.InputMaster.tax_money * this.InputMaster.exchange_rate);
      this.InputMaster.total_arise_fc = this.formatDefaultNumber(this.InputMaster.total_arise_fc * this.InputMaster.exchange_rate);
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
      if(this.InputMaster.c12_d && this.InputMaster.c12_d.length > 0) this.dialogreSetAccount.open();
    }
    else if (event.dataField == 'customer_code') {
      this.CustomerSelected =  event.value[0];
      if(this.InputMaster.c12_d && this.InputMaster.c12_d.length > 0) this.dialogreSetCustomer.open();
    }
    if(this.editPageState !== EditPageState.add) return;
    try{ 
      if (event.dataField == 'profession_code')
      {
        this.InputMaster.creditor_account = event.value[0].balance_account1;
        this.InputMaster.description = event.value[0].notes;
      }
      else if (event.dataField == 'customer_code')
      {
        this.InputMaster.customer_name = event.value[0].name;
        this.InputMaster.address = event.value[0].address;
      }
      else if (event.dataField == 'code_fc')
        this.InputMaster.exchange_rate = event.value[0].exchange_rate;
      else if (event.dataField == 'c12_d') {

      }
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
    this.cashVoucherService.c12_M_Search(new C12_M_ENTITY({
      // voucher_date:moment(this.InputMaster.voucher_date).utc(true),
      code:this.InputMaster.code,
      voucher_code:this.appSession.getVoucherCode
    }) as C12_M_ENTITY).subscribe((resonse:C12_M_ENTITY[])=>{
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
  }

}
