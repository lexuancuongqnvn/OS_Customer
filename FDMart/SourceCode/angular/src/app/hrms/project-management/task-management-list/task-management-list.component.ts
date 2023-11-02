import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { url } from 'inspector';
import moment from 'moment';
import { AppConsts } from 'src/app/app-consts.component';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { JqgridEditComponent } from 'src/app/shared/jqgrid/jqgrid-edit/jqgrid-edit.component';
import { JqgridListComponent } from 'src/app/shared/jqgrid/jqgrid-list/jqgrid-list.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { InputFilepickerComponent } from 'src/app/shared/layout/input-control-simple/input-filepicker/input-filepicker.component';
import { InputSelectComponentV2 } from 'src/app/shared/layout/input-control-simple/input-select-v2/input-select-v2.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { DepartmentService, Department_ENTITY, EmployeeService, HRM_Employee_ENTITY, HRM_Project_Management_ENTITY, HRM_Project_Management_Task_Comment_ENTITY, HRM_Project_Management_Task_ENTITY, HRM_Project_Management_Task_Proprity_Level_ENTITY, HRM_Project_Management_Task_Status_ENTITY, HRM_Project_Management_Task_Type_ENTITY, NotificationModel, ProjectManagementService, WorkspaceService } from 'src/app/shared/service-proxies/api-shared';
import { AlertMessageComponent } from 'src/app/shared/sidenav/alert-message/alert-message.component';
import { SidenavAddEditComponent } from 'src/app/shared/sidenav/sidenav-add-edit/sidenav-add-edit.component';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

