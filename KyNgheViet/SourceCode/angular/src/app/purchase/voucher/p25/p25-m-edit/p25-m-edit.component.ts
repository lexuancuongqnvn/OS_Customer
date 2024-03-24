import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import moment from 'moment';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { FormEditV2Component } from 'src/app/shared/form/form-edit-v2/form-edit-v2.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { Accounting_VAT_Input_ENTITY, CAT_Tax_ENTITY, ERPCommonService, ERPCommon_ENTITY, P22_D_ENTITY, P22_M_ENTITY, P23_D_ENTITY, P25_D_ENTITY, P25_M_ENTITY, PurchaseVoucherService, SalesVATService } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-p25-m-edit',
  templateUrl: './p25-m-edit.component.html',
  styleUrls: ['./p25-m-edit.component.css']
})
export class P25MEditComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

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
  tbName:string = 'P25_M';
  rowGridSelected:any = null;
  onRefreshGrid:boolean = false;
 
  InputMaster:P25_M_ENTITY=new P25_M_ENTITY();
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
    this.purchaseVoucherService.p25_M_Delete(this.InputMaster).subscribe(res=>{
      this.showMessage(res.message,res.status);
      this.navigatePassParam('purchase/purchase-cost-documents',[['code',this.InputMaster.code],['voucher_date',this.InputMaster.voucher_date.format('YYYY-MM-DD')]],new P25_M_ENTITY({}),this.tbName)
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
        this.navigatePassParam('purchase/purchase-cost-documents-edit',[['code',this.InputMaster.code],['voucher_date',this.InputMaster.voucher_date.format('YYYY-MM-DD')]],new P25_M_ENTITY({}),this.tbName)
        break;
      }
      case EditPageState.save:{
        if(this.InputMaster.p25_D){
          const i42D: P25_D_ENTITY[] = this.InputMaster.p25_D.map((obj: any) => {
            let item = new P25_D_ENTITY();
            for (const [key, value] of Object.entries(obj)) {
              item[key] = value;
            }
            return item;
          });
          this.InputMaster.p25_D = i42D;
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
          this.purchaseVoucherService.p25_M_Insert(this.InputMaster).subscribe(res=>{
            this.showMessage(res.message,res.status);
            if(res.status == 0){
              this.InputMaster.code = res.ref_code;
              this.navigatePassParam('purchase/purchase-cost-documents-view-detail',[['code',this.InputMaster.code],['voucher_date',this.InputMaster.voucher_date.format('YYYY-MM-DD')]],new P25_M_ENTITY({}),this.tbName)
            }
          })
        }else{
          this.purchaseVoucherService.p25_M_Update(this.InputMaster).subscribe(res=>{
            this.showMessage(res.message,res.status);
            if(res.status == 0)this.navigatePassParam('purchase/purchase-cost-documents-view-detail',[['code',this.InputMaster.code],['voucher_date',this.InputMaster.voucher_date.format('YYYY-MM-DD')]],new P25_M_ENTITY({}),this.tbName)

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
    if(event.dataField == 'tax_code'){
      this.cat_Tax = this.cat_Taxs.find(t=>t.code == event.value);
    }
    else if(event.dataField == 'p25_D' && this.InputMaster.p25_D){
      this.onGenVATInput()
    }
    
    this.InputMaster[event.dataField]= event.value;

    this.caculateSumMoney();
    this.UpdateView();
  }

  onGenVATInput(){
    for(var i = 0 ; i < this.InputMaster.p25_D.length ; i ++){
      let p25D = this.InputMaster.p25_D[i];
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
        this.InputMaster.accounting_vat_inputs[i].goods_code=p25D.goods_code;
        this.InputMaster.accounting_vat_inputs[i].quantity=1;
        this.InputMaster.accounting_vat_inputs[i].price=p25D.money_goods;
        this.InputMaster.accounting_vat_inputs[i].tax_account=this.InputMaster.tax_account;
        this.InputMaster.accounting_vat_inputs[i].tax_code=this.InputMaster.tax_code;
        this.InputMaster.accounting_vat_inputs[i].debitor_account=this.InputMaster.creditor_account;
        this.InputMaster.accounting_vat_inputs[i].total_money=p25D.arise;
        this.InputMaster.accounting_vat_inputs[i].total_money_fc=p25D.arise_fc;
        this.InputMaster.accounting_vat_inputs[i].tax_rate=tax.tax;
        this.InputMaster.accounting_vat_inputs[i].tax =p25D.arise*(tax.tax/100);
        this.InputMaster.accounting_vat_inputs[i].tax_fc =p25D.arise_fc * (tax.tax/100);
      }
    }
    this.onRefreshGrid = !this.onRefreshGrid;
  }
  async caculateSumMoney(){
    if (this.InputMaster.exchange_rate == 1){
      try{
        this.InputMaster.tax_money = this.InputMaster.accounting_vat_inputs.reduce((accumulator, currentObject) => {
          return accumulator + currentObject.tax;
        }, 0);
        this.InputMaster.total_money = this.InputMaster.p25_D.reduce((accumulator, currentObject) => {
          return accumulator + currentObject.money_goods;
        }, 0);
        this.InputMaster.total_money += this.InputMaster.tax_money;
      }catch{}
    }else{
      try{
        this.InputMaster.tax_money = this.InputMaster.accounting_vat_inputs.reduce((accumulator, currentObject) => {
          return accumulator + currentObject.tax;
        }, 0);
        this.InputMaster.total_money = this.InputMaster.p25_D.reduce((accumulator, currentObject) => {
          return accumulator + currentObject.money_goods;
        }, 0);
        this.InputMaster.total_money += this.InputMaster.tax_money;
        this.InputMaster.total_money_fc = this.InputMaster.total_money/this.InputMaster.exchange_rate;
        this.InputMaster.tax_money_fc += this.InputMaster.tax_money;
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
      else if(event.dataField == 'voucher_22_m_code'){
          if(event.value[0].voucher_code == this.getVoucherCodeByName('P22'))
            this.onLoadDataVoucherP22D()
          else if(event.value[0].voucher_code == this.getVoucherCodeByName('P23'))
          this.onLoadDataVoucherP23D()
      }
        
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
  onLoadDataVoucherP22D(){
    this.BlockUI()
    this.purchaseVoucherService.p22_D_Search(new P22_D_ENTITY({
      voucher_date:moment(this.InputMaster.voucher_date).utc(true),
      master_code:this.InputMaster.voucher_22_m_code,
      voucher_code:this.getVoucherCodeByName('P22')
    }) as P22_D_ENTITY).subscribe((resonse:P22_D_ENTITY[])=>{
      if(resonse && resonse.length > 0){
        for(var i = 0 ; i < resonse.length ; i ++){
          if(!this.InputMaster.p25_D) this.InputMaster.p25_D = [];
          this.InputMaster.p25_D.push(new P25_D_ENTITY({
            code:this.newID,
            voucher_22_m_code:resonse[i].master_code,
            voucher_22_d_code:resonse[i].code,
            goods_code:resonse[i].goods_code,
            goods_name:resonse[i].goods_name,
            money_goods:resonse[i].goods_money,
            debitor_account:resonse[i].debitor_account,
            arise:0,
            arise_fc:0
          }) as P25_D_ENTITY) 
        }
        this.onGenVATInput()
        this.onRefreshGrid = !this.onRefreshGrid;
        this.UnBlockUI()
      }
    })
  }
  onLoadDataVoucherP23D(){
    this.BlockUI()
    this.purchaseVoucherService.p23_D_Search(new P23_D_ENTITY({
      voucher_date:moment(this.InputMaster.voucher_date).utc(true),
      master_code:this.InputMaster.voucher_22_m_code,
      voucher_code:this.getVoucherCodeByName('P23')
    }) as P23_D_ENTITY).subscribe((resonse:P23_D_ENTITY[])=>{
      if(resonse && resonse.length > 0){
        for(var i = 0 ; i < resonse.length ; i ++){
          if(!this.InputMaster.p25_D) this.InputMaster.p25_D = [];
          this.InputMaster.p25_D.push(new P25_D_ENTITY({
            code:this.newID,
            voucher_22_m_code:resonse[i].master_code,
            voucher_22_d_code:resonse[i].code,
            goods_code:resonse[i].goods_code,
            goods_name:resonse[i].goods_name,
            money_goods:resonse[i].goods_money,
            debitor_account:resonse[i].debitor_account,
            arise:0,
            arise_fc:0
          }) as P25_D_ENTITY)
        }
        this.onGenVATInput()
        this.onRefreshGrid = !this.onRefreshGrid;
        this.UnBlockUI()
      }
    })
  }
  onLoadData(){
    this.purchaseVoucherService.p25_M_Search(new P25_M_ENTITY({
      // voucher_date:moment(this.InputMaster.voucher_date).utc(true),
      code:this.InputMaster.code,
      voucher_code:this.appSession.getVoucherCode
    }) as P25_M_ENTITY).subscribe((resonse:P25_M_ENTITY[])=>{
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
