import { AfterContentChecked, Component, Injector, ViewChild } from '@angular/core';
import { DrawerSelectEvent } from '@progress/kendo-angular-layout';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Observable } from 'rxjs';
import { Globals } from 'src/globals';
import { dataMenu, DrawerService } from './shared/shared.service';
import { items } from './shared/layout/drawer/items';
import { ShareModule } from './shared/shared.module';
import { LayoutComponentBase } from './shared/layout/layoutBase';
import $ from "jquery";
import { MessengerService } from './signalR/messenger/messenger.service';
import config from "devextreme/core/config";
import { BlockTemplateCmp } from './app-block-template.component';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from './shared/service-proxies/api-shared';

const exist: boolean = false;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [Globals],
  styleUrls: ['./app.component.css']
})

export class AppComponent extends LayoutComponentBase implements AfterContentChecked {
  selected: number = -1;
  items: any[] = items.parents;
  dataMenu: any[];
  itemIndex: number = 0;
  showtheme: boolean = false;
  showContentOnly: boolean = false;
  forgotPassword: boolean = false;

  _exist: boolean = false;
  public loadingPanelVisible = true;
  public view: Observable<ShareModule>;
  @ViewChild('drawer') drawer;
  @ViewChild('dialogExist') dialogExist;
  @BlockUI() blockUI: NgBlockUI;
  blockTemplate: BlockTemplateCmp = BlockTemplateCmp;
  constructor(
    private globals: Globals,
   
    injector: Injector
  ) {

    super(injector);

      var t = this.globals.getDrawerItems();
      if (this.cookieService.get('allowShowTheme') == 'true') {
        this.showtheme = true;
      } else {
        this.showtheme = false;
      }
      if (this.cookieService.get('exist') == 'true') {
        this._exist = true;
      }
      // this.blockUI.start('Loading...'); // Start blocking
      // setTimeout(() => {
  
      //   this.blockUI.stop(); // Stop blocking
      // }, 2 * 1000);
  
      this.dataMenu = dataMenu['parents'];
       
      config({
        defaultCurrency: 'VND'
      });
      var arrParam = location.pathname.split(';').slice(1);
      if(arrParam.find(p=>p === 'co=1'))this.showContentOnly = true
  }
  ngAfterContentChecked(): void {

  }
  ngAfterViewInit(): void {

  }
  initLoadDrawer() {

  }
  
  setData(v: Object) {
    this.UpdateView();
  }
  Toggle() {
    this.drawer.toggle();
  }

  onSelect(ev: DrawerSelectEvent): void {
    this.selected = ev.item.id;

    let item = this.dataMenu.find((e, index) => {
      this.itemIndex = index;
      return e.id === this.selected;
    });
    item.expanded ? (item.expanded = false) : (item.expanded = true);

    if (this.selected != undefined && this.dataMenu.find(element => element.id > this.selected) != undefined) {
      var sub = this.dataMenu.find(element => element.id == this.selected)['overview'];
      item.expanded ? this.addChildren(sub) : this.removeChildren(sub);
    } else {
      this.router.navigate([ev.item['link']]);
    }

    // if (ev.item.text === 'Getting Started') {
    //   item.expanded ? this.addChildren(items.gettingStarted) : this.removeChildren(items.gettingStarted);
    // }
    // if (ev.item.text === 'Overview') {
    //   item.expanded ? this.addChildren(items.overview) : this.removeChildren(items.overview);
    // }
  }
  updateViewApp() {
    this.UpdateView();
  }
  addChildren(children: any[]) {
    this.dataMenu.splice(this.itemIndex + 1, 0, ...children);
  }

  removeChildren(children: Array<any>) {
    this.dataMenu.splice(this.itemIndex + 1, children.length);
  }
  public existSession() {
    this.cookieService.put('exist', "true");
    this.UpdateView();
  }
  public OK() {
    this.cookieService.remove('userlogin');
    this.cookieService.remove('allowShowTheme');
    this.showtheme = false;
    this._exist = false;
  }
}

