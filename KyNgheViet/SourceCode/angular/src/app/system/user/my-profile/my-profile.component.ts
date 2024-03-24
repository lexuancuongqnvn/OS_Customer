import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { data } from 'jquery';
import moment from 'moment';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { InputSelectComponentV2 } from 'src/app/shared/layout/input-control-simple/input-select-v2/input-select-v2.component';
import { InputSelectComponent } from 'src/app/shared/layout/input-control-simple/input-select/input-select.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { AccountService, DepartmentService, Department_ENTITY, Department_Position_ENTITY, EmployeeService, Employee_Positions_ENTITY, SYS_Account_Infomation } from 'src/app/shared/service-proxies/api-shared';

@Component({
  selector: 'user-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent extends LayoutComponentBase implements OnInit {

  constructor(
    injector: Injector,
    private accountService: AccountService,
    private employeeService: EmployeeService,
    private appSession: AppSession,
    private departmentService:DepartmentService
  ) {
    super(injector);
  }
  // @ViewChild('SelectDepartmentPicker') SelectDepartmentPicker: InputSelectComponentV2;
  // @ViewChild('SelectPositionPicker') SelectPositionPicker: InputSelectComponentV2;
  inputModel:SYS_Account_Infomation = new SYS_Account_Infomation();
  listEmployeePosition:Department_Position_ENTITY[]=[];
  listDepartment:Department_ENTITY[] = [];  
  valuePosition: Array<any> = [];
  ValueBirthday:Date;
  ngOnInit(): void {
    this.onGetUser();
  }
  initCombobox(){
    this.BlockUI();
    this.departmentService.department_Search(new Department_ENTITY()).subscribe(responses=>{
      this.listDepartment = responses;
      // this.SelectDepartmentPicker.renderSelectPicker();
      // this.SelectPositionPicker.renderSelectPicker();
      this.UpdateView();
      this.UnBlockUI();
    })
  }
  valueDate(v:any,col:string){
    this.inputModel.birthday = v;
  }
  onSelect(v:any,col:string){
    if(col == 'departmenT_CODE')
    {
      this.inputModel.departmenT_CODE = v;
      this.listEmployeePosition = this.listDepartment.find(d=>d.code == v).department_Positions;
    }else if(col == 'position')
      this.inputModel.position = v;
    this.UpdateView();
  }
  onSave(){
    // this.inputModel.birthday = this.inputModel.birthday ? moment.parseZone(this.inputModel.birthday.toString()) : <any>undefined;
    this.inputModel.type = 'AVARTA';
    this.inputModel.code = this.appSession.user.code;
    this.accountService.sYS_Account_Infomation_Update(this.inputModel).subscribe((respond:any)=>{
      if(respond['status'] == 0) this.showMessageSuccess(respond['message'])
      else this.showMessageError(respond['message'])
      this.UpdateView();
    });
  }
  onClickAvarta(){
    document.getElementById('avarta').click();
  }
  onGetUser(){
    this.BlockUI();
    this.accountService.sYS_Account_Info_Search_byUser(this.appSession.user.username).subscribe(
      (data: SYS_Account_Infomation) => {
        this.inputModel = data;
        if(!this.inputModel.avarta){
          this.inputModel.avarta = '../assets/img/default-avatar.png'
        }
        this.UpdateView();
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      })
  }
  formatJS(_data:any):SYS_Account_Infomation{
    let temp = new SYS_Account_Infomation();
    temp.id = _data["ID"];
    temp.accounT_ID = _data["ACCOUNT_ID"];
    temp.accounT_GROUP = _data["ACCOUNT_GROUP"];
    temp.accounT_GROUP_NAME = _data["ACCOUNT_GROUP_NAME"];
    temp.datE_ADD = _data["DATE_ADD"] ? moment.parseZone(_data["DATE_ADD"].toString()) : <any>undefined;
    temp.datE_EDIT = _data["DATE_EDIT"] ? moment.parseZone(_data["DATE_EDIT"].toString()) : <any>undefined;
    temp.log = _data["LOG"];
    temp.notes = _data["NOTES"];
    temp.useR_NAME = _data["USER_NAME"];
    temp.password = _data["PASSWORD"];
    temp.code = _data["code"];
    temp.decentralization = _data["DECENTRALIZATION"];
    temp.active = _data["ACTIVE"];
    temp.avarta = _data["AVARTA"];
    temp.lasT_NAME = _data["LAST_NAME"];
    temp.firsT_NAME = _data["FIRST_NAME"];
    temp.approve = _data["APPROVE"];
    temp.mobilE_NUMBER = _data["MOBILE_NUMBER"];
    temp.address = _data["ADDRESS"];
    temp.addresS_CURRENT = _data["ADDRESS_CURRENT"];
    temp.iD_CARD = _data["ID_CARD"];
    temp.birthday = _data["BIRTHDAY"] ? moment.parseZone(_data["BIRTHDAY"].toString()) : <any>undefined;
    temp.position = _data["POSITION"];
    temp.positioN_NAME = _data["POSITION_NAME"];
    temp.email = _data["EMAIL"];
    temp.education = _data["EDUCATION"];
    temp.country = _data["COUNTRY"];
    temp.city = _data["CITY"];
    temp.experience = _data["EXPERIENCE"];
    temp.additionaL_DETAILS = _data["ADDITIONAL_DETAILS"];
    temp.departmenT_CODE = _data["DEPARTMENT_CODE"];
    temp.departmenT_NAME = _data["DEPARTMENT_NAME"];
    temp.father = _data["FATHER"];
    return temp;
  }
  valueUpload(v:any,field:string){
    this.inputModel[field]=v;
    this.onSave()
  }
}
