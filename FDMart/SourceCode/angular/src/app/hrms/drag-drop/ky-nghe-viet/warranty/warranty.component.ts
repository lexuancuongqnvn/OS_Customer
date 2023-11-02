import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { data } from 'jquery';
import moment from 'moment';
import { AppConsts } from 'src/app/app-consts.component';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { JqgridEditComponent } from 'src/app/shared/jqgrid/jqgrid-edit/jqgrid-edit.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { InputSelectComponentV2 } from 'src/app/shared/layout/input-control-simple/input-select-v2/input-select-v2.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { AccountService, DepartmentService, Department_ENTITY, EmployeeService, GenRowTableService, HRM_BranchService, HRM_Branch_ENTITY, HRM_Employee_ENTITY, HRM_Project_Management_ENTITY, HRM_Project_Management_Task_ENTITY, ProjectManagementService, SYS_Account_Group, SYS_GenRowTable, SYS_GenRowTable_Detail, WarrantyService, Warranty_Laptop_ENTITY, Warranty_Laptop_Log_Update_ENTITY, Warranty_Laptop_Print_History_ENTITY } from 'src/app/shared/service-proxies/api-shared';
import { AlertMessageComponent } from 'src/app/shared/sidenav/alert-message/alert-message.component';
import { SidenavAddEditComponent } from 'src/app/shared/sidenav/sidenav-add-edit/sidenav-add-edit.component';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';
// import { Subscription } from 'rxjs';

