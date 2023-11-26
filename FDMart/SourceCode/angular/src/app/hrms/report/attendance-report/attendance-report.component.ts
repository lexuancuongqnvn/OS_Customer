import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import moment from 'moment';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { FilePickerComponent } from 'src/app/shared/layout/input-control/file-picker/file-picker.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { EmployeeService, HRM_Report_Attendance_ENTITY, HRM_Timesheet_Employee_Overtime_Type_ENTITY, HRM_WorkingTimeService, TimeSheetService } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';
declare var exportTableToExcel
@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.css']
})
export class AttendanceReportComponent  extends LayoutComponentBase implements OnInit, IUiAction<any> {
  constructor(
    private injector: Injector,
    private appSession: AppSession,
    private employeeService:EmployeeService,
    private filePickerComponent: FilePickerComponent,
    private hRM_WorkingTimeService:HRM_WorkingTimeService,
    private timeSheetService:TimeSheetService
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
  thead_th:string = '';
  tbody_td:string = '';
  filterInput:HRM_Report_Attendance_ENTITY=new HRM_Report_Attendance_ENTITY();
  listOverTime:HRM_Timesheet_Employee_Overtime_Type_ENTITY[]=[]
  table:string = '';
  tbName: string = 'HRM_Report_Attendance1';
  CurrenFrom:string = EditPageState.view;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
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
        exportTableToExcel('table-attendance-report','Timesheet '+this.filterInput.from_date.date()+'-'+this.filterInput.from_date.month()+'-'+this.filterInput.from_date.year() + ' to ' +this.filterInput.to_date.date()+'-'+this.filterInput.to_date.month()+'-'+this.filterInput.to_date.year())
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
  onLoad(){
    let colspan_table_day = 0;
    this.listOverTime = [];
    this.timeSheetService.hRM_Timesheet_Employee_Overtime_Type_Search().subscribe((res)=>{
      this.listOverTime = res;
      this.filterInput.user_login = this.appSession.user.code;
      this.timeSheetService.hRM_Report_Attendance_Search(this.filterInput).subscribe(data=>{
        this.thead_th = ``;
        this.tbody_td = '';
        let total_holiday = 0;
        try{
          this.table_holiday = JSON.parse(data.table_holiday);
          this.table_holiday.forEach(element => {
            total_holiday += parseInt(element['total_day'].toString().replace(',','.'));
          });
        }catch{
          total_holiday = 0;
        };
        try{
          this.table_employee = JSON.parse(data.table_employees);
          for(var i = 0 ; i < this.table_employee.length ; i++){
            var employee = this.table_employee[i];
            let last_total = 0;
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
                if(key != 'account_id' && key != 'id'){
                  if(i == 0){
                    this.thead_th += `<th scope="col">${key.split('_')[0]}</th>`;
                    colspan_table_day++;
                  }
                  if(parseFloat(value.toString().replace(',','.')) > 1) {
                    value = 1;
                  }
                  total += parseFloat(value.toString().replace(',','.'));
                  this.tbody_td += `<td class="tr-cell-attendance-data">${value.toString()=='0'?'-':value}</td>`;
                }
              }
              last_total += total;
              this.tbody_td += `<td class="tr-cell-attendance-data">${total.toFixed(2)}</td>`;
            }catch{
              this.tbody_td += `<td class="tr-cell-attendance-data">-</td>`;
            };
            try{
              this.table_checkin_out_soon_late = JSON.parse(data.table_checkin_out_soon_late);
              this.table_checkin_out_soon_late = this.table_checkin_out_soon_late.find(f=>f['request_account'] == employee['code']);
              this.tbody_td += `<td class="tr-cell-attendance-data">${this.table_checkin_out_soon_late['late']==0?'-':this.table_checkin_out_soon_late['late']}</td>`;
              this.tbody_td += `<td class="tr-cell-attendance-data">${this.table_checkin_out_soon_late['soon']==0?'-':this.table_checkin_out_soon_late['soon']}</td>`;
            }catch{
              this.tbody_td += `<td class="tr-cell-attendance-data">-</td>`;
              this.tbody_td += `<td class="tr-cell-attendance-data">-</td>`;
            };
            
            try{
              this.table_attendance = JSON.parse(data.table_attendance);
              this.table_attendance = this.table_attendance.find(f=>f['request_account'] == employee['code']);
              this.tbody_td += `<td class="tr-cell-attendance-data">${this.table_attendance['attendance_is_salary_0']==0?'-':this.table_attendance['attendance_is_salary_0']}</td>`;
              this.tbody_td += `<td class="tr-cell-attendance-data">${this.table_attendance['attendance_is_salary_1']==0?'-':this.table_attendance['attendance_is_salary_1']}</td>`;
              last_total += parseFloat(this.table_attendance['attendance_is_salary_1'].toString().replace(',','.'));
            }catch{
              this.tbody_td += `<td class="tr-cell-attendance-data">-</td>`;
              this.tbody_td += `<td class="tr-cell-attendance-data">-</td>`;
            };
            try{
              this.table_soon_late = JSON.parse(data.table_soon_late);
              this.table_soon_late = this.table_soon_late.find(f=>f['request_account'] == employee['code']);
              this.tbody_td += `<td class="tr-cell-attendance-data">${this.table_soon_late['soon_late_is_salary_0']==0?'-':this.table_soon_late['soon_late_is_salary_0']}</td>`;
              this.tbody_td += `<td class="tr-cell-attendance-data">${this.table_soon_late['soon_late_is_salary_1']==0?'-':this.table_soon_late['soon_late_is_salary_1']}</td>`;
              last_total += parseFloat(this.table_soon_late['soon_late_is_salary_1'].toString().replace(',','.'));
            }catch{
              this.tbody_td += `<td class="tr-cell-attendance-data">-</td>`;
              this.tbody_td += `<td class="tr-cell-attendance-data">-</td>`;
            };
            
            try{
              this.mission_allowance = JSON.parse(data.mission_allowance)
              this.mission_allowance = this.mission_allowance.find(f=>f['request_account'] == employee['code']);
              this.tbody_td += `<td class="tr-cell-attendance-data">${this.mission_allowance['mission_allowance']==0?'-':this.mission_allowance['mission_allowance']}</td>`;
              last_total += parseFloat(this.mission_allowance['mission_allowance'].toString().replace(',','.'));
            }catch{
              this.tbody_td += `<td class="tr-cell-attendance-data">-</td>`;
            };
            try{
              this.table_update_timkeeping = JSON.parse(data.table_update_timkeeping)
              this.table_update_timkeeping = this.table_update_timkeeping.find(f=>f['request_account'] == employee['code']);
              this.tbody_td += `<td class="tr-cell-attendance-data">${this.table_update_timkeeping['update_timkeeping_value']==0?'-':this.table_update_timkeeping['update_timkeeping_value']}</td>`;
              last_total += parseFloat(this.table_update_timkeeping['update_timkeeping_value'].toString().replace(',','.'));
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
                      last_total += parseFloat(element['ot_time'].toString().replace(',','.'))*ot.multiplier;
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
            
            this.tbody_td += `<td class="tr-cell-attendance-data">${total_holiday==0?'-':total_holiday}</td>`;
            this.tbody_td += `<td class="tr-cell-attendance-data">${(last_total+total_holiday).toFixed(2)}</td>`;
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
              this.thead_th += '</tr>'
            }
            
            this.tbody_td += `</tr>`;
          }
          this.table = `<table class="table table-bordered table-attendance-report">
                          <thead>
                              <tr>
                                  <th colspan="4">Thông tin nhân viên</th>
                                  <th colspan="${(colspan_table_day+1)}">Ngày công</th>
                                  <th colspan="1" class="m-w-100" style="background-color: red;">Số lần vào ca trễ</th>
                                  <th colspan="1" class="m-w-100" style="background-color: red;">Số lần ra ca sớm</th>
                                  <th colspan="2" class="m-w-100">Phiếu nghỉ phép</th>
                                  <th colspan="2" class="m-w-150">Phiếu đi muộn,về sớm</th>
                                  <th colspan="1" class="m-w-100">Phiếu công tác</th>
                                  <th colspan="1" class="m-w-100">Phiếu bù công</th>
                                  <th colspan="${this.listOverTime.length}" class="m-w-100">Phiếu tăng ca</th>
                                  <th colspan="1" class="m-w-150">Nghỉ lễ</th>
                                  <th colspan="1" class="m-w-150">Tổng công hưởng lương</th>
                              </tr>
                          </thead>
                          <tbody>
                            ${this.thead_th}
                            ${this.tbody_td}
                            
                          </tbody>
                      </table>`;
          setTimeout(() => {
            this.callEventClick();
          }, 100);
        }catch{[]};
      })
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
    this.onLoad();
    this.setAcction();
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
