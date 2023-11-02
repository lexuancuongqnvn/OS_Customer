import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataStateChangeEvent, GridComponent, GridDataResult } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';

import { AcctionService, GenRowTableService, REFERENCE_ENTITY, SYS_GenRowTable, SYS_GenRowTable_Detail } from 'src/app/shared/service-proxies/api-shared';
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
  selector: 'app-genrow-table-detail',
  templateUrl: './genrow-table-detail.component.html',
  styleUrls: ['./genrow-table-detail.component.css']
})
export class GenrowTableDetailComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    private injector: Injector,
    private appSession: AppSession,
    private genRowTableService: GenRowTableService
  ) {
    super(injector);
    this.codeEdit = this.getRouteParam('code');
    this.tbName = this.getRouteParam('tableName');

  }
  onSearch(): void {
    throw new Error('Method not implemented.');
  }
  @ViewChild('dialogDelete') dialogDelete: DialogAcctionComponent;
  @ViewChild(GridComponent)

  grid: GridComponent;
  formGroup!: FormGroup | undefined;
  public view: Observable<GridDataResult>;
  public gridView: GridDataResult;

  CurrenFrom: string = EditPageState.edit;
  editedRowIndex!: number | undefined;
  isNew: boolean;
  codeEdit: string = '';
  enableEdit: boolean = true;
  tbName: string = '';
  idSelect: string = '';
  InputMaster: SYS_GenRowTable = new SYS_GenRowTable();
  dataGrid: any[] = [];
  filterInput: SYS_GenRowTable = new SYS_GenRowTable();
  public listItemsCombobox: Array<{ tablE_NAME: string, name: string }> = [];
  selectRow(event: any) {
    this.idSelect = event.dataItem.code;
    this.setIdSelected(this.idSelect);
    this.enableEdit = false;
    this.UpdateView();
  }
  onAdd(): void {
    throw new Error('Method not implemented.');
  }
  onUpdate(item: any): void {
    throw new Error('Method not implemented.');
  }
  onEdit(): void {
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
    this.genRowTableService.sYS_GenRowTable_Delete_ListID(listID).subscribe(
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
    this.InputMaster.syS_GenRowTable_Detail.forEach(element => {
      element['indexRow'] = i; i++;
    });
  }
  public addNewRow(tbName: string): void {
    var newRow = new SYS_GenRowTable_Detail();
    newRow['id'] = this.getRandomID(tbName);
    if (!this.InputMaster)
      newRow['indexRow'] = 1;
    else
      newRow['indexRow'] = this.InputMaster.syS_GenRowTable_Detail.length + 1;
    newRow['colAccountID'] = this.appSession.user.id;
    newRow['active'] = true;//
    newRow['alloW_EDIT'] = true;//
    newRow['namE_VN'] = '';//
    newRow['namE_EN'] = '';//
    newRow['tablE_NAME'] = this.tbName;//
    newRow['columN_NAME'] = '';//
    newRow['father'] = this.InputMaster.code;//
    newRow['displaY_STATUS'] = 1;//
    newRow['width'] = 250;
    newRow['possion'] = this.InputMaster.syS_GenRowTable_Detail.length + 1;
    newRow['typE_ID'] = null;
    newRow['alloW_SEARCH'] = false;
    newRow['clasS_INSERT'] = '';
    newRow['reference'] = '';
    newRow['min'] = null;
    newRow['max'] = null;
    newRow['shoW_REFERENCE'] = false;
    newRow['displaY_LIST'] = false;
    newRow['displaY_EDIT'] = false;
    newRow['disablE_EDIT'] = false;
    newRow['storeD_PROCEDURES'] = '';
    this.InputMaster.syS_GenRowTable_Detail.push(newRow);
    this.gridView = {
      data: this.InputMaster.syS_GenRowTable_Detail.slice(this.state.skip, this.state.skip + this.state.take),
      total: this.InputMaster.syS_GenRowTable_Detail.length
    };
    this.setDataGrid(this.gridView, this.tbName);
    this.UpdateView();
  }
  getRandomID(tbName: string): number {
    var min = Math.ceil(-999999999);
    var max = Math.floor(-1);
    var id = Math.floor(Math.random() * (max - min + 1)) + min;
    if (this.InputMaster.syS_GenRowTable_Detail)
      if (this.InputMaster.syS_GenRowTable_Detail.filter(e => e['id'] == id).length > 0) this.getRandomID(tbName);
    return id;
  }
  public ClearSelected(tbName: string): void {
    var arr = document.getElementsByClassName(tbName);
    let t = [];
    for (var i = 0; i < arr.length; i++)
      if (arr[i].children[0]['checked'] == true)
        t.push({ id: this.InputMaster.syS_GenRowTable_Detail[i]['id'] });
    t.forEach(e => {
      this.InputMaster.syS_GenRowTable_Detail = this.InputMaster.syS_GenRowTable_Detail.filter(_e => _e['id'] != e['id']);
    })
    this.refreshIndex(tbName);
    this.gridView = {
      data: this.InputMaster.syS_GenRowTable_Detail.slice(this.state.skip, this.state.skip + this.state.take),
      total: this.InputMaster.syS_GenRowTable_Detail.length
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
    this.genRowTableService.sYS_GenRowTable_Update_Detail(this.InputMaster).subscribe(
      (data: any) => {
        this.showSuccess()
        location.reload();
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      })
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

  ngOnInit(): void {
    this.filterInput.namE_EN = '';
    this.filterInput.namE_VN = '';
    this.filterInput.userID = this.appSession.user.id;
    this.filterInput.father = this.codeEdit;
    this.filterInput.tablE_NAME = this.tbName;
    this.LoadData();
  }
  public state: State = {
    skip: 0,
    take: 100
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
      data: this.InputMaster.syS_GenRowTable_Detail.slice(state.skip, state.skip + state.take),
      total: this.InputMaster.syS_GenRowTable_Detail.length
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
    this.genRowTableService.sYS_GenRowTable_Root_Search(this.filterInput).subscribe(
      (data: any) => {
        this.dataGrid = data[0]['syS_GenRowTable_Detail'];
        this.InputMaster = data[0];
        this.gridView = {
          data: this.dataGrid.slice(this.state.skip, this.state.skip + this.state.take),
          total: this.dataGrid.length
        };
        this.setDataGrid(this.gridView, this.tbName);
        this.UpdateView();
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
        this.listItemsCombobox = data;
        this.UpdateView()
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
  }
  onChangeValueCombobox(item: any) {
    this.filterInput.tablE_NAME = item['tablE_NAME'];
  }
}