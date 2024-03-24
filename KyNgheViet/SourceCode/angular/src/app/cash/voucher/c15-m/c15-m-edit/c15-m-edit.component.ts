import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import moment from 'moment';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { FormEditV2Component } from 'src/app/shared/form/form-edit-v2/form-edit-v2.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { C15_D_ENTITY, C15_M_ENTITY, CashVoucherService, ERPCommonService, ERPCommon_ENTITY } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';


@Component({
  selector: 'app-c15-m-edit',
  templateUrl: './c15-m-edit.component.html',
  styleUrls: ['./c15-m-edit.component.css']
})
export class C15MEditComponent  extends LayoutComponentBase implements OnInit, IUiAction<any> {

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
  tbName:string = 'cash/credit-note_M';
  rowGridSelected:any = null;
  onRefreshGrid:boolean = false;
 
  InputMaster:C15_M_ENTITY=new C15_M_ENTITY();
  editPageState:string = EditPageState.edit;

  onAdd(): void {
    throw new Error('Method not implemented.');
  }
  onUpdate(item: any): void {
    throw new Error('Method not implemented.');
  }
  onDelete(item: any): void {
    this.cashVoucherService.c15_M_Delete(this.InputMaster).subscribe(res=>{
      this.showMessage(res.message,res.status);
      this.navigatePassParam('cash/credit-note',[['code',this.InputMaster.code],['voucher_date',this.InputMaster.voucher_date.format('YYYY-MM-DD')]],new C15_M_ENTITY({}),this.tbName)
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
        this.navigatePassParam('cash/credit-note-add',[['code','']],new C15_M_ENTITY({}),this.tbName)

        break;
      }
      case EditPageState.edit:{
        this.navigatePassParam('cash/credit-note-edit',[['code',this.InputMaster.code],['voucher_date',this.InputMaster.voucher_date.format('YYYY-MM-DD')]],new C15_M_ENTITY({}),this.tbName)
        break;
      }
      case EditPageState.save:{
        if(this.InputMaster.c15_d){
          const D: C15_D_ENTITY[] = this.InputMaster.c15_d.map((obj: any) => {
            let item = new C15_D_ENTITY();
            for (const [key, value] of Object.entries(obj)) {
              item[key] = value;
            }
            return item;
          });
          this.InputMaster.c15_d = D;
        }
       
        if(!this.InputMaster.code){
          this.cashVoucherService.c15_M_Insert(this.InputMaster).subscribe(res=>{
            this.showMessage(res.message,res.status);
            if(res.status == 0){
              this.InputMaster.code = res.ref_code;
              this.navigatePassParam('cash/credit-note-view-detail',[['code',this.InputMaster.code],['voucher_date',this.InputMaster.voucher_date.format('YYYY-MM-DD')]],new C15_M_ENTITY({}),this.tbName)
            }
          })
        }else{
          this.cashVoucherService.c15_M_Update(this.InputMaster).subscribe(res=>{
            this.showMessage(res.message,res.status);
            if(res.status == 0)this.navigatePassParam('cash/credit-note-view-detail',[['code',this.InputMaster.code],['voucher_date',this.InputMaster.voucher_date.format('YYYY-MM-DD')]],new C15_M_ENTITY({}),this.tbName)

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

    this.InputMaster[event.dataField]= event.value;

    this.caculateSumMoney();
    this.UpdateView();
  }
  async caculateSumMoney(){
    try{
      this.InputMaster.arise = this.InputMaster.c15_d.reduce((accumulator, currentObject) => {
        return accumulator + currentObject.arise;
      }, 0);
      this.InputMaster.arise_fc = this.formatDefaultNumber(this.InputMaster.arise * this.InputMaster.exchange_rate);
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
    this.cashVoucherService.c15_M_Search(new C15_M_ENTITY({
      // voucher_date:moment(this.InputMaster.voucher_date).utc(true),
      code:this.InputMaster.code,
      voucher_code:this.appSession.getVoucherCode
    }) as C15_M_ENTITY).subscribe((resonse:C15_M_ENTITY[])=>{
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
