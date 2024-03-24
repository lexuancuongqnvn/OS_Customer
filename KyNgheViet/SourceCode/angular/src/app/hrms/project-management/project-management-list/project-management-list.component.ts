import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { JqgridEditComponent } from 'src/app/shared/jqgrid/jqgrid-edit/jqgrid-edit.component';
import { JqgridListComponent } from 'src/app/shared/jqgrid/jqgrid-list/jqgrid-list.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { AcctionService, DepartmentService, Department_ENTITY, EmployeeService, HRM_Employee_ENTITY, HRM_Project_Management_ENTITY, HRM_Project_Management_Task_ENTITY, ProjectManagementService, WorkspaceService } from 'src/app/shared/service-proxies/api-shared';
import { AlertMessageComponent } from 'src/app/shared/sidenav/alert-message/alert-message.component';
import { SidenavAddEditComponent } from 'src/app/shared/sidenav/sidenav-add-edit/sidenav-add-edit.component';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

declare var customField_HRM_Project_Management_Task;
@Component({
  selector: 'app-project-management-list',
  templateUrl: './project-management-list.component.html',
  styleUrls: ['./project-management-list.component.css']
})
export class ProjectManagementListComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    private injector: Injector,
    private employeeService: EmployeeService,
    private appSession: AppSession,
    private workspaceService:WorkspaceService,
    private projectManagementService:ProjectManagementService,
    private departmentService:DepartmentService
  ) {
    super(injector);
  }
  isEdit:boolean = false;
  @ViewChild('gridList') gridList: JqgridListComponent;
  @ViewChild('gridMenuEdit') gridMenuEdit: JqgridEditComponent<HRM_Project_Management_Task_ENTITY>;
  @ViewChild('dialogDelete') dialogDelete: DialogAcctionComponent;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  @ViewChild('toolbarEdit') toolbarEdit: ToolbarComponent;
  @ViewChild('sidenavAddEdit') sidenavAddEdit: SidenavAddEditComponent;
  @ViewChild('alertMessage') alertMessage: AlertMessageComponent;
  
  tbName: string = 'HRM_Project_Management';
  tbName_sub: string = 'HRM_Project_Management_Task';
  filterInput:HRM_Project_Management_ENTITY = new HRM_Project_Management_ENTITY();
  InputModel:HRM_Project_Management_ENTITY = new HRM_Project_Management_ENTITY();
  CurrenFrom:string = EditPageState.view;
  listEmployee:HRM_Employee_ENTITY[] = [];
  listDepartment:Department_ENTITY[] = [];

  col_model:any[] = [
    { label: 'Mã', name: 'code', key: true, width: 10 , hidden: true},
    { label: 'Tên dự án', name: 'name', width: 25 },
    { label: 'Công việc mới', name: '_new', width: 10 },
    { label: 'Đang thực hiện', name: '_inprogress', width: 10 },
    { label: 'Đã hoàn thành', name: '_done', width: 10 },
    { label: 'Tổng công việc', name: '_total', width: 10 } ,
    { label: 'Tổng hoàn thành (%)', name: 'project_progress', width: 10 , hidden: true} ,
    { label: 'Thành viên', name: 'menbers', width: 10 , hidden: true} ,
    { label: 'Ngày bắt đầu', name: 'start_date_f', width: 10 } ,
    { label: 'Ngày kết thúc', name: 'stop_date_f', width: 10 } ,
    { label: 'Vượt tiến độ (ngày)', name: 'advancing', width: 15 , hidden: true} ,
    { label: 'Trễ tiến độ (ngày)', name: 'delay', width: 15, hidden: true } 
  ]

  col_model_edit:any[] = [
    { label: 'Mã', name: 'code', key: true, width: 20 , hidden: true,editable: false},
    { label: 'Mã', name: 'id_referent', key: false, width: 7 , hidden: false,editable: false},
    { label: 'Phòng ban', name: 'department_code', width: 10, hidden: false ,editable: true, sorttype: "select", editoptions: { value: [] }},
    { label: 'Người tạo', name: 'create_user', width: 10, hidden: true ,editable: true, sorttype: "select", editoptions: { value: [] }},
    { label: 'Quản lý', name: 'executor', width: 10, hidden: false ,editable: true, sorttype: "select", editoptions: { value: [] }},
    { label: 'Tên chủ đề', name: 'name', width: 35 ,editable: true, sorttype: 'text'},
    { label: 'Ngày bắt đầu', name: 'start_date', width: 10 ,editable: true, sorttype: 'date'},
    { label: 'Ngày kết thúc dự kiến', name: 'stop_date', width: 10 ,editable: true, sorttype: 'date'},
    { label: 'Tình trạng', name: 'status', width: 10, hidden: true ,editable: true, sorttype: "select", editoptions: { value: [] }},
    { label: 'Hoàn thành (%)', name: 'amf', width: 10, hidden: true ,editable: false, sorttype: 'text'}
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
    this.LoadData();
  }
  onResetSearch(): void {
    throw new Error('Method not implemented.');
  }
  // onSelectStatusTask(v:any): void {
  //   this.filterInput.status = v;
  // }
  onClickAcction(id: number, storedName: string, param: string, keyService: string, classForm: string): void {
    if(classForm == 'Report') this.navigateByUrl('/dashboard-hrm');
    switch(classForm){
      case EditPageState.add:{
        this.isEdit = true;
        this.InputModel = new HRM_Project_Management_ENTITY();
        setTimeout(() => {
          this.sidenavAddEdit.title = "Thêm mới dự án";
          this.sidenavAddEdit.open();
          this.toolbarEdit.setUiAction(this);
          this.UpdateView();
          this.gridMenuEdit.setData([]);
          this.UpdateView();
        }, 100);
        break;
      }
      case EditPageState.edit:{
        this.BlockUI();
        this.isEdit = true;
        this.InputModel = new HRM_Project_Management_ENTITY();
        this.projectManagementService.hRM_Project_Management_Search_ByCode(this.idSelect).subscribe((respond)=>{
          this.InputModel = respond[0];
          this.sidenavAddEdit.open();
          this.toolbarEdit.setUiAction(this);
          this.UpdateView(); 
          this.gridMenuEdit.setData(this.InputModel.project_Management_Tasks);
          // customField_HRM_Project_Management_Task();
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
        // this.navigatePassParam('/menu-edit', { code: this.idSelect }, { filterInput: JSON.stringify(this.filterInput) });
        break;
      }
      case EditPageState.delete:{
        this.dialogDelete.open();
        break;
      }
      case EditPageState.save:{
        if(!this.InputModel.name){
          this.alertMessage.AlertError('"Tên dự án" không được để trống');return;
        }
        if(!this.InputModel.start_date){
          this.alertMessage.AlertError('"Ngày bắt đầu" không được để trống');return;
        }
        if(!this.InputModel.stop_date){
          this.alertMessage.AlertError('"Ngày kết thúc" không được để trống');return;
        }
        if(this.InputModel.start_date > this.InputModel.stop_date){
          this.alertMessage.AlertError('"Ngày bắt đầu" - "ngày kết thúc" không hợp lệ');return;
        }
        this.BlockUI();
        try{
          // this.InputModel.syS_Menu_Sub = this.gridMenuEdit.getAllData(this.tbName_sub);
          this.InputModel.project_Management_Tasks = [];
          var Subs = this.gridMenuEdit.allData;
          if(Subs.length>0)
          {
            for(var i = 0 ; i < Subs.length ; i++)
            {
              var newrow = new  HRM_Project_Management_Task_ENTITY();
              for (const [key, value] of Object.entries(Subs[i])) {
                newrow[key] = Subs[i][key];
              }
              this.InputModel.project_Management_Tasks.push(newrow);
            }
          }
        }catch{}
        // this.filterInput = HRM_Project_Management_ENTITY['toJSON'](this.filterInput);
        if(!this.InputModel.code){
          this.InputModel.account_code = this.appSession.user.code;
          this.projectManagementService.hRM_Project_Management_Insert(this.InputModel).subscribe((respond)=>{
            if(respond['status'] == '0')
            {
              this.showMessageSuccess(respond['message']);
              this.sidenavAddEdit.close();
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
          this.InputModel.account_code = this.appSession.user.code;
          this.projectManagementService.hRM_Project_Management_Update(this.InputModel).subscribe((respond)=>{
            if(respond['status'] == '0')
            {
              this.showMessageSuccess(respond['message']);
              this.sidenavAddEdit.close();
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
        }
        
        break;
      }
      case EditPageState.search:{
        this.filterInput.account_code = this.appSession.user.code;
        this.LoadData();
        break;
      }
      case EditPageState.viewDetail:{
        this.BlockUI();
        this.isEdit = true;
        this.InputModel = new HRM_Project_Management_ENTITY();
        this.projectManagementService.hRM_Project_Management_Search_ByCode(this.idSelect).subscribe((respond)=>{
          this.InputModel = respond[0];
          this.sidenavAddEdit.open();
          this.toolbarEdit.setUiAction(this);
          this.UpdateView(); 
          this.gridMenuEdit.setData(this.InputModel.project_Management_Tasks);
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
    this.filterInput.account_code = this.appSession.user.code;
    this.LoadData();
  }

  confirmDelete() {
    this.BlockUI();
    var p = new HRM_Project_Management_ENTITY();
    p.account_code = this.appSession.user.code;
    p.code = this.idSelect;
    this.projectManagementService.hRM_Project_Management_Delete(p).subscribe(
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
    this.projectManagementService.hRM_Project_Management_Search(this.filterInput).subscribe(
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
  setAcction(){
    if(this.toolbar)
      this.toolbar.setUiAction(this);
    else
      setTimeout(() => {
        this.setAcction();
      }, 50);
  }
  valueStartDate(e:any,col:string){
    if(col == 'start_date')
      this.InputModel.start_date = e;
    if(col == 'stop_date')
      this.InputModel.stop_date = e;
    if(col == 'progress_task')
      this.InputModel.progress_task = e
    if(col == 'done_task')
      this.InputModel.done_task = e
  }
  initCombobox(){
    this.projectManagementService.hRM_Project_Management_Task_Status_Search().subscribe(
      (data: any) => {
        this.col_model_edit.forEach(e=>{
          if(e.name == 'status'){
            e.editoptions.value=data;
          }
        })
        this.UpdateView();
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
        //isloading = true
      }
    )

    let p = new HRM_Employee_ENTITY();
    this.employeeService.hRM_Employee_Search(p).subscribe(
      (data: any) => {
        if(data){
          data.forEach(e=>{
            e.id = e.id;
            e['name'] = e.lastName + ' ' +e.firstName; 
            this.listEmployee.push(e);
          })
        }
        this.col_model_edit.forEach(e=>{
          if(e.name == 'create_user' || e.name == 'executor'){
            e.editoptions.value=this.listEmployee;
          }
        })
        this.UpdateView();
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
    p = new Department_ENTITY();
    this.departmentService.department_Search(p).subscribe(
      (data: any) => {
        this.col_model_edit.forEach(e=>{
          if(e.name == 'department_code'){
            e.editoptions.value=data;
          }
        })
        this.UpdateView();
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
  }
}
