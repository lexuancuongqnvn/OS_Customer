import { ChangeDetectorRef, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';
import { SystemServiceProxy } from '../../service-proxies/service-proxies';

import { AppComponent } from 'src/app/app.component';
import { CookieService } from 'ngx-cookie';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AccountService, AuthenticateService, RequestModel, Token, User } from '../../service-proxies/api-shared';
import { AppDrawerComponent } from '../../layout/drawer/drawer.component';
import { DrawerService } from '../../shared.service';
import { AppSession } from '../../app-session/app-session';
import { LayoutComponentBase } from '../../layout/layoutBase';
import * as $ from 'jquery';
import { DeviceDetectorService } from 'ngx-device-detector';
// import * as publicIp from 'public-ip';

declare var getIPAddress;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends LayoutComponentBase implements OnInit {
  // get()
  // getObject()
  // getAll()
  // put()
  // putObject()
  // remove()
  // removeAll()
  deviceInfo = null;
  constructor(
    private systemService: SystemServiceProxy,
    private appComponent: AppComponent,
    private accountService: AccountService,
    private appSession: AppSession,
    private injector: Injector,
    private deviceService: DeviceDetectorService,
    private authenticateService:AuthenticateService,
    private route:ActivatedRoute
  ) {
    super(injector);
    this.userModel.username = '';
    this.userModel.password = '';
    this.deviceInfo = deviceService.getDeviceInfo();
  }
  @ViewChild('password') textbox: TextBoxComponent;
  userModel: User = new User();
  register:Boolean = false;
  userStorage:any;
  ngOnInit(): void {
    var obj = {
      status:-1,
      message:'ready login'
    }
    try{
        window['ReactNativeWebView'].postMessage(JSON.stringify(obj),'https://erpapp.osoft.vn',[]);
    }catch{}
    this.route.queryParams
      .subscribe(params => {
        if(params['token']){
          this.userModel.tokens = params['token'];
          this.loginToken();
        }
    });
    setTimeout(() => {
      $('.card').removeClass('card-hidden');
    }, 700);
    setTimeout(() => {
      this.checkSession();
    }, 50);
    this.userStorage = JSON.parse(localStorage.getItem('userStorage'));
    if(this.userStorage) 
      this.userModel.username = this.userStorage.userlogin;
  }
  get ShowUserName():boolean{
    return (this.userStorage && this.userStorage.userlogin)
  }
  onClickUserName(){
    this.userStorage = null;
    this.UpdateView();
  }
  checkSession(): void {
    // this.textbox.input.nativeElement.type = 'password';
    if (this.cookieService.getObject('userlogin') != undefined || this.cookieService.getObject('userlogin') != null) {
      this.appComponent.showtheme = true;
      this.router.navigateByUrl('/');
    } else {
      this.appComponent.showtheme = false;
    }
    this.UpdateView();
  }
  callgetIPAddress() {
    getIPAddress();
  }
  toggleVisibility(): void {
    const inputEl = this.textbox.input.nativeElement;
    inputEl.type = inputEl.type === 'password' ? 'text' : 'password';
  }

  form: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });
  res: any;
  user: User = new User();
  forgotPassword:boolean =  false;
  message:string = '';
  class:string = '';
  login(): void {
    if(this.userModel.username=='' || this.userModel.password == ''){
      this.message = 'Thông tin tài khoản không hợp lệ.';
      return;
    }
    this.BlockUI();
    var p = new User();
    p.username = this.userModel.username;
    p.password = this.userModel.password;
    p.browser = this.deviceService.browser;
    p.browser_version = this.deviceService.browser_version;
    p.device = this.deviceService.device;
    p.deviceType = this.deviceService.deviceType;
    p.orientation = this.deviceService.orientation;
    p.os = this.deviceService.os;
    p.os_version = this.deviceService.os_version;
    p.userAgent = this.deviceService.userAgent;
    p.languageId = 1;
    p.status = 1;
    p.roleID = 1;
    p.token = new Token();
    p.requestModel = new RequestModel()
    this.authenticateService.login(p).subscribe((response) => {
          if(response.status == 0){
          let userlogin = {
            id: response.id,
            code: response.code,
            avatar: response.avatar,
            firstName: response.firstName,
            lastName: response.lastName,
            roleID: response.roleID,
            roleName: response.roleName,
            userlogin: response.username,
            token: response.token.value,
            expiryDate: response.token.expiryDate,
            branch:response.branch,
            department:response.department,
            title_code:response.title_code,
            position_code:response.position_code,
            level:response.level,
            company_code:response.company_code,
            language_id:response.languageId,
            branch_name:response.branch_name
          }
          if(response.is_clear_cache){
            localStorage.removeItem('localStorageapp')
            localStorage.removeItem('cookieappName')
          }
          localStorage.removeItem('userStorage');
          localStorage.setItem('userStorage',JSON.stringify(userlogin));
          this.accountService.setAuthToken(response.token.value);
          this.cookieService.putObject('userlogin', userlogin);
          this.cookieService.put('allowShowTheme', "true");
          // this.cookieService.put('token', response.token.value);
          this.appComponent.showtheme = true;
          location.href = '/'
          // this.drawerService.getMenuItems();
        }else{
          this.message = response['message'];
          this.class = 'message-error';
        }
      this.UnBlockUI();
      this.UpdateView();
    },
    (err) => {
        if (err.status == 401) {
          this.cookieService.remove('userlogin');
          this.cookieService.remove('allowShowTheme');
          this.router.navigateByUrl('/login');
        }
    },
    () => {
        //isloading = true
    })
    // this.systemService.PostByModel('api/login', { username: this.userModel.username, password: this.userModel.password})
    //   .subscribe((response) => {
    //     if(response['status'] == 0){
    //       let userlogin = {
    //         id: response.user.id,
    //         code: response.user.code,
    //         avatar: response.user.avatar,
    //         firstName: response.user.firstName,
    //         lastName: response.user.lastName,
    //         roleID: response.user.roleID,
    //         roleName: response.user.roleName,
    //         userlogin: response.user.username,
    //         token: response.token.value,
    //         expiryDate: response.token.expiryDate
    //       }

    //       this.accountService.setAuthToken(response.token.value);
    //       this.cookieService.putObject('userlogin', userlogin);
    //       this.cookieService.put('allowShowTheme', "true");
    //       // this.cookieService.put('token', response.token.value);
    //       this.appComponent.showtheme = true;
    //       // this.drawerService.getMenuItems();
    //     }else{
    //       this.message = response['message'];
    //       this.class = 'message-error';
    //     }
    //     this.UnBlockUI();
    //     this.UpdateView();
    //   });
  }
  loginToken(): void {
    this.BlockUI();
    var p = new User();
    p.tokens = this.userModel.tokens;
    this.authenticateService.logintoken(p).subscribe((response) => {
          if(response.status == 0){
          let userlogin = {
            id: response.id,
            code: response.code,
            avatar: response.avatar,
            firstName: response.firstName,
            lastName: response.lastName,
            roleID: response.roleID,
            roleName: response.roleName,
            userlogin: response.username,
            token: this.userModel.tokens,
            expiryDate: response.token.expiryDate,
            branch:response.branch,
            department:response.department,
            title_code:response.title_code,
            position_code:response.position_code,
            level:response.level
          }
          var obj = {
            status:0,
            message:'Success',
            userlogin:userlogin
          }
          try{
              window['ReactNativeWebView'].postMessage(JSON.stringify(obj),'https://erpapp.osoft.vn',[]);
          }catch{}
          this.accountService.setAuthToken(this.userModel.tokens);
          this.cookieService.putObject('userlogin', userlogin);
          this.cookieService.put('allowShowTheme', "true");
          // this.cookieService.put('token', response.token.value);
          this.appComponent.showtheme = true;
          location.href = '/'
          // this.drawerService.getMenuItems();
        }else{
          this.message = response['message'];
          this.class = 'message-error';
          var obje = {
            status:0,
            message:response['message'],
            userlogin:{}
          }
          try{
            window['ReactNativeWebView'].postMessage(JSON.stringify(obje),'https://erpapp.osoft.vn',[]);
          }catch{}
        }
      this.UnBlockUI();
      this.UpdateView();
    },
    (err) => {
        if (err.status == 401) {
          this.cookieService.remove('userlogin');
          this.cookieService.remove('allowShowTheme');
          this.router.navigateByUrl('/login');
        }
    },
    () => {
        //isloading = true
    })
  }
  onForgotPassword(){
    this.forgotPassword = true;
  }
  clearForm(): void {
    this.form.reset();
  }
  signOut(): void {
    this.systemService.PostByModel('api/logout', { tokens: this.appSession.user.token })
    .subscribe((response) => {
      if(response['status'] == 0){
        this.cookieService.remove('userlogin');
        this.cookieService.remove('allowShowTheme');
        location.reload();
      }else{
        alert(response['Message'] )
      }
    });
  }

  // public async execute(): Promise<void> {
  //   let spinner = '';
  //   try {
  //     let ipv4 = await publicIp.v4({ onlyHttps: true });
  //     spinner = `IPv4: ${ipv4}`;
  //   } catch (error) {
  //     spinner = `No ipv4 address found. (Error: ${error.message})`;
  //   }
  // }
}
