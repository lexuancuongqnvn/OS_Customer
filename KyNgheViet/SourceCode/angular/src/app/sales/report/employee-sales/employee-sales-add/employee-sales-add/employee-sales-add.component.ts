import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import moment from 'moment';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { FormEditV2Component } from 'src/app/shared/form/form-edit-v2/form-edit-v2.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { CAT_Tax_ENTITY, EmployeeService, HRM_Employee_Labour_Contract_Appendix_ENTITY, HRM_Employee_Labour_Contract_Appendix_Target_Detail_ENTITY, WarrantyService } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-employee-sales-add',
  templateUrl: './employee-sales-add.component.html',
  styleUrls: ['./employee-sales-add.component.css']
})
export class EmployeeSalesAddComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    injector: Injector,
    private employeeService: EmployeeService,
    private warrantyService:WarrantyService,
    private appSession: AppSession
  ) { 
    super(injector);
    this.editPageState = this.getRouteData('editPageState');
    this.tbName = this.getRouteData('tbName');
    this.InputMaster['sys_TableName'] = this.tbName;
    if(this.editPageState == EditPageState.add){
    }else if(this.editPageState == EditPageState.edit || this.editPageState == EditPageState.viewDetail){
      this.InputMaster.code = this.getRouteParamObj('code');
      this.InputMaster.month = Number(this.getRouteParamObj('month'));
      this.InputMaster.year = Number(this.getRouteParamObj('year'));
      this.onLoadData();
    }
  }
  @ViewChild('FromEditV2') fromEditV2: FormEditV2Component;
  @ViewChild('dialogDelete') dialogDelete: DialogAcctionComponent;
  tbName:string = '';
  CurrenFrom:string = EditPageState.view;
  rowGridSelected:any = null;
  onRefreshGrid:boolean = false;

  InputMaster:HRM_Employee_Labour_Contract_Appendix_Target_Detail_ENTITY=new HRM_Employee_Labour_Contract_Appendix_Target_Detail_ENTITY();
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
        this.navigatePassParam('employee/sales-add',[['code','']],new HRM_Employee_Labour_Contract_Appendix_Target_Detail_ENTITY({}),this.tbName)
        break;
      }
      case EditPageState.edit:{
        this.navigatePassParam('employee/sales-edit',[['code',this.InputMaster.code]],new HRM_Employee_Labour_Contract_Appendix_Target_Detail_ENTITY({}),this.tbName)
        break;
      }
      case EditPageState.save:{
        this.employeeService.hRM_Employee_Labour_Contract_Appendix_Target_Detail_Insert(this.InputMaster).subscribe(res=>{
          if(res['status'] == 0) {
            this.showMessageSuccess(res['message']);
            this.goBack();
          }else this.showMessageError(res['message'])
        })
        break;
      }
      case EditPageState.search:{
        break;
      }
      case EditPageState.viewDetail:{
        this.navigatePassParam('employee/sales-view-detail',[['code',this.InputMaster.code]],new HRM_Employee_Labour_Contract_Appendix_Target_Detail_ENTITY({}),this.tbName)

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
  confirmDelete(){

  }
  ngOnInit(): void {

  }
  handleValueChanged(event: any) {
    this.InputMaster[event.dataField]= event.value;
    if(event.dataField == 'machine_sale'){
      this.InputMaster.profit = this.InputMaster.machine_sale - this.InputMaster.machine_buy;
      this.UpdateEditV2()
    }else if(event.dataField == 'machine_value'){
      this.InputMaster.machine_sale = this.InputMaster.machine_value * this.InputMaster.sales;
      this.UpdateEditV2()
    }
    this.UpdateView();
  }
  onRefreshGridOutput(event: any) {
    this.onRefreshGrid = event;
  }
  onSelectRowsGridOnDropdownGridEditDataOutput(event: any) {
   debugger
  }
  onSelectedRowsDataOutput(event: any) {
    this.rowGridSelected = event;
  }
  HandleRowsDataGridOutput(event: any) {
    if(event.dataField == 'machine_serial') this.InputMaster.machine_code = event.value[0].goods_code;
    this.UpdateEditV2();
  }

  onLoadData(){
    this.BlockUI();
    this.employeeService.hRM_Employee_Labour_Contract_Appendix_Search({
      month:this.InputMaster.month,
      year:this.InputMaster.year,
      code:this.InputMaster.code,
      type:'MY_SALES',
      employee_code:this.appSession.user.code
    }as HRM_Employee_Labour_Contract_Appendix_Target_Detail_ENTITY).subscribe((respond:HRM_Employee_Labour_Contract_Appendix_ENTITY[])=>{
      this.InputMaster = new HRM_Employee_Labour_Contract_Appendix_Target_Detail_ENTITY(
        {...this.InputMaster,...respond[0],sales:1,machine_type:'MAY',appendix_target_code:this.InputMaster.code,sales_date:moment(),machine_buy:0,machine_sale:0,profit:0});
      this.UpdateView();
    },
    (err) => {
        if (err.status == 401) {
          this.Respond401();
        }
    },
    () => {
      this.UnBlockUI();
    });
  }


}
