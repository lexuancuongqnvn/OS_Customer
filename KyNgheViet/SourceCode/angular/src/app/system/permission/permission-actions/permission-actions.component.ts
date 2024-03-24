import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { AcctionService, SYS_ActionsOnTable_Permission_ENTITY, SalesCategoryService } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-permission-actions',
  templateUrl: './permission-actions.component.html',
  styleUrls: ['./permission-actions.component.css']
})
export class PermissionActionsComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    injector: Injector,
    private acctionService: AcctionService,
    private appSession: AppSession
  ) { 
    super(injector);
    this.editPageState = this.getRouteData('editPageState');
    //this.tbName = this.getRouteData('tbName');
    this.InputMaster['sys_TableName'] = this.tbName;
    // this.InputMaster.tbName = this.tbName;
    if(this.editPageState == EditPageState.add){
    }else if(this.editPageState == EditPageState.edit || this.editPageState == EditPageState.viewDetail){
      this.InputMaster.code = this.getRouteParamObj('code');
      this.InputMaster.code_menu_sub = this.getRouteParamObj('code');
      this.onLoadData();
    }
  }
  
  @ViewChild('dialogDelete') dialogDelete: DialogAcctionComponent;
  tbName:string = 'SYS_Menu_Permission_Actions';
  InputMaster:SYS_ActionsOnTable_Permission_ENTITY=new SYS_ActionsOnTable_Permission_ENTITY();
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
      case EditPageState.save:{
        this.acctionService.action_Permission_Update(this.InputMaster).subscribe((respond)=>{
          if(respond['status'] == '0')
          {
            this.showMessageSuccess(respond['message']);
          }else
            this.showMessageError(respond['message']);
           
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
        break;
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
  confirmDelete(){

  }
  handleValueChanged(event: any) {
    this.InputMaster[event.dataField]= event.value;
    this.UpdateView();
  }
  HandleRowsDataGridOutput(event: any) {

    this.UpdateEditV2();
  }
  onSelectedRowsDataOutput(event: any) {
    this.rowGridSelected = event;
  }
  onLoadData(){
    this.BlockUI();
    this.acctionService.action_Permission_Search(new SYS_ActionsOnTable_Permission_ENTITY(
      {
        code_menu_sub:this.InputMaster.code,
        userID:this.appSession.user.id
      }
    ) as SYS_ActionsOnTable_Permission_ENTITY).subscribe(
      (data: SYS_ActionsOnTable_Permission_ENTITY) => {
        this.InputMaster = data;
        this.UnBlockUI()
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
  }
}
