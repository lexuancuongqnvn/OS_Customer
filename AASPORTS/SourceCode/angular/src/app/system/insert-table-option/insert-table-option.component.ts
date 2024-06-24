import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { DXDataGridViewComponent } from 'src/app/shared/dx-data-grid/dx-data-grid-view/dx-data-grid-view.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { GenRowTableService, SYS_GenRowTable_Opption_ENTITY } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-insert-table-option',
  templateUrl: './insert-table-option.component.html',
  styleUrls: ['./insert-table-option.component.css']
})
export class InsertTableOptionComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    injector: Injector,
    private genRowTableService: GenRowTableService,
    private appSession: AppSession,
  ) { 
    super(injector);
  }
  @ViewChild('DataGridGenRowTable') DataGridGenRowTable: DXDataGridViewComponent;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  filterInput:SYS_GenRowTable_Opption_ENTITY=new SYS_GenRowTable_Opption_ENTITY();
  listGenRowTable:SYS_GenRowTable_Opption_ENTITY[]=[];
  tbName:string = 'SYS_GenRowTable_Opption';
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
        this.navigatePassParam('system/insert-table-option-edit',[[param,this.idSelect]],new SYS_GenRowTable_Opption_ENTITY(),this.tbName)
        break;
      }
      case EditPageState.edit:{
        this.genRowTableService.sYS_GenRowTable_Opption_V2_Search(new SYS_GenRowTable_Opption_ENTITY({
          code:this.idSelect,
          tablE_NAME:this.tbName,
          type:'BY-CODE'
        }) as SYS_GenRowTable_Opption_ENTITY).subscribe((resonse:SYS_GenRowTable_Opption_ENTITY[])=>{
          if(resonse[0])
            this.navigatePassParam('system/insert-table-option-edit',[[param,this.idSelect]],resonse[0],this.tbName)
        })
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
    this.genRowTableService.sYS_GenRowTable_Opption_V2_Search({
      ...this.filterInput,
      type:'GET-ALL'
    } as SYS_GenRowTable_Opption_ENTITY).subscribe((res:SYS_GenRowTable_Opption_ENTITY[])=>{
      this.listGenRowTable = res;
      this.DataGridGenRowTable.setDataSource(res);
      this.UpdateView();
    })
  }
}
