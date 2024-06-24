import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import moment from 'moment';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { FormEditV2Component } from 'src/app/shared/form/form-edit-v2/form-edit-v2.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { SalesVATService, SalesVoucherService, ERPCommonService, S34_M_ENTITY, CAT_Tax_ENTITY, S34_D_ENTITY, Accounting_VAT_Output_ENTITY, ERPCommon_ENTITY } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-s34-m-edit',
  templateUrl: './s34-m-edit.component.html',
  styleUrls: ['./s34-m-edit.component.css']
})
export class S34MEditComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    injector: Injector,
    private salesVATService: SalesVATService,
    private salesVoucherService: SalesVoucherService,
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
  tbName:string = 'S34_M';
  rowGridSelected:any = null;
  onRefreshGrid:boolean = false;

  InputMaster:S34_M_ENTITY=new S34_M_ENTITY();
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
    this.salesVoucherService.s34_M_Delete(this.InputMaster).subscribe(res=>{
      this.showMessage(res.message,res.status);
      this.navigatePassParam('sales/receipt-of-accounts-receivable-by-invoice',[['code',this.InputMaster.code],['voucher_date',this.InputMaster.voucher_date.format('YYYY-MM-DD')]],new S34_M_ENTITY({}),this.tbName)
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
        this.navigatePassParam('sales/receipt-of-accounts-receivable-by-invoice-add',[['code','']],new S34_M_ENTITY({}),this.tbName)
        break;
      }
      case EditPageState.edit:{
        this.navigatePassParam('sales/receipt-of-accounts-receivable-by-invoice-edit',[['code',this.InputMaster.code],['voucher_date',this.InputMaster.voucher_date.format('YYYY-MM-DD')]],new S34_M_ENTITY({}),this.tbName)
        break;
      }
      case EditPageState.save:{
        if(this.InputMaster.s34_D){
          const i42D: S34_D_ENTITY[] = this.InputMaster.s34_D.map((obj: any) => {
            let item = new S34_D_ENTITY();
            for (const [key, value] of Object.entries(obj)) {
              item[key] = value;
            }
            return item;
          });
          this.InputMaster.s34_D = i42D;
        }
        if(!this.InputMaster.code){
          this.salesVoucherService.s34_M_Insert(this.InputMaster).subscribe(res=>{
            this.showMessage(res.message,res.status);
            if(res.status == 0){
              this.InputMaster.code = res.ref_code;
              this.navigatePassParam('sales/receipt-of-accounts-receivable-by-invoice-view-detail',[['code',this.InputMaster.code],['voucher_date',this.InputMaster.voucher_date.format('YYYY-MM-DD')]],new S34_M_ENTITY({}),this.tbName)
            }
          })
        }else{
          this.salesVoucherService.s34_M_Update(this.InputMaster).subscribe(res=>{
            this.showMessage(res.message,res.status);
            if(res.status == 0)
              this.navigatePassParam('sales/receipt-of-accounts-receivable-by-invoice-view-detail',[['code',this.InputMaster.code],['voucher_date',this.InputMaster.voucher_date.format('YYYY-MM-DD')]],new S34_M_ENTITY({}),this.tbName)
          })
        }
        break;
      }
      case EditPageState.search:{
        break;
      }
      case EditPageState.viewDetail:{
        this.navigatePassParam('sales/receipt-of-accounts-receivable-by-invoice-view-detail',[['code',this.InputMaster.code],['voucher_date',this.InputMaster.voucher_date.format('YYYY-MM-DD')]],new S34_M_ENTITY({}),this.tbName)

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
    //this.initCombobox();
  }
  handleValueChanged(event: any) {
    if(event.dataField == 'tax_code'){
      this.cat_Tax = this.cat_Taxs.find(t=>t.code == event.value);
    }
    
    else if(event.dataField == 's34_D' && this.InputMaster.s34_D){
      for(var i = 0 ; i < this.InputMaster.s34_D.length ; i ++){
        let s34D = this.InputMaster.s34_D[i];
        s34D.remaining_asset_acquisition_money_fc = this.formatDefaultNumber(
          s34D.payment_required_fc-s34D.payment_fc
        )
        s34D.remaining_asset_acquisition_money = this.formatDefaultNumber(
          s34D.payment_required-s34D.payment
        )
      }
      this.onRefreshGrid = !this.onRefreshGrid;
    }

    this.InputMaster[event.dataField]= event.value;
    this.caculateSumMoney();
    this.UpdateView();
  }
  async caculateSumMoney(){
    if (this.InputMaster.exchange_rate == 1){
      try{
        this.InputMaster.total_money = this.InputMaster.s34_D.reduce((accumulator, currentObject) => {
          return accumulator + currentObject.payment;
        }, 0);
      }catch{}
      this.InputMaster.total_money_fc = 0;

    }else{
      try{
        this.InputMaster.total_money_fc = this.InputMaster.s34_D.reduce((accumulator, currentObject) => {
          return accumulator + currentObject.payment_fc;
        }, 0);
      }catch{}
      this.InputMaster.total_money = this.formatDefaultNumber( this.InputMaster.total_money_fc * this.InputMaster.exchange_rate);
    }
  }
  onRefreshGridOutput(event: any) {
    this.onRefreshGrid = event;
  }
  onSelectedRowsDataOutput(event: any) {
    this.rowGridSelected = event;
  }
  HandleRowsDataGridOutput(event: any) {
    if(this.editPageState !== EditPageState.add) return;
    try{
      if (event.dataField == 'profession_code')
      {
        this.InputMaster.debitor_account = event.value[0].account1;
        this.InputMaster.description = event.value[0].notes;
      }
      else if (event.dataField == 'customer_code')
      {
        this.InputMaster.customer_name = event.value[0].name;
        this.InputMaster.address = event.value[0].address;
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
    this.salesVoucherService.s34_M_Search(new S34_M_ENTITY({
      //voucher_date:moment(this.InputMaster.voucher_date).utc(true),
      code:this.InputMaster.code,
      voucher_code:this.appSession.getVoucherCode
    }) as S34_M_ENTITY).subscribe((resonse:S34_M_ENTITY[])=>{
      if(resonse[0])
        this.InputMaster = resonse[0];
      else
        {
          // this.showMessageError('Không tìm thấy dữ liệu.')
          this.goBack();
        }
    })
  }
  // get getTax():CAT_Tax_ENTITY{
  //   if(this.cat_Tax.tax) return this.cat_Tax
  //   else return this.cat_Taxs.find(t=>t.code == this.InputMaster.tax_code)
  // }
  // async initCombobox(){
  //   this.cat_Taxs = await this.salesVATService.cAT_Tax_Search(new CAT_Tax_ENTITY()).toPromise()
  // }
}
