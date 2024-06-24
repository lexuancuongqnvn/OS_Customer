import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { CAT_Goods_ENTITY, WMSCategoryService } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'warehouse-category-goods-edit',
  templateUrl: './goods-edit.component.html',
  styleUrls: ['./goods-edit.component.css']
})
export class GoodsEditComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

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
  tbName:string = 'CAT_Goods';
  InputMaster:CAT_Goods_ENTITY=new CAT_Goods_ENTITY();
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
        this.navigatePassParam('warehouse/goods-add',[['code','']],new CAT_Goods_ENTITY(),this.tbName)
        break;
      }
      case EditPageState.edit:{
        this.navigatePassParam('warehouse/goods-edit',[['code',this.InputMaster.code]],new CAT_Goods_ENTITY(),this.tbName);
        break;
      }
      case EditPageState.save:{
        if(!this.InputMaster.code){
          this.wMSCategoryService.cAT_Goods_Insert(new CAT_Goods_ENTITY(
            {...this.InputMaster}) as CAT_Goods_ENTITY).subscribe(res=>{
            this.showMessage(res.message,res.status);
            //this.InputMaster.code = res.ref_code;
            if(res.status == 0)
            this.navigatePassParam('warehouse/goods-view-detail',[['code',res.ref_code]],new CAT_Goods_ENTITY(),this.tbName);
          })
        }else{
          this.wMSCategoryService.cAT_Goods_Update(new CAT_Goods_ENTITY(
            {...this.InputMaster}) as CAT_Goods_ENTITY).subscribe(res=>{
            this.showMessage(res.message,res.status)
            if(res.status == 0)
            this.navigatePassParam('warehouse/goods-view-detail',[['code',res.ref_code]],new CAT_Goods_ENTITY(),this.tbName);
          })
        }
        // if(!this.InputMaster.id){
        //   this.wMSCategoryService.cAT_Goods_Insert(new CAT_Goods_ENTITY({...this.InputMaster})as CAT_Goods_ENTITY).subscribe(res=>{
        //     this.showMessage(res.message,res.status);
        //     if(res.status == 0) this.navigatePassParam('warehouse/goods-view-detail',[['code',res.ref_code]],new CAT_Goods_ENTITY(),this.tbName);
        //   })
        // }else{
        //   this.wMSCategoryService.cAT_Goods_Update(new CAT_Goods_ENTITY({...this.InputMaster})as CAT_Goods_ENTITY).subscribe(res=>{
        //     this.showMessage(res.message,res.status)
        //     if(res.status == 0) this.navigatePassParam('warehouse/goods-view-detail',[['code',res.ref_code]],new CAT_Goods_ENTITY(),this.tbName);
        //   })
        // }
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
  handleValueChanged(event: any) {
    this.InputMaster[event.dataField]= event.value;
    this.UpdateView();
  }
  confirmDelete(){
    this.wMSCategoryService.cAT_Goods_Delete(this.InputMaster).subscribe(res=>{
      this.showMessage(res.message,res.status);
      if(res.status == 0)
        this.navigatePassParam('warehouse/goods',[['code',res.ref_code]],new CAT_Goods_ENTITY(),this.tbName);
    })
  }
  onLoadData(){
    this.wMSCategoryService.cAT_Goods_Search(new CAT_Goods_ENTITY({
      code:this.InputMaster.code,
      type:'BY-CODE'
    }) as CAT_Goods_ENTITY).subscribe((resonse:CAT_Goods_ENTITY[])=>{
      if(resonse[0])this.InputMaster = resonse[0]
      else this.InputMaster = new CAT_Goods_ENTITY();
    })
  }
}
