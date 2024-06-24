import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { JqgridListComponent } from 'src/app/shared/jqgrid/jqgrid-list/jqgrid-list.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { HRM_BranchService, HRM_Branch_ENTITY, TimeSheetService } from 'src/app/shared/service-proxies/api-shared';
import { AlertMessageComponent } from 'src/app/shared/sidenav/alert-message/alert-message.component';
import { SidenavAddEditComponent } from 'src/app/shared/sidenav/sidenav-add-edit/sidenav-add-edit.component';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent  extends LayoutComponentBase implements OnInit, IUiAction<any> {

  isEdit:boolean = false;
  tbName: string = 'HRM_Branch';
  filterInput:HRM_Branch_ENTITY = new HRM_Branch_ENTITY();
  InputModel:HRM_Branch_ENTITY = new HRM_Branch_ENTITY();
  CurrenFrom:string = EditPageState.view;
  listDepartment:HRM_Branch_ENTITY[] = [];
  @ViewChild('dialogDelete') dialogDelete: DialogAcctionComponent;
  @ViewChild('dialogEdit') dialogEdit: DialogAcctionComponent;
  @ViewChild('dialogAdd') dialogAdd: DialogAcctionComponent;
  @ViewChild('gridList') gridList: JqgridListComponent;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  @ViewChild('alertMessage') alertMessage: AlertMessageComponent;
  @ViewChild('sidenavAddEdit') sidenavAddEdit: SidenavAddEditComponent;
  @ViewChild('toolbarEdit') toolbarEdit: ToolbarComponent;
  constructor(
    private injector: Injector,
    private hRM_BranchService: HRM_BranchService,
  ) {
    super(injector);
  }
  col_model:any[] = [
    { label: 'Mã', name: 'code', key: true, width: 10 , hidden: true},
    { label: 'Tên', name: 'name', width: 25 },
    { label: 'latitude', name: 'lat', width: 10 },
    { label: 'longitude', name: 'long', width: 10 }
  ]
  latitude: number=0;
  longitude: number=0;
  setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.InputModel.lat = this.latitude;
        this.InputModel.long = this.longitude;
        document.getElementById('iframe-map')['src'] ='https://maps.google.com/maps?q='+this.latitude+','+this.longitude+'&z=15&output=embed';
      });
    }
  }
  valueStartDate(e:any,col:string){
    this.InputModel[col] = e;
  }
  confirmDelete() {
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
  onSelect(v:any,col:string){
    this.InputModel[col] = v;
  }
  onAdd(): void {
    this.setCurrentLocation();
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
  valueUpload(v:any,col:string){
    this.InputModel[col] = v;
    this.UpdateView();
  }
  onClickAcction(id: number, storedName: string, param: string, keyService: string, classForm: string): void {
    switch(classForm){
      case EditPageState.add:{
        this.isEdit = true;
        this.InputModel =  new HRM_Branch_ENTITY();
        setTimeout(() => {
          this.sidenavAddEdit.title = 'Thêm mới chi nhánh';
          this.sidenavAddEdit.open();
          this.toolbarEdit.setUiAction(this);
        }, 100);
        break;
      }
      case EditPageState.edit:{
        this.isEdit = true;
        var p1 = new HRM_Branch_ENTITY();
        p1.code = this.idSelect;
        this.hRM_BranchService.hRM_Branch_Search(p1).subscribe(
          (data: any) => {
            this.InputModel = data[0];
            this.sidenavAddEdit.title = 'Chỉnh sửa chi nhánh';
            this.toolbarEdit.setUiAction(this);
            this.sidenavAddEdit.open();
            this.UpdateView();
          },
          (err) => this.UnBlockUI(),
          () => {
            this.UnBlockUI();
          }
        )
       
        break;
      }
      case EditPageState.delete:{
        this.dialogDelete.open();
        break;
      }
      case EditPageState.save:{
        if(!this.InputModel.code){
          this.InputModel.type = 'INSERT';
          this.InputModel.id = -1;
          this.hRM_BranchService.hRM_Branch_Actions(this.InputModel).subscribe(
            (respond: any) => {
              if(respond['status'] == '0'){
                this.showMessageSuccess(respond['message'])
                this.InputModel.code = respond['ref_code'];
                this.sidenavAddEdit.close();
                this.onSearch();
              }else
              {
                this.alertMessage.AlertError(respond['message'])
              }        
            },
            (err) => this.UnBlockUI(),
            () => {
              this.UnBlockUI();
            })
          this.UpdateView();
        }else{
          this.InputModel.type = 'UPDATE';
          this.hRM_BranchService.hRM_Branch_Actions(this.InputModel).subscribe(
            (respond: any) => {
              if(respond['status'] == '0'){
                this.showMessageSuccess(respond['message']);
                this.sidenavAddEdit.close();
                this.UpdateView();
              }else
              {
                this.alertMessage.AlertError(respond['message'])
              }        
            },
            (err) => this.UnBlockUI(),
            () => {
              this.UnBlockUI();
            })
          this.UpdateView();
        }
        break;
      }
      case EditPageState.search:{
        this.LoadData();
        break;
      }
      case EditPageState.viewDetail:{
        this.isEdit = true;
        var p1 = new HRM_Branch_ENTITY();
        p1.code = this.idSelect;
        this.hRM_BranchService.hRM_Branch_Actions(p1).subscribe(
          (data: any) => {
            this.InputModel = data[0];
            this.sidenavAddEdit.title = 'Chi tiết chi nhánh';
            this.sidenavAddEdit.open();
            this.toolbarEdit.setUiAction(this);
            this.UpdateView();
          },
          (err) => this.UnBlockUI(),
          () => {
            this.UnBlockUI();
          }
        )
        break;
      }
      default:break;
    }
  }
  getDataByID(storedName: string, param: string, keyService: string): void {
    throw new Error('Method not implemented.');
  }
  LoadData(){
    this.BlockUI();
    var p1 = new HRM_Branch_ENTITY();
    this.hRM_BranchService.hRM_Branch_Search(p1).subscribe(
      (data: any) => {
        this.gridList.setData(data,this.col_model,this.tbName)
        this.UpdateView();
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
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
    this.LoadData();
   
  }

}
