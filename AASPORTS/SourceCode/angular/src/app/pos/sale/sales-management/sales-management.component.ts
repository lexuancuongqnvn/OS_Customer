import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import moment from 'moment';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { JqgridEditComponent } from 'src/app/shared/jqgrid/jqgrid-edit/jqgrid-edit.component';
import { JqgridListComponent } from 'src/app/shared/jqgrid/jqgrid-list/jqgrid-list.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { InputSelectComponentV2 } from 'src/app/shared/layout/input-control-simple/input-select-v2/input-select-v2.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { HRM_Employee_Labour_Contract_Appendix_ENTITY, ReferenceService, ProductService, EmployeeService, IHRM_Employee_Labour_Contract_Appendix_Target_Detail_ENTITY, HRM_Employee_Labour_Contract_Appendix_Target_Detail_ENTITY, HRM_Employee_ENTITY, WarrantyService, Warranty_Laptop_ENTITY } from 'src/app/shared/service-proxies/api-shared';
import { SidenavAddEditComponent } from 'src/app/shared/sidenav/sidenav-add-edit/sidenav-add-edit.component';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

declare var renderSalesBarsChart;
declare var renderPieChartSales;
@Component({
  selector: 'app-sales-management',
  templateUrl: './sales-management.component.html',
  styleUrls: ['./sales-management.component.css']
})
export class SalesManagementComponent  extends LayoutComponentBase implements OnInit, IUiAction<any> {

