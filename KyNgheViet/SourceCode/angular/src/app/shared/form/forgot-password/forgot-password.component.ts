import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { LayoutComponentBase } from '../../layout/layoutBase';
import { AccountService, Mail_ENTITY } from '../../service-proxies/api-shared';

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent extends LayoutComponentBase implements OnInit {

  constructor(
    private injector: Injector,
    private accountService: AccountService,
  ) {
    super(injector);

  }
  message:string = '';
  class:string = '';
  email:string = '';
  display:boolean = true;
  verifyPassword:boolean =  false;
  @BlockUI() blockUI: NgBlockUI;
  ngOnInit(): void {
  }
  form: FormGroup = new FormGroup({
    email: new FormControl()
  });
  public submit(){
    this.blockUI.start('Hệ thống sẽ gửi mail cho bạn trong vài giây...');
    this.email = this.form.value.email;
    let p = new Mail_ENTITY();
    p.email=this.form.value.email;
    this.accountService.sYS_Account_Infomation_ForgotPassword_Inserst(p).subscribe((response) => {
      if(response['Status'] == -1){
        this.message = response['Message'];
        this.class = 'message-error';
      }
      if(response['Status'] == 1){
        this.verifyPassword = true;
        this.message = response['Message'];
        this.class = 'message-sucess';
      }
      else{
        this.verifyPassword = true;
        this.message = response['Message'];
        this.class = 'message-sucess';
      }
      this.display = false;
      this.blockUI.stop();
    })
  }
}
