import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataStateChangeEvent, GridComponent, GridDataResult } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import moment from 'moment';
import { Observable } from 'rxjs';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { InputSelectComponentV2 } from 'src/app/shared/layout/input-control-simple/input-select-v2/input-select-v2.component';
import { InputSelectComponent } from 'src/app/shared/layout/input-control-simple/input-select/input-select.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { EmployeeService, HRM_BranchService, HRM_Branch_ENTITY, HRM_WorkingTimeService, HRM_WorkingTime_ENTITY,HRM_Employee_ENTITY, HRM_TimeSheet_ENTITY, HRM_Workspace_ENTITY, HRM_Workspace_Comment_ENTITY, HRM_Workspace_Comment_Image_ENTITY, WorkspaceService, HRM_Workspace_Master_ENTITY } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

const createFormGroup = (dataItem) =>
  new FormGroup({
    Discontinued: new FormControl(dataItem.Discontinued),
    ProductID: new FormControl(dataItem.ProductID),
    ProductName: new FormControl(dataItem.ProductName, Validators.required),
    UnitPrice: new FormControl(dataItem.UnitPrice),
    UnitsInStock: new FormControl(dataItem.UnitsInStock, Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,3}')]))
  });
  declare var initFullCalendar1;
  declare var getDataCalendar1;
  declare var setSelecteWorking;
  declare var setSelecteEmployee;
  declare var setAllEmployee;
  declare var getAllEmployee;
