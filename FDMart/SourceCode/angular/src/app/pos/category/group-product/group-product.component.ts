import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { JqgridEditComponent } from 'src/app/shared/jqgrid/jqgrid-edit/jqgrid-edit.component';
import { JqgridListComponent } from 'src/app/shared/jqgrid/jqgrid-list/jqgrid-list.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { InputSelectComponentV2 } from 'src/app/shared/layout/input-control-simple/input-select-v2/input-select-v2.component';
import { InputSelectComponent } from 'src/app/shared/layout/input-control-simple/input-select/input-select.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { AccountService, AcctionService, POS_Product_Group_ENTITY, ProductService, ReferenceService } from 'src/app/shared/service-proxies/api-shared';
import { SidenavAddEditComponent } from 'src/app/shared/sidenav/sidenav-add-edit/sidenav-add-edit.component';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-group-product',
  templateUrl: './group-product.component.html',
  styleUrls: ['./group-product.component.css']
})
export class GroupProductComponent  extends LayoutComponentBase implements OnInit, IUiAction<any> {

  @ViewChild('gridMenuList') gridMenuList: JqgridListComponent;
  @ViewChild('gridMenuEdit') gridMenuEdit: JqgridEditComponent<POS_Product_Group_ENTITY>;
  @ViewChild('dialogDelete') dialogDelete: DialogAcctionComponent;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  @ViewChild('toolbarEdit') toolbarEdit: ToolbarComponent;
  @ViewChild('sidenavAddEdit') sidenavAddEdit: SidenavAddEditComponent;
  @ViewChild('SelectGroupPicker') SelectGroupPicker: InputSelectComponentV2;
  
  tbName: string = 'POS_Product_Group';
  CurrenFrom:string = EditPageState.view;
  InputMaster: POS_Product_Group_ENTITY[] = [];
  InputModel: POS_Product_Group_ENTITY = new POS_Product_Group_ENTITY();
  filterInput:POS_Product_Group_ENTITY = new POS_Product_Group_ENTITY();
  isEdit:boolean = false;

  col_model:any[] = [
    { label: 'Mã', name: 'code', key: true, width: 10 , hidden: true},
    { label: 'Tên nhóm', name: 'name', width: 15 },
    { label: 'Thuộc nhóm', name: 'name_master', width: 15 },
    { label: 'Mô tả', name: 'notes', width: 25 }
  ]
  constructor(
    private injector: Injector,
    private acctionService: AcctionService,
    private accountService: AccountService,
    private referenceService: ReferenceService,
    private productService:ProductService
  ) {
    super(injector);
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
        this.InputModel = new POS_Product_Group_ENTITY();
        setTimeout(() => {
          this.sidenavAddEdit.title = "Thêm mới nhóm hàng hóa";
          this.sidenavAddEdit.open();
          this.toolbarEdit.setUiAction(this);
          this.SelectGroupPicker.setList(this.InputMaster);
          this.UpdateView();
        }, 100);
        break;
      }
      case EditPageState.edit:{
        this.isEdit = true;
        this.filterInput.type = 'SEARCH';
        this.filterInput.code =  this.idSelect;
        this.productService.pOS_Product_Group_Actions(this.filterInput).subscribe((respond)=>{
          this.InputModel = respond as POS_Product_Group_ENTITY;
          this.sidenavAddEdit.open();
          this.toolbarEdit.setUiAction(this);
          this.SelectGroupPicker.value = this.InputModel.code_master;
          this.SelectGroupPicker.setList(this.InputMaster);
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
          this.productService.pOS_Product_Group_Actions(this.InputModel).subscribe((respond)=>{
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
          this.productService.pOS_Product_Group_Actions(this.InputModel).subscribe((respond)=>{
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
    this.initCombobox();
  }
  initCombobox(){
  }
  onSelectGroup(v:any){
    this.InputModel.code_master = v;
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
        this.productService.pOS_Product_Group_Actions(this.InputModel).subscribe((respond)=>{
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
    this.productService.pOS_Product_Group_Search(this.filterInput).subscribe(
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
