import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import moment, { Moment } from 'moment';
import { AppConsts } from 'src/app/app-consts.component';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { JqgridEditComponent } from 'src/app/shared/jqgrid/jqgrid-edit/jqgrid-edit.component';
import { JqgridListComponent } from 'src/app/shared/jqgrid/jqgrid-list/jqgrid-list.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { InputSelectComponentIMG } from 'src/app/shared/layout/input-control-simple/input-select-img/input-select-img.component';
import { InputSelectComponentV2 } from 'src/app/shared/layout/input-control-simple/input-select-v2/input-select-v2.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { User } from 'src/app/shared/models/system/account';
import { DepartmentService, Department_ENTITY, EmployeeService, HRM_Employee_ENTITY, HRM_Branch_ENTITY,HRM_BranchService, HRM_TimeSheet_Attendance_ENTITY, HRM_TimeSheet_Attendance_Status_ENTITY, HRM_TimeSheet_Attendance_Type_Off_ENTITY, TimeSheetService, Department_Position_ENTITY, HRM_TimeSheet_Employee_Soon_Late_Register_Type_ENTITY, AcctionService, SYS_ActionsOnTable_ENTITY, Create_Request_Action_ENTITY, HRM_TimeSheet_Work_Shift_ENTITY } from 'src/app/shared/service-proxies/api-shared';
import { AlertMessageComponent } from 'src/app/shared/sidenav/alert-message/alert-message.component';
import { SidenavAddEditComponent } from 'src/app/shared/sidenav/sidenav-add-edit/sidenav-add-edit.component';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-employee-attendance',
  templateUrl: './employee-attendance.component.html',
  styleUrls: ['./employee-attendance.component.css'],
})
export class EmployeeAttendanceComponent  extends LayoutComponentBase  implements OnInit, IUiAction<any>
{
  constructor(
    private injector: Injector,
    private timeSheetService: TimeSheetService,
    private departmentService:DepartmentService,
    private employeeService: EmployeeService,
    private branchService:HRM_BranchService,
    private appSession: AppSession,
    private acctionService: AcctionService
  ) {
    super(injector);
  }

  isEdit: boolean = false;
  @ViewChild('gridList') gridList: JqgridListComponent;
  @ViewChild('gridMenuEdit')  gridMenuEdit: JqgridEditComponent<HRM_TimeSheet_Attendance_ENTITY>;
  @ViewChild('dialogDelete') dialogDelete: DialogAcctionComponent;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  @ViewChild('toolbarEdit') toolbarEdit: ToolbarComponent;
  @ViewChild('sidenavAddEdit') sidenavAddEdit: SidenavAddEditComponent;
  @ViewChild('alertMessage') alertMessage: AlertMessageComponent;
  @ViewChild('SelectStatusApprovePicker') SelectStatusApprovePicker: InputSelectComponentV2;
  @ViewChild('SelectDepartmentPicker') SelectDepartmentPicker: InputSelectComponentV2;
  @ViewChild('SelectPositionPicker') SelectPositionPicker: InputSelectComponentV2;
  @ViewChild('SelectBranchPicker') SelectBranchPicker: InputSelectComponentV2;
  @ViewChild('SelectCheckerPicker') SelectCheckerPicker: InputSelectComponentIMG;
  @ViewChild('SelectFollowerPicker') SelectFollowerPicker: InputSelectComponentIMG;
  @ViewChild('SelectEmployeePicker') SelectEmployeePicker: InputSelectComponentV2;
  @ViewChild('SelectTypeoffPicker') SelectTypeoffPicker: InputSelectComponentV2;
  @ViewChild('SelectEmployee_replacePicker') SelectEmployee_replacePicker: InputSelectComponentIMG;
  @ViewChild('SelectUser_approvePicker') SelectUser_approvePicker: InputSelectComponentV2;
  @ViewChild('SelectStatuscodePicker') SelectStatuscodePicker: InputSelectComponentV2;
  @ViewChild('SelectFilterTypePicker') SelectFilterTypePicker: InputSelectComponentV2;
  @ViewChild('SelectWorkShiftPicker') SelectWorkShiftPicker: InputSelectComponentV2;
  tbName: string = 'HRM_TimeSheet_Attendance';
  filterInput:HRM_TimeSheet_Attendance_ENTITY = new HRM_TimeSheet_Attendance_ENTITY();
  InputModel:HRM_TimeSheet_Attendance_ENTITY = new HRM_TimeSheet_Attendance_ENTITY();
  CurrenFrom:string = EditPageState.view;
  listStatus:HRM_TimeSheet_Attendance_Status_ENTITY[] = [];
  listDepartment:Department_ENTITY[] = [];    
  listType_off:HRM_TimeSheet_Attendance_Type_Off_ENTITY[]=[];
  listEmployee:HRM_Employee_ENTITY[] = [];
  listEmployeePermission:HRM_Employee_ENTITY[] = [];
  listBranch:HRM_Branch_ENTITY[]=[];
  listEmployeePosition:Department_Position_ENTITY[]=[];
  listBtnApprove:SYS_ActionsOnTable_ENTITY[] = [];
  listWorkShift:HRM_TimeSheet_Work_Shift_ENTITY[] = [];

