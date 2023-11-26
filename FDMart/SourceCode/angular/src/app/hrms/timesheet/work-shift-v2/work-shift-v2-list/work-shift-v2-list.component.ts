import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { DXDataGridViewComponent } from 'src/app/shared/dx-data-grid/dx-data-grid-view/dx-data-grid-view.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { HRM_TimeSheet_Work_Shift_ENTITY, TimeSheetService } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-work-shift-v2-list',
  templateUrl: './work-shift-v2-list.component.html',
  styleUrls: ['./work-shift-v2-list.component.css']
})
export class WorkShiftV2ListComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    injector: Injector,
    private timeSheetService:TimeSheetService,
    private appSession: AppSession,
  ) { 
    super(injector);
    this.tbName = this.getRouteData('tbName');
    this.filterInput.type = 'ALL';
  }
  @ViewChild('dialogDelete') dialogDelete: DialogAcctionComponent;
  @ViewChild('DataGridGenRowTable') DataGridGenRowTable: DXDataGridViewComponent;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  filterInput:HRM_TimeSheet_Work_Shift_ENTITY=new HRM_TimeSheet_Work_Shift_ENTITY();
  listGenRowTable:HRM_TimeSheet_Work_Shift_ENTITY[]=[];
  tbName:string = '';
  CurrenFrom:string = EditPageState.view;


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
        this.navigatePassParam('timesheet/work-shift-add',[[param,this.idSelect]],new HRM_TimeSheet_Work_Shift_ENTITY(),this.tbName)
        break;
      }
      case EditPageState.edit:{
        this.navigatePassParam('timesheet/work-shift-edit',[['code',this.idSelect]],new HRM_TimeSheet_Work_Shift_ENTITY(),this.tbName)
        break;
      }
      case EditPageState.save:{
        
        break;
      }
      case EditPageState.search:{
        this.onLoadData();
        break;
      }
      case EditPageState.viewDetail:{
        this.navigatePassParam('timesheet/work-shift-view-detail',[['code',this.idSelect]],new HRM_TimeSheet_Work_Shift_ENTITY(),this.tbName);

        break;
      }
      case EditPageState.delete:{
        this.dialogDelete.open();
        break;
      }
      case 'close_book':{
        
      break;
    }
    case 'open_book':{
     
      break;
    }
      default:break;
    }
  }
  getDataByID(storedName: string, param: string, keyService: string): void {
    throw new Error('Method not implemented.');
  }ngOnInit(): void {
    this.setAcction();
    this.onLoadData();
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
  confirmDelete(){
    this.BlockUI();
    var p = new HRM_TimeSheet_Work_Shift_ENTITY();
    p.code = this.idSelect;
    p.type = 'DELETE';

    this.timeSheetService.hRM_TimeSheet_Work_Shift_Actions(p).subscribe(
      (respond: any) => {
        if(respond['status'] == '0'){
          this.showMessage(respond.message,respond.status);
          this.onLoadData()
        }else
        {
          this.showMessageError(respond['message'])
        }        
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      })
  }
  onLoadData(){
    this.timeSheetService.hRM_TimeSheet_Work_Shift_Search({
      ...this.filterInput
    } as HRM_TimeSheet_Work_Shift_ENTITY).subscribe((res:HRM_TimeSheet_Work_Shift_ENTITY[])=>{
      this.listGenRowTable = res;
      this.DataGridGenRowTable.setDataSource(res);
      this.UpdateView();
    })
  }
}
