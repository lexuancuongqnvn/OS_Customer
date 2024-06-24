import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { JqgridEditComponent } from 'src/app/shared/jqgrid/jqgrid-edit/jqgrid-edit.component';
import { JqgridListComponent } from 'src/app/shared/jqgrid/jqgrid-list/jqgrid-list.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { InputSelectComponentIMG } from 'src/app/shared/layout/input-control-simple/input-select-img/input-select-img.component';
import { InputSelectComponentV2 } from 'src/app/shared/layout/input-control-simple/input-select-v2/input-select-v2.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { User } from 'src/app/shared/models/system/account';
import { Department_Position_ENTITY, Department_ENTITY, HRM_Employee_ENTITY, HRM_Timesheet_Employee_Mission_Allowance_ENTITY, EmployeeService, HRM_Branch_ENTITY, HRM_BranchService, DepartmentService, TimeSheetService, SYS_ActionsOnTable_ENTITY, AcctionService } from 'src/app/shared/service-proxies/api-shared';
import { AlertMessageComponent } from 'src/app/shared/sidenav/alert-message/alert-message.component';
import { SidenavAddEditComponent } from 'src/app/shared/sidenav/sidenav-add-edit/sidenav-add-edit.component';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-employee-mission-allowance',
  templateUrl: './employee-mission-allowance.component.html',
  styleUrls: ['./employee-mission-allowance.component.css']
})
export class EmployeeMissionAllowanceComponent extends LayoutComponentBase implements OnInit,IUiAction<any> {

  constructor(
    private injector: Injector,
    private timeSheetService: TimeSheetService,
    private employeeService: EmployeeService,
    private branchService:HRM_BranchService,
    private departmentService:DepartmentService,
    private appSession: AppSession,
    private acctionService: AcctionService
    ) 
  {
    super(injector);
  }
  isEdit:boolean = false;
  @ViewChild('gridList') gridList: JqgridListComponent;
  @ViewChild('gridPositionEdit') gridPositionEdit: JqgridEditComponent<Department_Position_ENTITY>;
  @ViewChild('dialogDelete') dialogDelete: DialogAcctionComponent;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  @ViewChild('toolbarEdit') toolbarEdit: ToolbarComponent;
  @ViewChild('sidenavAddEdit') sidenavAddEdit: SidenavAddEditComponent;
  @ViewChild('alertMessage') alertMessage: AlertMessageComponent;
  @ViewChild('SelectPicker') SelectPicker: InputSelectComponentV2;
  @ViewChild('SelectPicker1') SelectPicker1: InputSelectComponentV2;
  @ViewChild('SelectEmployeePicker') SelectEmployeePicker: InputSelectComponentV2;
  @ViewChild('Select_employee_related_code_Picker') Select_employee_related_code_Picker: InputSelectComponentIMG;
  @ViewChild('SelectStatuscodePicker') SelectStatuscodePicker: InputSelectComponentV2;
  @ViewChild('SelectCheckerPicker') SelectCheckerPicker: InputSelectComponentIMG;
  @ViewChild('SelectFilterTypePicker') SelectFilterTypePicker: InputSelectComponentV2;
  @ViewChild('SelectStatusApprovePicker') SelectStatusApprovePicker: InputSelectComponentV2;
  tbName: string = 'HRM_Timesheet_Employee_Mission_Allowance';
  filterInput:HRM_Timesheet_Employee_Mission_Allowance_ENTITY = new HRM_Timesheet_Employee_Mission_Allowance_ENTITY();
  InputModel:HRM_Timesheet_Employee_Mission_Allowance_ENTITY = new HRM_Timesheet_Employee_Mission_Allowance_ENTITY();
  CurrenFrom:string = EditPageState.view;
  listDepartment:Department_ENTITY[] = [];
  listEmployee:HRM_Employee_ENTITY[] = [];
  listBranch:HRM_Branch_ENTITY[]=[];
  listEmployeePosition:Department_Position_ENTITY[]=[];
  listEmployeePermission:HRM_Employee_ENTITY[] = [];
  listBtnApprove:SYS_ActionsOnTable_ENTITY[] = [];
  listStatus:any[] = [
    {
      code:'F17B3830-ACE8-430B-ABB4-AD2F7741EB65',
      name:'Chờ duyệt'
    },
    {
      code:'89A02050-762E-4BB0-9FD8-AEAFE51344C1',
      name:'Đã duyệt'
    },
    {
      code:'81B2D8B7-9CDA-4303-BC11-6DC484860987',
      name:'Bị từ chối'
    }
  ];
  