@Component({
  selector: 'calendar-month-1',
  templateUrl: './calendar-month-1.component.html',
  styleUrls: ['./calendar-month-1.component.css']
})
export class CalendarMonth1Component extends LayoutComponentBase implements OnInit, IUiAction<any> {
  constructor(
    private injector: Injector,
    private appSession: AppSession,
    private branchService:HRM_BranchService,
    private workspaceService:WorkspaceService,
    private workingTimeService:HRM_WorkingTimeService,
    private employeeService:EmployeeService
  ) {
    super(injector);
    this.initCombobox();
  }
  @ViewChild('SelectBranchPicker') SelectBranchPicker: InputSelectComponentV2;
  @ViewChild('SelectWorkingPicker') SelectWorkingPicker: InputSelectComponentV2;
  listBranch:HRM_Branch_ENTITY[] = [];
  listWorkspace:HRM_Workspace_ENTITY[] = [];
  listWorking:HRM_WorkingTime_ENTITY[] = [];
  listTimeSheet:HRM_TimeSheet_ENTITY[] = [];
  listEmployeeTemp:HRM_Employee_ENTITY[] = [];
  listEmployee:HRM_Employee_ENTITY[] = [];
  workingSelected:HRM_WorkingTime_ENTITY = new HRM_WorkingTime_ENTITY();
  employeeSelected:HRM_Branch_ENTITY = new HRM_Branch_ENTITY();
  constHour:number = 176;
  dataTimeSheet:any = {};
  filterWorkspace:HRM_Workspace_ENTITY = new HRM_Workspace_ENTITY();
  // {
  //   '4_12_2021':
  // [
  //     {
  //       "id":1,
  //       "title":"(8:00 -17:30) Cẩm Lê Thị",
  //       "start":"2021-12-04T14:00:00.000Z",
  //       "allDay":false,
  //       "wkName":"8:00 -17:30",
  //       "wkHour":9.5,
  //       "className":"event-rose",
  //       "idCalendar":"4_12_2021_1_2",
  //       "Comment":null,
  //       "attechImageComment":null,
  //       "attechFileComment":null
  //   }
  // ]
  // };

//   [{
//     title: "Lê Xuân Cường",
//     start: new Date(2021, 10, 1),
//     className: "event-default"
// }];
  onApprove(item: any): void {
    throw new Error('Method not implemented.');
  }
  onViewDetail(item: any): void {
    throw new Error('Method not implemented.');
  }
  masterData:HRM_Workspace_Master_ENTITY = new HRM_Workspace_Master_ENTITY();
  onSave(): void {
    let allData = getDataCalendar1();
    
    Object.entries(allData).forEach(e => {
      let [key, value] = e;
      (value as Array<HTMLElement>).forEach(e1 => {
        let wsp = new HRM_Workspace_ENTITY();
        let cmt = new HRM_Workspace_Comment_ENTITY(); 
        wsp.key = key;
        wsp.title = e1['title'];
        wsp.start = e1['start'];
        wsp.allDay = e1['allDay'];
        wsp.wkName = e1['wkName'];
        wsp.wkHour = e1['wkHour'];
        wsp.className = e1['className'];
        wsp.idCalendar = e1['idCalendar'];
        wsp.code = e1['code'];

        if(!wsp.hrm_workspace_comment) wsp.hrm_workspace_comment = [];
        if(!this.masterData.hRM_Workspace) this.masterData.hRM_Workspace = [];
        wsp.hrm_workspace_comment.push(cmt);
        this.masterData.hRM_Workspace.push(wsp);
      });
    });
    
    this.workspaceService.hRM_Workspace_Insert(this.masterData).subscribe((respond)=>{
      if(respond['status'] = '0'){
        this.showSuccess();
        this.UpdateView();
      }
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
  onSearch(): void {
    throw new Error('Method not implemented.');
  }
  onResetSearch(): void {
    throw new Error('Method not implemented.');
  }
  onClickAcction(id: number, storedName: string, param: string, keyService: string, classForm: string): void {
    throw new Error('Method not implemented.');
  }
  getDataByID(storedName: string, param: string, keyService: string): void {
    throw new Error('Method not implemented.');
  }
  @ViewChild('dialogDelete') dialogDelete: DialogAcctionComponent;
  @ViewChild(GridComponent)

  grid: GridComponent;
  formGroup!: FormGroup | undefined;
  public view: Observable<GridDataResult>;
  public gridView: GridDataResult;
  CurrenFrom: string = EditPageState.edit;

  public listItemsCombobox: Array<{ tablE_NAME: string, name: string }> = [];
  selectRow(event: any) {
    this.UpdateView();
  }
  onAdd(): void {
    throw new Error('Method not implemented.');
  }
  onUpdate(item: any): void {
    throw new Error('Method not implemented.');
  }

  onDelete(): void {
    this.dialogDelete.open();
  }
  confirmDelete() {
    
  }

  ngOnInit(): void {
    this.BlockUI();
    setTimeout(() => {
      document.getElementsByClassName("branch-filter")[0].getElementsByClassName("bootstrap-select")[0]['style'].maxWidth ='40px';
      document.getElementsByClassName("branch-filter")[0].getElementsByClassName("bootstrap-select")[0].getElementsByClassName("btn")[0]['style']['padding-right']=0;
      document.getElementsByClassName('branch-filter')[0].getElementsByTagName('button')[0].insertAdjacentHTML('beforeend', '<span class="material-icons">filter_alt</span>')
      document.getElementsByClassName("shift-filter")[0].getElementsByClassName("bootstrap-select")[0]['style'].maxWidth ='100%';
      document.getElementsByClassName("shift-filter")[0].getElementsByClassName("bootstrap-select")[0].getElementsByClassName("btn")[0]['style']['padding-right']=0;
    }, 500);

    let p = new HRM_Employee_ENTITY();
    this.employeeService.hRM_Employee_Search(p).subscribe((respond)=>{
      this.listEmployee = respond;
      this.listEmployeeTemp = respond;
      setAllEmployee(respond);
      this.UpdateView();
    },
    (err) => {
        if (err.status == 401) {
          this.Respond401();
        }
    },
    () => {
      //this.UnBlockUI();
    });
    
    this.workspaceService.hRM_Workspace_Search(this.filterWorkspace).subscribe((respond)=>{
      this.listWorkspace = respond;
      initFullCalendar1(this.listWorkspace);
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
  onSelectBranch(item:string){
    let t = this.listEmployeeTemp.filter(e=>item.indexOf(e.branch_code) >= 0)
    this.listEmployee = t;
    if(item == "") this.listEmployee = this.listEmployeeTemp;
    this.UpdateView();
  }
  onSearchEmployee(v:string){
    let t = this.listEmployeeTemp.filter(e=>e.lastName.toUpperCase().includes(v.toUpperCase()) == true || e.firstName.toUpperCase().includes(v.toUpperCase()) == true)
    this.listEmployee = t;
    if(v == "") this.listEmployee = this.listEmployeeTemp;
    this.UpdateView();
  }
  onSelectWoking(item:string){
    this.workingSelected = this.listWorking.find(e=>e.id.toString() == item);
    setSelecteWorking(this.workingSelected);
    this.UpdateView();
  }
  onChangeConstHour(v:number){
    this.constHour = v;
    this.UpdateView();
  }
  onSelectEmployee(item:HRM_Employee_ENTITY){
    if(this.listEmployee.find(e=>e.id == item.id)['constHour'] == undefined)
    {
      item['constHour'] = this.constHour;
      item['TimeWorking'] = 0;
    }
    this.employeeSelected = item;
    setSelecteEmployee(this.employeeSelected);
    this.UpdateView();
  }
  editHour(id:number){
    this.listEmployee.forEach(e=>{
      if(e.id == id) {
        e['constHour'] = this.constHour;
        if (!e['OverTime']) e['OverTime'] = 0;
        e['OverTime'] = (e['TimeWorking'] - e['constHour']);
        return;
      }
    });
    this.UpdateView();
  }
  initCombobox(){
    this.BlockUI();
    let p = new HRM_Branch_ENTITY();
    this.branchService.hRM_Branch_Search(p).subscribe((respond)=>{
      this.listBranch = respond;
      this.UpdateView();
    },
    (err) => {
        if (err.status == 401) {
          this.Respond401();
        }
    },
    () => {
      this.SelectBranchPicker.setList(this.listBranch);
      this.UnBlockUI();
    });
    let p1 = new HRM_WorkingTime_ENTITY();
    this.workingTimeService.hRM_WorkingTime_Search(p1).subscribe((respond)=>{
      this.listWorking = respond;
      this.UpdateView();
    },
    (err) => {
        if (err.status == 401) {
          this.Respond401();
        }
    },
    () => {
      this.SelectWorkingPicker.setList(this.listWorking)
      this.UnBlockUI();
    });
  }
  public state: State = {
    skip: 0,
    take: 10
  };
  public addHandler(): void {
    this.formGroup = createFormGroup({
      Discontinued: false,
      ProductName: '',
      UnitPrice: 0,
      UnitsInStock: ''
    });
    this.grid.addRow(this.formGroup);
  }
  public changeTime: Object = {
    hour: 0,
    idEmp: 0
  };
  onChangeTimeSheet(){
    this.listEmployee = getAllEmployee();
    this.UpdateView();
  }
  onChangeTimeSheetEmp(){
    this.listEmployee.forEach(e=>{
      if(e.id == this.employeeSelected.id){
        if(!e['TimeWorking'])e['TimeWorking']=0;
        e['TimeWorking'] = e['TimeWorking'] +this.changeTime['hour'];
        this.UpdateView();
      }
    })
  }
  ClickDate(){
    var monday = moment()
    .startOf('month')
    .day("Monday");
  }
}