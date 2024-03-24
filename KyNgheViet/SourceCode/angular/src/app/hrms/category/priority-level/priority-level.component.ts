import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { JqgridListComponent } from 'src/app/shared/jqgrid/jqgrid-list/jqgrid-list.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { InputSelectComponentV2 } from 'src/app/shared/layout/input-control-simple/input-select-v2/input-select-v2.component';
import { InputSelectComponent } from 'src/app/shared/layout/input-control-simple/input-select/input-select.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { DepartmentService, Department_ENTITY, HRM_Project_Management_Task_Proprity_Level_ENTITY, ProjectManagementService } from 'src/app/shared/service-proxies/api-shared';
import { AlertMessageComponent } from 'src/app/shared/sidenav/alert-message/alert-message.component';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-priority-level',
  templateUrl: './priority-level.component.html',
  styleUrls: ['./priority-level.component.css']
})
export class PriorityLevelComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  isEdit:boolean = false;
  tbName: string = 'HRM_Project_Management_Task_Proprity_Level';
  filterInput:HRM_Project_Management_Task_Proprity_Level_ENTITY = new HRM_Project_Management_Task_Proprity_Level_ENTITY();
  InputModel:HRM_Project_Management_Task_Proprity_Level_ENTITY = new HRM_Project_Management_Task_Proprity_Level_ENTITY();
  CurrenFrom:string = EditPageState.view;
  listDepartment:HRM_Project_Management_Task_Proprity_Level_ENTITY[] = [];
  @ViewChild('dialogDelete') dialogDelete: DialogAcctionComponent;
  @ViewChild('dialogEdit') dialogEdit: DialogAcctionComponent;
  @ViewChild('dialogAdd') dialogAdd: DialogAcctionComponent;
  @ViewChild('gridList') gridList: JqgridListComponent;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  @ViewChild('alertMessage') alertMessage: AlertMessageComponent;
  @ViewChild('SelectDepartmentPicker') SelectDepartmentPicker: InputSelectComponentV2;
  @ViewChild('SelectDepartmentPicker2') SelectDepartmentPicker2: InputSelectComponentV2;
  constructor(
    private injector: Injector,
    private projectManagementService:ProjectManagementService,
    private departmentService:DepartmentService
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
  onClickAcction(id: number, storedName: string, param: string, keyService: string, classForm: string): void {
    switch(classForm){
      case EditPageState.add:{
        this.InputModel =  new HRM_Project_Management_Task_Proprity_Level_ENTITY();
        this.dialogAdd.open();
        setTimeout(() => {
          this.SelectDepartmentPicker2.renderSelectPicker();
          this.SelectDepartmentPicker2.setList(this.listDepartment);
        }, 50);
        break;
      }
      case EditPageState.edit:{
        var p1 = new HRM_Project_Management_Task_Proprity_Level_ENTITY();
        p1.code = this.idSelect;
        this.projectManagementService.hRM_Project_Management_Task_Proprity_Level_Search(p1).subscribe(
          (data: any) => {
            this.InputModel = data[0];
            this.dialogEdit.open();
            setTimeout(() => {
              this.SelectDepartmentPicker.renderSelectPicker();
              this.SelectDepartmentPicker.setList(this.listDepartment);
            }, 50);
            this.UpdateView();
          },
          (err) => this.UnBlockUI(),
          () => {
            this.UnBlockUI();
          }
        )
       
        break;
      }
      case EditPageState.delete:{
        this.dialogDelete.open();
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
      default:break;
    }
  }
  getDataByID(storedName: string, param: string, keyService: string): void {
    throw new Error('Method not implemented.');
  }
  col_model:any[] = [
    { label: 'Mã', name: 'code', key: true, width: 10 , hidden: true},
    { label: 'Tên', name: 'name', width: 25 },
    { label: 'Phòng ban', name: 'department_name', width: 10 }
  ]
  LoadData(){
    this.BlockUI();
    var p1 = new HRM_Project_Management_Task_Proprity_Level_ENTITY();
    this.projectManagementService.hRM_Project_Management_Task_Proprity_Level_Search(p1).subscribe(
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
  setAcction(){
    if(this.toolbar)
      this.toolbar.setUiAction(this);
    else
      setTimeout(() => {
        this.setAcction();
      }, 50);
  }
  confirmDelete() {
    var p = new HRM_Project_Management_Task_Proprity_Level_ENTITY();
    p.code = this.idSelect;
    p.type = 'DELETE';
    this.projectManagementService.hRM_Project_Management_Task_Proprity_Level_Actions(p).subscribe(
      (respond: any) => {
        if(respond['status'] == '0'){
          this.showMessageSuccess(respond['message'])
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
  confirmEdit() {
    this.InputModel.type = 'UPDATE';
    this.projectManagementService.hRM_Project_Management_Task_Proprity_Level_Actions(this.InputModel).subscribe(
      (respond: any) => {
        if(respond['status'] == '0'){
          this.showMessageSuccess(respond['message'])
          this.UpdateView();
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
  confirmAdd() {
    this.InputModel.type = 'INSERT';
    this.projectManagementService.hRM_Project_Management_Task_Proprity_Level_Actions(this.InputModel).subscribe(
      (respond: any) => {
        if(respond['status'] == '0'){
          this.showMessageSuccess(respond['message'])
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
  onSelect(v:any,col:string){
    this.InputModel[col] = v;
  }
  initCombobox(){
    this.BlockUI();
    var p = new Department_ENTITY();
    this.departmentService.department_Search(p).subscribe(
      (data: any) => {
        this.listDepartment = data;
        this.UpdateView();
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
  }
  ngOnInit(): void {
    this.setAcction();
    this.initCombobox();
    this.LoadData();
  }
}