  @ViewChild('gridTargetList') gridTargetList: JqgridListComponent;
  @ViewChild('gridMenuEdit') gridMenuEdit: JqgridEditComponent<HRM_Employee_Labour_Contract_Appendix_ENTITY>;
  @ViewChild('dialogDelete') dialogDelete: DialogAcctionComponent;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  @ViewChild('toolbarEdit') toolbarEdit: ToolbarComponent;
  @ViewChild('sidenavAddEdit') sidenavAddEdit: SidenavAddEditComponent;
  @ViewChild('SelectEmployee_replacePicker') SelectEmployee_replacePicker: InputSelectComponentV2;
  @ViewChild('SelectEmployeePicker') SelectEmployeePicker: InputSelectComponentV2;
  @ViewChild('SelectTargetPicker') SelectTargetPicker: InputSelectComponentV2;
  @ViewChild('SelectUnitTargetPicker') SelectUnitTargetPicker: InputSelectComponentV2;
  @ViewChild('gridDetailEdit') gridDetailEdit: JqgridEditComponent<HRM_Employee_Labour_Contract_Appendix_Target_Detail_ENTITY>;
  tbName: string = 'HRM_Employee_Labour_Contract_Appendix_Sales';
  CurrenFrom:string = EditPageState.view;
  InputMaster: HRM_Employee_Labour_Contract_Appendix_ENTITY[] = [];
  InputModel: HRM_Employee_Labour_Contract_Appendix_ENTITY = new HRM_Employee_Labour_Contract_Appendix_ENTITY();
  InputModelDetail: HRM_Employee_Labour_Contract_Appendix_Target_Detail_ENTITY = new HRM_Employee_Labour_Contract_Appendix_Target_Detail_ENTITY();
  filterInput:HRM_Employee_Labour_Contract_Appendix_ENTITY = new HRM_Employee_Labour_Contract_Appendix_ENTITY();
  listEmployee: HRM_Employee_ENTITY[] = [];
  listData:HRM_Employee_Labour_Contract_Appendix_ENTITY[]=[];
  rowSelected:HRM_Employee_Labour_Contract_Appendix_ENTITY = new HRM_Employee_Labour_Contract_Appendix_ENTITY();
  isEdit:boolean = false;
  is_close:boolean = false;
  is_update_target:boolean = false;
  listMonth:any[]=[
    {
      id:1,
      name:'Tháng 1'
    },
    {
      id:2,
      name:'Tháng 2'
    },
    {
      id:3,
      name:'Tháng 3'
    },
    {
      id:4,
      name:'Tháng 4'
    },
    {
      id:5,
      name:'Tháng 5'
    },
    {
      id:6,
      name:'Tháng 6'
    },
    {
      id:7,
      name:'Tháng 7'
    },
    {
      id:8,
      name:'Tháng 8'
    },
    {
      id:9,
      name:'Tháng 9'
    },
    {
      id:10,
      name:'Tháng 10'
    },
    {
      id:11,
      name:'Tháng 11'
    },
    {
      id:12,
      name:'Tháng 12'
    }
  ]
  listTarget:HRM_Employee_Labour_Contract_Appendix_ENTITY[]=[];
  listTypeTarget:any[]=[{code:'QUANTITY',name:'Số lượng'},{code:'PERCENT',name:'Phần trăm'}];
  col_model:any[] = [
    { label: 'Mã', name: 'code', key: true, width: 10 , hidden: true},
    { label: 'Doanh số', name: 'name', width: 15 },
    { label: 'Tháng', name: 'month', width: 7 },
    { label: 'Năm', name: 'year', width: 7 },
    { label: 'Chỉ tiêu trong tháng', name: 'taget_default_f', width: 15 },
    { label: 'Đã đạt được', name: 'salesed', width: 15 },
    { label: 'Tỉ lệ', name: 'ratio_f', width: 15 },
    { label: 'Tình trạng', name: 'html_close', width: 15,editable: true },
  ]
  col_model_Detail:any[] = [
    { label: 'Mã', name: 'code', key: true, width: 10 , hidden: true},
    { label: 'Tên khách hàng', name: 'customer_name', width: 10 ,editable: true},
    { label: 'Ngày bán (*)', name: 'sales_date', width: 10 ,editable: true,sorttype: 'date'},
    // { label: 'Khách hàng', name: 'customer_code', width: 25 ,editable: true, sorttype: 'select', editoptions: { value: [] }},
    { label: 'Tên người liên hệ', name: 'contact_name', width: 10 ,editable: true},
    { label: 'Số điện thoại', name: 'contact_phone', width: 10 ,editable: true},
    { label: 'Máy', name: 'machine_code', width: 35 ,editable: true, sorttype: 'select', editoptions: { value: [] }},
    { label: 'Tên máy', name: 'machine_name', width: 35 ,editable: true},
    { label: 'Số lượng (*)', name: 'sales', width: 10,editable: true,sorttype: 'int' },
    { label: 'Loại máy', name: 'machine_type', width: 10 ,editable: true, sorttype: 'select', editoptions: { value: [{code:'MAY',name:'Máy'},{code:'LK',name:'Linh kiện'}] }},
    { label: 'Đơn giá', name: 'machine_value', width: 10 ,editable: true, sorttype: 'money'},
    { label: 'SL Asia', name: 'asia', width: 10 ,editable: true,sorttype: 'int'},
    { label: 'Giá bán', name: 'machine_sale', width: 10 ,editable: true, sorttype: 'money'},
    { label: 'Giá nhập', name: 'machine_buy', width: 10 ,editable: true, sorttype: 'money'},
    { label: 'Lợi nhuận', name: 'profit', width: 10 ,editable: true, sorttype: 'money'},    
    { label: 'Ghi chú', name: 'notes', width: 10,editable: true },
  ]
  constructor(
    private injector: Injector,
    private employeeService: EmployeeService,
    private warrantyService:WarrantyService,
    private appSession: AppSession,
  ) {
    super(injector);
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
        this.is_update_target = false;
        if(this.is_close) {
          this.showMessageError('Sổ tháng này đã được đóng');
          return;
        }
        this.isEdit = true;
        this.InputModel = new HRM_Employee_Labour_Contract_Appendix_ENTITY();
        this.InputModel.month = this.filterInput.month;
        this.InputModel.year = this.filterInput.year;
        this.InputModel.employee_code = this.filterInput.employee_code;
        this.LoadDataComboboxWarrantyLaptop();
        setTimeout(() => {
          this.sidenavAddEdit.title = "Thêm mới màu sắc";
          this.sidenavAddEdit.open();
          this.toolbarEdit.setUiAction(this);
          setTimeout(() => {
            this.SelectUnitTargetPicker.setList(this.listTypeTarget);
          }, 500);
          this.UpdateView();
        }, 100);
        break;
      }
      case EditPageState.edit:{
        this.is_update_target = false;
        if(this.is_close) {
          this.showMessageError('Sổ tháng này đã được đóng');
          return;
        }
        //this.navigatePassParam('sales-edit',[['code',this.idSelect]],new HRM_Employee_Labour_Contract_Appendix_ENTITY({}),this.tbName)

        this.isEdit = true;
        this.employeeService.hRM_Employee_Labour_Contract_Appendix_Search({
          ...this.filterInput,
          code:this.idSelect,
          type:'MY_SALES',
          employee_code:this.filterInput.employee_code
        }as HRM_Employee_Labour_Contract_Appendix_ENTITY).subscribe((respond:HRM_Employee_Labour_Contract_Appendix_ENTITY[])=>{
          this.InputModel = respond[0] ;
          this.sidenavAddEdit.open();
          this.toolbarEdit.setUiAction(this);
          this.LoadDataComboboxWarrantyLaptop();
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
        this.navigatePassParam('/menu-edit', { code: this.idSelect }, { filterInput: JSON.stringify(this.InputMaster) });
        break;
      }
      case EditPageState.delete:{
        this.is_update_target = false;
        this.dialogDelete.open();
        
        break;
      }
      case EditPageState.save:{
        try{
          this.InputModel.hRM_Employee_Labour_Contract_Appendix_Target_Details = [];
          var Subs = this.gridDetailEdit.allData;
          if(Subs.length>0)
          {
            for(var i = 0 ; i < Subs.length ; i++)
            {
              var newrow = new  HRM_Employee_Labour_Contract_Appendix_Target_Detail_ENTITY();
              for (const [key, value] of Object.entries(Subs[i])) {
                newrow[key] = Subs[i][key];
              }
              newrow = HRM_Employee_Labour_Contract_Appendix_Target_Detail_ENTITY.fromJS(newrow);
              this.InputModel.hRM_Employee_Labour_Contract_Appendix_Target_Details.push(newrow);
            }
          }
        }catch{}
        if(!this.InputModel.code){
          this.InputModel.type = 'INSERT';
          this.employeeService.hRM_Employee_Labour_Contract_Appendix_Target_Update(this.InputModel).subscribe((respond)=>{
            if(respond['status'] == '0')
            {
              this.InputModel.code = respond['ref_code']
              this.showMessageSuccess(respond['message']);
              this.sidenavAddEdit.close();
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
          if(this.is_update_target)
          this.InputModel.type = 'UPDATE_TARGET';
          this.employeeService.hRM_Employee_Labour_Contract_Appendix_Target_Update(this.InputModel).subscribe((respond)=>{
            if(respond['status'] == '0')
            {
              this.showMessageSuccess(respond['message']);
              this.sidenavAddEdit.close();
              this.LoadData();
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
        this.is_update_target = false;
        break;
      }
      case EditPageState.search:{
        this.LoadData();
        break;
      }
      case EditPageState.viewDetail:{
        this.is_update_target = false;
        break;
      }
      case 'update_target':{
        this.is_update_target = true;
        this.isEdit = true;
        this.employeeService.hRM_Employee_Labour_Contract_Appendix_Search({
          ...this.filterInput,
          code:this.idSelect,
          type:'MY_SALES',
          employee_code:this.filterInput.employee_code
        }as HRM_Employee_Labour_Contract_Appendix_ENTITY).subscribe((respond:HRM_Employee_Labour_Contract_Appendix_ENTITY[])=>{
          this.InputModel = respond[0] ;
          this.sidenavAddEdit.open();
          this.toolbarEdit.setUiAction(this);
          setTimeout(() => {
            this.SelectUnitTargetPicker.setList(this.listTypeTarget);
          }, 500);
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
        this.UpdateView();
        break;
      }
      case 'close_book':{
        this.is_update_target = false;
        this.employeeService.hRM_Employee_Labour_Contract_Appendix_Target_Update({
          ... new HRM_Employee_Labour_Contract_Appendix_ENTITY(),
          type:'CLOSE_BOOK',
          employee_code:this.filterInput.employee_code,
          month:this.filterInput.month,
          year:this.filterInput.year,
          is_close:true
        } as HRM_Employee_Labour_Contract_Appendix_ENTITY).subscribe((respond)=>{
          if(respond['status'] == '0')
          {
            this.showMessageSuccess(respond['message']);
            this.LoadData();
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
      break;
    }
    case 'open_book':{
      this.is_update_target = false;
      this.employeeService.hRM_Employee_Labour_Contract_Appendix_Target_Update({
        ... new HRM_Employee_Labour_Contract_Appendix_ENTITY(),
        type:'CLOSE_BOOK',
        employee_code:this.filterInput.employee_code,
        month:this.filterInput.month,
        year:this.filterInput.year,
        is_close:false
      } as HRM_Employee_Labour_Contract_Appendix_ENTITY).subscribe((respond)=>{
        if(respond['status'] == '0')
        {
          this.showMessageSuccess(respond['message']);
          this.LoadData();
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
    this.initCombobox();
    this.filterInput.month = moment().month()+1;
    this.filterInput.year = moment().year();
  }
  LoadDataComboboxWarrantyLaptop(text:string = ''){
    var listCodes = [];
    if(this.InputModel.hRM_Employee_Labour_Contract_Appendix_Target_Details){
      this.InputModel.hRM_Employee_Labour_Contract_Appendix_Target_Details.forEach(element => {
        listCodes.push(element.machine_code);
      });
    }
    this.warrantyService.warranty_Laptop_Search({
      ...new Warranty_Laptop_ENTITY(),
      type:'AUTOCOMPLETE',
      code:listCodes.join(';'),
      name:text
    }as Warranty_Laptop_ENTITY).subscribe((res:Warranty_Laptop_ENTITY[])=>{
      this.col_model_Detail[5].editoptions.value = res;
      let data = this.InputModel.hRM_Employee_Labour_Contract_Appendix_Target_Details?this.InputModel.hRM_Employee_Labour_Contract_Appendix_Target_Details:[];
     setTimeout(() => {
      this.gridDetailEdit.setData(data);
     }, 500);
    })
  }
  autocompleteWarrantyLaptop(id:string = '',text:string = ''){
    var listCodes = [];
    if(this.InputModel.hRM_Employee_Labour_Contract_Appendix_Target_Details){
      this.InputModel.hRM_Employee_Labour_Contract_Appendix_Target_Details.forEach(element => {
        listCodes.push(element.machine_code);
      });
    }
    this.warrantyService.warranty_Laptop_Search({
      ...new Warranty_Laptop_ENTITY(),
      type:'AUTOCOMPLETE',
      code:listCodes.join(';'),
      name:text
    }as Warranty_Laptop_ENTITY).subscribe((res:Warranty_Laptop_ENTITY[])=>{
      this.gridDetailEdit.resetOpptionSelectpicker(id, '', false, res, false, text)
    })
  }
  SearchMachine(obj:any){
    debugger
    this.autocompleteWarrantyLaptop(obj.id,obj.text)
  }
  initCombobox(){
    this.employeeService.hRM_Employee_Search(new HRM_Employee_ENTITY()).subscribe((res:HRM_Employee_ENTITY[])=>{
      this.listEmployee = res;
      this.listEmployee.forEach(e=>{
        e['name'] = e.firstName + ' ' + e.lastName;
      })
      this.SelectEmployeePicker.setList(res);
      this.UpdateView();
    })

    setTimeout((e)=>{
      this.SelectEmployee_replacePicker.setList(this.listMonth);
    },200)
  }  
  onSelectFilter(v:any,col:string){ 
    if(col == 'year')this.filterInput[col] = v.year();
    else if(col == 'month')this.filterInput[col] = Number(v);
    else if(col == 'employee_code')this.filterInput[col] = v;
  }
  onSelect(v:any,col:string){
    this.InputModel[col] = v;
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
  confirmDelete() {
   
  }
  LoadData() {
    this.BlockUI();
    this.employeeService.hRM_Employee_Labour_Contract_Appendix_Search({
      ...this.filterInput,
      type:'MY_SALES',
      employee_code: this.filterInput.employee_code
    }as HRM_Employee_Labour_Contract_Appendix_ENTITY).subscribe(
      (data: HRM_Employee_Labour_Contract_Appendix_ENTITY[]) => {
        // this.gridTargetList.setData(data,this.col_model,this.tbName)
        this.listData = data;
        this.UpdateView();
        var labels=[],series=[];
        var sum_persent = 0;
        this.is_close = data[0].is_close;
        data.forEach(element => {
          sum_persent += element.ratio;
        });
        data[0].hRM_Employee_Labour_Contract_Appendix_Target_Details.forEach(element => {
          labels.push('\''+element.sales_date.date()+'');
          series.push(element.sales);
        });
        renderSalesBarsChart(labels,series);
        sum_persent = sum_persent/data.length;
        var i = 100 - sum_persent;
        if(i<0) i=0
        labels=['Còn lại '+i.toFixed(2)+'%','Đã đạt '+sum_persent.toFixed(2)+'%'];
        if(sum_persent > 100) sum_persent = 100;
        series=[ 100 - sum_persent,sum_persent];
        renderPieChartSales(labels,series);
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
