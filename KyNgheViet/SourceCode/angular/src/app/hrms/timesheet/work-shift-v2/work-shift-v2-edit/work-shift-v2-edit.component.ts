import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { HRM_TimeSheet_Work_Shift_Detail_ENTITY, HRM_TimeSheet_Work_Shift_ENTITY, TimeSheetService } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-work-shift-v2-edit',
  templateUrl: './work-shift-v2-edit.component.html',
  styleUrls: ['./work-shift-v2-edit.component.css']
})
export class WorkShiftV2EditComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    injector: Injector,
    private timeSheetService: TimeSheetService,
    private appSession: AppSession
  ) { 
    super(injector);
    this.editPageState = this.getRouteData('editPageState');
    this.tbName = this.getRouteData('tbName');
    this.InputMaster['sys_TableName'] = this.tbName;
    if(this.editPageState == EditPageState.add){
    }else if(this.editPageState == EditPageState.edit || this.editPageState == EditPageState.viewDetail){
      this.InputMaster.code = this.getRouteParamObj('code');
      this.InputMaster.type = 'ALL';
      this.onLoadData();
    }
  }
  
  @ViewChild('dialogDelete') dialogDelete: DialogAcctionComponent;
  tbName:string = 'CAT_Foreign_Currency';
  InputMaster:HRM_TimeSheet_Work_Shift_ENTITY=new HRM_TimeSheet_Work_Shift_ENTITY();
  editPageState:string = EditPageState.edit;
  rowGridSelected:any = null;

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
    throw new Error('Method not implemented.');
  }
  getDataByID(storedName: string, param: string, keyService: string): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
  }
  onClickAcctionResponse(e:any): void {
    switch(e.classForm){
      case EditPageState.add:{
      
        break;
      }
      case EditPageState.edit:{
        this.navigatePassParam('timesheet/work-shift-edit',[['code',this.InputMaster.code]],new HRM_TimeSheet_Work_Shift_ENTITY(),this.tbName);
        break;
      }
      case EditPageState.save:{
        if(!this.InputMaster.name){
          this.showMessageWarning('"Tên ca trực" không được để trống');return;
        }
        if(!this.InputMaster.start_time){
          this.showMessageWarning('"Giờ vào ca" không được để trống');return;
        }
        if(!this.InputMaster.end_time){
          this.showMessageWarning('"Giờ ra ca" không được để trống');return;
        }
        this.BlockUI();
        try{
          if(this.InputMaster.hRM_TimeSheet_Work_Shift_Details){
            const detais: HRM_TimeSheet_Work_Shift_Detail_ENTITY[] = this.InputMaster.hRM_TimeSheet_Work_Shift_Details.map((obj: any) => {
              let item = new HRM_TimeSheet_Work_Shift_Detail_ENTITY();
              for (const [key, value] of Object.entries(obj)) {
                item[key] = value;
              }
              return item;
            });
            this.InputMaster.hRM_TimeSheet_Work_Shift_Details = detais;
          }
        }catch{}
        if(!this.InputMaster.code){
          this.InputMaster.type = 'INSERT';
          if(!this.InputMaster.allDay)this.InputMaster.allDay=[]; 
          try{
            this.InputMaster.total_time = Number(this.InputMaster.total_time);
          }catch{}
          this.timeSheetService.hRM_TimeSheet_Work_Shift_Actions(this.InputMaster).subscribe((respond)=>{
            if(respond['status'] == '0')
            {
              this.InputMaster.code = respond['ref_code'];
              this.showMessage(respond.message,respond.status);
              this.navigatePassParam('timesheet/work-shift-view-detail',[['code',respond.ref_code]],new HRM_TimeSheet_Work_Shift_ENTITY(),this.tbName);
            }else
            this.showMessage(respond.message,respond.status);
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
          this.InputMaster.type = 'UPDATE';
          if(!this.InputMaster.allDay)this.InputMaster.allDay=[]; 
          try{
            this.InputMaster.total_time = Number(this.InputMaster.total_time);
          }catch{}
          this.timeSheetService.hRM_TimeSheet_Work_Shift_Actions(this.InputMaster).subscribe((respond)=>{
            if(respond['status'] == '0')
            {
              this.showMessage(respond.message,respond.status);
              this.navigatePassParam('timesheet/work-shift-view-detail',[['code',respond.ref_code]],new HRM_TimeSheet_Work_Shift_ENTITY(),this.tbName);
            }else
            this.showMessage(respond.message,respond.status);
            
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
        // if(!this.InputMaster.code){
        //   this.InputMaster.type = 'INSERT'
        //   this.timeSheetService.cAT_Foreign_Currency_Action_By_Type(new HRM_TimeSheet_Work_Shift_ENTITY(
        //     {...this.InputMaster}) as HRM_TimeSheet_Work_Shift_ENTITY).subscribe(res=>{
        //     this.showMessage(res.message,res.status);
        //     //this.InputMaster.code = res.ref_code;
        //     if(res.status == 0)
        //     this.navigatePassParam('timesheet/work-shift-view-detail',[['code',res.ref_code]],new HRM_TimeSheet_Work_Shift_ENTITY(),this.tbName);
        //   })
        // }else{
        //   this.InputMaster.type = 'UPDATE'
        //   this.timeSheetService.cAT_Foreign_Currency_Action_By_Type(new HRM_TimeSheet_Work_Shift_ENTITY(
        //     {...this.InputMaster}) as HRM_TimeSheet_Work_Shift_ENTITY).subscribe(res=>{
        //     this.showMessage(res.message,res.status)
        //     if(res.status == 0)
        //     this.navigatePassParam('timesheet/work-shift-view-detail',[['code',res.ref_code]],new HRM_TimeSheet_Work_Shift_ENTITY(),this.tbName);
        //   })
        // }
        break;
      }
      case EditPageState.search:{
        break;
      }
      case EditPageState.viewDetail:{
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
  onDatasourceGridOutput(event: any){
    //this.InputMaster[event.dataField]= event.value;
  }
  handleValueChanged(event: any) {
    this.InputMaster[event.dataField]= event.value;
    this.UpdateView();
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
          this.navigatePassParam('timesheet/work-shift',[['code',this.idSelect]],new HRM_TimeSheet_Work_Shift_ENTITY(),this.tbName);
        }        
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      })

  }
  HandleRowsDataGridOutput(event: any) {
    this.UpdateEditV2();
  }
  onSelectedRowsDataOutput(event: any) {
    this.rowGridSelected = event;
  }
  onLoadData(){
    this.timeSheetService.hRM_TimeSheet_Work_Shift_Search(new HRM_TimeSheet_Work_Shift_ENTITY({
      ...this.InputMaster
    }) as HRM_TimeSheet_Work_Shift_ENTITY).subscribe((resonse:HRM_TimeSheet_Work_Shift_ENTITY[])=>{
      if(resonse[0])this.InputMaster = resonse[0]
      else this.InputMaster = new HRM_TimeSheet_Work_Shift_ENTITY();
    })
  }

}
