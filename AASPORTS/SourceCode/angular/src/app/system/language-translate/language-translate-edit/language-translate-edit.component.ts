import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ERPCommonService, SYS_Language_Translate_ENTITY } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-language-translate-edit',
  templateUrl: './language-translate-edit.component.html',
  styleUrls: ['./language-translate-edit.component.css']
})
export class LanguageTranslateEditComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    injector: Injector,
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

  @ViewChild('dialogDelete') dialogDelete: DialogAcctionComponent;
  tbName:string = 'SYS_Language_Translate';
  InputMaster:SYS_Language_Translate_ENTITY=new SYS_Language_Translate_ENTITY();
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
    throw new Error('Method not implemented.');
  }
  onClickAcctionResponse(e:any): void {
    switch(e.classForm){
      case EditPageState.add:{
      
        break;
      }
      case EditPageState.edit:{
        this.navigatePassParam('system/language-translate-edit',[['code',this.InputMaster.code]],new SYS_Language_Translate_ENTITY(),this.tbName);
        break;
      }
      case EditPageState.save:{
        if(!this.InputMaster.code){//chỗ này dùng code nha
          //Mình đang dùng thêm-sửa-xóa chung 1 api
          this.InputMaster.type = 'INSERT'
          this.eRPCommonService.sYS_Language_Translate_Action_By_Type(this.InputMaster).subscribe(res=>{
            this.showMessage(res.message,res.status);
            if(res.status == 0)
             this.navigatePassParam('system/language-translate-view-detail',[['code',res.ref_code]],new SYS_Language_Translate_ENTITY(),this.tbName);
          })
        }else{
          this.InputMaster.type = 'UPDATE'
          this.eRPCommonService.sYS_Language_Translate_Action_By_Type(this.InputMaster).subscribe(res=>{
            this.showMessage(res.message,res.status)
            if(res.status == 0) this.navigatePassParam('system/language-translate-view-detail',[['code',res.ref_code]],new SYS_Language_Translate_ENTITY(),this.tbName);
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
    this.eRPCommonService.sYS_Language_Translate_Action_By_Type(this.InputMaster).subscribe(res=>{
      this.showMessage(res.message,res.status);
      if(res.status == 0)
             this.navigatePassParam('system/language-translate',[['code',res.ref_code]],new SYS_Language_Translate_ENTITY(),this.tbName);
    })
  }
  handleValueChanged(event: any) {
    this.InputMaster[event.dataField]= event.value;
    if(event.dataField !== 'language_key') this.InputMaster.language_key = this.replaceAsync(' ','_',this.InputMaster.name_en.trim().toLowerCase());
    this.UpdateView();
  }
  HandleRowsDataGridOutput(event: any) {

    this.UpdateView();
  }
  onSelectedRowsDataOutput(event: any) {
    this.rowGridSelected = event;
  }
  onLoadData(){
    this.eRPCommonService.sYS_Language_Translate_Search(new SYS_Language_Translate_ENTITY({
      code:this.InputMaster.code
    }) as SYS_Language_Translate_ENTITY).subscribe((resonse:SYS_Language_Translate_ENTITY[])=>{
      if(resonse[0])this.InputMaster = resonse[0]
      else this.InputMaster = new SYS_Language_Translate_ENTITY();
    })
  }
  

}
