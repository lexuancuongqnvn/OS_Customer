import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DataStateChangeEvent, GridComponent, GridDataResult } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { JqgridListComponent } from 'src/app/shared/jqgrid/jqgrid-list/jqgrid-list.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { AcctionService, GenRowTableService, HRM_Workspace_Master_ENTITY, WorkspaceService } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-workflow-management-list',
  templateUrl: './workflow-management-list.component.html',
  styleUrls: ['./workflow-management-list.component.css']
})
export class WorkflowManagementListComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    private injector: Injector,
    private acctionService: AcctionService,
    private appSession: AppSession,
    private workspaceService:WorkspaceService
  ) {
    super(injector);
  }
  
  editedRowIndex!: number | undefined;
  isNew: boolean;
  grid: GridComponent;
  formGroup!: FormGroup | undefined;
  public view: Observable<GridDataResult>;
  public gridView: GridDataResult;
  public state: State = {
    skip: 0,
    take: 10
  };
  @ViewChild('gridWorkSpace') gridWorkSpace: JqgridListComponent;
  @ViewChild('dialogDelete') dialogDelete: DialogAcctionComponent;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  
  tbName: string = 'HRM_Workspace_Master';
  filterInput:HRM_Workspace_Master_ENTITY = new HRM_Workspace_Master_ENTITY();
  CurrenFrom:string = EditPageState.view;

  InputMaster: HRM_Workspace_Master_ENTITY[] = [];
  dataGrid: any[] = [];

  col_model:any[] = [
      { label: 'Mã', name: 'code', key: true, width: 10 , hidden: true},
      { label: 'Tên', name: 'name', width: 15 },
      { label: 'Nhân viên check in', name: 'check_in', width: 15 },
      { label: 'Nhân viên check out', name: 'check_out', width: 25 },
      { label: 'Số đơn xin off', name: 'day_off', width: 12 } 
    ]
    
  private closeEditor(): void {
    this.grid.closeRow(this.editedRowIndex);

    this.isNew = false;
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }
  
  get genGridView(): GridDataResult {
    return this.getDataGrid(this.tbName);
  }
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
  LoadData() {
    this.BlockUI();
    this.acctionService.acction_Search(this.filterInput).subscribe(
      (data: any) => {
        this.dataGrid = data;
        this.InputMaster = this.dataGrid;
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
  public dataStateChange(state: DataStateChangeEvent, tbName: string): void {
    this.gridView = {
      data: this.InputMaster.slice(state.skip, state.skip + state.take),
      total: this.InputMaster.length
    };
    this.state.skip = state.skip;
    this.setDataGrid(this.gridView, this.tbName);
    this.UpdateView();
  }
  confirmDelete() {
    this.BlockUI();
    let listID: string[] = this.gridWorkSpace.getSelectedRows(this.tbName);
    this.workspaceService.hRM_Workspace_Delete(listID.join(';')).subscribe(
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
  
  onAdd(): void {
    throw new Error('Method not implemented.');
  }
  onUpdate(item: any): void {
    throw new Error('Method not implemented.');
  }
  onDelete(): void {
    this.dialogDelete.open();
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
    this.workspaceService.hRM_Workspace_Master_Search(this.filterInput).subscribe((respond)=>{
      this.dataGrid = respond;
      this.gridWorkSpace.setData(this.dataGrid,this.col_model,this.tbName)
      this.gridView = {
        data: this.dataGrid.slice(this.state.skip, this.state.skip + this.state.take),
        total: this.dataGrid.length
      };
      this.setDataGrid(this.gridView, this.tbName);
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
  onResetSearch(): void {
    throw new Error('Method not implemented.');
  }
  onClickAcction(id: number, storedName: string, param: string, keyService: string, classForm: string): void {
    switch(classForm){
      case'Add':{
        this.navigateByUrl('/workflow-management-add');
        break;
      }
      case'Edit':{
        this.navigatePassParam('/workflow-management-edit', { code: this.idSelect }, { filterInput: JSON.stringify(this.InputMaster) });
        break;
      }
      case'Delete':{
        this.dialogDelete.open();
        break;
      }
      case'Save':{

        break;
      }
      case'Search':{
        this.onSearch();
        break;
      }
      case'ViewDetail':{

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
  setAcction(){
    if(this.toolbar)
      this.toolbar.setUiAction(this);
    else
      setTimeout(() => {
        this.setAcction();
      }, 50);
  }

 
}
function createFormGroup(arg0: { Discontinued: boolean; ProductName: string; UnitPrice: number; UnitsInStock: string; }): FormGroup {
  throw new Error('Function not implemented.');
}

