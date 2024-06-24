import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import moment from 'moment';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { DXDataGridViewComponent } from 'src/app/shared/dx-data-grid/dx-data-grid-view/dx-data-grid-view.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { Carry_Forward_Execute_ENTITY, ConsolidationVoucherService } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-carry-forward-execute',
  templateUrl: './carry-forward-execute.component.html',
  styleUrls: ['./carry-forward-execute.component.css']
})
export class CarryForwardExecuteComponent  extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    injector: Injector,
    private consolidationVoucherService: ConsolidationVoucherService,
    private appSession: AppSession,
  ) { 
    super(injector);
    this.tbName = this.getRouteData('tbName');
    this.filterInput.voucher_code = this.getRouteData('voucher_code');
  }

  @ViewChild('DataGridGenRowTable') DataGridGenRowTable: DXDataGridViewComponent;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  @ViewChild('dialogDelete') dialogDelete: DialogAcctionComponent;
  filterInput:Carry_Forward_Execute_ENTITY=new Carry_Forward_Execute_ENTITY();
  rowSelected:Carry_Forward_Execute_ENTITY=new Carry_Forward_Execute_ENTITY();
  listData:Carry_Forward_Execute_ENTITY[]=[];
  tbName:string = 'Carry_Forward_Execute';
  CurrenFrom:string = EditPageState.view;

  onAdd(): void {
    throw new Error('Method not implemented.');
  }
  onUpdate(item: any): void {
    throw new Error('Method not implemented.');
  }
  onDelete(item: any): void {
    if(!this.filterInput.month_start){
      this.showMessageError('Vui lòng chọn tháng bắt đầu');
      return;
    }
    if(!this.filterInput.month_end){
      this.showMessageError('Vui lòng chọn tháng kết thúc');
      return;
    }
    if(this.filterInput.month_start > this.filterInput.month_end){
      this.showMessageError('Tháng bắt đầu không lớn hơn tháng kết thúc');
      return;
    }
    this.BlockUI()
    this.consolidationVoucherService.carry_Forward_Delete_Executed({
      ...this.filterInput
    } as Carry_Forward_Execute_ENTITY).subscribe((res:any)=>{
      if(res['status'] == 0){
         this.showMessageSuccess(res['message'])
         this.listData = [];
         this.DataGridGenRowTable.setDataSource(this.listData);
         this.UpdateView();
         this.UnBlockUI()
      }
      else this.showMessageError(res['message'])
    })
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
        this.onLoadData();
        break;
      }
      case EditPageState.edit:{
        break;
      }
      case EditPageState.save:{
  
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
  getDataByID(storedName: string, param: string, keyService: string): void {
    throw new Error('Method not implemented.');
  }


  ngOnInit(): void {
    this.setAcction();
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
  onLoadData(){
    if(!this.filterInput.month_start){
      this.showMessageError('Vui lòng chọn tháng bắt đầu');
      return;
    }
    if(!this.filterInput.month_end){
      this.showMessageError('Vui lòng chọn tháng kết thúc');
      return;
    }
    if(this.filterInput.month_start > this.filterInput.month_end){
      this.showMessageError('Tháng bắt đầu không lớn hơn tháng kết thúc');
      return;
    }
    this.BlockUI()
    this.consolidationVoucherService.carry_Forward_Execute({
      ...this.filterInput
    } as Carry_Forward_Execute_ENTITY).subscribe((res:Carry_Forward_Execute_ENTITY[])=>{
      this.listData = res;
      this.DataGridGenRowTable.setDataSource(res);
      this.UpdateView();
      this.UnBlockUI()
    })
  }
  onSelectedRowsData(obj:any){
    this.rowSelected = obj[0];
  }
  OnChangeDataFilter(obj:any){
    if(obj.colName == 'month_start' || obj.colName == 'month_end')
      this.filterInput[obj.colName] = Number(obj.value);
  }

}
