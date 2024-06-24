import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { LoginComponent } from '../../form/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() public toggle = new EventEmitter();
  @Input() public selectedPage: string | undefined;
  constructor(
    private loginComponent: LoginComponent,
    private appComponent: AppComponent
  ) { }

  ngOnInit(): void {
  }
  logOut() {
    this.loginComponent.signOut();

  }
  public onButtonClick(): void {
    this.appComponent.Toggle();
    this.toggle.emit();
  }

  public settings: Array<any> = [
    {
      text: "My Profile",
    },
    {
      text: "Friend Requests",
    },
    {
      text: "Account Settings",
    },
    {
      text: "Support",
    },
    {
      text: "Log Out",
    },
  ];
  public icon = "cog";
}
