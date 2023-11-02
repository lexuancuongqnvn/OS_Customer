import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppConsts } from 'src/app/app-consts.component';
import { JqgridListComponent } from 'src/app/shared/jqgrid/jqgrid-list/jqgrid-list.component';
import { InputSelectComponentV2 } from 'src/app/shared/layout/input-control-simple/input-select-v2/input-select-v2.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { DepartmentService, EmployeeService, HRM_Employee_ENTITY, HRM_Employee_Labour_Contract_Appendix_Target_Detail_ENTITY } from 'src/app/shared/service-proxies/api-shared';
import { AlertMessageComponent } from 'src/app/shared/sidenav/alert-message/alert-message.component';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-sales-statistics',
  templateUrl: './sales-statistics.component.html',
  styleUrls: ['./sales-statistics.component.css']
})
export class SalesStatisticsComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    private injector: Injector,
    private employeeService: EmployeeService,
  ) {
    super(injector);
  }
  isEdit:boolean = false;
  @ViewChild('gridList') gridList: JqgridListComponent;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  @ViewChild('alertMessage') alertMessage: AlertMessageComponent;
  @ViewChild('SelectMonthPicker') SelectMonthPicker: InputSelectComponentV2;
  @ViewChild('SelectEmployeePicker') SelectEmployeePicker: InputSelectComponentV2;
  
  tbName: string = 'HRM_Employee_Labour_Contract_Appendix_Target_Detail';
  filterInput:HRM_Employee_Labour_Contract_Appendix_Target_Detail_ENTITY = new HRM_Employee_Labour_Contract_Appendix_Target_Detail_ENTITY();
  InputModel:HRM_Employee_Labour_Contract_Appendix_Target_Detail_ENTITY = new HRM_Employee_Labour_Contract_Appendix_Target_Detail_ENTITY();
  CurrenFrom:string = EditPageState.view;
  listDepartment:HRM_Employee_Labour_Contract_Appendix_Target_Detail_ENTITY[] = [];
  listMonth:any[] = [{month:1,name:'Tháng 1'},{month:2,name:'Tháng 2'},{month:3,name:'Tháng 3'},{month:4,name:'Tháng 4'},{month:5,name:'Tháng 5'},{month:6,name:'Tháng 6'},{month:7,name:'Tháng 7'},{month:8,name:'Tháng 8'},{month:9,name:'Tháng 9'},{month:10,name:'Tháng 10'},{month:11,name:'Tháng 11'},{month:12,name:'Tháng 12'}];
  listEmployee:HRM_Employee_ENTITY[] = [];
  col_model:any[] = [
    { label: 'Mã', name: 'code', key: true, width: 10 , hidden: true},
    { label: 'Tên nhân viên', name: 'employee_name', width: 10 },
    { label: 'Tên doanh số', name: 'name_target', width: 10 },
    { label: 'Tên khách hàng', name: 'customer_name', width: 10 ,editable: true},
    { label: 'Ngày bán', name: 'sales_date_f', width: 10 ,editable: true,sorttype: 'date'},
    { label: 'Tên người liên hệ', name: 'contact_name', width: 10 ,editable: true},
    { label: 'Số điện thoại', name: 'contact_phone', width: 10 ,editable: true},
    { label: 'Tên máy', name: 'machine_name', width: 35 ,editable: true},
    { label: 'Số lượng', name: 'sales', width: 10,editable: true,sorttype: 'int' ,summaryTpl: "Tổng: {0}",summaryType: "sum"},
    { label: 'Loại máy', name: 'machine_type_name', width: 10 ,editable: true, sorttype: 'select', editoptions: { value: [{code:'MAY',name:'Máy'},{code:'LK',name:'Linh kiện'}] }},
    { label: 'Đơn giá', name: 'machine_value', width: 10 ,editable: true, sorttype: 'money',summaryTpl: "Tổng: {0}",summaryType: "sum",formatter: 'currency'},
    { label: 'SL Asia', name: 'asia', width: 10 ,editable: true,sorttype: 'int'},
    { label: 'Giá bán', name: 'machine_sale', width: 10 ,editable: true, sorttype: 'money',summaryTpl: "Tổng: {0}",summaryType: "sum",formatter: 'currency'},
    { label: 'Giá nhập', name: 'machine_buy', width: 10 ,editable: true, sorttype: 'money',summaryTpl: "Tổng: {0}",summaryType: "sum",formatter: 'currency'},
    { label: 'Lợi nhuận', name: 'profit', width: 10 ,editable: true, sorttype: 'money',summaryTpl: "Tổng cộng: {0}",summaryType: "sum",formatter: 'currency'},    
    { label: 'Ghi chú', name: 'notes', width: 10,editable: true },
  ]
  get isValid():boolean{
    if((!this.filterInput.month || this.filterInput.month == 0)&&this.filterInput.year){
      this.showMessageWarning('Vui lòng chọn tháng');
      return false;
    }
    if((!this.filterInput.year || this.filterInput.year == 0) &&  this.filterInput.month){
      this.showMessageWarning('Vui lòng chọn năm');
      return false;;
    } else  
    return true;
  }
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
    switch(classForm){
      case EditPageState.add:{
        
        break;
      }
      case EditPageState.edit:{
      
        break;
      }
      case EditPageState.delete:{
       
        break;
      }
      case EditPageState.save:{
        
        break;
      }
      case EditPageState.search:{
        this.LoadData();
        break;
      }
      case EditPageState.viewDetail:{
        break;
      }
      case 'ExportExcel':{
        this.ExportExcel();
        break;
      }
      default:break;
    }
  }
  getDataByID(storedName: string, param: string, keyService: string): void {
    throw new Error('Method not implemented.');
  }
  
  confirmDelete() {
    
  }
  LoadData() {
    if(!this.isValid) return;
    this.BlockUI();
    this.employeeService.hRM_Employee_Labour_Contract_Appendix_Target_Detail_Search(this.filterInput).subscribe(
      (data: any) => {
        this.gridList.setData(data,this.col_model,this.tbName)
        this.UpdateView();
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
  }
  ExportExcel() {
    if(!this.isValid) return;
    this.BlockUI();
    this.employeeService.hRM_Employee_Labour_Contract_Appendix_Target_Detail_Export(this.filterInput).subscribe(
      (data: any) => {
        window.open(AppConsts.baseUrl+data.path_files, "_blank");
        this.UpdateView();
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
  }
  
  setAcction(){
    if(this.toolbar)
      this.toolbar.setUiAction(this);
    else
      setTimeout(() => {
        this.setAcction();
      }, 50);
  }
  initCombobox(){
    setTimeout(() => {
      this.SelectMonthPicker.setList(this.listMonth);
    }, 1000);
    this.employeeService.hRM_Employee_Search(new HRM_Employee_ENTITY()).subscribe(res=>{
      res.forEach(emp=>{
        emp['name'] = emp.firstName + ' ' + emp.lastName;
      })
      this.listEmployee = res;
      this.SelectEmployeePicker.setList(res);
    })
  }
  onSelect(v:any,col:string){
    this.InputModel[col] = v;
  }
  onSelectFilter(v:any,col:string){
    if(col == 'month')
      this.filterInput[col] = Number(v);
    else if(col == 'year') this.filterInput[col] = v.year();
    else this.filterInput[col] = v;
  }
  ngOnInit(): void {
    this.setAcction();
    this.initCombobox();
  }

}
