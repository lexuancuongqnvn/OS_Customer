import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataStateChangeEvent, GridComponent, GridDataResult } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import moment from 'moment';
import { Observable } from 'rxjs';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { InputSelectComponent } from 'src/app/shared/layout/input-control-simple/input-select/input-select.component';
import { FilePickerComponent } from 'src/app/shared/layout/input-control/file-picker/file-picker.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { EmployeeService, HRM_BranchService, HRM_Branch_ENTITY, HRM_WorkingTimeService, HRM_WorkingTime_ENTITY,HRM_Employee_ENTITY, HRM_TimeSheet_ENTITY, HRM_Workspace_ENTITY, HRM_Workspace_Comment_ENTITY, HRM_Workspace_Comment_Image_ENTITY, WorkspaceService, HRM_Workspace_Master_ENTITY, HRM_Workspace_Comment_Files_ENTITY } from 'src/app/shared/service-proxies/api-shared';
import { SystemServiceProxy } from 'src/app/shared/service-proxies/service-proxies';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';
import * as $ from 'jquery';
import { timeStamp } from 'console';
import { InputSelectComponentV2 } from 'src/app/shared/layout/input-control-simple/input-select-v2/input-select-v2.component';
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
  declare var refresh_calendar;
  declare var setSelecteWorking;
  declare var setSelecteEmployee;
  declare var setAllEmployee;
  declare var setbase_domain;
  declare var getAllEmployee;
  declare var getdata_update_timesheet;
  declare var ShowEventDetail;
  declare var getdata_comment;
@Component({
  selector: 'app-workflow-management-add-edit',
  templateUrl: './workflow-management-add-edit.component.html',
  styleUrls: ['./workflow-management-add-edit.component.css']
})
export class WorkflowManagementAddEditComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {
  constructor(
    private injector: Injector,
    private appSession: AppSession,
    private branchService:HRM_BranchService,
    private workspaceService:WorkspaceService,
    private workingTimeService:HRM_WorkingTimeService,
    private filePickerComponent: FilePickerComponent,
    private employeeService:EmployeeService,
    private systemService:SystemServiceProxy
  ) {
    super(injector);
    this.initCombobox();
    this.idSelect = this.getRouteParam('code');
    this.CurrenFrom = this.getRouteData('editPageState');
    this.inputMaster.code = this.idSelect;
  }

  @ViewChild('SelectBranchPicker') SelectBranchPicker: InputSelectComponentV2;
  @ViewChild('SelectWorkingPicker') SelectWorkingPicker: InputSelectComponentV2;
  @ViewChild('SelectWorkingstatus') SelectWorkingstatus: InputSelectComponentV2;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  // @ViewChild('FilePickerComponent') filePickerComponent: FilePickerComponent;

