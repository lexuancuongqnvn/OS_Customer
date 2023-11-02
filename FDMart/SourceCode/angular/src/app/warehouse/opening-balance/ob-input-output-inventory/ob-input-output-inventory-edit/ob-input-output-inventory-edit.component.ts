import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { FormEditV2Component } from 'src/app/shared/form/form-edit-v2/form-edit-v2.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ERPCommonService, OBWMSService, OB_Input_Output_Inventory_ENTITY } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-ob-input-output-inventory-edit',
  templateUrl: './ob-input-output-inventory-edit.component.html',
  styleUrls: ['./ob-input-output-inventory-edit.component.css']
})
export class ObInputOutputInventoryEditComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    injector: Injector,
    private oBWMSService: OBWMSService,
    private eRPCommonService: ERPCommonService,
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
  @ViewChild('FromEditV2') fromEditV2: FormEditV2Component;
  tbName:string = 'OB_Input_Output_Inventory';
  rowGridSelected:any = null;
 
  InputMaster:OB_Input_Output_Inventory_ENTITY=new OB_Input_Output_Inventory_ENTITY();
  editPageState:string = EditPageState.edit;
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
  onClickAcctionResponse(e:any): void {
    switch(e.classForm){
      case EditPageState.add:{
      
        break;
      }
      case EditPageState.edit:{
        this.navigatePassParam('warehouse/opening-balance-input-output-inventory-edit',[['code',this.InputMaster.code]],new OB_Input_Output_Inventory_ENTITY({}),this.tbName)
        break;
      }
      case EditPageState.save:{

        if(!this.InputMaster.code){
          this.oBWMSService.oB_Input_Output_Inventory_Insert(this.InputMaster).subscribe(res=>{
            this.showMessage(res.message,res.status);
            if(res.status == 0){
              this.InputMaster.code = res.ref_code;
              this.navigatePassParam('warehouse/opening-balance-input-output-inventory-view-detail',[['code',this.InputMaster.code]],new OB_Input_Output_Inventory_ENTITY({}),this.tbName)
            }
          })
        }else{
          this.oBWMSService.oB_Input_Output_Inventory_Update(this.InputMaster).subscribe(res=>{
            this.showMessage(res.message,res.status);
            if(res.status == 0)this.navigatePassParam('warehouse/opening-balance-input-output-inventory-view-detail',[['code',this.InputMaster.code]],new OB_Input_Output_Inventory_ENTITY({}),this.tbName)

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
  onClickAcction(id: number, storedName: string, param: string, keyService: string, classForm: string): void {
   
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
  onSelectedRowsDataOutput(event: any) {
    this.rowGridSelected = event;
  }
  HandleRowsDataGridOutput(event: any) {
    try{
      if (event.dataField == 'customer_code')
        this.InputMaster['customer_name'] = event.value[0].name;
      if (event.dataField == 'profession_code')
        this.InputMaster['notes'] = event.value[0].notes;
      if (event.dataField == 'code_fc')
        this.InputMaster['exchange_rate'] = event.value[0].exchange_rate;
    }catch{}
    this.UpdateEditV2();
  }
  onLoadData(){
    this.oBWMSService.oB_Input_Output_Inventory_Search(new OB_Input_Output_Inventory_ENTITY({
      code:this.InputMaster.code
    }) as OB_Input_Output_Inventory_ENTITY).subscribe((resonse:OB_Input_Output_Inventory_ENTITY[])=>{
      if(resonse[0])
        this.InputMaster = resonse[0];
      else
        {
          this.goBack();
        }
    })
  }
}