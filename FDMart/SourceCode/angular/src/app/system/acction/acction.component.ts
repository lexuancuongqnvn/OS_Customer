import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataStateChangeEvent, GridComponent, GridDataResult } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import moment from 'moment';
import { Observable } from 'rxjs';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { JqgridEditComponent } from 'src/app/shared/jqgrid/jqgrid-edit/jqgrid-edit.component';
import { JqgridListComponent } from 'src/app/shared/jqgrid/jqgrid-list/jqgrid-list.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { InputSelectComponentV2 } from 'src/app/shared/layout/input-control-simple/input-select-v2/input-select-v2.component';
import { InputSelectComponent } from 'src/app/shared/layout/input-control-simple/input-select/input-select.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';

import { AcctionService, GenRowTableService, AccountService, SYS_ActionsOnTable_ENTITY, SYS_Account_Group, ActionOnTableModel } from 'src/app/shared/service-proxies/api-shared';
import { SidenavAddEditComponent } from 'src/app/shared/sidenav/sidenav-add-edit/sidenav-add-edit.component';
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
@Component({
  selector: 'app-acction',
  templateUrl: './acction.component.html',
  styleUrls: ['./acction.component.css']
})

export class AcctionComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    private injector: Injector,
    private acctionService: AcctionService,
    private accountService: AccountService,
    private appSession: AppSession,
    private genRowTableService: GenRowTableService
  ) {
    super(injector);
  }
  @ViewChild('dialogDelete') dialogDelete: DialogAcctionComponent;
  @ViewChild('sidenavAddEdit') sidenavAddEdit: SidenavAddEditComponent;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  @ViewChild('toolbarEdit') toolbarEdit: ToolbarComponent;
  @ViewChild('SelectStatusTaskPicker') SelectStatusTaskPicker: InputSelectComponentV2;
  @ViewChild('gridMenuEdit') gridMenuEdit: JqgridEditComponent<SYS_ActionsOnTable_ENTITY>;
  @ViewChild('gridList') gridList: JqgridListComponent;
  @ViewChild(GridComponent)

  grid: GridComponent;
  formGroup!: FormGroup | undefined;
  public view: Observable<GridDataResult>;
  public gridView: GridDataResult;

  CurrenFrom:string = EditPageState.view;
  editedRowIndex!: number | undefined;
  isNew: boolean;
  tbName: string = 'SYS_ActionsOnTable';
  InputMaster: SYS_ActionsOnTable_ENTITY[] = [];
  dataGrid: any[] = [];
  listTbName: any[] = [];
  listAccountGroup:SYS_Account_Group[] = [];
  filterInput: SYS_ActionsOnTable_ENTITY = new SYS_ActionsOnTable_ENTITY();
  public listItemsCombobox: Array<{ tablE_NAME: string, name: string }> = [];
  isEdit:boolean = false;
  autorenew:boolean = false;
  col_model:any[] = [
    { label: 'Mã', name: 'code', key: true, width: 10 , hidden: true},
    { label: 'Bảng', name: 'tbName', width: 15 },
    { label: 'Tên tiếng việt', name: 'namE_VN', width: 15 }, 
    { label: 'Tên tiếng anh', name: 'namE_EN', width: 15 }
  ]
  col_model_edit:any[] = [
    { label: 'Mã', name: 'code', key: true, width: 10 , hidden: true},
    { label: 'Người tạo', name: 'colAccountID', width: 20, hidden: true ,editable: true, sorttype: "select", editoptions: { value: [] }},
    { label: 'Tên tiếng việt', name: 'namE_VN', width: 15  ,editable: true, sorttype: 'text'}, 
    { label: 'Tên tiếng anh', name: 'namE_EN', width: 15  ,editable: true, sorttype: 'text'},
    { label: 'Quyền hiển thị', name: 'permission', width: 20, hidden: false ,editable: true, sorttype: "multiselect", editoptions: { value: [] }},
    { label: 'Chức năng (trên mỗi form)', name: 'lisT_ACCTIONS', width: 20, hidden: false ,editable: true, sorttype: "multiselect", editoptions: { value: [] } },
    { label: 'Kích hoạt', name: 'active' ,width: 15  ,editable: true, sorttype: 'checkbox'},
    { label: 'Role', name: 'role' ,editable: true,width: 15  , sorttype: 'checkbox'},
    { label: 'Đường dẫn', name: 'link', width: 15  ,editable: true, sorttype: 'text'},
    { label: 'Bảng', name: 'tbName', width: 15 ,editable: true, sorttype: 'text' },
    { label: 'Stored procedure', name: 'storedName', width: 15 ,editable: true, sorttype: 'text' },
    { label: 'onInit', name: 'onInit', width: 15 ,editable: true, sorttype: 'text' },
    { label: 'Class form', name: 'classForm', width: 15  ,editable: true, sorttype: 'text'},
    { label: 'Trên form', name: 'onForm', width: 15  ,editable: true, sorttype: 'text'},
    { label: 'Biểu tượng', name: 'icon', width: 15  ,editable: true, sorttype: 'text'},
    { label: 'Màu biểu tượng', name: 'icon_color', width: 15  ,editable: true, sorttype: 'text'},
    { label: 'Vị trí', name: 'position', width: 15  ,editable: true, sorttype: 'int'},
    { label: 'Tham số', name: 'param', width: 15  ,editable: true, sorttype: 'text'},
    { label: 'Thời gian thêm', name: 'datE_ADD', width: 15 , sorttype: 'date'},
    { label: 'Thời gian sửa', name: 'datE_EDIT', width: 15 , sorttype: 'date'}
  ]
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
  public refreshIndex(tbName: string) {
    var i = 1;
    this.InputMaster.forEach(element => {
      element['indexRow'] = i; i++;
    });
  }
  public onSelectTbNameTask2(v:any): void {
    this.filterInput.tbName = v;
    if(v != "")
    this.LoadData();
  }
  public addNewRow(tbName: string): void {
    var newRow = new SYS_ActionsOnTable_ENTITY();
    newRow['id'] = this.getRandomID(tbName);
    if (!this.InputMaster)
      newRow['indexRow'] = 1;
    else
      newRow['indexRow'] = this.InputMaster.length + 1;
    newRow['colAccountID'] = this.appSession.user.id;
    newRow['active'] = true;
    newRow['role'] = false;
    newRow['namE_VN'] = '';
    newRow['namE_EN'] = '';
    newRow['tbName'] = '';
    newRow['link'] = '';
    newRow['storedName'] = '';
    newRow['onInit'] = '';
    newRow['classForm'] = '';
    newRow['onForm'] = '';
    newRow['icon'] = '';
    newRow['position'] = 0;
    newRow['keyService'] = '';
    newRow['permission'] = '';
    newRow['param'] = '';
    newRow['rollBack'] = '';
    newRow['rollNext'] = '';
    newRow['lisT_ACCTIONS'] = '';
    this.InputMaster.push(newRow);
    this.gridView = {
      data: this.InputMaster.slice(this.state.skip, this.state.skip + this.state.take),
      total: this.InputMaster.length
    };
    this.setDataGrid(this.gridView, this.tbName);
    this.UpdateView();
  }
  getRandomID(tbName: string): number {
    var min = Math.ceil(-999999999);
    var max = Math.floor(-1);
    var id = Math.floor(Math.random() * (max - min + 1)) + min;
    if (this.InputMaster)
      if (this.InputMaster.filter(e => e['id'] == id).length > 0) this.getRandomID(tbName);
    return id;
  }
  public ClearSelected(tbName: string): void {
    var arr = document.getElementsByClassName(tbName);
    // for (var i = 0; i < arr.length; i++)
    //   if (arr[i].children[0]['checked'] == true)
    //     this.InputMaster.splice(i, 1);
    let t = [];
    for (var i = 0; i < arr.length; i++)
      if (arr[i].children[0]['checked'] == true)
        t.push({ id: this.InputMaster[i]['id'] });
    t.forEach(e => {
      this.InputMaster = this.InputMaster.filter(_e => _e['id'] != e['id']);
    })
    this.refreshIndex(tbName);
    this.gridView = {
      data: this.InputMaster.slice(this.state.skip, this.state.skip + this.state.take),
      total: this.InputMaster.length
    };
    this.setDataGrid(this.gridView, this.tbName);
    this.UpdateView();
  }
  onApprove(item: any): void {
    throw new Error('Method not implemented.');
  }
  onViewDetail(item: any): void {
    throw new Error('Method not implemented.');
  }
  onSave(): void {
    this.acctionService.acction_Update(this.InputMaster).subscribe(
      (data: any) => {
        this.showSuccess()
        location.reload();
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      })
  }
  onSearch(): void {
    this.LoadData();
  }
  onResetSearch(): void {
    throw new Error('Method not implemented.');
  }
  onClickAcction(id: number, storedName: string, param: string, keyService: string, classForm: string): void {
    switch(classForm){
      case EditPageState.add:{
        this.isEdit = true;
        this.filterInput = new SYS_ActionsOnTable_ENTITY();
        setTimeout(() => {
          this.sidenavAddEdit.title = "Thêm mới dự án";
          this.sidenavAddEdit.open();
          this.toolbarEdit.setUiAction(this);
          this.UpdateView();
          this.gridMenuEdit.setData([]);
          this.UpdateView();
        }, 100);
        break;
      }
      case EditPageState.edit:{
        // this.isEdit = true;
        // this.filterInput = new SYS_ActionsOnTable_ENTITY();
        // this.acctionService.acction_Search(this.idSelect).subscribe((respond)=>{
        //   this.filterInput = respond[0];
        //   this.sidenavAddEdit.open();
        //   this.toolbarEdit.setUiAction(this);
        //   this.UpdateView(); 
        //   this.gridMenuEdit.setData(this.filterInput.project_Management_Tasks);
        //   this.UpdateView();
        // },
        // (err) => {
        //     if (err.status == 401) {
        //       this.Respond401();
        //     }
        // },
        // () => {
        //   this.UnBlockUI();
        // });
        break;
      }
      case EditPageState.delete:{

        break;
      }
      case EditPageState.save:{
        if(this.filterInput.tbName)
        {
          try{
            // this.InputModel.syS_Menu_Sub = this.gridMenuEdit.getAllData(this.tbName_sub);
            this.InputMaster = [];
            var Subs = this.gridMenuEdit.allData;
            if(Subs.length>0)
            {
              for(var i = 0 ; i < Subs.length ; i++)
              {
                var newrow = new  SYS_ActionsOnTable_ENTITY();
                for (const [key, value] of Object.entries(Subs[i])) {
                  newrow[key] = Subs[i][key];
                }
                newrow['datE_ADD'] = moment();
                newrow['datE_EDIT'] = moment();
                newrow['colAccountID'] = this.appSession.user.id;
                newrow['tbName'] = this.filterInput.tbName
                newrow = SYS_ActionsOnTable_ENTITY.fromJS(newrow);
                this.InputMaster.push(newrow);
              }
            }
          }catch{}
          var p = new ActionOnTableModel();
          p.tbName = this.filterInput.tbName;
          p.syS_ActionsOnTables = this.InputMaster;
          this.acctionService.acction_Update_v2(p).subscribe((respond)=>{
            if(respond['status'] == '0')
            {
              this.showMessageSuccess(respond['message']);
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
          this.showMessageError('Tên bảng chưa được chọn');
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
  setAcction(){
    if(this.toolbar)
      this.toolbar.setUiAction(this);
    else
      setTimeout(() => {
        this.setAcction();
      }, 50);
  }
  ngOnInit(): void {
    this.filterInput.namE_EN = '';
    this.filterInput.namE_VN = '';
    this.onLoadCombobox();
    this.setAcction();
  }
  public state: State = {
    skip: 0,
    take: 10
  };
  public addHandler(): void {
    this.closeEditor();

    this.formGroup = createFormGroup({
      Discontinued: false,
      ProductName: '',
      UnitPrice: 0,
      UnitsInStock: ''
    });
    this.isNew = true;

    this.grid.addRow(this.formGroup);
  }
  private closeEditor(): void {
    this.grid.closeRow(this.editedRowIndex);

    this.isNew = false;
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }
  public dataStateChange(state: DataStateChangeEvent, tbName: string): void {
    this.gridView = {
      data: this.InputMaster.slice(state.skip, state.skip + state.take),
      total: this.InputMaster.length
    };
    this.state.skip = state.skip;
    this.setDataGrid(this.gridView, this.tbName);
    this.UpdateView();
  }
  get genGridView(): GridDataResult {
    return this.getDataGrid(this.tbName);
  }
  LoadData() {
    this.BlockUI();
    this.acctionService.acction_Search(this.filterInput).subscribe(
      (data: any) => {
        if(data.length == 0)this.autorenew = true;
        else this.autorenew = false;
        var listAccTemp = [];
        data.forEach(element => {
          listAccTemp.push({
            code:element.id,
            name:element.namE_VN + '('+element.namE_EN+')'
          })
        });
        this.InputMaster = data;
        this.col_model_edit[5].editoptions.value=listAccTemp;
        this.gridMenuEdit.setData(data);
        this.UpdateView();
        this.UnBlockUI()
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
  }
  onLoadCombobox() {
    this.BlockUI();
    this.genRowTableService.sYS_GenRowTable_Opption_Search().subscribe(
      (data: any) => {
        if (data == null) return;
        data.forEach(e => {
          if(this.listTbName.length == 0 || this.listTbName.filter(f=>f['name'] == e['name']).length == 0){
            var t ={
              tbName:e['tablE_NAME'],
              name:e['name']
            }
            this.listTbName.push(t);
          }
        });
        this.SelectStatusTaskPicker.setList(this.listTbName);
        this.UpdateView()
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
    var p = new SYS_Account_Group();
    p.accounT_ID = this.appSession.user.id;
    p.type = 'ALL';
    this.accountService.sYS_Account_Group_Search(p).subscribe(
      (data: any) => {
        if (data == null) return;
        this.listAccountGroup = data;
        this.col_model_edit.forEach(ag=>{
          if(ag.name == 'permission'){
            ag.editoptions.value=this.listAccountGroup;
          }
        })
        this.UpdateView()
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
  }
  onChangeValueCombobox(item: any) {
    this.filterInput.tbName = item['tablE_NAME'];
  }
  onAutorenew(e: any) {
    var p = new SYS_ActionsOnTable_ENTITY();
    p.colAccountID = this.appSession.user.id;
    p.tbName = this.filterInput.tbName;
    this.acctionService.acction_Autorenew(p).subscribe(
      (data:any)=>{
        if(data['status'] == 0){
          this.showMessageSuccess(data['message']);
          this.LoadData();
        }else{
          this.showMessageWarning(data['message'])
        }
      }
    )
  }
}
