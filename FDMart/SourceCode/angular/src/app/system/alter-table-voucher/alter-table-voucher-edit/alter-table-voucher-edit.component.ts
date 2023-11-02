import { Component, Injector, OnInit } from '@angular/core';
import moment from 'moment';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ERPCommonService, SYSCommonService, SYS_Alter_Table_Voucher_ENTITY, SYS_List_Voucher_ENTITY } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-alter-table-voucher-edit',
  templateUrl: './alter-table-voucher-edit.component.html',
  styleUrls: ['./alter-table-voucher-edit.component.css']
})
export class AlterTableVoucherEditComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    injector: Injector,
    private sYSCommonService: SYSCommonService,
    private eRPCommonService: ERPCommonService,
    private appSession: AppSession
  ) { 
    super(injector);
    this.InputMaster = window.history.state;
    this.editPageState = this.getRouteData('editPageState');
    this.tbName = this.getRouteData('tbName');
  }
  tbName:string = 'SYS_Alter_Table_Voucher';

  InputMaster:SYS_Alter_Table_Voucher_ENTITY=new SYS_Alter_Table_Voucher_ENTITY();
  listVoucher:SYS_List_Voucher_ENTITY[]=[];
  editPageState:string = EditPageState.edit;
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
    this.eRPCommonService.sYS_List_Voucher_Search(new SYS_List_Voucher_ENTITY()).subscribe(res=>this.listVoucher=res);
  }
  onClickAcctionResponse(e:any): void {
    switch(e.classForm){
      case EditPageState.add:{
      
        break;
      }
      case EditPageState.edit:{
        
        break;
      }
      case EditPageState.save:{
        this.sYSCommonService.sYS_Alter_Table_Voucher(this.InputMaster).subscribe(res=>{
          this.showMessage(res.message,res.status);
          if(res.status == 0) this.goBack();
        })
        break;
      }
      case EditPageState.search:{
        break;
      }
      case EditPageState.viewDetail:{
       
        break;
      }
      case 'update_target':{
        
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
  handleValueChanged(event: any) {
    if(event.dataField == "voucher_code"){
      const voucher = this.listVoucher.find(e=>e.voucher_code===event.value);
      this.InputMaster.company_code = voucher.company_code;
      this.InputMaster.starts_with_d = voucher.starts_with_d;
      this.InputMaster.starts_with_m = voucher.starts_with_m;
      this.InputMaster.voucher_year = moment().year();
    }
    this.InputMaster[event.dataField]= event.value;
    this.UpdateView();
  }
}
