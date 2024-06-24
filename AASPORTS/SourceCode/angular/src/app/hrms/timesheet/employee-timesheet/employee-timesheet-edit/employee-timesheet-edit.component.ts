import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import moment from 'moment';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { InputSelectComponentV2 } from 'src/app/shared/layout/input-control-simple/input-select-v2/input-select-v2.component';
import { FilePickerComponent } from 'src/app/shared/layout/input-control/file-picker/file-picker.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { EmployeeService, HRM_BranchService, HRM_Branch_ENTITY, HRM_Employee_Check_In_Out_ENTITY, HRM_Employee_ENTITY, HRM_Employee_Labour_Contract_Appendix_ENTITY, HRM_Employee_Labour_Contract_ENTITY, HRM_Holiday_ENTITY, HRM_TimeSheet_Attendance_ENTITY, HRM_Timesheet_Employee_Mission_Allowance_ENTITY, HRM_Timesheet_Employee_Overtime_ENTITY, HRM_TimeSheet_Employee_Soon_Late_Register_ENTITY, HRM_Timesheet_Employee_Update_Timkeeping_ENTITY, HRM_WorkingTimeService, TimeSheetService } from 'src/app/shared/service-proxies/api-shared';
import { AlertMessageComponent } from 'src/app/shared/sidenav/alert-message/alert-message.component';
import { SidenavAddEditComponent } from 'src/app/shared/sidenav/sidenav-add-edit/sidenav-add-edit.component';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

