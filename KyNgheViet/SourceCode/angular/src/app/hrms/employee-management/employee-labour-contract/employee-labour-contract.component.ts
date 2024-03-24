import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { JqgridEditComponent } from 'src/app/shared/jqgrid/jqgrid-edit/jqgrid-edit.component';
import { JqgridListComponent } from 'src/app/shared/jqgrid/jqgrid-list/jqgrid-list.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { InputSelectComponentV2 } from 'src/app/shared/layout/input-control-simple/input-select-v2/input-select-v2.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { DepartmentService, Department_ENTITY, EmployeeService, HRM_BranchService, HRM_District_City_ENTITY, HRM_Employee_ENTITY, HRM_Employee_Labour_Contract_Appendix_ENTITY, HRM_Employee_Labour_Contract_Appendix_Target_Sale_Level_ENTITY, HRM_Employee_Labour_Contract_Curriculum_Vitae_ENTITY, HRM_Employee_Labour_Contract_ENTITY, HRM_Employee_Labour_Contract_Salary_Deduction_ENTITY, HRM_Employee_Labour_Contract_Salary_ENTITY, HRM_Employee_Labour_Contract_Type_ENTITY } from 'src/app/shared/service-proxies/api-shared';
import { AlertMessageComponent } from 'src/app/shared/sidenav/alert-message/alert-message.component';
import { SidenavAddEditComponent } from 'src/app/shared/sidenav/sidenav-add-edit/sidenav-add-edit.component';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-employee-labour-contract',
  templateUrl: './employee-labour-contract.component.html',
  styleUrls: ['./employee-labour-contract.component.css']
})
export class EmployeeLabourContractComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    private injector: Injector,
    private appSession: AppSession,
    private employeeService:EmployeeService,
    private departmentService:DepartmentService,
    private hRM_BranchService:HRM_BranchService
  ) {
    super(injector);
  }
  filterInput:HRM_Employee_Labour_Contract_ENTITY = new HRM_Employee_Labour_Contract_ENTITY();
  InputModel: HRM_Employee_Labour_Contract_ENTITY = new HRM_Employee_Labour_Contract_ENTITY();
  @ViewChild('gridList') gridList: JqgridListComponent;
  @ViewChild('gridSalaryEdit') gridSalaryEdit: JqgridEditComponent<HRM_Employee_Labour_Contract_Salary_ENTITY>;
  @ViewChild('gridAppendixEdit') gridAppendixEdit: JqgridEditComponent<HRM_Employee_Labour_Contract_Appendix_ENTITY>;
  @ViewChild('gridSalaryDeductionEdit') gridSalaryDeductionEdit: JqgridEditComponent<HRM_Employee_Labour_Contract_Salary_Deduction_ENTITY>;
  @ViewChild('gridCurriculumVitaeEdit') gridCurriculumVitaeEdit: JqgridEditComponent<HRM_Employee_Labour_Contract_Curriculum_Vitae_ENTITY>;
  @ViewChild('gridTargetSaleLevelEdit') gridTargetSaleLevelEdit: JqgridEditComponent<HRM_Employee_Labour_Contract_Appendix_Target_Sale_Level_ENTITY>;
  @ViewChild('dialogDelete') dialogDelete: DialogAcctionComponent;
  @ViewChild('dialogAddDepartment') dialogAddDepartment: DialogAcctionComponent;
  @ViewChild('dialogAddPosition') dialogAddPosition: DialogAcctionComponent;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  @ViewChild('toolbarEdit') toolbarEdit: ToolbarComponent;
  @ViewChild('sidenavAddEdit') sidenavAddEdit: SidenavAddEditComponent;
  @ViewChild('alertMessage') alertMessage: AlertMessageComponent;
  @ViewChild('SelectTypeContractPicker') SelectTypeContractPicker: InputSelectComponentV2;
  @ViewChild('SelectEmployeePicker') SelectEmployeePicker: InputSelectComponentV2;
  @ViewChild('SelectDepartmentPicker') SelectDepartmentPicker: InputSelectComponentV2;
  isEdit:boolean = false; 
  isEditLV:boolean = false;
  tbName: string = 'HRM_Employee_Labour_Contract';
  tbName_sub: string = 'HRM_Employee_Labour_Contract_Appendix';
  CurrenFrom:string = EditPageState.view;
  listContractType:HRM_Employee_Labour_Contract_Type_ENTITY[]=[];
  listEmployee:HRM_Employee_ENTITY[] = [];
  listDistrictAll:HRM_District_City_ENTITY[] = [];
  listDistrictSub:HRM_District_City_ENTITY[] = [];
  listDistrict:HRM_District_City_ENTITY[] = [];
  listCity:HRM_District_City_ENTITY[] = [];
  listDepartments:Department_ENTITY[] = [];
  contractAppendixSelected:HRM_Employee_Labour_Contract_Appendix_ENTITY = new HRM_Employee_Labour_Contract_Appendix_ENTITY();
  col_model:any[] = [
    { label: 'Mã', name: 'code', key: true, width: 10 , hidden: true},
    { label: 'Số hợp đồng', name: 'contract_code', width: 10 },
    { label: 'Mã nhân Viên', name: 'employee_id', width: 10 },
    { label: 'Tên nhân viên', name: 'employee_name', width: 25 },
    { label: 'Phòng ban', name: 'department_name', width: 10 },
  ]
  col_model_labour_edit:any[] = [
    { label: 'Mã', name: 'code', key: true, width: 10 , hidden: true},
    { label: 'Lương/Phụ cấp', name: 'name', width: 15 ,editable: true, sorttype: 'text'},
    { label: 'Số tiền', name: 'salary', width: 8 ,editable: true, sorttype: 'money'},
    { label: 'Tỷ giá', name: 'unit', width: 4 ,editable: true, sorttype: "select", editoptions: { value: [{code:'VND',name:'VNĐ'},{code:'USD',name:'USD'},{code:'EURO',name:'EURO'}] }},
  ]
  col_model_appendix_edit:any[] = [
    { label: 'Mã', name: 'code', key: true, width: 10 , hidden: true},
    { label: 'Lương/Phụ cấp theo doanh số', name: 'name', width: 8 ,editable: true, sorttype: 'text'},
    { label: 'Loại phụ cấp', name: 'appendix_type', width: 8 ,editable: true, sorttype: 'select',editoptions: { value: [{code:'MONTH_FIXED',name:'Cố định/Tháng'},{code:'BY_WORKDAY',name:'Theo từng ngày công thực tế'},{code:'BY_SALE',name:'Theo doanh số'}] }},
    { label: 'Chỉ tiêu thấp nhất phải đạt', name: 'taget_default', width: 8 ,editable: true, sorttype: 'int'},
    { label: 'Đơn vị vượt chỉ tiêu', name: 'taget', width: 8 ,editable: true, sorttype: 'int'},
    { label: 'Đơn vị tính', name: 'taget_unit', width: 8 ,editable: true, sorttype: "select", editoptions: { value: [{code:'PERCENT',name:'Phần trăm'},{code:'QUANTITY',name:'Số lượng'}] }},
    { label: 'Số tiền', name: 'salary', width: 8 ,editable: true, sorttype: 'money'},
    { label: 'Tỷ giá', name: 'unit', width: 4 ,editable: true, sorttype: "select", editoptions: { value: [{code:'VND',name:'VNĐ'},{code:'USD',name:'USD'},{code:'EURO',name:'EURO'}] }},
  ]
  col_model_curriculum_vitae_edit:any[] = [
    { label: 'Mã', name: 'code', key: true, width: 10 , hidden: true},
    { label: 'Họ và tên', name: 'fullname', width: 12 ,editable: true, sorttype: 'text'},
    { label: 'Quan hệ', name: 'relationship', width: 8 ,editable: true, sorttype: 'text'},
    { label: 'Số giấy khai sinh', name: 'birth_certificate_number', width: 8 ,editable: true, sorttype: 'text'},
    { label: 'Ngày sinh', name: 'birthday', width: 8 ,editable: true, sorttype: 'date'},
    { label: 'Nơi sinh', name: 'birthplace_detail', width: 15 ,editable: true, sorttype: 'text'},
    { label: 'Thành phố', name: 'birthplace_city', width: 10 ,editable: true, sorttype: "select", editoptions: { value: [] ,fieldvalue:'city_id',fielddisplay:'city'}},
    { label: 'Quận/ Huyện', name: 'birthplace_district', width: 10 ,editable: true, sorttype: "select", editoptions: { value: [] ,fieldvalue:'district_id',fielddisplay:'district'}},
    { label: 'Phường/ Xã', name: 'birthplace_district_sub', width: 10 ,editable: true, sorttype: "select", editoptions: { value: [] ,fieldvalue:'sub_district_id',fielddisplay:'sub_district'}},
    { label: 'CNND/CCCD', name: 'id_card', width: 10 ,editable: true, sorttype: 'text'},
    { label: 'Mã số thuế', name: 'tax', width: 8 ,editable: true, sorttype: 'text'},
    { label: 'Điện thoại', name: 'phone', width: 8 ,editable: true, sorttype: 'text'},
    { label: 'Đăng ký người phụ thuộc từ ngày', name: 'registering_dependents_from', width: 10 ,editable: true, sorttype: 'date'},
    { label: 'Đến ngày ngày', name: 'registering_dependents_end', width: 10 ,editable: true, sorttype: 'date'},
  ]
  col_model_salary_deduction_edit:any[] = [
    { label: 'Mã', name: 'code', key: true, width: 10 , hidden: true},
    { label: 'Khoản trừ', name: 'name', width: 8 ,editable: true, sorttype: 'text'},
    { label: 'Trừ trên mức lương (*)', name: 'contract_salary_code', width: 8 ,editable: true, sorttype: 'select', editoptions: { value: [] }},
    { label: 'Tỉ lệ/số tiền', name: 'salary_deduction', width: 8 ,editable: true, sorttype: 'int'},
    { label: 'Đơn vị tính', name: 'salary_deduction_unit', width: 8 ,editable: true, sorttype: "select", editoptions: { value: [{code:'PERCENT',name:'Phần trăm'},{code:'MONEY',name:'Tiền mặt'}] }},
    { label: 'Đơn vị tiền', name: 'unit', width: 4 ,editable: true, sorttype: "select", editoptions: { value: [{code:'VND',name:'VNĐ'},{code:'USD',name:'USD'},{code:'EURO',name:'EURO'}] }},
  ] 
  col_model_appendix_sale_level_edit:any[] = [
    { label: 'Mã', name: 'code', key: true, width: 10 , hidden: true},
    { label: 'Doanh số máy từ *', name: 'target_min', width: 8 ,editable: true, sorttype: 'int',editrules:{required:true}},
    { label: 'Doanh số máy đến *', name: 'target_max', width: 8 ,editable: true, sorttype: 'int',editrules:{required:true}}, 
    { label: 'Số tiền thưởng', name: 'target_money', width: 8 ,editable: true, sorttype: 'money'},
    { label: 'Tỉ lệ trích lại (%)', name: 'percent_for_orther', width: 8 ,editable: true, sorttype: 'int'}, 
    { label: 'Phòng ban hưởng tỉ lệ trích', name: 'list_department_code', width: 30 ,editable: true, sorttype: "multiselect", editoptions: { value: [] }},
    { label: 'Nhân viên hưởng tỉ lệ trích', name: 'list_employee_code', width: 30 ,editable: true, sorttype: "multiselect", editoptions: { value: [] }},
    { label: 'Nhân viên không hưởng tỉ lệ trích', name: 'list_not_allow_employee_code', width: 30 ,editable: true, sorttype: "multiselect", editoptions: { value: [] }},
  ]
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
        this.isEdit = true;
        this.isEditLV = false;
        this.InputModel = new HRM_Employee_Labour_Contract_ENTITY();
        this.InputModel.employee_code = this.appSession.user.code;
        setTimeout(() => {
          this.sidenavAddEdit.title = "Thêm mới hợp đồng";
          this.sidenavAddEdit.open();
          this.toolbarEdit.setUiAction(this);
          this.gridSalaryEdit.setData([])
          this.gridAppendixEdit.setData([])  
          this.gridSalaryDeductionEdit.setData([])
          this.gridCurriculumVitaeEdit.setData([])
          this.SelectTypeContractPicker.setList(this.listContractType);
          this.SelectEmployeePicker.setList(this.listEmployee);
          this.initCombobox();
          this.UpdateView();
        }, 100);
        break;
      }
      case EditPageState.edit:{
        this.InputModel = new HRM_Employee_Labour_Contract_ENTITY();
        this.InputModel.id = this.appSession.user.id;
        this.isEdit = true;
        this.isEditLV = false;
        this.InputModel.code =  this.idSelect;
        this.InputModel.id =  this.appSession.user.id;
        this.InputModel.form = EditPageState.edit;
        this.employeeService.hRM_Employee_Labour_Contract_Search(this.InputModel).subscribe((respond)=>{
          this.InputModel = respond[0];
          this.sidenavAddEdit.title = "Chỉnh sửa hợp đồng";
          this.sidenavAddEdit.open();
          this.toolbarEdit.setUiAction(this);
          setTimeout(() => {
            this.gridSalaryEdit.setData(this.InputModel.hRM_Employee_Labour_Contract_Salarys?this.InputModel.hRM_Employee_Labour_Contract_Salarys:[])
            this.col_model_salary_deduction_edit[2].editoptions.value = this.InputModel.hRM_Employee_Labour_Contract_Salarys?this.InputModel.hRM_Employee_Labour_Contract_Salarys:[];
            this.gridAppendixEdit.setData(this.InputModel.hRM_Employee_Labour_Contract_Appendixs?this.InputModel.hRM_Employee_Labour_Contract_Appendixs:[])
            this.gridSalaryDeductionEdit.setData(this.InputModel.hRM_Employee_Labour_Contract_Salary_Deductions?this.InputModel.hRM_Employee_Labour_Contract_Salary_Deductions:[])
            this.gridCurriculumVitaeEdit.setData(this.InputModel.hRM_Employee_Labour_Contract_Curriculum_Vitaes?this.InputModel.hRM_Employee_Labour_Contract_Curriculum_Vitaes:[])
            this.SelectEmployeePicker.setList(this.listEmployee);
            this.SelectTypeContractPicker.setList(this.listContractType);
            this.UpdateView();
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
        // this.navigatePassParam('/menu-edit', { code: this.idSelect }, { filterInput: JSON.stringify(this.InputMaster) });
        break;
      }
      case EditPageState.delete:{
        this.InputModel.id = this.appSession.user.id;
        this.dialogDelete.open();
        break;
      }
      case EditPageState.save:{
        if(!this.InputModel.employee_code){
          this.alertMessage.AlertError('"Nhân Viên" không được phép trống');
          return;
        }else if(!this.InputModel.contract_code){
          this.alertMessage.AlertError('"Số hợp đồng" không được phép trống');
          return;
        }
        try{
          this.InputModel.hRM_Employee_Labour_Contract_Salarys = [];
          var Subs = this.gridSalaryEdit.allData;
          if(Subs.length>0)
          {
            for(var i = 0 ; i < Subs.length ; i++)
            {
              var newrow = new  HRM_Employee_Labour_Contract_Salary_ENTITY();
              for (const [key, value] of Object.entries(Subs[i])) {
                newrow[key] = Subs[i][key];
              }
              newrow = HRM_Employee_Labour_Contract_Salary_ENTITY.fromJS(newrow);
              this.InputModel.hRM_Employee_Labour_Contract_Salarys.push(newrow);
            }
          }
        }catch{}
        try{
          this.InputModel.hRM_Employee_Labour_Contract_Appendixs = [];
          var Subs2 = this.gridAppendixEdit.allData;
          if(Subs2.length>0)
          {
            for(var i = 0 ; i < Subs2.length ; i++)
            {
              var newrow2 = new  HRM_Employee_Labour_Contract_Appendix_ENTITY();
              for (const [key, value] of Object.entries(Subs2[i])) {
                newrow2[key] = Subs2[i][key];
              }
              newrow2 = HRM_Employee_Labour_Contract_Appendix_ENTITY.fromJS(newrow2);
              this.InputModel.hRM_Employee_Labour_Contract_Appendixs.push(newrow2);
            }
          }
        }catch{}
        try{
          this.InputModel.hRM_Employee_Labour_Contract_Curriculum_Vitaes = [];
          var Subs3 = this.gridCurriculumVitaeEdit.allData;
          if(Subs3.length>0)
          {
            for(var i = 0 ; i < Subs3.length ; i++)
            {
              var newrow3 = new  HRM_Employee_Labour_Contract_Curriculum_Vitae_ENTITY();
              for (const [key, value] of Object.entries(Subs3[i])) {
                newrow3[key] = Subs3[i][key];
              }
              newrow3 = HRM_Employee_Labour_Contract_Curriculum_Vitae_ENTITY.fromJS(newrow3);
              this.InputModel.hRM_Employee_Labour_Contract_Curriculum_Vitaes.push(newrow3);
            }
          }
        }catch{}
        try{
          this.InputModel.hRM_Employee_Labour_Contract_Salary_Deductions = [];
          var Subs4 = this.gridSalaryDeductionEdit.allData;
          if(Subs4.length>0)
          {
            for(var i = 0 ; i < Subs4.length ; i++)
            {
              var newrow4 = new  HRM_Employee_Labour_Contract_Salary_Deduction_ENTITY();
              for (const [key, value] of Object.entries(Subs4[i])) {
                newrow4[key] = Subs4[i][key];
              }
              newrow4 = HRM_Employee_Labour_Contract_Salary_Deduction_ENTITY.fromJS(newrow4);
              this.InputModel.hRM_Employee_Labour_Contract_Salary_Deductions.push(newrow4);
            }
          }
        }catch{}
        if(!this.InputModel.code){
          this.InputModel.id =  this.appSession.user.id;
          this.employeeService.hRM_Employee_Labour_Contract_Insert(this.InputModel).subscribe((respond)=>{
            if(respond.status == 0)
            {
              this.alertMessage.AlertSuccess(respond['message']);
              this.InputModel.code = respond['ref_code'];
              this.gridSalaryEdit.setData(respond.hRM_Employee_Labour_Contract_Salarys?respond.hRM_Employee_Labour_Contract_Salarys:[])
              this.col_model_salary_deduction_edit[2].editoptions.value = respond.hRM_Employee_Labour_Contract_Salarys?respond.hRM_Employee_Labour_Contract_Salarys:[];
              this.col_model_salary_deduction_edit[2].editoptions.value = respond.hRM_Employee_Labour_Contract_Salarys?respond.hRM_Employee_Labour_Contract_Salarys:[];
              this.gridAppendixEdit.setData(respond.hRM_Employee_Labour_Contract_Appendixs?respond.hRM_Employee_Labour_Contract_Appendixs:[])
              this.gridSalaryDeductionEdit.setData(respond.hRM_Employee_Labour_Contract_Salary_Deductions?respond.hRM_Employee_Labour_Contract_Salary_Deductions:[])
              this.gridCurriculumVitaeEdit.setData(respond.hRM_Employee_Labour_Contract_Curriculum_Vitaes?respond.hRM_Employee_Labour_Contract_Curriculum_Vitaes:[])
            }else
              this.alertMessage.AlertError(respond['message']);
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
          this.InputModel.id =  this.appSession.user.id;
          this.employeeService.hRM_Employee_Labour_Contract_Update(this.InputModel).subscribe((respond)=>{
            if(respond.status == 0)
            {
              this.alertMessage.AlertSuccess(respond['message']);
              this.gridSalaryEdit.setData(respond.hRM_Employee_Labour_Contract_Salarys?respond.hRM_Employee_Labour_Contract_Salarys:[])
              this.gridAppendixEdit.setData(respond.hRM_Employee_Labour_Contract_Appendixs?respond.hRM_Employee_Labour_Contract_Appendixs:[])
              this.gridSalaryDeductionEdit.setData(respond.hRM_Employee_Labour_Contract_Salary_Deductions?respond.hRM_Employee_Labour_Contract_Salary_Deductions:[])
              this.gridCurriculumVitaeEdit.setData(respond.hRM_Employee_Labour_Contract_Curriculum_Vitaes?respond.hRM_Employee_Labour_Contract_Curriculum_Vitaes:[])
              this.col_model_salary_deduction_edit[2].editoptions.value = respond.hRM_Employee_Labour_Contract_Salarys?respond.hRM_Employee_Labour_Contract_Salarys:[];
            }else
              this.alertMessage.AlertError(respond['message']);
            
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
        this.LoadData();
        break;
      }
      case EditPageState.viewDetail:{
        this.InputModel = new HRM_Employee_Labour_Contract_ENTITY();
        this.InputModel.id = this.appSession.user.id;
        this.isEdit = true;
        this.isEditLV = false;
        this.InputModel.code =  this.idSelect;
        this.InputModel.id =  this.appSession.user.id;
        this.InputModel.form = EditPageState.viewDetail;
        this.employeeService.hRM_Employee_Labour_Contract_Search(this.InputModel).subscribe((respond)=>{
          this.InputModel = respond[0];
          this.sidenavAddEdit.open();
          this.toolbarEdit.setUiAction(this);
          this.initCombobox();
          setTimeout(() => {
            this.gridSalaryEdit.setData(this.InputModel.hRM_Employee_Labour_Contract_Salarys?this.InputModel.hRM_Employee_Labour_Contract_Salarys:[])
            this.col_model_salary_deduction_edit[2].editoptions.value = this.InputModel.hRM_Employee_Labour_Contract_Salarys?this.InputModel.hRM_Employee_Labour_Contract_Salarys:[];
            this.gridAppendixEdit.setData(this.InputModel.hRM_Employee_Labour_Contract_Appendixs?this.InputModel.hRM_Employee_Labour_Contract_Appendixs:[])
            this.gridSalaryDeductionEdit.setData(this.InputModel.hRM_Employee_Labour_Contract_Salary_Deductions?this.InputModel.hRM_Employee_Labour_Contract_Salary_Deductions:[])
            this.gridCurriculumVitaeEdit.setData(this.InputModel.hRM_Employee_Labour_Contract_Curriculum_Vitaes?this.InputModel.hRM_Employee_Labour_Contract_Curriculum_Vitaes:[])
            this.SelectEmployeePicker.setList(this.listEmployee);
            this.SelectTypeContractPicker.setList(this.listContractType);
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
        break;
      }
      case 'SaleLevel':{
        this.isEdit = true;
        this.isEditLV = true;

        this.InputModel = new HRM_Employee_Labour_Contract_ENTITY();
        this.InputModel.id = this.appSession.user.id;
        this.InputModel.code =  this.idSelect;
        this.InputModel.id =  this.appSession.user.id;
        this.InputModel.form = 'SaleLevel';
        this.employeeService.hRM_Employee_Labour_Contract_Search(this.InputModel).subscribe((respond)=>{
          this.InputModel = respond[0];
          this.toolbarEdit.setUiAction(this);
          if(!this.InputModel.hRM_Employee_Labour_Contract_Appendixs || this.InputModel.hRM_Employee_Labour_Contract_Appendixs.length == 0){
            this.showMessageError('Hợp đồng chưa có phụ lục tính theo doanh số bán hàng');
            this.setCurrenFrom(EditPageState.view);
            this.findAndSetAcctionForm();
            this.UpdateView();
          }else{
            setTimeout(() => {
              this.sidenavAddEdit.title = 'Chỉnh sửa phụ lục doanh số bán hàng';
              this.sidenavAddEdit.open();
              this.gridSalaryEdit.setData([]);
              this.gridAppendixEdit.setData([]);  
              this.gridSalaryDeductionEdit.setData([]);
              this.gridCurriculumVitaeEdit.setData([]);
              this.contractAppendixSelected = this.InputModel.hRM_Employee_Labour_Contract_Appendixs[0];
              this.gridTargetSaleLevelEdit.setData(this.InputModel.hrM_Employee_Labour_Contract_Appendix_Target_Sale_Levels.filter(e=>e.target_code == this.contractAppendixSelected.code))
              this.SelectEmployeePicker.setList(this.listEmployee);
              this.SelectTypeContractPicker.setList(this.listContractType);
            }, 500);
          }
          
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
      case 'SaveSaleLevel':{
        this.BlockUI();
        let T:HRM_Employee_Labour_Contract_Appendix_Target_Sale_Level_ENTITY[] = [];
        try{
          var allData = this.gridTargetSaleLevelEdit.allData;
          if(allData.length>0)
          {
            for(var i = 0 ; i < allData.length ; i++)
            {
              var _newrow = new  HRM_Employee_Labour_Contract_Appendix_Target_Sale_Level_ENTITY();
              for (const [key, value] of Object.entries(allData[i])) {
                _newrow[key] = allData[i][key];
              } 
              _newrow['target_code'] = this.contractAppendixSelected.code;
              _newrow['contract_code'] = this.contractAppendixSelected.contract_code;
              _newrow = HRM_Employee_Labour_Contract_Appendix_Target_Sale_Level_ENTITY.fromJS(_newrow);
              T.push(_newrow);
            }
          }
        }catch{}
        let ArrT:HRM_Employee_Labour_Contract_Appendix_Target_Sale_Level_ENTITY[] =
        [...T,...this.InputModel.hrM_Employee_Labour_Contract_Appendix_Target_Sale_Levels.filter(e=>e.target_code != this.contractAppendixSelected.code && e.target_code)]
        
        this.InputModel.hrM_Employee_Labour_Contract_Appendix_Target_Sale_Levels = ArrT;
        this.filterInput.code = null;
        this.InputModel.hRM_Employee_Labour_Contract_Curriculum_Vitaes = [];
        this.InputModel.hRM_Employee_Labour_Contract_Salary_Deductions = [];
        this.InputModel.hRM_Employee_Labour_Contract_Salarys = [];
        this.InputModel.month = 0;
        this.InputModel.year = 0;
        this.employeeService.hRM_Employee_Labour_Contract_Appendix_Target_Sale_Level_Update(this.InputModel).subscribe(
          (data: any) => {
            if(data['status'] == 0){
              this.sidenavAddEdit.close();
              this.showMessageSuccess(data['message']);
            }
            else{
              this.showMessageError(data['message']);
            }
            this.UpdateView();
            this.UnBlockUI();
          },
          (err) => this.UnBlockUI(),
          () => {
            this.UnBlockUI();
          }
        )
        break;
      }
      default:break;
    }
  }
  onClickSaleLevel(item:HRM_Employee_Labour_Contract_Appendix_ENTITY){
    this.BlockUI();
    let T:HRM_Employee_Labour_Contract_Appendix_Target_Sale_Level_ENTITY[] = [];
    try{
      var Subs = this.gridTargetSaleLevelEdit.allData;
      if(Subs.length>0)
      {
        for(var i = 0 ; i < Subs.length ; i++)
        {
          var newrow = new  HRM_Employee_Labour_Contract_Appendix_Target_Sale_Level_ENTITY();
          for (const [key, value] of Object.entries(Subs[i])) {
            newrow[key] = Subs[i][key];
          } 
          newrow['target_code'] = this.contractAppendixSelected.code;
          newrow['contract_code'] = this.contractAppendixSelected.contract_code;
          newrow = HRM_Employee_Labour_Contract_Appendix_Target_Sale_Level_ENTITY.fromJS(newrow);
          T.push(newrow);
        }
      }
    }catch{}
    let ArrT:HRM_Employee_Labour_Contract_Appendix_Target_Sale_Level_ENTITY[] =
     [...T,...this.InputModel.hrM_Employee_Labour_Contract_Appendix_Target_Sale_Levels.filter(e=>e.target_code != this.contractAppendixSelected.code && e.target_code)]
     
    this.InputModel.hrM_Employee_Labour_Contract_Appendix_Target_Sale_Levels = ArrT;
     
    this.contractAppendixSelected = item;
    var result = this.InputModel.hrM_Employee_Labour_Contract_Appendix_Target_Sale_Levels.filter(e=>e.target_code == item.code)
    this.gridTargetSaleLevelEdit.setData(result?result:[]);
    setTimeout(() => {
      this.UnBlockUI();
    }, 500);
    this.UpdateView();
  }
  getDataByID(storedName: string, param: string, keyService: string): void {
    throw new Error('Method not implemented.');
  }
  initCombobox(){
    this.employeeService.hRM_Employee_Labour_Contract_Type_Search(new HRM_Employee_Labour_Contract_Type_ENTITY()).subscribe((responds)=>{
      this.listContractType = responds;
    })
    let p = new HRM_Employee_ENTITY();
    this.listEmployee = [];
    this.employeeService.hRM_Employee_Search(p).subscribe(
      (data: any) => {
        if(data)
        {
          data.forEach(e=>{
            e.id = e.id;
            e['name'] = e.firstName + ' ' +e.lastName; 
            this.listEmployee.push(e);
          })
          this.col_model_appendix_sale_level_edit[6].editoptions.value = data;
          this.col_model_appendix_sale_level_edit[7].editoptions.value = data;
        }
        this.UpdateView();
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
    this.employeeService.hRM_District_City_Search(new HRM_District_City_ENTITY()).subscribe((respond:HRM_District_City_ENTITY[])=>{
      this.listDistrictAll = respond;
      try{
        respond.forEach((item) => {
           if(this.listDistrict.filter(e=>e.district_id == item.district_id).length==0)this.listDistrict.push(item);
           if(this.listCity.filter(e=>e.city_id == item.city_id).length==0)this.listCity.push(item);
        });
        this.col_model_curriculum_vitae_edit.forEach(ag=>{
          if(ag.name == 'birthplace_city'){
            ag.editoptions.value=this.listCity;
          }else if(ag.name == 'birthplace_district'){
            ag.editoptions.value=this.listDistrict;
          }else if(ag.name == 'birthplace_district_sub'){
            ag.editoptions.value=this.listDistrictAll;
          }
        })
      }catch{
      }
      this.UnBlockUI();
    })
    this.departmentService.department_Search(new Department_ENTITY()).subscribe(data=>{
      this.listDepartments = data;
      this.col_model_appendix_sale_level_edit[5].editoptions.value = this.listDepartments;
    })
  }
  confirmDelete() {
    this.BlockUI();
    this.employeeService.hRM_Employee_Labour_Contract_Delete(this.idSelect,this.appSession.user.code).subscribe(
      (respond: any) => {
        if(respond['status'] == '0'){
          this.showMessageSuccess(respond['message'])
          this.LoadData();
          this.onSearch();
        }else
        {
          this.showMessageError(respond['message'])
        }        
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      })
    this.UpdateView();
  }
  LoadData() {
    this.BlockUI();
    this.filterInput.code = null;
    this.employeeService.hRM_Employee_Labour_Contract_Search(this.filterInput).subscribe(
      (data: any) => {
        this.gridList.setData(data,this.col_model,this.tbName)
        this.UpdateView();
        this.UnBlockUI();
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
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
  valueStartDate(v:any,col:string){
    this.InputModel[col] = v;
  }
  ngOnInit(): void {
    this.setAcction();
    this.initCombobox();
    this.LoadData();
  }
  onSelect(v:any,col:string)
  {
    this.InputModel[col] = v;
  }
}
