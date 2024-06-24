import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import moment from 'moment';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { CAT_Warranty_Certificate_ENTITY, ERPCommonService, ERPCommon_ENTITY, SalesCategoryService } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-warranty-certificate-edit',
  templateUrl: './warranty-certificate-edit.component.html',
  styleUrls: ['./warranty-certificate-edit.component.css']
})
export class WarrantyCertificateEditComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    injector: Injector,
    private salesCategoryService: SalesCategoryService,
    private eRPCommonService: ERPCommonService,
    private appSession: AppSession
  ) { 
    super(injector);
    this.editPageState = this.getRouteData('editPageState');
    this.tbName = this.getRouteData('tbName');
    this.InputMaster['sys_TableName'] = this.tbName;
    const voucher_code = this.getRouteData('voucher_code');
    this.appSession.setVoucherCode(voucher_code);
    if(this.editPageState == EditPageState.add){
      this.InputMaster.voucher_date = this.getFullVoucherDate;
      this.onGetVoucherNo();
    }else if(this.editPageState == EditPageState.edit || this.editPageState == EditPageState.viewDetail){
      this.InputMaster.code = this.getRouteParamObj('code');
      this.onLoadData();
    }
  }

  @ViewChild('dialogDelete') dialogDelete: DialogAcctionComponent;
  tbName:string = 'CAT_Warranty_Certificate';
  InputMaster:CAT_Warranty_Certificate_ENTITY=new CAT_Warranty_Certificate_ENTITY();
  editPageState:string = EditPageState.edit;
  rowGridSelected:any = null;
  
  onAdd(): void {
    throw new Error('Method not implemented.');
  }
  onUpdate(item: any): void {
    throw new Error('Method not implemented.');
  }
  onDelete(item: any): void {
    throw new Error('Method not implemented.');
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
  onClickAcction(id: number, storedName: string, param: string, keyService: string, classForm: string): void {
    throw new Error('Method not implemented.');
  }
  getDataByID(storedName: string, param: string, keyService: string): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
  }
  onClickAcctionResponse(e:any): void {
    switch(e.classForm){
      case EditPageState.add:{
      
        break;
      }
      case EditPageState.edit:{
        this.navigatePassParam('sales/warranty-certificate-edit',[['code',this.InputMaster.code]],new CAT_Warranty_Certificate_ENTITY(),this.tbName);
        break;
      }
      case EditPageState.save:{
        if(!this.InputMaster.code){//chỗ này dùng code nha
          //Mình đang dùng thêm-sửa-xóa chung 1 api
          //this.InputMaster.type = 'INSERT'
          this.salesCategoryService.cAT_Warranty_Certificate_Insert(this.InputMaster).subscribe(res=>{
            this.showMessage(res.message,res.status);
            if(res.status == 0)
             this.navigatePassParam('sales/warranty-certificate-view-detail',[['code',res.ref_code]],new CAT_Warranty_Certificate_ENTITY(),this.tbName);
          })
        }else{
          //this.InputMaster.type = 'UPDATE'
          this.salesCategoryService.cAT_Warranty_Certificate_Update(this.InputMaster).subscribe(res=>{
            this.showMessage(res.message,res.status)
            if(res.status == 0) this.navigatePassParam('sales/warranty-certificate-view-detail',[['code',res.ref_code]],new CAT_Warranty_Certificate_ENTITY(),this.tbName);
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
  confirmDelete(){
    this.salesCategoryService.cAT_Warranty_Certificate_Delete(this.InputMaster).subscribe(res=>{
      this.showMessage(res.message,res.status);
      if(res.status == 0)
             this.navigatePassParam('sales/warranty-certificate',[['code',res.ref_code]],new CAT_Warranty_Certificate_ENTITY(),this.tbName);
    })
  }
  handleValueChanged(event: any) {
    this.InputMaster[event.dataField]= event.value;
    this.UpdateView();
  }
  HandleRowsDataGridOutput(event: any) {

    this.UpdateView();
  }
  onSelectedRowsDataOutput(event: any) {
    this.rowGridSelected = event;
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
     this.salesCategoryService.cAT_Warranty_Certificate_Search(new CAT_Warranty_Certificate_ENTITY({
       code:this.InputMaster.code
     }) as CAT_Warranty_Certificate_ENTITY).subscribe((resonse: CAT_Warranty_Certificate_ENTITY[])=>{
       if(resonse[0])this.InputMaster = resonse[0]
       else this.InputMaster = new CAT_Warranty_Certificate_ENTITY();
     })
   }
}
