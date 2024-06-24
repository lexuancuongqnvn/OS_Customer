import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { LayoutComponentBase } from '../../layout/layoutBase';
import { AccountService } from '../../service-proxies/api-shared';

@Component({
  selector: 'verify-password',
  templateUrl: './verify-password.component.html',
  styleUrls: ['./verify-password.component.css']
})
export class VerifyPasswordComponent extends LayoutComponentBase implements OnInit {

  constructor(
    private injector: Injector,
    private accountService: AccountService,
    private $route: ActivatedRoute,
  ) {
    super(injector);
    var v = this.$route.snapshot.queryParamMap.get('verify')
  }
  @Input() email:string;
  message:string = '';
  class:string = '';
  display:boolean = true;
  @BlockUI() blockUI: NgBlockUI;
  @ViewChild('passwordNew') passwordNew: TextBoxComponent;
  @ViewChild('confirmpassword') confirmtextbox: TextBoxComponent;
  form: FormGroup = new FormGroup({
    username: new FormControl(),
    Code: new FormControl(),
    passwordNew: new FormControl(),
    confirmpassword: new FormControl()
  });
  ngOnInit(): void {
    setTimeout(() => {
      this.passwordNew.input.nativeElement.type = 'password';
      this.confirmtextbox.input.nativeElement.type = 'password';
    }, 200);
  }
  toggleVisibility(): void {
    let inputEl = this.passwordNew.input.nativeElement;
    inputEl.type = inputEl.type === 'password' ? 'text' : 'password';
    inputEl = this.confirmtextbox.input.nativeElement;
    inputEl.type = inputEl.type === 'password' ? 'text' : 'password';
  }
  public submit(){
    this.blockUI.start('Loading...');
    this.accountService.sYS_Account_Infomation_UpdatePassword(this.email,this.form.value.Code,'',this.form.value.passwordNew,this.form.value.confirmpassword).subscribe((response) => {
      if(response['Status'] != 0){
        this.message = response['Message'];
        this.class = 'message-error';
      }
      else{
        this.message = response['Message'];
        this.class = 'message-sucess';
      }
      this.display = false;
      this.blockUI.stop();
    })
  }
}
