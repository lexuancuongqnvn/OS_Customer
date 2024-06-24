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
import { AcctionService, DepartmentService, EmployeeService, HRM_BranchService, HRM_Employee_ENTITY, HRM_Timesheet_Employee_Overtime_ENTITY, HRM_Timesheet_Employee_Update_Timkeeping_ENTITY, SYS_ActionsOnTable_ENTITY, TimeSheetService } from 'src/app/shared/service-proxies/api-shared';
import { AlertMessageComponent } from 'src/app/shared/sidenav/alert-message/alert-message.component';
import { SidenavAddEditComponent } from 'src/app/shared/sidenav/sidenav-add-edit/sidenav-add-edit.component';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-employee-update-timkeeping-request',
  templateUrl: './employee-update-timkeeping-request.component.html',
  styleUrls: ['./employee-update-timkeeping-request.component.css']
})
export class EmployeeUpdateTimkeepingRequestComponent  extends LayoutComponentBase implements OnInit,IUiAction<any> {

  constructor(
    private injector: Injector,
    private timeSheetService: TimeSheetService,
    private employeeService: EmployeeService,
    private branchService:HRM_BranchService,
    private acctionService: AcctionService,
    private appSession: AppSession,
    ) 
  {
    super(injector);
  }
  isEdit:boolean = false;
  @ViewChild('gridList') gridList: JqgridListComponent;
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
  tbName: string = 'HRM_Timesheet_Employee_Update_Timkeeping';
  filterInput:HRM_Timesheet_Employee_Update_Timkeeping_ENTITY = new HRM_Timesheet_Employee_Update_Timkeeping_ENTITY();
  InputModel:HRM_Timesheet_Employee_Update_Timkeeping_ENTITY = new HRM_Timesheet_Employee_Update_Timkeeping_ENTITY();
  CurrenFrom:string = EditPageState.view;
  listEmployee:HRM_Employee_ENTITY[] = [];
  listEmployeePermission:HRM_Employee_ENTITY[] = [];
  listBtnApprove:SYS_ActionsOnTable_ENTITY[] = [];
  listStatus:any[] = [
    {
      code:'2878B289-E8D0-4300-A1DA-C0121A13DF69',
      name:'Chờ duyệt'
    },
    {
      code:'B070F6BE-91C9-426F-A3C3-8798A923B268',
      name:'Đã duyệt'
    },
    {
      code:'6EFE90AD-22EE-470F-BD59-F2CD1076D64B',
      name:'Bị từ chối'
    }
  ];
  listLand:any[]=[
    {
      code:'DE8C9D90-0B92-4C04-BEE4-2E1325A457AA',
      name:'Trước ca'
    },
    {
      code:'C35EE69A-6492-4101-AEAD-504DAF7FDD35',
      name:'Sau ca'
    },
    {
      code:'A7A96220-8545-447F-98CB-6BC9C4A4AE2F',
      name:'Nghỉ giữa ca'
    },
    {
      code:'ECCA7D61-188A-414E-8848-FB5C79932928',
      name:'Ngày nghỉ'
    }
  ]
  
