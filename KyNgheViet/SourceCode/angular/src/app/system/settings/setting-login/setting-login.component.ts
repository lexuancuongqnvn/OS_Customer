import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { AccountService, RequestManagement_ENTITY, SYS_Account_Infomation } from 'src/app/shared/service-proxies/api-shared';
import { SystemServiceProxy } from 'src/app/shared/service-proxies/service-proxies';
import $ from 'jquery'
@Component({
  selector: 'setting-login',
  templateUrl: './setting-login.component.html',
  styleUrls: ['./setting-login.component.css']
})
export class SettingLoginComponent extends LayoutComponentBase implements OnInit {

  constructor(
    injector: Injector,
    private appSession: AppSession,
    private systemService: SystemServiceProxy,
    private accountService: AccountService
  ) {
    super(injector);
  }

  listHistory:RequestManagement_ENTITY[]=[];
  activeTab: Array<any> = 
  [
    {id:1,active:'active'},
    {id:2,active:''},
    {id:3,active:''}
  ]
  active1:boolean=true;
  active2:boolean=false;
  active3:boolean=false;
  verifyPassword:boolean=false;
  ischangeLanguage:boolean=false;
  class1:string='active';
  class2:string='';
  class3:string='';

  accountModel: SYS_Account_Infomation = new SYS_Account_Infomation();

  password_message:string='';
  password_status:number=-1;

  language:string='';
  email:string = this.appSession.user.username;
  
  forgotPassword:Boolean = true;
  languaObj:any[] = [
    {
      v:'1',
      t:'Vietnamese',
      s:false
    },
    {
      v:'2',
      t:'English',
      s:false
    }
  ]
  ngOnInit(): void {
    this.initLoadHistory();
    this.accountService.sYS_Account_Info_Search_byUser(this.appSession.user.username).subscribe((respond)=>{
      this.language = respond['LANGUAGE_ID'].toString();
      this.UpdateView;
    })
  }
  onChangePasswork(){
    this.verifyPassword = !this.verifyPassword;
    this.accountModel['password'] = '';
    this.accountModel['passwordnew'] = '';
    this.accountModel['passwordnew_cf'] = '';
    this.password_message='';
    this.password_status=-1;
    this.UpdateView();
  }
  onSubmitChangePassword(){
    if(!this.accountModel['password'] || this.accountModel['password'] == '') this.password_message = 'Mật khẩu không được để trống /Required password fields';
    else if(!this.accountModel['passwordnew'] || this.accountModel['passwordnew'] == '') this.password_message = 'Mật khẩu mới không được để trống /Required new password fields';
    else if(!this.accountModel['passwordnew_cf'] || this.accountModel['passwordnew_cf'] == '') this.password_message = 'Mật khẩu mới xác nhận không được để trống /Required conform new password fields';
    else if(this.accountModel['passwordnew'] != this.accountModel['passwordnew_cf']) this.password_message = 'Mật khẩu mới không khớp /password mismatched';
    else{
      this.blockUI.start('Loading...');
    this.accountService.sYS_Account_Infomation_UpdatePassword(this.appSession.user.username,0,this.accountModel['password'],this.accountModel['passwordnew'],this.accountModel['passwordnew_cf']).subscribe((response) => {
      if(response['status'] == 0){
        this.password_message = response['message'];
        this.password_status = 0;
      }
      else{
        this.password_message = response['message'];
        this.password_status = response['status'];
      }
      this.blockUI.stop();
    })
    }
  }
  activeSave(item:any){
    this.ischangeLanguage = true;
    this.language = $('#exampleFormControlSelect1').val().toString();
    this.UpdateView()
  }
  SaveChangeLanguage(){
    this.BlockUI();
    this.accountService.sYS_Account_Infomation_Language_Update(this.appSession.user.username,this.language).subscribe((response)=>{
      if(response['SYS_Account_Infomation']["statusCode"] == 0) this.showMessageSuccess(response['status']);
      else this.showMessageError('Lỗi');
      this.UnBlockUI();
    });
  }
  initLoadHistory(){
    this.BlockUI();
    this.accountService.requestManagement_History(this.appSession.user.username).subscribe((response)=>{
      this.listHistory = response;
      this.UpdateView();
      this.UnBlockUI();
    });
  }
  logOut(token:string): void {
    this.systemService.PostByModel('api/logout', { tokens: token })
    .subscribe((response) => {
      if(response['status'] == 0){
        this.initLoadHistory();
      }else{
        alert(response['Message'] )
      }
    });
  }
  onActive(id:number){
    this.active1=false;
    this.active2=false;
    this.active3=false;
    this.class1='';
    this.class2='';
    this.class3='';
    switch(id){
      case 1:{
        this.active1=true;
        this.class1='active';
        break;
      }
      case 2:{
        this.active2=true;
        this.class2='active';
        break;
      }
      case 3:{
        this.active3=true;
        this.class3='active';
        break;
      }
    }
  }
}
