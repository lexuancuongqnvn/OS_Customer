import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { JqgridEditComponent } from 'src/app/shared/jqgrid/jqgrid-edit/jqgrid-edit.component';
import { JqgridListComponent } from 'src/app/shared/jqgrid/jqgrid-list/jqgrid-list.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { InputSelectComponentV2 } from 'src/app/shared/layout/input-control-simple/input-select-v2/input-select-v2.component';
import { InputSelectComponent } from 'src/app/shared/layout/input-control-simple/input-select/input-select.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { AccountService, DepartmentService, Department_ENTITY, Department_Position_ENTITY, SYS_Account_Group, SYS_Account_Infomation } from 'src/app/shared/service-proxies/api-shared';
import { AlertMessageComponent } from 'src/app/shared/sidenav/alert-message/alert-message.component';
import { SidenavAddEditComponent } from 'src/app/shared/sidenav/sidenav-add-edit/sidenav-add-edit.component';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent  extends LayoutComponentBase implements OnInit, IUiAction<any> {

  @ViewChild('gridMenuList') gridMenuList: JqgridListComponent;
  @ViewChild('gridMenuEdit') gridMenuEdit: JqgridEditComponent<SYS_Account_Group>;
  @ViewChild('dialogDelete') dialogDelete: DialogAcctionComponent;
  @ViewChild('dialogAddDepartment') dialogAddDepartment: DialogAcctionComponent;
  @ViewChild('dialogAddPosition') dialogAddPosition: DialogAcctionComponent;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  @ViewChild('toolbarEdit') toolbarEdit: ToolbarComponent;
  @ViewChild('sidenavAddEdit') sidenavAddEdit: SidenavAddEditComponent;
  @ViewChild('alertMessage') alertMessage: AlertMessageComponent;
  @ViewChild('SelectDepartmentPicker') SelectDepartmentPicker: InputSelectComponentV2;
  // @ViewChild('SelectDepartmentPicker2') SelectDepartmentPicker2: InputSelectComponentV2;
  @ViewChild('SelectDepartmentPicker3') SelectDepartmentPicker3: InputSelectComponentV2;
  // @ViewChild('SelectPositionPicker') SelectPositionPicker: InputSelectComponentV2;
  @ViewChild('SelectAccountGroupPicker') SelectAccountGroupPicker: InputSelectComponentV2;
  tbName: string = 'SYS_Account_Infomation';
  CurrenFrom:string = EditPageState.view;
  InputMaster: SYS_Account_Infomation[] = [];
  InputModel: SYS_Account_Infomation = new SYS_Account_Infomation();
  DepartmentModel:Department_ENTITY =  new Department_ENTITY();
  PositionModel:Department_Position_ENTITY =  new Department_Position_ENTITY();
  filterInput:SYS_Account_Infomation = new SYS_Account_Infomation();
  listDepartment:Department_ENTITY[] = [];  
  listEmployeePosition:Department_Position_ENTITY[]=[];
  listGroup:SYS_Account_Group[] = [];
  isEdit:boolean = false;

  col_model:any[] = [
    { label: 'Mã', name: 'code', key: true, width: 10 , hidden: true},
    { label: 'email/username', name: 'useR_NAME', width: 20 },
    { label: 'Last name', name: 'lasT_NAME', width: 20 },
    { label: 'First name', name: 'firsT_NAME', width: 20 },
    { label: 'Department', name: 'departmenT_NAME', width: 20 },
    { label: 'Position', name: 'positioN_NAME', width: 20 },
    { label: 'ID card', name: 'iD_CARD', width: 20 },
    { label: 'Birthday', name: 'birthdaY_F', width: 20 }
  ]
  constructor(
    private injector: Injector,
    private appSession: AppSession,
    private accountService:AccountService,
    private departmentService:DepartmentService
  ) {
    super(injector);
  }
  showPopupAddDep(){
    this.DepartmentModel = new Department_ENTITY();
    this.dialogAddDepartment.open();
  }
  onChangeValue(v:any,col:string){
    if(col == ''){
      this.DepartmentModel.allow_approve_worktime = this.InputModel.code;
    }else{
      if(v) this.InputModel.allow_approve_worktime = this.InputModel.code;
      else this.InputModel.allow_approve_worktime = '';
    }
  }
  confirmAddDepartment(){
    this.DepartmentModel.type = 'INSERT';
    this.departmentService.department_Actions(this.DepartmentModel).subscribe((respond)=>{
      if(respond['status'] == 0) {
        this.alertMessage.AlertSuccess(respond['message']);
        this.initCombobox();
      }
      else this.alertMessage.AlertError(respond['message']);
    })
  }
  showPopupAddDepPos(){
    this.PositionModel = new Department_Position_ENTITY();
    this.dialogAddPosition.open();
    setTimeout(() => {
      this.SelectDepartmentPicker3.renderSelectPicker();
      this.SelectDepartmentPicker3.setList(this.listDepartment);
    }, 100);
  }
  confirmAddPosition(){
    this.departmentService.department_Position_Insert(this.PositionModel).subscribe((respond)=>{
      if(respond['status'] == 0) {
        this.alertMessage.AlertSuccess(respond['message']);
        this.initCombobox();
      }
      else this.alertMessage.AlertError(respond['message']);
    })
  }
  onSelect(v:any,col:string){
    if(col == 'departmenT_CODE')
    {
      this.InputModel.departmenT_CODE = v;
      // this.InputModel.position = '';
      if(this.listDepartment.find(d=>d.code == v)) this.listEmployeePosition = this.listDepartment.find(d=>d.code == v).department_Positions;
    }else if(col == 'position')this.InputModel.position = v;
    else if(col == 'father')this.InputModel.father = v;
    else if(col == 'department_code2')this.PositionModel.department_code = v;
    else if(col == 'birthday')this.InputModel.birthday = v;
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
    throw new Error('Method not implemented.');
  }
  onSearch(): void {
    throw new Error('Method not implemented.');
  }
  onResetSearch(): void {
    throw new Error('Method not implemented.');
  }
  onClickAvarta(){
    document.getElementById('avarta').click();
  }
  valueUpload(v:any,field:string){
    this.InputModel[field]=v;
    this.UpdateView();
  }
  // renderSelectPicker(): void {
  //   this.SelectDepartmentPicker2.renderSelectPicker();
  //   this.SelectPositionPicker.renderSelectPicker();
  // }
  onClickAcction(id: number, storedName: string, param: string, keyService: string, classForm: string): void {
    switch(classForm){
      case EditPageState.add:{
        this.InputModel.accounT_ID = this.appSession.user.id;
        this.InputModel.avarta = '../assets/img/default-avatar.png'
        this.isEdit = true;
        this.InputModel = new SYS_Account_Infomation();
        setTimeout(() => {
          this.sidenavAddEdit.title = "Thêm mới nhân viên";
          this.sidenavAddEdit.open();
          this.toolbarEdit.setUiAction(this);
          this.initCombobox();
          this.UpdateView();
        }, 100);
        break;
      }
      case EditPageState.edit:{
        this.InputModel = new SYS_Account_Infomation();
        this.InputModel.accounT_ID = this.appSession.user.id;
        
        this.isEdit = true;
        this.filterInput.code =  this.idSelect;
        this.filterInput.accounT_ID =  this.appSession.user.id;
        this.accountService.sYS_Account_Info_Search(this.filterInput).subscribe((respond)=>{
          this.InputModel = respond[0];
          if(!this.InputModel.avarta){
            this.InputModel.avarta = '../assets/img/default-avatar.png'
          }
          this.sidenavAddEdit.open();
          this.toolbarEdit.setUiAction(this);
          this.initCombobox();
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
        // this.navigatePassParam('/menu-edit', { code: this.idSelect }, { filterInput: JSON.stringify(this.InputMaster) });
        break;
      }
      case EditPageState.delete:{
        this.InputModel.accounT_ID = this.appSession.user.id;
        this.dialogDelete.open();
        break;
      }
      case EditPageState.save:{
        if(!this.InputModel.father || this.InputModel.father == '') {
          this.alertMessage.AlertError('Error "In group"');return;
        }
        if(!this.InputModel.code){
          this.InputModel.accounT_ID =  this.appSession.user.id;
          this.accountService.sYS_Account_Infomation_Insert(this.InputModel).subscribe((respond)=>{
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
          this.InputModel.accounT_ID =  this.appSession.user.id;
          this.accountService.sYS_Account_Infomation_Update(this.InputModel).subscribe((respond)=>{
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

        break;
      }
      default:break;
    }
  }
  
  getDataByID(storedName: string, param: string, keyService: string): void {
    throw new Error('Method not implemented.');
  }
  
  ngOnInit(): void {
    this.setAcction();
    this.LoadData();
  }
  initCombobox(){
    var p = new Department_ENTITY();
    this.departmentService.department_Search(p).subscribe(
      (data: any) => {
        this.listDepartment = data;
        this.listDepartment.forEach(d=>{
          if(d.department_Positions){
            d.department_Positions.forEach(p=>{
              if(!this.listEmployeePosition) this.listEmployeePosition=[];
              this.listEmployeePosition.push(p);
            })
          }
        })
        this.DepartmentModel = this.listDepartment.find(d=>d.code == this.InputModel.departmenT_CODE);
        
        this.UpdateView();
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
    var p2 = new SYS_Account_Group();
    p2.accounT_ID =  this.appSession.user.id;
    p2.type =  'ALL';
    this.accountService.sYS_Account_Group_Search(p2).subscribe(
      (data: any) => {
        this.listGroup = data;
        this.SelectAccountGroupPicker.setList(this.listGroup);
        this.UpdateView();
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
  }
  onSelectGroup(v:any){
  }
  setAcction(){
    if(this.toolbar){
       this.toolbar.setUiAction(this);
    }
    else
      setTimeout(() => {
        this.setAcction();
      }, 50);
  }
  onSelectDepartment(v:any,col:string){
    this.InputModel.departmenT_CODE = v;
  }
  confirmDelete() {
        this.InputModel.code = this.idSelect;
        this.accountService.sYS_Account_Infomation_Delete(this.InputModel.code,this.appSession.user.id).subscribe((respond)=>{
          if(respond['status'] == '0')
          {
            this.showMessageSuccess(respond['message']);
            this.LoadData();
            this.sidenavAddEdit.close();
          }else
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
  LoadData() {
    this.BlockUI();
    this.filterInput.code = null;
    this.accountService.sYS_Account_Info_Search(this.filterInput).subscribe(
      (data: any) => {
        this.InputMaster = data;
        data.forEach(element => {
          this.InputMaster.forEach(element2 => {
            if(element['code'] == element2['code_master'])
              element2['name_master'] = element['name'];  
          });
        });
        this.gridMenuList.setData(this.InputMaster,this.col_model,this.tbName)
        this.UpdateView();
        this.UnBlockUI();
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
  }
}
