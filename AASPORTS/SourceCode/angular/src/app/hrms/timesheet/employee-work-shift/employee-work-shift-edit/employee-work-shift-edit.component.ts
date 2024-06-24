import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import moment from 'moment';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { InputSelectComponentV2 } from 'src/app/shared/layout/input-control-simple/input-select-v2/input-select-v2.component';
import { FilePickerComponent } from 'src/app/shared/layout/input-control/file-picker/file-picker.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { AllDayModel, EmployeeService, HRM_BranchService, HRM_Branch_ENTITY, HRM_Employee_ENTITY, HRM_Project_Management_Task_WorkTime_ENTITY, HRM_TimeSheet_Employee_Work_Shift_Detail_ENTITY, HRM_TimeSheet_Employee_Work_Shift_ENTITY, HRM_TimeSheet_Work_Shift_ENTITY, HRM_WorkingTimeService, HRM_WorkingTime_ENTITY, TimeSheetService } from 'src/app/shared/service-proxies/api-shared';
import { AlertMessageComponent } from 'src/app/shared/sidenav/alert-message/alert-message.component';
import { SidenavAddEditComponent } from 'src/app/shared/sidenav/sidenav-add-edit/sidenav-add-edit.component';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

declare var initFullCalendar2;
declare var setSelecteWorking;
@Component({
  selector: 'employee-work-shift-edit',
  templateUrl: './employee-work-shift-edit.component.html',
  styleUrls: ['./employee-work-shift-edit.component.css']
})
export class EmployeeWorkShiftEditComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {
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
  title:string = '';
  onSelectWoking(item:string){
    this.workingSelected = this.listWorking.find(e=>e.id.toString() == item);
    setSelecteWorking(this.workingSelected);
    this.UpdateView();
  }
  onSearchEmployee(v:string){
    let t = this.listEmployeeTemp.filter(e=>e.lastName.toUpperCase().includes(v.toUpperCase()) == true || e.firstName.toUpperCase().includes(v.toUpperCase()) == true)
    this.listEmployee = t;
    if(v == "") this.listEmployee = this.listEmployeeTemp;
    this.UpdateView();
  }
  onSelectBranch(item:string){
    let t = this.listEmployeeTemp.filter(e=>item.indexOf(e.branch_code) >= 0)
    this.listEmployee = t;
    if(item == "") this.listEmployee = this.listEmployeeTemp;
    this.UpdateView();
  }
  onclickShowNameTimeSheet(v:boolean){
    this.isShowNameTimeSheet = v;
    this.UpdateView();
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
    if(!this.InputModel.name) {
      this.showMessageError('"Tên bảng công" không được để trống');
      return;
    }
    this.InputModel.hRM_Employees = this.listEmployee;
    if(!this.InputModel.code){
      this.InputModel.id = -1;
      this.timeSheetService.hRM_TimeSheet_Employee_Work_Shift_Insert(this.InputModel).subscribe((respond)=>{
        if(respond['status'] == '0')
        {
          this.InputModel.code = respond['ref_code'];
          this.showMessageSuccess(respond['message']);
          this.LoadData();
        }
        else
          this.showMessageError(respond['message']);
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
      this.timeSheetService.hRM_TimeSheet_Employee_Work_Shift_Update(this.InputModel).subscribe((respond)=>{
        if(respond['status'] == '0')
          {
            this.showMessageSuccess(respond['message']);
            this.LoadData();
          }
        else
          this.showMessageError(respond['message']);
        
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
  onSearch(): void {
    throw new Error('Method not implemented.');
  }
  onResetSearch(): void {
    throw new Error('Method not implemented.');
  }
  valueStartDate(v:any,col:string){
    this.InputModel[col] = v;
    this.renderDataWorkShift();
  }
  onClickAcction(id: number, storedName: string, param: string, keyService: string, classForm: string): void {
    switch(classForm){
      case EditPageState.add:{
        setTimeout(() => {
          this.title = 'Thêm mới';
          this.toolbarEdit.setUiAction(this);
          this.UpdateView();
        }, 100);
        break;
      }
      case EditPageState.edit:{
        break;
      }
      case EditPageState.delete:{
        break;
      }
      case EditPageState.save:{
        this.onSave();
        break;
      }
      case EditPageState.search:{
        break;
      }
      case EditPageState.viewDetail:{
        break;
      }
      case 'Division':{
        this.onclickEdit();
        break;
      }
      default:break;
    }
  }
  getDataByID(storedName: string, param: string, keyService: string): void {
    throw new Error('Method not implemented.');
  }

  @ViewChild('SelectBranchPicker') SelectBranchPicker: InputSelectComponentV2;
  @ViewChild('SelectWorkingPicker') SelectWorkingPicker: InputSelectComponentV2;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  @ViewChild('toolbarEdit') toolbarEdit: ToolbarComponent;
  @ViewChild('sidenavAddEdit') sidenavAddEdit: SidenavAddEditComponent;
  @ViewChild('alertMessage') alertMessage: AlertMessageComponent;
  @ViewChild('dialogDelete') dialogDelete: DialogAcctionComponent;
  @ViewChild('dialogSaveChange') dialogSaveChange: DialogAcctionComponent;
  listBranch:HRM_Branch_ENTITY[] = [];
  listWorking:HRM_WorkingTime_ENTITY[] = [];
  listTimeSheet:HRM_TimeSheet_Employee_Work_Shift_ENTITY[] = [];
  listEmployeeTemp:HRM_Employee_ENTITY[] = [];
  listEmployee:HRM_Employee_ENTITY[] = [];
  employeeModel:HRM_Employee_ENTITY =new HRM_Employee_ENTITY();
  listWorkShift:HRM_TimeSheet_Work_Shift_ENTITY[] = [];
  listDataWorkShift:HRM_TimeSheet_Employee_Work_Shift_Detail_ENTITY[] = [];
  listTaskWorktime:HRM_Project_Management_Task_WorkTime_ENTITY[]=[];
  workingSelected:HRM_WorkingTime_ENTITY = new HRM_WorkingTime_ENTITY();
  employeeSelected:HRM_Branch_ENTITY = new HRM_Branch_ENTITY();
  constHour:number = 0;
  counter:number = 0;
  dataTimeSheet:any = {};
  filterWorkspace:HRM_TimeSheet_Employee_Work_Shift_ENTITY = new HRM_TimeSheet_Employee_Work_Shift_ENTITY();
  InputModel:HRM_TimeSheet_Employee_Work_Shift_ENTITY = new HRM_TimeSheet_Employee_Work_Shift_ENTITY();

  allDay:any[]=[
    {
      name_en:'Monday',
      name_vn:'Thứ 2',
      day:0,
      date:'',
      value:false
    },{
      name_en:'Tuesday',
      name_vn:'Thứ 3',
      day:0,
      date:'',
      value:false
    },{
      name_en:'Wednesday',
      name_vn:'Thứ 4',
      day:0,
      date:'',
      value:false
    },{
      name_en:'Thursday',
      name_vn:'Thứ 5',
      day:0,
      date:'',
      value:false
    },{
      name_en:'Friday',
      name_vn:'Thứ 6',
      day:0,
      date:'',
      value:false
    },{
      name_en:'Saturday',
      name_vn:'Thứ 7',
      day:0,
      date:'',
      value:false
    },{
      name_en:'Sunday',
      name_vn:'Chủ nhật',
      day:0,
      date:'',
      value:false
    },

    {
      name_en:'Monday',
      name_vn:'Thứ 2',
      day:0,
      date:'',
      value:false
    },{
      name_en:'Tuesday',
      name_vn:'Thứ 3',
      day:0,
      date:'',
      value:false
    },{
      name_en:'Wednesday',
      name_vn:'Thứ 4',
      day:0,
      date:'',
      value:false
    },{
      name_en:'Thursday',
      name_vn:'Thứ 5',
      day:0,
      date:'',
      value:false
    },{
      name_en:'Friday',
      name_vn:'Thứ 6',
      day:0,
      date:'',
      value:false
    },{
      name_en:'Saturday',
      name_vn:'Thứ 7',
      day:0,
      date:'',
      value:false
    },{
      name_en:'Sunday',
      name_vn:'Chủ nhật',
      day:0,
      date:'',
      value:false
    },

    {
      name_en:'Monday',
      name_vn:'Thứ 2',
      day:0,
      date:'',
      value:false
    },{
      name_en:'Tuesday',
      name_vn:'Thứ 3',
      day:0,
      date:'',
      value:false
    },{
      name_en:'Wednesday',
      name_vn:'Thứ 4',
      day:0,
      date:'',
      value:false
    },{
      name_en:'Thursday',
      name_vn:'Thứ 5',
      day:0,
      date:'',
      value:false
    },{
      name_en:'Friday',
      name_vn:'Thứ 6',
      day:0,
      date:'',
      value:false
    },{
      name_en:'Saturday',
      name_vn:'Thứ 7',
      day:0,
      date:'',
      value:false
    },{
      name_en:'Sunday',
      name_vn:'Chủ nhật',
      day:0,
      date:'',
      value:false
    },

    {
      name_en:'Monday',
      name_vn:'Thứ 2',
      day:0,
      date:'',
      value:false
    },{
      name_en:'Tuesday',
      name_vn:'Thứ 3',
      day:0,
      date:'',
      value:false
    },{
      name_en:'Wednesday',
      name_vn:'Thứ 4',
      day:0,
      date:'',
      value:false
    },{
      name_en:'Thursday',
      name_vn:'Thứ 5',
      day:0,
      date:'',
      value:false
    },{
      name_en:'Friday',
      name_vn:'Thứ 6',
      day:0,
      date:'',
      value:false
    },{
      name_en:'Saturday',
      name_vn:'Thứ 7',
      day:0,
      date:'',
      value:false
    },{
      name_en:'Sunday',
      name_vn:'Chủ nhật',
      day:0,
      date:'',
      value:false
    },

    {
      name_en:'Monday',
      name_vn:'Thứ 2',
      day:0,
      date:'',
      value:false
    },{
      name_en:'Tuesday',
      name_vn:'Thứ 3',
      day:0,
      date:'',
      value:false
    },{
      name_en:'Wednesday',
      name_vn:'Thứ 4',
      day:0,
      date:'',
      value:false
    },{
      name_en:'Thursday',
      name_vn:'Thứ 5',
      day:0,
      date:'',
      value:false
    },{
      name_en:'Friday',
      name_vn:'Thứ 6',
      day:0,
      date:'',
      value:false
    },{
      name_en:'Saturday',
      name_vn:'Thứ 7',
      day:0,
      date:'',
      value:false
    },{
      name_en:'Sunday',
      name_vn:'Chủ nhật',
      day:0,
      date:'',
      value:false
    }
  ]
  tbName: string = 'HRM_TimeSheet_Employee_Work_Shift';
  isShowNameTimeSheet:boolean = false;
  ngOnInit(): void {
    this.setAcction();
    if(this.getCurrenFrom == EditPageState.edit)this.LoadData();
    if(this.getCurrenFrom == EditPageState.viewDetail)this.LoadData();
    if(this.getCurrenFrom == EditPageState.add)
    {
      this.InputModel = new HRM_TimeSheet_Employee_Work_Shift_ENTITY();
      this.initCombobox();
      initFullCalendar2(moment(),[]);
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
  get random():string{
    this.counter++;
    return this.counter.toString();
  }
  onChangeCheckbox(v:boolean,work_shift:any,today:any,i:number){
    // SetData
    work_shift.allDay[i].value=v;
    var index = this.listEmployee.findIndex(x => x.code == work_shift.allDay[i].employee_code);
    var index_sub = this.listEmployee[index].hRM_TimeSheet_Work_Shifts.findIndex(x => x.code == work_shift.code)
    this.listEmployee[index].hRM_TimeSheet_Work_Shifts[index_sub].allDay = work_shift.allDay;

      
    let listDataWorkShift_orther = this.listDataWorkShift.filter(f=>f.employee_code != this.employeeModel.code)
    let listDataWorkShift_is_employee = this.listDataWorkShift.filter(f=>f.employee_code == this.employeeModel.code)

    listDataWorkShift_is_employee.forEach(ws=>{
      if(ws.work_shift_code == work_shift.code && today.day == ws.day){
        // if(!ws.is_valid)ws.id =  -parseInt((Math.abs(Math.random())*100000).toString());
        ws.is_valid = v;
        ws.start_time = today.date;
        if(v){
          ws.employee_name = this.employeeModel.firstName + ' ' + this.employeeModel.lastName; 
          ws.employee_code = this.employeeModel.code;
          ws.title =  ws.employee_name + ' ['+work_shift.name+']';
          ws.work_date = today.date;
          ws.end_time = work_shift.end_time;
          // ws.start_time = work_shift.start_time;
        }
        else{
          //console.log('unselect'+JSON.stringify(ws))
          // ws.employee_name = null;
          // ws.employee_code = undefined;
          // ws.title =  undefined;
           ws.work_date = undefined;
          // ws.end_time = undefined;
        }
      }
    })
    this.listDataWorkShift = [...listDataWorkShift_orther,...listDataWorkShift_is_employee];
    this.renderDataWorkShift();
    this.UpdateView();
  }

  onSelectEmployee(emp:any){
    if(this.employeeModel.code != emp.code) this.called = false;
    this.employeeModel = emp;
    this.listEmployee.forEach(e=>{
      if(e.code == emp.code) e['class']='active';
      else e['class']='';
    })
    // this.allDay = this.listEmployee.find(em=>em.code == emp.code)['allDay'];
    this.UpdateView();
    var p2 = new HRM_TimeSheet_Employee_Work_Shift_ENTITY();
    p2.type = 'ALL';
    p2.work_date = this.InputModel.work_date;
    p2.login_user = emp.code;
    p2.code = this.InputModel.code;
    if(this.listDataWorkShift.length >0){
     try{
      var m = this.listDataWorkShift[0].work_date.month(),y = this.listDataWorkShift[0].work_date.year();
      if(m != p2.work_date.month() || y != p2.work_date.year()){
        this.dialogSaveChange.content = 'Bạn có muốn lưu thay đổi '+(m+1)+'/'+y+'?';
        this.dialogSaveChange.open();
      }
     }catch{}
    } 
    this.CallHRM_TimeSheet_Employee_Work_Shift_Detail_All_Day_In_Month(p2,emp);
  }
  called:boolean = false;
  CallHRM_TimeSheet_Employee_Work_Shift_Detail_All_Day_In_Month(input:HRM_TimeSheet_Employee_Work_Shift_ENTITY,emp:any){
    if(this.called) return;
    this.timeSheetService.hRM_TimeSheet_Employee_Work_Shift_Detail_All_Day_In_Month(input).subscribe(
      (data: any) => {
        this.called = true;
        if(this.InputModel.code){
          //Xóa dữ liệu trong bảng detail
          this.InputModel.hrM_TimeSheet_Employee_Work_Shift_Details = this.InputModel.hrM_TimeSheet_Employee_Work_Shift_Details.filter(detail=>detail.employee_code != emp.code);
        }
        let listDataWorkShift_orther = this.listDataWorkShift.filter(e=>e.employee_code != input.login_user);
        let listDataWorkShift_is_employee = this.listDataWorkShift.filter(e=>e.employee_code == input.login_user);
        if(listDataWorkShift_is_employee.length == 0 || listDataWorkShift_is_employee.length < data.length)
          this.listDataWorkShift = [...listDataWorkShift_orther,...data];
        else if(listDataWorkShift_is_employee.length == data.length)
          data = listDataWorkShift_is_employee;
        this.renderDataWorkShift();
        this.listWorkShift = this.listEmployee.find(x => x.code == emp.code).hRM_TimeSheet_Work_Shifts;
        var onlyone = false;
        if(this.listWorkShift)
          {
            this.listWorkShift.forEach(ws=>{
              var index = 0;
              
              for(var i = 0 ; i < ws.allDay.length ; i++)
                if(ws.allDay[i].name_en == data[0].dates_name){
                  index = i;break;
                }
              let arT = data.filter(e=>e.work_shift_code == ws.code && e.employee_code == this.employeeModel.code);
              var sortedArray = arT.sort((n1,n2) => {
                  if (n1.day > n2.day) {
                      return 1;
                  }
                  if (n1.day < n2.day) {
                      return -1;
                  }
                  return 0;
              });
              // ws.allDay = sortedArray;
              for(var j = 0; j < sortedArray.length ; j++){
                if(index<=34){
                  ws.allDay[index].date = sortedArray[j].dates;
                  ws.allDay[index].day = sortedArray[j].day;
                  ws.allDay[index].value = sortedArray[j].is_valid;
                }
                if(!onlyone){
                  this.allDay[index].date = sortedArray[j].dates;
                  this.allDay[index].day = sortedArray[j].day;
                  this.allDay[index].value = sortedArray[j].is_valid;
                }
                index++;
              }
              onlyone = true;
            })
          }
        this.UpdateView();
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
  }
  confirmSaveData(){
    this.onSave();
  }
  LoadData(){
    var p2 = new HRM_TimeSheet_Employee_Work_Shift_ENTITY();
    p2.type = 'BY_EMPLOYEE_CODE';
    p2.work_date = moment();
    p2.code = this.idSelect;
    if(this.getCurrenFrom == EditPageState.viewDetail)p2.login_user = this.appSession.user.code;
    this.timeSheetService.hRM_TimeSheet_Employee_Work_Shift_Bycode(p2).subscribe(
      (data: any) => {
        this.InputModel = data;
        this.listDataWorkShift = data.hrM_TimeSheet_Employee_Work_Shift_Details;
        this.initCombobox();
        this.renderDataWorkShift();
        this.UpdateView();
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
  }
  renderDataWorkShift(){
    let array = [];
    this.listDataWorkShift.forEach(ws=>{
      let obj = {id:0,title:'',start:null,end:null,className:'',allDay:!0,url:'#',employee_code:'',work_shift_code:''};
      try{
        if(ws.id==0) {
          let t = -parseInt((Math.abs(Math.random())*100000).toString());
          ws.id = t;
        }
        var m = (ws.work_date.month()+1)>9?ws.work_date.month()+1:'0'+(ws.work_date.month()+1);
        var d = (ws.work_date.date())>9?ws.work_date.date():'0'+(ws.work_date.date());
        obj.id = ws.id;
        obj.title = ws.title;
        obj.start = ws.work_date.year()+'-'+m+'-'+d;
        obj.end = ws.work_date.year()+'-'+m+'-'+d;
        obj.url = 'javascript:;';
        obj.employee_code = ws.employee_code;
        obj.work_shift_code = ws.work_shift_code
        array.push(obj);
      }catch{
         console.log(ws);
      }
    })
    this.listEmployee.forEach(emp=>{
      let total = 0;
      let list_working = array.filter(ws=>ws.employee_code == emp.code);
      list_working.forEach(lst=>{
        total += this.listWorkShift.find(ws=>ws.code == lst.work_shift_code).total_time;
      })
      emp['total_time_work'] = total;
    })
    initFullCalendar2(this.InputModel.work_date?this.InputModel.work_date:moment(),array);
  }
  onclickEdit(){
    if(!this.InputModel.work_date || this.InputModel.work_date == null){
      this.showMessageError('"NGày bắt đầu" không được để trống')
      return;
    }
    this.sidenavAddEdit.title = this.InputModel.name;
    this.sidenavAddEdit.open();
    let emp = this.listEmployee.find(e=>e.code == this.appSession.user.code);
    if(this.employeeModel.code) this.onSelectEmployee(this.employeeModel);
    else this.onSelectEmployee(emp);
    this.set_side_edit_refresh_action(false);
    this.setCurrenFrom(EditPageState.edit);
  }
  initLoadTaskWorktime(){
    let param = new HRM_Project_Management_Task_WorkTime_ENTITY();
    param.month = this.InputModel.work_date.month()+1;
    if(this.getCurrenFrom == EditPageState.viewDetail)param.employee_code = this.appSession.user.code;
    else param.employee_code = '';
    this.hRM_WorkingTimeService.hRM_Project_Management_Task_WorkTime_Search(param).subscribe(
      (data: any) => {
        this.listTaskWorktime = data;
        this.listEmployee.forEach(em=>{
          let total = 0 ;
          this.listTaskWorktime.filter(t=>t.employee_code==em.code).forEach(t2=>{total += t2.total_hour;});
          em['total_hour_working'] = total;
        })
        this.UpdateView();
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
  }
  initLoadEmployee(){
    this.BlockUI();
    let p = new HRM_Employee_ENTITY();
    if(this.getCurrenFrom == EditPageState.viewDetail)p.code = this.appSession.user.code;
    this.listEmployee = [];
    this.employeeService.hRM_Employee_Search(p).subscribe(
      (data: any) => {
        try{
          if(data)
          {
            data.forEach(e=>{
              e.id = e.id;
              e['name'] = e.firstName + ' ' +e.lastName; 
              e['class']='';
              var listWS = [];
              this.listWorkShift.forEach(ws=>{
                var t = new HRM_TimeSheet_Work_Shift_ENTITY();
                t.id = ws.id;
                t.code = ws.code;
                t.day_in_week = ws.day_in_week;
                t.start_time = ws.start_time;
                t.start_time_f = ws.start_time_f;
                t.end_time = ws.end_time;
                t.end_time_f = ws.end_time_f;
                t.total_time = ws.total_time;
                t.type = ws.type;
                t.name = ws.name;
                t.monday = ws.monday;
                t.tuesday = ws.tuesday;
                t.wednesday = ws.wednesday;
                t.thursday = ws.thursday;
                t.friday = ws.friday;
                t.saturday = ws.saturday;
                t.sunday = ws.sunday;
                t.allDay = ws.allDay;
                listWS.push(t);
              })
              listWS.forEach(ws=>{
                e.allDay = [];
                for(var i = 0; i < this.allDay.length ; i++){
                  var T = new AllDayModel();
                  T.employee_code = e.code;
                  T.name_en = this.allDay[i].name_en;
                  T.name_vn= this.allDay[i].name_vn;
                  T.day= this.allDay[i].day;
                  T.date= this.allDay[i].date;
                  T.value= this.allDay[i].value;
                  e.allDay.push(T);
                };
                ws.allDay = e.allDay;
              })
              e.hRM_TimeSheet_Work_Shifts = listWS;
              this.listEmployee.push(e);
            })
          }
          if(this.getCurrenFrom == EditPageState.viewDetail)this.listEmployee =this.listEmployee.filter(f=>f.code == this.appSession.user.code);
          this.initLoadTaskWorktime();
          this.UpdateView();
        }catch{
          this.UnBlockUI();
        }
        
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
  }
  initCombobox(){
    var p2 = new HRM_TimeSheet_Employee_Work_Shift_ENTITY();
    p2.type = 'ALL';
    this.timeSheetService.hRM_TimeSheet_Work_Shift_Search(p2).subscribe(
      (data: any) => {
        this.listWorkShift = data;
        this.listWorkShift.forEach(e=>e['class'] = this.random);
        this.initLoadEmployee();
        this.UpdateView();
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
  }
  onClickTR(e:any){
    $('.tr-ws').removeClass('active');
    $('.'+e).addClass('active')
  }
}
