import { Component, Injector, Input, OnInit } from '@angular/core';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { SYS_List_App_ENTITY, SYS_List_App_Group_ENTITY, SYS_Menu } from 'src/app/shared/service-proxies/api-shared';

declare var cycleTestimonials
@Component({
  selector: 'list-apps',
  templateUrl: './list-apps.component.html',
  styleUrls: ['./list-apps.component.css']
})
export class ListAppsComponent extends LayoutComponentBase  implements OnInit {

  constructor( injector: Injector) { super(injector); }
  @Input() DataGroups:SYS_List_App_Group_ENTITY[] = [];
  @Input() DataApps:SYS_List_App_ENTITY[] = [];
  @Input() DataMenus:SYS_Menu[] = [];
  indexApp :number = 0;
  ngOnInit(): void {
    this.indexApp = this.DataApps.findIndex(e=>e.key_app == this.getModule);
    this.DataApps.forEach(app=>{
      app.sYS_Menus = this.DataMenus.filter(a=>a.module == app.key_app);
    })
    setTimeout(() => {
      cycleTestimonials(this.indexApp);
    },1 );
  }
  public onChangeAndSaveApp(app:SYS_List_App_ENTITY) {
    var default_link = app.default_link;
    localStorage.setItem('localStorageapp',app.key_app);
    this.cookieService.put('cookiedefaultlink',default_link);
    localStorage.setItem('cookieappName', app.name);
    location.href= '/';
  }
  onClickLi(app:any,i:any){
    this.indexApp=i;
  }
}
