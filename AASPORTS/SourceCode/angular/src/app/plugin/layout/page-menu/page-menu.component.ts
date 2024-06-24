import { Component, Injector, Input, OnInit, Renderer2 } from '@angular/core';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { MenuService, SYS_Menu, SYS_Menu_Sub, SYS_Menu_Sub_Pin } from 'src/app/shared/service-proxies/api-shared';

@Component({
  selector: 'app-page-menu',
  templateUrl: './page-menu.component.html',
  styleUrls: ['./page-menu.component.css']
})

export class PageMenuComponent extends LayoutComponentBase implements OnInit {
  constructor(
    private injector: Injector,
    private _renderer2: Renderer2,
    private menuService:MenuService,
    private appSession: AppSession,
  ) {
    super(injector);
  }

  listMenu: SYS_Menu[];

  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.onLoadData();
  }

  get getSubMenuBookmark(): SYS_Menu_Sub[] {
    if(!this.listMenu) return [];
    const listBookMark = this.listMenu.flatMap(
      (x) => x.syS_Menu_Sub
    ).filter((x) => x.iS_PIN === true);
    return listBookMark;
  }

  get getSysMenuChange(): SYS_Menu[]{
    return this.listMenu?this.listMenu:[]
  }

  get getSubMenuUnMenuShort(): SYS_Menu_Sub[] {
    if(!this.listMenu) return [];
    const listUnMenuShor = this.listMenu.filter((x) => {
      return x.syS_Menu_Sub.some((y) => y.iS_PIN !== true);
    });
    return listUnMenuShor;
  }

  public onLoadData(){
    if(this.getDataMenu[0]) return;
    let p = new SYS_Menu();
    p.userID = this.appSession.user.id;
    p.module = this.getModule;
    this.menuService.sYS_Menu_Search(p).subscribe((response) => {
      this.setDataMenu(response);
      this.listMenu = response;
    },
    (err) => {
        if (err.status == 401) {
          this.cookieService.remove('userlogin');
          this.cookieService.remove('allowShowTheme');
          location.href = '/login'
        }
    },
    () => {
        //isloading = true
    })
  }

  onUnQuickTask(event:any, pItemMenu: SYS_Menu_Sub) {
    event.stopPropagation();
    this.onValueChangeIsPin(pItemMenu, false);
  }

  onQuickTask(event:any, pItemMenu: SYS_Menu_Sub) {
    event.stopPropagation();
    this.onValueChangeIsPin(pItemMenu, !pItemMenu.iS_PIN);
  }

  onValueChangeIsPin(pItemMenu: SYS_Menu_Sub, is_pin: boolean) {
    const idxMenu = this.listMenu.findIndex((x) =>
      x.syS_Menu_Sub.some((y) => y.code === pItemMenu.code)
    );

    if (idxMenu !== -1) {
      const idxSubMenu = this.listMenu[idxMenu].syS_Menu_Sub.findIndex(
        (y) => y.code === pItemMenu.code
      );

      if (idxSubMenu !== -1) {
        this.listMenu[idxMenu].syS_Menu_Sub[idxSubMenu].iS_PIN = is_pin;
      }
    }
    this.saveChangePinMenu(this.listMenu[idxMenu].syS_Menu_Sub.find(menu=>menu.code == pItemMenu.code));
  }
  async saveChangePinMenu(menu:SYS_Menu_Sub){
    this.menuService.sYS_Menu_Sub_Pin(new SYS_Menu_Sub_Pin({id:menu.id,code:menu.code,iS_PIN:menu.iS_PIN,indeX_PIN:menu.indeX_PIN,employeE_CODE:this.appSession.user.code})as SYS_Menu_Sub_Pin).subscribe(res=>console.log('pined'))
  }
  public onClickMenuQuiTask(url:string,level1:number,name:string,iS_ROUTER_LINK:boolean,lv1:SYS_Menu_Sub)
  {
    var lv0 = this.listMenu.find(e=>e.code = lv1.father);
    this.onClickMenu(url,lv0.id,level1,name,iS_ROUTER_LINK,lv0,lv1);
  }
  public onClickMenu(url:string,level0:number,level1:number,name:string,iS_ROUTER_LINK:boolean,lv0:SYS_Menu,lv1:SYS_Menu_Sub){
    this.cookieService.remove('coolieURL');
    this.cookieService.remove('coolieName');
    if(url){
      this.cookieService.put('coolieURL', url);
      this.cookieService.put('coolieName', name);
    }
    if(iS_ROUTER_LINK) {
      this.navigate(url,{lv0:lv0,lv1:lv1});
      if(lv1)
      {
        $('.li-menu-nav-item .active').removeClass('active');
        $('#id-menu-'+lv1.code).addClass('active');
      }
    }
    else {
      this.saveStorage(url,{lv0:lv0,lv1:lv1});
      location.href = url;
    }  
  }
}
