import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { EmployeeService, HRM_Employee_Check_In_Out_ENTITY, HRM_Employee_Check_In_Out_Warning_ENTITY } from 'src/app/shared/service-proxies/api-shared';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-face-warning',
  templateUrl: './face-warning.component.html',
  styleUrls: ['./face-warning.component.css']
})
export class FaceWarningComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    private injector: Injector,
    private employeeService:EmployeeService,
  ) {
    super(injector);
  }
  @ViewChild('dialogShow') dialogShow: DialogAcctionComponent;
  filterInput:HRM_Employee_Check_In_Out_ENTITY = new HRM_Employee_Check_In_Out_ENTITY();

  listData:any[] = [];
  itemCheckInOut:HRM_Employee_Check_In_Out_ENTITY = new HRM_Employee_Check_In_Out_ENTITY();
  img:string = '';
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
  onLoadData(){
    this.employeeService.hRM_Employee_Check_In_Out_Warning_Search(this.filterInput).subscribe(res=>{
      this.listData = res;
    })
  }
  valueStartDate(v:any,col:string){
    this.filterInput[col] = v;
    
  }
  onClickViewDetail(item:any,col:string){
    this.itemCheckInOut = item;
    this.img = item[col];
    this.dialogShow.open();
  }
  onClickChecked(){
    var param:HRM_Employee_Check_In_Out_ENTITY[] = [];
    this.listData.forEach(dt=>{
      param = [...param,...dt.list_datas];
    })
    this.employeeService.hRM_Employee_Check_In_Out_Warning_Actions('ALL-OK',param).subscribe(res=>{
      this.showMessageSuccess(res['message']);
      this.onLoadData();
    })
  }
  onClicReject(item:HRM_Employee_Check_In_Out_ENTITY){
    this.itemCheckInOut = item;
    var param:HRM_Employee_Check_In_Out_ENTITY[] = [item];
    this.employeeService.hRM_Employee_Check_In_Out_Warning_Actions('REJECT',param).subscribe(res=>{
      this.showMessageSuccess(res['message']);
    })
  }
}
