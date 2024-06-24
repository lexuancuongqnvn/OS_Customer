import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { JqgridEditComponent } from 'src/app/shared/jqgrid/jqgrid-edit/jqgrid-edit.component';
import { JqgridListComponent } from 'src/app/shared/jqgrid/jqgrid-list/jqgrid-list.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { InputSelectComponentV2 } from 'src/app/shared/layout/input-control-simple/input-select-v2/input-select-v2.component';
import { InputSelectComponent } from 'src/app/shared/layout/input-control-simple/input-select/input-select.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarEditComponent } from 'src/app/shared/layout/toolbar-edit/toolbar-edit.component';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { AccountService, AcctionService, MenuService, ReferenceService, SYS_Account_Group, SYS_Menu, SYS_Menu_Sub } from 'src/app/shared/service-proxies/api-shared';
import { SidenavAddEditComponent } from 'src/app/shared/sidenav/sidenav-add-edit/sidenav-add-edit.component';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';
import { isBuffer } from 'util';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  @ViewChild('gridMenuList') gridMenuList: JqgridListComponent;
  @ViewChild('gridMenuEdit') gridMenuEdit: JqgridEditComponent<SYS_Menu_Sub>;
  @ViewChild('dialogDelete') dialogDelete: DialogAcctionComponent;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  @ViewChild('toolbarEdit') toolbarEdit: ToolbarComponent;
  @ViewChild('sidenavAddEdit') sidenavAddEdit: SidenavAddEditComponent;
  @ViewChild('SelectAccountGroupPicker') SelectAccountGroupPicker: InputSelectComponentV2
  tbName: string = 'SYS_Menu';
  tbName_sub: string = 'SYS_Menu_Sub';
  CurrenFrom:string = EditPageState.view;
  InputMaster: SYS_Menu[] = [];
  sYS_Menu_Sub: SYS_Menu_Sub[] = [];
  listAccountGroup: SYS_Account_Group[] = [];
  InputModel: SYS_Menu = new SYS_Menu();
  filterInput:SYS_Menu = new SYS_Menu();
  isEdit:boolean = false;

  col_model:any[] = [
    { label: 'Mã', name: 'code', key: true, width: 10 , hidden: true},
    { label: 'Tên Việt', name: 'namE_VN', width: 15 },
    { label: 'Tên Anh', name: 'namE_EN', width: 15 },
    { label: 'Kích hoạt', name: 'active', width: 25 },
    { label: 'Icon', name: 'icon', width: 12 } ,
    { label: 'Đường dẫn', name: 'link', width: 12 } ,
    { label: 'Mã người dùng', name: 'userID', width: 12 } ,
    { label: 'Danh sách hành động', name: 'lisT_ACCTIONS', width: 12 } ,
    { label: 'Quyền', name: 'decentralization', width: 12, hidden: true } ,
    { label: 'Ghi chú', name: 'notes', width: 12 } 
  ]
  col_model_edit:any[] = [
    { label: 'Mã', name: 'code', key: true, width: 10 , hidden: true,editable: true},
    { label: 'Tên Việt', name: 'namE_VN', width: 15 ,editable: true},
    { label: 'Tên Anh', name: 'namE_EN', width: 15 ,editable: true},
    { label: 'Vị trí', name: 'location', width: 15 ,editable: true, sorttype: 'int'},
    { label: 'Kích hoạt', name: 'active', width: 10 ,editable: true, sorttype: 'checkbox'},
    { label: 'Hiển thị trên app', name: 'iS_SHOW_APP', width: 10 ,editable: true, sorttype: 'checkbox'},
    { label: 'Icon', name: 'icon', width: 5 ,editable: true},
    { label: 'Đường dẫn', name: 'link', width: 10 ,editable: true},
    { label: 'Mã người dùng', name: 'userID', width: 15 ,editable: true},
    { label: 'Danh sách hành động', name: 'lisT_ACCTIONS', width: 20 ,editable: true},
    { label: 'Quyền', name: 'decentralization', width: 20, hidden: false ,editable: true, sorttype: "multiselect", editoptions: { value: [] }},
    { label: 'Ghi chú', name: 'notes', width: 12 ,editable: true} ,
    { label: 'Component apps', name: 'componenT_APP', width: 10 ,editable: true},
    { label: 'Router link', name: 'iS_ROUTER_LINK', width: 10 ,editable: true, sorttype: 'checkbox'},
  ]

  constructor(
    private injector: Injector,
    private acctionService: AcctionService,
    private accountService: AccountService,
    private appSession: AppSession,
    private referenceService: ReferenceService,
    private menuService:MenuService
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
  onSelect(v:any,col:string){
    this.InputModel.decentralization = v;
  }
  onClickAcction(id: number, storedName: string, param: string, keyService: string, classForm: string): void {
    switch(classForm){
      case EditPageState.add:{
        this.isEdit = true;
        this.InputModel = new SYS_Menu();
        setTimeout(() => {
          this.sidenavAddEdit.title = "Thêm mới menu";
          this.sidenavAddEdit.open();
          this.toolbarEdit.setUiAction(this);
          this.UpdateView();
          this.gridMenuEdit.setData([]);
          this.SelectAccountGroupPicker.setList(this.listAccountGroup);
          this.UpdateView();
        }, 100);
        break;
      }
      case EditPageState.edit:{
        this.isEdit = true;
        this.InputModel = new SYS_Menu();
        this.InputModel.code = this.idSelect;
        this.menuService.sYS_Menu_Search_byID(this.idSelect,this.appSession.user.id,'BYID').subscribe((respond)=>{
          this.InputModel = respond;
          this.sidenavAddEdit.open();
          this.toolbarEdit.setUiAction(this);
          this.UpdateView();
          this.gridMenuEdit.setData(this.InputModel.syS_Menu_Sub);
          this.UpdateView();
          this.SelectAccountGroupPicker.setList(this.listAccountGroup);
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

        break;
      }
      case EditPageState.save:{
        try{
          // this.InputModel.syS_Menu_Sub = this.gridMenuEdit.getAllData(this.tbName_sub);
          this.InputModel.syS_Menu_Sub = [];
          var syS_Menu_Subs = this.gridMenuEdit.allData;
          if(syS_Menu_Subs.length>0)
          {
            for(var i = 0 ; i < syS_Menu_Subs.length ; i++)
            {
              var newrow = new SYS_Menu_Sub();
              for (const [key, value] of Object.entries(syS_Menu_Subs[i])) {
                newrow[key] = syS_Menu_Subs[i][key];
              }
              newrow['userID'] = this.appSession.user.id;
              this.InputModel.syS_Menu_Sub.push(newrow);
            }
          }
        }catch{}
        // this.InputModel = SYS_Menu['toJSON'](this.InputModel);
        this.InputModel.module = this.getModule;
        if(!this.InputModel.code){
          this.menuService.sYS_Menu_Inserst(this.InputModel).subscribe((respond)=>{
            if(respond['status'] == '0')
            {
              this.showMessageSuccess(respond['message']);
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
        }else{
          this.menuService.sYS_Menu_Update(this.InputModel).subscribe((respond)=>{
            if(respond['status'] == '0')
            {
              this.showMessageSuccess(respond['message']);
              this.sidenavAddEdit.close();
              this.LoadData();
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
        
        break;
      }
      case EditPageState.search:{
        this.filterInput.userID = this.appSession.user.id;
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
    this.initCombobox();
  }
  initCombobox(){
    var p = new SYS_Account_Group();
    p.accounT_ID = this.appSession.user.id;
    p.type = 'ALL';
    this.accountService.sYS_Account_Group_Search(p).subscribe(
      (data: any) => {
        this.col_model_edit[10].editoptions.value=data;
        this.listAccountGroup = data;
        
        this.UpdateView();
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
        //isloading = true
      }
    )
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
  confirmDelete() {
    let listID: string[] = [];
    var arr = document.getElementsByClassName(this.tbName);
    for (var i = 0; i < arr.length; i++)
      if (arr[i].children[0]['checked'] == true) {
        listID.push(this.InputMaster[i]['id'].toString());
      }
    this.BlockUI();
    this.acctionService.acction_Delete_ListID(listID).subscribe(
      (data: any) => {
        this.showSuccess()
        this.LoadData();
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      })
    this.UpdateView();
  }
  LoadData() {
    this.BlockUI();
    this.filterInput.module = this.getModule;
    this.menuService.sYS_Menu_Search(this.filterInput).subscribe(
      (data: any) => {
        this.gridMenuList.setData(data,this.col_model,this.tbName)
        this.UpdateView();
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
  }
}
