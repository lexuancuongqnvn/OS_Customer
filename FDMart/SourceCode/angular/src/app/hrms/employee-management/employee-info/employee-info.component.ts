import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { CropperPosition, ImageCroppedEvent, ImageCropperComponent, LoadedImage } from 'ngx-image-cropper';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { JqgridEditComponent } from 'src/app/shared/jqgrid/jqgrid-edit/jqgrid-edit.component';
import { JqgridListComponent } from 'src/app/shared/jqgrid/jqgrid-list/jqgrid-list.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { InputFileUploadComponent } from 'src/app/shared/layout/input-control-simple/input-file-upload/input-file-upload.component';
import { InputSelectComponentV2 } from 'src/app/shared/layout/input-control-simple/input-select-v2/input-select-v2.component';
import { InputSelectComponent } from 'src/app/shared/layout/input-control-simple/input-select/input-select.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { AccountService, DepartmentService, Department_ENTITY, Department_Position_ENTITY, SYS_Account_Group, HRM_Employee_ENTITY, EmployeeService, HRM_District_City_ENTITY, HRM_Employee_Marital_Status_ENTITY, HRM_BranchService, HRM_Branch_ENTITY, Part_ENTITY, Department_Title_ENTITY, HRM_Employee_Academic_Level_ENTITY, HRM_Employee_Certificate_ENTITY, HRM_TimeSheet_Work_Shift_ENTITY, TimeSheetService } from 'src/app/shared/service-proxies/api-shared';
import { AlertMessageComponent } from 'src/app/shared/sidenav/alert-message/alert-message.component';
import { SidenavAddEditComponent } from 'src/app/shared/sidenav/sidenav-add-edit/sidenav-add-edit.component';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.css']
})
export class EmployeeInfoComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  @ViewChild('gridMenuList') gridMenuList: JqgridListComponent;
  @ViewChild('gridMenuEdit') gridMenuEdit: JqgridEditComponent<SYS_Account_Group>;
  @ViewChild('dialogDelete') dialogDelete: DialogAcctionComponent;
  @ViewChild('dialogAddDepartment') dialogAddDepartment: DialogAcctionComponent;
  @ViewChild('dialogAddPosition') dialogAddPosition: DialogAcctionComponent;
  @ViewChild('toolbar') toolbar: ToolbarComponent;
  @ViewChild('toolbarEdit') toolbarEdit: ToolbarComponent;
  @ViewChild('sidenavAddEdit') sidenavAddEdit: SidenavAddEditComponent;
  @ViewChild('alertMessage') alertMessage: AlertMessageComponent;
  @ViewChild('SelectDepartmentPicker') SelectDepartmentPicker: InputSelectComponentV2;
  @ViewChild('SelectDepartmentPicker2') SelectDepartmentPicker2: InputSelectComponentV2;
  @ViewChild('SelectDepartmentPicker3') SelectDepartmentPicker3: InputSelectComponentV2;
  @ViewChild('SelectPositionPicker') SelectPositionPicker: InputSelectComponentV2;
  @ViewChild('SelectAccountGroupPicker') SelectAccountGroupPicker: InputSelectComponentV2;
  @ViewChild('SelectBirthplaceSubDistrictPicker') SelectBirthplaceSubDistrictPicker: InputSelectComponentV2;
  @ViewChild('SelectBirthplaceDistrictPicker') SelectBirthplaceDistrictPicker: InputSelectComponentV2;
  @ViewChild('SelectBirthplaceCityPicker') SelectBirthplaceCityPicker: InputSelectComponentV2;
  @ViewChild('SelectMaritalStatusPicker') SelectMaritalStatusPicker: InputSelectComponentV2;
  @ViewChild('SelectBranchPicker') SelectBranchPicker: InputSelectComponentV2;
  @ViewChild('SelectPartPicker') SelectPartPicker: InputSelectComponentV2;
  @ViewChild('SelectDepartmentTitlePicker') SelectDepartmentTitlePicker: InputSelectComponentV2;
  @ViewChild('SelectAddressSubDistrictPicker') SelectAddressSubDistrictPicker: InputSelectComponentV2;
  @ViewChild('SelectAddressDistrictPicker') SelectAddressDistrictPicker: InputSelectComponentV2;
  @ViewChild('SelectAddressCityPicker') SelectAddressCityPicker: InputSelectComponentV2;
  @ViewChild('SelectAddressCurrentSubDistrictPicker') SelectAddressCurrentSubDistrictPicker: InputSelectComponentV2;
  @ViewChild('SelectAddressCurrentDistrictPicker') SelectAddressCurrentDistrictPicker: InputSelectComponentV2;
  @ViewChild('SelectAddressCurrentCityPicker') SelectAddressCurrentCityPicker: InputSelectComponentV2; 
  @ViewChild('SelectWorkShiftPicker') SelectWorkShiftPicker: InputSelectComponentV2; 
  @ViewChild('SelectSexPicker') SelectSexPicker: InputSelectComponentV2;  
  @ViewChild('SelectActiveicker') SelectActiveicker: InputSelectComponentV2;
  @ViewChild('gridAcademicLevelEdit') gridAcademicLevelEdit: JqgridEditComponent<HRM_Employee_Academic_Level_ENTITY>;
  @ViewChild('gridCertificatesEdit') gridCertificatesEdit: JqgridEditComponent<HRM_Employee_Certificate_ENTITY>;
  @ViewChild('InputFileUploadComponent') InputFileUploadComponent: InputFileUploadComponent;
  @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;
  tbName: string = 'HRM_Employee';
  CurrenFrom:string = EditPageState.view;
  InputMaster: HRM_Employee_ENTITY[] = [];
  filterInput:HRM_Employee_ENTITY = new HRM_Employee_ENTITY();
  InputModel: HRM_Employee_ENTITY = new HRM_Employee_ENTITY();
  DepartmentModel:Department_ENTITY =  new Department_ENTITY();
  PositionModel:Department_Position_ENTITY =  new Department_Position_ENTITY();
  listDepartment:Department_ENTITY[] = [];  
  listDepartmentTitle:Department_Title_ENTITY[] = [];  
  listEmployeePosition:Department_Position_ENTITY[]=[];
  listGroup:SYS_Account_Group[] = [];
  listMaritalStatus:HRM_Employee_Marital_Status_ENTITY[] = [];
  listBranch:HRM_Branch_ENTITY[] = [];
  listPart:Part_ENTITY[] = [];
  listWorkShift:HRM_TimeSheet_Work_Shift_ENTITY[] = [];
  isEdit:boolean = false;
  isgetdata:boolean = false;
  iscomplated:boolean = false;
  get disabled():boolean{
    return this.getCurrenFrom == EditPageState.viewDetail?true:false;
  }
  col_model:any[] = [
    { label: 'Mã', name: 'code', key: true, width: 10 , hidden: true},
    { label: 'Ảnh', name: 'avarta_html', width: 8 },
    { label: 'Mã nhân viên', name: 'employee_code', width: 10 },
    { label: 'Tên nhân viên', name: 'firstName', width: 10 },
    { label: 'Họ và tên đệm', name: 'lastName', width: 10 },
    { label: 'email', name: 'email', width: 20 },
    { label: 'Ngày sinh', name: 'birthday_f', width: 10 },
    { label: 'Giới tính', name: 'sex_name', width: 10 },
    { label: 'Phòng ban', name: 'department_name', width: 10 },
    { label: 'Chức vụ', name: 'position_name', width: 10 },
    { label: 'Chức danh', name: 'title_name', width: 10 }
  ]
  col_model_academic_level_edit:any[] = [
    { label: 'Mã', name: 'code', key: true, width: 10 , hidden: true},
    { label: 'Bằng cấp', name: 'degree', width: 8 ,editable: true, sorttype: 'text'},
    { label: 'Tên trường', name: 'schoools', width: 15 ,editable: true, sorttype: 'text'},
    { label: 'Chuyên ngành', name: 'speciality', width: 15 ,editable: true, sorttype: 'text'},
  ]
  col_model_certificates_edit:any[] = [
    { label: 'Mã', name: 'code', key: true, width: 10 , hidden: true},
    { label: 'Tên chứng chỉ', name: 'name', width: 8 ,editable: true, sorttype: 'text'},
    { label: 'Loại chứng chỉ', name: 'type', width: 15 ,editable: true, sorttype: 'text'}
  ]
  cropper:CropperPosition = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0
  }
  listActive:any[]=[{id:'-1',name:'Tất cả'},{id:'0',name:'Đã nghỉ'},{id:'1',name:'Đang làm'}]
  constructor(
    private injector: Injector,
    private appSession: AppSession,
    private employeeService:EmployeeService,
    private departmentService:DepartmentService,
    private hRM_BranchService:HRM_BranchService,
    private timeSheetService:TimeSheetService
  ) {
    super(injector);
  }
  showPopupAddDep(){
    this.DepartmentModel = new Department_ENTITY();
    this.dialogAddDepartment.open();
  }
  onChangeValue(v:any,col:string){
    if(col == ''){
      this.DepartmentModel.allow_approve_worktime = this.InputModel.code;
    }else{
      this.InputModel[col] = v;
    }
  }
  refreshComplated(){
    this.iscomplated = false;
    setTimeout(() => {
      this.iscomplated = true;
    }, 1500);
  }
  onSelectBirthplace(v:any,col:string){
    try{
      this.InputModel[col] = v;
      if(col == 'birthplace_city_code' && this.iscomplated){
        this.autocompleteDistrict(this.InputModel.birthplace_district_code,'','birthplace_district_code');
       }else if(col == 'birthplace_district_code' && this.iscomplated){
        this.autocompleteDistrictSub(this.InputModel.birthplace_sub_district_code,'','birthplace_sub_district_code');
       }
    }catch{}
    this.refreshComplated();
  }
  onSelectAddress(v:any,col:string){
    try{
      this.InputModel[col] = v;
      if(col == 'address_city_code' && this.iscomplated){
        this.autocompleteDistrict(this.InputModel.address_district_code,'','address_district_code');
       }else if(col == 'address_district_code' && this.iscomplated){
        this.autocompleteDistrictSub(this.InputModel.address_sub_district_code,'','address_sub_district_code');
       }
    }catch{}
    this.refreshComplated();
  }
  onSelectAddressCurrent(v:any,col:string){
    try{
      this.InputModel[col] = v;
      if(col == 'address_current_city_code'  && this.iscomplated){
        this.autocompleteDistrict(this.InputModel.address_current_district_code,'','address_current_district_code');
       }else if(col == 'address_current_sub_district_code' && this.iscomplated){
        this.autocompleteDistrictSub(this.InputModel.address_current_sub_district_code,'','address_current_sub_district_code');
       }
    }catch{}
    this.refreshComplated();
  }
  confirmAddDepartment(){
    this.DepartmentModel.type = 'INSERT';
    this.departmentService.department_Actions(this.DepartmentModel).subscribe((respond)=>{
      if(respond['status'] == 0) {
        this.alertMessage.AlertSuccess(respond['message']);
        this.initCombobox();
      }
      else this.alertMessage.AlertError(respond['message']);
    })
  }
  showPopupAddDepPos(){
    this.PositionModel = new Department_Position_ENTITY();
    this.dialogAddPosition.open();
    setTimeout(() => {
      this.SelectDepartmentPicker3.renderSelectPicker();
      this.SelectDepartmentPicker3.setList(this.listDepartment);
    }, 100);
  }
  confirmAddPosition(){
    this.departmentService.department_Position_Insert(this.PositionModel).subscribe((respond)=>{
      if(respond['status'] == 0) {
        this.alertMessage.AlertSuccess(respond['message']);
        this.initCombobox();
      }
      else this.alertMessage.AlertError(respond['message']);
    })
  }
  onSelect(v:any,col:string){
    if(col == 'departmenT_CODE')
    {
      if(this.listDepartment.find(d=>d.code == v)) this.listEmployeePosition = this.listDepartment.find(d=>d.code == v).department_Positions;
    }
    else if(col == 'department_code2')this.PositionModel.department_code = v;
    else if(col == 'birthday')this.InputModel.birthday = v;
    else this.InputModel[col] = v;
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
  onClickAvarta(){
    document.getElementById('avarta').click();
  }
  valueUpload(v:any,field:string){
    this.InputModel[field]=v;
    this.UpdateView();
  }
  // renderSelectPicker(): void {
  //   this.SelectDepartmentPicker2.renderSelectPicker();
  //   this.SelectPositionPicker.renderSelectPicker();
  // }
  resetdataGrid(){
    setTimeout(() => {
      this.gridAcademicLevelEdit.setData(this.InputModel.hRM_Employee_Academic_Levels?this.InputModel.hRM_Employee_Academic_Levels:[])
      this.gridCertificatesEdit.setData(this.InputModel.hRM_Employee_Certificates ? this.InputModel.hRM_Employee_Certificates : [])
    }, 500);
  }
  onClickAcction(id: number, storedName: string, param: string, keyService: string, classForm: string): void {
    this.filterInput.type = this.getCurrenFrom;
    switch(classForm){
      case EditPageState.add:{
        this.InputModel.avarta = '../assets/img/default-avatar.png'
        this.isEdit = true;
        this.InputModel = new HRM_Employee_ENTITY();
        this.InputModel.hRM_TimeSheet_Work_Shifts = [];
        this.InputModel.hRM_Employee_Training = [];
        this.InputModel.hRM_Employee_Occupational_Accidents = [];
        this.InputModel.hRM_Employee_Labour_Contracts = [];
        this.InputModel.hRM_Employee_Labour_Contract_Curriculum_Vitaes = [];
        this.InputModel.hRM_Employee_Evaluates = [];
        this.InputModel.hRM_Employee_Discipline = [];
        this.InputModel.hRM_Employee_Check_In_Outs = [];
        this.InputModel.hRM_Employee_Certificates = [];
        this.InputModel.hRM_Employee_Bonus = [];
        this.InputModel.hRM_Employee_Academic_Levels = [];
        this.InputModel.allDay = [];
        this.autocompleteCity('','','birthplace_city_code');
        this.autocompleteCity('','','address_city_code');
        this.autocompleteCity('','','address_current_city_code');
        this.autocompleteDistrict('','','birthplace_sub_district_code');
        this.autocompleteDistrict('','','address_district_code');
        this.autocompleteDistrict('','','address_current_district_code');
        this.autocompleteDistrictSub('','','birthplace_sub_district_code');
        this.autocompleteDistrictSub('','','address_sub_district_code');
        this.autocompleteDistrictSub('','','address_current_sub_district_code');
        setTimeout(() => {
          this.sidenavAddEdit.title = "Thêm mới nhân viên";
          this.sidenavAddEdit.open();
          this.toolbarEdit.setUiAction(this);
          this.resetListCombobox();
          this.UpdateView();
        }, 100);
        break;
      }
      case EditPageState.edit:{
        this.InputModel = new HRM_Employee_ENTITY();
        this.InputModel.id = this.appSession.user.id;
        this.isEdit = true;
        
        this.BlockUI();
        this.employeeService.hRM_Employee_Search({
          ...this.filterInput,
          code :this.idSelect,
          id :this.appSession.user.id
        }as HRM_Employee_ENTITY).subscribe((respond)=>{
          if(respond.length == 0){
            this.showMessageError("Thông tin nhân viên đã bị khóa.")
            return;
          }
          this.InputModel = respond[0];
          if(!this.InputModel.avarta){
            this.InputModel.avarta = '../assets/img/default-avatar.png'
          }
          this.sidenavAddEdit.open();
          this.toolbarEdit.setUiAction(this);
          this.resetListCombobox();
          this.autocompleteCity(this.InputModel.birthplace_city_code,'','birthplace_city_code');
          this.autocompleteCity(this.InputModel.address_city_code,'','address_city_code');
          this.autocompleteCity(this.InputModel.address_current_city_code,'','address_current_city_code');
          this.autocompleteDistrict(this.InputModel.birthplace_district_code,'','birthplace_district_code');
          this.autocompleteDistrict(this.InputModel.address_district_code,'','address_district_code');
          this.autocompleteDistrict(this.InputModel.address_current_district_code,'','address_current_district_code');
          this.autocompleteDistrictSub(this.InputModel.birthplace_sub_district_code,'','birthplace_sub_district_code');
          this.autocompleteDistrictSub(this.InputModel.address_sub_district_code,'','address_sub_district_code');
          this.autocompleteDistrictSub(this.InputModel.address_current_sub_district_code,'','address_current_sub_district_code');
          this.gridAcademicLevelEdit.setData(this.InputModel.hRM_Employee_Academic_Levels?this.InputModel.hRM_Employee_Academic_Levels:[])
          this.gridCertificatesEdit.setData(this.InputModel.hRM_Employee_Certificates?this.InputModel.hRM_Employee_Certificates:[]);
        
          this.UnBlockUI();
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
        this.InputModel.id = this.appSession.user.id;
        this.dialogDelete.open();
        break;
      }
      case EditPageState.save:{
        try{
          this.InputModel.hRM_Employee_Academic_Levels = [];
          var Subs = this.gridAcademicLevelEdit.allData;
          if(Subs.length>0)
          {
            for(var i = 0 ; i < Subs.length ; i++)
            {
              var newrow = new  HRM_Employee_Academic_Level_ENTITY();
              for (const [key, value] of Object.entries(Subs[i])) {
                newrow[key] = Subs[i][key];
              }
              newrow = HRM_Employee_Academic_Level_ENTITY.fromJS(newrow);
              this.InputModel.hRM_Employee_Academic_Levels.push(newrow);
            }
          }
        }catch{}
        try{
          this.InputModel.hRM_Employee_Certificates = [];
          var Subs2 = this.gridCertificatesEdit.allData;
          if(Subs2.length>0)
          {
            for(var i = 0 ; i < Subs2.length ; i++)
            {
              var newrow2 = new  HRM_Employee_Certificate_ENTITY();
              for (const [key, value] of Object.entries(Subs2[i])) {
                newrow2[key] = Subs2[i][key];
              }
              newrow2 = HRM_Employee_Certificate_ENTITY.fromJS(newrow2);
              this.InputModel.hRM_Employee_Certificates.push(newrow2);
            }
          }
        }catch{}
        if(!this.InputModel.code){
          this.employeeService.hRM_Employee_Insert(this.InputModel).subscribe((respond)=>{
            if(respond.status == 0)
            {
              this.alertMessage.AlertSuccess(respond['message']);
              this.InputModel.code = respond['ref_code'];
              this.gridAcademicLevelEdit.setData(respond.hRM_Employee_Academic_Levels?respond.hRM_Employee_Academic_Levels:[])
              this.gridCertificatesEdit.setData(respond.hRM_Employee_Certificates?respond.hRM_Employee_Certificates:[])
            }else
              this.alertMessage.AlertError(respond['message']);
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
          this.InputModel.id =  this.appSession.user.id;
          this.employeeService.hRM_Employee_Update(this.InputModel).subscribe((respond)=>{
            if(respond['status'] == '0')
            {
              this.alertMessage.AlertSuccess(respond['message']);
              this.LoadData();
            }else
              this.alertMessage.AlertError(respond['message']);
            
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
        this.InputModel = new HRM_Employee_ENTITY();
        this.InputModel.id = this.appSession.user.id;
        this.isEdit = true;
        this.filterInput.code =  this.idSelect;
        this.filterInput.id =  this.appSession.user.id;
        this.employeeService.hRM_Employee_Search(this.filterInput).subscribe((respond)=>{
          if(respond.length == 0){
            this.showMessageError("Thông tin nhân viên đã bị khóa.");
            this.setCurrenFrom(EditPageState.view);
            this.UpdateView();
            return;
          }
          this.InputModel = respond[0];
          if(!this.InputModel.avarta){
            this.InputModel.avarta = '../assets/img/default-avatar.png'
          }
          this.sidenavAddEdit.open();
          this.toolbarEdit.setUiAction(this);
          setTimeout(async () => {
            await this.resetListCombobox();
            this.UpdateView();
          }, 0);
          this.autocompleteCity(this.InputModel.birthplace_city_code,'','birthplace_city_code');
          this.autocompleteCity(this.InputModel.address_city_code,'','address_city_code');
          this.autocompleteCity(this.InputModel.address_current_city_code,'','address_current_city_code');
          this.autocompleteDistrict(this.InputModel.birthplace_sub_district_code,'','birthplace_sub_district_code');
          this.autocompleteDistrict(this.InputModel.address_district_code,'','address_district_code');
          this.autocompleteDistrict(this.InputModel.address_current_district_code,'','address_current_district_code');
          this.autocompleteDistrictSub(this.InputModel.birthplace_sub_district_code,'','birthplace_sub_district_code');
          this.autocompleteDistrictSub(this.InputModel.address_sub_district_code,'','address_sub_district_code');
          this.autocompleteDistrictSub(this.InputModel.address_current_sub_district_code,'','address_current_sub_district_code');
          this.gridAcademicLevelEdit.setData(this.InputModel.hRM_Employee_Academic_Levels?this.InputModel.hRM_Employee_Academic_Levels:[])
          this.gridCertificatesEdit.setData(this.InputModel.hRM_Employee_Certificates?this.InputModel.hRM_Employee_Certificates:[])
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
    this.LoadData();
    this.initCombobox();
  }
  resetListCombobox(){
    this.refreshComplated();
    this.SelectPositionPicker.setList(this.listEmployeePosition);
    this.SelectDepartmentPicker.setList(this.listDepartment); 

    this.SelectMaritalStatusPicker.setList(this.listMaritalStatus);

    this.SelectBranchPicker.setList(this.listBranch);

    this.SelectPartPicker.setList(this.listPart);

    this.SelectDepartmentTitlePicker.setList(this.listDepartmentTitle);

    this.SelectSexPicker.setList([{code:'1',name:'Nam'},{code:'2',name:'Nữ'}]);
    
    this.SelectWorkShiftPicker.setList(this.listWorkShift);
  }
  autocompleteCity(id:string='',text:string='',col:string){
    var pr = new HRM_District_City_ENTITY();
    pr.type = 'CITY'
    pr.city_id = id
    pr.city = text
      this.employeeService.hRM_District_City_Search(pr).subscribe((respond:HRM_District_City_ENTITY[])=>{
        try{
          if(col == 'birthplace_city_code'){
            if(text) this.SelectBirthplaceCityPicker.appendList(respond,text);
            else this.SelectBirthplaceCityPicker.setList(respond);
          }

          //Địa chỉ thường trú
          else if(col == 'address_city_code'){
            if(text)this.SelectAddressCityPicker.appendList(respond,text);
            else this.SelectAddressCityPicker.setList(respond);
          } 

          //Địa chỉ tạm trú
          else if(col == 'address_current_city_code'){
            if(text) this.SelectAddressCurrentCityPicker.appendList(respond,text);
            this.SelectAddressCurrentCityPicker.setList(respond);
          } 
        }catch{
        }
      })
  }
  autocompleteDistrict(id:string='',text:string='',col:string){
    var pr = new HRM_District_City_ENTITY();
    pr.type = 'DISTRICT'
    pr.district_id = id;
    pr.district = text;
    if(col == 'birthplace_district_code') pr.city_id = this.InputModel.birthplace_city_code;
    else if(col == 'address_district_code') pr.city_id = this.InputModel.address_city_code;
    else if(col == 'address_current_district_code') pr.city_id = this.InputModel.address_current_city_code;
      this.employeeService.hRM_District_City_Search(pr).subscribe((respond:HRM_District_City_ENTITY[])=>{
        try{
          if(col == 'birthplace_district_code'){
            if(text) this.SelectBirthplaceDistrictPicker.appendList(respond,text);
            else this.SelectBirthplaceDistrictPicker.setList(respond);
          } 
          //Địa chỉ thường trú
          else if(col == 'address_district_code'){
            if(text) this.SelectAddressDistrictPicker.appendList(respond,text);
            else this.SelectAddressDistrictPicker.setList(respond);
          } 

          //Địa chỉ tạm trú
          else if(col == 'address_current_district_code'){
            if(text) this.SelectAddressCurrentDistrictPicker.appendList(respond,text);
            else this.SelectAddressCurrentDistrictPicker.setList(respond);
          } 
        }catch{
        }
      })
  } 
  autocompleteDistrictSub(id:string='',text:string='',col:string){
    var pr = new HRM_District_City_ENTITY();
    pr.type = 'SUB_DISTRICT'
    pr.sub_district_id = id
    pr.sub_district = text
    if(col == 'birthplace_sub_district_code') {
      pr.city_id = this.InputModel.birthplace_city_code;
      pr.district_id = this.InputModel.birthplace_district_code;
    }
    else if(col == 'address_district_code') {
      pr.city_id = this.InputModel.address_city_code;
      pr.district_id = this.InputModel.address_district_code;
    }
    else if(col == 'address_current_district_code') {
      pr.city_id = this.InputModel.address_current_city_code;
      pr.district_id = this.InputModel.address_current_district_code;
    }
    this.employeeService.hRM_District_City_Search(pr).subscribe((respond:HRM_District_City_ENTITY[])=>{
      try{
        if(col == 'birthplace_sub_district_code') {
          if(text) this.SelectBirthplaceSubDistrictPicker.appendList(respond,text);
          else this.SelectBirthplaceSubDistrictPicker.setList(respond);
        }
        //Địa chỉ thường trú
        else if(col == 'address_sub_district_code'){
          if(text) this.SelectAddressSubDistrictPicker.appendList(respond,text);
          else this.SelectAddressSubDistrictPicker.setList(respond);
        } 
        //Địa chỉ tạm trú
        else if(col == 'address_current_sub_district_code') {
          if(text) this.SelectAddressCurrentSubDistrictPicker.appendList(respond,text);
          else this.SelectAddressCurrentSubDistrictPicker.setList(respond);
        }
      }catch{
      }
    })
  } 
  initCombobox(){
    this.BlockUI();
    var p = new Department_ENTITY();
    this.departmentService.department_Search(p).subscribe(
      (data: any) => {
        try{
          this.listDepartment = data;
          this.listDepartment.forEach(d=>{
            if(d.department_Positions){
              d.department_Positions.forEach(p=>{
                if(!this.listEmployeePosition) this.listEmployeePosition=[];
                this.listEmployeePosition.push(p);
              })
            }
          })
          this.SelectPositionPicker.setList(this.listEmployeePosition);
          this.SelectDepartmentPicker.setList(this.listDepartment); 
        }catch{}
        this.UnBlockUI();
        this.UpdateView();
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    )
    
    var p2 = new HRM_Employee_Marital_Status_ENTITY();
    if(this.listMaritalStatus.length == 0){
      this.BlockUI();
      this.employeeService.hRM_Employee_Marital_Status_Search(p2).subscribe(respond=>{
        try{
          this.listMaritalStatus = respond;
          this.SelectMaritalStatusPicker.setList(this.listMaritalStatus);
        }catch{}
        this.UnBlockUI()
      })
    }
    var p3 = new HRM_Branch_ENTITY();
    if(this.listBranch.length == 0){
      this.hRM_BranchService.hRM_Branch_Search(p3).subscribe(respond=>{
        try{
          this.listBranch = respond;
          this.SelectBranchPicker.setList(this.listBranch);
        }catch{}
      })
    }
    var p4 = new Part_ENTITY();
    if(this.listPart.length == 0){
      this.BlockUI();
      this.employeeService.part_Search(p4).subscribe(respond=>{
        try{
          this.listPart = respond;
          this.SelectPartPicker.setList(this.listPart);
        }catch{}
        this.UnBlockUI();
      })
    }
    this.BlockUI();
    var p5 = new Department_Title_ENTITY();
    if(this.listDepartmentTitle.length == 0){
      this.departmentService.department_Title_Search(p5).subscribe(respond=>{
        try{
          this.listDepartmentTitle = respond;
          this.SelectDepartmentTitlePicker.setList(this.listDepartmentTitle);
        }catch{}
        this.UnBlockUI();
      })
    }
    var p6 = new HRM_TimeSheet_Work_Shift_ENTITY();
    p6.type = 'ALL';
    this.timeSheetService.hRM_TimeSheet_Work_Shift_Search(p6).subscribe((respond) => {
      this.listWorkShift = respond;
      if(this.SelectWorkShiftPicker)this.SelectWorkShiftPicker.setList(this.listWorkShift);
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
    setTimeout(() => {
      this.SelectActiveicker.setList(this.listActive);
    }, 500);
  }
  onSelectFilter(v:any,col:string){
    if(col == 'active'){
      if(v == null || v == undefined || v == '-1')
        this.filterInput.active = undefined;
      else {
        if(v == '1') this.filterInput.active = true;
        if(v == '0') this.filterInput.active = false;
      }
    }
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
  onSelectDepartment(v:any,col:string){

  }
  confirmDelete() {
        this.InputModel.code = this.idSelect;
        this.employeeService.hRM_Employee_Delete(this.InputModel.code,this.appSession.user.code).subscribe((respond)=>{
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
  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileChangeEvent(event: any,col:string): void {
      this.imageChangedEvent = event;
      var reusult = new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(event?.target?.files[0]);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      }).then(
        data => this.InputModel.avarta_base64 = data.toString()
      );
      // this.InputModel.avarta_base64 = this.InputFileUploadComponent.convertBase64(event);
      this.UpdateView();
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
      this.InputModel.avarta_base64_256x256 = event.base64;
  }
  imageLoaded(image: LoadedImage) {
      // show cropper
  }
  cropperReady() {
      // cropper ready
  }
  loadImageFailed() {
      // show message
  }
  LoadData() {
    this.BlockUI();
    this.filterInput.code = null;
    this.employeeService.hRM_Employee_Search({
      ...this.filterInput,
      type:'ALL'
    }as HRM_Employee_ENTITY).subscribe(
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
