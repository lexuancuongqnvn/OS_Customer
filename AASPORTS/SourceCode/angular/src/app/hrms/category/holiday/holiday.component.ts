import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import moment from 'moment';
import { JqgridEditComponent } from 'src/app/shared/jqgrid/jqgrid-edit/jqgrid-edit.component';
import { JqgridListComponent } from 'src/app/shared/jqgrid/jqgrid-list/jqgrid-list.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { HRM_Holiday_ENTITY, TimeSheetService } from 'src/app/shared/service-proxies/api-shared';
import { AlertMessageComponent } from 'src/app/shared/sidenav/alert-message/alert-message.component';
import { SidenavAddEditComponent } from 'src/app/shared/sidenav/sidenav-add-edit/sidenav-add-edit.component';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.css']
})
export class HolidayComponent  extends LayoutComponentBase implements OnInit, IUiAction<any> {

  isEdit:boolean = false;
  tbName: string = 'HRM_Holiday';
  filterInput:HRM_Holiday_ENTITY = new HRM_Holiday_ENTITY();
  InputModel:HRM_Holiday_ENTITY = new HRM_Holiday_ENTITY();
  CurrenFrom:string = EditPageState.view;
  listDepartment:HRM_Holiday_ENTITY[] = [];
  @ViewChild('dialogDelete') dialogDelete: DialogAcctionComponent;
  @ViewChild('dialogEdit') dialogEdit: DialogAcctionComponent;
  @ViewChild('dialogAdd') dialogAdd: DialogAcctionComponent;
  @ViewChild('gridList') gridList: JqgridListComponent;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  @ViewChild('alertMessage') alertMessage: AlertMessageComponent;
  @ViewChild('sidenavAddEdit') sidenavAddEdit: SidenavAddEditComponent;
  @ViewChild('toolbarEdit') toolbarEdit: ToolbarComponent;
  constructor(
    private injector: Injector,
    private timeSheetService: TimeSheetService,
  ) {
    super(injector);
  }
  col_model:any[] = [
    { label: 'Mã', name: 'code', key: true, width: 10 , hidden: true},
    { label: 'Tên', name: 'name', width: 25 },
    { label: 'Nghỉ từ ngày', name: 'start_date_f', width: 10 },
    { label: 'Nghỉ đến ngày', name: 'end_date_f', width: 10 },
    // { label: 'Tính theo lịch', name: 'lunar_name', width: 10 },
    { label: 'Tổng ngày nghỉ', name: 'total_day', width: 10 }
  ]
  valueStartDate(e:any,col:string){
    this.InputModel[col] = e;
  }
  onSelectFilter(e:any,col:string){
    if(e.year())
      this.filterInput[col] = e.year();
    else this.filterInput[col] = undefined;
  }
  confirmDelete() {
    var p = new HRM_Holiday_ENTITY();
    p.code = this.idSelect;
    p.type = 'DELETE';
    this.timeSheetService.hRM_Holiday_Actions(p).subscribe(
      (respond: any) => {
        if(respond['status'] == '0'){
          this.showMessageSuccess(respond['message'])
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
  onSelect(v:any,col:string){
    this.InputModel[col] = v;
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
    switch(classForm){
      case EditPageState.add:{
        this.isEdit = true;
        this.InputModel =  new HRM_Holiday_ENTITY();
        setTimeout(() => {
          this.sidenavAddEdit.title = 'Thêm mới ngày lễ';
          this.sidenavAddEdit.open();
          this.toolbarEdit.setUiAction(this);
        }, 100);
        break;
      }
      case EditPageState.edit:{
        this.isEdit = true;
        var p1 = new HRM_Holiday_ENTITY();
        p1.code = this.idSelect;
        this.timeSheetService.hRM_Holiday_Search(p1).subscribe(
          (data: any) => {
            this.InputModel = data[0];
            this.sidenavAddEdit.title = 'Chỉnh sửa ngày lễ';
            this.toolbarEdit.setUiAction(this);
            this.sidenavAddEdit.open();
            this.UpdateView();
          },
          (err) => this.UnBlockUI(),
          () => {
            this.UnBlockUI();
          }
        )
       
        break;
      }
      case EditPageState.delete:{
        this.dialogDelete.open();
        break;
      }
      case EditPageState.save:{
        // this.InputModel.start_date = moment();
        // this.InputModel.end_date = moment();
        // this.InputModel.start_date.set('date',this.InputModel.start_day);
        // this.InputModel.start_date.set('month',this.InputModel.start_month-1);
        // this.InputModel.end_date.set('date',this.InputModel.end_day);
        // this.InputModel.end_date.set('month',this.InputModel.end_month-1);
        if(!this.InputModel.code){
          this.InputModel.type = 'INSERT'; 
          this.timeSheetService.hRM_Holiday_Actions(this.InputModel).subscribe(
            (respond: any) => {
              if(respond['status'] == '0'){
                this.showMessageSuccess(respond['message'])
                this.sidenavAddEdit.close();
                this.InputModel.code = respond['ref_code'];
                this.onSearch();
              }else
              {
                this.alertMessage.AlertError(respond['message'])
              }        
            },
            (err) => this.UnBlockUI(),
            () => {
              this.UnBlockUI();
            })
          this.UpdateView();
        }else{
          this.InputModel.type = 'UPDATE';
          this.timeSheetService.hRM_Holiday_Actions(this.InputModel).subscribe(
            (respond: any) => {
              if(respond['status'] == '0'){
                this.showMessageSuccess(respond['message']);
                this.sidenavAddEdit.close();
                this.UpdateView();
              }else
              {
                this.alertMessage.AlertError(respond['message'])
              }        
            },
            (err) => this.UnBlockUI(),
            () => {
              this.UnBlockUI();
            })
          this.UpdateView();
        }
        break;
      }
      case EditPageState.search:{
        this.LoadData();
        break;
      }
      case EditPageState.viewDetail:{
        this.isEdit = true;
        var p1 = new HRM_Holiday_ENTITY();
        p1.code = this.idSelect;
        this.timeSheetService.hRM_Holiday_Search(p1).subscribe(
          (data: any) => {
            this.InputModel = data[0];
            this.sidenavAddEdit.title = 'Chi tiết ngày lễ';
            this.sidenavAddEdit.open();
            this.toolbarEdit.setUiAction(this);
            this.UpdateView();
          },
          (err) => this.UnBlockUI(),
          () => {
            this.UnBlockUI();
          }
        )
        break;
      }
      default:break;
    }
  }
  getDataByID(storedName: string, param: string, keyService: string): void {
    throw new Error('Method not implemented.');
  }
  LoadData(){
    this.BlockUI();
    this.timeSheetService.hRM_Holiday_Search(this.filterInput).subscribe(
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
  setAcction(){
    if(this.toolbar)
      this.toolbar.setUiAction(this);
    else
      setTimeout(() => {
        this.setAcction();
      }, 50);
  }
  onChangeValue(v:any,col:string){
    this.InputModel[col] = v;
  }
  ngOnInit(): void {
    this.setAcction();
    this.LoadData();
  }

}