  listType:any[] = [{
    code:'1',
    name:'Của tôi'
  },{
    code:'2',
    name:'Tôi duyệt'
  },{
    code:'3',
    name:'Chuyển tiếp'
  }]
  col_model: any[] = [
    { label: 'Mã', name: 'code', key: true, width: 10 , hidden: true},
    { label: 'Người yêu cầu', name: 'request_account_name', width: 15 },
    { label: 'Trạng thái duyệt', name: 'approve_status_html', width: 15 },
    { label: 'Ngày yêu cầu', name: 'request_date_f', width: 15 },
    { label: 'Từ ngày', name: 'start_datetime_f', width: 10 },
    { label: 'Đến ngày', name: 'end_datetime_f', width: 10 },
    { label: 'Người làm thay', name: 'employee_name_replace', width: 15 },
    { label: 'Lý do', name: 'reason', width: 15 },
    { label: 'Người duyệt', name: 'checker_name', width: 10 },
  ];
  get showApprove():boolean{
    return this.InputModel.checker_code == this.appSession.user.code && this.listBtnApprove.filter(e=>e.classForm.toUpperCase() == 'APPROVE').length>0;
  }
  get showUnApprove():boolean{
    return this.InputModel.checker_code == this.appSession.user.code && this.listBtnApprove.filter(e=>e.classForm.toUpperCase() == 'UNAPPROVE').length>0;
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
  onSelectDepartment(v:any): void {
    this.InputModel.department_code = v;
  }
  onClickAcction(
    id: number,
    storedName: string,
    param: string,
    keyService: string,
    classForm: string
  ): void {
    switch (classForm) {
      case EditPageState.add: {
        this.isEdit = true;
        this.InputModel = new HRM_TimeSheet_Attendance_ENTITY();
        setTimeout(() => {
          this.sidenavAddEdit.title = 'Tạo đơn nghỉ phép';
          this.sidenavAddEdit.open();
          this.loadComboboxEmployee();
          this.loadComboboxBranch();
          this.loadComboboxTypeoff();
          this.loadComboboxDepartmentPosition();
          this.LoadWorkShift();
          this.toolbarEdit.setUiAction(this);
          this.UpdateView();
        }, 100);
        break;
      }
      case EditPageState.edit: {
        this.BlockUI();
        this.LoadWorkShift();
        this.isEdit = true;
        var pr = new HRM_TimeSheet_Attendance_ENTITY();
        pr.code = this.idSelect;
        pr.login_account = this.appSession.user.code;
        pr.type = this.filterInput.type;
        this.timeSheetService
          .hRM_TimeSheet_Attendance_Search(pr)
          .subscribe(
            (respond) => {
              this.InputModel = respond[0];
              if(this.InputModel.approve_status != "A2BA3E54-FAF2-4611-AFBB-D28B276C9658")
              {
                this.showMessageError('Lỗi không thể sửa đơn ở trạng thái '+ this.InputModel.status_name);
                this.setCurrenFrom(EditPageState.view);
                return;
              }
              this.sidenavAddEdit.title = 'Sửa đơn nghỉ phép';
              this.sidenavAddEdit.open();
              this.listEmployeePermission = [];
              setTimeout(() => {
                this.loadComboboxEmployee();
                this.loadComboboxBranch();
                this.loadComboboxTypeoff();
                this.loadComboboxDepartmentPosition();
              }, 500);
              this.toolbarEdit.setUiAction(this);
              this.UpdateView();
            },
            (err) => {
              if (err.status == 401) {
                this.Respond401();
              }
            },
            () => {
              this.UnBlockUI();
            }
          );
        break;
      }
      case EditPageState.delete: {
        this.dialogDelete.open();
        break;
      }
      case EditPageState.save: {
        this.BlockUI();

        if (!this.InputModel.code) {
          this.InputModel.request_account = this.appSession.user.code;
          this.timeSheetService.hRM_TimeSheet_Attendance_Insert(this.InputModel)
            .subscribe(
              (respond) => {
                if (respond['status'] == '0') {
                  this.InputModel.code = respond['ref_code'];
                  this.notificationModel.message = 'Bạn có đơn yêu cầu nghỉ phép mới';
                  this.alertMessage.AlertSuccess(respond['message']);
                  this.notificationModel.arr_to = this.InputModel.checker_code.split(';');
                  this.notificationModel.link_direct = '/timesheet/attendance';
                  this.notificationModel.user_send = this.appSession.user.firstName +' '+this.appSession.user.lastName;
                  this.notificationModel.account_id = this.appSession.user.id;
                  this.con_notification['invoke']("Task_Notifi_All",this.notificationModel).then((rs)=>{
                    console.log(rs);
                  });
                } else this.alertMessage.AlertError(respond['message']);
                this.UpdateView();
              },
              (err) => {
                if (err.status == 401) {
                  this.Respond401();
                }
              },
              () => {
                this.UnBlockUI();
              }
            );
        } else {
          this.timeSheetService.hRM_TimeSheet_Attendance_Update(this.InputModel)
            .subscribe(
              (respond) => {
                if (respond['status'] == '0') {
                  if(respond['is_change_checker'] == 0){
                    this.notificationModel.message = 'Bạn có đơn yêu cầu nghỉ phép mới';
                    this.alertMessage.AlertSuccess(respond['message']);
                    this.notificationModel.arr_to = respond['checker'].split(';');
                    this.notificationModel.link_direct = '/timesheet/attendance';
                    this.notificationModel.user_send = this.appSession.user.firstName +' '+this.appSession.user.lastName;
                    this.notificationModel.account_id = this.appSession.user.id;
                    this.con_notification['invoke']("Task_Notifi_All",this.notificationModel).then((rs)=>{
                      console.log(rs);
                    });
                  }
                  this.alertMessage.AlertSuccess(respond['message']);
                  this.LoadData();
                } else this.alertMessage.AlertError(respond['message']);

                this.UpdateView();
              },
              (err) => {
                if (err.status == 401) {
                  this.Respond401();
                }
              },
              () => {
                this.UnBlockUI();
              }
            );
        }

        break;
      }
      case EditPageState.search: {
        this.LoadData();
        break;
      }
      case EditPageState.viewDetail: {
        this.BlockUI();
        this.LoadWorkShift();
        this.isEdit = true;
        var pr = new HRM_TimeSheet_Attendance_ENTITY();
        pr.code = this.idSelect;
        pr.login_account = this.appSession.user.code;
        pr.type = this.filterInput.type;
        this.timeSheetService.hRM_TimeSheet_Attendance_Search(pr)
          .subscribe(
            (respond) => {
              this.InputModel = respond[0];
              this.sidenavAddEdit.title = 'Chi tiết đơn nghỉ phép';
              this.sidenavAddEdit.open();
              this.listEmployeePermission = [];
             setTimeout(() => {
              this.loadComboboxEmployee();
              this.loadComboboxBranch();
              this.loadComboboxTypeoff();
              this.loadComboboxDepartmentPosition();
             }, 500);
              this.toolbarEdit.setUiAction(this);
              this.UpdateView();
            },
            (err) => {
              if (err.status == 401) {
                this.Respond401();
              }
            },
            () => {
              this.UnBlockUI();
            }
          );
        break;
      }
     
      default:
        break;
    }
  }
  getDataByID(storedName: string, param: string, keyService: string): void {
    throw new Error('Method not implemented.');
  }
  confirmDelete() {
    this.BlockUI();
    var p = new HRM_TimeSheet_Attendance_ENTITY();
    p.code = this.idSelect;
    // this.timeSheetService.hRM_TimeSheet_Work_Shift_Actions(p).subscribe(
    //   (respond: any) => {
    //     if (respond['status'] == '0') {
    //       this.showMessageSuccess(respond['message']);
    //       this.LoadData();
    //       this.onSearch();
    //     } else {
    //       this.showMessageError(respond['message']);
    //     }
    //   },
    //   (err) => this.UnBlockUI(),
    //   () => {
    //     this.UnBlockUI();
    //   }
    // );
    this.UpdateView();
  }
  LoadPermission(){
    var user = new User();
    user = this.appSession.user;
    this.acctionService.acction_Search_byTableName(user.id, 'HRM_TimeSheet_Attendance_Approved').subscribe(
      (data: any[]) => {
        this.listBtnApprove = data;
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    );
  }
  LoadData() {
    this.BlockUI();
    this.filterInput.login_account = this.appSession.user.code;
    this.timeSheetService.hRM_TimeSheet_Attendance_Search(this.filterInput).subscribe(
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
  LoadWorkShift(){
    this.BlockUI();
    this.timeSheetService.create_Request_Action_Search({
      ...new Create_Request_Action_ENTITY(),
      employee_code:this.appSession.user.code
    } as Create_Request_Action_ENTITY).subscribe((data:Create_Request_Action_ENTITY)=>{
      this.listWorkShift = data.hRM_TimeSheet_Work_Shifts;
      if(!this.InputModel.code){
        this.InputModel.start_datetime = moment();
        this.InputModel.end_datetime = moment();
        this.InputModel.start_datetime.set('hour',this.listWorkShift[0].start_time.hour());
        this.InputModel.start_datetime.set('minute',this.listWorkShift[0].start_time.minute());
        this.InputModel.end_datetime.set('hour',this.listWorkShift[0].end_time.hour());
        this.InputModel.end_datetime.set('minute',this.listWorkShift[0].end_time.minute());
        this.InputModel.work_shift_code = this.listWorkShift[0].code;
        this.genDayOff(this.InputModel.start_datetime,this.InputModel.end_datetime);
        this.InputModel.max_day_number = 0;
        this.InputModel.total_days_off = 0;
        try{
          this.InputModel.max_day_number = Number(data.hRM_Employee_Log_Paid_Holiday.remaining_day.toFixed(2));
          this.InputModel.total_days_off = Number(data.hRM_Employee_Log_Paid_Holiday.total_days_off.toFixed(2));
        }catch{}
      }
     
      if(this.listWorkShift.length > 1){
        setTimeout(() => {
          this.SelectWorkShiftPicker.setList(this.listWorkShift);
        }, 500);
      }
      this.UnBlockUI();
    })
  }
  setAcction(){
    if(this.toolbar)
      this.toolbar.setUiAction(this);
    else
      setTimeout(() => {
        this.setAcction();
      }, 50);
  }
  ngOnInit(): void {
    this.filterInput.type = '1';
    this.setAcction();
    this.initCombobox();
    this.LoadData();
    this.LoadPermission();
  }
  onChangeDatetime(e:any,col:string){
    this.filterInput[col] = e;
  }
  onSelectWorkShift(e:any,col:string){
    this.InputModel[col] = e;
    this.UpdateView();
  }
  loadComboboxEmployee(){
    if(this.listEmployee.length == 0){
      this.BlockUI();
      let c = new HRM_Employee_ENTITY();
      this.listEmployee = [];
      this.employeeService.hRM_Employee_Search(c).subscribe(
        (data: any) => {
          this.listEmployee = data;
          this.listEmployee.forEach(e=>{
            e['name'] = e.firstName + ' '+ e.lastName;
          })
          this.SelectEmployee_replacePicker.setList(this.listEmployee);
          this.SelectFollowerPicker.setList(this.listEmployee);
          this.UpdateView();
        },
        (err) => this.UnBlockUI(),
        () => {
          this.UnBlockUI();
        }
      )
    }else{
      this.SelectEmployee_replacePicker.setList(this.listEmployee);
      this.SelectFollowerPicker.setList(this.listEmployee);
    }
    if(this.listEmployeePermission.length == 0){
      this.BlockUI();
      let c = new HRM_Employee_ENTITY();
      c.type = "PERMISSION_APPROVE_REQUEST"
      c.tbName = 'HRM_TimeSheet_Attendance_Approved'
      c.id_employee = this.InputModel.checker_code+';'+this.InputModel.follower
      this.employeeService.hRM_Employee_Search(c).subscribe(
        (data: any) => {
          data.forEach(e=>{
            e['name'] = e.firstName + ' '+ e.lastName;
          })
          this.listEmployeePermission = data;
          this.SelectCheckerPicker.setList(this.listEmployeePermission);
          this.UpdateView();
        },
        (err) => this.UnBlockUI(),
        () => {
          this.UnBlockUI();
        }
      )
    }else{
      this.SelectCheckerPicker.setList(this.listEmployeePermission);
    }
  }
  loadComboboxTypeoff(){
    if(this.listType_off.length == 0){
      this.BlockUI();
      let c = new HRM_TimeSheet_Attendance_Type_Off_ENTITY();
      this.listType_off = [];
      this.timeSheetService.hRM_TimeSheet_Attendance_Type_Off_Search(c).subscribe(
        (data: any) => {
          this.listType_off = data;
          this.listType_off.forEach(e=>e.name = e.name +' ('+ e.is_salary_name+')')
          this.SelectTypeoffPicker.setList(this.listType_off);
          this.UpdateView();
        },
        (err) => this.UnBlockUI(),
        () => {
          this.UnBlockUI();
        }
      )

    }else{
      this.SelectTypeoffPicker.setList(this.listType_off);
    }
  }
  loadComboboxDepartmentPosition(){
    if(this.listEmployeePosition.length == 0){
      this.BlockUI();
      let param = new Department_Position_ENTITY();
      this.listEmployeePosition = [];
      this.departmentService.department_Position_Search(param).subscribe(
        (data: any) => {
          this.listEmployeePosition = data;
          // this.SelectPositionPicker.setList(this.listEmployeePosition);
          this.UpdateView();
        },
        (err) => this.UnBlockUI(),
        () => {
          this.UnBlockUI();
        }
    )
    
    }else{
      
    }
    
  }
  loadComboboxBranch(){
    if(this.listBranch.length == 0){
      this.BlockUI();
      let c = new HRM_Branch_ENTITY();
      this.listBranch = [];
      this.branchService.hRM_Branch_Search(c).subscribe(
        (data: any) => {
          this.listBranch = data;
          this.listBranch.forEach(branch=>{branch['code'] =  branch.id.toString()})
          // this.SelectBranchPicker.setList(this.listBranch);
          this.UpdateView();
        },
        (err) => this.UnBlockUI(),
        () => {
          this.UnBlockUI();
        }
      )
    }else{
    }
  }
  onSelect(v:string,col:string){
   this.InputModel[col] = v;
  //  this.LoadData();
 }
  valueStartDate(e:Moment,col:string){
    try{
      if((col == 'start_datetime' && e.format('YYYY-MM-DD hh:mm') != this.InputModel.start_datetime.format('YYYY-MM-DD hh:mm')) || 
        col == 'end_datetime' && e.format('YYYY-MM-DD hh:mm') != this.InputModel.end_datetime.format('YYYY-MM-DD hh:mm')
      )
      {
        if(this.InputModel.start_datetime && this.InputModel.end_datetime)
          this.InputModel[col] = e;
          this.genDayOff(this.InputModel.start_datetime,this.InputModel.end_datetime)
      }
    }catch{}
    this.InputModel[col] = e;
  }
  genDayOff(s:Moment=moment(),e:Moment=moment()){
    var ws = this.listWorkShift.find(w=>w.code == this.InputModel.work_shift_code);
    if(ws && ws.hRM_TimeSheet_Work_Shift_Details){
        var on_day = ws.hRM_TimeSheet_Work_Shift_Details.find(e=>e.name.toUpperCase() == s.format('dddd').toUpperCase());
        if(on_day){
          var time_on_day = on_day.total_time?on_day.total_time:0,day_number = 0,relax=0;
          if(on_day.start_relax && on_day.end_relax && e && s)
          {
              if(
                  ((s.hour() + s.minute()/60) <= (on_day.start_relax.hour() + on_day.start_relax?.minute()/60))&&
                  ((e.hour() + e.minute()/60) >= (on_day.end_relax.hour() + on_day.end_relax?.minute()/60))
              )
              {
                  relax=on_day.relax?on_day.relax:0;
              }
          }
          let diffInHours = (e.hour() + e.minute()/60) - (s.hour() + s.minute()/60); // Convert the difference to minus
          this.InputModel.day_number = Number((((diffInHours-relax)/time_on_day)+(e?.date()-s?.date())).toFixed(2));
        }else{
          this.InputModel.day_number = e?.date()-s?.date()
        }
    }
}
  onSelectType(v:any,col:string){
    this.filterInput[col] = v;
    // this.LoadData();
  }
  initCombobox(){
    //=========Begin call API get list status
    this.BlockUI();
    let p = new HRM_TimeSheet_Attendance_Status_ENTITY();
    this.listStatus = [];
    this.timeSheetService.hRM_TimeSheet_Attendance_Status_Search(p).subscribe(
      (data: any) => {
        this.listStatus = data;
        this.SelectStatusApprovePicker.setList(this.listStatus);
        this.SelectFilterTypePicker.setList(this.listType);
        this.UpdateView();
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
    //=========End call API get list status
    
  }
  onClickApprove(){
    this.InputModel.approve_status = '1D8A876E-01F6-43E2-BFB0-1491B6BAD019';
    this.timeSheetService.hRM_TimeSheet_Attendance_Approve(this.InputModel).subscribe(respond=>{
      if(respond['status']==0){
        this.notificationModel.message = 'Duyệt đơn nghỉ phép';
          this.notificationModel.arr_to = this.InputModel.request_account.split(';');
          this.notificationModel.link_direct = '/timesheet/attendance';
          this.notificationModel.user_send = this.appSession.user.firstName +' '+this.appSession.user.lastName;
          this.notificationModel.account_id = this.appSession.user.id;
          this.con_notification['invoke']("Task_Notifi_All",this.notificationModel).then((rs)=>{
            console.log(rs);
          });
          this.alertMessage.AlertSuccess(respond['message']);
      } else this.alertMessage.AlertError(respond['message']);
    })
  }
  onClickUnApprove(){
    this.InputModel.approve_status = 'A2BA3E54-FAF2-4611-AFBB-D28B276C9658';
    this.timeSheetService.hRM_TimeSheet_Attendance_Approve(this.InputModel).subscribe(respond=>{
      if(respond['status']==0){
        this.notificationModel.message = 'Hủy đơn nghỉ phép';
          this.notificationModel.arr_to = this.InputModel.request_account.split(';');
          this.notificationModel.link_direct = '/timesheet/attendance';
          this.notificationModel.user_send = this.appSession.user.firstName +' '+this.appSession.user.lastName;
          this.notificationModel.account_id = this.appSession.user.id;
          this.con_notification['invoke']("Task_Notifi_All",this.notificationModel).then((rs)=>{
            console.log(rs);
          });
        this.alertMessage.AlertSuccess(respond['message']);
      }
      else this.alertMessage.AlertError(respond['message']);
    })
  }
  onClickRefusedToApprove(){
    if(this.InputModel.notes == '' || !this.InputModel.notes){
      this.alertMessage.AlertError('"Ghi chú duyệt" không được phép trống');
      return;
    }
    this.InputModel.approve_status = 'CF9D4241-303D-4F38-9FF7-6BC1E0945626';
    this.timeSheetService.hRM_TimeSheet_Attendance_Approve(this.InputModel).subscribe(respond=>{
      if(respond['status']==0){
        this.notificationModel.message = 'Từ chối đơn nghỉ phép';
          this.notificationModel.arr_to = this.InputModel.request_account.split(';');
          this.notificationModel.link_direct = '/timesheet/attendance';
          this.notificationModel.user_send = this.appSession.user.firstName +' '+this.appSession.user.lastName;
          this.notificationModel.account_id = this.appSession.user.id;
          this.con_notification['invoke']("Task_Notifi_All",this.notificationModel).then((rs)=>{
            console.log(rs);
          });
        this.alertMessage.AlertSuccess(respond['message']);
      }
      else{
        this.InputModel.approve_status = 'A2BA3E54-FAF2-4611-AFBB-D28B276C9658';
        this.alertMessage.AlertError(respond['message']);
      } 
    })
  }
}

