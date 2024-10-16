import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { DXDataGridViewComponent } from 'src/app/shared/dx-data-grid/dx-data-grid-view/dx-data-grid-view.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { OBWMSService, OB_Input_Output_Inventory_ENTITY, OB_Input_Output_Inventory_Synchronized_ENTITY } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-ob-input-output-inventory-view',
  templateUrl: './ob-input-output-inventory-view.component.html',
  styleUrls: ['./ob-input-output-inventory-view.component.css']
})
export class ObInputOutputInventoryViewComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    injector: Injector,
    private oBWMSService: OBWMSService,
    private appSession: AppSession,
  ) { 
    super(injector);
    this.tbName = this.getRouteData('tbName');
  }
  @ViewChild('dialogDelete') dialogDelete: DialogAcctionComponent;
  @ViewChild('dialogSynchronized') dialogSynchronized: DialogAcctionComponent;
  @ViewChild('DataGridGenRowTable') DataGridGenRowTable: DXDataGridViewComponent;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  filterInput:OB_Input_Output_Inventory_ENTITY=new OB_Input_Output_Inventory_ENTITY();
  rowSelected:OB_Input_Output_Inventory_ENTITY=new OB_Input_Output_Inventory_ENTITY();
  listGenRowTable:OB_Input_Output_Inventory_ENTITY[]=[];
  tbName:string = 'OB_Input_Output_Inventory';
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
        this.navigatePassParam('warehouse/opening-balance-input-output-inventory-add',[['code',this.idSelect]],new OB_Input_Output_Inventory_ENTITY({}),this.tbName)
        break;
      }
      case EditPageState.edit:{
        this.navigatePassParam('warehouse/opening-balance-input-output-inventory-edit',[['code',this.idSelect]],new OB_Input_Output_Inventory_ENTITY({}),this.tbName)
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
        this.navigatePassParam('warehouse/opening-balance-input-output-inventory-view-detail',[['code',this.idSelect]],new OB_Input_Output_Inventory_ENTITY({}),this.tbName)
        break;
      }
      case EditPageState.delete:{
        this.dialogDelete.open();
        break;
      }
    case 'synchronized':{
     this.dialogSynchronized.open();
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
    this.oBWMSService.oB_Input_Output_Inventory_Search({
      ...this.filterInput
    } as OB_Input_Output_Inventory_ENTITY).subscribe((res:OB_Input_Output_Inventory_ENTITY[])=>{
      this.listGenRowTable = res;
      this.DataGridGenRowTable.setDataSource(res);
      this.UpdateView();
    })
  }
  onSelectedRowsData(obj:any){
    this.rowSelected = obj[0];
  }
  confirmDelete(){
    this.oBWMSService.oB_Input_Output_Inventory_Delete(new OB_Input_Output_Inventory_ENTITY({
      code : this.idSelect,
      type:'DELETE'
    })as OB_Input_Output_Inventory_ENTITY).subscribe(res=>{
      this.showMessage(res.message,res.status);
      this.onLoadData()
    })
  } 
  confirmSynchronized(){
    this.oBWMSService.oB_Input_Output_Inventory_Synchronized(new OB_Input_Output_Inventory_Synchronized_ENTITY()as OB_Input_Output_Inventory_Synchronized_ENTITY).subscribe(res=>{
      this.showMessage(res.message,res.status);
      this.onLoadData()
    })
  }
}