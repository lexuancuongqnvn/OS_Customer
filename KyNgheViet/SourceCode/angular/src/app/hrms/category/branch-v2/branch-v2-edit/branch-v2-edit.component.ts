import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { DXDataGridViewComponent } from 'src/app/shared/dx-data-grid/dx-data-grid-view/dx-data-grid-view.component';
import { JqgridListComponent } from 'src/app/shared/jqgrid/jqgrid-list/jqgrid-list.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { HRM_BranchService, HRM_Branch_Detail_ENTITY, HRM_Branch_ENTITY } from 'src/app/shared/service-proxies/api-shared';
import { AlertMessageComponent } from 'src/app/shared/sidenav/alert-message/alert-message.component';
import { SidenavAddEditComponent } from 'src/app/shared/sidenav/sidenav-add-edit/sidenav-add-edit.component';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';
@Component({
  selector: 'app-branch-v2-edit',
  templateUrl: './branch-v2-edit.component.html',
  styleUrls: ['./branch-v2-edit.component.css']
})
export class BranchV2EditComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    injector: Injector,
    private hRM_BranchService: HRM_BranchService,
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
  isEdit:boolean = false;
  @ViewChild('dialogDelete') dialogDelete: DialogAcctionComponent;
  @ViewChild('DataGridGenRowTable') DataGridGenRowTable: DXDataGridViewComponent;
  @ViewChild('dialogEdit') dialogEdit: DialogAcctionComponent;
  @ViewChild('dialogAdd') dialogAdd: DialogAcctionComponent;
  @ViewChild('gridList') gridList: JqgridListComponent;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  @ViewChild('alertMessage') alertMessage: AlertMessageComponent;
  @ViewChild('sidenavAddEdit') sidenavAddEdit: SidenavAddEditComponent;
  @ViewChild('toolbarEdit') toolbarEdit: ToolbarComponent;
  tbName:string = 'HRM_Branch';
  InputMaster:HRM_Branch_ENTITY=new HRM_Branch_ENTITY();
  listGenRowTable:HRM_Branch_ENTITY[]=[];
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
  setAcction(){
    if(this.toolbar)
      this.toolbar.setUiAction(this);
    else
      setTimeout(() => {
        this.setAcction();
      }, 50);
  }
  ngOnInit(): void {
    this.setAcction();
    this.onLoadData();
  }
  valueUpload(v:any,col:string){
    this.InputMaster[col] = v;
    this.UpdateEditV2();
  }
  onDatasourceGridOutput(event: any){
    this.InputMaster[event.dataField]= event.value;
  }
  onClickAcctionResponse(e:any): void {
    switch(e.classForm){
      case EditPageState.add:{

        break;
      }
      case EditPageState.edit:{
        this.navigatePassParam('hrm/branch-edit',[['code',this.InputMaster.code]],new HRM_Branch_ENTITY(),this.tbName);
        break;
      }
      case EditPageState.delete:{
        this.dialogDelete.open();
        break;
      }
      case EditPageState.save:{
        if(this.InputMaster.lat) this.InputMaster.lat = Number(this.InputMaster.lat)
        if(this.InputMaster.long) this.InputMaster.long = Number(this.InputMaster.long)
        try{
          if(this.InputMaster.hRM_Branch_Details){
            const detais: HRM_Branch_Detail_ENTITY[] = this.InputMaster.hRM_Branch_Details.map((obj: any) => {
              let item = new HRM_Branch_Detail_ENTITY();
              for (const [key, value] of Object.entries(obj)) {
                item[key] = value;
              }
              return item;
            });
            this.InputMaster.hRM_Branch_Details = detais;
          }
        }catch{}
        if(!this.InputMaster.code){
          this.hRM_BranchService.hRM_Branch_Actions(new HRM_Branch_ENTITY(
            {...this.InputMaster,type:'INSERT',id:-1}) as HRM_Branch_ENTITY).subscribe(res=>{
            this.showMessage(res.message,res.status);
            if(res.status == 0)
            this.navigatePassParam('hrm/branch-view-detail',[['code',res.ref_code]],new HRM_Branch_ENTITY(),this.tbName);
          })
        }else{
          this.hRM_BranchService.hRM_Branch_Actions(new HRM_Branch_ENTITY(
            {...this.InputMaster,type:'UPDATE'}) as HRM_Branch_ENTITY).subscribe(res=>{
            this.showMessage(res.message,res.status)
            if(res.status == 0)
            this.navigatePassParam('hrm/branch-view-detail',[['code',res.ref_code]],new HRM_Branch_ENTITY(),this.tbName);
          })
        }
        break;
      }
      case EditPageState.search:{
        this.onLoadData();
        break;
      }
      case EditPageState.viewDetail:{
        break;
      }  
      case 'LoadLocation':{
        this.setCurrentLocation();
        break;
      }
      default:break;
    }
  }
  latitude: number=0;
  longitude: number=0;
  setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.InputMaster.lat = this.latitude;
        this.InputMaster.long = this.longitude;
        this.UpdateEditV2();
        document.getElementById('iframe-map')['src'] ='https://maps.google.com/maps?q='+this.latitude+','+this.longitude+'&z=15&output=embed';
      });
    }
  }
  valueStartDate(e:any,col:string){
    this.InputMaster[col] = e;
    this.UpdateEditV2()
  }
  handleValueChanged(event: any) {
    this.InputMaster[event.dataField]= event.value;
    this.UpdateView();
  }
  confirmDelete(){
    var p = new HRM_Branch_ENTITY();
    p.code = this.idSelect;
    p.type = 'DELETE';
    this.hRM_BranchService.hRM_Branch_Actions(p).subscribe(
      (respond: any) => {
        if(respond['status'] == '0'){
          this.showMessageSuccess(respond['message'])
          this.onSearch();
        }else
        {
          this.showMessageError(respond['message'])
        }        
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      })
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
    this.hRM_BranchService.hRM_Branch_Search(this.InputMaster).subscribe((resonse:HRM_Branch_ENTITY[])=>{
      if(resonse[0])this.InputMaster = resonse[0]
      else this.InputMaster = new HRM_Branch_ENTITY();
    },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      })
  }
}