declare var initFullCalendar3;
declare var initFullCalendar3_data;
declare var calendar3;
declare var removeCalender3;
declare var _history_checkin_employee_code,_history_checkin_day;
@Component({
  selector: 'app-employee-timesheet-edit',
  templateUrl: './employee-timesheet-edit.component.html',
  styleUrls: ['./employee-timesheet-edit.component.css']
})
export class EmployeeTimesheetEditComponent  extends LayoutComponentBase implements OnInit, IUiAction<any> {
  constructor(
    private injector: Injector,
    private appSession: AppSession,
    private branchService:HRM_BranchService,
    private employeeService:EmployeeService,
    private filePickerComponent: FilePickerComponent,
    private hRM_WorkingTimeService:HRM_WorkingTimeService,
    private timeSheetService:TimeSheetService
  ) {
    super(injector);
    this.idSelect = this.getRouteParam('code');
    this.setCurrenFrom(this.getRouteParam('form'));
    this.InputModel.code = this.idSelect;
  }
  tbName: string = 'HRM_Employee_Check_In_Out';
  isEdit:boolean = false;
  isTarget:boolean = false;
  @ViewChild('SelectBranchPicker') SelectBranchPicker: InputSelectComponentV2;
  @ViewChild('SelectWorkingPicker') SelectWorkingPicker: InputSelectComponentV2;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  @ViewChild('toolbarEdit') toolbarEdit: ToolbarComponent;
  @ViewChild('sidenavAddEdit') sidenavAddEdit: SidenavAddEditComponent;  
  @ViewChild('sidenavUpdateTarget') sidenavUpdateTarget: SidenavAddEditComponent;
  @ViewChild('alertMessage') alertMessage: AlertMessageComponent;
  @ViewChild('dialogDelete') dialogDelete: DialogAcctionComponent;
  @ViewChild('dialogSaveChange') dialogSaveChange: DialogAcctionComponent;
  @ViewChild('dialogHistory') dialogHistory: DialogAcctionComponent;
  listBranch:HRM_Branch_ENTITY[] = [];
  listEmployeeT:HRM_Employee_ENTITY[] = [];
  listEmployee:HRM_Employee_ENTITY[] = [];
  listAttendance:HRM_TimeSheet_Attendance_ENTITY[]=[];
  listSoonLate:HRM_TimeSheet_Employee_Soon_Late_Register_ENTITY[]=[];
  listLabourContractAppendix:HRM_Employee_Labour_Contract_Appendix_ENTITY[]=[];
  employeeModel:HRM_Employee_ENTITY =new HRM_Employee_ENTITY();
  employeeSelected:HRM_Employee_ENTITY =new HRM_Employee_ENTITY();
  constHour:number = 0;
  counter:number = 0;
  dataTimeSheet:any = {};
  InputModel:HRM_Employee_Check_In_Out_ENTITY = new HRM_Employee_Check_In_Out_ENTITY();
  datas:any[] = [];
  totalOvertime:number = 0;
  totalSoon:number = 0;
  totalLate:number = 0;
  totalDayOff:number = 0;
  listHistory:HRM_Employee_Check_In_Out_ENTITY[]=[];
  iframe:string = '';
  filterName:string = '';
  username:string = this.appSession.user.username.toUpperCase();
  latitude:any;
  longitude:any;
  modelResult:HRM_Employee_Check_In_Out_ENTITY=new HRM_Employee_Check_In_Out_ENTITY();
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
    this.InputModel.filter_date = this.getDateCalendar;
    this.datas = [];
    this.LoadEmployee_Timesheet();
    this.LoadData();
  }
  onClickAcction(id: number, storedName: string, param: string, keyService: string, classForm: string): void {
    switch (classForm) {
      case 'SaveTarget':
        var input = new HRM_Employee_Labour_Contract_ENTITY();
        input.hRM_Employee_Labour_Contract_Appendixs = this.listLabourContractAppendix;
        input.employee_code = this.employeeSelected.code;
        input.month = (this.InputModel.filter_date.month()+1);
        input.year = this.InputModel.filter_date.year();
        this.employeeService.hRM_Employee_Labour_Contract_Appendix_Target_Update(input).subscribe(res=>{
          if(res['status'] == 0) this.alertMessage.AlertSuccess(res['message']);
          else this.alertMessage.AlertError(res['message'])
        })
        break;
    }
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
  get getDateCalendar():moment.Moment{
    // debugger
    let today = moment();
    // today.set('date',15);
    if(calendar3){
      today.set('month',calendar3.getDate().getMonth());
      today.set('year',calendar3.getDate().getFullYear());
    }
    return today
  }
  LoadHistory(){
    var p2 = new HRM_Employee_Check_In_Out_ENTITY();
    p2.filter_date = this.InputModel.filter_date.set('date',Number(_history_checkin_day)).utc(true);
    p2.code = this.idSelect;
    p2.employee_code = _history_checkin_employee_code;
    p2.type = 'HISTORYDAY';
    this.employeeService.hRM_Employee_Check_In_Out_Search(p2).subscribe(
      (data: any) => {
        console.log(data)
        this.modelResult = data[0];
        if(this.modelResult.work_day_total > 1) this.modelResult.work_day_total = 1;
        this.modelResult['work_day_totals'] = this.modelResult.work_day_total.toFixed(2)
        this.dialogHistory.open();
        this.appenMap('iframe-map-in',this.modelResult.latitude_in,this.modelResult.longitude_in);
        this.UpdateView();
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
  }
  OpenMap(id:any){
    this.listHistory.forEach(item=>{
      if(item.id == id){
        item['open'] = true;
        setTimeout(() => {
          document.getElementById('iframe-map-'+id)['src'] ='https://maps.google.com/maps?q='+item.latitude+','+item.longitude+'&z=15&output=embed'
        }, 100);
      }else
        item['open'] = false;
    })
    this.UpdateView();
  }
  appenMap(id:string,lat:any,lng:any){
    setTimeout(() => {
      document.getElementById(id)['src']=`https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`
    }, 100);
  }
  renderData(date:any,data:HRM_Employee_Check_In_Out_ENTITY[]){
    let array = [];
    this.totalSoon = 0
    this.totalLate = 0
    data.forEach(check=>{
      this.totalLate += check.late
      this.totalSoon += check.soon
      let obj = {id:0,title:'',start:null,end:null,className:'',allDay:!0,url:'#',employee_code:'',work_shift_code:''};
      try{
        obj.id = this.datas.length==0?check.id:-parseInt((Math.abs(Math.random())*100000).toString());
        obj.title = check.title
        obj.start = check.dates;
        obj.url = 'javascript:LoadHistoryCheckin(`'+check.employee_code+'`,`'+check._day+'`);';
        obj.employee_code = check.employee_code;
        obj.work_shift_code = check.code
        array.push(obj);
      }catch{
         console.log(check);
      }
    })
    this.datas = [...this.datas,...array];
    initFullCalendar3(date,this.datas);
  }
  LoadSoon_Late_Register(employee_code:string = undefined){
    var pr0= new HRM_TimeSheet_Employee_Soon_Late_Register_ENTITY();
    pr0.login_account = employee_code?employee_code:this.appSession.user.code;
    pr0.type = '1';
    pr0.start_datetime = this.InputModel.filter_date;
    this.timeSheetService.hRM_TimeSheet_Employee_Soon_Late_Register_Search(pr0).subscribe(
      (data: HRM_TimeSheet_Employee_Soon_Late_Register_ENTITY[]) => {
        let array = [];
        data.forEach(check=>{
          let obj = {id:0,title:'',start:null,end:null,className:'',allDay:!0,url:'#',employee_code:'',work_shift_code:''};
          try{
            obj.id = this.datas.length==0?check.id:-parseInt((Math.abs(Math.random())*100000).toString());
            obj.title = check.type_request_name;
            obj.start = check.start_datetime_f_en;
            obj.end = check.end_datetime_f_en;
            obj.allDay=!1;
            obj.url = 'javascript:openNewtag(`/timesheet/employee-soon-late-register`);';
            obj.employee_code = employee_code?employee_code:this.appSession.user.code;
            obj.work_shift_code = check.code
            obj.className = check.class_name
            array.push(obj);
          }catch{
            console.log(check);
          }
        })
        this.datas = [...this.datas,...array];
        initFullCalendar3(this.InputModel.filter_date,this.datas);
        this.UpdateView();
        this.UnBlockUI();
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
  }
  LoadAttendance(employee_code:string = undefined){
    var pr = new HRM_TimeSheet_Attendance_ENTITY();
    pr.login_account = employee_code?employee_code:this.appSession.user.code;
    pr.employee_code = employee_code?employee_code:this.appSession.user.code;
    pr.start_datetime = this.InputModel.filter_date;
    pr.type = '1';
    this.timeSheetService.hRM_TimeSheet_Attendance_Search(pr).subscribe(
      (data: HRM_TimeSheet_Attendance_ENTITY[]) => {
        let array = [];
      this.totalDayOff = 0;
        data.forEach(check=>{
          if(check.approve_status == '1D8A876E-01F6-43E2-BFB0-1491B6BAD019')
            this.totalDayOff +=check.day_number; 
          let obj = {id:0,title:'',start:null,end:null,className:'',allDay:!0,url:'#',employee_code:'',work_shift_code:''};
          try{
            obj.id = this.datas.length==0?check.id:-parseInt((Math.abs(Math.random())*100000).toString());
            obj.title = check.type_off_name_title;
            obj.start = check.start_datetime_f_en;
            obj.end = check.end_datetime_f_en;
            obj.allDay=!1;
            obj.url = 'javascript:openNewtag(`/timesheet/attendance`);';
            obj.employee_code = employee_code?employee_code:this.appSession.user.code;
            obj.work_shift_code = check.code
            obj.className = check.class_name
            array.push(obj);
          }catch{
            console.log(check);
          }
        })
        this.datas = [...this.datas,...array];
        initFullCalendar3(this.InputModel.filter_date,this.datas);
        this.UpdateView();
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
  }
  LoadOvertime(employee_code:string = undefined){
    var pr = new HRM_Timesheet_Employee_Overtime_ENTITY();
    pr.login_account = employee_code?employee_code:this.appSession.user.code;
    pr.type = '1';
    pr.start_datetime = this.InputModel.filter_date;
    this.timeSheetService.hRM_Timesheet_Employee_Overtime_Search(pr).subscribe(
      (data: HRM_Timesheet_Employee_Overtime_ENTITY[]) => {
        let array = [];
        this.totalOvertime = 0;
        data.forEach(check=>{
          if(check.approve_status == 'EC49059D-C574-4CF6-9757-DCD605E01A18')
            this.totalOvertime += check.total_hour;
          let obj = {id:0,title:'',start:null,end:null,className:'',allDay:!0,url:'#',employee_code:'',work_shift_code:''};
          try{
            obj.id = this.datas.length==0?check.id:-parseInt((Math.abs(Math.random())*100000).toString());
            obj.title = 'Tăng ca - '+check.work_land_name;
            obj.start = check.start_datetime_f_en;
            obj.end = check.end_datetime_f_en;
            obj.allDay=!1;
            obj.url = 'javascript:openNewtag(`/timesheet/overtime-request`);';
            obj.employee_code = employee_code?employee_code:this.appSession.user.code;
            obj.work_shift_code = check.code
            obj.className = check.class_name
            array.push(obj);
          }catch{
            console.log(check);
          }
        })
        this.datas = [...this.datas,...array];
        initFullCalendar3(this.InputModel.filter_date,this.datas);
        this.UpdateView();
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
  }
  LoadMissionAllowance(employee_code:string = undefined){
    var pr = new HRM_Timesheet_Employee_Mission_Allowance_ENTITY();
    pr.login_account = employee_code?employee_code:this.appSession.user.code;
    pr.type = '1';
    pr.start_datetime = this.InputModel.filter_date;
    this.timeSheetService.hRM_Timesheet_Employee_Mission_Allowance_Search(pr).subscribe(
      (data: HRM_Timesheet_Employee_Mission_Allowance_ENTITY[]) => {
        let array = [];
        data.forEach(check=>{
          let obj = {id:0,title:'',start:null,end:null,className:'',allDay:!0,url:'#',employee_code:'',work_shift_code:''};
          try{
            obj.id = this.datas.length==0?check.id:-parseInt((Math.abs(Math.random())*100000).toString());
            obj.title = 'Đi công tác';
            obj.start = check.start_datetime_f_en;
            obj.end = check.end_datetime_f_en;
            obj.allDay=!1;
            obj.url = 'javascript:openNewtag(`/timesheet/employee-mission-allowance`);';
            obj.employee_code = employee_code?employee_code:this.appSession.user.code;
            obj.work_shift_code = check.code
            obj.className = check.class_name
            array.push(obj);
          }catch{
            console.log(check);
          }
        })
        this.datas = [...this.datas,...array];
        initFullCalendar3(this.InputModel.filter_date,this.datas);
        this.UpdateView();
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
  }
  LoadUpdateTimkeeping(employee_code:string = undefined){
    var pr = new HRM_Timesheet_Employee_Update_Timkeeping_ENTITY();
    pr.login_account = employee_code?employee_code:this.appSession.user.code;
    pr.type = '1';
    pr.start_datetime = this.InputModel.filter_date;
    this.timeSheetService.hRM_Timesheet_Employee_Update_Timkeeping_Search(pr).subscribe(
      (data: HRM_Timesheet_Employee_Update_Timkeeping_ENTITY[]) => {
        let array = [];
        data.forEach(check=>{
          let obj = {id:0,title:'',start:null,end:null,className:'',allDay:!0,url:'#',employee_code:'',work_shift_code:''};
          try{
            obj.id = this.datas.length==0?check.id:-parseInt((Math.abs(Math.random())*100000).toString());
            obj.title = 'Yêu cầu bù công';
            obj.start = check.start_datetime_f_en;
            obj.end = check.end_datetime_f_en;
            obj.allDay=!1;
            obj.url = 'javascript:openNewtag(`/timesheet/update-timkeeping-request`);';
            obj.employee_code = employee_code?employee_code:this.appSession.user.code;
            obj.work_shift_code = check.code
            obj.className = check.class_name
            array.push(obj);
          }catch{
            console.log(check);
          }
        })
        this.datas = [...this.datas,...array];
        initFullCalendar3(this.InputModel.filter_date,this.datas);
        this.UpdateView();
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
  }
  LoadHoliday(){
    var pr = new HRM_Holiday_ENTITY();
    pr.start_date = this.InputModel.filter_date;
    this.timeSheetService.hRM_Holiday_Search(pr).subscribe(
      (data: HRM_Holiday_ENTITY[]) => {
        let array = [];
        this.totalOvertime = 0;
        data.forEach(check=>{
          let obj = {id:0,title:'',start:null,end:null,className:'',allDay:!0,url:'#',employee_code:'',work_shift_code:''};
          try{
            obj.id = this.datas.length==0?check.id:-parseInt((Math.abs(Math.random())*100000).toString());
            obj.title = check.name;
            obj.start = check.start_date_f_en;
            obj.end = check.end_date_f_en;
            obj.allDay=!1;
            obj.url = 'javascript:;';
            obj.employee_code = this.appSession.user.code;
            obj.work_shift_code = check.code
            obj.className = 'event-rose'
            array.push(obj);
          }catch{
            console.log(check);
          }
        })
        this.datas = [...this.datas,...array];
        initFullCalendar3(this.InputModel.filter_date,this.datas);
        this.UpdateView();
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
  }
  LoadData(employee_code:string = undefined){
    this.BlockUI();
    var p2 = new HRM_Employee_Check_In_Out_ENTITY();
    p2.filter_date = this.InputModel.filter_date;
    p2.code = this.idSelect;
    p2.employee_code = employee_code?employee_code:this.appSession.user.code;
    this.employeeService.hRM_Employee_Check_In_Out_Search(p2).subscribe(
      (data: HRM_Employee_Check_In_Out_ENTITY[]) => {
        this.renderData(this.InputModel.filter_date,data);
        this.LoadSoon_Late_Register(employee_code);
        this.LoadAttendance(employee_code);
        this.LoadOvertime(employee_code);
        this.LoadMissionAllowance(employee_code);
        this.LoadUpdateTimkeeping(employee_code);
        this.LoadHoliday();
        this.UpdateView();
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
    
  }
  loadComboboxEmployee(){
    this.BlockUI();
    let c = new HRM_Employee_ENTITY();
    c.type = "timesheet";
    this.listEmployee = [];
    c.user_login = this.appSession.user.code;
    this.employeeService.hRM_Employee_Search(c).subscribe(
      (data: any) => {
        this.listEmployee = data;
        this.listEmployeeT = this.listEmployee;
        this.LoadEmployee_Timesheet();
        this.UpdateView();
        this.LoadData();
        this.UnBlockUI();
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
  }
  LoadEmployee_Timesheet(){
    this.BlockUI();
    var p2 = new HRM_Employee_Check_In_Out_ENTITY();
    p2.filter_date = this.InputModel.filter_date;
    this.employeeService.hRM_Employee_Timesheet_Search(p2).subscribe(
      (data2: HRM_Employee_Check_In_Out_ENTITY[]) => {
        this.listEmployee.forEach(e=>{
          e['name'] = e.firstName + ' '+ e.lastName;
          e.work_day = data2.find(f=>f.employee_code == e.code).work_day_total;
          if(e['code'] == this.appSession.user.code){
            e['class'] = 'active';
            this.employeeModel.work_day = e.work_day;
            this.employeeModel.is_show_list_employee = e.is_show_list_employee;
          }
        })
        this.UnBlockUI();
        this.UpdateView();
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
  }
  onSelectEmployee(emp:any){
    this.employeeSelected = emp;
    initFullCalendar3_data = [];
    this.InputModel.filter_date = this.getDateCalendar;
    removeCalender3();
    this.datas = [];
    this.employeeModel.work_day = emp.work_day;
    this.listEmployee.forEach(e=>{
      if(e.code == emp.code) e['class']='active';
      else e['class']='';
    })
    this.LoadData(emp.code);
  }
  onUpdateTarget(){
    if((this.employeeModel.is_show_list_employee) || this.username == 'ROOT'){
      this.isEdit = false;
      this.isTarget = true;
      
      this.employeeService.hRM_Employee_Labour_Contract_Appendix_Search({
        employee_code:this.employeeSelected.code,
        month:(this.InputModel.filter_date.month()+1),
        year:this.InputModel.filter_date.year(),
        type:'BY_EMPLOYEE'
      } as HRM_Employee_Labour_Contract_Appendix_ENTITY).subscribe((res:HRM_Employee_Labour_Contract_Appendix_ENTITY[])=>{
        this.sidenavUpdateTarget.title = 'Cập nhật doanh số trong tháng '+(this.InputModel.filter_date.month()+1);
        this.sidenavUpdateTarget.open();
        this.listLabourContractAppendix = res;
        this.toolbarEdit.setUiAction(this);
      })
    }
    else this.showMessageWarning('Bạn chưa được cấp quyền cập nhật doanh số')
  }
  onkeypressSearch(e:any){
    console.log(e.target.value)
    this.filterName = e.target.value;
    if(this.filterName!='')
      this.listEmployeeT = this.listEmployee.filter(e=>e['name'].toUpperCase().indexOf(this.filterName.toUpperCase())>=0);
    else this.listEmployeeT = this.listEmployee
    this.UpdateView();
  }
  ngOnInit(): void {
    this.InputModel.filter_date = moment();
    this.loadComboboxEmployee();
  }

}
