import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import moment from 'moment';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { DXDataGridViewComponent } from 'src/app/shared/dx-data-grid/dx-data-grid-view/dx-data-grid-view.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { EmployeeService, HRM_Employee_Labour_Contract_Appendix_ENTITY, SalesVoucherService, WarrantyService } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-employee-sales',
  templateUrl: './employee-sales.component.html',
  styleUrls: ['./employee-sales.component.css']
})
export class EmployeeSalesComponent  extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    injector: Injector,
    private employeeService: EmployeeService,
    private warrantyService:WarrantyService,
    private appSession: AppSession,
  ) { 
    super(injector);
    this.tbName = this.getRouteData('tbName');
    this.filterInput.month = moment().month()+1;
    this.filterInput.year = moment().year();
  }

  @ViewChild('DataGridGenRowTable') DataGridGenRowTable: DXDataGridViewComponent;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  @ViewChild('dialogDelete') dialogDelete: DialogAcctionComponent;
  InputMaster: HRM_Employee_Labour_Contract_Appendix_ENTITY[] = [];
  filterInput:HRM_Employee_Labour_Contract_Appendix_ENTITY=new HRM_Employee_Labour_Contract_Appendix_ENTITY();
  rowSelected:HRM_Employee_Labour_Contract_Appendix_ENTITY=new HRM_Employee_Labour_Contract_Appendix_ENTITY();
  listGenRowTable:HRM_Employee_Labour_Contract_Appendix_ENTITY[]=[];
  tbName:string = '';
  CurrenFrom:string = EditPageState.view;
  is_close:boolean = false;

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
  onClickAcction(id: number, storedName: string, param: string, keyService: string, classForm: string): void {
    switch(classForm){
      case EditPageState.add:{
        this.navigatePassParam('employee/sales-add',[['code',this.idSelect]],new HRM_Employee_Labour_Contract_Appendix_ENTITY({}),this.tbName)
        break;
      }
      case EditPageState.edit:{
        this.navigatePassParam('employee/sales-edit',[['code',this.idSelect],['month',this.filterInput.month],['year',this.filterInput.year]],new HRM_Employee_Labour_Contract_Appendix_ENTITY({}),this.tbName)
        break;
      }
      case EditPageState.save:{
        this.onLoadData();
        break;
      }
      case EditPageState.search:{
        this.onLoadData();
        break;
      }
      case EditPageState.viewDetail:{
        this.navigatePassParam('employee/sales-view-detail',[['code',this.idSelect],['voucher_date','']],new HRM_Employee_Labour_Contract_Appendix_ENTITY({}),this.tbName)

        break;
      }
      case EditPageState.delete:{
        this.dialogDelete.open();
        break;
      }
      case 'add_machine':{
        this.navigatePassParam('employee/sales-add',[['code',this.idSelect],['month',this.filterInput.month],['year',this.filterInput.year]],new HRM_Employee_Labour_Contract_Appendix_ENTITY({}),'HRM_Employee_Labour_Contract_Appendix_Sales_Add')
        break;
      }
      case 'open_book':{
     
      break;
    }
      default:break;
    }
  }
  getDataByID(storedName: string, param: string, keyService: string): void {
    throw new Error('Method not implemented.');
  }


  ngOnInit(): void {
    this.setAcction();
    this.onLoadData();
    this.CurrenFrom = EditPageState.view;
  }
  setAcction(){
    if(this.toolbar){
       this.toolbar.setUiAction(this);
    }
    else
      setTimeout(() => {
        this.setAcction();
      }, 50);
  }
  OnChangeDataFilter(obj:any){
    this.filterInput[obj.colName] = obj.value;
  }
  onLoadData(){
    if(!this.filterInput.month){
      this.showMessageWarning(this.translate('Vui lòng chọn tháng','Select a month, Please'))
      return
    }
    if(!this.filterInput.year){
      this.showMessageWarning(this.translate('Vui lòng chọn năm','Select a year, Please'))
      return
    }
    this.BlockUI();
    this.employeeService.hRM_Employee_Labour_Contract_Appendix_Search({
      month:Number(this.filterInput.month),
      year:Number(this.filterInput.year),
      type:'MY_SALES',
      employee_code: this.appSession.user.code
    }as HRM_Employee_Labour_Contract_Appendix_ENTITY).subscribe(
      (data: HRM_Employee_Labour_Contract_Appendix_ENTITY[]) => {
        // this.gridTargetList.setData(data,this.col_model,this.tbName)
        this.InputMaster = data;
        this.is_close = data[0].is_close;
        this.UpdateView();
        var labels=[],series=[];
        var sum_persent = 0;
        data.forEach(element => {
          sum_persent += element.ratio;
        });
        data[0].hRM_Employee_Labour_Contract_Appendix_Target_Details.forEach(element => {
          labels.push('\''+element.sales_date.date()+'');
          series.push(element.sales);
        });
        sum_persent = sum_persent/data.length;
        var i = 100 - sum_persent;
        if(i<0) i=0
        labels=['Còn lại '+i.toFixed(2)+'%','Đã đạt '+sum_persent.toFixed(2)+'%'];
        if(sum_persent > 100) sum_persent = 100;
        series=[ 100 - sum_persent,sum_persent];
        this.DataGridGenRowTable.setDataSource(data);
        this.UnBlockUI();
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
  }
  onSelectedRowsData(obj:any){
    this.rowSelected = obj[0];
  }
}
