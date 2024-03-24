import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { DXDataGridViewComponent } from 'src/app/shared/dx-data-grid/dx-data-grid-view/dx-data-grid-view.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { GenRowTableService, SYS_GenRowTable } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-genrow-table-v2',
  templateUrl: './genrow-table-v2.component.html',
  styleUrls: ['./genrow-table-v2.component.css']
})
export class GenrowTableV2Component extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    injector: Injector,
    private genRowTableService: GenRowTableService,
    private appSession: AppSession,
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
  @ViewChild('DataGridGenRowTable') DataGridGenRowTable: DXDataGridViewComponent;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  listGenRowTable:SYS_GenRowTable[]=[];
  filterInput:SYS_GenRowTable=new SYS_GenRowTable();
  tbName:string = 'SYS_GenRowTable';
  CurrenFrom:string = EditPageState.view;
  ngOnInit(): void {
    this.onLoadData();
    this.setAcction();
  }
  onClickAcction(id: number, storedName: string, param: string, keyService: string, classForm: string): void {
    switch(classForm){
      case EditPageState.add:{
        this.navigatePassParam('genrow-table-v2-edit',[[param,this.idSelect]],new SYS_GenRowTable(),this.tbName)
        break;
      }
      case EditPageState.edit:{
        this.navigatePassParam('genrow-table-v2-edit',[['code',this.idSelect]],new SYS_GenRowTable(),this.tbName)

        // this.genRowTableService.sYS_GenRowTable_v2_Search(new SYS_GenRowTable({
        //   code:this.idSelect,
        //   userID:this.appSession.user.id,
        //   tablE_NAME:this.tbName,
        //   type:'BY-CODE'
        // }) as SYS_GenRowTable).subscribe((resonse:SYS_GenRowTable[])=>{
        //   if(resonse[0])
        //     this.navigatePassParam('genrow-table-v2-edit',[[param,this.idSelect]],resonse[0],this.tbName)
        // })
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
    this.genRowTableService.sYS_GenRowTable_Data_Search({
      ...this.filterInput,
      userID:this.appSession.user.id,
      type:'GET-ALL'
    } as SYS_GenRowTable).subscribe((res:SYS_GenRowTable[])=>{
      this.listGenRowTable = res;
      this.DataGridGenRowTable.setDataSource(res);
      this.UpdateView();
    })
  }
}
