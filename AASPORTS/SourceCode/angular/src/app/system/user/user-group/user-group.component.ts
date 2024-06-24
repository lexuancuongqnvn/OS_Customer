import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { JqgridEditComponent } from 'src/app/shared/jqgrid/jqgrid-edit/jqgrid-edit.component';
import { JqgridListComponent } from 'src/app/shared/jqgrid/jqgrid-list/jqgrid-list.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { InputSelectComponentV2 } from 'src/app/shared/layout/input-control-simple/input-select-v2/input-select-v2.component';
import { InputSelectComponent } from 'src/app/shared/layout/input-control-simple/input-select/input-select.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { AccountService, DepartmentService, Department_ENTITY, SYS_Account_Group } from 'src/app/shared/service-proxies/api-shared';
import { AlertMessageComponent } from 'src/app/shared/sidenav/alert-message/alert-message.component';
import { SidenavAddEditComponent } from 'src/app/shared/sidenav/sidenav-add-edit/sidenav-add-edit.component';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.css']
})
export class UserGroupComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  @ViewChild('gridMenuList') gridMenuList: JqgridListComponent;
  @ViewChild('gridMenuEdit') gridMenuEdit: JqgridEditComponent<SYS_Account_Group>;
  @ViewChild('dialogDelete') dialogDelete: DialogAcctionComponent;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  @ViewChild('toolbarEdit') toolbarEdit: ToolbarComponent;
  @ViewChild('sidenavAddEdit') sidenavAddEdit: SidenavAddEditComponent;
  @ViewChild('alertMessage') alertMessage: AlertMessageComponent;
  @ViewChild('SelectDepartmentPicker') SelectDepartmentPicker: InputSelectComponentV2;
  tbName: string = 'SYS_Account_Group';
  CurrenFrom:string = EditPageState.view;
  InputMaster: SYS_Account_Group[] = [];
  InputModel: SYS_Account_Group = new SYS_Account_Group();
  filterInput:SYS_Account_Group = new SYS_Account_Group();
  listDepartment:Department_ENTITY[] = [];  
  isEdit:boolean = false;

  col_model:any[] = [
    { label: 'Mã', name: 'code', key: true, width: 10 , hidden: true},
    { label: 'Tên nhóm', name: 'name', width: 15 },
    { label: 'Thuộc phòng ban', name: 'departmenT_NAME', width: 20 }
  ]
  constructor(
    private injector: Injector,
    private appSession: AppSession,
    private accountService:AccountService,
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
    this.InputModel.accounT_ID = this.appSession.user.id;
    switch(classForm){
      case EditPageState.add:{
        this.isEdit = true;
        this.InputModel = new SYS_Account_Group();
        setTimeout(() => {
          this.sidenavAddEdit.title = "Thêm mới nhóm người dùng";
          this.sidenavAddEdit.open();
          this.toolbarEdit.setUiAction(this);
          this.initCombobox();
          this.UpdateView();
        }, 100);
        break;
      }
      case EditPageState.edit:{
        this.isEdit = true;
        this.filterInput.code =  this.idSelect;
        this.filterInput.accounT_ID =  this.appSession.user.id;
        this.filterInput.type =  '';
        this.accountService.sYS_Account_Group_Search(this.filterInput).subscribe((respond)=>{
          this.InputModel = respond[0];
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
        this.dialogDelete.open();
        
        break;
      }
      case EditPageState.save:{
        if(!this.InputModel.code){
          this.InputModel.type = 'INSERT';
          this.filterInput.accounT_ID =  this.appSession.user.id;
          this.accountService.sYS_Account_Group_Actions(this.InputModel).subscribe((respond)=>{
            if(respond['status'] == '0')
            {
              this.alertMessage.AlertSuccess(respond['message']);
              this.sidenavAddEdit.close();
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
          this.InputModel.accounT_ID =  this.appSession.user.id;
          this.accountService.sYS_Account_Group_Actions(this.InputModel).subscribe((respond)=>{
            if(respond['status'] == '0')
            {
              this.showMessageSuccess(respond['message']);
              this.sidenavAddEdit.close();
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
        this.InputModel.type = 'DELETE';
        this.InputModel.code = this.idSelect;
        this.accountService.sYS_Account_Group_Actions(this.InputModel).subscribe((respond)=>{
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
    this.filterInput.type = 'ALL';
    this.filterInput.accounT_ID = this.appSession.user.id;
    this.accountService.sYS_Account_Group_Search(this.filterInput).subscribe(
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
