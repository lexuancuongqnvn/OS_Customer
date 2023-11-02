import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { JqgridListComponent } from 'src/app/shared/jqgrid/jqgrid-list/jqgrid-list.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { FaceAPIService, HRM_Employee_Check_In_Out_ENTITY, HRM_Project_Management_Task_Type_ENTITY } from 'src/app/shared/service-proxies/api-shared';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-setup-ready-check-in-out',
  templateUrl: './setup-ready-check-in-out.component.html',
  styleUrls: ['./setup-ready-check-in-out.component.css']
})
export class SetupReadyCheckInOutComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  isEdit:boolean = false;
  tbName: string = 'HRM_Employee_Setup_Ready_Check_In_Out';
  filterInput:HRM_Project_Management_Task_Type_ENTITY = new HRM_Project_Management_Task_Type_ENTITY();
  InputModel:HRM_Project_Management_Task_Type_ENTITY = new HRM_Project_Management_Task_Type_ENTITY();
  CurrenFrom:string = EditPageState.view;
  listModel:HRM_Employee_Check_In_Out_ENTITY[] = [];
  @ViewChild('gridList') gridList: JqgridListComponent;
  constructor(
    private injector: Injector,
    private faceAPIService:FaceAPIService
  ) {
    super(injector);
  }
  onClickAcction(id: number, storedName: string, param: string, keyService: string, classForm: string): void {
    throw new Error('Method not implemented.');
  }

  onSelect(v:any,col:string){
    this.InputModel[col] = v;
  }
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
  getDataByID(storedName: string, param: string, keyService: string): void {
    throw new Error('Method not implemented.');
  }
  SetupAll(employee_code:string = ''):void{
    this.BlockUI('Quá trình này sẽ diễn ra vài phút...');

    this.faceAPIService.hRM_Employee_Setup_Ready_Check_In_Out({...new HRM_Employee_Check_In_Out_ENTITY(),employee_code:employee_code} as HRM_Employee_Check_In_Out_ENTITY).subscribe(res=>{
      this.listModel = res;
      this.UnBlockUI();
    })
  }
  ngOnInit(): void {
    this.faceAPIService.hRM_Employee_Ready_Check_In_Out(new HRM_Employee_Check_In_Out_ENTITY()).subscribe(res=>{
      this.listModel = res;
    })
  }

}