  listBranch:HRM_Branch_ENTITY[] = [];
  listWorkspace:HRM_Workspace_ENTITY[] = [];
  listWorking:HRM_WorkingTime_ENTITY[] = [];
  listTimeSheet:HRM_TimeSheet_ENTITY[] = [];
  listEmployeeTemp:HRM_Employee_ENTITY[] = [];
  listEmployee:HRM_Employee_ENTITY[] = [];
  workingSelected:HRM_WorkingTime_ENTITY = new HRM_WorkingTime_ENTITY();
  employeeSelected:HRM_Branch_ENTITY = new HRM_Branch_ENTITY();
  constHour:number = 0;
  dataTimeSheet:any = {};
  filterWorkspace:HRM_Workspace_ENTITY = new HRM_Workspace_ENTITY();
  inputMaster:HRM_Workspace_Master_ENTITY = new HRM_Workspace_Master_ENTITY();
  tbName: string = 'HRM_Workspace_Master';
  isShowNameTimeSheet:boolean = false;
  listWorkingStatus:any[] = [
    {
      id:0,
      name:'Tất cả'
    },
    {
      id:1,
      name:'Đã hoàn thành'
    },
    {
      id:2,
      name:'Đang hoàn thành'
    },
    {
      id:3,
      name:'Chưa hoàn thành'
    }
  ];
  onApprove(item: any): void {
    throw new Error('Method not implemented.');
  }
  onViewDetail(item: any): void {
    throw new Error('Method not implemented.');
  }
  onSave(): void {
    let masterData = new HRM_Workspace_Master_ENTITY();
    let allData = getDataCalendar1();
    Object.entries(allData).forEach(e => {
      let [key, value] = e;
      (value as Array<HTMLElement>).forEach(e1 => {
        let wsp = new HRM_Workspace_ENTITY();
        let cmt = new HRM_Workspace_Comment_ENTITY(); 
        let employee = this.listEmployee.find(emp=>emp.code == e1['idEmployee']);
        wsp.key = key;
        wsp.title = e1['title'];
        wsp.start = e1['start'];
        wsp.allDay = e1['allDay'];
        wsp.wkName = e1['wkName'];
        wsp.wkHour = e1['wkHour'];
        wsp.className = e1['className'];
        wsp.idCalendar = e1['idCalendar'];
        wsp.idEmployee = employee['code'];
        wsp.constHour = Number(employee["constHour"]);

        if(e1['code']) wsp.code = e1['code'];
        else wsp.code = '';
        if(!wsp.hrm_workspace_comment) wsp.hrm_workspace_comment = [];
        if(!masterData.hRM_Workspace) masterData.hRM_Workspace = [];
        wsp.hrm_workspace_comment.push(cmt);
        masterData.hRM_Workspace.push(wsp);
      });
    });
    this.inputMaster.accounT_ID = this.appSession.user.id;
    this.inputMaster.hRM_Workspace = masterData.hRM_Workspace;
    switch(this.CurrenFrom){
      case EditPageState.add: {
        this.workspaceService.hRM_Workspace_Insert(this.inputMaster).subscribe((respond)=>{
          if(respond['status'] == '0'){
            this.showMessageSuccess(respond['message']);
            this.UpdateView();
          }
          else{
            this.showError(respond['message']);
          }
        },
        (err) => {if (err.status == 401) {this.Respond401();}else this.showMessageError('Error '+err.status+': '+err.message)},
        () => {this.UnBlockUI();});
        break;
      }
      case EditPageState.edit: {
        this.inputMaster.type = 'UPDATE_DETAIL';
        this.workspaceService.hRM_Workspace_Update(this.inputMaster).subscribe((respond)=>{
          if(respond['status'] == '0'){
            this.showMessageSuccess(respond['message']);
            this.UpdateView();
          }else{
            this.showError(respond['message']);
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
        break;
      }
      default:break;
    }
    
  }
  onSearch(): void {
    throw new Error('Method not implemented.');
  }
  onResetSearch(): void {
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
  CurrenFrom: string = '';

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
    setbase_domain(this.systemService.baseUrl);
    switch(this.CurrenFrom){
      case'Add':{
        this.getEmployee(false);
        this.setCss();
        break;
      }
      case'Edit':{
        this.getEmployee(true);
        this.setCss();
        break;
      }
      case'ViewDetail':{
        this.getEmployee(true);
        this.setCss();
        break;
      }
      default:break;
    }
    
    this.setAcction();
  }
  setCss(){
    setTimeout(() => {
      try{
        document.getElementsByClassName("branch-filter")[0].getElementsByClassName("bootstrap-select")[0]['style'].maxWidth ='40px';
        document.getElementsByClassName("branch-filter")[0].getElementsByClassName("bootstrap-select")[0].getElementsByClassName("btn")[0]['style']['padding-right']=0;
        document.getElementsByClassName('branch-filter')[0].getElementsByTagName('button')[0].insertAdjacentHTML('beforeend', '<span class="material-icons">filter_alt</span>')
        document.getElementsByClassName("shift-filter")[0].getElementsByClassName("bootstrap-select")[0]['style'].maxWidth ='100%';
        document.getElementsByClassName("shift-filter")[0].getElementsByClassName("bootstrap-select")[0].getElementsByClassName("btn")[0]['style']['padding-right']=0;
      }catch{
        this.setCss();
      }
    }, 500);
  }
  getEmployee(isloadData){
    let p = new HRM_Employee_ENTITY();
    this.employeeService.hRM_Employee_Search(p).subscribe((respond)=>{
      this.listEmployee = respond;
      this.listEmployeeTemp = respond;
      setAllEmployee(respond);
      this.getWorkspace(isloadData);
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
  }
  getWorkspace(isloadData){
    this.workspaceService.hRM_Workspace_Master_Search(this.inputMaster).subscribe((respond)=>{
      this.inputMaster.name = respond[0].name;
      if(isloadData){
        this.listWorkspace = respond[0].hRM_Workspace;
        this.genTimeWorking_emp();
        initFullCalendar1(respond[0].data_month,this.listWorkspace,false,this.CurrenFrom);
      }
      else initFullCalendar1(new Date,[],false,this.CurrenFrom);
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
  genTimeWorking_emp(){
    this.listEmployee.forEach(e=>{
      let t = this.listWorkspace.filter(w=>w.idEmployee == e.code);
      if(t.length > 0){
        let TimeWorking = t.map(a => a.wkHour).reduce(function(a, b)
        {
          return a + b;
        });
        e['constHour'] = t[0].constHour;
        e['TimeWorking'] = TimeWorking;
        if (!e['OverTime']) e['OverTime'] = 0;
        if((TimeWorking - t[0].constHour)> 0)
          e['OverTime'] = (TimeWorking - t[0].constHour);
      }else{
        e['OverTime'] = 0;
        e['OverTime'] = 0;
      }
    })
    this.UpdateView();
  }
  setAcction(){
    if(this.toolbar)
      this.toolbar.setUiAction(this);
    else
      setTimeout(() => {
        this.setAcction();
      }, 50);
  }
  onSelectBranch(item:string){
    let t = this.listEmployeeTemp.filter(e=>item.indexOf(e.branch_code) >= 0)
    this.listEmployee = t;
    if(item == "") this.listEmployee = this.listEmployeeTemp;
    this.UpdateView();
  }
  onSelectWokingstatus(e:string){
    let t = [];
    switch(Number(e)){
      case 0:
        t =  this.listWorkspace;
        break;
      case 1:
        t =  this.listWorkspace.filter(e=>e.percent_done == 100);
        break;
      case 2:
        t =  this.listWorkspace.filter(e=>e.percent_done != null && e.percent_done < 100);
        break;
      case 3:
        t =  this.listWorkspace.filter(e=>e.percent_done == null);
        break;
    }
    refresh_calendar(t,false);
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
      item['TimeWorking'] = 0;
    }
    this.employeeSelected = item;
    setSelecteEmployee(this.employeeSelected);
    let t =  this.listWorkspace.filter(e=>e.idEmployee == this.employeeSelected['code']);
    refresh_calendar(t,false);
    this.UpdateView();
  }
  editHour(id:number){
    this.listEmployee.forEach(e=>{
      if(e.id == id) {
        // e['constHour'] = this.constHour;
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
      this.SelectWorkingPicker.setList(this.listWorking); 
      this.SelectWorkingstatus.setList(this.listWorkingStatus);
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
  onClickAcction(id: number, storedName: string, param: string, keyService: string, classForm: string): void {
    switch(classForm){
      case'Add':{

        break;
      }
      case'Edit':{
        this.router.navigate(['/calender-month-edit'],{queryParams :{code:this.idSelect}});
        break;
      }
      case'Delete':{

        break;
      }
      case'Save':{
        this.onSave();
        break;
      }
      case'Search':{
        
        break;
      }
      case'ViewDetail':{

        break;
      }
      default:break;
    }
  }
  ClickDate(){
    var monday = moment()
    .startOf('month')
    .day("Monday");
  }
  onClickShowEventDetail(e:any){
    this.BlockUI();
    let top = Number(e.target.value.split('-')[1]);
    this.workspaceService.hRM_Workspace_Timesheet_Search_By_IDCalendar(this.idSelect,e.target.value.split('-')[0],top).subscribe((respond)=>{
        ShowEventDetail(respond['idCalendar'],respond['title'],respond['html_comment']);
        this.UpdateView();
    },
    (err) => {
        if (err.status == 401) {
          this.Respond401();
        }
        this.showMessageError('status:'+err.status+' | message:'+err.message)
        this.UnBlockUI();
    },
    () => {
      this.UnBlockUI();
    });
  }
  updateTimesheet(e:any){
    let data = getdata_update_timesheet();
    this.filterWorkspace.idCalendar = data.idCalendar;
    this.filterWorkspace.description = data.description;
    this.filterWorkspace.percent_done = data.percent_done;
    this.workspaceService.hRM_Workspace_Update_Timesheet(this.filterWorkspace).subscribe((respond)=>{
      if(respond['status'] == '0'){
        this.showMessageSuccess(respond['message']);
        this.listWorkspace.forEach(wk=>{
          if(wk.idCalendar == respond['idCalendar']){
            wk.color = respond['color'];
          }
        });
        refresh_calendar(this.listWorkspace,false);
        this.UpdateView();
      }else{
        this.showError(respond['message']);
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
  postComment(){
    this.BlockUI();
    let data = getdata_comment();
    let p = new HRM_Workspace_Comment_ENTITY();
    p.key_calendar = data.key_calendar;
    p.content = data.content;
    p.account_create = this.appSession.user.id.toString();
    if(data.hrm_workspace_comment_images.length > 0){
      data.hrm_workspace_comment_images.forEach(e=>{
        var t = new HRM_Workspace_Comment_Image_ENTITY();
        t.image_base64 = e['value'];
        t.length = e['length'];
        t.name = e['name'];
        if(!p.hrm_workspace_comment_images)p.hrm_workspace_comment_images=[];
        p.hrm_workspace_comment_images.push(t);
      });
    }
    this.workspaceService.hRM_Workspace_Comment_Insert(p).subscribe(async (respond)=>{
      if(respond['status'] == '0'){
        if(data.hRM_Workspace_Comment_Files.length > 0){
          this.BlockUI();
          await this.filePickerComponent.postFiles_v2(data.hRM_Workspace_Comment_Files,respond['newcode'],'HRM_Workspace_Comment_Files_Upload_Save',this.callback_append_html_after_comment);
          this.UnBlockUI();
        }
        this.append_html_after_comment(respond['description']);
        this.showMessageSuccess(respond['message']);
        this.UpdateView();
      }else{
        this.showError(respond['message']);
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
  append_html_after_comment(des:string){
    $("ul.timeline.timeline-simple").append(des);
  }
  callback_append_html_after_comment(des:any){
    $('#'+des['ref_Master_str']).append(des['description']);
  }
  onSaveUpdateMasterInfo(){
    this.inputMaster.type = 'UPDATE_MASTER';
    this.workspaceService.hRM_Workspace_Update(this.inputMaster).subscribe((respond)=>{
      if(respond['status'] == '0'){
        this.showMessageSuccess(respond['message']);
        this.onclickShowNameTimeSheet(false);
        this.UpdateView();
      }else{
        this.showError(respond['message']);
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
  onclickShowNameTimeSheet(v:boolean){
    this.isShowNameTimeSheet = v;
    this.UpdateView();
  }
}