declare var renderTreeFy_byid;
@Component({
  selector: 'task-management-list',
  templateUrl: './task-management-list.component.html',
  styleUrls: ['./task-management-list.component.css']
})
export class TaskManagementListComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    private injector: Injector,
    private employeeService: EmployeeService,
    private appSession: AppSession,
    private workspaceService:WorkspaceService,
    private projectManagementService:ProjectManagementService,
    private Filesfilepicker: InputFilepickerComponent,
    private departmentService:DepartmentService
  ) {
    super(injector);
    this.filterInput.id_referent = this.getRouteParam('id');
    this.filterInput.executor = this.appSession.user.code;
  }
  col_model:any[] = [
    { label: 'Mã', name: 'code', key: true, width: 10 , hidden: true,editable: true},
    { label: 'STT', name: 'in_task',width: 7 , hidden: true,editable: false},
    // { label: 'Dự án', name: 'project_name', width: 0, hidden: true ,editable: true},
    { label: '*', name: 'important_c',width: 3 , hidden: false,editable: false},
    { label: 'pin', name: 'icon_pin',width: 3 , hidden: false,editable: false},
    { label: 'Mã', name: 'id_referent',width: 7 , hidden: false,editable: false},
    { label: 'Công việc', name: 'name', width: 20 ,editable: true, sorttype: 'text'},
    { label: 'Thuộc', name: 'in_task_name', width: 15 ,editable: true},
    { label: 'Chủ đề', name: 'topic_name', width: 15 ,editable: true},
    { label: 'Trạng thái', name: 'expiry_task_name', width: 8 ,editable: true, sorttype: 'date'},
    { label: 'Tiến độ (%)', name: 'percent_done_f', width: 8 ,editable: true, sorttype: 'int'},
    { label: 'Phân công cho', name: 'executor_name', width: 15, hidden: false ,editable: true, sorttype: "select", editoptions: { value: [] }},
    { label: 'Tình trạng', name: 'status_name', width: 10, hidden: true ,editable: true, sorttype: "select", editoptions: { value: [] }},
    { label: 'Mức ưu tiên', name: 'priority_level_name', width: 10 ,editable: true},
    { label: 'Ngày bắt đầu', name: 'start_date_f', width: 10 ,editable: true, sorttype: 'date'},
    { label: 'Ngày kết thúc dự kiến', name: 'stop_date_f', width: 15 ,editable: true, sorttype: 'date'},
    { label: 'Kiểu Công việc', name: 'type_name', width: 10 ,editable: true},
    { label: 'Thời gian (giờ)', name: 'hour_done', width: 10 ,editable: true, sorttype: 'int'},
    { label: 'Người tạo', name: 'create_user_name', width: 10, hidden: true ,editable: true, sorttype: "select", editoptions: { value: [] }},
  ]
  get display():Boolean{
    if(!this.InputModel.in_task ||this.InputModel.in_task == 'null') return true;
    return this.InputModel.in_task != ''?false:true;
  }
  get disabled():Boolean{
    if(this.getCurrenFrom == EditPageState.viewDetail) return true;
    return false;
  }
  get disabledPermission():Boolean{
    var rs = (this.InputModel.create_user != this.appSession.user.code && this.getCurrenFrom != EditPageState.add && this.InputModel.create_user != undefined 
    && this.InputModel.create_user != '' && this.InputModel.code != undefined && this.InputModel.code != null && this.InputModel.code != '')
    return rs;
  }  
  get isShowNotifi():Boolean{
    if(this.appSession.user.code == this.InputModel.create_user || this.appSession.user.code == this.InputModel.executor) return true;
    return false;
  }
  name = 'Công việc';
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    enableToolbar: true,
    showToolbar: true,
    height: '10rem',
    minHeight: '10rem',
    placeholder: 'Nhập nội dung Công việc...',
    translate: 'yes',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    defaultFontSize: '',
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ],
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ],
    fonts: [
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
      {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    ],
    uploadWithCredentials: false,
    sanitize: true,
    uploadUrl: 'v1/image'
  };

  isEdit:boolean = false;
  @ViewChild('gridList') gridList: JqgridListComponent;
  @ViewChild('dialogDelete') dialogDelete: DialogAcctionComponent;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  @ViewChild('toolbarEdit') toolbarEdit: ToolbarComponent;
  @ViewChild('sidenavAddEdit') sidenavAddEdit: SidenavAddEditComponent;
  @ViewChild('SelectCreateUserPicker') SelectCreateUserPicker: InputSelectComponentV2;
  @ViewChild('SelectProgressTaskPicker') SelectProgressTaskPicker: InputSelectComponentV2;
  @ViewChild('SelectStatusTaskPicker') SelectStatusTaskPicker: InputSelectComponentV2;
  @ViewChild('SelectCreateUserPicker2') SelectCreateUserPicker2: InputSelectComponentV2;
  @ViewChild('SelectProgressTaskPicker2') SelectProgressTaskPicker2: InputSelectComponentV2;
  @ViewChild('SelectFollowTaskPicker') SelectFollowTaskPicker: InputSelectComponentV2;
  @ViewChild('SelectStatusTaskPicker2') SelectStatusTaskPicker2: InputSelectComponentV2;
  @ViewChild('SelectPercentDonePicker') SelectPercentDonePicker: InputSelectComponentV2;
  @ViewChild('SelectProjectPicker') SelectProjectPicker: InputSelectComponentV2;
  @ViewChild('SelectProjectTopicPicker') SelectProjectTopicPicker: InputSelectComponentV2;
  @ViewChild('SelectDepartmentPicker') SelectDepartmentPicker: InputSelectComponentV2;
  @ViewChild('SelectTypePicker') SelectTypePicker: InputSelectComponentV2;
  @ViewChild('SelectPriorityLevelPicker') SelectPriorityLevelPicker: InputSelectComponentV2;
  @ViewChild('SelectPriorityLevelPicker2') SelectPriorityLevelPicker2: InputSelectComponentV2;
  @ViewChild('SelectTypeTaskPicker') SelectTypeTaskPicker: InputSelectComponentV2;
  @ViewChild('SelectProjectPicker2') SelectProjectPicker2: InputSelectComponentV2;
  @ViewChild('SelectDepartmentPicker2') SelectDepartmentPicker2: InputSelectComponentV2;
  // @ViewChild('SelectOrderByDateAddPicker') SelectOrderByDateAddPicker: InputSelectComponentV2;
  @ViewChild('alertMessage') alertMessage: AlertMessageComponent;
  tbName: string = 'HRM_Project_Management_Task';
  filterInput:HRM_Project_Management_Task_ENTITY = new HRM_Project_Management_Task_ENTITY();
  InputModel:HRM_Project_Management_Task_ENTITY = new HRM_Project_Management_Task_ENTITY();
  CommentModel:HRM_Project_Management_Task_Comment_ENTITY = new HRM_Project_Management_Task_Comment_ENTITY();
  CurrenFrom:string = EditPageState.view;
  listEmployee:HRM_Employee_ENTITY[] = [];
  listStatus:HRM_Project_Management_Task_Status_ENTITY[] = [];
  listProject:HRM_Project_Management_ENTITY[] = [];
  listProjectTopic:HRM_Project_Management_Task_ENTITY[] = [];
  listDepartment:Department_ENTITY[] = [];  
  listType:HRM_Project_Management_Task_Type_ENTITY[] = [];
  listPriorityLevel:HRM_Project_Management_Task_Proprity_Level_ENTITY[] = [];
  
  listPercentDone:any[]=[];
  dataTreeView:any[]=[];
  copied:boolean = false;
  classForm:string = '';
  listHistory:any[]=[];
  orderByDateAdd:any[]=[{
    code:'ASC',
    name:'Tăng dần'
  },{
    code:'DESC',
    name:'Giảm dần'
  }];
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
  onSelect(v:any,col:string){
    if(col == 'percent_done')
      // if(this.InputModel.create_user != this.appSession.user.code)
      this.InputModel[col] = Number(v);
    else
      this.InputModel[col] = v;
  }
  onSelectCreateUser(v:any): void {
    this.filterInput.create_user = v;
  }  
  onSelectType(v:any): void {
    this.filterInput.type_code = v;
  }  
  onSelectPriorityLevel(v:any): void {
    this.filterInput.priority_level = v;
  }  
  onSelectOrderByDateAdd(v:any): void {
    this.filterInput.order_by_date_add = v;
  }
  onSelectDepartment(v:any): void {
    this.filterInput.department_code = v;
  }
  onSelectProgressTask(v:any): void {
    this.filterInput.executor = v;
  }
  onSelectStatusTask(v:any): void {
    this.filterInput.status = v;
  }
  onSelectCreateUser2(v:any): void {
    this.InputModel.create_user = v;
  }
  onSelectProgressTask2(v:any): void {
    this.InputModel.executor = v;
  }
  onSelectStatusTask2(v:any): void {
    this.InputModel.status = v;
  }
  onSelectProject(v:any): void {
    this.filterInput.project_code = v;
    this.listProject.find(e=>e.code == v)?this.listProjectTopic = this.listProject.find(e=>e.code == v).project_Management_Tasks:this.listProjectTopic = [];
    this.SelectProjectTopicPicker.setList(this.listProjectTopic);
  }
  onSelectProjectTopic(v:any): void {
    this.filterInput.topic_code = v;
  }
  onSelectPercentDone(v:any): void {
    this.InputModel.percent_done = Number(v);
  }
  
  setAcction(){
    if(this.toolbar)
      this.toolbar.setUiAction(this);
    else
      setTimeout(() => {
        this.setAcction();
      }, 50);
  }
  addNewtask(in_task:string){
    this.classForm = 'Add';
    this.isEdit = true;
    var t = new HRM_Project_Management_Task_ENTITY();
    t.project_code = this.InputModel.project_code;
    t.type_code = this.InputModel.type_code;
    t.project_code = this.InputModel.project_code;
    t.project_name = this.InputModel.project_name;
    t.department_code = this.InputModel.department_code;
    this.InputModel = t;
    this.InputModel.in_task = in_task;
    this.InputModel.hRM_Project_Management_Task_Comments = [];
    this.InputModel.hRM_Project_Management_Task_Historys = [];
    this.InputModel.hRM_Project_Management_Task_Levels = [];
    this.InputModel.start_date = moment();
    this.InputModel.stop_date = moment();
    
    this.sidenavAddEdit.close();
    setTimeout(() => {
      this.sidenavAddEdit.title = "Thêm mới Công việc";
      this.setCurrenFrom(EditPageState.add);
      this.sidenavAddEdit.open();
      this.renderSelectPicker();
      renderTreeFy_byid('HRM_Project_Management_Task-striped',this.InputModel.hRM_Project_Management_Task_Levels);
      this.UpdateView();
    }, 200);
  }
  edittask(code:string){
    this.BlockUI();
    this.sidenavAddEdit.close();
    setTimeout(() => {
      this.isEdit = true;
      this.InputModel = new HRM_Project_Management_ENTITY();
      this.InputModel.code = code;
      this.InputModel.top = 1;
      this.InputModel.account_code = this.appSession.user.code;
      this.hRM_Project_Management_Task_Search(this.InputModel);
    }, 200);
  }
  public resetHistory(code:string,name:string){
    var obj = {
      code:code,
      name:name
    }
    if(this.listHistory.find(e=>e.code==code)){
      var t = [];
      for(var i=0;i<this.listHistory.length;i++){
        if(this.listHistory[i]['code'] == code) break;
        t.push(this.listHistory[i]);
      }
      this.listHistory = t;
    }else this.listHistory.push(obj)
    this.UpdateView();
  }
  hRM_Project_Management_Task_Search(input:HRM_Project_Management_Task_ENTITY){
    this.CommentModel = new HRM_Project_Management_Task_Comment_ENTITY();
    input.type = 'BYID';
    this.projectManagementService.hRM_Project_Management_Task_Search(input).subscribe((respond)=>{
      if(respond.length == 0) return;
      this.classForm = 'Edit';
      this.CurrenFrom = EditPageState.edit;
      this.setCurrenFrom(EditPageState.edit);
      this.InputModel = respond[0];
      this.resetHistory(this.InputModel.code,this.InputModel.name)
      setTimeout(() => {
        renderTreeFy_byid('HRM_Project_Management_Task-striped',this.InputModel.hRM_Project_Management_Task_Levels);
      }, 100);
      this.renderSelectPicker();
      if(!this.InputModel.task_content) this.InputModel.task_content = '';
      this.CommentModel.task_code = this.InputModel.code;
      this.projectManagementService.hRM_Project_Management_Task_Comment_Search(this.CommentModel).subscribe((respond:any)=>{
        this.InputModel.hRM_Project_Management_Task_Comments = respond;
        if(respond){
          respond.forEach(e => {
            if (e.attach_files != '') {
              var attach_files = e.attach_files.split(';');
              e['arr_attach_files'] = [];
              attach_files.forEach(file => {
                var file_name = file.split('/')[file.split('/').length - 1]
                e['arr_attach_files'].push({
                  url: file,
                  name: file_name
                })
              });
            }
          })
        }
        this.UpdateView();
      })

      this.sidenavAddEdit.open();
      this.toolbarEdit.setUiAction(this);
      this.UpdateView(); 
      //this.renderSelectPicker();
      
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
  renderSelectPicker(){
      if(this.SelectPriorityLevelPicker2) 
      this.SelectPriorityLevelPicker2.setList(this.listPriorityLevel);
      if(this.SelectProgressTaskPicker2)
      this.SelectProgressTaskPicker2.setList(this.listEmployee);
      if(this.SelectFollowTaskPicker)
      this.SelectFollowTaskPicker.setList(this.listEmployee);
      if(this.SelectStatusTaskPicker2)
      this.SelectStatusTaskPicker2.setList(this.listStatus);
      if(this.SelectPercentDonePicker)
      this.SelectPercentDonePicker.setList(this.listPercentDone);
      if(this.SelectTypeTaskPicker)
      this.SelectTypeTaskPicker.setList(this.listType);
      if(this.SelectDepartmentPicker2)
      this.SelectDepartmentPicker2.setList(this.listDepartment);
      if(this.SelectCreateUserPicker2)
      this.SelectCreateUserPicker2.setList(this.listEmployee);
  }
  onClickAcction(id: number, storedName: string, param: string, keyService: string, classForm: string) {
    this.classForm = classForm;
    switch(classForm){
      case EditPageState.add:{
        this.isEdit = true;
        this.InputModel = new HRM_Project_Management_Task_ENTITY();
        this.InputModel.code = this.idSelect;
        this.InputModel.top = 1;
        this.CommentModel = new HRM_Project_Management_Task_Comment_ENTITY();
        this.projectManagementService.hRM_Project_Management_Task_Search(this.InputModel).subscribe(async (respond) => {
            this.InputModel = respond[0];
            this.sidenavAddEdit.title = "Thêm mới Công việc";
            this.sidenavAddEdit.open();
            this.toolbarEdit.setUiAction(this);
            this.addNewtask(this.idSelect);
            this.UpdateView();
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
        // this.isEdit = true;
        // this.InputModel = new HRM_Project_Management_ENTITY();
        // this.InputModel.hRM_Project_Management_Task_Comments = [];
        // this.InputModel.hRM_Project_Management_Task_Historys = [];
        // this.InputModel.hRM_Project_Management_Task_Levels = [];
        // setTimeout(() => {
        //   this.sidenavAddEdit.title = "Thêm mới Công việc";
        //   this.sidenavAddEdit.open();
        //   this.toolbarEdit.setUiAction(this);
        //   this.renderSelectPicker();
        //   renderTreeFy_byid('HRM_Project_Management_Task-striped',this.InputModel.hRM_Project_Management_Task_Levels);
        //   this.UpdateView();
        // }, 100);
        break;
      }
      case EditPageState.edit:{
        this.InputModel = new HRM_Project_Management_Task_ENTITY();
        this.loadEdit();
        // this.navigatePassParam('/menu-edit', { code: this.idSelect }, { filterInput: JSON.stringify(this.filterInput) });
        break;
      }
      case EditPageState.delete:{
        break;
      }
      case EditPageState.save:{
        if(this.disabled) {
          this.alertMessage.AlertWarning('Lưu không thành công trên chức năng "Xem chi tiết"');return;
        }
        if(!this.InputModel.name) {
          this.alertMessage.AlertError('"Tên Công việc" không được để trống');
          return;
        }
        if(!this.InputModel.task_content && !this.display) {
          this.alertMessage.AlertError('"Nội dung" không được để trống');
          return;
        }
        if(!this.InputModel.start_date) {
          this.alertMessage.AlertError('"Ngày bắt đầu" không được để trống');
          return;
        }
        if(!this.InputModel.stop_date) {
          this.alertMessage.AlertError('"Ngày kết thúc" không được để trống');
          return;
        }
        if(!this.InputModel.project_code) {
          this.alertMessage.AlertError('"Dự án" không được để trống');
          return;
        }
        if(!this.InputModel.department_code && this.display) {
          this.alertMessage.AlertError('"Phòng ban" không được để trống');
          return;
        }
        if(this.InputModel.stop_date < this.InputModel.start_date) {
          this.alertMessage.AlertError('"Ngày kết thúc" phải lớn hoặc bằng hơn "ngày bắt đầu"');
          return;
        }
        
        this.InputModel.account_code = this.appSession.user.code;
        if(!this.InputModel.code){
          this.InputModel.id = -1;
          this.InputModel.create_user = this.appSession.user.code;
          if(!this.InputModel.percent_done) this.InputModel.percent_done = 0;
          this.InputModel = HRM_Project_Management_Task_ENTITY.fromJS(this.InputModel);

          this.projectManagementService.hRM_Project_Management_Task_Insert(this.InputModel).subscribe((respond)=>{
            if(respond['status'] == '0')
            {
              this.InputModel.code = respond['ref_code'];
              this.alertMessage.AlertSuccess(respond['message']);
            }
            else
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
          if((!this.InputModel.hour_done || this.InputModel.hour_done <= 0) 
          && this.InputModel.in_task != '' && this.InputModel.in_task && this.InputModel.create_user != this.appSession.user.code && !this.display) {
            this.alertMessage.AlertError('"Thời gian hoàn thành" không được hợp lệ');
            return;
          }
          if(!this.InputModel.logtime_description && !this.display) {
            this.alertMessage.AlertError('"Diễn giải công việc" không được để trống');
            return;
          }
          this.projectManagementService.hRM_Project_Management_Task_Update(this.InputModel).subscribe((respond)=>{
            if(respond['status'] == '0')
              this.alertMessage.AlertSuccess(respond['message']);
            else
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
        this.loadEdit(); 
        break;
      }
      default:break;
    }
  }
  loadEdit(){
    this.BlockUI()
    this.isEdit = true;
    this.InputModel = new HRM_Project_Management_Task_ENTITY();
    this.InputModel.code = this.idSelect;
    this.InputModel.account_code = this.appSession.user.code;
    this.InputModel.top = 1;
    this.CommentModel = new HRM_Project_Management_Task_Comment_ENTITY();
    this.projectManagementService.hRM_Project_Management_Task_Search(this.InputModel).subscribe(async (respond)=>{
      this.InputModel = respond[0];
      setTimeout(() => {
        renderTreeFy_byid('HRM_Project_Management_Task-striped',this.InputModel.hRM_Project_Management_Task_Levels);
      }, 100);
      if(!this.InputModel.task_content) this.InputModel.task_content = '';
      this.CommentModel.task_code = this.InputModel.code;
      this.projectManagementService.hRM_Project_Management_Task_Comment_Search(this.CommentModel).subscribe((respond:any)=>{
        this.InputModel.hRM_Project_Management_Task_Comments = respond;
        if(respond){
          respond.forEach(e => {
            if (e.attach_files != '') {
              var attach_files = e.attach_files.split(';');
              e['arr_attach_files'] = [];
              attach_files.forEach(file => {
                var file_name = file.split('/')[file.split('/').length - 1]
                e['arr_attach_files'].push({
                  url: file,
                  name: file_name
                })
              });
            }
          })
        }
        this.UpdateView();
      })
      if(this.getCurrenFrom == EditPageState.edit) this.sidenavAddEdit.title = "Chỉnh sửa công việc";
      else if(this.getCurrenFrom == EditPageState.viewDetail)this.sidenavAddEdit.title = "Chi tiết công việc";
      this.sidenavAddEdit.open();
      this.toolbarEdit.setUiAction(this);
      this.UpdateView(); 
      this.renderSelectPicker();
      if(this.InputModel.is_expiry_task)
      {
        this.alertMessage.AlertWarning("Đã quá hạn");
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
  }
  confirmDelete() {
    this.BlockUI();
    let listID: string[] = this.gridList.getSelectedRows(this.tbName);
    this.workspaceService.hRM_Workspace_Delete(listID.join(';')).subscribe(
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
    this.filterInput.account_code = this.appSession.user.code;
    this.projectManagementService.hRM_Project_Management_Task_Search(this.filterInput).subscribe(
      (data: any) => {
        this.gridList.setData(data,this.col_model,this.tbName);
        this.UpdateView();
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
  }
  getDataByID(storedName: string, param: string, keyService: string): void {
    throw new Error('Method not implemented.');
  }
  
  ngOnInit(): void {
    this.initCombobox();
   
    this.setAcction();
    if(this.filterInput.id_referent)
    {
      setTimeout(() => {
        this.isEdit = true;
        this.InputModel = new HRM_Project_Management_ENTITY();
        this.InputModel.id = parseInt(this.filterInput.id_referent);
        this.InputModel.top = 1;
        this.InputModel.account_code = this.appSession.user.code;
        this.hRM_Project_Management_Task_Search(this.InputModel);
      }, 200);
    }else{
      this.LoadData();
    }
  }
  onClickPinTask(v:boolean){
    this.projectManagementService.hRM_Project_Management_Task_Pin(this.InputModel.code,v,this.appSession.user.code).subscribe((respond)=>{
      if(respond['status'] == 0) 
      {
        this.InputModel.is_pin = !this.InputModel.is_pin;
        this.alertMessage.AlertSuccess(respond['message']);
      }
      else this.alertMessage.AlertError(respond['message']);
      this.UpdateView();
    })
  }
  valueStartDate(e:any,col:string){
    if(col == 'start_date')
      this.filterInput.start_date = e;
    if(col == 'stop_date')
      this.filterInput.stop_date = e;
    if(col == 'start_date2')
      this.InputModel.start_date = e;
    if(col == 'stop_date2')
      this.InputModel.stop_date = e;
  }
  initCombobox(){
    this.BlockUI();
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
        }
        this.SelectCreateUserPicker.setList(this.listEmployee);
        this.SelectProgressTaskPicker.setList(this.listEmployee);
        
        if(this.SelectCreateUserPicker2) this.SelectCreateUserPicker2.setList(this.listEmployee);
        if(this.SelectFollowTaskPicker)this.SelectFollowTaskPicker.setList(this.listEmployee); 
        if(this.SelectProgressTaskPicker2)this.SelectProgressTaskPicker2.setList(this.listEmployee);
        // this.SelectOrderByDateAddPicker.setList(this.orderByDateAdd);
        this.UpdateView();
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
    this.BlockUI();
    this.projectManagementService.hRM_Project_Management_Task_Status_Search().subscribe(
      (data:any)=>{
        this.listStatus = data;
        this.SelectStatusTaskPicker.setList(this.listStatus);
        if(this.SelectStatusTaskPicker2)this.SelectStatusTaskPicker2.setList(this.listStatus);
        this.UnBlockUI();
      }
    )
    this.BlockUI();
    var pr = new HRM_Project_Management_ENTITY();
    pr.account_code = this.appSession.user.code;
    this.projectManagementService.hRM_Project_Management_Search(pr).subscribe(
      (data:any)=>{
        this.listProject = data;
        this.SelectProjectPicker.setList(this.listProject);
        this.UnBlockUI();
      }
    )
    this.BlockUI();
    var p1 = new HRM_Project_Management_Task_Type_ENTITY();
    p1.department_code = this.filterInput.department_code;
    this.projectManagementService.hRM_Project_Management_Task_Type_Search(p1).subscribe(
      (data:any)=>{
        this.listType = data;
        this.SelectTypePicker.setList(this.listType);
        if(this.SelectTypeTaskPicker)this.SelectTypeTaskPicker.setList(this.listType);
        this.UnBlockUI();
      }
    )
    this.BlockUI();
    this.projectManagementService.hRM_Project_Management_Task_Proprity_Level_Search(new HRM_Project_Management_Task_Proprity_Level_ENTITY()).subscribe(
      (data:any)=>{
        this.listPriorityLevel = data;
        this.SelectPriorityLevelPicker.setList(this.listPriorityLevel);
        if(this.SelectPriorityLevelPicker2)this.SelectPriorityLevelPicker2.setList(this.listPriorityLevel);
        this.UnBlockUI();
      }
    )
    this.listPercentDone = [];
    for(var i = 10 ; i <= 100 ; i += 10)
    {
      var t = {
        value:i.toString(),
        name:i + ' (%)'
      }
      this.listPercentDone.push(t);
      if(this.SelectPercentDonePicker) this.SelectPercentDonePicker.setList(this.listPercentDone);
    }
    this.BlockUI();
    p = new Department_ENTITY();
    this.departmentService.department_Search(p).subscribe(
      (data: any) => {
        this.listDepartment = data;
        this.SelectDepartmentPicker.setList(this.listDepartment);
        if(this.SelectDepartmentPicker2)this.SelectDepartmentPicker2.setList(this.listDepartment);
        this.UpdateView();
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
  }
  onChangeValueFile(url:string,colName:string){

  }
  valueFileComment(url:string){
    if(this.CommentModel.attach_files && url != '') this.CommentModel.attach_files += ';'
    else this.CommentModel.attach_files = '';
    this.CommentModel.attach_files += url;
    if (url != '') {
      var attach_files = this.CommentModel.attach_files.split(';');
      this.CommentModel['arr_attach_files'] = [];
      attach_files.forEach(file => {
        var file_name = file.split('/')[file.split('/').length - 1]
        this.CommentModel['arr_attach_files'].push({
          url: file,
          name: file_name
        })
      });
    }
    this.UpdateView();
  }
  onSendComment(){
    this.CommentModel.user_add = this.appSession.user.id;
    this.projectManagementService.hRM_Project_Management_Task_Comment_Insert(this.CommentModel).subscribe((respond:any)=>{
      if(respond[0].status == 0){
        this.CommentModel.user_avartar = this.appSession.user.avatar;
        this.CommentModel.user_name = this.appSession.user.lastName + ' ' + this.appSession.user.firstName;
        var t = [this.CommentModel];
        if(this.InputModel.hRM_Project_Management_Task_Comments != null)
        this.InputModel.hRM_Project_Management_Task_Comments.forEach(e=>{
          t.push(e);
        })
        this.InputModel.hRM_Project_Management_Task_Comments = t;
        this.CommentModel = new HRM_Project_Management_Task_Comment_ENTITY();
        this.UpdateView();
      }
    })
  }
  download_file(targetUrl: string, fileName: string):void{
    this.Filesfilepicker.download(targetUrl,fileName);
  }
  onClickNotifi_f(v:any){
    this.filterInput.important = v;
  }
  get getUserNotifi():string{
    if(this.InputModel.create_user != this.InputModel.executor) return (this.appSession.user.code == this.InputModel.create_user)?this.InputModel.executor:this.InputModel.create_user;
    return this.appSession.user.code;
  }
  onClickNotifi(type:string){
    if(type == 'important'){
      this.projectManagementService.hRM_Project_Management_Task_Notification_Update(this.InputModel.code,'important',this.appSession.user.code,this.getUserNotifi).subscribe(respond=>{
        if(respond['status'] == '0'){
          this.InputModel.important = !this.InputModel.important;
          this.alertMessage.AlertSuccess(respond['message']);
          var to = this.InputModel.executor;
          if(this.InputModel.executor == this.appSession.user.code) to = this.InputModel.create_user;
          this.notificationModel.message = 'Đánh dấu quan trọng: '+this.InputModel.name;
          this.notificationModel.arr_to = [];
          this.notificationModel.arr_to.push(to);
          this.notificationModel.link_direct = '/task-manage-list;id='+this.InputModel.id_referent;
          this.notificationModel.user_send = this.appSession.user.firstName +' '+this.appSession.user.lastName;
          this.notificationModel.account_id = this.appSession.user.id;
          this.con_notification['invoke']("Task_Notifi_Remind",this.notificationModel).then((rs)=>{
            console.log(rs);
          });
          this.UpdateView();
        }
      })
    }else if(type == 'remind'){
      this.projectManagementService.hRM_Project_Management_Task_Notification_Update(this.InputModel.code,'remind',this.appSession.user.code,this.getUserNotifi).subscribe(respond=>{
        if(respond['status'] == '0'){
          this.InputModel.remind = (this.InputModel.remind?this.InputModel.remind:0) + 1;
          this.alertMessage.AlertSuccess(respond['message']);
          var to = this.InputModel.executor;
          if(this.InputModel.executor == this.appSession.user.code) to = this.InputModel.create_user;
          this.notificationModel.message = 'Nhắc nhở công việc: '+this.InputModel.name;
          this.notificationModel.arr_to = [];
          this.notificationModel.arr_to.push(to);
          this.notificationModel.link_direct = '/task-manage-list;id='+this.InputModel.id;
          this.notificationModel.user_send = this.appSession.user.firstName +' '+this.appSession.user.lastName;
          this.notificationModel.account_id = this.appSession.user.id;
          this.con_notification['invoke']("Task_Notifi_Remind",this.notificationModel).then((rs)=>{
            console.log(rs);
          });
          this.UpdateView();
        }
      })
    }else if(type == 'remind_messenger'){
      this.projectManagementService.hRM_Project_Management_Task_Notification_Update(this.InputModel.code,'remind_messenger',this.appSession.user.code,this.getUserNotifi).subscribe(respond=>{
        this.InputModel.remind_messenger = (this.InputModel.remind_messenger?this.InputModel.remind_messenger:0) + 1;

          this.alertMessage.AlertSuccess(respond['message']);
          var to = this.InputModel.executor;
          if(this.InputModel.executor == this.appSession.user.code) to = this.InputModel.create_user;
          this.notificationModel.arr_to = [];
          this.notificationModel.client_avt = this.appSession.user.avatar;
          this.notificationModel.arr_to.push(to);
          this.notificationModel.link_direct = '/messenger';
          this.notificationModel.user_send = this.appSession.user.firstName +' '+this.appSession.user.lastName;
          this.notificationModel.message = 'Công việc '+this.InputModel.name;
          this.con_notification['invoke']("Task_Notifi_Remind",this.notificationModel).then((rs)=>{
            console.log(rs);
          });
          this.UpdateView();
      })
    }
  }
  copyInputMessage(item:string){
    let listener = (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (item));
      e.preventDefault();
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 1000);
    };
    
    document.addEventListener('copy', listener);
    document.execCommand('copy');
    document.removeEventListener('copy', listener);
  }
}

