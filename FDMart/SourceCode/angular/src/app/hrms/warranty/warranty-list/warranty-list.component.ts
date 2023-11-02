import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppConsts } from 'src/app/app-consts.component';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { JqgridListComponent } from 'src/app/shared/jqgrid/jqgrid-list/jqgrid-list.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { InputSelectComponentV2 } from 'src/app/shared/layout/input-control-simple/input-select-v2/input-select-v2.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { WarrantyService, Warranty_Laptop_ENTITY } from 'src/app/shared/service-proxies/api-shared';
import { AlertMessageComponent } from 'src/app/shared/sidenav/alert-message/alert-message.component';
import { SidenavAddEditComponent } from 'src/app/shared/sidenav/sidenav-add-edit/sidenav-add-edit.component';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-warranty-list',
  templateUrl: './warranty-list.component.html',
  styleUrls: ['./warranty-list.component.css']
})
export class WarrantyListComponent  extends LayoutComponentBase  implements OnInit, IUiAction<any>
{
  constructor(
    private injector: Injector,
    private appSession: AppSession,
    private warrantyService:WarrantyService,
  ) {
    super(injector);
    if(location.pathname == '/warranty-warehouse-list') this.filterInput.type='warehouse'
    else if(location.pathname == '/warranty-customer-list')  this.filterInput.type='customer'
    else this.filterInput.type = '-'
    this.filterInput.template_report = 'CUSTOMER';
  }
  tbName: string = 'Warranty_Laptop_List';
  filterInput:Warranty_Laptop_ENTITY = new Warranty_Laptop_ENTITY();
  InputModel:Warranty_Laptop_ENTITY = new Warranty_Laptop_ENTITY();
  CurrenFrom:string = EditPageState.view;
  
