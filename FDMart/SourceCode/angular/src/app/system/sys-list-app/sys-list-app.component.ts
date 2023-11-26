import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { JqgridListComponent } from 'src/app/shared/jqgrid/jqgrid-list/jqgrid-list.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { InputSelectComponentV2 } from 'src/app/shared/layout/input-control-simple/input-select-v2/input-select-v2.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { AccountService, AcctionService, SYSCommonService, SYS_Account_Group, SYS_List_App_ENTITY } from 'src/app/shared/service-proxies/api-shared';
import { AlertMessageComponent } from 'src/app/shared/sidenav/alert-message/alert-message.component';
import { SidenavAddEditComponent } from 'src/app/shared/sidenav/sidenav-add-edit/sidenav-add-edit.component';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-sys-list-app',
  templateUrl: './sys-list-app.component.html',
  styleUrls: ['./sys-list-app.component.css']
})
export class SysListAppComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    private injector: Injector,
    private sYSCommonService: SYSCommonService,
    private accountService: AccountService,
    private appSession: AppSession
  ) {
    super(injector);
  }
  @ViewChild('dialogDelete') dialogDelete: DialogAcctionComponent;
  @ViewChild('sidenavAddEdit') sidenavAddEdit: SidenavAddEditComponent;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  @ViewChild('toolbarEdit') toolbarEdit: ToolbarComponent;
  @ViewChild('SelectStatusTaskPicker') SelectStatusTaskPicker: InputSelectComponentV2;
  @ViewChild('gridList') gridList: JqgridListComponent;
  @ViewChild('alertMessage') alertMessage: AlertMessageComponent;
  @ViewChild('SelectPicker') SelectPicker: InputSelectComponentV2;

  CurrenFrom:string = EditPageState.view;
  editedRowIndex!: number | undefined;
  isNew: boolean;
  tbName: string = 'SYS_Apps';
  InputMaster: SYS_List_App_ENTITY[] = [];
  listAccountGroup:SYS_Account_Group[] = [];
  dataGrid: any[] = [];
  listTbName: any[] = [];
  filterInput: SYS_List_App_ENTITY = new SYS_List_App_ENTITY();
  InputModel:SYS_List_App_ENTITY = new SYS_List_App_ENTITY();
  public listItemsCombobox: Array<{ tablE_NAME: string, name: string }> = [];
  isEdit:boolean = false;
  autorenew:boolean = false;
  col_model:any[] = [
    { label: 'Mã', name: 'code', key: true, width: 10 , hidden: true},
    { label: 'Tên app', name: 'name', width: 25 },
    { label: 'Mã app', name: 'key_app', width: 20 },
    { label: 'Default link', name: 'default_link', width: 20 },
    { label: 'icon', name: 'icon', width: 20 }
  ]

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '10rem',
    minHeight: '10rem',
    placeholder: 'Nhập mô tả app...',
    translate: 'yes',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ],
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ],
    fonts: [
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
      {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    ],
    uploadWithCredentials: false,
    sanitize: true,
    uploadUrl: 'v1/image'
  };
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
        this.InputModel = new SYS_List_App_ENTITY();
        setTimeout(() => {
          this.sidenavAddEdit.title = "Thêm mới APP";
          this.sidenavAddEdit.open();
          this.toolbarEdit.setUiAction(this);
          this.initCombobox();
          this.UpdateView();
          this.UpdateView();
        }, 100);
        break;
      }
      case EditPageState.edit:{
        this.BlockUI();
        this.isEdit = true;
        this.InputModel = new SYS_List_App_ENTITY();
        this.InputModel.code = this.idSelect;
        this.InputModel.type = 'BYCODE';
        this.InputModel.user_login = this.appSession.user.code;
        this.sYSCommonService.sYS_List_App_Search(this.InputModel).subscribe((respond)=>{
          this.InputModel = respond[0];
          this.sidenavAddEdit.open();
          this.toolbarEdit.setUiAction(this);
          this.initCombobox();
          this.UpdateView(); 
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
        this.BlockUI();

        if(!this.InputModel.code){
          this.InputModel.type = 'INSERT';
          this.sYSCommonService.sYS_List_App_Actions(this.InputModel).subscribe((respond)=>{
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
          this.sYSCommonService.sYS_List_App_Actions(this.InputModel).subscribe((respond)=>{
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
        this.InputModel = new SYS_List_App_ENTITY();
        this.InputModel.code = this.idSelect;
        this.InputModel.type = 'BYCODE';
        this.InputModel.user_login = this.appSession.user.code;
        this.sYSCommonService.sYS_List_App_Search(this.InputModel).subscribe((respond)=>{
          this.InputModel = respond[0];
          this.sidenavAddEdit.open();
          this.initCombobox();
          this.toolbarEdit.setUiAction(this);
          this.UpdateView(); 
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
  }
  confirmDelete() {
    this.BlockUI();
    var p = new SYS_List_App_ENTITY();
    p.code = this.idSelect;
    p.type = 'DELETE';
    this.sYSCommonService.sYS_List_App_Actions(p).subscribe(
      (respond: any) => {
        if(respond['status'] == '0'){
          this.showMessageSuccess(respond['message'])
          this.LoadData();
        }else
        {
          this.showMessageError(respond['message'])
        }    
        this.UnBlockUI()    
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      })
    this.UpdateView();
  }
  LoadData() {
    this.BlockUI();
    this.filterInput.type = 'ALL';
    this.filterInput.user_login = this.appSession.user.code;
    this.sYSCommonService.sYS_List_App_Search(this.filterInput).subscribe(
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
  onSelect(v:any,col:string){
    this.InputModel[col] = v;
  }
  initCombobox(){
    var p = new SYS_Account_Group();
    p.accounT_ID = this.appSession.user.id;
    p.type = 'ALL';
    this.accountService.sYS_Account_Group_Search(p).subscribe(
      (data: any) => {
        if (data == null) return;
        this.listAccountGroup = data;
        this.SelectPicker.setList(this.listAccountGroup);
        this.UpdateView()
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
  }
}
