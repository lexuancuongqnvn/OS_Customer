import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { JqgridEditComponent } from 'src/app/shared/jqgrid/jqgrid-edit/jqgrid-edit.component';
import { JqgridListComponent } from 'src/app/shared/jqgrid/jqgrid-list/jqgrid-list.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { InputSelectComponentV2 } from 'src/app/shared/layout/input-control-simple/input-select-v2/input-select-v2.component';
import { InputSelectComponent } from 'src/app/shared/layout/input-control-simple/input-select/input-select.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { DepartmentService, EmployeeService, HRM_Employee_ENTITY, HRM_Project_Management_ENTITY, HRM_Project_Management_Task_ENTITY, HRM_Project_Management_Task_WorkTime_Detail_ENTITY, HRM_Project_Management_Task_WorkTime_ENTITY, HRM_Project_Management_Task_WorkTime_Status_ENTITY, HRM_WorkingTimeService, ProjectManagementService, WorkspaceService } from 'src/app/shared/service-proxies/api-shared';
import { AlertMessageComponent } from 'src/app/shared/sidenav/alert-message/alert-message.component';
import { SidenavAddEditComponent } from 'src/app/shared/sidenav/sidenav-add-edit/sidenav-add-edit.component';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

declare var refreshFooter;
@Component({
  selector: 'app-work-time',
  templateUrl: './work-time.component.html',
  styleUrls: ['./work-time.component.css']
})
export class WorkTimeComponent extends LayoutComponentBase implements OnInit, IUiAction<any>{

