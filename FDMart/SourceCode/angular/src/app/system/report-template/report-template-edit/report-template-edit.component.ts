import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { FormEditV2Component } from 'src/app/shared/form/form-edit-v2/form-edit-v2.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ERPCommonService, ExportAPIService, SYS_Report_Infomation_Detail_ENTITY, SYS_Report_Infomation_ENTITY } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-report-template-edit',
  templateUrl: './report-template-edit.component.html',
  styleUrls: ['./report-template-edit.component.css']
})
export class ReportTemplateEditComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    injector: Injector,
    private exportAPIService: ExportAPIService,
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
  @ViewChild('dialogDelete') dialogDelete: DialogAcctionComponent;
  tbName:string = 'SYS_Report_Infomation';
  rowGridSelected:any = null;
  onRefreshGrid:boolean = false;

  InputMaster:SYS_Report_Infomation_ENTITY=new SYS_Report_Infomation_ENTITY();
  editPageState:string = EditPageState.edit;

  onAdd(): void {
    throw new Error('Method not implemented.');
  }
  onUpdate(item: any): void {
    throw new Error('Method not implemented.');
  }
  onDelete(item: any): void {
    this.exportAPIService.sYS_Report_Infomation_Delete(this.InputMaster).subscribe(res=>{
      this.showMessage(res.message,res.status);
      this.navigatePassParam('system/sys-report-infomation',[['code',this.InputMaster.code]],new SYS_Report_Infomation_ENTITY({}),this.tbName)
    })
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
        this.navigatePassParam('system/sys-report-infomation-add',[['code','']],new SYS_Report_Infomation_ENTITY({}),this.tbName)
        break;
      }
      case EditPageState.edit:{
        this.navigatePassParam('system/sys-report-infomation-edit',[['code',this.InputMaster.code]],new SYS_Report_Infomation_ENTITY({}),this.tbName)
        break;
      }
      case EditPageState.save:{
        if(this.InputMaster.sYS_Report_Infomation_Details){
          const i42D: SYS_Report_Infomation_Detail_ENTITY[] = this.InputMaster.sYS_Report_Infomation_Details.map((obj: any) => {
            let item = new SYS_Report_Infomation_Detail_ENTITY();
            for (const [key, value] of Object.entries(obj)) {
              item[key] = value;
            }
            return item;
          });
          this.InputMaster.sYS_Report_Infomation_Details = i42D;
        }
        if(!this.InputMaster.code){
          this.exportAPIService.sYS_Report_Infomation_Insert(this.InputMaster).subscribe(res=>{
            this.showMessage(res.message,res.status);
            if(res.status == 0){
              this.InputMaster.code = res.ref_code;
              this.navigatePassParam('system/sys-report-infomation-view-detail',[['code',this.InputMaster.code]],new SYS_Report_Infomation_ENTITY({}),this.tbName)
            }
          })
        }else{
          this.exportAPIService.sYS_Report_Infomation_Update(this.InputMaster).subscribe(res=>{
            this.showMessage(res.message,res.status);
            if(res.status == 0)
              this.navigatePassParam('system/sys-report-infomation-view-detail',[['code',this.InputMaster.code]],new SYS_Report_Infomation_ENTITY({}),this.tbName)
          })
        }
        break;
      }
      case EditPageState.search:{
        break;
      }
      case EditPageState.viewDetail:{
        this.navigatePassParam('system/sys-report-infomation-view-detail',[['code',this.InputMaster.code]],new SYS_Report_Infomation_ENTITY({}),this.tbName)

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
  onClickAcction(id: number, storedName: string, param: string, keyService: string, classForm: string): void {
   
  }
  getDataByID(storedName: string, param: string, keyService: string): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    //this.initCombobox();
  }
  handleValueChanged(event: any) {
    
    this.InputMaster[event.dataField]= event.value;
    this.UpdateView();
  }
  onRefreshGridOutput(event: any) {
    this.onRefreshGrid = event;
  }
  onSelectedRowsDataOutput(event: any) {
    this.rowGridSelected = event;
  }
  HandleRowsDataGridOutput(event: any) {
   
  }

  onLoadData(){
    this.exportAPIService.sYS_Report_Infomation_Search(new SYS_Report_Infomation_ENTITY({
      code:this.InputMaster.code
    }) as SYS_Report_Infomation_ENTITY).subscribe((resonse:SYS_Report_Infomation_ENTITY[])=>{
      if(resonse[0])
        this.InputMaster = resonse[0];
      else
        {
          this.goBack();
        }
    })
  }
  // get getTax():CAT_Tax_ENTITY{
  //   if(this.cat_Tax.tax) return this.cat_Tax
  //   else return this.cat_Taxs.find(t=>t.code == this.InputMaster.tax_code)
  // }
  // async initCombobox(){
  //   this.cat_Taxs = await this.salesVATService.cAT_Tax_Search(new CAT_Tax_ENTITY()).toPromise()
  // }
}