  col_model: any[] = [
    { label: 'Mã', name: 'code', key: true, width: 10 , hidden: true},
    { label: 'Người yêu cầu', name: 'request_account_name', width: 15 },
    { label: 'Trạng thái duyệt', name: 'approve_status_html', width: 15 },
    { label: 'Ngày yêu cầu', name: 'request_date_f', width: 15 },
    { label: 'Ngày làm việc từ', name: 'start_datetime_f', width: 15 },
    { label: 'Ngày làm việc đến', name: 'end_datetime_f', width: 15 },
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
        this.InputModel = new HRM_Timesheet_Employee_Update_Timkeeping_ENTITY();
        setTimeout(() => {
          this.sidenavAddEdit.title = 'Đăng kí bù công';
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
        var pr = new HRM_Timesheet_Employee_Update_Timkeeping_ENTITY();
        pr.code = this.idSelect;
        pr.login_account = this.appSession.user.code;
        pr.type = this.filterInput.type;
        this.timeSheetService
          .hRM_Timesheet_Employee_Update_Timkeeping_Search(pr)
          .subscribe(
            (respond) => {
              this.sidenavAddEdit.title = 'Chỉnh sửa phiếu đăng kí bù công';
              this.InputModel = respond[0];
              if(this.InputModel.approve_status != "2878B289-E8D0-4300-A1DA-C0121A13DF69")
              {
                this.showMessageError('Lỗi không thể sửa đơn ở trạng thái '+ this.InputModel.status_name);
                this.setCurrenFrom(EditPageState.view);
                return;
              }
              this.sidenavAddEdit.open();
              this.loadComboboxEmployee();
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
        debugger
        if (!this.InputModel.code) {
          this.InputModel.request_account = this.appSession.user.code;
          this.timeSheetService.hRM_Timesheet_Employee_Update_Timkeeping_Insert(this.InputModel)
            .subscribe(
              (respond) => {
                if (respond['status'] == '0') {
                  this.InputModel.code = respond['ref_code'];
                  this.notificationModel.message = 'Bạn có đơn yêu cầu bù công mới';
                  this.notificationModel.arr_to = [];
                  this.notificationModel.arr_to.push(this.InputModel.checker);
                  this.notificationModel.link_direct = '/timesheet/update-timkeeping-request';
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
          this.timeSheetService.hRM_Timesheet_Employee_Update_Timkeeping_Update(this.InputModel)
            .subscribe(
              (respond) => {
                if (respond['status'] == '0') {
                  if(respond['is_change_checker'] == 0){
                    this.notificationModel.message = 'Bạn có đơn yêu cầu bù công mới';
                    this.notificationModel.arr_to = respond['checker'].split(';');
                    this.notificationModel.link_direct = '/timesheet/update-timkeeping-request';
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
        var pr = new HRM_Timesheet_Employee_Update_Timkeeping_ENTITY();
        pr.code = this.idSelect;
        pr.login_account = this.appSession.user.code;
        pr.type = this.filterInput.type;
        this.timeSheetService.hRM_Timesheet_Employee_Update_Timkeeping_Search(pr)
          .subscribe(
            (respond) => {
              this.sidenavAddEdit.title = 'Chi tiết phiếu đăng kí bù công';
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
    var p = new HRM_Timesheet_Employee_Update_Timkeeping_ENTITY();
    p.code = this.idSelect;
    this.UpdateView();
  }
  LoadData() {
    this.BlockUI();
    this.filterInput.login_account = this.appSession.user.code;
    this.timeSheetService.hRM_Timesheet_Employee_Update_Timkeeping_Search(this.filterInput).subscribe(
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
    debugger
    this.InputModel[col] = e;
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
    this.InputModel.approve_status = 'B070F6BE-91C9-426F-A3C3-8798A923B268';
    this.timeSheetService.hRM_Timesheet_Employee_Update_Timkeeping_Approve(this.InputModel).subscribe(respond=>{
      if(respond['status']==0)
      {
        this.notificationModel.message = 'Đơn yêu cầu bù công đã được duyệt';
        this.notificationModel.arr_to = [];
        this.notificationModel.arr_to.push(this.InputModel.request_account);
        this.notificationModel.link_direct = '/timesheet/update-timkeeping-request';
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
  onClickUnApprove(){
    this.InputModel.approve_status = '2878B289-E8D0-4300-A1DA-C0121A13DF69';
    this.timeSheetService.hRM_Timesheet_Employee_Update_Timkeeping_Approve(this.InputModel).subscribe(respond=>{
      if(respond['status']==0){
        this.notificationModel.message = 'Đơn yêu cầu bù công đã được hủy';
        this.notificationModel.arr_to = [];
        this.notificationModel.arr_to.push(this.InputModel.request_account);
        this.notificationModel.link_direct = '/timesheet/update-timkeeping-request';
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
    this.InputModel.approve_status = '6EFE90AD-22EE-470F-BD59-F2CD1076D64B';
    this.timeSheetService.hRM_Timesheet_Employee_Update_Timkeeping_Approve(this.InputModel).subscribe(respond=>{
      if(respond['status']==0){
        this.notificationModel.message = 'Đơn yêu cầu bù công đã bị từ chối';
        this.notificationModel.arr_to = [];
        this.notificationModel.arr_to.push(this.InputModel.request_account);
        this.notificationModel.link_direct = '/timesheet/update-timkeeping-request';
        this.notificationModel.user_send = this.appSession.user.firstName +' '+this.appSession.user.lastName;
        this.notificationModel.account_id = this.appSession.user.id;
        this.con_notification['invoke']("Task_Notifi_All",this.notificationModel).then((rs)=>{
          console.log(rs);
        });
        this.alertMessage.AlertSuccess(respond['message']);
      }
      else{
        this.InputModel.approve_status = '6EFE90AD-22EE-470F-BD59-F2CD1076D64B';
        this.alertMessage.AlertError(respond['message']);
      } 
    })
  }
}
