import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { data } from 'jquery';
import { JqgridEditComponent } from 'src/app/shared/jqgrid/jqgrid-edit/jqgrid-edit.component';
import { JqgridListComponent } from 'src/app/shared/jqgrid/jqgrid-list/jqgrid-list.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { InputFilepickerComponent } from 'src/app/shared/layout/input-control-simple/input-filepicker/input-filepicker.component';
import { InputSelectComponentV2 } from 'src/app/shared/layout/input-control-simple/input-select-v2/input-select-v2.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { AccountService, AcctionService, POS_Product_Color_ENTITY, POS_Product_ENTITY, POS_Product_Group_ENTITY, POS_Product_Size_ENTITY, POS_Product_Unit_ENTITY, ProductService, ReferenceService } from 'src/app/shared/service-proxies/api-shared';
import { SidenavAddEditComponent } from 'src/app/shared/sidenav/sidenav-add-edit/sidenav-add-edit.component';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    private injector: Injector,
    private acctionService: AcctionService,
    private accountService: AccountService,
    private referenceService: ReferenceService,
    private productService:ProductService
  ) {
    super(injector);
  }
  @ViewChild('gridMenuList') gridMenuList: JqgridListComponent;
  @ViewChild('gridMenuEdit') gridMenuEdit: JqgridEditComponent<POS_Product_ENTITY>;
  @ViewChild('dialogDelete') dialogDelete: DialogAcctionComponent;
  @ViewChild('dialogAddGroup') dialogAddGroup: DialogAcctionComponent;
  @ViewChild('dialogAddUnit') dialogAddUnit: DialogAcctionComponent;
  @ViewChild('dialogAddColor') dialogAddColor: DialogAcctionComponent;
  @ViewChild('dialogAddSize') dialogAddSize: DialogAcctionComponent;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  @ViewChild('toolbarEdit') toolbarEdit: ToolbarComponent;
  @ViewChild('sidenavAddEdit') sidenavAddEdit: SidenavAddEditComponent;
  @ViewChild('SelectGroupPicker') SelectGroupPicker: InputSelectComponentV2;
  @ViewChild('SelectAddGroupPicker') SelectAddGroupPicker: InputSelectComponentV2;
  @ViewChild('SelectUnitPicker') SelectUnitPicker: InputSelectComponentV2;
  @ViewChild('SelectBusinessStatusPicker') SelectBusinessStatusPicker: InputSelectComponentV2;
  @ViewChild('SelectColortPicker') SelectColortPicker: InputSelectComponentV2;
  @ViewChild('SelectSizeCodePicker') SelectSizeCodePicker: InputSelectComponentV2;
  tbName: string = 'POS_Product';
  CurrenFrom:string = EditPageState.view;
  InputMaster: POS_Product_ENTITY[] = [];
  InputModel: POS_Product_ENTITY = new POS_Product_ENTITY();
  filterInput:POS_Product_ENTITY = new POS_Product_ENTITY();
  GroupModel:POS_Product_Group_ENTITY = new POS_Product_Group_ENTITY();
  UnitModel:POS_Product_Unit_ENTITY = new POS_Product_Unit_ENTITY();
  ColorModel:POS_Product_Color_ENTITY = new POS_Product_Color_ENTITY();
  SizeModel:POS_Product_Size_ENTITY = new POS_Product_Size_ENTITY();
  isEdit:boolean = false;
  listGroup:POS_Product_Group_ENTITY[] = [];
  listUnit:POS_Product_Unit_ENTITY[] = [];
  listColor:POS_Product_Color_ENTITY[] = [];
  listSize:POS_Product_Size_ENTITY[] = [];
  listimages:string[] = [];
  listBusinessStatus:any[]=[
    {
      code:'stoped',
      name:'Ngừng kinh doanh'
    },{
      code:'runing',
      name:'Đang kinh doanh'
    }
  ]
  col_model:any[] = [
    { label: 'Mã', name: 'code', key: true, width: 10 , hidden: true},
    { label: 'Tên sản phẩm', name: 'name', width: 15 },
    { label: 'Thuộc nhóm', name: 'group_code_name', width: 15 },
    { label: 'Mã SKU', name: 'sku_code', width: 15 },
    { label: 'Barcode', name: 'barcode', width: 15 },
    { label: 'Giá mua', name: 'purchase_price_f', width: 15 },
    { label: 'Giá bán', name: 'price_f', width: 15 },
    { label: 'Đơn vị', name: 'unit_code_name', width: 15 },
    { label: 'Tình trạng kinh doanh', name: 'bussiness_status', width: 15 },
    { label: 'Size', name: 'size_code', width: 15 , hidden: true},
    { label: 'Trọng lượng', name: 'weight', width: 15 },
    { label: 'Vị trí kho', name: 'warehouse_location', width: 15 }
  ]
  

  name = 'Mô tả sản phẩm';
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '40rem',
    minHeight: '15rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
  };

  AddGroup(){
    this.dialogAddGroup.open();
    setTimeout(() => {
      this.SelectAddGroupPicker.renderSelectPicker();
      this.SelectAddGroupPicker.setList(this.listGroup);
    }, 100);
  }
  confirmAddGroup(){
    this.GroupModel.type = 'INSERT';
    this.productService.pOS_Product_Group_Actions(this.GroupModel).subscribe((respond)=>{
      if(respond['status'] == '0')
      {
        this.showMessageSuccess(respond['message']);
        this.initCombobox_Group();
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
  AddUnit(){
    this.dialogAddUnit.open();
  }
  confirmAddUnit(){
    this.UnitModel.type = 'INSERT';
      this.productService.pOS_Product_Unit_Actions(this.UnitModel).subscribe((respond)=>{
        if(respond['status'] == '0')
        {
          this.showMessageSuccess(respond['message']);
          this.initCombobox_Unit();
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
        this.listimages = [];
        this.InputModel = new POS_Product_ENTITY();
        setTimeout(() => {
          this.sidenavAddEdit.title = "Thêm mới sản phẩm";
          this.sidenavAddEdit.open();
          this.toolbarEdit.setUiAction(this);
          this.initCombobox();
          this.UpdateView();
        }, 100);
        break;
      }
      case EditPageState.edit:{
        this.isEdit = true;
        this.filterInput.type = 'SEARCH';
        this.filterInput.code =  this.idSelect;
        this.productService.pOS_Product_Search(this.filterInput).subscribe(async (respond)=>{
          this.InputModel = respond[0];
          if(this.InputModel.business_status) this.InputModel['business_status_code']="runing"
          else this.InputModel['business_status_code']="stoped"
          this.listimages = this.InputModel.images.split(';');
          this.sidenavAddEdit.open();
          this.toolbarEdit.setUiAction(this);
          this.initCombobox();
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
          this.productService.pOS_Product_Insert(this.InputModel).subscribe((respond)=>{
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
          this.productService.pOS_Product_Update(this.InputModel).subscribe((respond)=>{
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
  initCombobox_Group(){
    this.productService.pOS_Product_Group_Search(new POS_Product_Group_ENTITY()).subscribe((respond:any)=>{
      this.listGroup = respond;
      this.SelectGroupPicker.value = this.InputModel.group_code;
      this.SelectGroupPicker.setList(this.listGroup);
    })
  }
  initCombobox_Unit(){
    this.productService.pOS_Product_Unit_Search(new POS_Product_Unit_ENTITY()).subscribe((respond:any)=>{
      this.listUnit = respond;
      this.SelectUnitPicker.value = this.InputModel.unit_code;
      this.SelectUnitPicker.setList(this.listUnit);
    })
  }
  initCombobox_Color(){
    this.productService.pOS_Product_Color_Search(new POS_Product_Color_ENTITY()).subscribe((respond:any)=>{
      this.listColor = respond;
      this.SelectColortPicker.value = this.InputModel.color_code;
      this.SelectColortPicker.setList(this.listColor);
    })
  }
  initCombobox_Size(){
    this.productService.pOS_Product_Size_Search(new POS_Product_Size_ENTITY()).subscribe((respond:any)=>{
      this.listSize = respond;
      this.SelectSizeCodePicker.value = this.InputModel.size_code;
      this.SelectSizeCodePicker.setList(this.listSize);
    })
  }
  initCombobox(){
    this.initCombobox_Group();
    this.initCombobox_Unit();
    this.initCombobox_Color();
    this.initCombobox_Size();
    this.SelectBusinessStatusPicker.value=this.InputModel['business_status_code'];
    this.SelectBusinessStatusPicker.setList(this.listBusinessStatus);
  }
  onSelectGroup(v:any){
    
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
        this.productService.pOS_Product_Delete(this.idSelect).subscribe((respond)=>{
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
    this.filterInput.code = null;
    this.productService.pOS_Product_Search(this.filterInput).subscribe(
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
  onSelect(v:any,col:string){
    if(col == 'group_code') this.InputModel.group_code = v;
    if(col == 'unit_code')this.InputModel.unit_code = v;
    if(col == 'business_status_code'){
      if(v == "stoped")
        this.InputModel.business_status = false;
      else
        this.InputModel.business_status = true;
    }
    if(col == 'color_code')this.InputModel.color_code = v;
    if(col == 'size_code')this.InputModel.size_code = v;
  }
  onChangeValueFile(url:string,colName:string){
    if(colName == 'avartar') this.InputModel.avartar = url;
    if(colName == 'images')this.InputModel.images = url;
    this.listimages = this.InputModel.images.split(';');
    this.UpdateView();
  }
  onChangeValueMoney(v:any,colName:string){
    if(colName == 'purchase_price') this.InputModel.purchase_price = v;
    if(colName == 'price')this.InputModel.price = v;
    this.UpdateView();
  }
}
