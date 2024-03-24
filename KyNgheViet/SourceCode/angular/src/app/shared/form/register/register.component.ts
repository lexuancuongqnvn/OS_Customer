import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import { LayoutComponentBase } from '../../layout/layoutBase';
import { User } from '../../models/system/account';
import { AccountService, Mail_ENTITY, SYS_Account_Infomation } from '../../service-proxies/api-shared';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  extends LayoutComponentBase implements OnInit {

  constructor(
    private injector: Injector,
    private accountService: AccountService,
  ) {
    super(injector);

  }
  message:string = '';
  class:string = '';
  email:string = '';
  success:boolean = false;
  verifyPassword:boolean =  false;
  isShowConfirmCode:boolean =  false;
  user: User = new User();
  SYS_Account_Infomation:SYS_Account_Infomation = new SYS_Account_Infomation();
  @BlockUI() blockUI: NgBlockUI;
  ngOnInit(): void {
  }
  form: FormGroup = new FormGroup({
    email: new FormControl()
  });
  public submit(){
    if(!this.user.lastName) this.showMessageWarning('(Họ) không được để trống');
    else if(!this.user.firstName) this.showMessageWarning('(Tên) không được để trống');
    else if(!this.user.username) this.showMessageWarning('(Email) không được để trống');
    else if(!this.user.password) this.showMessageWarning('(Mật khẩu) không được để trống');
    else if(!this.user.confirm_password) this.showMessageWarning('(Xác nhận mật khẩu) không được để trống');
    else if(this.user.password != this.user.confirm_password) this.showMessageWarning('Mật khẩu không khớp');
    else{
      this.UpdateView();
      this.SYS_Account_Infomation.email = this.user.username;
      this.SYS_Account_Infomation.password = this.user.password;
      this.blockUI.start('Hệ thống sẽ gửi mail cho bạn trong vài giây...');
      this.accountService.sYS_Account_Register(this.SYS_Account_Infomation).subscribe((response) => {
        if(response['status'] == 0){
          this.isShowConfirmCode = true;
          this.SYS_Account_Infomation.code = response['code'];
        }
        else{
          this.showMessageError(response['message'])
        }
        this.blockUI.stop();
      },
      (err) => this.UnBlockUI(),
      () => {
          this.UnBlockUI();
        }
      )
    }
  }
  public submitConfirmCode(): void {
    if(this.SYS_Account_Infomation.code != this.user.code) this.showMessageError('Mã xác nhận không đúng.');
    else{
      this.BlockUI();
      this.accountService.sYS_Account_Infomation_Register_Confirm(this.SYS_Account_Infomation).subscribe((response) => {
        if(response['status'] == 0){
          this.isShowConfirmCode = false;
          this.success = true;
          this.showMessageSuccess(response['message']);
          this.UpdateView();
        }
        else{
          this.showMessageError(response['message'])
        }
        this.blockUI.stop();
      })
    }
  }
}
