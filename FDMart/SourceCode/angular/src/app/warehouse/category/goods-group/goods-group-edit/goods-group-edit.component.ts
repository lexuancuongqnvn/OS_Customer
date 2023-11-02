import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { CAT_Goods_Group_ENTITY, WMSCategoryService } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-goods-group-edit',
  templateUrl: './goods-group-edit.component.html',
  styleUrls: ['./goods-group-edit.component.css']
})
export class GoodsGroupEditComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    injector: Injector,
    private wMSCategoryService: WMSCategoryService,
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
  tbName:string = 'CAT_Goods_Group';
  InputMaster:CAT_Goods_Group_ENTITY=new CAT_Goods_Group_ENTITY();
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
        this.navigatePassParam('warehouse/goods-group-edit',[['code',this.InputMaster.code]],new CAT_Goods_Group_ENTITY(),this.tbName);
        break;
      }
      case EditPageState.save:{
        if(!this.InputMaster.code){
          this.wMSCategoryService.cAT_Goods_Group_Action_By_Type(new CAT_Goods_Group_ENTITY(
            {...this.InputMaster,type:'INSERT'}) as CAT_Goods_Group_ENTITY).subscribe(res=>{
            this.showMessage(res.message,res.status);
            //this.InputMaster.code = res.ref_code;
            if(res.status == 0)
            this.navigatePassParam('warehouse/goods-group-view-detail',[['code',res.ref_code]],new CAT_Goods_Group_ENTITY(),this.tbName);
          })
        }else{
          this.wMSCategoryService.cAT_Goods_Group_Action_By_Type(new CAT_Goods_Group_ENTITY(
            {...this.InputMaster,type:'UPDATE'}) as CAT_Goods_Group_ENTITY).subscribe(res=>{
            this.showMessage(res.message,res.status)
            if(res.status == 0)
            this.navigatePassParam('warehouse/goods-group-view-detail',[['code',res.ref_code]],new CAT_Goods_Group_ENTITY(),this.tbName);
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
    this.wMSCategoryService.cAT_Goods_Group_Action_By_Type(this.InputMaster).subscribe(res=>{
      this.showMessage(res.message,res.status);
      if(res.status == 0)
        this.navigatePassParam('warehouse/goods-group',[['code',res.ref_code]],new CAT_Goods_Group_ENTITY(),this.tbName);
    })
  }
  handleValueChanged(event: any) {
    this.InputMaster[event.dataField]= event.value;
    this.UpdateView();
  }
  onLoadData(){
    this.wMSCategoryService.cAT_Goods_Group_Search(new CAT_Goods_Group_ENTITY({
      code:this.InputMaster.code,
      type:'BY-CODE'
    }) as CAT_Goods_Group_ENTITY).subscribe((resonse:CAT_Goods_Group_ENTITY[])=>{
      if(resonse[0])this.InputMaster = resonse[0]
      else this.InputMaster = new CAT_Goods_Group_ENTITY();
    })
  }
}
