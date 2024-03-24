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
  selector: 'app-employee-sales-edit',
  templateUrl: './employee-sales-edit.component.html',
  styleUrls: ['./employee-sales-edit.component.css']
})
export class EmployeeSalesEditComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

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
  tbName:string = 'S31_M';
  CurrenFrom:string = EditPageState.view;
  rowGridSelected:any = null;
  onRefreshGrid:boolean = false;

  InputMaster:HRM_Employee_Labour_Contract_Appendix_ENTITY=new HRM_Employee_Labour_Contract_Appendix_ENTITY();
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
        this.navigatePassParam('employee/sales-add',[['code','']],new HRM_Employee_Labour_Contract_Appendix_ENTITY({}),this.tbName)
        break;
      }
      case EditPageState.edit:{
        this.navigatePassParam('employee/sales-edit',[['code',this.InputMaster.code]],new HRM_Employee_Labour_Contract_Appendix_ENTITY({}),this.tbName)
        break;
      }
      case EditPageState.save:{
        if(this.CurrenFrom == 'add_machine'){

        }else{
          try{
            if(this.InputMaster.hRM_Employee_Labour_Contract_Appendix_Target_Details){
              const i42D: HRM_Employee_Labour_Contract_Appendix_Target_Detail_ENTITY[] = this.InputMaster.hRM_Employee_Labour_Contract_Appendix_Target_Details.map((obj: any) => {
                let item = new HRM_Employee_Labour_Contract_Appendix_Target_Detail_ENTITY();
                for (const [key, value] of Object.entries(obj)) {
                  item[key] = value;
                }
                return item;
              });
              this.InputMaster.hRM_Employee_Labour_Contract_Appendix_Target_Details = i42D;
            }
          }catch{}
          if(!this.InputMaster.code){
            this.InputMaster.type = 'INSERT';
            this.employeeService.hRM_Employee_Labour_Contract_Appendix_Target_Update(this.InputMaster).subscribe((respond)=>{
              if(respond['status'] == '0')
              {
                this.InputMaster.code = respond['ref_code']
                this.showMessageSuccess(respond['message']);
              }else
                this.showMessageError(respond['message']);
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
          }else{
            this.employeeService.hRM_Employee_Labour_Contract_Appendix_Target_Update(this.InputMaster).subscribe((respond)=>{
              if(respond['status'] == '0')
              {
                this.showMessageSuccess(respond['message']);
              }else
                this.showMessageError(respond['message']);
              
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
        break;
      }
      case EditPageState.search:{
        break;
      }
      case EditPageState.viewDetail:{
        this.navigatePassParam('employee/sales-view-detail',[['code',this.InputMaster.code]],new HRM_Employee_Labour_Contract_Appendix_ENTITY({}),this.tbName)

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
    this.UpdateView();
  }
  onRefreshGridOutput(event: any) {
    this.onRefreshGrid = event;
  }
  onSelectedRowsDataOutput(event: any) {
    this.rowGridSelected = event;
  }
  HandleRowsDataGridOutput(event: any) {
    if(this.editPageState !== EditPageState.add) return;
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
    }as HRM_Employee_Labour_Contract_Appendix_ENTITY).subscribe((respond:HRM_Employee_Labour_Contract_Appendix_ENTITY[])=>{
      this.InputMaster = new HRM_Employee_Labour_Contract_Appendix_ENTITY({...this.InputMaster,...respond[0]});
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
