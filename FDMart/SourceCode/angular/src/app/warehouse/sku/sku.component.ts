import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { timeStamp } from 'console';
import { JqgridEditComponent } from 'src/app/shared/jqgrid/jqgrid-edit/jqgrid-edit.component';
import { JqgridListComponent } from 'src/app/shared/jqgrid/jqgrid-list/jqgrid-list.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { InputSelectComponentV2 } from 'src/app/shared/layout/input-control-simple/input-select-v2/input-select-v2.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { POS_Product_Color_ENTITY, POS_Product_Size_ENTITY, ProductService, ReferenceService, WarehouseService, WMS_Warehouse_ENTITY, WMS_Warehouse_SKU_ENTITY } from 'src/app/shared/service-proxies/api-shared';
import { SidenavAddEditComponent } from 'src/app/shared/sidenav/sidenav-add-edit/sidenav-add-edit.component';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-sku',
  templateUrl: './sku.component.html',
  styleUrls: ['./sku.component.css']
})
export class SkuComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  @ViewChild('gridMenuList') gridMenuList: JqgridListComponent;
  @ViewChild('gridMenuEdit') gridMenuEdit: JqgridEditComponent<WMS_Warehouse_SKU_ENTITY>;
  @ViewChild('dialogDelete') dialogDelete: DialogAcctionComponent;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  @ViewChild('toolbarEdit') toolbarEdit: ToolbarComponent;
  @ViewChild('sidenavAddEdit') sidenavAddEdit: SidenavAddEditComponent;
  @ViewChild('SelectGroupPicker') SelectGroupPicker: InputSelectComponentV2;
  @ViewChild('dialogAddColor') dialogAddColor: DialogAcctionComponent;
  @ViewChild('dialogAddSize') dialogAddSize: DialogAcctionComponent;
  @ViewChild('SelectColortPicker') SelectColortPicker: InputSelectComponentV2;
  @ViewChild('SelectSizeCodePicker') SelectSizeCodePicker: InputSelectComponentV2;
  @ViewChild('SelectWarehpusetPicker') SelectWarehpusetPicker: InputSelectComponentV2;

  tbName: string = 'WMS_Warehouse_SKU';
  CurrenFrom:string = EditPageState.view;
  InputMaster: WMS_Warehouse_SKU_ENTITY[] = [];
  InputModel: WMS_Warehouse_SKU_ENTITY = new WMS_Warehouse_SKU_ENTITY();
  filterInput:WMS_Warehouse_SKU_ENTITY = new WMS_Warehouse_SKU_ENTITY();
  isEdit:boolean = false;
  ColorModel:POS_Product_Color_ENTITY = new POS_Product_Color_ENTITY();
  SizeModel:POS_Product_Size_ENTITY = new POS_Product_Size_ENTITY();
  listColor:POS_Product_Color_ENTITY[] = [];
  listSize:POS_Product_Size_ENTITY[] = [];
  listWarehouse:WMS_Warehouse_ENTITY[]=[];
  col_model:any[] = [
    { label: 'Mã', name: 'code', key: true, width: 10 , hidden: true},
    { label: 'Mã SKU', name: 'sku', width: 25 },
    { label: 'Thương hiệu', name: 'notes_brand', width: 15 },
    { label: 'Mô tả', name: 'notes_description', width: 15 },
    { label: 'Ngày nhập kho', name: 'notes_time_f', width: 15 },
    { label: 'Kho nhập', name: 'notes_warehouse_name', width: 15 },
    { label: 'Size', name: 'notes_size', width: 15 },
    { label: 'Màu sắc', name: 'notes_color', width: 15 }
  ]
  constructor(
    private injector: Injector,
    private referenceService: ReferenceService,
    private warehouseService:WarehouseService,
    private productService:ProductService
  ) {
    super(injector);
  }
  AddColor(){
    this.dialogAddColor.open();
  }
  confirmAddColor(){
    
    this.ColorModel.type = 'INSERT';
      this.productService.pOS_Product_Color_Actions(this.ColorModel).subscribe((respond)=>{
        if(respond['status'] == '0')
        {
          this.showMessageSuccess(respond['message']);
          this.initCombobox_Color();
        }else
          this.showMessageError(respond['message']);
        this.UpdateView();
      },
      (err) => {
          if (err.status == 401) {
            this.Respond401();
          }
      },
      () => {
        this.UnBlockUI();
      });
  }
  AddSize(){
    this.dialogAddSize.open();
  }
  confirmAddSize(){
    this.SizeModel.type = 'INSERT';
    this.productService.pOS_Product_Size_Actions(this.SizeModel).subscribe((respond)=>{
      if(respond['status'] == '0')
      {
        this.showMessageSuccess(respond['message']);
        this.initCombobox_Size();
      }else
        this.showMessageError(respond['message']);
      this.UpdateView();
    },
    (err) => {
        if (err.status == 401) {
          this.Respond401();
        }
    },
    () => {
      this.UnBlockUI();
    });
  }
  onKeyup(v:any,col:string):void{
    if(col == 'notes_brand'){
      this.InputModel.symbol_brand = '';
      for(var i=0;i<(v.currentTarget.value.length>4?4:v.currentTarget.value.length);i++)this.InputModel.symbol_brand += v.currentTarget.value[i].toUpperCase();
    }
    if(col == 'notes_description'){
      this.InputModel.symbol_description = '';
      for(var i=0;i<(v.currentTarget.value.length>4?4:v.currentTarget.value.length);i++)this.InputModel.symbol_description += v.currentTarget.value[i].toUpperCase();
    }
    this.updateSKU();
  }
  updateSKU(){
    this.InputModel.sku = ((this.InputModel.symbol_brand)?this.InputModel.symbol_brand:'')+
    '-'+((this.InputModel.symbol_description)?this.InputModel.symbol_description:'')+
    '-'+((this.InputModel.symbol_time)?this.InputModel.symbol_time:'')+
    '-'+((this.InputModel.symbol_warehouse)?this.InputModel.symbol_warehouse:'')+
    '-'+((this.InputModel.symbol_size)?this.InputModel.symbol_size:'')+
    '-'+((this.InputModel.symbol_color)?this.InputModel.symbol_color:'');
    this.UpdateView();
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
  onClickAcction(id: number, storedName: string, param: string, keyService: string, classForm: string): void {
    switch(classForm){
      case EditPageState.add:{
        this.isEdit = true;
        this.InputModel = new WMS_Warehouse_SKU_ENTITY();
        setTimeout(() => {
          this.sidenavAddEdit.title = "Thêm sku";
          this.initCombobox();
          this.initCombobox_Color();
          this.initCombobox_Size();
          this.sidenavAddEdit.open();
          this.toolbarEdit.setUiAction(this);
          this.UpdateView();
        }, 100);
        break;
      }
      case EditPageState.edit:{
        this.isEdit = true;
        this.filterInput.type = 'BYCODE';
        this.filterInput.code =  this.idSelect;
        this.warehouseService.wMS_Warehouse_SKU_Search(this.filterInput).subscribe((respond)=>{
          this.InputModel = respond[0];
          this.sidenavAddEdit.title = "Sửa sku";
          this.initCombobox();
          this.initCombobox_Color();
          this.initCombobox_Size();
          this.sidenavAddEdit.open();
          this.toolbarEdit.setUiAction(this);
          this.UpdateView();
        },
        (err) => {
            if (err.status == 401) {
              this.Respond401();
            }
        },
        () => {
          this.UnBlockUI();
        });
        // this.navigatePassParam('/menu-edit', { code: this.idSelect }, { filterInput: JSON.stringify(this.InputMaster) });
        break;
      }
      case EditPageState.delete:{
        this.dialogDelete.open();
        
        break;
      }
      case EditPageState.save:{
        if(!this.InputModel.code){
          this.InputModel.type = 'INSERT';
          this.warehouseService.wMS_Warehouse_SKU_Actions(this.InputModel).subscribe((respond)=>{
            if(respond['status'] == '0')
            {
              this.showMessageSuccess(respond['message']);
              this.sidenavAddEdit.close();
            }else
              this.showMessageError(respond['message']);
            this.UpdateView();
          },
          (err) => {
              if (err.status == 401) {
                this.Respond401();
              }
          },
          () => {
            this.UnBlockUI();
          });
        }else{
          this.InputModel.type = 'UPDATE';
          this.warehouseService.wMS_Warehouse_SKU_Actions(this.InputModel).subscribe((respond)=>{
            if(respond['status'] == '0')
            {
              this.showMessageSuccess(respond['message']);
              this.sidenavAddEdit.close();
              this.LoadData();
            }else
              this.showMessageError(respond['message']);
            
            this.UpdateView();
          },
          (err) => {
              if (err.status == 401) {
                this.Respond401();
              }
          },
          () => {
            this.UnBlockUI();
          });
        }
        
        break;
      }
      case EditPageState.search:{
        this.LoadData();
        break;
      }
      case EditPageState.viewDetail:{

        break;
      }
      default:break;
    }
  }
  
  getDataByID(storedName: string, param: string, keyService: string): void {
    throw new Error('Method not implemented.');
  }
  
  ngOnInit(): void {
    this.setAcction();
    
  }
  initCombobox_Color(){
    this.productService.pOS_Product_Color_Search(new POS_Product_Color_ENTITY()).subscribe((respond:any)=>{
      this.listColor = respond;
      this.SelectColortPicker.value = this.InputModel.notes_color;
      this.SelectColortPicker.setList(this.listColor);
    })
  }
  initCombobox_Size(){
    this.productService.pOS_Product_Size_Search(new POS_Product_Size_ENTITY()).subscribe((respond:any)=>{
      this.listSize = respond;
      this.SelectSizeCodePicker.value = this.InputModel.notes_size;
      this.SelectSizeCodePicker.setList(this.listSize);
    })
  }
  initCombobox(){
    this.warehouseService.wMS_Warehouse_Search(new WMS_Warehouse_ENTITY()).subscribe(
      (data: any) => {
        this.listWarehouse=data;
        this.SelectWarehpusetPicker.setList(this.listWarehouse);
        this.UpdateView();
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
        //isloading = true
      }
    )
  }
  onSelect(v:any,col){
    if(col == 'notes_warehouse'){
      this.InputModel.symbol_warehouse = this.listWarehouse.find(e=>e.code==v).symbol.toUpperCase();
    }
    if(col == 'notes_size')
    {
      this.InputModel.symbol_size = this.listSize.find(e=>e.code==v).symbol.toUpperCase();
    }
    if(col == 'notes_color')this.InputModel.symbol_color = this.listColor.find(e=>e.code==v).symbol.toUpperCase();
    if(col == 'notes_time'){
      this.InputModel.notes_time = v;
      this.InputModel.symbol_time = (v.dates().toString()+(v.month()+1).toString()+v.years().toString()[2]+v.years().toString()[3]);
      for(var i=0;i<(v.length>4?4:v.length);i++)this.InputModel.notes_warehouse += v[i].toUpperCase();
    }
    this.updateSKU();
  }
  setAcction(){
    if(this.toolbar){
       this.toolbar.setUiAction(this);
    }
    else
      setTimeout(() => {
        this.setAcction();
      }, 50);
  }
  confirmDelete() {
    this.InputModel.type = 'DELETE';
        this.InputModel.code = this.idSelect;
        this.warehouseService.wMS_Warehouse_SKU_Actions(this.InputModel).subscribe((respond)=>{
          if(respond['status'] == '0')
          {
            this.showMessageSuccess(respond['message']);
            this.LoadData();
            this.sidenavAddEdit.close();
          }else
            this.showMessageError(respond['message']);
          this.UpdateView();
        },
        (err) => {
            if (err.status == 401) {
              this.Respond401();
            }
        },
        () => {
          this.UnBlockUI();
        });
  }
  LoadData() {
    this.BlockUI();
    this.filterInput.type = 'ALL';
    this.filterInput.code = null;
    this.warehouseService.wMS_Warehouse_SKU_Search(this.filterInput).subscribe(
      (data: any) => {
        this.InputMaster = data;
        data.forEach(element => {
          this.InputMaster.forEach(element2 => {
            if(element['code'] == element2['code_master'])
              element2['name_master'] = element['name'];  
          });
        });
        this.gridMenuList.setData(this.InputMaster,this.col_model,this.tbName)
        this.UpdateView();
        this.UnBlockUI();
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
  }

}
