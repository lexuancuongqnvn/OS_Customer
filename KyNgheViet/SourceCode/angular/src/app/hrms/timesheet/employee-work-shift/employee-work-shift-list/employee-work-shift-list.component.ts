import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { JqgridEditComponent } from 'src/app/shared/jqgrid/jqgrid-edit/jqgrid-edit.component';
import { JqgridListComponent } from 'src/app/shared/jqgrid/jqgrid-list/jqgrid-list.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { HRM_TimeSheet_Employee_Work_Shift_ENTITY, TimeSheetService } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-employee-work-shift-list',
  templateUrl: './employee-work-shift-list.component.html',
  styleUrls: ['./employee-work-shift-list.component.css']
})
export class EmployeeWorkShiftListComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    private injector: Injector,
    private timeSheetService:TimeSheetService
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
  isEdit:boolean = false;
  @ViewChild('gridList') gridList: JqgridListComponent;
  @ViewChild('gridMenuEdit') gridMenuEdit: JqgridEditComponent<HRM_TimeSheet_Employee_Work_Shift_ENTITY>;
  @ViewChild('dialogDelete') dialogDelete: DialogAcctionComponent;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  @ViewChild('toolbarEdit') toolbarEdit: ToolbarComponent;
  tbName: string = 'HRM_TimeSheet_Employee_Work_Shift';
  
  filterInput:HRM_TimeSheet_Employee_Work_Shift_ENTITY = new HRM_TimeSheet_Employee_Work_Shift_ENTITY();
  InputModel:HRM_TimeSheet_Employee_Work_Shift_ENTITY = new HRM_TimeSheet_Employee_Work_Shift_ENTITY();
  CurrenFrom:string = EditPageState.view;

  col_model:any[] = [
    { label: 'Mã', name: 'code', key: true, width: 10 , hidden: true},
    { label: 'Tên', name: 'name', width: 25 },
    { label: 'Ngày bắt đầu', name: 'work_date_f', width: 10 },
    { label: 'Năm', name: 'in_year', width: 10, hidden: true }
  ]
  setAcction(){
    if(this.toolbar)
      this.toolbar.setUiAction(this);
    else
      setTimeout(() => {
        this.setAcction();
      }, 50);
  }
  ngOnInit(): void {
    this.setAcction();
    this.LoadData();
  }
  onClickAcction(id: number, storedName: string, param: string, keyService: string, classForm: string): void {
    switch(classForm){
      case EditPageState.add:{
        this.filterInput = new HRM_TimeSheet_Employee_Work_Shift_ENTITY();
        setTimeout(() => {
          this.navigatePassParam('timesheet/employee-work-shift-edit', { code: this.idSelect,form:EditPageState.add }, { filterInput: JSON.stringify(this.filterInput) });
        }, 100);
        break;
      }
      case EditPageState.edit:{
        this.navigatePassParam('timesheet/employee-work-shift-edit', { code: this.idSelect,form:EditPageState.edit }, { filterInput: JSON.stringify(this.filterInput) });
        break;
      }
      case EditPageState.delete:{
        this.dialogDelete.open();
        break;
      }
      case EditPageState.save:{
        this.BlockUI();

        break;
      }
      case EditPageState.search:{
        this.LoadData();
        break;
      }
      case EditPageState.viewDetail:{
        this.navigatePassParam('timesheet/employee-work-shift-edit', { code: this.idSelect,form:EditPageState.viewDetail }, { filterInput: JSON.stringify(this.filterInput) });
        break;
      }
      default:break;
    }
  }
  getDataByID(storedName: string, param: string, keyService: string): void {
    throw new Error('Method not implemented.');
  }
  confirmDelete() {
    this.BlockUI();
    var p = new HRM_TimeSheet_Employee_Work_Shift_ENTITY();
    p.code = this.idSelect;
    this.timeSheetService.hRM_TimeSheet_Employee_Work_Shift_Delete(p).subscribe(
      (respond: any) => {
        if(respond['status'] == '0'){
          this.showMessageSuccess(respond['message'])
          this.LoadData();
          this.onSearch();
        }else
        {
          this.showMessageError(respond['message'])
        }        
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      })
    this.UpdateView();
  }
  LoadData() {
    this.BlockUI();
    this.timeSheetService.hRM_TimeSheet_Employee_Work_Shift_Search(this.filterInput).subscribe(
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

}
