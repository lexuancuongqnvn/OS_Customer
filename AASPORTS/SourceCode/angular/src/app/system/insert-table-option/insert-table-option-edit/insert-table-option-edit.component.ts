import { Component, Injector, OnInit } from '@angular/core';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { GenRowTableService, SYS_GenRowTable_Opption_ENTITY } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-insert-table-option-edit',
  templateUrl: './insert-table-option-edit.component.html',
  styleUrls: ['./insert-table-option-edit.component.css']
})
export class InsertTableOptionEditComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    injector: Injector,
    private genRowTableService: GenRowTableService,
    private appSession: AppSession
  ) { 
    super(injector);
    this.InputMaster = window.history.state;
    this.editPageState = this.getRouteData('editPageState');
    this.tbName = this.getRouteData('tbName');
  }
  tbName:string = 'SYS_GenRowTable_Opption';
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
  InputMaster:SYS_GenRowTable_Opption_ENTITY=new SYS_GenRowTable_Opption_ENTITY();
  editPageState:string = EditPageState.edit;
  ngOnInit(): void {
  }
  onClickAcctionResponse(e:any): void {
    switch(e.classForm){
      case EditPageState.add:{
      
        break;
      }
      case EditPageState.edit:{
        
        break;
      }
      case EditPageState.save:{
        if(!e.data.code){
          this.genRowTableService.sYS_GenRowTable_Opption_Action_By_Type(new SYS_GenRowTable_Opption_ENTITY({...e.data,type:'INSERT'}) as SYS_GenRowTable_Opption_ENTITY).subscribe(res=>{
            this.showMessage(res.message,res.status);
            this.InputMaster.code = res.code;
          })
        }else{
          this.genRowTableService.sYS_GenRowTable_Opption_Action_By_Type(new SYS_GenRowTable_Opption_ENTITY({...e.data,type:'UPDATE'}) as SYS_GenRowTable_Opption_ENTITY).subscribe(res=>{
            this.showMessage(res.message,res.status)
          })
        }
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
  handleValueChanged(event: any) {
    this.InputMaster[event.dataField]= event.value;
    this.UpdateView();
  }
}
