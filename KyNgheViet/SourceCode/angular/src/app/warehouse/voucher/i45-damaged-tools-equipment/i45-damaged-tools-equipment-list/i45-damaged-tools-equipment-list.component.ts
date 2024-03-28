import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { DXDataGridViewComponent } from 'src/app/shared/dx-data-grid/dx-data-grid-view/dx-data-grid-view.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { I45_Damaged_Tools_Equipment_ENTITY, WarehouseService, WMSVoucherService } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-i45-damaged-tools-equipment-list',
  templateUrl: './i45-damaged-tools-equipment-list.component.html',
  styleUrls: ['./i45-damaged-tools-equipment-list.component.css']
})
export class I45DamagedToolsEquipmentListComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    injector: Injector,
    private wMSVoucherService: WMSVoucherService,
    private appSession: AppSession,
  ) { 
    super(injector);
    this.tbName = this.getRouteData('tbName');
    //this.filterInput.voucher_date = this.getFullVoucherDate;
    this.filterInput.voucher_code = this.getRouteData('voucher_code');
    this.appSession.setVoucherCode(this.filterInput.voucher_code);
    const d = this.getStartEndDateInMonth();
    this.filterInput.voucher_date_start = d.startDate;
    this.filterInput.voucher_date_end = d.endDate;
  }

  @ViewChild('DataGridGenRowTable') DataGridGenRowTable: DXDataGridViewComponent;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  filterInput:I45_Damaged_Tools_Equipment_ENTITY=new I45_Damaged_Tools_Equipment_ENTITY();
  rowSelected:I45_Damaged_Tools_Equipment_ENTITY=new I45_Damaged_Tools_Equipment_ENTITY();
  listData:I45_Damaged_Tools_Equipment_ENTITY[]=[];
  tbName:string = 'I45_Damaged_Tools_Equipment';
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
        this.navigatePassParam('damaged-tools-equipment-add',[['code',this.idSelect]],new I45_Damaged_Tools_Equipment_ENTITY({}),this.tbName)
        break;
      }
      case EditPageState.edit:{
        this.navigatePassParam('damaged-tools-equipment-edit',[['code',this.idSelect]],new I45_Damaged_Tools_Equipment_ENTITY({}),this.tbName)
        break;
      }
      case EditPageState.save:{
        this.onLoadData();
        break;
      }
      case EditPageState.search:{
        this.onLoadData();
        break;
      }
      case EditPageState.viewDetail:{
        this.navigatePassParam('damaged-tools-equipment-view-detail',[['code',this.idSelect]],new I45_Damaged_Tools_Equipment_ENTITY({}),this.tbName)

        break;
      }
      case 'update_target':{
        
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
  onLoadData(){
    this.wMSVoucherService.i45_Damaged_Tools_Equipment_Search({
      ...this.filterInput,
      voucher_code:this.appSession.getVoucherCode
    } as I45_Damaged_Tools_Equipment_ENTITY).subscribe((res)=>{
      this.listData = res;
      this.DataGridGenRowTable.setDataSource(res);
      this.UpdateView();
    })
  }
  onSelectedRowsData(obj:any){
    this.rowSelected = obj[0];
  }
}