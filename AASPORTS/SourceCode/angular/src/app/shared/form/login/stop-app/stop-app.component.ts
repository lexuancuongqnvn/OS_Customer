import { Component, Injector, OnInit } from '@angular/core';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { AccountService, AuthenticateService } from 'src/app/shared/service-proxies/api-shared';
import { LoginComponent } from '../login.component';

@Component({
  selector: 'app-stop-app',
  templateUrl: './stop-app.component.html',
  styleUrls: ['./stop-app.component.css']
})
export class StopAppComponent  extends LayoutComponentBase implements OnInit {

  constructor(
    private authenticateService: AuthenticateService,
    private appSession: AppSession,
    private injector: Injector,
    private login:LoginComponent
  ) {
    super(injector);
  }

  ngOnInit(): void {
  }
  onStop(){
    this.authenticateService.s0226970B47B14288964566602C9C9646().subscribe((res:any)=>{
      if(res.SYS_Account_Infomation.status == 0){
        this.showMessageSuccess(res.SYS_Account_Infomation.message)
        this.login.signOut();
      }else this.showMessageError('Đã có lỗi xảy ra, vui lòng thử lại')
    })
  }
}
