import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import moment from 'moment';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { FormEditV2Component } from 'src/app/shared/form/form-edit-v2/form-edit-v2.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { Accounting_VAT_Output_ENTITY, CAT_Goods_Configuration_ENTITY, CAT_Goods_Serial_ENTITY, CAT_Tax_ENTITY, ERPCommonService, ERPCommon_ENTITY, S32_D_ENTITY, S32_KIT_ENTITY, S32_M_ENTITY, SalesVATService, SalesVoucherService, WMSCategoryService, WMSVoucherService } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 's32-m-edit',
  templateUrl: './s32-m-edit.component.html',
  styleUrls: ['./s32-m-edit.component.css']
})
export class S32MEditComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    injector: Injector,
    private salesVATService: SalesVATService,
    private salesVoucherService: SalesVoucherService,
    private eRPCommonService: ERPCommonService,
    private wMSCategoryService: WMSCategoryService,
    private appSession: AppSession
  ) { 
    super(injector);
    if(this.getRouteData('voucher_code') == this.getVoucherCodeByName('S32')){
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
      this.InputMaster.voucher_code = this.getVoucherCodeByName('S32');
      this.appSession.setVoucherCode(this.InputMaster.voucher_code);
      this.InputMaster.code = this.idSelect;
    }
    
  }
  @ViewChild('FromEditV2') fromEditV2: FormEditV2Component;
  @ViewChild('dialogDelete') dialogDelete: DialogAcctionComponent;
  @Input() rowSelected: any = '';
  tbName:string = 'S32_M';
  rowGridSelected:any = null;
  onRefreshGrid:boolean = false;

  InputMaster:S32_M_ENTITY=new S32_M_ENTITY();
  editPageState:string = EditPageState.edit;
  cat_Taxs:CAT_Tax_ENTITY[] = [];
  cat_Tax:CAT_Tax_ENTITY = new CAT_Tax_ENTITY();
  listSerials:CAT_Goods_Serial_ENTITY[] = [];
  onAdd(): void {
    throw new Error('Method not implemented.');
  }
  onUpdate(item: any): void {
    throw new Error('Method not implemented.');
  }
  onDelete(item: any): void {
    this.salesVoucherService.s32_M_Delete(this.InputMaster).subscribe(res=>{
      this.showMessage(res.message,res.status);
      this.navigatePassParam('sales-invoice-with-goods-delivery-note',[['code',this.InputMaster.code],['voucher_date',this.InputMaster.voucher_date.format('YYYY-MM-DD')]],new S32_M_ENTITY({}),this.tbName)
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
        this.navigatePassParam('sales-invoice-with-goods-delivery-note-add',[['code','']],new S32_M_ENTITY({}),this.tbName)

        break;
      }
      case EditPageState.edit:{
        this.navigatePassParam('sales-invoice-with-goods-delivery-note-edit',[['code',this.InputMaster.code],['voucher_date',this.InputMaster.voucher_date.format('YYYY-MM-DD')]],new S32_M_ENTITY({}),this.tbName)
        break;
      }
      case EditPageState.save:{
        if(this.InputMaster.s32_D){
          const i42D: S32_D_ENTITY[] = this.InputMaster.s32_D.map((obj: any) => {
            let item = new S32_D_ENTITY();
            for (const [key, value] of Object.entries(obj)) {
              item[key] = value;
            }
            return item;
          });
          this.InputMaster.s32_D = i42D;
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
        if(this.InputMaster.s32_KIT){
          const D: S32_KIT_ENTITY[] = this.InputMaster.s32_KIT.map((obj: any) => {
            let item = new S32_KIT_ENTITY();
            for (const [key, value] of Object.entries(obj)) {
              item[key] = value;
            }
            return item;
          });
          this.InputMaster.s32_KIT = D;
        }
        if(!this.InputMaster.code){
          this.salesVoucherService.s32_M_Insert(this.InputMaster).subscribe(res=>{
            this.showMessage(res.message,res.status);
            if(res.status == 0){
              this.InputMaster.code = res.ref_code;
              this.navigatePassParam('sales-invoice-with-goods-delivery-note-view-detail',[['code',this.InputMaster.code],['voucher_date',this.InputMaster.voucher_date.format('YYYY-MM-DD')]],new S32_M_ENTITY({}),this.tbName)
            }
          })
        }else{
          this.salesVoucherService.s32_M_Update(this.InputMaster).subscribe(res=>{
            this.showMessage(res.message,res.status);
            if(res.status == 0)this.navigatePassParam('sales-invoice-with-goods-delivery-note-view-detail',[['code',this.InputMaster.code],['voucher_date',this.InputMaster.voucher_date.format('YYYY-MM-DD')]],new S32_M_ENTITY({}),this.tbName)

          })
        }
        break;
      }
      case EditPageState.search:{
        break;
      }
      case EditPageState.viewDetail:{
        this.navigatePassParam('sales-invoice-with-goods-delivery-note-view-detail',[['code',this.InputMaster.code],['voucher_date',this.InputMaster.voucher_date.format('YYYY-MM-DD')]],new S32_M_ENTITY({}),this.tbName)

        break;
      }
      case EditPageState.delete:{
        this.dialogDelete.open();
        break;
      }
      case 'print':{
        this.fromEditV2.dialogPreviewPrint.onPrint(this.tbName,this.InputMaster)
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
  handleValueChanged(event: any) {
    if(event.dataField == 'tax_code'){
      this.cat_Tax = this.cat_Taxs.find(t=>t.code == event.value);
    }
    // else if (event.dataField == 'invoice_no')
    // {
    //   for(var i = 0 ; i < this.InputMaster.accounting_VAT_Outputs.length ; i ++){
    //     this.InputMaster.accounting_VAT_Outputs[i].invoice_no = event.value
    //   }
    //   this.onRefreshGrid = !this.onRefreshGrid;
    // }
    // else if (event.dataField == 'serial_no')
    // {
    //   for(var i = 0 ; i < this.InputMaster.accounting_VAT_Outputs.length ; i ++){
    //     this.InputMaster.accounting_VAT_Outputs[i].series_no = event.value
    //   }
      
    //   this.onRefreshGrid = !this.onRefreshGrid;
    // }
    else if(event.dataField == 's32_D' && this.InputMaster.s32_D && !this.InputMaster.code){
      for(var i = 0 ; i < this.InputMaster.s32_D.length ; i ++){
        let s33D = this.InputMaster.s32_D[i];
        let vatOutAuto = new Accounting_VAT_Output_ENTITY({
            voucher_date:this.InputMaster.voucher_date,
            invoice_date:this.InputMaster.voucher_date,
            invoice_no:this.InputMaster.invoice_no,
            series_no:this.InputMaster.serial_no,
            customer_code:this.InputMaster.customer_code,
            customer_name:this.InputMaster.customer_name,
            address:this.InputMaster.address,
            goods_code:s33D.goods_code,
            notes:s33D.goods_name,
            tax_account:this.InputMaster.tax_account,
            tax_code:this.InputMaster.tax_code,
            debitor_account:this.InputMaster.debitor_account,
        })as Accounting_VAT_Output_ENTITY;

      if(!this.InputMaster.accounting_VAT_Outputs) this.InputMaster.accounting_VAT_Outputs = [];
      if(!this.InputMaster.cat_goods_configurations) this.InputMaster.cat_goods_configurations = [];
      //else this.InputMaster.cat_goods_configurations = this.InputMaster.cat_goods_configurations.filter(con=>this.InputMaster.s32_D.some(g=>g.goods_code == con.goods_code && g.serial_no.split(';').includes(con.serial)))
        
        //Begin tax
        if(!this.InputMaster.accounting_VAT_Outputs[i]){
          this.InputMaster.accounting_VAT_Outputs.push(new Accounting_VAT_Output_ENTITY({...vatOutAuto,code:this.newID}) as Accounting_VAT_Output_ENTITY)
        }else{
          if(!this.InputMaster.accounting_VAT_Outputs[i].voucher_date)
            this.InputMaster.accounting_VAT_Outputs[i].voucher_date=this.InputMaster.voucher_date;
          if(!this.InputMaster.accounting_VAT_Outputs[i].invoice_date)
            this.InputMaster.accounting_VAT_Outputs[i].invoice_date=this.InputMaster.voucher_date;
          if(!this.InputMaster.accounting_VAT_Outputs[i].invoice_no)
            this.InputMaster.accounting_VAT_Outputs[i].invoice_no=this.InputMaster.invoice_no;
          if(!this.InputMaster.accounting_VAT_Outputs[i].series_no)
            this.InputMaster.accounting_VAT_Outputs[i].series_no=this.InputMaster.serial_no;

          this.InputMaster.accounting_VAT_Outputs[i].customer_code=this.InputMaster.customer_code;
          this.InputMaster.accounting_VAT_Outputs[i].customer_name=this.InputMaster.customer_name;
          this.InputMaster.accounting_VAT_Outputs[i].address=this.InputMaster.address;
          this.InputMaster.accounting_VAT_Outputs[i].goods_code=s33D.goods_code;
          this.InputMaster.accounting_VAT_Outputs[i].notes=s33D.goods_name;
          this.InputMaster.accounting_VAT_Outputs[i].tax_account=this.InputMaster.tax_account;
          this.InputMaster.accounting_VAT_Outputs[i].tax_code=this.InputMaster.tax_code;
          this.InputMaster.accounting_VAT_Outputs[i].debitor_account=this.InputMaster.debitor_account;
          this.InputMaster.accounting_VAT_Outputs[i].total_money=s33D.arise;
          this.InputMaster.accounting_VAT_Outputs[i].total_money_fc=s33D.arise_fc;
          if(!this.InputMaster.accounting_VAT_Outputs[i].tax_rate){
            this.InputMaster.accounting_VAT_Outputs[i].tax_rate= this.InputMaster.tax;
            this.InputMaster.accounting_VAT_Outputs[i].tax =this.formatDefaultNumber(s33D.arise*(this.InputMaster.tax/100));
            this.InputMaster.accounting_VAT_Outputs[i].tax_fc = this.formatDefaultNumber(s33D.arise_fc * (this.InputMaster.tax/100));
          }
        }
        //End tax
        //Begin configuration
        try{
          if(s33D.serial_no){
            var serials = s33D.serial_no.split(';')
            serials.forEach(serial => {
              var configuration = this.listSerials.find(config=>config.serial == serial)
              let vatConfiguration = new CAT_Goods_Configuration_ENTITY({
                  goods_code:s33D.goods_code,
                  serial:serial,
                  sku: configuration.sku,
                  model: configuration.model,
                  cpu: configuration.cpu,
                  ram: configuration.ram,
                  hdd: configuration.hdd,
                  hdd_unit: configuration.hdd_unit,
                  ssd: configuration.ssd,
                  ssd_unit: configuration.ssd_unit,
                  lcd: configuration.lcd,
                  notes: this.InputMaster.notes
              })as CAT_Goods_Configuration_ENTITY;
              if(!this.InputMaster.cat_goods_configurations.find(old=>old.serial == serial && old.goods_code == s33D.goods_code)){
                this.InputMaster.cat_goods_configurations.push(new CAT_Goods_Configuration_ENTITY({...vatConfiguration,code:this.newID}) as CAT_Goods_Configuration_ENTITY)
              }else{
                if(!this.InputMaster.cat_goods_configurations[i].serial)
                  this.InputMaster.cat_goods_configurations[i].serial=serial;
              } 
            });
          }
        }catch{}
        //End configuration
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
        this.InputMaster.total_money_goods = this.InputMaster.s32_D.reduce((accumulator, currentObject) => {
          return accumulator + this.formatDefaultNumber(currentObject.arise);
        }, 0);
        this.InputMaster.discount_money = this.InputMaster.s32_D.reduce((accumulator, currentObject) => {
          return accumulator + this.formatDefaultNumber(currentObject.discount);
        }, 0);
        this.InputMaster.tax_money = this.InputMaster.accounting_VAT_Outputs.reduce((accumulator, currentObject) => {
          return accumulator + this.formatDefaultNumber(currentObject.tax);
        }, 0);
        this.InputMaster.total_money = this.formatDefaultNumber(this.InputMaster.total_money_goods + this.InputMaster.tax_money - this.InputMaster.discount_money);
      }catch{}
    }else{
      try{
        this.InputMaster.total_money_goods_fc = this.InputMaster.s32_D.reduce((accumulator, currentObject) => {
          return accumulator + this.formatDefaultNumber(currentObject.arise_fc);
        }, 0);
        this.InputMaster.discount_money_fc = this.InputMaster.s32_D.reduce((accumulator, currentObject) => {
          return accumulator + this.formatDefaultNumber(currentObject.discount_fc);
        }, 0);
        this.InputMaster.tax_money_fc =this.InputMaster.accounting_VAT_Outputs.reduce((accumulator, currentObject) => {
          return accumulator + this.formatDefaultNumber(currentObject.tax_fc);
        }, 0);
        this.InputMaster.total_money_fc = this.formatDefaultNumber(this.InputMaster.total_money_goods_fc + this.InputMaster.tax_money_fc - this.InputMaster.discount_money_fc);
        
      }catch{}
      try{
        this.InputMaster.discount_money = this.InputMaster.s32_D.reduce((accumulator, currentObject) => {
          return accumulator + currentObject.discount;
        }, 0);
        this.InputMaster.tax_money = this.formatDefaultNumber(this.InputMaster.tax_money_fc * this.InputMaster.exchange_rate);
        this.InputMaster.total_money_goods = this.formatDefaultNumber(this.InputMaster.total_money_goods_fc * this.InputMaster.exchange_rate);
        this.InputMaster.total_money = this.formatDefaultNumber(this.InputMaster.total_money_fc * this.InputMaster.exchange_rate);
      }catch{}
    }
  }
  onRefreshGridOutput(event: any) {
    this.onRefreshGrid = event;
  }
  onSelectedRowsDataOutput(event: any) {
    this.rowGridSelected = event;
  }
  onSelectRowsGridOnDropdownGridEditDataOutput(event: any) {
   
  }
  HandleRowsDataGridOutput(event: any) {
    if(this.editPageState !== EditPageState.add) return;
    try{
      if (event.dataField == 'profession_code')
      {
        this.InputMaster.debitor_account = event.value[0].account1;
        this.InputMaster.notes = event.value[0].notes;
      }
      else if (event.dataField == 'seller_code')
        this.InputMaster.seller_name = event.value[0].name;
      else if (event.dataField == 'customer_code')
      {
        this.InputMaster.customer_name = event.value[0].name;
        this.InputMaster.address = event.value[0].address;
      }
      else if (event.dataField == 'tax_code')
      {
        this.InputMaster.tax_account = event.value[0].tax_account;
        this.InputMaster.tax = this.formatDefaultNumber(event.value[0].tax);
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
    this.salesVoucherService.s32_M_Search(new S32_M_ENTITY({
      //voucher_date:moment(this.InputMaster.voucher_date).utc(true),
      code:this.InputMaster.code,
      voucher_code:this.getVoucherCodeByName('S32')
    }) as S32_M_ENTITY).subscribe((resonse:S32_M_ENTITY[])=>{
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
    this.listSerials = await this.wMSCategoryService.cAT_Goods_Serial_Search(new CAT_Goods_Serial_ENTITY()).toPromise()
  }
}
