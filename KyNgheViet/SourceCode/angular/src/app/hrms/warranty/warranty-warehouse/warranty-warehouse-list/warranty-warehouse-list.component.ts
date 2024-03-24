import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { DXDataGridViewComponent } from 'src/app/shared/dx-data-grid/dx-data-grid-view/dx-data-grid-view.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { WarrantyService, Warranty_Laptop_ENTITY } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-warranty-warehouse-list',
  templateUrl: './warranty-warehouse-list.component.html',
  styleUrls: ['./warranty-warehouse-list.component.css']
})
export class WarrantyWarehouseListComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    injector: Injector,
    private warrantyService: WarrantyService,
    private appSession: AppSession,
  ) { 
    super(injector);
    this.tbName = this.getRouteData('tbName');
    this.filterInput.type='warehouse'
    this.filterInput.template_report = 'CUSTOMER';
  }

  @ViewChild('dialogDelete') dialogDelete: DialogAcctionComponent;
  @ViewChild('DataGridGenRowTable') DataGridGenRowTable: DXDataGridViewComponent;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  filterInput:Warranty_Laptop_ENTITY=new Warranty_Laptop_ENTITY();
  listGenRowTable:Warranty_Laptop_ENTITY[]=[];
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
        this.navigatePassParam('hrms/warranty-warehouse-add',[[param,this.idSelect]],new Warranty_Laptop_ENTITY(),this.tbName)
        break;
      }
      case EditPageState.edit:{
        this.navigatePassParam('hrms/warranty-warehouse-edit',[['code',this.idSelect]],new Warranty_Laptop_ENTITY(),this.tbName)
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
        this.navigatePassParam('hrms/warranty-warehouse-view-detail',[['code',this.idSelect]],new Warranty_Laptop_ENTITY(),this.tbName);

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
    // this.filterInput.type = 'DELETE';
    // this.filterInput.code = this.idSelect;
    // this.warrantyService.warranty_Report_Laptop_Search(this.filterInput).subscribe(res=>{
    //   this.showMessage(res.message,res.status);
    //   this.onLoadData()
    // })
  }
  onLoadData(){
    this.warrantyService.warranty_Laptop_Search({
      ...this.filterInput,
      user_login: this.appSession.user.code
    } as Warranty_Laptop_ENTITY).subscribe((res:Warranty_Laptop_ENTITY[])=>{
      this.listGenRowTable = res;
      this.DataGridGenRowTable.setDataSource(res);
      this.UpdateView();
    })
  }
  OnChangeDataFilter(e:any){
    if(e.colName == "doc_date_start")this.filterInput.doc_date_from = e.value
    else if(e.colName == "doc_date_end")this.filterInput.doc_date_to = e.value
  }
}
