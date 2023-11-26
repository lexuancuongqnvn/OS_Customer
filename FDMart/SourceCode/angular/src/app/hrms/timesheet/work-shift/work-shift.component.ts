import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import moment from 'moment';
import { start } from 'repl';
import { JqgridEditComponent } from 'src/app/shared/jqgrid/jqgrid-edit/jqgrid-edit.component';
import { JqgridListComponent } from 'src/app/shared/jqgrid/jqgrid-list/jqgrid-list.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { HRM_TimeSheet_Work_Shift_ENTITY, TimeSheetService } from 'src/app/shared/service-proxies/api-shared';
import { AlertMessageComponent } from 'src/app/shared/sidenav/alert-message/alert-message.component';
import { SidenavAddEditComponent } from 'src/app/shared/sidenav/sidenav-add-edit/sidenav-add-edit.component';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-work-shift',
  templateUrl: './work-shift.component.html',
  styleUrls: ['./work-shift.component.css']
})
export class WorkShiftComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    private injector: Injector,
    private timeSheetService:TimeSheetService
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

  getDataByID(storedName: string, param: string, keyService: string): void {
    throw new Error('Method not implemented.');
  }
  isEdit:boolean = false;
  @ViewChild('gridList') gridList: JqgridListComponent;
  @ViewChild('gridMenuEdit') gridMenuEdit: JqgridEditComponent<HRM_TimeSheet_Work_Shift_ENTITY>;
  @ViewChild('dialogDelete') dialogDelete: DialogAcctionComponent;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  @ViewChild('toolbarEdit') toolbarEdit: ToolbarComponent;
  @ViewChild('sidenavAddEdit') sidenavAddEdit: SidenavAddEditComponent;
  @ViewChild('alertMessage') alertMessage: AlertMessageComponent;
  
  tbName: string = 'HRM_TimeSheet_Work_Shift';
  
  filterInput:HRM_TimeSheet_Work_Shift_ENTITY = new HRM_TimeSheet_Work_Shift_ENTITY();
  InputModel:HRM_TimeSheet_Work_Shift_ENTITY = new HRM_TimeSheet_Work_Shift_ENTITY();
  CurrenFrom:string = EditPageState.view;
  
  col_model:any[] = [
    { label: 'Mã', name: 'code', key: true, width: 10 , hidden: true},
    { label: 'Tên ca trực', name: 'name', width: 25 },
    // { label: 'Giờ vào ca', name: 'start_time_f', width: 10 },
    // { label: 'Giờ ra ca', name: 'end_time_f', width: 10 },
    // { label: 'Tổng giờ (Tiếng)', name: 'total_time', width: 10 }
  ]

  ngOnInit(): void {
    this.setAcction();
    this.filterInput.type = 'ALL';
    this.LoadData();
  }
  onClickAcction(id: number, storedName: string, param: string, keyService: string, classForm: string): void {
    switch(classForm){
      case EditPageState.add:{
        this.isEdit = true;
        this.InputModel = new HRM_TimeSheet_Work_Shift_ENTITY();
        this.InputModel.type = 'INSERT';
        setTimeout(() => {
          this.sidenavAddEdit.title = "Thêm mới ca trực";
          this.sidenavAddEdit.open();
          this.toolbarEdit.setUiAction(this);
          this.UpdateView();
        }, 100);
        break;
      }
      case EditPageState.edit:{
        this.BlockUI();
        this.isEdit = true;
        this.InputModel = new HRM_TimeSheet_Work_Shift_ENTITY();
        this.InputModel.type = 'UPDATE';
        this.InputModel.type = 'BYCODE';
        this.InputModel.code = this.idSelect;
        this.timeSheetService.hRM_TimeSheet_Work_Shift_Search(this.InputModel).subscribe((respond)=>{
          this.InputModel = respond[0];
          this.sidenavAddEdit.open();
          this.toolbarEdit.setUiAction(this);
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
        // this.navigatePassParam('/menu-edit', { code: this.idSelect }, { filterInput: JSON.stringify(this.filterInput) });
        break;
      }
      case EditPageState.delete:{
        this.dialogDelete.open();
        break;
      }
      case EditPageState.save:{
        if(!this.InputModel.name){
          this.alertMessage.AlertError('"Tên ca trực" không được để trống');return;
        }
        if(!this.InputModel.start_time){
          this.alertMessage.AlertError('"Giờ vào ca" không được để trống');return;
        }
        if(!this.InputModel.end_time){
          this.alertMessage.AlertError('"Giờ ra ca" không được để trống');return;
        }
        this.BlockUI();
        try{
          var Subs = this.InputModel.hRM_TimeSheet_Work_Shift_Details;
          this.InputModel.hRM_TimeSheet_Work_Shift_Details = [];
          if(Subs.length>0)
          {
            for(var i = 0 ; i < Subs.length ; i++)
            {
              var newrow = new  HRM_TimeSheet_Work_Shift_ENTITY();
              for (const [key, value] of Object.entries(Subs[i])) {
                newrow[key] = Subs[i][key];
              }
              this.InputModel.hRM_TimeSheet_Work_Shift_Details.push(newrow);
            }
          }
        }catch{}
        if(!this.InputModel.code){
          this.InputModel.type = 'INSERT';
          if(!this.InputModel.allDay)this.InputModel.allDay=[]; 
          try{
            this.InputModel.total_time = Number(this.InputModel.total_time);
          }catch{}
          this.timeSheetService.hRM_TimeSheet_Work_Shift_Actions(this.InputModel).subscribe((respond)=>{
            if(respond['status'] == '0')
            {
              this.InputModel.code = respond['ref_code'];
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
          if(!this.InputModel.allDay)this.InputModel.allDay=[]; 
          try{
            this.InputModel.total_time = Number(this.InputModel.total_time);
          }catch{}
          this.timeSheetService.hRM_TimeSheet_Work_Shift_Actions(this.InputModel).subscribe((respond)=>{
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
        this.filterInput.type = 'ALL';
        this.LoadData();
        break;
      }
      case EditPageState.viewDetail:{
        this.BlockUI();
        this.isEdit = true;
        this.InputModel = new HRM_TimeSheet_Work_Shift_ENTITY();
        this.filterInput.type = 'BYCODE';
        this.InputModel.code = this.idSelect;
        this.timeSheetService.hRM_TimeSheet_Work_Shift_Search(this.filterInput).subscribe((respond)=>{
          this.InputModel = respond[0];
          this.sidenavAddEdit.open();
          this.toolbarEdit.setUiAction(this);
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
  confirmDelete() {
    this.BlockUI();
    var p = new HRM_TimeSheet_Work_Shift_ENTITY();
    p.code = this.idSelect;
    p.type = 'DELETE';
    if(!this.InputModel.allDay)this.InputModel.allDay=[]; 
          try{
            this.InputModel.total_time = Number(this.InputModel.total_time);
          }catch{}
    this.timeSheetService.hRM_TimeSheet_Work_Shift_Actions(p).subscribe(
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
  LoadData() {
    this.BlockUI();
    this.timeSheetService.hRM_TimeSheet_Work_Shift_Search(this.filterInput).subscribe(
      (data: any) => {
        // data.forEach(e=>{
        //   e.total_time = this.diffHour(e.end_time,e.start_time);
        // })
        this.gridList.setData(data,this.col_model,this.tbName);
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
  valueStartDate(e:any,col:string){
    this.InputModel[col] = e;
    try{
      this.InputModel.total_time = this.diffHour(this.InputModel.end_time,this.InputModel.start_time).toFixed(2);
    }catch{}
    this.UpdateView();
  }
  onChangRelax(){
    try{
      this.InputModel.total_time = this.diffHour(this.InputModel.end_time,this.InputModel.start_time).toFixed(2);
    }catch{}
    this.UpdateView();
  }
  allDay:any[] = [];
  public valueDate(col:string,day:string):any{
    var d = this.InputModel.hRM_TimeSheet_Work_Shift_Details.find(e=>e.name == day)
    d = d?d[col]:null
    return d?d:null;
  }
  onChangeDateValue(v:moment.Moment,col:string,day:string){
    this.InputModel.hRM_TimeSheet_Work_Shift_Details.find(e=>e.name == day)[col] = v;
  } 
  onChangeValue(v:boolean,col:string){
    this.InputModel[col] = v;
    if(!this.InputModel.hRM_TimeSheet_Work_Shift_Details) this.InputModel.hRM_TimeSheet_Work_Shift_Details = [];
    if(v && this.InputModel.hRM_TimeSheet_Work_Shift_Details.filter(e=>e.name == col).length == 0){
      this.InputModel.hRM_TimeSheet_Work_Shift_Details.push({...new HRM_TimeSheet_Work_Shift_ENTITY,
        name:col
        }as HRM_TimeSheet_Work_Shift_ENTITY)
    }
    this.UpdateView();
  }
  diffHour(end_time:any,start_time):any{
    let end = end_time.hour()*60+end_time.minute();
    if(end == 0) end=24*60
    let start = start_time.hour()*60+start_time.minute();
    return Math.abs((end-start)/60 - this.InputModel.relax);
  }
}