  constructor(
    private injector: Injector,
    private appSession: AppSession,
    private hRM_WorkingTimeService:HRM_WorkingTimeService,
    private projectManagementService:ProjectManagementService,
    private employeeService:EmployeeService
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

  getDataByID(storedName: string, param: string, keyService: string): void {
    throw new Error('Method not implemented.');
  }
  isEdit:boolean = false;
  @ViewChild('gridList') gridList: JqgridListComponent;
  @ViewChild('gridWorkTimeEdit') gridWorkTimeEdit: JqgridEditComponent<HRM_Project_Management_Task_WorkTime_Detail_ENTITY>;
  @ViewChild('dialogDelete') dialogDelete: DialogAcctionComponent;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  @ViewChild('toolbarEdit') toolbarEdit: ToolbarComponent;
  @ViewChild('sidenavAddEdit') sidenavAddEdit: SidenavAddEditComponent;
  @ViewChild('alertMessage') alertMessage: AlertMessageComponent;
  @ViewChild('SelectStatusPicker') SelectStatusPicker: InputSelectComponentV2;
  @ViewChild('SelectPicker') SelectPicker: InputSelectComponentV2;
  tbName: string = 'HRM_Project_Management_Task_WorkTime';
  tbName_sub: string = 'HRM_Project_Management_Task_LogTime_Detail';
  filterInput:HRM_Project_Management_Task_WorkTime_ENTITY = new HRM_Project_Management_Task_WorkTime_ENTITY();
  InputModel:HRM_Project_Management_Task_WorkTime_ENTITY = new HRM_Project_Management_Task_WorkTime_ENTITY();
  CurrenFrom:string = EditPageState.view;
  listStatus:HRM_Project_Management_Task_WorkTime_ENTITY[]=[];
  listEmployee:HRM_Employee_ENTITY[] = [];
  level:number =  this.appSession.user.level;

  col_model:any[] = [
    { label: 'Mã', name: 'code', key: true, width: 10 , hidden: true},
    { label: 'Ngày bắt đầu', name: 'start_date_f', width: 10 },
    { label: 'Nhân viên', name: 'employee_name', width: 15 },
    { label: 'Quản lý', name: 'leader_name', width: 15 },
    { label: 'Ủy quyền quản lý', name: 'authorize_approve_worktime_name', width: 20 },
    { label: 'Giờ', name: 'total_hour', width: 10 },
    { label: 'Trạng thái', name: 'status_name', width: 10 }
  ]

  col_model_edit:any[] = [
    { label: 'Mã', name: 'code', key: true, width: 20 , hidden: true,editable: false},
    { label: 'Mã work time', name: 'work_time_code', width: 20 , hidden: true,editable: false},
    { label: 'Dự án', name: 'project_name', key: false, width: 10 , hidden: false,editable: false},
    { label: 'Vấn đề', name: 'task_code', width: 15, hidden: false ,editable: true, sorttype: "select", editoptions: { value: [] }},
    { label: 'Thứ 2', name: 'mo', width: 5, hidden: false ,editable: true, sorttype: 'int',summaryType: "sum",editoptions:{dataEvents: [
      { type: 'change', fn: function(e) {
        refreshFooter('HRM_Project_Management_Task_LogTime_Detail','mo'); 
      } },
      ]}
    },
    { label: 'log', name: 'mo_log', width: 5, hidden: false ,editable: true},
    { label: 'Thứ 3', name: 'tu', width: 5, hidden: false ,editable: true, sorttype: 'int',summaryType: "sum",editoptions:{dataEvents: [
      { type: 'change', fn: function(e) {
        refreshFooter('HRM_Project_Management_Task_LogTime_Detail','tu'); 
      } },
      ]}},
      { label: 'log', name: 'tu_log', width: 5, hidden: false ,editable: true},
    { label: 'Thứ 4', name: 'we', width: 5, hidden: false ,editable: true, sorttype: 'int',summaryType: "sum",editoptions:{dataEvents: [
      { type: 'change', fn: function(e) {
        refreshFooter('HRM_Project_Management_Task_LogTime_Detail','we'); 
      } },
      ]}},
      { label: 'log', name: 'we_log', width: 5, hidden: false ,editable: true},
    { label: 'Thứ 5', name: 'th', width: 5, hidden: false ,editable: true, sorttype: 'int',summaryType: "sum",editoptions:{dataEvents: [
      { type: 'change', fn: function(e) {
        refreshFooter('HRM_Project_Management_Task_LogTime_Detail','th'); 
      } },
      ]}},
      { label: 'log', name: 'th_log', width: 5, hidden: false ,editable: true},
    { label: 'Thứ 6', name: 'fr', width: 5, hidden: false ,editable: true, sorttype: 'int',summaryType: "sum",editoptions:{dataEvents: [
      { type: 'change', fn: function(e) {
        refreshFooter('HRM_Project_Management_Task_LogTime_Detail','fr'); 
      } },
      ]}},
      { label: 'log', name: 'fr_log', width: 5, hidden: false ,editable: true},
    { label: 'Thứ 7', name: 'sa', width: 5, hidden: false ,editable: true, sorttype: 'int',summaryType: "sum",editoptions:{dataEvents: [
      { type: 'change', fn: function(e) {
        refreshFooter('HRM_Project_Management_Task_LogTime_Detail','sa'); 
      } },
      ]}},
      { label: 'log', name: 'sa_log', width: 5, hidden: false ,editable: true},
    { label: 'Chủ nhật', name: 'su', width: 7, hidden: false ,editable: true, sorttype: 'int',summaryType: "sum",editoptions:{dataEvents: [
      { type: 'change', fn: function(e) {
        refreshFooter('HRM_Project_Management_Task_LogTime_Detail','su'); 
      } },
      ]}},
      { label: 'log', name: 'su_log', width: 10, hidden: false ,editable: true},
  ]
  get showsubmit():Boolean{
    return this.InputModel.status == 'B10FBC32-7E55-4A50-B831-C5482344D66D'?true:false;
  }
  get showunsubmit():Boolean{
    return this.InputModel.status == 'E259AB2E-9DB2-4B8D-88B1-FC96429E4EF4'?true:false;
  }
  get showapprove():Boolean{
    return (
      this.InputModel.status == 'E259AB2E-9DB2-4B8D-88B1-FC96429E4EF4' && 
      (this.level == 1 || this.appSession.user.code == this.InputModel.leader_code || this.InputModel.authorize_approve_worktime.split(';').filter(e=>e==this.appSession.user.code).length >0 ))?true:false;
  }
  get showunapprove():Boolean{
    return (this.InputModel.status == '72F83655-F53F-41E5-80CB-A887AC481DC7' && this.appSession.user.code == this.InputModel.leader_code)?true:false;
  }
  onSubmit(){
    this.InputModel.employee_code = this.appSession.user.code;
    this.InputModel.type = 'SUBMIT';
    this.hRM_WorkingTimeService.hRM_Project_Management_Task_WorkTime_Update(this.InputModel).subscribe((respond)=>{
      if(respond['status'] == '0')
        {
          this.alertMessage.AlertSuccess(respond['message']);
          this.InputModel.status = respond['status_wt'];

          this.notificationModel.message = 'Submit work time: '+this.InputModel.start_date_f;
          this.notificationModel.arr_to = this.InputModel.authorize_approve_worktime.split(';');
          this.notificationModel.arr_to.push(this.InputModel.leader_code);
          this.notificationModel.link_direct = '/work-time';
          this.notificationModel.user_send = this.appSession.user.firstName +' '+this.appSession.user.lastName;
          this.notificationModel.account_id = this.appSession.user.id;
          this.con_notification['invoke']("Task_Notifi_All",this.notificationModel).then((rs)=>{
            console.log(rs);
          });
          this.UpdateView();
        }
      else
        this.alertMessage.AlertError(respond['message']);
      
      this.UpdateView();
    },
    (err) => {
        if (err.status == 401) this.Respond401();
    },
    () => {
      this.UnBlockUI();
    });
  } 
  onUnsubmit(){
    this.InputModel.employee_code = this.appSession.user.code;
    this.InputModel.type = 'UNSUBMIT';
    this.hRM_WorkingTimeService.hRM_Project_Management_Task_WorkTime_Update(this.InputModel).subscribe((respond)=>{
      if(respond['status'] == '0')
        {
          this.alertMessage.AlertSuccess(respond['message']);
          this.InputModel.status = respond['status_wt'];
          this.UpdateView();
        }
      else
        this.alertMessage.AlertError(respond['message']);
      
      this.UpdateView();
    },
    (err) => {
        if (err.status == 401) this.Respond401();
    },
    () => {
      this.UnBlockUI();
    });
  }
  onApprove(){
    this.InputModel.employee_code = this.appSession.user.code;
    this.InputModel.type = 'APPROVE';
    this.hRM_WorkingTimeService.hRM_Project_Management_Task_WorkTime_Update(this.InputModel).subscribe((respond)=>{
      if(respond['status'] == '0')
        {
          this.alertMessage.AlertSuccess(respond['message']);
          this.InputModel.status = respond['status_wt'];

          this.notificationModel.message = 'Approved work time: '+this.InputModel.start_date_f;
          this.notificationModel.arr_to = this.InputModel.authorize_approve_worktime.split(';');
          this.notificationModel.arr_to.push(this.InputModel.employee_code);
          this.notificationModel.link_direct = '/work-time';
          this.notificationModel.user_send = this.appSession.user.firstName +' '+this.appSession.user.lastName;
          this.notificationModel.account_id = this.appSession.user.id;
          this.con_notification['invoke']("Task_Notifi_All",this.notificationModel).then((rs)=>{
            console.log(rs);
          });
          this.UpdateView();
        }
      else
        this.alertMessage.AlertError(respond['message']);
      
      this.UpdateView();
    },
    (err) => {
        if (err.status == 401) this.Respond401();
    },
    () => {
      this.UnBlockUI();
    });
  }
  onUnApprove(){
    this.InputModel.employee_code = this.appSession.user.code;
    this.InputModel.type = 'UNAPPROVE';
    this.hRM_WorkingTimeService.hRM_Project_Management_Task_WorkTime_Update(this.InputModel).subscribe((respond)=>{
      if(respond['status'] == '0')
        {
          this.alertMessage.AlertSuccess(respond['message']);
          this.InputModel.status = respond['status_wt'];
          this.UpdateView();
        }
      else
        this.alertMessage.AlertError(respond['message']);
      
      this.UpdateView();
    },
    (err) => {
        if (err.status == 401) this.Respond401();
    },
    () => {
      this.UnBlockUI();
    });
  }
  onSelect(v:any,col:string){
    this.filterInput[col] = v;
  }
  ngOnInit(): void {
    this.setAcction();
    this.initCombobox();
    this.filterInput.account_code = this.appSession.user.code;
    this.LoadData();
  }
  valueStartDate(e:any,col:string){
    this.filterInput[col] = e;
  }
  LoadData() {
    this.BlockUI();
    this.filterInput.employee_code = this.appSession.user.code;
    this.hRM_WorkingTimeService.hRM_Project_Management_Task_WorkTime_Search(this.filterInput).subscribe(
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
  onClickAcction(id: number, storedName: string, param: string, keyService: string, classForm: string): void {
    if(classForm == 'Report'){
      this.navigateByUrl('/dashboard-hrm');
    }
    switch(classForm){
      case EditPageState.add:{
        this.isEdit = true;
        this.InputModel = new HRM_Project_Management_Task_WorkTime_ENTITY();
        setTimeout(() => {
          this.sidenavAddEdit.title = "Thêm mới giờ làm việc";
          this.sidenavAddEdit.open();
          this.toolbarEdit.setUiAction(this);
          this.UpdateView();
          this.gridWorkTimeEdit.setData([]);
          this.UpdateView();
        }, 100);
        break;
      }
      case EditPageState.edit:{

        this.BlockUI();
        this.isEdit = true;
        this.InputModel = new HRM_Project_Management_Task_WorkTime_ENTITY();
        this.hRM_WorkingTimeService.hRM_Project_Management_Task_WorkTime_Bycode(this.appSession.user.code,this.idSelect).subscribe((respond)=>{
          this.InputModel = respond[0];
          if(!this.showsubmit) {
            this.showMessageWarning('Chỉ cho phép sửa trạng thái "Đã Duyệt"');
            // var t = this.getRoleCurren_byFormName(EditPageState.view)
            this.setCurrenFrom(EditPageState.view);
            this.findAndSetAcctionForm();
            this.UpdateView();
            return;
          }
          this.sidenavAddEdit.open();
          this.toolbarEdit.setUiAction(this);
          this.UpdateView(); 
          this.gridWorkTimeEdit.setData(this.InputModel.hRM_Project_Management_Task_WorkTime_Details);
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
        break;
      }
      case EditPageState.delete:{
        this.dialogDelete.open();
        break;
      }
      case EditPageState.save:{
        this.BlockUI();
        try{
          this.InputModel.hRM_Project_Management_Task_WorkTime_Details = [];
          var Subs = this.gridWorkTimeEdit.allData;
          if(Subs.length>0)
          {
            for(var i = 0 ; i < Subs.length ; i++)
            {
              var newrow = new  HRM_Project_Management_Task_WorkTime_Detail_ENTITY();
              for (const [key, value] of Object.entries(Subs[i])) {
                newrow[key] = Subs[i][key];
              }
              this.InputModel.hRM_Project_Management_Task_WorkTime_Details.push(newrow);
            }
          }
        }catch{}
        // this.filterInput = HRM_Project_Management_ENTITY['toJSON'](this.filterInput);
        if(this.InputModel.code){
          this.InputModel.employee_code = this.appSession.user.code;
          this.InputModel.type = 'UPDATE';
          this.hRM_WorkingTimeService.hRM_Project_Management_Task_WorkTime_Update(this.InputModel).subscribe((respond)=>{
            if(respond['status'] == '0')
              this.alertMessage.AlertSuccess(respond['message']);
            else
              this.alertMessage.AlertError(respond['message']);
            
            this.UpdateView();
          },
          (err) => {
              if (err.status == 401) this.Respond401();
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
        this.BlockUI();
        this.isEdit = true;
        this.InputModel = new HRM_Project_Management_Task_WorkTime_ENTITY();
        this.hRM_WorkingTimeService.hRM_Project_Management_Task_WorkTime_Bycode(this.appSession.user.code,this.idSelect).subscribe((respond)=>{
          this.InputModel = respond[0];
          this.sidenavAddEdit.open();
          this.toolbarEdit.setUiAction(this);
          this.UpdateView(); 
          this.gridWorkTimeEdit.setData(this.InputModel.hRM_Project_Management_Task_WorkTime_Details);
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
        break;
      }
      default:break;
    }
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
    // var pr = new HRM_Project_Management_ENTITY();
    // pr.account_code = this.appSession.user.code;
    // this.projectManagementService.hRM_Project_Management_Search(pr).subscribe(
    //   (respond:any)=>{
    //     this.col_model_edit.forEach(e=>{
    //       if(e.name == 'project_code'){
    //         e.editoptions.value=respond;
    //       }
    //     })
    //   }
    // )
    var p = new HRM_Project_Management_Task_ENTITY();
    p.type = 'WT_BYPROJECT';
    this.projectManagementService.hRM_Project_Management_Task_Search(p).subscribe((respond)=>{
      this.col_model_edit.forEach(e=>{
        if(e.name == 'task_code'){
          e.editoptions.value=respond;
        }
      })
    })
    
    let p1 = new HRM_Employee_ENTITY();
    this.employeeService.hRM_Employee_Search(p1).subscribe(
      (data: any) => {
        if(data)
        {
          data.forEach(e=>{
            e.id = e.id;
            e['name'] = e.firstName + ' ' +e.lastName; 
            this.listEmployee.push(e);
          })
        }
        
        this.SelectPicker.setList(data);
        this.UpdateView();
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
    this.hRM_WorkingTimeService.hRM_Project_Management_Task_WorkTime_Status_Search(new HRM_Project_Management_Task_WorkTime_Status_ENTITY()).subscribe((respond)=>{
      this.listStatus = respond;
      this.SelectStatusPicker.setList(this.listStatus);
    })
  }
}
