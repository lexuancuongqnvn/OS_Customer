import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { JqgridEditComponent } from 'src/app/shared/jqgrid/jqgrid-edit/jqgrid-edit.component';
import { JqgridListComponent } from 'src/app/shared/jqgrid/jqgrid-list/jqgrid-list.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { InputSelectComponentV2 } from 'src/app/shared/layout/input-control-simple/input-select-v2/input-select-v2.component';
import { InputSelectComponent } from 'src/app/shared/layout/input-control-simple/input-select/input-select.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { DepartmentService, Department_ENTITY, Department_Position_ENTITY, EmployeeService, HRM_Employee_ENTITY } from 'src/app/shared/service-proxies/api-shared';
import { AlertMessageComponent } from 'src/app/shared/sidenav/alert-message/alert-message.component';
import { SidenavAddEditComponent } from 'src/app/shared/sidenav/sidenav-add-edit/sidenav-add-edit.component';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    private injector: Injector,
    private departmentService:DepartmentService,
    private employeeService: EmployeeService,
  ) {
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
  
  tbName: string = 'Department';
  tbName_sub: string = 'Department_Position';
  filterInput:Department_ENTITY = new Department_ENTITY();
  InputModel:Department_ENTITY = new Department_ENTITY();
  CurrenFrom:string = EditPageState.view;
  listDepartment:Department_ENTITY[] = [];
  listEmployee:HRM_Employee_ENTITY[] = [];
  
  col_model:any[] = [
    { label: 'Mã', name: 'code', key: true, width: 10 , hidden: true},
    { label: 'Tên dự án', name: 'name', width: 25 },
    { label: 'Người duyệt worktime', name: 'allow_approve_worktime_name', width: 10 }
  ]

  col_model_edit:any[] = [
    { label: 'Mã', name: 'code', key: true, width: 20 , hidden: true,editable: false},
    { label: 'Tên vị trí', name: 'name', key: false, width: 7 , hidden: false,editable: true},
    { label: 'Cấp bậc', name: 'level', key: false, width: 1 , hidden: false,editable: true, sorttype: 'int'},
    { label: 'Ghi chú', name: 'notes', width: 10, hidden: false ,editable: true}
  ]
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
        this.isEdit = true;
        this.InputModel = new Department_ENTITY();
        setTimeout(() => {
          this.sidenavAddEdit.title = "Thêm mới phòng ban";
          this.sidenavAddEdit.open();
          this.toolbarEdit.setUiAction(this);
          this.UpdateView();
          this.gridPositionEdit.setData([]);
          this.initCombobox();
          this.UpdateView();
        }, 100);
        break;
      }
      case EditPageState.edit:{
        this.BlockUI();
        this.isEdit = true;
        this.InputModel = new Department_ENTITY();
        this.InputModel.code = this.idSelect;
        this.departmentService.department_Search(this.InputModel).subscribe((respond)=>{
          this.InputModel = respond[0];
          this.sidenavAddEdit.open();
          this.toolbarEdit.setUiAction(this);
          this.UpdateView(); 
          this.initCombobox();
          this.gridPositionEdit.setData(this.InputModel.department_Positions);
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
        break;
      }
      case EditPageState.delete:{
        this.dialogDelete.open();
        break;
      }
      case EditPageState.save:{
        if(!this.InputModel.name){
          this.alertMessage.AlertError('"Tên phòng ban" không được để trống');return;
        }
        this.BlockUI();
        try{
          this.InputModel.department_Positions = [];
          var Subs = this.gridPositionEdit.allData;
          if(Subs.length>0)
          {
            for(var i = 0 ; i < Subs.length ; i++)
            {
              var newrow = new  Department_Position_ENTITY();
              for (const [key, value] of Object.entries(Subs[i])) {
                newrow[key] = Subs[i][key];
              }
              this.InputModel.department_Positions.push(newrow);
            }
          }
        }catch{}
        // this.filterInput = HRM_Project_Management_ENTITY['toJSON'](this.filterInput);
        if(!this.InputModel.code){
          this.InputModel.type = 'INSERT';
          this.departmentService.department_Actions(this.InputModel).subscribe((respond)=>{
            if(respond['status'] == '0')
            {
              this.alertMessage.AlertSuccess(respond['message']);
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
          this.InputModel.type = 'UPDATE';
          this.departmentService.department_Actions(this.InputModel).subscribe((respond)=>{
            if(respond['status'] == '0')
            {
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
        
        break;
      }
      case EditPageState.search:{
        this.LoadData();
        break;
      }
      case EditPageState.viewDetail:{
        this.BlockUI();
        this.isEdit = true;
        this.InputModel = new Department_ENTITY();
        this.InputModel.code = this.idSelect;
        this.departmentService.department_Search(this.InputModel).subscribe((respond)=>{
          this.InputModel = respond[0];
          this.sidenavAddEdit.open();
          this.toolbarEdit.setUiAction(this);
          this.UpdateView(); 
          this.initCombobox();
          this.gridPositionEdit.setData(this.InputModel.department_Positions);
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
    var p = new Department_ENTITY();
    p.code = this.idSelect;
    p.type = 'DELETE';
    this.departmentService.department_Actions(p).subscribe(
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
    this.departmentService.department_Search(this.filterInput).subscribe(
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
  initCombobox(){
    let p = new HRM_Employee_ENTITY();
    this.listEmployee = [];
    this.employeeService.hRM_Employee_Search(p).subscribe(
      (data: any) => {
        if(data){
          data.forEach(e=>{
            e.id = e.id;
            e['name'] = e.lastName + ' ' +e.firstName; 
            this.listEmployee.push(e);
          })
        }
        this.SelectPicker.setList(this.listEmployee);
        this.SelectPicker1.setList(this.listEmployee);
        this.UpdateView();
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
  }
  onSelect(v:any,col:string){
    this.InputModel[col] = v;
  }
  ngOnInit(): void {
    this.setAcction();
    this.LoadData();
  }

}
