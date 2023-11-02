import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { JqgridEditComponent } from 'src/app/shared/jqgrid/jqgrid-edit/jqgrid-edit.component';
import { JqgridListComponent } from 'src/app/shared/jqgrid/jqgrid-list/jqgrid-list.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { InputSelectComponentV2 } from 'src/app/shared/layout/input-control-simple/input-select-v2/input-select-v2.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { DepartmentService, EmployeeService, HRM_BranchService, HRM_Employee_Bonus_ENTITY, HRM_Employee_Discipline_ENTITY, HRM_Employee_ENTITY, HRM_Employee_Evaluate_ENTITY, HRM_Employee_Occupational_Accident_ENTITY, HRM_Employee_Training_ENTITY } from 'src/app/shared/service-proxies/api-shared';
import { AlertMessageComponent } from 'src/app/shared/sidenav/alert-message/alert-message.component';
import { SidenavAddEditComponent } from 'src/app/shared/sidenav/sidenav-add-edit/sidenav-add-edit.component';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-employee-work-procedure',
  templateUrl: './employee-work-procedure.component.html',
  styleUrls: ['./employee-work-procedure.component.css']
})
export class EmployeeWorkProcedureComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    private injector: Injector,
    private appSession: AppSession,
    private employeeService:EmployeeService,
    private departmentService:DepartmentService,
    private hRM_BranchService:HRM_BranchService
  ) {
    super(injector);
  }
  filterInput:HRM_Employee_ENTITY = new HRM_Employee_ENTITY();
  InputModel: HRM_Employee_ENTITY = new HRM_Employee_ENTITY();
  InputMaster: HRM_Employee_ENTITY[] = [];
  @ViewChild('gridList') gridList: JqgridListComponent;
  @ViewChild('gridBonusEdit') gridBonusEdit: JqgridEditComponent<HRM_Employee_Bonus_ENTITY>;
  @ViewChild('gridDisciplineEdit') gridDisciplineEdit: JqgridEditComponent<HRM_Employee_Discipline_ENTITY>;
  @ViewChild('gridTrainingEdit') gridTrainingEdit: JqgridEditComponent<HRM_Employee_Training_ENTITY>;
  @ViewChild('gridEvaluateEdit') gridEvaluateEdit: JqgridEditComponent<HRM_Employee_Evaluate_ENTITY>;
  @ViewChild('gridOccupationalAccidentEdit') gridOccupationalAccidentEdit: JqgridEditComponent<HRM_Employee_Occupational_Accident_ENTITY>;
  @ViewChild('dialogDelete') dialogDelete: DialogAcctionComponent;
  @ViewChild('dialogAddDepartment') dialogAddDepartment: DialogAcctionComponent;
  @ViewChild('dialogAddPosition') dialogAddPosition: DialogAcctionComponent;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  @ViewChild('toolbarEdit') toolbarEdit: ToolbarComponent;
  @ViewChild('sidenavAddEdit') sidenavAddEdit: SidenavAddEditComponent;
  @ViewChild('alertMessage') alertMessage: AlertMessageComponent;
  @ViewChild('SelectTypeContractPicker') SelectTypeContractPicker: InputSelectComponentV2;
  @ViewChild('SelectEmployeePicker') SelectEmployeePicker: InputSelectComponentV2;
  isEdit:boolean = false;
  tbName: string = 'HRM_Employee_Work_Procedure';
  tbName_sub: string = 'HRM_Employee_Bonus';
  CurrenFrom:string = EditPageState.view;
  col_model:any[] = [
    { label: 'Mã', name: 'code', key: true, width: 10 , hidden: true},
    { label: 'Ảnh', name: 'avarta_html', width: 8 },
    { label: 'Mã nhân viên', name: 'employee_code', width: 10 },
    { label: 'Tên nhân viên', name: 'firstName', width: 10 },
    { label: 'Họ và tên đệm', name: 'lastName', width: 10 },
    // { label: 'email', name: 'email', width: 20 },
    { label: 'Ngày sinh', name: 'birthday_f', width: 10 },
    { label: 'Giới tính', name: 'sex_name', width: 10 },
    { label: 'Phòng ban', name: 'department_name', width: 10 },
    { label: 'Chức vụ', name: 'position_name', width: 10 },
    { label: 'Chức danh', name: 'title_name', width: 10 }
  ]
  col_model_bonus_edit:any[] = [
    { label: 'Mã', name: 'code', key: true, width: 10 , hidden: true},
    { label: 'Số quyết định khen thưởng', name: 'bobus_code', width: 8 ,editable: true, sorttype: 'text'},
    { label: 'Ngày khen thưởng', name: 'bobus_date', width: 15 ,editable: true, sorttype: 'date'},
    { label: 'Xếp loại', name: 'type', width: 15 ,editable: true, sorttype: 'text'},
    { label: 'Số tiền thưởng', name: 'value', width: 15 ,editable: true, sorttype: 'money'},
  ]
  col_model_discipline_edit:any[] = [
    { label: 'Mã', name: 'code', key: true, width: 10 , hidden: true},
    { label: 'Số quyết định phạt', name: 'discipline_code', width: 8 ,editable: true, sorttype: 'text'},
    { label: 'Ngày phạt', name: 'discipline_date', width: 15 ,editable: true, sorttype: 'date'},
    { label: 'Lý do', name: 'reason', width: 15 ,editable: true, sorttype: 'text'},
    { label: 'Xếp loại', name: 'type', width: 15 ,editable: true, sorttype: 'text'},
    { label: 'Số tiền phạt', name: 'value', width: 15 ,editable: true, sorttype: 'money'},
  ]
  col_model_training_edit:any[] = [
    { label: 'Mã', name: 'code', key: true, width: 10 , hidden: true},
    { label: 'Số HĐ khóa học', name: 'training_contract_code', width: 15 ,editable: true, sorttype: 'text'},
    { label: 'Ngày đào tạo', name: 'training_date', width: 15 ,editable: true, sorttype: 'date'},
    { label: 'Tên khóa học', name: 'name', width: 15 ,editable: true, sorttype: 'text'},
    { label: 'Học phí', name: 'tuition', width: 15 ,editable: true, sorttype: 'money'},
    { label: 'Đơn vị đào tạo', name: 'training_from', width: 15 ,editable: true, sorttype: 'text'},
    { label: 'Loại hình đào tạo', name: 'type', width: 15 ,editable: true, sorttype: 'text'},
    { label: 'Hình thức', name: 'form', width: 15 ,editable: true, sorttype: 'text'},
  ]
  col_model_evaluate_edit:any[] = [
    { label: 'Mã', name: 'code', key: true, width: 10 , hidden: true},
    { label: 'Ngày đánh giá', name: 'evaluate_date', width: 15 ,editable: true, sorttype: 'date'},
    { label: 'Xếp loại', name: 'type', width: 15 ,editable: true, sorttype: 'text'},
    { label: 'Điểm đánh giá', name: 'values', width: 15 ,editable: true, sorttype: 'money'},
    { label: 'Người đánh giá', name: 'evaluate_person_code', width: 15 ,editable: true, sorttype: 'text'},
  ]
  col_model_occupational_accident_edit:any[] = [
    { label: 'Mã', name: 'code', key: true, width: 10 , hidden: true},
    { label: 'Ngày tai nạn', name: 'accident_date', width: 15 ,editable: true, sorttype: 'date'},
    { label: 'Tình trạng', name: 'status', width: 15 ,editable: true, sorttype: 'text'},
    { label: '% Suy giảm lao động', name: 'values', width: 15 ,editable: true, sorttype: 'int'},
    { label: 'Nguyên nhân', name: 'reason', width: 15 ,editable: true, sorttype: 'text'},
    { label: 'Diễn giải', name: 'description', width: 15 ,editable: true, sorttype: 'text'},
    { label: 'Chế độ được hưởng', name: 'benefit_mode', width: 15 ,editable: true, sorttype: 'text'},
    { label: 'Số tiền', name: 'Labor_decline', width: 15 ,editable: true, sorttype: 'money'},

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
        // this.isEdit = true;
        // this.InputModel = new HRM_Employee_ENTITY();
        // this.InputModel.employee_code = this.appSession.user.code;
        // setTimeout(() => {
        //   this.sidenavAddEdit.title = "Thêm mới hợp đồng";
        //   this.sidenavAddEdit.open();
        //   this.toolbarEdit.setUiAction(this);
        //   this.gridSalaryEdit.setData([])
        //   this.gridAppendixEdit.setData([])
        //   this.gridCurriculumVitaeEdit.setData([])
        //   this.SelectTypeContractPicker.setList(this.listContractType);
        //   this.SelectEmployeePicker.setList(this.listEmployee);
        //   this.initCombobox();
        //   this.UpdateView();
        // }, 100);
        break;
      }
      case EditPageState.edit:{
        this.InputModel = new HRM_Employee_ENTITY();
        this.InputModel.id = this.appSession.user.id;
        this.isEdit = true;
        this.InputModel.code =  this.idSelect;
        this.InputModel.id =  this.appSession.user.id;
        this.InputModel.type = EditPageState.edit;
        this.employeeService.hRM_Employee_Work_Procedure_Search(this.InputModel).subscribe((respond)=>{
          this.InputModel = respond[0];
          this.InputModel.employee_name = this.InputModel.firstName+' '+this.InputModel.lastName;
          this.sidenavAddEdit.title = "Chỉnh sửa quá trình nhân viên";
          this.sidenavAddEdit.open();
          this.toolbarEdit.setUiAction(this);
          setTimeout(() => {
            this.gridBonusEdit.setData(this.InputModel.hRM_Employee_Bonus?this.InputModel.hRM_Employee_Bonus:[])
            this.gridDisciplineEdit.setData(this.InputModel.hRM_Employee_Discipline?this.InputModel.hRM_Employee_Discipline:[])
            this.gridTrainingEdit.setData(this.InputModel.hRM_Employee_Training?this.InputModel.hRM_Employee_Training:[])
            this.gridEvaluateEdit.setData(this.InputModel.hRM_Employee_Evaluates?this.InputModel.hRM_Employee_Evaluates:[])
            this.gridOccupationalAccidentEdit.setData(this.InputModel.hRM_Employee_Occupational_Accidents?this.InputModel.hRM_Employee_Occupational_Accidents:[])
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
        try{
          this.InputModel.hRM_Employee_Bonus = [];
          var Subs = this.gridBonusEdit.allData;
          if(Subs.length>0)
          {
            for(var i = 0 ; i < Subs.length ; i++)
            {
              var newrow = new  HRM_Employee_Bonus_ENTITY();
              for (const [key, value] of Object.entries(Subs[i])) {
                newrow[key] = Subs[i][key];
              }
              newrow = HRM_Employee_Bonus_ENTITY.fromJS(newrow);
              this.InputModel.hRM_Employee_Bonus.push(newrow);
            }
          }
        }catch{}
        try{
          this.InputModel.hRM_Employee_Discipline = [];
          var Subs2 = this.gridDisciplineEdit.allData;
          if(Subs2.length>0)
          {
            for(var i = 0 ; i < Subs2.length ; i++)
            {
              var newrow2 = new  HRM_Employee_Discipline_ENTITY();
              for (const [key, value] of Object.entries(Subs2[i])) {
                newrow2[key] = Subs2[i][key];
              }
              newrow2 = HRM_Employee_Discipline_ENTITY.fromJS(newrow2);
              this.InputModel.hRM_Employee_Discipline.push(newrow2);
            }
          }
        }catch{}
        try{
          this.InputModel.hRM_Employee_Training = [];
          var Subs3 = this.gridTrainingEdit.allData;
          if(Subs3.length>0)
          {
            for(var i = 0 ; i < Subs3.length ; i++)
            {
              var newrow3 = new  HRM_Employee_Training_ENTITY();
              for (const [key, value] of Object.entries(Subs3[i])) {
                newrow3[key] = Subs3[i][key];
              }
              newrow3 = HRM_Employee_Training_ENTITY.fromJS(newrow3);
              this.InputModel.hRM_Employee_Training.push(newrow3);
            }
          }
        }catch{
          this.alertMessage.AlertWarning('Đã có lỗi xảy ra trong danh sách "Đào tạo"');
          
        }
        try{
          this.InputModel.hRM_Employee_Evaluates = [];
          var Subs4 = this.gridEvaluateEdit.allData;
          if(Subs4.length>0)
          {
            for(var i = 0 ; i < Subs4.length ; i++)
            {
              var newrow4 = new  HRM_Employee_Evaluate_ENTITY();
              for (const [key, value] of Object.entries(Subs4[i])) {
                newrow4[key] = Subs4[i][key];
              }
              newrow4 = HRM_Employee_Evaluate_ENTITY.fromJS(newrow4);
              this.InputModel.hRM_Employee_Evaluates.push(newrow4);
            }
          }
        }catch{}
        try{
          this.InputModel.hRM_Employee_Occupational_Accidents = [];
          var Subs5 = this.gridOccupationalAccidentEdit.allData;
          if(Subs5.length>0)
          {
            for(var i = 0 ; i < Subs5.length ; i++)
            {
              var newrow5 = new  HRM_Employee_Occupational_Accident_ENTITY();
              for (const [key, value] of Object.entries(Subs5[i])) {
                newrow5[key] = Subs5[i][key];
              }
              newrow5 = HRM_Employee_Occupational_Accident_ENTITY.fromJS(newrow5);
              this.InputModel.hRM_Employee_Occupational_Accidents.push(newrow5);
            }
          }
        }catch{}
        this.InputModel.id =  this.appSession.user.id;
          this.employeeService.hRM_Employee_Work_Procedure_Update(this.InputModel).subscribe((respond)=>{
            if(respond['status'] == 0)
            {
              this.alertMessage.AlertSuccess(respond['message']);
              setTimeout(() => {
                this.gridBonusEdit.setData(respond.hRM_Employee_Bonus?respond.hRM_Employee_Bonus:[])
                this.gridDisciplineEdit.setData(respond.hRM_Employee_Discipline?respond.hRM_Employee_Discipline:[])
                this.gridTrainingEdit.setData(respond.hRM_Employee_Training?respond.hRM_Employee_Training:[])
                this.gridEvaluateEdit.setData(respond.hRM_Employee_Evaluates?respond.hRM_Employee_Evaluates:[])
                this.gridOccupationalAccidentEdit.setData(respond.hRM_Employee_Occupational_Accidents?respond.hRM_Employee_Occupational_Accidents:[])
                this.UpdateView();
              }, 500);
              this.LoadData();
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
        break;
      }
      case EditPageState.search:{
        this.LoadData();
        break;
      }
      case EditPageState.viewDetail:{
        this.onLoadDataViewDetail();
        break;
      }
      default:break;
    }
  }
  onLoadDataViewDetail(){
    this.InputModel = new HRM_Employee_ENTITY();
    this.InputModel.id = this.appSession.user.id;
    this.isEdit = true;
    this.InputModel.code =  this.idSelect;
    this.InputModel.id =  this.appSession.user.id;
    this.InputModel.type = EditPageState.viewDetail;
    this.employeeService.hRM_Employee_Work_Procedure_Search(this.InputModel).subscribe((respond)=>{
      this.InputModel = respond[0];
      this.sidenavAddEdit.open();
      this.toolbarEdit.setUiAction(this);
      this.initCombobox();
      setTimeout(() => {
        this.gridBonusEdit.setData(this.InputModel.hRM_Employee_Bonus?this.InputModel.hRM_Employee_Bonus:[])
        this.gridDisciplineEdit.setData(this.InputModel.hRM_Employee_Discipline?this.InputModel.hRM_Employee_Discipline:[])
        this.gridTrainingEdit.setData(this.InputModel.hRM_Employee_Training?this.InputModel.hRM_Employee_Training:[])
        this.gridEvaluateEdit.setData(this.InputModel.hRM_Employee_Evaluates?this.InputModel.hRM_Employee_Evaluates:[])
        this.gridOccupationalAccidentEdit.setData(this.InputModel.hRM_Employee_Occupational_Accidents?this.InputModel.hRM_Employee_Occupational_Accidents:[])
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
  }
  getDataByID(storedName: string, param: string, keyService: string): void {
    throw new Error('Method not implemented.');
  }

  LoadData() {
    this.BlockUI();
    this.filterInput.code = null;
    this.employeeService.hRM_Employee_Search(this.filterInput).subscribe(
      (data: any) => {
        this.InputMaster = data;
        data.forEach(element => {
          this.InputMaster.forEach(element2 => {
            if(element['code'] == element2['code_master'])
              element2['name_master'] = element['name'];  
          });
        });
        this.gridList.setData(this.InputMaster,this.col_model,this.tbName)
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
  ngOnInit(): void {
    this.setAcction();
    this.LoadData();
    this.initCombobox();
  }
  confirmDelete() {
    // this.BlockUI();
    // this.employeeService.hRM_Employee_Labour_Contract_Delete(this.idSelect,this.appSession.user.code).subscribe(
    //   (respond: any) => {
    //     if(respond['status'] == '0'){
    //       this.showMessageSuccess(respond['message'])
    //       this.LoadData();
    //       this.onSearch();
    //     }else
    //     {
    //       this.showMessageError(respond['message'])
    //     }        
    //   },
    //   (err) => this.UnBlockUI(),
    //   () => {
    //     this.UnBlockUI();
    //   })
    // this.UpdateView();
  }
  initCombobox(){

    
  }
}
