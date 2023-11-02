import { Component, Injector, OnInit } from '@angular/core';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { GenRowTableService, SYS_GenRowTable, SYS_GenRowTable_Detail } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-genrow-table-v2-edit',
  templateUrl: './genrow-table-v2-edit.component.html',
  styleUrls: ['./genrow-table-v2-edit.component.css']
})
export class GenrowTableV2EditComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    injector: Injector,
    private genRowTableService: GenRowTableService,
    private appSession: AppSession
  ) { 
    super(injector);
    this.InputMaster = window.history.state;
    this.tbName = this.getRouteData('tbName');
  }
  tbName:string = 'SYS_GenRowTable';
  InputMaster:SYS_GenRowTable=new SYS_GenRowTable();

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
  onClickAcction(id: number, storedName: string, param: string, keyService: string, classForm: string,data:any=null): void {
    throw new Error('Method not implemented.');
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
        if(this.InputMaster.syS_GenRowTable_Detail){
          const D: SYS_GenRowTable_Detail[] = this.InputMaster.syS_GenRowTable_Detail.map((obj: any) => {
            let item = new SYS_GenRowTable_Detail();
            for (const [key, value] of Object.entries(obj)) {
              item[key] = value;
            }
            return item;
          });
          this.InputMaster.syS_GenRowTable_Detail = D;
        }
        
        if(!this.InputMaster.code){
         
          this.genRowTableService.sYS_GenRowTable_Insert(this.InputMaster).subscribe(res=>{
            this.showMessage(res.Message,res.Status);
            this.InputMaster.code = res.code;
          })
        }else{
          this.genRowTableService.sYS_GenRowTable_Update_Detail(this.InputMaster).subscribe(res=>{
            this.showMessage(res.Message,res.Status)
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
  getDataByID(storedName: string, param: string, keyService: string): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    
  }

  handleValueChanged(event: any) {
    this.InputMaster[event.dataField]= event.value;
    this.UpdateView();
  }
}