  warranty_type:any[] = [
    {
      code:'SC',
      name:'Sửa chữa'
    },
    {
      code:'BH',
      name:'Bảo hành'
    }
  ]
  list_template_report:any[] = [
    {
      code:'CUSTOMER',
      name:'khách hàng'
    },
    {
      code:'MODEL',
      name:'Model'
    }
  ]
  isEdit: boolean = false;
  @ViewChild('gridList') gridList: JqgridListComponent;
  @ViewChild('sidenavAddEdit') sidenavAddEdit: SidenavAddEditComponent;
  @ViewChild('dialogDelete') dialogDelete: DialogAcctionComponent;
  @ViewChild('dialogChooseTemplate') dialogChooseTemplate: DialogAcctionComponent;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  @ViewChild('toolbarEdit') toolbarEdit: ToolbarComponent;
  @ViewChild('alertMessage') alertMessage: AlertMessageComponent;
  @ViewChild('SelectWarrantyPicker') SelectWarrantyPicker: InputSelectComponentV2;
  @ViewChild('SelectTemplateReportPicker') SelectTemplateReportPicker: InputSelectComponentV2;
  col_model: any[] = [
    { label: 'Mã', name: 'code', key: true, width: 10 , hidden: true},
    { label: 'SCT', name: 'doc_number', width: 5 },
    { label: 'Ngày tạo CT', name: 'doc_date_f', width: 10 },
    { label: 'Tình trạng BH', name: 'expiry_task_name', width: 10 }, 
    { label: 'Tên Khách hàng/NV', name: 'customer_name', width: 10 },
    { label: 'Số điện thoại', name: 'customer_phone', width: 10 },
    { label: 'Người liên hệ', name: 'customer_name_contact_phone', width: 10 },
    { label: 'Model', name: 'des_model', width: 7 },
    { label: 'CPU', name: 'des_cpu', width: 5 },
    { label: 'RAM', name: 'des_ram', width: 5 },
    { label: 'HDD', name: 'des_hdd', width: 5 },
    { label: 'SSD', name: 'des_ssd', width: 5 },
    { label: 'Pin', name: 'des_is_battery_f', width: 5 },
    { label: 'Sạc', name: 'des_is_charger_f', width: 5 },
    { label: 'Khác', name: 'des_notes', width: 7 },
    { label: 'Số Sevice tag', name: 'des_sevice_tag', width: 10 },
    { label: 'Mật khẩu HĐH', name: 'des_password', width: 10 },
    { label: 'Mật khẩu Bios', name: 'des_password_bios', width: 10 },
    { label: 'Tình Trạng máy', name: 'machine_status', width: 15 },
    { label: 'Ngày bán', name: 'sell_date_f', width: 10 },
    { label: 'Chế độ BH/SC', name: 'warranty_type', width: 10 },
    { label: 'Ngày trả', name: 'customer_return_date_f', width: 10 },
    { label: 'Phần note kế toán', name: 'accounting_notes', width: 15 }
    
  ];
  get disabled():boolean{
    return this.getCurrenFrom == EditPageState.viewDetail;
  }
  onFilter(v:any,col:string){
    this.filterInput[col] = v;
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
  onClickAcction(
    id: number,
    storedName: string,
    param: string,
    keyService: string,
    classForm: string
  ): void {
    switch (classForm) {
      case 'ExportWarrantyReport':{
        this.dialogChooseTemplate.open();
        setTimeout(() => {
          this.SelectTemplateReportPicker.renderSelectPicker();
          this.SelectTemplateReportPicker.value = this.filterInput.template_report;
          this.SelectTemplateReportPicker.setList(this.list_template_report);
        }, 100);
        break;
      }
      case EditPageState.add: {
        break;
      }
      case EditPageState.edit: {
        this.isEdit = true;
        this.filterInput = new Warranty_Laptop_ENTITY();
        this.filterInput.code = this.idSelect;
        this.filterInput.path = location.pathname
        this.warrantyService.warranty_Laptop_Search(this.filterInput).subscribe((res:Warranty_Laptop_ENTITY[])=>{
          this.InputModel = res[0];
          this.sidenavAddEdit.title = 'Chỉnh sửa ';
          setTimeout(() => {
            this.toolbarEdit.setUiAction(this);
          }, 200);
          this.sidenavAddEdit.open();
          this.SelectWarrantyPicker.setList(this.warranty_type);
        })
        break;
      }
      case EditPageState.delete: {
        this.dialogDelete.open();
        break;
      }
      case EditPageState.save: {
     
        this.BlockUI();
        if (!this.InputModel.code) {

        } else {
          this.InputModel.type = 'UPDATE';
          this.InputModel.path = location.pathname
          this.warrantyService.warranty_Laptop_Update(this.InputModel).subscribe(
            (respond: any) => {
              if(respond['status'] == '0'){
                this.showMessageSuccess(respond['message']);
                this.sidenavAddEdit.close();
                this.filterInput = new Warranty_Laptop_ENTITY();
                this.LoadData();
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
        }

        break;
      }
      case EditPageState.search: {
        this.LoadData();
        break;
      }
      case EditPageState.viewDetail: {
        this.BlockUI();
        this.isEdit = true;
        var pr = new Warranty_Laptop_ENTITY();
        pr.code = this.idSelect;
        pr.path = location.pathname;
        this.warrantyService.warranty_Laptop_Search(pr)
          .subscribe(
            (res) => {
              this.InputModel = res[0];
              this.sidenavAddEdit.title = 'Chỉnh sửa ';
              setTimeout(() => {
                this.toolbarEdit.setUiAction(this);
              }, 200);
              this.sidenavAddEdit.open();
              this.SelectWarrantyPicker.setList(this.warranty_type);
            },
            (err) => {
              if (err.status == 401) {
                this.Respond401();
              }
            },
            () => {
              this.UnBlockUI();
            }
          );
        break;
      }
     
      default:
        break;
    }
  }
  getDataByID(storedName: string, param: string, keyService: string): void {
    throw new Error('Method not implemented.');
  }
  onSelectType(v:any,col:string){
    this.filterInput[col] = v;
    this.LoadData();
  }
  onSelect(v:any,col:string){
    this.InputModel[col] = v;
  }
  valueStartDate(v:any,col:string){
    this.filterInput[col] = v;
  }
  LoadData() {
    this.BlockUI();
    this.filterInput.user_login = this.appSession.user.code;
    this.warrantyService.warranty_Laptop_Search(this.filterInput).subscribe(
      (data: any) => {
        this.gridList.setData(data,this.col_model,this.tbName);
        this.UpdateView();
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
  }
  confirmDelete() {
    this.BlockUI();
    this.UpdateView();
  }
  confirmChooseTemplate() {
    this.BlockUI('Loading data...');
      this.warrantyService.warranty_Report_Laptop_Search(this.filterInput).subscribe(res=>{
        if(res['status'] == 0) window.open(AppConsts.baseUrl+res.link_file, "_blank");
        else this.showMessageError(res.message)
        this.UnBlockUI();
      },
      (err) => {
          if (err.status == 401) {
            this.Respond401();
          }
      },
      () => {
        this.UnBlockUI();
      })
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
