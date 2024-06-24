import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { FormEditV2Component } from 'src/app/shared/form/form-edit-v2/form-edit-v2.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { EmployeeService, HRM_Employee_Labour_Contract_Appendix_ENTITY, HRM_Employee_Labour_Contract_Appendix_Target_Detail_ENTITY, WarrantyService } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-sales-management-edit',
  templateUrl: './sales-management-edit.component.html',
  styleUrls: ['./sales-management-edit.component.css']
})
export class SalesManagementEditComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

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
      this.onLoadData();
    }
  }
  @ViewChild('FromEditV2') fromEditV2: FormEditV2Component;
  @ViewChild('dialogDelete') dialogDelete: DialogAcctionComponent;
  tbName:string = 'P22_M';
  rowGridSelected:any = null;
  onRefreshGrid:boolean = false;
 
  InputMaster:HRM_Employee_Labour_Contract_Appendix_ENTITY=new HRM_Employee_Labour_Contract_Appendix_ENTITY();
  editPageState:string = EditPageState.edit;

  onAdd(): void {
    throw new Error('Method not implemented.');
  }
  onUpdate(item: any): void {
    throw new Error('Method not implemented.');
  }
  onDelete(item: any): void {
    // this.purchaseVoucherService.p22_M_Delete(this.InputMaster).subscribe(res=>{
    //   this.showMessage(res.message,res.status);
    //   this.navigatePassParam('purchase/purchase-invoice-with-inventory-receipt',[['code',this.InputMaster.code],['voucher_date',this.InputMaster.voucher_date.format('YYYY-MM-DD')]],new HRM_Employee_Labour_Contract_Appendix_ENTITY({}),this.tbName)
    // })
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
        this.navigatePassParam('sales-edit',[['code',this.InputMaster.code]],new HRM_Employee_Labour_Contract_Appendix_ENTITY({}),this.tbName)
        break;
      }
      case EditPageState.save:{
        try{
          var Subs = this.InputMaster.hRM_Employee_Labour_Contract_Appendix_Target_Details;
          this.InputMaster.hRM_Employee_Labour_Contract_Appendix_Target_Details = [];
          if(Subs.length>0)
          {
            for(var i = 0 ; i < Subs.length ; i++)
            {
              var newrow = new  HRM_Employee_Labour_Contract_Appendix_Target_Detail_ENTITY();
              for (const [key, value] of Object.entries(Subs[i])) {
                newrow[key] = Subs[i][key];
              }
              newrow = HRM_Employee_Labour_Contract_Appendix_Target_Detail_ENTITY.fromJS(newrow);
              this.InputMaster.hRM_Employee_Labour_Contract_Appendix_Target_Details.push(newrow);
            }
          }
        }catch{}
        if(!this.InputMaster.code){
          this.InputMaster.type = 'INSERT';
          this.employeeService.hRM_Employee_Labour_Contract_Appendix_Target_Update(this.InputMaster).subscribe((respond)=>{
            if(respond['status'] == '0')
            {
              this.InputMaster.code = respond['ref_code']
              this.showMessage(respond.message,respond.status);
              if(respond.status == 0){
                this.InputMaster.code = respond.ref_code;
                this.navigatePassParam('sales-view-detail',[['code',this.InputMaster.code]],new HRM_Employee_Labour_Contract_Appendix_ENTITY({}),this.tbName)
              }
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
   
  }
  handleValueChanged(event: any) {

    this.InputMaster[event.dataField]= event.value;
    this.UpdateView();
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
    
  }

  onLoadData(){
    this.employeeService.hRM_Employee_Labour_Contract_Appendix_Search({
      ...this.InputMaster,
      code:this.idSelect,
      type:'MY_SALES',
      employee_code:this.InputMaster.employee_code
    }as HRM_Employee_Labour_Contract_Appendix_ENTITY).subscribe((respond:HRM_Employee_Labour_Contract_Appendix_ENTITY[])=>{
      if(respond[0])
        this.InputMaster = respond[0];
      else
        {
          // this.showMessageError('Không tìm thấy dữ liệu.')
          this.goBack();
        }
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