@Component({
  selector: 'app-warranty',
  templateUrl: './warranty.component.html',
  styleUrls: ['./warranty.component.css']
})
export class WarrantyComponent extends LayoutComponentBase implements OnInit, IUiAction<any>{
  constructor(
    private injector: Injector,
    private _formBuilder: FormBuilder,
    private projectManagementService:ProjectManagementService,
    private appSession: AppSession,
    private warrantyService:WarrantyService,
    private employeeService: EmployeeService,
    private genRowTableService: GenRowTableService,
    private accountService: AccountService,
    private departmentService:DepartmentService,
    private hRM_BranchService:HRM_BranchService
  ) {
    super(injector);
    if(location.pathname == '/customer/warranty'){
      this.project_code = '11C3C647-7D77-4072-902D-4D52A4FB71AE';
      this.tbName = 'Warranty_Laptop_Customer'
    }
    if(location.pathname == '/warehouse/warranty'){
      this.project_code = '1E05A686-B870-4145-901A-9034E9496301';
      this.tbName = 'Warranty_Laptop_Warehouse'
    }
  }
  isEdit:boolean = false;
  isPermission:boolean = false;
  isHistory:boolean = false;
  isHistoryUpdate:boolean = false;
  isLogtime:boolean = false;
  @ViewChild('sideAddEdit',{ static: false }) sideAddEdit: SidenavAddEditComponent;
  @ViewChild('alertMessage',{ static: false }) alertMessage: AlertMessageComponent;
  @ViewChild('SelectWarrantyPicker') SelectWarrantyPicker: InputSelectComponentV2;
  @ViewChild('SelectExecutorPicker') SelectExecutorPicker: InputSelectComponentV2;
  @ViewChild('SelectFollowerPicker') SelectFollowerPicker: InputSelectComponentV2;  
  @ViewChild('SelectBranchPicker') SelectBranchPicker: InputSelectComponentV2;
  @ViewChild('SelectDepartmentFollowerPicker') SelectDepartmentFollowerPicker: InputSelectComponentV2;
  @ViewChild('dialogUpdate') dialogUpdate: DialogAcctionComponent;
  @ViewChild('dialogChangeExecutor') dialogChangeExecutor: DialogAcctionComponent;
  @ViewChild('dialogChangeFollower') dialogChangeFollower: DialogAcctionComponent;
  @ViewChild('dialogBranch') dialogBranch: DialogAcctionComponent;
  @ViewChild('toolbarEdit') toolbarEdit: ToolbarComponent;
  @ViewChild('SelectProjectTopicPicker') SelectProjectTopicPicker: InputSelectComponentV2;
  @ViewChild('SelectIsDonePicker') SelectIsDonePicker: InputSelectComponentV2;
  @ViewChild('gridPermissionEdit') gridPermissionEdit: JqgridEditComponent<SYS_GenRowTable_Detail>;
  tbName: string = '';
  project_code:string = '';
  baseUrl:string = AppConsts.baseUrl;
  filterInput:HRM_Project_Management_Task_ENTITY = new HRM_Project_Management_Task_ENTITY();
  updateTaskModel:HRM_Project_Management_Task_ENTITY = new HRM_Project_Management_Task_ENTITY();
  InputModel:HRM_Project_Management_ENTITY = new HRM_Project_Management_ENTITY();
  WarrantyModel:Warranty_Laptop_ENTITY = new Warranty_Laptop_ENTITY();
  WarrantyFilter:Warranty_Laptop_ENTITY = new Warranty_Laptop_ENTITY();
  eventCurrent: CdkDragDrop<string[]>;
  listEmployee:HRM_Employee_ENTITY[] = [];
  listTaskHistory:Warranty_Laptop_ENTITY[] = [];
  listProjectTopic:HRM_Project_Management_Task_ENTITY[] = [];
  listGenRowTableDetail:SYS_GenRowTable_Detail[] = [];
  listDepartment:Department_ENTITY[] = [];
  listBranchs:HRM_Branch_ENTITY[] = [];
  listPrintHistorys:Warranty_Laptop_Print_History_ENTITY[] = [];
  listPrintHistoryUpdates:Warranty_Laptop_Log_Update_ENTITY[] = [];
  listTask:HRM_Project_Management_Task_ENTITY[] = [];
  isLoaddata:boolean = false;
  listColumn:object = {};
  warranty_type:any[] = [
    {
      code:'SC',
      name:'Sửa chữa'
    },
    {
      code:'BH',
      name:'Bảo hành'
    }
  ]
  list_filter_done:any[] = [
    {
      code:'ALL',
      name:'Tất cả'
    },
    {
      code:'DONE',
      name:'Hoàn thành'
    },
    {
      code:'INPROGRESS',
      name:'Đang làm'
    }
  ]
  col_model_permission_edit:any[] = [
    { label: 'Mã', name: 'code', key: true, width: 10 , hidden: true},
    { label: 'Trường nhập liệu', name: 'namE_VN', width: 8 ,editable: true, sorttype: 'text'},
    { label: 'Bắt buộc nhập', name: 'required', width: 8 ,editable: true, sorttype: 'checkbox'},
    { label: 'Nhóm quyền được phép sửa', name: 'decentralization', width: 100 ,editable: true, sorttype: "multiselect", editoptions: { value: [] ,fieldvalue:'id',fielddisplay:'name'}},
  ]
  OnClose(v:any){
    this.isEdit = !v;
    this.UpdateView();
  }
  onAddTask(task:any): void {
    this.isEdit = true;
    this.WarrantyModel = new Warranty_Laptop_ENTITY();
    this.WarrantyModel.in_task = task.code;
    this.WarrantyModel.des_hdd_unit = 'GB';
    this.WarrantyModel.des_ssd_unit = 'GB';
    this.sideAddEdit.title = 'Thêm mới ';
   this.warrantyService.warranty_Laptop_Search({...new Warranty_Laptop_ENTITY(),type:'GET_DOC_NUMBER',path:location.pathname}as Warranty_Laptop_ENTITY).subscribe(res=>{
     try{
      this.WarrantyModel.doc_number = (parseInt(res[0].doc_number_guess)+1).toString();
     }catch{this.WarrantyModel.doc_number = res[0].doc_number_guess;}
     this.UpdateView();
   })
    setTimeout(() => {
      this.SelectWarrantyPicker.setList(this.warranty_type);
      this.toolbarEdit.setUiAction(this);
    }, 400);
    this.sideAddEdit.open();
  }
  onAdd(): void {
  }
  get disabled():Boolean{
    return (this.getCurrenFrom == EditPageState.viewDetail) ;
  }
  onSelectDialog(v:any,col:string){
    this.updateTaskModel[col] = v;
  }
  onSelect(v:any,col:string){
    this.WarrantyModel[col] = v;
  }
  valueStartDate(v:any,col:string){
    this.WarrantyModel[col] = v;
  } 
  onFilter(v:any,col:string){
    if(this.isLoaddata){
      if(col=='is_done'){
        if(v=='ALL')this.filterInput.percent_done = undefined;
        else if(v=='DONE')this.filterInput.percent_done = 100;
        if(v=='INPROGRESS')this.filterInput.percent_done = 50;
      }else this.filterInput[col] = v;
    }
  }
  onChangeValue(v:any,col:string){
    this.WarrantyModel[col] = v;
  }
  onUpdate(item: any): void {
    
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
      case 'Logtime':{
         var dep = this.InputModel.project_Management_Tasks.find(f=>f.code == this.listTask.find(t=>t.code==this.WarrantyModel.task_code).topic_code).department_code;
        if(dep != this.appSession.user.department && this.appSession.user.level != 1){
          this.alertMessage.AlertError('Lỗi ủy quyền không hợp lệ');
          return;
        }
        this.isLogtime = true;
        this.dialogUpdate.open();
        setTimeout(() => {
          this.SelectExecutorPicker.renderSelectPicker();
          this.SelectExecutorPicker.value = this.appSession.user.code;
          this.SelectExecutorPicker.disabled = true;
          this.SelectExecutorPicker.setList(this.listEmployee);
        }, 100);
        break;
      }
      case 'Print':{
        this.dialogBranch.open();
        setTimeout(() => {
          this.SelectBranchPicker.renderSelectPicker();
          this.SelectBranchPicker.setList(this.listBranchs);
        }, 100);
        break;
      }
      case 'HistoryPrint':{
        this.isHistory = true;
        this.BlockUI('Loading data history...');
        var pr = new Warranty_Laptop_Print_History_ENTITY();
        pr.doc_code = this.WarrantyModel.code;
        this.warrantyService.warranty_Laptop_Print_History_Search(pr).subscribe(res=>{
          this.listPrintHistorys = res;
          this.UpdateView();
          this.UnBlockUI();
        },
        (err) => {
            if (err.status == 401) {
              this.Respond401();
            }
        },
        () => {
          this.UnBlockUI();
        })
        break;
      }
      case 'HistoryUpdate':{
        this.isHistoryUpdate = true;
        this.BlockUI('Loading data history update...');
        var p = new Warranty_Laptop_Log_Update_ENTITY();
        p.task_code = this.WarrantyModel.task_code;
        this.warrantyService.warranty_Laptop_Log_Update_Search(p).subscribe(res=>{
          this.listPrintHistoryUpdates = res;
          this.UpdateView();
          this.UnBlockUI();
        },
        (err) => {
            if (err.status == 401) {
              this.Respond401();
            }
        },
        () => {
          this.UnBlockUI();
        })
        break;
      }
      case EditPageState.save:{
        if(this.isPermission){
          let input = new SYS_GenRowTable();
          input.id = 0;
          input.syS_GenRowTable_Detail = [];
          var Subs3 = this.gridPermissionEdit.allData;
          if(Subs3.length>0)
          {
            for(var i = 0 ; i < Subs3.length ; i++)
            {
              var newrow3 = new  SYS_GenRowTable_Detail();
              for (const [key, value] of Object.entries(Subs3[i])) {
                newrow3[key] = Subs3[i][key];
              }
              newrow3 = SYS_GenRowTable_Detail.fromJS(newrow3);
              input.syS_GenRowTable_Detail.push(newrow3);
            }
          }
          this.genRowTableService.sYS_GenRowTable_Update_Detail(input).subscribe(
            (data: any) => {
              this.showSuccess()
              location.reload();
            },
            (err) => this.UnBlockUI(),
            () => {
              this.UnBlockUI();
            })
        }else{
          if(this.CheckValid) return;
          if(!this.WarrantyModel.code){
            
            let pr = new HRM_Project_Management_Task_ENTITY();
            pr.project_code = this.project_code;
            pr.in_task = this.WarrantyModel.in_task;
            pr.create_user = this.appSession.user.code;
            pr.executor = this.appSession.user.code;
            pr.task_content = this.WarrantyModel.machine_status;
            pr.name = this.WarrantyModel.des_model;
            pr.start_date = moment();
            pr.stop_date = moment();
            pr.percent_done = 0;
            pr.type = 'SCT_WARRANTY';
            this.warrantyService.warranty_Laptop_Search(
              {
                ... new Warranty_Laptop_ENTITY(),
                doc_number:this.WarrantyModel.doc_number,
                type:'SCT_WARRANTY'
              } as Warranty_Laptop_ENTITY
            ).subscribe(res=>{
              if(!res[0]['doc_number']){
                this.alertMessage.AlertError(res[0]['des_notes']);
                return;
              }
              this.projectManagementService.hRM_Project_Management_Task_Insert(pr).subscribe((respond)=>{
                if(respond['status'] == '0')
                {
                  this.WarrantyModel.task_code = respond['ref_code'];
                  this.WarrantyModel.user_login = this.appSession.user.code;
                  this.WarrantyModel.topic_code = respond['ref_topic_code'];
                  this.WarrantyModel.path = location.pathname;
                  
                  this.warrantyService.warranty_Laptop_Inserst(this.WarrantyModel).subscribe(
                    (respond: any) => {
                      if(respond['status'] == '0'){
                        this.sideAddEdit.close();
                        this.showMessageSuccess(respond['message']);
                      }else
                      {
                        this.alertMessage.AlertError(respond['message'])
                      }
                       setTimeout(() => {
                        this.onLoadProject();
                       }, 500);       
                    },
                    (err) => this.UnBlockUI(),
                    () => {
                      this.UnBlockUI();
                    })
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
            })
            
            this.UpdateView();
          }else{
            this.WarrantyModel.type = 'UPDATE';
            this.WarrantyModel.path = location.pathname;
            this.WarrantyModel.move_from_account = this.appSession.user.code;
            this.warrantyService.warranty_Laptop_Update(this.WarrantyModel).subscribe(
              (respond: any) => {
                if(respond['status'] == '0'){
                  this.showMessageSuccess(respond['message']);
                  this.sideAddEdit.close();
                  this.UpdateView();
                  this.onLoadProject();
                }else
                {
                  this.alertMessage.AlertError(respond['message'])
                }        
              },
              (err) => this.UnBlockUI(),
              () => {
                this.UnBlockUI();
              })
            this.UpdateView();
          }
        }
        break;
      }
      case 'Permission':
        this.isEdit = true;
        this.isPermission = true;
        this.UpdateView();
        setTimeout(() => {
          this.gridPermissionEdit.setData(this.listGenRowTableDetail);
        }, 100);
        break;
      default:break;
    }
  }
  getDataByID(storedName: string, param: string, keyService: string): void {
    throw new Error('Method not implemented.');
  }
  
  onClickSerial(task:any){
    this.isPermission = false;
    this.isHistory = false;
    this.isHistoryUpdate = false;
    this.isEdit = true;
    this.WarrantyModel = new Warranty_Laptop_ENTITY();
    this.WarrantyModel.task_code = task.code;
    this.WarrantyModel.path = location.pathname;
    this.warrantyService.warranty_Laptop_Search(this.WarrantyModel).subscribe((res:Warranty_Laptop_ENTITY[])=>{
      this.WarrantyModel = res[0];
      this.sideAddEdit.title = 'Chỉnh sửa ';
      setTimeout(() => {
        this.SelectWarrantyPicker.setList(this.warranty_type);
        this.toolbarEdit.setUiAction(this);
      }, 200);
      this.sideAddEdit.open();
      this.UpdateView();
    })
    var pr = new Warranty_Laptop_ENTITY();
    pr.user_login= this.appSession.user.code;
    pr.task_code = task.code;
    pr.path = location.pathname
    this.warrantyService.warranty_Laptop_History_Search(pr).subscribe((res:Warranty_Laptop_ENTITY[])=>{
      this.listTaskHistory = res;
      this.UpdateView();
    })
    
  }
  drop(event: CdkDragDrop<string[]>) {
    this.isLogtime = false;
    this.eventCurrent = event;
    if (event.previousContainer === event.container) {
      var dep = this.InputModel.project_Management_Tasks.find(f=>f.code == event.container.data[event.currentIndex]['topic_code']).department_code;
      if(dep != this.appSession.user.department && this.appSession.user.level != 1){
        this.showMessageError('Lỗi ủy quyền không hợp lệ');
        return;
      }
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.warrantyService.warranty_Laptop_Update({
        ...new Warranty_Laptop_ENTITY(),
        task_code:event.container.data[event.currentIndex]['code'],
        topic_code:event.container.data[event.currentIndex]['topic_code'],
        drop_index:event.currentIndex,
        type:'INDEX'
      } as Warranty_Laptop_ENTITY).subscribe(res=>{})
    } else {
      var dep1 = this.InputModel.project_Management_Tasks.find(f=>f.code == event.previousContainer.data[event.previousIndex]['topic_code']).department_code;
      if(dep1 != this.appSession.user.department && this.appSession.user.level != 1){
        this.showMessageError('Lỗi ủy quyền không hợp lệ');
        return;
      }
      this.updateTaskModel = new HRM_Project_Management_Task_ENTITY();
      this.dialogUpdate.open();
      setTimeout(() => {
        this.SelectExecutorPicker.renderSelectPicker();
        this.SelectExecutorPicker.disabled = false;
        this.SelectExecutorPicker.setList(this.listEmployee);
      }, 100);
    }
  }
  onLoadGenrowTable(){
    this.BlockUI()
    this.genRowTableService.sYS_GenRowTable_Detail_Search({
      ...new SYS_GenRowTable_Detail(),
      tablE_NAME:this.tbName,
      userID:this.appSession.user.id
    } as SYS_GenRowTable_Detail).subscribe((data:SYS_GenRowTable_Detail[])=>{
      this.listGenRowTableDetail = data;
      data.forEach(d=>{
        if(d.decentralization.split(';').includes(this.appSession.user.roleID.toString()) || this.appSession.user.level == 1)
          this.listColumn[d.columN_NAME] = false;
        else 
          this.listColumn[d.columN_NAME] = true;

        this.listColumn[d.columN_NAME+'_required'] = d.required;
      })
      this.UpdateView();
    })
  }
  onLoadGroupUser(){
    var p = new SYS_Account_Group();
    p.accounT_ID = this.appSession.user.id;
    p.type = 'ALL';
    this.accountService.sYS_Account_Group_Search(p).subscribe(res=>{
      this.col_model_permission_edit[3].editoptions.value = res;
    })
  }
  isLinear = false;
  ngOnInit(): void {
    this.filterInput.percent_done = 50;
    this.initcombobox();
    this.onLoadProject();
    this.onLoadGenrowTable();
    this.onLoadGroupUser();
  }
  onChangeExecutor(item:any){
    var dep = this.InputModel.project_Management_Tasks.find(f=>f.code == item['topic_code']).department_code;
      if(dep != this.appSession.user.department && this.appSession.user.level != 1){
        this.showMessageError('Lỗi ủy quyền không hợp lệ');
        return;
      }
    this.updateTaskModel.code = item.code;
    this.updateTaskModel.topic_code = item.topic_code;
    this.dialogChangeExecutor.open();
    setTimeout(() => {
      this.SelectExecutorPicker.renderSelectPicker();
      this.SelectExecutorPicker.disabled = false;
      this.SelectExecutorPicker.setList(this.listEmployee);
    }, 100);
  } 
  onChangeFollower(item:any){
    this.updateTaskModel.code = item.code;
    this.updateTaskModel.topic_code = item.topic_code;
    this.dialogChangeFollower.open();
    setTimeout(() => {
      this.SelectFollowerPicker.renderSelectPicker();
      this.SelectFollowerPicker.setList(this.listEmployee.filter(f=>!item.followers || !item.followers.split(';').includes(f.code)));
      this.SelectDepartmentFollowerPicker.renderSelectPicker();
      this.SelectDepartmentFollowerPicker.setList(this.listDepartment.filter(f=>!item.department_followers || !item.department_followers.split(';').includes(f.code)));
    }, 100);
  }
  confirmChangeExecutor(){
    this.warrantyService.warranty_Laptop_Update({... new Warranty_Laptop_ENTITY()
    , task_code: this.updateTaskModel.code
    , move_to_account: this.updateTaskModel.executor
    , move_from_account: this.appSession.user.code
    , topic_code: this.updateTaskModel.topic_code
    , path:location.pathname
    ,type : 'EXECUTOR'
  } as Warranty_Laptop_ENTITY).subscribe((res=>{
      if(res['status'] == 0) this.showMessageSuccess(res['message'])
      this.onLoadProject();
      this.notificationModel.message = 'Phân công việc bảo hành máy';
      this.notificationModel.arr_to = this.updateTaskModel.executor.split(';');
      this.notificationModel.link_direct = location.pathname;
      this.notificationModel.user_send = this.appSession.user.firstName +' '+this.appSession.user.lastName;
      this.notificationModel.account_id = this.appSession.user.id;
      this.con_notification['invoke']("Task_Notifi_All",this.notificationModel).then((rs)=>{
        console.log(rs);
      });
    }))
  }
  confirmChangeFollower(){
    this.warrantyService.warranty_Laptop_Update({... new Warranty_Laptop_ENTITY()
    , task_code: this.updateTaskModel.code
    , move_to_account: this.updateTaskModel.followers
    , move_from_account: this.appSession.user.code
    , topic_code: this.updateTaskModel.topic_code
    , path:location.pathname
    , department_followers:this.updateTaskModel.department_followers
    ,type : 'FOLLOWER'
  } as Warranty_Laptop_ENTITY).subscribe((res=>{
      if(res['status'] == 0) this.showMessageSuccess(res['message']);
      this.notificationModel.message = 'Bảo hành máy';
      this.notificationModel.arr_to = [...this.updateTaskModel.followers.split(';'),...res['list_employee_tag'].split(';')];
      this.notificationModel.link_direct = location.pathname;
      this.notificationModel.user_send = this.appSession.user.firstName +' '+this.appSession.user.lastName;
      this.notificationModel.account_id = this.appSession.user.id;
      this.con_notification['invoke']("Task_Notifi_All",this.notificationModel).then((rs)=>{
        console.log(rs);
      });
      this.onLoadProject();
    }))
  }
  confirmUpdate(){
    if(!this.updateTaskModel.hour_done) {
      this.showMessageError('"Thời gian hoàn thành công việc" không được phép trống');
      setTimeout(() => {
        this.dialogUpdate.open();
        this.SelectExecutorPicker.renderSelectPicker();
        this.SelectExecutorPicker.disabled = false;
        this.SelectExecutorPicker.setList(this.listEmployee);
      }, 100);
    }
    else if(!this.updateTaskModel.logtime_description) {
      this.showMessageError('"Diễn giải công việc" không được phép trống');
      setTimeout(() => {
        this.dialogUpdate.open();
        this.SelectExecutorPicker.renderSelectPicker();
        this.SelectExecutorPicker.disabled = false;
        this.SelectExecutorPicker.setList(this.listEmployee);
      }, 100);
    }
    else if(!this.updateTaskModel.executor) {
      this.showMessageError('"Người phụ trách tiếp theo" không được phép trống');
      setTimeout(() => {
        this.dialogUpdate.open();
        this.SelectExecutorPicker.renderSelectPicker();
        this.SelectExecutorPicker.disabled = false;
        this.SelectExecutorPicker.setList(this.listEmployee);
      }, 100);
    }else {
      this.BlockUI();
      let topic_code = '';
      let task_code = '';
      let drop_index = this.WarrantyModel.drop_index;
      var pr = new Warranty_Laptop_ENTITY();
      if(!this.isLogtime){
        let arr_task_old=[];
        this.eventCurrent.container.data.forEach(old=>{
          arr_task_old.push(old['id']);
        })
    
        transferArrayItem(this.eventCurrent.previousContainer.data,
          this.eventCurrent.container.data,
          this.eventCurrent.previousIndex,
          this.eventCurrent.currentIndex);
       
        this.eventCurrent.container.data.forEach(old=>{
          if(arr_task_old.indexOf(old['id']) == -1) {
            task_code = old['code'];
          }
        })
        topic_code = this.InputModel.project_Management_Tasks.find(f=>f.id == parseInt(this.eventCurrent.container.element.nativeElement.id.replace('List-',''))).code;
        drop_index = this.eventCurrent.currentIndex;
      }else{
        topic_code = this.WarrantyModel.topic_code;
        task_code = this.WarrantyModel.task_code;
        pr.type = 'LOGTIME';
      }
      
      pr.topic_code = topic_code;
      pr.move_from_account = this.appSession.user.code;
      pr.move_to_account = this.updateTaskModel.executor;
      pr.hour_done = this.updateTaskModel.hour_done;
      pr.task_code = task_code;
      pr.logtime_description = this.updateTaskModel.logtime_description;
      pr.path = location.pathname
      pr.drop_index = drop_index;
  
      this.warrantyService.warranty_Laptop_Update(pr).subscribe(res=>{
        
        if(res['status'] == 0){
          this.showMessageSuccess(res['message']);
            this.onLoadProject();
            if(!this.isLogtime){
              this.notificationModel.message = 'Công việc mới';
              this.notificationModel.arr_to = pr.move_to_account.split(';');
              this.notificationModel.link_direct = '/warranty';
              this.notificationModel.user_send = this.appSession.user.firstName +' '+this.appSession.user.lastName;
              this.notificationModel.account_id = this.appSession.user.id;
              this.con_notification['invoke']("Task_Notifi_All",this.notificationModel).then((rs)=>{
                console.log(rs);
              });
            }
          }  else
            this.showMessageError(res['message']);
        this.isLogtime = false;
      })
    }
  }
  confirmBranch(){
    if(this.WarrantyModel.branch_code){
      this.PrintDocWarranty();
    }else{
      this.dialogBranch.open();
        setTimeout(() => {
          this.SelectBranchPicker.renderSelectPicker();
          this.SelectBranchPicker.setList(this.listBranchs);
        }, 100);
    }
  }
  initcombobox(){
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
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
    var p2 = new Department_ENTITY();
    this.departmentService.department_Search(p2).subscribe(
      (data: any) => {
        this.listDepartment = data;
       
        this.UpdateView();
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
    var p3 = new HRM_Branch_ENTITY();
    this.hRM_BranchService.hRM_Branch_Search(p3).subscribe(
      (data: any) => {
        this.listBranchs = data;
        this.UpdateView();
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
  }
  onLoadProject(){
    this.projectManagementService.hRM_Project_Management_Search_ByCode(this.project_code).subscribe((respond)=>{
      this.InputModel = respond[0];
      let lst = [];
      this.InputModel.project_Management_Tasks.forEach(f=>{
        lst.push({
          code:f.code,
          name:f.name
        });
      })
      if(!this.filterInput.topic_code){
        this.SelectProjectTopicPicker.setList(lst);
        this.SelectIsDonePicker.setList(this.list_filter_done);
      }
      
      this.BlockUI();
      this.filterInput.account_code = this.appSession.user.code;
      this.filterInput.project_code = this.project_code;
      
      this.projectManagementService.hRM_Project_Management_Task_Search(this.filterInput).subscribe(
        (res_list_task: HRM_Project_Management_Task_ENTITY[]) => {
          if(this.filterInput.percent_done == 100) res_list_task = res_list_task.filter(e=>e.percent_done == 100);
          else if(this.filterInput.percent_done == 50) res_list_task = res_list_task.filter(e=>e.percent_done != 100);
          this.warrantyService.warranty_Laptop_Search({
            ...new Warranty_Laptop_ENTITY(),
            path:location.pathname,
            des_model:this.WarrantyFilter.des_model,
            des_sevice_tag:this.WarrantyFilter.des_sevice_tag,
            machine_status:this.WarrantyFilter.machine_status
          } as Warranty_Laptop_ENTITY).subscribe((res_warranty:Warranty_Laptop_ENTITY[])=>{
            this.InputModel.project_Management_Tasks.forEach(f=>{
              let task_orther = this.InputModel.project_Management_Tasks.filter(oth=>oth.code != f.code);
              let cdkDropListConnectedTo = [];
              task_orther.forEach(to=>{
                cdkDropListConnectedTo.push('List-'+to.id);
              })
              this.listTask = res_list_task;
              let data = res_list_task.filter(lst=>lst.in_task == f.code && res_warranty.filter(e=>e.task_code == lst.code).length > 0);
              data.forEach(task=>{
                task['branch_name'] = res_warranty.find(e=>e.task_code == task.code)?res_warranty.find(e=>e.task_code == task.code).branch_name:'';
                task['des_sevice_tag'] = res_warranty.find(e=>e.task_code == task.code)?res_warranty.find(e=>e.task_code == task.code).des_sevice_tag:'';
              })
              f['is_block'] = (this.appSession.user.department == f.department_code || this.appSession.user.level == 1 || this.appSession.user.username.toUpperCase() == 'ROOT')
              f['listID'] = cdkDropListConnectedTo;
              f['data'] = data;
            })
            this.isLoaddata = true;
            
            this.UpdateView();
            this.UnBlockUI();
           
          })
        },
        (err) => this.UnBlockUI(),
        () => {
          this.UnBlockUI();
        }
      )
     
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
  PrintDocWarranty(){
    this.BlockUI('Đang tải phiếu biên nhận...');
    this.WarrantyModel.employee_code = this.appSession.user.code;
    this.warrantyService.warranty_Laptop_PrintDocWarranty(this.WarrantyModel).subscribe(res=>{
      if(res['link_file'])      
        {
          this.WarrantyModel['link_file'] = this.baseUrl+ res['link_file'];
          setTimeout(() => {
            $('#a-print-newtag')[0].click();
          }, 100);
          this.UnBlockUI();
        }else
        this.alertMessage.AlertError(res['message'])
    },
    (err) => {
        if (err.status == 401) {
          this.Respond401();
        }
    },
    () => {
      this.UnBlockUI();
    })
  }
}