  col_model: any[] = [
    { label: 'Mã', name: 'code', key: true, width: 10 , hidden: true},
    { label: 'Người yêu cầu', name: 'request_account_name', width: 15 },
    { label: 'Trạng thái duyệt', name: 'approve_status_html', width: 15 },
    { label: 'Ngày yêu cầu', name: 'request_date_f', width: 15 },
    { label: 'Ngày đi', name: 'start_datetime_f', width: 10 },
    { label: 'Ngày về', name: 'end_datetime_f', width: 10 },
    { label: 'Địa chỉ', name: 'address', width: 15 },
    { label: 'Lý do', name: 'reason', width: 15 },
    { label: 'Người duyệt', name: 'checker_name', width: 12 },
    
  ];
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
  get showApprove():boolean{
    return this.InputModel.checker == this.appSession.user.code && this.listBtnApprove.filter(e=>e.classForm.toUpperCase() == 'APPROVE').length>0;
  }
  get showUnApprove():boolean{
    return this.InputModel.checker == this.appSession.user.code && this.listBtnApprove.filter(e=>e.classForm.toUpperCase() == 'UNAPPROVE').length>0;
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
        this.InputModel = new HRM_Timesheet_Employee_Mission_Allowance_ENTITY();
        setTimeout(() => {
          this.sidenavAddEdit.title = 'Đăng kí công tác';
          this.sidenavAddEdit.open();       
          this.loadComboboxEmployee();        
          this.toolbarEdit.setUiAction(this);
          this.UpdateView();
        }, 100);
        break;
      }
      case EditPageState.edit: {
        this.BlockUI();
        this.isEdit = true;
        var pr = new HRM_Timesheet_Employee_Mission_Allowance_ENTITY();
        pr.code = this.idSelect;
        pr.login_account = this.appSession.user.code;
        pr.type = this.filterInput.type;
        this.timeSheetService
        this.timeSheetService
          .hRM_Timesheet_Employee_Mission_Allowance_Search(pr)
          .subscribe(
            (respond) => {
              this.sidenavAddEdit.title = 'Chỉnh sửa phiếu đăng kí công tác';
              this.InputModel = respond[0];
              if(this.InputModel.approve_status != "F17B3830-ACE8-430B-ABB4-AD2F7741EB65")
              {
                this.showMessageError('Lỗi không thể sửa đơn ở trạng thái '+ this.InputModel.approve_status_name);
                this.setCurrenFrom(EditPageState.view);
                return;
              }
              this.loadComboboxEmployee();
              this.sidenavAddEdit.open();
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
          this.timeSheetService.hRM_Timesheet_Employee_Mission_Allowance_Insert(this.InputModel)
            .subscribe(
              (respond) => {
                if (respond['status'] == '0') {
                  this.InputModel.code = respond['ref_code'];
                  this.notificationModel.message = 'Bạn có đơn yêu cầu công tác';
                  this.alertMessage.AlertSuccess(respond['message']);
                  this.notificationModel.arr_to = this.InputModel.checker.split(';');
                  this.notificationModel.link_direct = '/timesheet/employee-mission-allowance';
                  this.notificationModel.user_send = this.appSession.user.firstName +' '+this.appSession.user.lastName;
                  this.notificationModel.account_id = this.appSession.user.id;
                  this.con_notification['invoke']("Task_Notifi_All",this.notificationModel).then((rs)=>{
                    console.log(rs);
                  });
                  this.alertMessage.AlertSuccess(respond['message']);
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
          this.timeSheetService.hRM_Timesheet_Employee_Mission_Allowance_Update(this.InputModel)
            .subscribe(
              (respond) => {
                if (respond['status'] == '0') {
                  if(respond['is_change_checker'] == 0){
                    this.notificationModel.message = 'Bạn có đơn yêu cầu công tác';
                    this.alertMessage.AlertSuccess(respond['message']);
                    this.notificationModel.arr_to = respond['checker'].split(';');
                    this.notificationModel.link_direct = '/timesheet/employee-mission-allowance';
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
        this.isEdit = true;
        var pr = new HRM_Timesheet_Employee_Mission_Allowance_ENTITY();
        pr.code = this.idSelect;
        pr.login_account = this.appSession.user.code;
        pr.type = this.filterInput.type;
        this.timeSheetService.hRM_Timesheet_Employee_Mission_Allowance_Search(pr)
          .subscribe(
            (respond) => {
              this.sidenavAddEdit.title = 'Chi tiết phiếu đăng kí công tác';
              this.InputModel = respond[0];
              this.loadComboboxEmployee();
              this.sidenavAddEdit.open();
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
  LoadPermission(){
    var user = new User();
    user = this.appSession.user;
    this.acctionService.acction_Search_byTableName(user.id, this.tbName+'_Approved').subscribe(
      (data: any[]) => {
        this.listBtnApprove = data;
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    );
  }
  getDataByID(storedName: string, param: string, keyService: string): void {
    throw new Error('Method not implemented.');
  }
  confirmDelete() {
    this.BlockUI();
    var p = new HRM_Timesheet_Employee_Mission_Allowance_ENTITY();
    p.code = this.idSelect;
    this.UpdateView();
  }
  LoadData() {
    this.BlockUI();
    this.filterInput.login_account = this.appSession.user.code;
    this.timeSheetService.hRM_Timesheet_Employee_Mission_Allowance_Search(this.filterInput).subscribe(
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
  onSelect(v:string,col:string){
    this.InputModel[col] = v;
  }
  valueStartDate(e:any,col:string){
    this.InputModel[col] = e;
    try{
      this.InputModel.time_request = this.InputModel.end_datetime.date()-this.InputModel.start_datetime.date() + 1;
      this.UpdateView();
    }catch{}
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
          this.Select_employee_related_code_Picker.setList(this.listEmployee);
          this.UpdateView();
        },
        (err) => this.UnBlockUI(),
        () => {
          this.UnBlockUI();
        }
      )
    }else{
      this.Select_employee_related_code_Picker.setList(this.listEmployee);
      this.UpdateView();
    }
    if(this.listEmployeePermission.length == 0){
      this.BlockUI();
      let c = new HRM_Employee_ENTITY();
      c.type = "PERMISSION_APPROVE_REQUEST"
      c.tbName = this.tbName+'_Approved'
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
  setAcction(){
    if(this.toolbar)
      this.toolbar.setUiAction(this);
    else
      setTimeout(() => {
        this.setAcction();
      }, 50);
  }
  onSelectType(v:any,col:string){
    this.filterInput[col] = v;
    // this.LoadData();
  }
  ngOnInit(): void {
    this.setAcction();
    this.filterInput.type = '1';
    this.LoadData();
    this.LoadPermission();
    setTimeout(() => {
    this.SelectFilterTypePicker.setList(this.listType);
    this.SelectStatusApprovePicker.setList(this.listStatus);
    }, 100);
  }
  onChangeDatetime(e:any,col:string){
    this.filterInput[col] = e;
  }
  onClickApprove(){
    this.InputModel.approve_status = '89A02050-762E-4BB0-9FD8-AEAFE51344C1';
    this.timeSheetService.hRM_Timesheet_Employee_Mission_Allowance_Approve(this.InputModel).subscribe(respond=>{
      if(respond['status']==0)
      {
        this.alertMessage.AlertSuccess(respond['message']);
        this.notificationModel.message = 'Duyệt đơn yêu cầu công tác';
        this.alertMessage.AlertSuccess(respond['message']);
        this.notificationModel.arr_to = this.InputModel.request_account.split(';');
        this.notificationModel.link_direct = '/timesheet/employee-mission-allowance';
        this.notificationModel.user_send = this.appSession.user.firstName +' '+this.appSession.user.lastName;
        this.notificationModel.account_id = this.appSession.user.id;
        this.con_notification['invoke']("Task_Notifi_All",this.notificationModel).then((rs)=>{
          console.log(rs);
        });
      }
      else this.alertMessage.AlertError(respond['message']);
    })
  }
  onClickUnApprove(){
    this.InputModel.approve_status = 'F17B3830-ACE8-430B-ABB4-AD2F7741EB65';
    this.timeSheetService.hRM_Timesheet_Employee_Mission_Allowance_Approve(this.InputModel).subscribe(respond=>{
      if(respond['status']==0)
      {
        this.notificationModel.message = 'Từ hủy đơn yêu cầu công tác';
        this.alertMessage.AlertSuccess(respond['message']);
        this.notificationModel.arr_to = this.InputModel.request_account.split(';');
        this.notificationModel.link_direct = '/timesheet/employee-mission-allowance';
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
    if(this.InputModel.approve_note == '' || !this.InputModel.approve_note){
      this.alertMessage.AlertError('"Ghi chú duyệt" không được phép trống');
      return;
    }
    this.InputModel.approve_status = '81B2D8B7-9CDA-4303-BC11-6DC484860987';
    this.timeSheetService.hRM_Timesheet_Employee_Mission_Allowance_Approve(this.InputModel).subscribe(respond=>{
      if(respond['status']==0){
        this.notificationModel.message = 'Từ chối đơn yêu cầu công tác';
        this.alertMessage.AlertSuccess(respond['message']);
        this.notificationModel.arr_to = this.InputModel.request_account.split(';');
        this.notificationModel.link_direct = '/timesheet/employee-mission-allowance';
        this.notificationModel.user_send = this.appSession.user.firstName +' '+this.appSession.user.lastName;
        this.notificationModel.account_id = this.appSession.user.id;
        this.con_notification['invoke']("Task_Notifi_All",this.notificationModel).then((rs)=>{
          console.log(rs);
        });
        this.alertMessage.AlertSuccess(respond['message']);
      }
      else{
        this.InputModel.approve_status = 'F17B3830-ACE8-430B-ABB4-AD2F7741EB65';
        this.alertMessage.AlertError(respond['message']);
      } 
    })
  }
}
