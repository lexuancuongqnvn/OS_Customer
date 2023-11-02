import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { GenRowTableService, SYS_Column_Info_ENTITY } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-column-info-edit',
  templateUrl: './column-info-edit.component.html',
  styleUrls: ['./column-info-edit.component.css']
})
export class ColumnInfoEditComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    injector: Injector,
    private genRowTableService: GenRowTableService,
    private appSession: AppSession
  ) { 
    super(injector);
    this.editPageState = this.getRouteData('editPageState');
    this.tbName = this.getRouteData('tbName');
    this.InputMaster['sys_TableName'] = this.tbName;
    if(this.editPageState == EditPageState.add){
    }else if(this.editPageState == EditPageState.edit || this.editPageState == EditPageState.viewDetail){
      this.InputMaster.code = this.getRouteParamObj('code');
      this.onLoadData();
    }
  }
  @ViewChild('dialogDelete') dialogDelete: DialogAcctionComponent;
  tbName:string = 'SYS_Column_Info';
  InputMaster:SYS_Column_Info_ENTITY=new SYS_Column_Info_ENTITY();
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
      case EditPageState.edit:{
        this.navigatePassParam('system/column-info-edit',[['code',this.InputMaster.code]],new SYS_Column_Info_ENTITY(),this.tbName);
        break;
      }
      case EditPageState.save:{
        if(!this.InputMaster.code){//chỗ này dùng code nha
          //Mình đang dùng thêm-sửa-xóa chung 1 api
          this.InputMaster.type = 'INSERT'
          this.genRowTableService.sYS_Column_Info_Action_By_Type(this.InputMaster).subscribe(res=>{
            this.showMessage(res.message,res.status);
            if(res.status == 0)
             this.navigatePassParam('system/column-info-view-detail',[['code',res.ref_code]],new SYS_Column_Info_ENTITY(),this.tbName);
          })
        }else{
          this.InputMaster.type = 'UPDATE'
          this.genRowTableService.sYS_Column_Info_Action_By_Type(this.InputMaster).subscribe(res=>{
            this.showMessage(res.message,res.status)
            if(res.status == 0) this.navigatePassParam('system/column-info-view-detail',[['code',res.ref_code]],new SYS_Column_Info_ENTITY(),this.tbName);
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
    this.InputMaster.type = 'DELETE';
    this.genRowTableService.sYS_Column_Info_Action_By_Type(this.InputMaster).subscribe(res=>{
      this.showMessage(res.message,res.status);
      if(res.status == 0)
             this.navigatePassParam('system/column-info',[['code',res.ref_code]],new SYS_Column_Info_ENTITY(),this.tbName);
    })
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
    this.genRowTableService.sYS_Column_Info_Search(new SYS_Column_Info_ENTITY({
      code:this.InputMaster.code
    }) as SYS_Column_Info_ENTITY).subscribe((resonse:SYS_Column_Info_ENTITY[])=>{
      if(resonse[0])this.InputMaster = resonse[0]
      else this.InputMaster = new SYS_Column_Info_ENTITY();
    })
  }
}
