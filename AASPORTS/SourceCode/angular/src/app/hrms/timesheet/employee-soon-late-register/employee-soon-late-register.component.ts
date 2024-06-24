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
import { AcctionService, DepartmentService, Department_ENTITY, EmployeeService, HRM_BranchService, HRM_Branch_ENTITY, HRM_Employee_ENTITY, HRM_TimeSheet_Employee_Soon_Late_Register_ENTITY, HRM_TimeSheet_Employee_Soon_Late_Register_Status_ENTITY, HRM_TimeSheet_Employee_Soon_Late_Register_Type_ENTITY, HRM_TimeSheet_Employee_Soon_Late_Regulation_ENTITY, HRM_TimeSheet_Employee_Work_Shift_ENTITY, HRM_TimeSheet_Work_Shift_ENTITY, SYS_ActionsOnTable_ENTITY, TimeSheetService } from 'src/app/shared/service-proxies/api-shared';
import { AlertMessageComponent } from 'src/app/shared/sidenav/alert-message/alert-message.component';
import { SidenavAddEditComponent } from 'src/app/shared/sidenav/sidenav-add-edit/sidenav-add-edit.component';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-employee-soon-late-register',
  templateUrl: './employee-soon-late-register.component.html',
  styleUrls: ['./employee-soon-late-register.component.css']
})
export class EmployeeSoonLateRegisterComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    private injector: Injector,
    private hRM_BranchService:HRM_BranchService,
    private employeeService: EmployeeService,
    private appSession: AppSession,
    private timeSheetService:TimeSheetService,
    private acctionService: AcctionService
  ) {
    super(injector);
  }
  isEdit:boolean = false;
  col_model:any[] = [
    { label: 'Mã', name: 'code', key: true, width: 10 , hidden: true},
    { label: 'Người yêu cầu', name: 'request_account_name', width: 15 },
    { label: 'Trạng thái duyệt', name: 'approve_status_html', width: 15 },
    { label: 'Ngày yêu cầu', name: 'request_date_f', width: 15 },
    { label: 'Từ ngày', name: 'start_datetime_f', width: 10 },
    { label: 'Đến ngày', name: 'end_datetime_f', width: 10 },
    { label: 'Lý do', name: 'reason', width: 15 },
    { label: 'Người duyệt', name: 'checker_name', width: 12 },
    
  ]
  @ViewChild('gridList') gridList: JqgridListComponent;
  @ViewChild('dialogDelete') dialogDelete: DialogAcctionComponent;
  @ViewChild('dialogMoving') dialogMoving: DialogAcctionComponent;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  @ViewChild('toolbarEdit') toolbarEdit: ToolbarComponent;
  @ViewChild('sidenavAddEdit') sidenavAddEdit: SidenavAddEditComponent;
  @ViewChild('alertMessage') alertMessage: AlertMessageComponent;
  // @ViewChild('SelectAplayDayInWeekPicker') SelectAplayDayInWeekPicker: InputSelectComponentV2;
  // @ViewChild('SelectAplayWSInWeekPicker') SelectAplayWSInWeekPicker: InputSelectComponentV2;
  @ViewChild('SelectCheckerPicker') SelectCheckerPicker: InputSelectComponentIMG;
  @ViewChild('SelecFollowertPicker') SelecFollowertPicker: InputSelectComponentIMG;
  @ViewChild('SelectFilterTypePicker') SelectFilterTypePicker: InputSelectComponentV2;
  @ViewChild('SelectFilterStatusApprovePicker') SelectFilterStatusApprovePicker: InputSelectComponentV2;
  @ViewChild('SelectMovingPicker') SelectMovingPicker: InputSelectComponentV2;
  @ViewChild('SelectTypeRequestPicker') SelectTypeRequestPicker: InputSelectComponentV2;
  @ViewChild('gridTimeSheetEmployeeSoonLateRegulationEdit') gridTimeSheetEmployeeSoonLateRegulationEdit: JqgridEditComponent<HRM_TimeSheet_Employee_Soon_Late_Regulation_ENTITY>;
  get disabled():boolean{
    return this.getCurrenFrom == EditPageState.viewDetail?true:false;
  }
  tbName: string = 'HRM_TimeSheet_Employee_Soon_Late_Register';
  filterInput:HRM_TimeSheet_Employee_Soon_Late_Register_ENTITY = new HRM_TimeSheet_Employee_Soon_Late_Register_ENTITY();
  InputModel:HRM_TimeSheet_Employee_Soon_Late_Register_ENTITY = new HRM_TimeSheet_Employee_Soon_Late_Register_ENTITY();
  CurrenFrom:string = EditPageState.view;
  listDepartment:Department_ENTITY[] = [];
  listEmployee:HRM_Employee_ENTITY[] = [];
  listWorkShift:HRM_TimeSheet_Work_Shift_ENTITY[] = [];
  listDataGrid:HRM_TimeSheet_Employee_Soon_Late_Register_ENTITY[] = [];
  listStatusApprove:HRM_TimeSheet_Employee_Soon_Late_Register_Status_ENTITY[]=[];
  listTypeRequest:HRM_TimeSheet_Employee_Soon_Late_Register_Type_ENTITY[]=[];
  listBranch:HRM_Branch_ENTITY[]=[];
  listRegulation:HRM_TimeSheet_Employee_Soon_Late_Regulation_ENTITY[]=[];
  isShowRegulation:boolean = false;
  listEmployeePermission:HRM_Employee_ENTITY[] = [];
  listBtnApprove:SYS_ActionsOnTable_ENTITY[] = [];
  listDayInWeek:any[] = [{
    code:'monday',
    name:'Thứ 2'
  },{
    code:'tuesday',
    name:'Thứ 3'
  },{
    code:'wednesday',
    name:'Thứ 4'
  },{
    code:'thursday',
    name:'Thứ 5'
  },{
    code:'friday',
    name:'Thứ 6'
  },{
    code:'saturday',
    name:'Thứ 7'
  },{
    code:'sunday',
    name:'Chủ nhật'
  }];
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
  col_model_edit:any[] = [
    { label: 'Mã', name: 'code', key: true, width: 10 , hidden: true},
    { label: 'Loại', name: 'type', width: 15 ,editable: true, sorttype: "select", editoptions: { value: [{code:'late',name:'Đi muộn'},{code:'soon',name:'Về sớm'}] }},
    { label: 'Số phút vi phạm', name: 'minute', width:15 ,editable: true, sorttype: 'int'},
    { label: 'Số lần vi phạm áp dụng', name: 'times', width: 15 ,editable: true, sorttype: 'int'},
    { label: 'Số công phạt', name: 'work_day_minus', width: 15 ,editable: true, sorttype: 'int'},
    { label: 'Chi nhánh áp dụng', name: 'branch_code', width: 50 ,editable: true, sorttype: "multiselect", editoptions: { value: this.listBranch }},
  ]
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
  onSelectType(v:any){
    this.filterInput.type = v;
    //  this.LoadData();
  }
  onSelectStatus(v:any){
    this.filterInput.approve_status = v;
    // this.LoadData();
  }
  onClickAcction(id: number, storedName: string, param: string, keyService: string, classForm: string): void {
    switch(classForm){
      case EditPageState.add:{
        this.isEdit = true;
        this.isShowRegulation = false;
        this.InputModel = new HRM_TimeSheet_Employee_Soon_Late_Register_ENTITY();
        setTimeout(() => {
          this.sidenavAddEdit.title = "Đăng ký đi muộn/ về sớm";
          this.sidenavAddEdit.open();
          this.toolbarEdit.setUiAction(this);
          this.UpdateView();
          this.SelectCheckerPicker.setList(this.listEmployee);
          this.SelecFollowertPicker.setList(this.listEmployee);
          this.SelectTypeRequestPicker.setList(this.listTypeRequest);
          this.UpdateView();
        }, 100);
        break;
      }
      case EditPageState.edit:{
        this.BlockUI();
          this.isEdit = true;
          this.isShowRegulation = false;
          this.InputModel = new HRM_TimeSheet_Employee_Soon_Late_Register_ENTITY();
          this.InputModel.code = this.idSelect;
          this.timeSheetService.hRM_TimeSheet_Employee_Soon_Late_Register_Search_Detail(this.idSelect).subscribe((respond)=>{
            this.InputModel = respond[0];
            if(this.InputModel.approve_status != "93C97776-CB85-4683-9F57-F948330BD72B")
            {
              this.showMessageError('Lỗi không thể sửa đơn ở trạng thái '+ this.InputModel.approve_status_name);
              this.setCurrenFrom(EditPageState.view);
              return;
            }
            // this.listDayInWeek.forEach(day=>{
            //   this.InputModel.for_day_in_week_f = this.InputModel.for_day_in_week.replace(day.code,day.name);
            // })
            this.sidenavAddEdit.title = "Chỉnh sửa Đăng ký đi muộn/ về sớm";
            this.sidenavAddEdit.open();
            this.toolbarEdit.setUiAction(this);
            this.UpdateView(); 
  
            this.SelectCheckerPicker.setList(this.listEmployeePermission);
            this.SelecFollowertPicker.setList(this.listEmployee);
            this.SelectTypeRequestPicker.setList(this.listTypeRequest);
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
        this.isShowRegulation = false;
        this.dialogDelete.open();
        break;
      }
      case EditPageState.save:{
        if(this.isShowRegulation){
          try{
            this.listRegulation = []
            var Subs = this.gridTimeSheetEmployeeSoonLateRegulationEdit.allData;
            if(Subs.length>0)
            {
              for(var i = 0 ; i < Subs.length ; i++)
              {
                var newrow = new  HRM_TimeSheet_Employee_Soon_Late_Regulation_ENTITY();
                for (const [key, value] of Object.entries(Subs[i])) {
                  newrow[key] = Subs[i][key];
                }
                newrow = HRM_TimeSheet_Employee_Soon_Late_Regulation_ENTITY.fromJS(newrow);
                this.listRegulation.push(newrow);
              }
            }
          }catch{}
          this.timeSheetService.hRM_TimeSheet_Employee_Soon_Late_Regulation_Update(this.listRegulation).subscribe(res=>{
            if(res['status'] == 0)this.alertMessage.AlertSuccess(res['message']);
            else this.alertMessage.AlertError(res['message']);
          })
        }else{
          this.InputModel.login_account = this.appSession.user.code;
          if(!this.InputModel.code){
            this.timeSheetService.hRM_TimeSheet_Employee_Soon_Late_Register_Insert(this.InputModel).subscribe((respond)=>{
              if(respond['status'] == '0')
              {
                this.alertMessage.AlertSuccess(respond['message']);
                this.InputModel.code = respond['ref_code'];
                this.notificationModel.message = 'Đơn yêu cầu đi muộn - về sớm';
                this.notificationModel.arr_to = [];
                this.notificationModel.arr_to.push(this.InputModel.checker);
                this.notificationModel.link_direct = '/timesheet/employee-soon-late-register';
                this.notificationModel.user_send = this.appSession.user.firstName +' '+this.appSession.user.lastName;
                this.notificationModel.account_id = this.appSession.user.id;
                this.con_notification['invoke']("Soon_Late_Register",this.notificationModel).then((rs)=>{
                  console.log(rs);
                });
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
            this.InputModel.request_account = this.appSession.user.code;
            this.timeSheetService.hRM_TimeSheet_Employee_Soon_Late_Register_Update(this.InputModel).subscribe((respond)=>{
              if(respond['status'] == '0')
              {
                if(respond['is_change_checker'] == 0){
                  this.alertMessage.AlertSuccess(respond['message']);
                  this.notificationModel.message = 'Đơn yêu cầu đi muộn - về sớm';
                  this.notificationModel.arr_to = respond['checker'].split(';');
                  this.notificationModel.link_direct = '/timesheet/employee-soon-late-register';
                  this.notificationModel.user_send = this.appSession.user.firstName +' '+this.appSession.user.lastName;
                  this.notificationModel.account_id = this.appSession.user.id;
                  this.con_notification['invoke']("Soon_Late_Register",this.notificationModel).then((rs)=>{
                    console.log(rs);
                  });
                }
                this.alertMessage.AlertSuccess(respond['message']);
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
        }
        
        break;
      }
      case EditPageState.search:{
        this.isShowRegulation = false;
        this.LoadData();
        break;
      }
      case EditPageState.viewDetail:{
        this.isShowRegulation = false;
        this.BlockUI();
        this.isEdit = true;
        this.InputModel = new HRM_TimeSheet_Employee_Soon_Late_Register_ENTITY();
        this.InputModel.code = this.idSelect;
        this.timeSheetService.hRM_TimeSheet_Employee_Soon_Late_Register_Search_Detail(this.idSelect).subscribe((respond)=>{
          this.InputModel = respond[0];

          this.sidenavAddEdit.title = "Chi tiết đăng ký đi muộn/ về sớm";
          this.sidenavAddEdit.open();
          this.toolbarEdit.setUiAction(this);
          this.UpdateView(); 
          this.SelectCheckerPicker.setList(this.listEmployeePermission);
          this.SelecFollowertPicker.setList(this.listEmployee);
          this.SelectTypeRequestPicker.setList(this.listTypeRequest);
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
      case 'Regulation':{
        this.isEdit = true;
        this.isShowRegulation = true;
        setTimeout(() => {
          this.sidenavAddEdit.title = "Danh sách quy định đi muộn/ về sớm";
          this.sidenavAddEdit.open();
          this.toolbarEdit.setUiAction(this);
          setTimeout(() => {
            this.timeSheetService.hRM_TimeSheet_Employee_Soon_Late_Regulation_Search(new HRM_TimeSheet_Employee_Soon_Late_Regulation_ENTITY()).subscribe(res=>{
              this.gridTimeSheetEmployeeSoonLateRegulationEdit.setData(res?res:[])
            })
          }, 500);
          this.UpdateView(); 
        }, 100);
        break;
      }
      default:break;
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
  LoadData() {
    this.BlockUI();
    this.filterInput.login_account = this.appSession.user.code;
    this.timeSheetService.hRM_TimeSheet_Employee_Soon_Late_Register_Search(this.filterInput).subscribe(
      (data: HRM_TimeSheet_Employee_Soon_Late_Register_ENTITY[]) => {
        this.listDataGrid = data;
        switch(this.filterInput.type){
          case '1': this.listDataGrid.filter(f=>f.request_account == this.appSession.user.code); break;
          case '2': this.listDataGrid.filter(f=>f.checker == this.appSession.user.code); break;
          case '3': this.listDataGrid.filter(f=>f.moving?f.moving.split(';').indexOf(this.appSession.user.code) > 0:f.moving == '#'); break;
        }
        this.gridList.setData(this.listDataGrid,this.col_model,this.tbName)
        this.UpdateView();
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
  }
  initCombobox(){
    var p4 = new HRM_TimeSheet_Employee_Soon_Late_Register_Type_ENTITY();
    p4.id = 0;
    this.timeSheetService.hRM_TimeSheet_Employee_Soon_Late_Register_Type_Search(p4).subscribe(
      (data: any) => {
        this.listTypeRequest = data;
        this.UpdateView();
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
    let p = new HRM_Employee_ENTITY();
    this.listEmployee = [];
    this.employeeService.hRM_Employee_Search(p).subscribe(
      (data: any) => {
        if(data){
          data.forEach(e=>{
            e.id = e.id;
            e['name'] = e.firstName + ' ' +e.lastName; 
            this.listEmployee.push(e);
          })
        }
        this.SelectFilterTypePicker.setList(this.listType);
        this.UpdateView();
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
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
    var p2 = new HRM_TimeSheet_Employee_Work_Shift_ENTITY();
    p2.type = 'ALL';
    this.timeSheetService.hRM_TimeSheet_Work_Shift_Search(p2).subscribe(
      (data: any) => {
        this.listWorkShift = data;
        this.UpdateView();
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
    var p3 = new HRM_TimeSheet_Employee_Soon_Late_Register_Status_ENTITY();
    this.timeSheetService.hRM_TimeSheet_Employee_Soon_Late_Register_Status_Search(p3).subscribe(
      (data: any) => {
        this.listStatusApprove = data;
        this.SelectFilterStatusApprovePicker.setList(this.listStatusApprove);
        this.UpdateView();
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
    this.listBranch = [];
    this.hRM_BranchService.hRM_Branch_Search(new HRM_Branch_ENTITY()).subscribe((res:HRM_Branch_ENTITY[])=>{
      this.listBranch = res;
      this.col_model_edit[5].editoptions.value = this.listBranch;
    })
  }
  getDataByID(storedName: string, param: string, keyService: string): void {
    throw new Error('Method not implemented.');
  }
  setAcction(){
    if(this.toolbar)
      this.toolbar.setUiAction(this);
    else
      setTimeout(() => {
        this.setAcction();
      }, 50);
  }
  valueStartDate(v:any,col:string){
    this.InputModel[col] = v;
    try{
      this.InputModel.time_request = this.diffMinute(this.InputModel.start_datetime,this.InputModel.end_datetime);
    }catch{
      this.InputModel.time_request = 0;
    }
  }
  diffMinute(end_time:any,start_time):number{
    let end = end_time.hour()*60+end_time.minute();
    if(end == 0) end=24*60
    let start = start_time.hour()*60+start_time.minute();
    return Math.abs((end-start));
  }
  onSelect(v:any,col:string){
    this.InputModel[col] = v;
  }
  onClickApprove(){
    this.InputModel.approve_status = '16D1477B-621F-4F3C-A76C-4416A64C6A95';
    this.timeSheetService.hRM_TimeSheet_Employee_Soon_Late_Register_Approve(this.InputModel).subscribe(respond=>{
      if(respond['status']==0){
        this.alertMessage.AlertSuccess(respond['message']);
        this.notificationModel.message = 'Đơn yêu cầu đi muộn - về sớm đã được duyệt';
        this.notificationModel.arr_to = [];
        this.notificationModel.arr_to.push(this.InputModel.request_account);
        this.notificationModel.link_direct = '/timesheet/employee-soon-late-register';
        this.notificationModel.user_send = this.appSession.user.firstName +' '+this.appSession.user.lastName;
        this.notificationModel.account_id = this.appSession.user.id;
        this.con_notification['invoke']("Soon_Late_Register",this.notificationModel).then((rs)=>{
          console.log(rs);
        });
        this.alertMessage.AlertSuccess(respond['message']);
      }
      else this.alertMessage.AlertError(respond['message']);
    })
  }
  onClickUnApprove(){
    this.InputModel.approve_status = '93C97776-CB85-4683-9F57-F948330BD72B';
    this.timeSheetService.hRM_TimeSheet_Employee_Soon_Late_Register_Approve(this.InputModel).subscribe(respond=>{
      if(respond['status']==0){
        this.notificationModel.message = 'Đơn yêu cầu đi muộn - về sớm đã hủy';
        this.notificationModel.arr_to = [];
        this.notificationModel.arr_to.push(this.InputModel.request_account);
        this.notificationModel.link_direct = '/timesheet/employee-soon-late-register';
        this.notificationModel.user_send = this.appSession.user.firstName +' '+this.appSession.user.lastName;
        this.notificationModel.account_id = this.appSession.user.id;
        this.con_notification['invoke']("Soon_Late_Register",this.notificationModel).then((rs)=>{
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
    if(this.InputModel.approve_note == '' || !this.InputModel.approve_note){
      this.alertMessage.AlertError('"Ghi chú duyệt" không được phép trống');
      return;
    }
    this.InputModel.approve_status = '79FAB1B5-B095-4F8C-9986-26248D424620';
    
    this.timeSheetService.hRM_TimeSheet_Employee_Soon_Late_Register_Approve(this.InputModel).subscribe(respond=>{
      if(respond['status']==0){
        this.notificationModel.message = 'Đơn yêu cầu đi muộn - về sớm đã từ chối';
        this.notificationModel.arr_to = [];
        this.notificationModel.arr_to.push(this.InputModel.request_account);
        this.notificationModel.link_direct = '/timesheet/employee-soon-late-register';
        this.notificationModel.user_send = this.appSession.user.firstName +' '+this.appSession.user.lastName;
        this.notificationModel.account_id = this.appSession.user.id;
        this.con_notification['invoke']("Soon_Late_Register",this.notificationModel).then((rs)=>{
          console.log(rs);
        });
        this.alertMessage.AlertSuccess(respond['message']);
      }
      else{
        this.InputModel.approve_status = '93C97776-CB85-4683-9F57-F948330BD72B';
        this.alertMessage.AlertError(respond['message']);
      } 
    })
  }
  onClickMoving(){
    this.dialogMoving.open();
    setTimeout(()=>{
      this.SelectMovingPicker.setList(this.listEmployee)
      this.SelectMovingPicker.renderSelectPicker()
    },100)
    
  }
  confirmMoving(){
    this.InputModel.login_account = this.appSession.user.code;
    this.timeSheetService.hRM_TimeSheet_Employee_Soon_Late_Register_Moving(this.InputModel).subscribe(respond=>{
      if(respond['status']==0)this.alertMessage.AlertSuccess(respond['message']);
      else this.alertMessage.AlertError(respond['message']);
    })
  }
  ngOnInit(): void {
    this.filterInput.type = '1';
    this.setAcction();
    this.initCombobox();
    this.LoadPermission();
    this.LoadData();
  }
  confirmDelete() {
    this.timeSheetService.hRM_TimeSheet_Employee_Soon_Late_Register_Delete(this.idSelect).subscribe(
      (respond: any) => {
        if(respond['status'] == 0) this.showMessageSuccess(respond['message'])
        else this.showMessageError(respond['message'])
        this.LoadData();
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
  }
}
