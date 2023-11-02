import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { DXDataGridViewComponent } from 'src/app/shared/dx-data-grid/dx-data-grid-view/dx-data-grid-view.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { CAT_Customer_ENTITY, SalesCategoryService } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    injector: Injector,
    private salesCategoryService: SalesCategoryService,
    private appSession: AppSession,
  ) { 
    super(injector);
    this.tbName = this.getRouteData('tbName');//tên này phải có
  }
  @ViewChild('dialogDelete') dialogDelete: DialogAcctionComponent;
  @ViewChild('DataGridGenRowTable') DataGridGenRowTable: DXDataGridViewComponent;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  filterInput:CAT_Customer_ENTITY=new CAT_Customer_ENTITY();
  listGenRowTable:CAT_Customer_ENTITY[]=[];
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
        this.navigatePassParam('sales/customer-add',[[param,this.idSelect]],new CAT_Customer_ENTITY(),this.tbName)
        break;
      }
      case EditPageState.edit:{
        this.navigatePassParam('sales/customer-edit',[['code',this.idSelect]],new CAT_Customer_ENTITY(),this.tbName)
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
        this.navigatePassParam('sales/customer-view-detail',[['code',this.idSelect]],new CAT_Customer_ENTITY(),this.tbName);

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
    this.filterInput.code = this.idSelect;
    this.salesCategoryService.cAT_Customer_Delete(this.filterInput).subscribe(res=>{
      this.showMessage(res.message,res.status);
      this.onLoadData()
    })
  }
  onLoadData(){
    this.salesCategoryService.cAT_Customer_Search({
      ...this.filterInput
    } as CAT_Customer_ENTITY).subscribe((res:CAT_Customer_ENTITY[])=>{
      this.listGenRowTable = res;
      this.DataGridGenRowTable.setDataSource(res);
      this.UpdateView();
    })
  }

}
