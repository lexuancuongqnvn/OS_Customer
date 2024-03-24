import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import moment from 'moment';
import { AppConsts } from 'src/app/app-consts.component';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { InputSelectComponentV2 } from 'src/app/shared/layout/input-control-simple/input-select-v2/input-select-v2.component';
import { FilePickerComponent } from 'src/app/shared/layout/input-control/file-picker/file-picker.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { EmployeeService, HRM_Employee_Report_Salary_Employee_ENTITY, HRM_Employee_Report_Salary_ENTITY, HRM_Report_Attendance_ENTITY, HRM_Report_Employee_Management_Task_WorkTime_ENTITY, HRM_Timesheet_Employee_Overtime_Type_ENTITY, HRM_WorkingTimeService, TimeSheetService } from 'src/app/shared/service-proxies/api-shared';
import { SidenavAddEditComponent } from 'src/app/shared/sidenav/sidenav-add-edit/sidenav-add-edit.component';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';
declare var exportTableToExcel;
declare var renderChartWT;
declare var exportTable2excel;

@Component({
  selector: 'app-attendance-report-v2',
  templateUrl: './attendance-report-v2.component.html',
  styleUrls: ['./attendance-report-v2.component.css']
})
export class AttendanceReportV2Component  extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    private injector: Injector,
    private appSession: AppSession,
    private sanitized: DomSanitizer,
    private timeSheetService:TimeSheetService,
    private hRM_WorkingTimeService:HRM_WorkingTimeService,
    private employeeService:EmployeeService,
  ) {
    super(injector);
  }
  table_employee:any;
  table_day:any;
  table_attendance:any;
  table_soon_late:any;
  table_overtime:any;
  mission_allowance:any;
  table_update_timkeeping:any;
  table_holiday:any;
  table_checkin_out_soon_late:any;
  labour_contract_salary:any;
  employee_labour_contract_appendix:any;
  thead_th:string = '';
  tbody_td:string = '';
  filterInput:HRM_Report_Attendance_ENTITY=new HRM_Report_Attendance_ENTITY();
  listOverTime:HRM_Timesheet_Employee_Overtime_Type_ENTITY[]=[]
  listEmployeeExportSalary:HRM_Employee_Report_Salary_ENTITY= new HRM_Employee_Report_Salary_ENTITY();
  table:string = '';
  tableMarkup: SafeHtml;
  tbName: string = 'HRM_Report_Attendance';
  CurrenFrom:string = EditPageState.view;
  isEdit:boolean = false;
  isAll:boolean = true;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  @ViewChild('dialogChartWT') dialogChartWT: DialogAcctionComponent;
  @ViewChild('sidenavAddEdit') sidenavAddEdit: SidenavAddEditComponent;
  listType:any[]=[
    {code:'NS',name:'Cộng năng suất',is_use:true},
    {code:'PC',name:'Cộng phụ cấp',is_use:false},
    {code:'LATE',name:'Đi trễ',is_use:true}
  ]
  onSelect(e:string,col:string){
    this.listType[0].is_use = e.split(';').includes('NS');
    this.listType[1].is_use = e.split(';').includes('PC');
    this.listType[2].is_use = e.split(';').includes('LATE');
  }
  valueStartDate(e:any,col:string){
    this.filterInput[col] = e;
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
  onClickAcction(id: number, storedName: string, param: string, keyService: string, classForm: string): void {
    switch(classForm){
      case 'export_excel':{
        $('.timesheet-tooltiptext').empty()
        $('.tr-cell-attendance-data i').empty()
        exportTable2excel('table-attendance-report','Timesheet '+this.filterInput.from_date.date()+'-'+(this.filterInput.from_date.month()+1)+'-'+this.filterInput.from_date.year() + ' to ' +this.filterInput.to_date.date()+'-'+(this.filterInput.to_date.month()+1)+'-'+this.filterInput.to_date.year())
        // exportTableToExcel('table-attendance-report','Timesheet '+this.filterInput.from_date.date()+'-'+this.filterInput.from_date.month()+'-'+this.filterInput.from_date.year() + ' to ' +this.filterInput.to_date.date()+'-'+this.filterInput.to_date.month()+'-'+this.filterInput.to_date.year())
        this.onLoad();
        break;
      }
      case 'export_salary':{
        if(!this.listEmployeeExportSalary || this.listEmployeeExportSalary.list_salary_employees.length == 0) {
          this.showMessageError('Bảng công không được phép trống');
          return;
        }
        this.isEdit = true;
        setTimeout(() => {
          this.sidenavAddEdit.open();
        }, 100);
        break;
      }
      case EditPageState.search:{
        this.onLoad();
        break;
      }
      case EditPageState.viewDetail:{
        
        break;
      }
      default:break;
    }
  }
  getDataByID(storedName: string, param: string, keyService: string): void {
    throw new Error('Method not implemented.');
  }
  ExportSalary(){
    this.listEmployeeExportSalary.start_datetime = this.filterInput.from_date;
    this.listEmployeeExportSalary.end_datetime = this.filterInput.to_date;
    this.employeeService.hRM_Employee_Report_Salary_Search(this.listEmployeeExportSalary).subscribe((res:HRM_Employee_Report_Salary_ENTITY)=>{
      console.log(res);
      window.open(AppConsts.baseUrl+res.path, '_blank');
    })
  }
  onChangeValue(v:any,col:string,index:number){
    if(col == 'all'){
      this.listEmployeeExportSalary.list_salary_employees.forEach(item=>{
        item.is_use = v;
      })
    }else{
      this.listEmployeeExportSalary.list_salary_employees[index].is_use = v;
    }
    this.UpdateView();
  }
  onLoad(){
    let colspan_table_day = 0;
    this.listOverTime = [];
    this.BlockUI('Đang tải bảng công...');
    this.timeSheetService.hRM_Timesheet_Employee_Overtime_Type_Search().subscribe((res)=>{
      this.listOverTime = res;
      this.filterInput.user_login = this.appSession.user.code;
      // this.BlockUI('Đang tính lương...');
      this.timeSheetService.hRM_Employee_Salary_By_Report_Attendance_v2_Search(this.filterInput).subscribe(data=>{
        this.UnBlockUI();
        this.thead_th = ``;
        this.tbody_td = '';
        let total_holiday = 0;

        // try{
        //   this.table_holiday = JSON.parse(data.table_holiday);
        //   this.table_holiday.forEach(element => {
        //     total_holiday += parseInt(element['total_day'].toString().replace(',','.'));
        //   });
        // }catch{
        //   total_holiday = 0;
        // };
        try{
          this.table_employee = JSON.parse(data.table_employees);
          this.listEmployeeExportSalary.list_salary_employees = [];
          for(var i = 0 ; i < this.table_employee.length ; i++){
            var employee = this.table_employee[i];
            let last_total = 0;
            let sum_standard = Number(employee.sum_standard?employee.sum_standard:'0');
            total_holiday = Number(employee.total_holiday);
            if(i==0) this.thead_th += `<tr class="tr-header-table-attendance-report">`;
            this.tbody_td += `<tr class="tr-cell-attendance">`;
            this.tbody_td += `<td>${this.leftPad(employee.id,5)}</td>`;
            this.tbody_td += `<td>${employee.name}</td>`;
            this.tbody_td += `<td>${employee.branch_name}</td>`;
            this.tbody_td += `<td>${employee.department_name}</td>`;
            if(i==0){
              this.thead_th += `
                <th scope="col" class="m-w-100">Mã nhân viên</th>
                <th scope="col" class="m-w-150">Họ và tên</th>
                <th scope="col" class="m-w-150">Chi nhánh</th>
                <th scope="col" class="m-w-100">Bộ phận</th>
              `; 
            }
            try{
              this.table_day = JSON.parse(data.table_day);
              this.table_day = this.table_day.find(f=>f['account_id'] == employee['id']);
              let total = 0;
              
              for (let [key, value] of Object.entries(this.table_day)) {
                var _v = Number(value.toString().replace(',','.'));
                if(key != 'account_id' && key != 'id' && key != 'employee_code'){
                  if(i == 0){
                    this.thead_th += `<th scope="col">${key.split('_')[0]}</th>`;
                    colspan_table_day++;
                  }
                  if(_v > 1) {
                    _v = 1;
                  }
                  total += _v;
                  this.tbody_td += `<td class="tr-cell-attendance-data">${value.toString()=='0'?'-':
                  (_v==1?'1':_v.toFixed(3))}</td>`;
                }
              }
              last_total += total;
              this.tbody_td += `<td class="tr-cell-attendance-data">${total==1?'1':total.toFixed(3)}</td>`;
            }catch{
              this.tbody_td += `<td class="tr-cell-attendance-data">-</td>`;
            };
            let total_work_day_minus = 0;
            let tr_log = ''
            try{
              this.table_checkin_out_soon_late = JSON.parse(data.table_checkin_out_soon_late);
              this.table_checkin_out_soon_late = this.table_checkin_out_soon_late.find(f=>f['request_account'] == employee['code']);
              this.tbody_td += `<td class="tr-cell-attendance-data">${this.table_checkin_out_soon_late['late']==0?'-':this.table_checkin_out_soon_late['late']}</td>`;
              this.tbody_td += `<td class="tr-cell-attendance-data">${this.table_checkin_out_soon_late['soon']==0?'-':this.table_checkin_out_soon_late['soon']}</td>`;
              total_work_day_minus = Number(this.table_checkin_out_soon_late['work_day_minus'].replace(',','.'))
              tr_log = this.table_checkin_out_soon_late['log_info']
            }catch{
              this.tbody_td += `<td class="tr-cell-attendance-data">-</td>`;
              this.tbody_td += `<td class="tr-cell-attendance-data">-</td>`;
            };
            
            try{
              this.table_attendance = JSON.parse(data.table_attendance);
              this.table_attendance = this.table_attendance.find(f=>f['request_account'] == employee['code']);
              var attendance_is_salary_0 = Number(this.table_attendance['attendance_is_salary_0'].replace(",","."));
              var attendance_is_salary_1 = Number(this.table_attendance['attendance_is_salary_1'].replace(",","."));
              this.tbody_td += `<td class="tr-cell-attendance-data">${attendance_is_salary_0==0?'-':(attendance_is_salary_0==1?'1':attendance_is_salary_0.toFixed(3))}</td>`;
              this.tbody_td += `<td class="tr-cell-attendance-data">${attendance_is_salary_1==0?'-':(attendance_is_salary_1==1?'1':attendance_is_salary_1.toFixed(3))}</td>`;
              last_total += Number(this.table_attendance['attendance_is_salary_1'].toString().replace(',','.'));
            }catch{
              this.tbody_td += `<td class="tr-cell-attendance-data">-</td>`;
              this.tbody_td += `<td class="tr-cell-attendance-data">-</td>`;
            };
            try{
              this.table_soon_late = JSON.parse(data.table_soon_late);
              this.table_soon_late = this.table_soon_late.find(f=>f['request_account'] == employee['code']);
              var soon_late_is_salary_0 = Number(this.table_soon_late['soon_late_is_salary_0'].replace(",","."));
              var soon_late_is_salary_1 = Number(this.table_soon_late['soon_late_is_salary_1'].replace(",","."));
              this.tbody_td += `<td class="tr-cell-attendance-data">${soon_late_is_salary_0==0?'-':(soon_late_is_salary_0==1?'1':soon_late_is_salary_0.toFixed(3))}</td>`;
              this.tbody_td += `<td class="tr-cell-attendance-data">${soon_late_is_salary_1==0?'-':(soon_late_is_salary_1==1?'1':soon_late_is_salary_1.toFixed(3))}</td>`;
              last_total += Number(this.table_soon_late['soon_late_is_salary_1'].toString().replace(',','.'));
            }catch{
              this.tbody_td += `<td class="tr-cell-attendance-data">-</td>`;
              this.tbody_td += `<td class="tr-cell-attendance-data">-</td>`;
            };
            
            try{
              this.mission_allowance = JSON.parse(data.mission_allowance)
              this.mission_allowance = this.mission_allowance.find(f=>f['request_account'] == employee['code']);
              let mission_allowance = Number(this.mission_allowance['mission_allowance'].toString().replace(",","."))
              this.tbody_td += `<td class="tr-cell-attendance-data">${mission_allowance==0?'-':(mission_allowance==1?'1':mission_allowance.toFixed(3))}</td>`;
              last_total += mission_allowance;
            }catch{
              this.tbody_td += `<td class="tr-cell-attendance-data">-</td>`;
            };
            try{
              this.table_update_timkeeping = JSON.parse(data.table_update_timkeeping)
              this.table_update_timkeeping = this.table_update_timkeeping.find(f=>f['request_account'] == employee['code']);
              let update_timkeeping_value = Number(this.table_update_timkeeping['update_timkeeping_value'].toString().replace(",","."))
              this.tbody_td += `<td class="tr-cell-attendance-data">${update_timkeeping_value==0?'-':(update_timkeeping_value==1?'1':update_timkeeping_value.toFixed(3))}</td>`;
              last_total += update_timkeeping_value;
            }catch{
              this.tbody_td += `<td class="tr-cell-attendance-data">-</td>`;
            };
            try{
              this.table_overtime = JSON.parse(data.table_overtime);
              this.table_overtime = this.table_overtime.filter(f=>f['request_account'] == employee['code']);
              if(this.table_overtime){
                this.listOverTime.forEach(ot=>{
                  var check = false;
                  this.table_overtime.forEach(element => {
                    if(ot.multiplier == element['multiplier']){
                      this.tbody_td += `<td class="tr-cell-attendance-data">${element['ot_time']==0?'-':element['ot_time']}</td>`;
                      last_total += Number(element['ot_time'].toString().replace(',','.'))*ot.multiplier;
                      check = true;
                    }
                  });
                  if(!check){
                    this.tbody_td += `<td class="tr-cell-attendance-data">-</td>`;
                  }
                })
              }else{
                this.listOverTime.forEach(element => {
                  this.tbody_td += `<td class="tr-cell-attendance-data">-</td>`;
                });
              }
              
            }catch{
              this.listOverTime.forEach(element => {
                this.tbody_td += `<td class="tr-cell-attendance-data">-</td>`;
              });
            };
            var total_salary=0;
            try{
              this.labour_contract_salary = JSON.parse(data.labour_contract_salary)
              this.labour_contract_salary = this.labour_contract_salary.find(f=>f['request_account'] == employee['code']);
              total_salary = Number(this.labour_contract_salary.salary.replace(',','.'));
              // if(this.listType[1].is_use){
              //   this.employee_labour_contract_appendix = JSON.parse(data.employee_labour_contract_appendix)
              //   this.employee_labour_contract_appendix = this.employee_labour_contract_appendix.find(f=>f['request_account'] == employee['code']);
              //   total_salary += Number(this.employee_labour_contract_appendix.salary.replace(',','.'));
              // }
            }catch{}
            
            if(!this.listType[2].is_use){
              total_work_day_minus = 0
            }
            let t = last_total+total_holiday;
            this.tbody_td += `<td class="tr-cell-attendance-data">${total_holiday==0?'-':total_holiday}</td>`;
            this.tbody_td += `<td class="tr-cell-attendance-data timesheet-segment">${(t - total_work_day_minus).toFixed(3)} ${total_work_day_minus > 0 ? '<i class="material-icons">segment</i>':''} 
            <div class="timesheet-tooltiptext">
            <table class="table timesheet-segment-table">
                <thead>
                  <tr>
                    <th scope="col">Vi phạm</th>
                    <th scope="col">Số lần</th>
                    <th scope="col">Công bị trừ</th>
                  </tr>
                </thead>
                <tbody>
                  ${tr_log}
                </tbody>
              </table>
            </div>
            </td>`;//Tổng công hưởng lương
            this.tbody_td += `<td class="tr-cell-attendance-data">
              <a href="javascript:onClickWT(${employee.id});" style="font-weight: 600;color:${Number(employee.persent_working.replace(',','.'))<100?'#d40000':(Number(employee.persent_working.replace(',','.'))>100?'#0dd500':'#ffa500')}">${employee.persent_working}% ${employee.is_info=='True'?'<i class="material-icons">info</i>':''}</a>
            </td>`;
            // this.tbody_td += `<td class="tr-cell-attendance-data">${((total_salary/sum_standard)*t).toFixed(3).replace(/\d(?=(\d{3})+\.)/g, '$&,').replace('.00','')} đ </td>`;
            try{
              let temp = new HRM_Employee_Report_Salary_Employee_ENTITY;
              temp.account_id=this.convertNumber(employee.account_id);
              temp.branch_code=employee.branch_code;
              temp.branch_name=employee.branch_name;
              temp.code=employee.code;
              temp.department_name=employee.department_name;
              temp.hour_working=this.convertNumber(employee.hour_working);
              temp.id=this.convertNumber(employee.id);
              temp.is_info= employee.is_info; 
              temp.name=employee.name;
              temp.persent_working=this.convertNumber(employee.persent_working);
              temp.sum_standard=t;
              temp.work_shifts=employee.work_shifts;
              temp.is_use=true;
              temp.sum_salary_by_work_day=(total_salary/sum_standard)*t;
              temp.sum_work_day_practical=Number((t - total_work_day_minus).toFixed(3));
              temp.total_work_day_minus=total_work_day_minus;
              temp.total_salary = total_salary;
              this.listEmployeeExportSalary.list_salary_employees.push(temp)
            }catch{}
            if(i==0){
              this.thead_th += `
                            <th scope="col" class="m-w-100">Công thực tế</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col">KL</th>
                            <th scope="col">HL</th>
  
                            <th scope="col">KL</th>
                            <th scope="col">HL</th>
  
                            <th scope="col">HL</th>
  
                            <th scope="col">HL</th>
              `;
              this.listOverTime.forEach(ot=>{
                this.thead_th += `<th scope="col">${ot.name}</th>`
              })
              this.thead_th += `<th scope="col"></th>`
              this.thead_th += `<th scope="col"></th>`
              this.thead_th += `<th scope="col"><i>Click xem chi tiết</i></th>`
              this.thead_th += `<th scope="col"></th>`
              this.thead_th += '</tr>'
            }
            
            this.tbody_td += `</tr>`;
          }
          this.table = `<table class="table table-bordered table-attendance-report">
                          <thead>
                              <tr>
                                  <th colspan="4" style="text-align: center;background-color: #000095;color: white;">Thông tin nhân viên</th>
                                  <th colspan="${(colspan_table_day+1)}" style="text-align: center;background-color: #000095;color: white;">Ngày công</th>
                                  <th colspan="1" class="m-w-100" style="background-color: red;">Số lần vào ca trễ</th>
                                  <th colspan="1" class="m-w-100" style="background-color: red;">Số lần ra ca sớm</th>
                                  <th colspan="2" class="m-w-100" style="text-align: center;background-color: #000095;color: white;">Phiếu nghỉ phép</th>
                                  <th colspan="2" class="m-w-150" style="text-align: center;background-color: #000095;color: white;">Phiếu đi muộn,về sớm</th>
                                  <th colspan="1" class="m-w-100" style="text-align: center;background-color: #000095;color: white;">Phiếu công tác</th>
                                  <th colspan="1" class="m-w-100" style="text-align: center;background-color: #000095;color: white;">Phiếu bù công</th>
                                  <th colspan="${this.listOverTime.length}" class="m-w-100" style="text-align: center;background-color: #000095;color: white;">Phiếu tăng ca</th>
                                  <th colspan="1" class="m-w-150" style="text-align: center;background-color: #000095;color: white;">Nghỉ lễ</th>
                                  <th colspan="1" class="m-w-150" style="text-align: center;background-color: #000095;color: white;">Tổng công hưởng lương</th>
                                  <th colspan="1" class="m-w-150" style="text-align: center;background-color: #000095;color: white;">Tổng năng suất</th>
                              </tr>
                          </thead>
                          <tbody>
                            ${this.thead_th}
                            ${this.tbody_td}
                          </tbody>
                      </table>`;
          this.tableMarkup = this.sanitized.bypassSecurityTrustHtml(this.table);
          setTimeout(() => {
            this.callEventClick();
          }, 100);
        }catch{this.UnBlockUI();};
      })
    })
  }
  onClickWT(v:any){
    let employee = this.table_employee.find(e=>e.id == v.target.value)
    console.log(employee)
    this.dialogChartWT.open();
    this.hRM_WorkingTimeService.hRM_Report_Employee_Management_Task_WorkTime_Search(
      {...new HRM_Report_Employee_Management_Task_WorkTime_ENTITY(),employee_code:employee.code,start_date:this.filterInput.from_date,end_date:this.filterInput.to_date} as HRM_Report_Employee_Management_Task_WorkTime_ENTITY
    ).subscribe((res:HRM_Report_Employee_Management_Task_WorkTime_ENTITY[])=>{
      let dataChart=[];
      let wt_const = 9;
      res.forEach(data=>{
        dataChart.push([data.date_work_f, data.hour_work, wt_const])
      })
      renderChartWT(dataChart);
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
    this.filterInput.from_date = moment();
    this.filterInput.from_date.set('date',1);
    this.filterInput.to_date = moment();
    this.filterInput.to_date.set('date',1);
    this.filterInput.to_date.set('month',new Date().getMonth()+1);
    // this.onLoad();
    this.setAcction();
    setTimeout(() => {
      renderChartWT([]);
    }, 100);
  }
  callEventClick(){
    $('.tr-cell-attendance').click(function(e){
        $('.table-attendance-report tbody tr').removeClass('active');
        $(e.currentTarget).addClass('active')
    })
    document.getElementsByClassName('table-attendance-report')[0].setAttribute("id","table-attendance-report");
  }
  leftPad(number:any, targetLength:number):string {
      var output = number + '';
      while (output.length < targetLength) {
          output = '0' + output;
      }
      return output;
  }

}
