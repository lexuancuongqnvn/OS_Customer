import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Globals } from 'src/globals';
import { AppSession } from '../../app-session/app-session';
import { User } from '../../models/system/account';
import { MenuService, SYS_Menu } from '../../service-proxies/api-shared';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  providers: [Globals],
  styleUrls: ['./drawer.component.css']
})
export class AppDrawerComponent implements OnInit, AfterContentChecked {

  sYS_Menu: SYS_Menu[];
  constructor(
    private menuService: MenuService,
    private appSession: AppSession,
    private globals: Globals,
    private ref: ChangeDetectorRef
  ) {
    if (this.globals.getDrawer() == undefined)
      this.getDrawer();
  }
  ngAfterContentChecked(): void {
    // if (this.globals.getDrawer() != undefined) return;
    // this.getDrawer();
  }

  ngOnInit(): void {

  }
  getDrawer() {
    let param = new SYS_Menu();
    if (!this.appSession.user) return;
    var user = new User();
    user = this.appSession.user;
    param.userID = user.id;
    this.menuService.setAuthToken(user.token);
    this.menuService.sYS_Menu_Search(param).subscribe((data: any[]) => {
      this.globals.setDrawer(data);
      this.sYS_Menu = this.globals.getDrawer();
      this.renderDrawer();
      this.ref.detectChanges();
    })
  }
  renderDrawer() {
    this.sYS_Menu.forEach(e => {
      var children = false, overview = [];
      if (e.syS_Menu_Sub.length > 0) {
        children = true;
        e.syS_Menu_Sub.forEach(e => {
          overview.push({
            text: e.name,
            icon: e.icon,
            selected: false,
            link: e.link,
            level: 1
          });
        });
      }
      // var p = {
      //   id: e.id,
      //   text: e.name,
      //   icon: e.icon,
      //   expanded: false,
      //   children: children,
      //   selected: false,
      //   overview: overview,
      //   link: e.link
      // }
    });
  }
}
