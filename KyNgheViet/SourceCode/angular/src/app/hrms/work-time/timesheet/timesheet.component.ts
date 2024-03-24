import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { ExportComponent } from 'src/app/shared/core/export/export-component';
import { InputSelectComponentV2 } from 'src/app/shared/layout/input-control-simple/input-select-v2/input-select-v2.component';
import { InputSelectComponent } from 'src/app/shared/layout/input-control-simple/input-select/input-select.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { DepartmentService, Department_ENTITY, HRM_TimeSheet_ENTITY, HRM_WorkingTimeService, TimeSheetService } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';
import $ from 'jquery'
@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  @ViewChild('SelectDepartmentPicker') SelectDepartmentPicker: InputSelectComponentV2;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  constructor(
    private injector: Injector,
    private hRM_WorkingTimeService:HRM_WorkingTimeService,
    private exportComponent:ExportComponent,
    private departmentService:DepartmentService,
    private timeSheetService:TimeSheetService
  ) {
    super(injector);
  }
  listDepartment:Department_ENTITY[] = [];  
  filterInput:HRM_TimeSheet_ENTITY = new HRM_TimeSheet_ENTITY();

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
  exportExcel(){
    this.exportComponent.ExportTOExcel(
      'Timesheet-'+this.filterInput.start_date.date()+'/'+(this.filterInput.start_date.month()+1)+'/'+this.filterInput.start_date.year()+'_To_'+this.filterInput.end_date.date()+'/'+(this.filterInput.end_date.month()+1)+'/'+this.filterInput.end_date.year(),
    'Timesheet-'+this.filterInput.start_date.date()+'/'+(this.filterInput.start_date.month()+1)+'/'+this.filterInput.start_date.year()+'-'+this.filterInput.end_date.date()+'/'+(this.filterInput.end_date.month()+1)+'/'+this.filterInput.end_date.year(),
    +this.filterInput.start_date.date()+'_'+(this.filterInput.start_date.month()+1)+'_'+this.filterInput.start_date.year()+'_To_'+this.filterInput.end_date.date()+'_'+(this.filterInput.end_date.month()+1)+'_'+this.filterInput.end_date.year(),
    'HRM_Project_Management_Task_WorkTime_Export'
    ,''+this.filterInput.start_date.year()+'/'+(this.filterInput.start_date.month()+1)+'/'+this.filterInput.start_date.date()+':'+this.filterInput.end_date.year()+'/'+(this.filterInput.end_date.month()+1)+'/'+this.filterInput.end_date.date()+':'+this.filterInput.department+'','HRM');
  }
  onClickAcction(id: number, storedName: string, param: string, keyService: string, classForm: string): void {
    switch(classForm){
      case EditPageState.add:{

        break;
      }
      case EditPageState.edit:{
        break;
      }
      case EditPageState.delete:{
        break;
      }
      case EditPageState.save:{
        
        break;
      }
      case EditPageState.search:{
        this.LoadData();
        break;
      }
      case EditPageState.viewDetail:{
        break;
      }
      case 'Export':{
        this.exportExcel();
        break;
      }
      default:break;
    }
  }
  LoadData() {
    
    if(!this.filterInput.start_date) {this.showMessageWarning('"Ngày bắt đầu" không được để trống'); return}
    else if(!this.filterInput.end_date) {this.showMessageWarning('"Ngày kết thúc" không được để trống');return;}
    else if(this.filterInput.start_date > this.filterInput.end_date) {this.showMessageWarning('"Ngày bắt đầu" không lớn hơn "Ngày kết thúc"');return;}
    this.BlockUI();
    this.timeSheetService.hRM_Project_Management_Task_WorkTime_Report_Search(this.filterInput).subscribe(
      (data: any) => {
        this.InputModel = data[0];
        this.UpdateView();
        $('.row-table').on('click', function() {
          $('.row-table').removeClass('active');
           $(this).addClass('active');
       });
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
  }
  getDataByID(storedName: string, param: string, keyService: string): void {
    throw new Error('Method not implemented.');
  }
  tbName: string = 'HRM_TimeSheet';
  CurrenFrom:string = EditPageState.view;
  InputModel:HRM_TimeSheet_ENTITY = new HRM_TimeSheet_ENTITY();
  ngOnInit(): void {
    this.setAcction();
    this.initCombobox();
  }
  setAcction(){
    if(this.toolbar)
      this.toolbar.setUiAction(this);
    else
      setTimeout(() => {
        this.setAcction();
      }, 50);
  }
  onSelect(v:any,col:string){
    this.filterInput[col] = v;
  }
  valueStartDate(e:any,col:string){
      this.filterInput[col] = e;
  }
  initCombobox(){
   var p = new Department_ENTITY();
    this.departmentService.department_Search(p).subscribe(
      (data: any) => {
        this.listDepartment = data;
        this.SelectDepartmentPicker.setList(this.listDepartment);
        this.UpdateView();
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
  }
}
