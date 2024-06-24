import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { async } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { DxDataGridComponent, DxDrawerComponent } from 'devextreme-angular';
import ArrayStore from 'devextreme/data/array_store';
import DataSource from 'devextreme/data/data_source';
import $ from "jquery";
import moment from 'moment';
import { CookieService } from 'ngx-cookie';
import { AppConsts } from 'src/app/app-consts.component';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { LoginComponent } from 'src/app/shared/form/login/login.component';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { ChatModel, ERPCommonService, HRM_BranchService, HRM_Branch_ENTITY, MenuService, MessengerApiService, NotificationHRMService, NotificationModel, Notification_HRM_ENTITY, ReferenceService, SignalRService, SYSCommonService, SYS_List_App_ENTITY, SYS_List_App_Group_ENTITY, SYS_List_Voucher_ENTITY, SYS_Menu, SYS_Menu_Sub, SYS_Voucher_Year_ENTITY } from 'src/app/shared/service-proxies/api-shared';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';
import { MessengerService } from 'src/app/signalR/messenger/messenger.service';

declare var outAnnounce;
declare var ShowNotification;
declare var showSwalApp;
@Component({ 
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'
    , '../assets/css/font-awesome.min.css'
    , '../assets/css/material-dashboard.minf066.css'
    , '../assets/demo/demo.css'
  ]
})
export class LayoutComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {
  constructor(
    injector: Injector,
    private appSession: AppSession,
    private menuService:MenuService,
    private sYSCommonService: SYSCommonService,
    private eRPCommonService: ERPCommonService,
    private notificationHRMService:NotificationHRMService,
    private messengerServiceAPI:MessengerApiService,
    private hRM_BranchService:HRM_BranchService,
    private messengerService:MessengerService,
    private dialog: MatDialog,
    private login:LoginComponent
  ) {
    super(injector);
    this.voucher_date = new Date(this.selectedYear,1,1);
    if(this.appSession.user.username.toUpperCase()=='ROOT' || this.appSession.user.username.toUpperCase()=='ADMIN') this.isShowBlockVoucherYear = true;
    if(!this.getModule) {
      setTimeout(() => {
        this.hidenShowMenuDrawer('Apps')
      }, 500);
    }
  }
  onAdd(): void {
    throw new Error('Method not implemented.');
  }
  onUpdate(item: any): void {
    var input = new SYS_List_Voucher_ENTITY();
    input.block_type = this.isBlockAuto ? 4 : this.selectedBlockBookId;
    input.block_to_date = this.convertDateToMomentUTC(this.blockDate);
    input.block_to_date = input.block_to_date.utc(true);
    input.is_block_auto = this.isBlockAuto;
    input.per_day = this.perDayBlockAuto;
    this.SYS_List_Voucher.map(v=>{
      v.block_to_date = this.convertMomentToMomentUTC(v.block_to_date)
    })
    input.voucher_details = this.SYS_List_Voucher;
    this.eRPCommonService.sYS_List_Voucher_Block_Book_Update(input).subscribe(res=>{
      this.showMessage(res.message,res.status);
    })
  }
  onDelete(item: any): void {
    throw new Error('Method not implemented.');
  }
  onApprove(item: any): void {
    throw new Error('Method not implemented.');
  }
  onViewDetail(item: any): void {
    throw new Error('Method not implemented.');
  }
  onSave(): void {
    throw new Error('Method not implemented.');
  }
  onSearch(): void {
    throw new Error('Method not implemented.');
  }
  onResetSearch(): void {
    throw new Error('Method not implemented.');
  }
  onClickAcction(id: number, storedName: string, param: string, keyService: string, classForm: string): void {
    throw new Error('Method not implemented.');
  }
  getDataByID(storedName: string, param: string, keyService: string): void {
    throw new Error('Method not implemented.');
  }
  @ViewChild(DxDrawerComponent, { static: false }) drawer: DxDrawerComponent;
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;
  navigation: any[]=[
  { id: 1, text_en:'Account', text_vn: 'Tài khoản', icon: '' ,key:'Account'},
  { id: 2, text_en:'List notifitions', text_vn: 'Danh sách thông báo', icon: '',key:'Announce' },
  { id: 3, text_en:'List apps', text_vn: 'Danh sách ứng dụng', icon: '',key:'Apps' },
  { id: 4, text_en:'Voucher year', text_vn: 'Năm tài chính', icon: '',key:'voucherDate' }];
  List_Type_Block_Book: any[]=[
  { id: 1, name:this.translate('Khóa toàn bộ theo ngày',' Block all by date')},
  { id: 2, name:this.translate('Khóa Theo chi nhánh',' Block by branch')},
  { id: 3, name:this.translate('Khóa Theo chứng từ',' Block by voucher')},
];

  showSubmenuModes: string[] = ['slide', 'expand'];

  positionModes: string[] = ['left', 'right'];

  showModes: string[] = ['push', 'shrink', 'overlap'];

  tbName: string='tbBlockBookDate';
  titleDrawer: string='';
  drawerSelected: object={key:''};

  selectedOpenMode = 'shrink';

  selectedPosition = 'right';

  selectedRevealMode = 'slide';

  isDrawerOpen:boolean = false;
  zooming:boolean = false;
  isShowBlockVoucherYear:boolean = false;

  elementAttr: any;
  fullName:string = '';
  blockDate:Date = new Date();
  appName:string = '';
  title:string = '';
  avtIMG:string = '';
  version:string='';
  listMenu:SYS_Menu[] = [];
  listMenuTemp:SYS_Menu[] = [];
  listMenuChoose:SYS_Menu[] = [];
  listNotification:Notification_HRM_ENTITY[] = [];
  counterNotification:number = 0;
  notificationModel: NotificationModel = new  NotificationModel();
  List_Apps:SYS_List_App_ENTITY[] = [];
  List_Appssubarrays:any[] = [];
  List_App_Group:SYS_List_App_Group_ENTITY[] = [];
  List_Branch:HRM_Branch_ENTITY[] = [];
  List_Voucher_Year:SYS_Voucher_Year_ENTITY[] = [];
  SYS_List_Voucher:SYS_List_Voucher_ENTITY[] = [];
  dataSource: DataSource;
  AppChoose:SYS_List_App_ENTITY = new SYS_List_App_ENTITY();
  selectedYear: number = this.getVoucherDate();
  selectedBlockBookId: number = 1;
  branName: string = this.appSession.user.branch_name;
  selectedBranch: string = this.appSession.user.branch;
  selectedVoucherBranch: string = this.appSession.user.branch;
  popupVisible:boolean = false;
  isBlockAuto:boolean = false;
  perDayBlockAuto:number = 2;
  widthPopup:number = window.screen.width*0.8;
  heightPopup:number = window.screen.height*0.8;
  @ViewChild('dialogChangeVoucherDate') dialogChangeVoucherDate: DialogAcctionComponent;
  ngOnInit(): void {
    this.fullName = this.appSession.user.firstName + ' ' + this.appSession.user.lastName; 
    this.avtIMG = this.appSession.user.avatar;
    this.UpdateView();
    if(!this.avtIMG){
      this.avtIMG = '../assets/img/default-avatar.png'
    }
    this.loadMenu();
    // this.referenceService.sYS_Version_UI_Search().subscribe(rs=>{
    //   this.version = rs['name'];
    // });
    this.notificationModel.top = 20;
    this.onLoadAnnounce();
   
    this.checkAndSetClassSidebarMini();
    this.con_notification['start']().then(function () {  
      console.log('Notifi Connected!');  

    }).catch(function (err) {  
      return console.error(err.toString());  
    });  

    this.con_notification['on']('ReceiveNotifiRemind',(respond:NotificationModel) => {  
      if(respond.arr_to.find(e=>e == this.appSession.user.code)){
        ShowNotification(respond.user_send,respond.client_avt,respond.message,respond.link_direct);
        this.showMessageSuccess('Thông báo mới: ' +respond.message)
        this.onLoadAnnounce();
      }
    }); 
    
    this.con_chat['start']().then(function () {  
      console.log('chat Connected!');  
    }).catch(function (err) {  
      return console.error(err.toString());  
    }); 
    this.con_notification['on']('NotifiMessage', (respond:NotificationModel) => {  
      if(respond.arr_to.find(e=>e == this.appSession.user.username))
      {
        ShowNotification(respond.user_send,respond.client_avt,respond.message,respond.link_direct);
        this.showMessageSuccess('Thông báo mới: ' +respond.message)
        this.onLoadAnnounce();
      }
    }); 
    this.con_notification['on']('NotifiAll', (respond:NotificationModel) => {
      if(respond.arr_to.find(e=>e == this.appSession.user.code))
      {
        ShowNotification(respond.user_send,respond.client_avt,respond.message,respond.link_direct);
        this.showMessageSuccess('Thông báo mới: ' +respond.message)
        this.onLoadAnnounce();
      }
    }); 
    this.appName =localStorage.getItem('cookieappName');
    this.getMessage();
    let url = location.pathname.split(';');
    if(url.length>1){
      this.goToList();
    }
  }
  onSearchMenu(e:any){
    if(e.value){
      this.listMenu = [];
      for(var i=0;i<this.listMenuTemp.length;i++)this.listMenu.push(new SYS_Menu({...this.listMenuTemp[i]})as SYS_Menu)
      this.listMenu.forEach(lv2=>{
        if(lv2.syS_Menu_Sub){
          lv2.syS_Menu_Sub = lv2.syS_Menu_Sub.filter(ls=>ls.name.toUpperCase().indexOf(e.value.toUpperCase()) >= 0);
        }
      })
      this.listMenu =  this.listMenu.filter(lv1=>lv1.name.toUpperCase().indexOf(e.value.toUpperCase()) >= 0 || lv1.syS_Menu_Sub.length > 0);

    }else {
      this.listMenu = [];
      for(var i=0;i<this.listMenuTemp.length;i++)this.listMenu.push(new SYS_Menu({...this.listMenuTemp[i]})as SYS_Menu)
    }
  }
  public logOut(){
    this.login.signOut();
  }
  public refreshMenu(){
    let urlInfo = [];
    var path = document.location.pathname.split(';')[0];
    var url = location.pathname;
    var isSub = false;
    var permission = false;
    this.listMenu.forEach(l0=>{
      if(l0.link==path) permission=true;
      urlInfo.push({
        code:l0.code,
        title:l0.name,
        url:l0.link
      })
      l0.syS_Menu_Sub.forEach(l1=>{
        urlInfo.push({
          code:l1.code,
          title:l1.name,
          url:l1.link
        })
        if(l1.link==path) permission=true;
        if(l1.link == url && url) {
          l1['classactive'] = 'active';
          this.cookieService.remove('coolieURL');
          this.cookieService.remove('coolieName');
          if(url){
            this.cookieService.put('coolieURL', url);
            this.cookieService.put('coolieName', l1.name);
          }
          isSub = true;
        }
        else {
          l1['classactive'] = '';
        }
      })
      if(l0.link == url) {
        l0['classactive'] = 'active';
        this.cookieService.remove('coolieURL');
        this.cookieService.remove('coolieName');
        if(url){
          this.cookieService.put('coolieURL', url);
          this.cookieService.put('coolieName', l0.name);
        }
      }
      else{
        l0['classactive'] = '';
      }
      if(isSub){
        l0['collapsed'] = 'collapsed';
        l0['show'] = 'show';
        isSub = false;
      }else{
        l0['collapsed'] = '';
        l0['show'] = '';
      }
    })
    if(path == '/' || path == '') 
    {
      if(this.cookieService.get('cookiedefaultlink') && this.cookieService.get('cookiedefaultlink') != '/' && this.cookieService.get('cookiedefaultlink') != '' && this.appSession.user.username.toUpperCase()!="ROOT"){
        location.href = this.cookieService.get('cookiedefaultlink');
      }else this.router.navigateByUrl('/');
    }
    if(!permission && path != '/user-my-profile' && path != '/setting-login' && path != '/messenger-v2' && path != '/messenger' && path != '/check-in-out-app' && path != this.cookieService.get('cookiedefaultlink') && this.appSession.user.username.toUpperCase()!="ROOT") {
      this.router.navigateByUrl('/');
    }
    this.cookieService.remove('cookieUrlInfo');
    this.cookieService.putObject('cookieUrlInfo',urlInfo);
    this.UpdateView();
  }
  public loadMenu(){
    if(this.getDataMenu[0]) return;
    let p = new SYS_Menu();
    p.userID = this.appSession.user.id;
    p.module = this.getModule;
    this.menuService.sYS_Menu_Search(p).subscribe((response) => {
      this.setDataMenu(response);
      this.listMenu = response;
      this.listMenuTemp = response;
      this.refreshMenu();
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
  getMessage(){
    try{
     var chatModel = new ChatModel();
     chatModel.user_login =this.appSession.user.username;
     this.messengerServiceAPI.chat_GetHistoryMessenger(chatModel).subscribe(result => {
         var new_message = 0;
         result.forEach(e=>{
           new_message += e.new_message;
         })
         this.set_new_message(new_message);
         this.UpdateView();
       }
     )
    }catch{}
   }
  public sidebarMini() {
    this.rendersidebarmini();
  }
  onClickDrawer(){
    this.isDrawerOpen = !this.isDrawerOpen;
    this.drawer.instance.toggle();
    this.UpdateView();
  }
  async getValueVoucherDate(lc:string){
    if(this.SYS_List_Voucher.length == 0 )
      this.SYS_List_Voucher = await this.eRPCommonService.sYS_List_Voucher_Search(new SYS_Voucher_Year_ENTITY({company_code:this.appSession.user.company_code})).toPromise();
    this.isBlockAuto = this.SYS_List_Voucher[0].is_block_auto;
    this.perDayBlockAuto = this.SYS_List_Voucher[0].per_day?this.SYS_List_Voucher[0].per_day:2;
    let listVoucher = this.SYS_List_Voucher;
    if(this.selectedBlockBookId==2)
      listVoucher = this.SYS_List_Voucher.filter(e=>e.company_code == this.List_Branch.find(c=>c.code == this.selectedBranch).company_code)
    const maxDateObject = this.SYS_List_Voucher.reduce((prev, current) => {
      return prev.block_to_date > current.block_to_date ? prev : current;
    });
    this.blockDate = maxDateObject.block_to_date.toDate()
  }
  public async hidenShowMenuDrawer(lc: string) {
    this.getValueVoucherDate(lc);
    if(lc == 'Apps')this.checkAndLoadDataApp()
    if(lc == 'voucherDate')this.onLoadVoucherYear()
    if(!this.drawerSelected['key'] || lc == this.drawerSelected['key']) await this.onClickDrawer()
    if(this.isDrawerOpen){
      var item = this.navigation.find(e=>e.key == lc);
      this.drawerSelected = item;
      this.titleDrawer  = this.appSession.user.language_id==1? item.text_vn:item.text_en;
    }
    if(this.counterNotification > 0 && lc == 'Announce'){
      this.counterNotification = 0;
      this.notificationModel.account_id = this.appSession.user.id;
      this.notificationHRMService.hRM_Notification_View(this.notificationModel).subscribe((response) => {},
      (err) => {
          if (err.status == 401) {
            this.cookieService.remove('userlogin');
            this.cookieService.remove('allowShowTheme');
            this.router.navigateByUrl('/login');
          }
      })
     //this.UpdateView();
    }
  }
  public async hidenShowMenu(lc: string) {
  
    if ($('.nav-' + lc).hasClass('collapsed')) {
      $('.nav-' + lc).removeClass('collapsed');
      $('.collapse-' + lc).removeClass('show');
    } else {
      $('.nav-' + lc).addClass('collapsed');
      $('.collapse-' + lc).addClass('show');
    }
  
  }
  public viewMoreAnnounce(){
    this.BlockUI();
    this.notificationModel.account_id = this.appSession.user.id;
    this.notificationModel.top += 10;
    this.notificationHRMService.notification_HRM_Search(this.notificationModel).subscribe((response) => {
      this.listNotification = response;
      this.UnBlockUI();
      this.UpdateView();
      // this.messengerService.PostNotification(this.notificationModel).subscribe(response=>{
      //   console.log(response)
      // })
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
  onScroll(event: any) {
    // visible height + pixel scrolled >= total height 
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
      this.viewMoreAnnounce();
    }
}
  public onScrollAnnounce(){
    if(outAnnounce())
    {
      this.viewMoreAnnounce();
    }
  }
  public onLoadAnnounce(){
    this.notificationModel.account_id = this.appSession.user.id;
    this.notificationHRMService.notification_HRM_Search(this.notificationModel).subscribe((response) => {
      if(response){
        this.listNotification = response;
        try{
          this.counterNotification = response[0].total;
        }catch{ this.counterNotification=0;}
        this.UpdateView();
      }
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
  public async onClickReadNotification(item:any){
    if(this.getModule != item.module){
      if(this.List_Apps.length==0){
        await this.showSwalApp(false,item);
        return;
      }
      var default_link = this.List_Apps.find(e=>e.key_app == item.module).default_link;
      this.appName = this.List_Apps.find(e=>e.key_app == item.module).name;
      localStorage.setItem('localStorageapp',item.module);
      this.cookieService.put('cookiedefaultlink',default_link);
      localStorage.setItem('cookieappName', this.appName)
    }
    let id = item.id,link = item.link_direct;
    this.BlockUI();
    this.listNotification.forEach(e=>{
      if(e.id == id){
        e.isRead = true;
      }
    })
    this.UpdateView();
    this.BlockUI();
    this.notificationModel.id = id;
    this.notificationModel.account_id = this.appSession.user.id;
    this.notificationHRMService.hRM_Notification_Read(this.notificationModel).subscribe((response) => {
      location.href=link;
      this.UnBlockUI();
    },
    (err) => {
        if (err.status == 401) {
          this.cookieService.remove('userlogin');
          this.cookieService.remove('allowShowTheme');
          this.router.navigateByUrl('/login');
        }
    },
    () => {
      this.UnBlockUI();
    })
  }
  public async showSwalApp(isshowApp:boolean = true,item:any=null){
    this.appCurrent = this.cookieService.get('cookieApp')?this.cookieService.get('cookieApp'):'';
    if(this.appCurrent == ''){
      var p = new SYS_List_App_ENTITY();
      p.type = 'ALL';
      p.user_login = this.appSession.user.code;
      var data = await this.sYSCommonService.sYS_List_App_Search(p).toPromise();
      this.List_Apps =  data;
      if(isshowApp) showSwalApp(data);
      else this.onClickReadNotification(item)
      let currentModel = localStorage.getItem('localStorageapp');
      this.List_Apps.forEach(e=>{
        e['active'] = currentModel==e.key_app?true:false
      })
      this.SplitApps();
    }
} 
public async checkAndLoadDataApp(isshowApp:boolean = true,item:any=null){
  if(this.List_Apps.length == 0){
    var p = new SYS_List_App_ENTITY();
    p.type = 'ALL';
    p.user_login = this.appSession.user.code;
    var data = await this.sYSCommonService.sYS_List_App_Search(p).toPromise();
    this.List_Apps =  data;
    let currentModel = localStorage.getItem('localStorageapp');
    this.List_Apps.forEach(e=>{
      e['active'] = currentModel==e.key_app?true:false
    })
    this.SplitApps();
  }
}
  public async onLoadApp(){
    this.popupVisible = true;
    this.appCurrent = this.cookieService.get('cookieApp')?this.cookieService.get('cookieApp'):'';
    
    this.listMenuChoose = await this.menuService.sYS_Menu_Search(new SYS_Menu({
      type:'FOR-CHOOSE',
      userID:this.appSession.user.id
    })).toPromise();

    if(this.List_Apps.length == 0){
      var p = new SYS_List_App_ENTITY();
      p.type = 'ALL';
      p.user_login = this.appSession.user.code;
      this.List_Apps  = await this.sYSCommonService.sYS_List_App_Search(p).toPromise();
      let currentModel = localStorage.getItem('localStorageapp');
      this.List_Apps.forEach(e=>{
        e['active'] = currentModel==e.key_app?true:false
      })
      this.SplitApps();
    }
  } 
  public SplitApps(){ 
    let a1 = this.List_Apps;
    let chunkSize = 3; // Define the size of each subarray
    
    for (let i = 0; i < a1.length; i += chunkSize) {
      this.List_Appssubarrays.push(a1.slice(i, i + chunkSize));
    }
  }
  public onClickMenu(url:string,level0:number,level1:number,name:string,iS_ROUTER_LINK:boolean,lv0:SYS_Menu,lv1:SYS_Menu_Sub){
    this.cookieService.remove('coolieURL');
    this.cookieService.remove('coolieName');
    this.title = name;
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
    
    // this.listMenu.forEach(l0=>{
    //     l0.syS_Menu_Sub.forEach(l1=>{
    //     if(l1.link == url) {
    //       l1['classactive'] = 'active';
    //       this.cookieService.remove('coolieURL');
    //       this.cookieService.remove('coolieName');
    //       if(url){
    //         this.cookieService.put('coolieURL', url);
    //         this.cookieService.put('coolieName', l1.name);
    //       }
    //     }
    //     else{
    //       l1['classactive'] = '';
    //     }
    //   })
    // })
    
  }
  public ConfirmChangeApp() {
    var default_link = this.AppChoose.default_link;
    this.appName = this.AppChoose.name;
    localStorage.setItem('localStorageapp',this.AppChoose.key_app);
    this.cookieService.put('cookiedefaultlink',default_link);
    localStorage.setItem('cookieappName', this.appName);
    localStorage.removeItem('stateMenu');
    location.href = '/';
  }
  public onChangeApp(app:SYS_List_App_ENTITY) {
    this.AppChoose = app;
  }
  public onChangeAndSaveApp(app:SYS_List_App_ENTITY) {
    this.AppChoose = app;
    this.ConfirmChangeApp()
  }
  logEvent(eventName) {
   console.log(eventName)
  }
  cellTemplateDate(container, options, e) {
    try {
      const noBreakSpace = '\u00A0';
      let format = 'DD/MM/yyyy';
      const text = options.data[options.column.name] && moment(options.data[options.column.name]).format(format);
      container.textContent = text || noBreakSpace;
      container.title = text;
      container.style.textAlign = "right"
    } catch (error) {

    }
  }
  onChangeBlockBookDate(v:any){
    this.selectedBlockBookId = v.value;
    this.onLoadVoucherYear();
  } 
  handleValueChangedDate(v:any){
    this.blockDate = v.value;
  }
  onSelectionChanged(selectedRowKeys, cellInfo, dropDownBoxComponent) {
    cellInfo.setValue(selectedRowKeys[0]);
  }
  getValueDateCell(cell:any):any{
    return  this.SYS_List_Voucher[cell.rowIndex-2][cell.column.name];
  }
  handleValueChangedDateGrid(e:any,cell:any){
    this.SYS_List_Voucher.find((item: any) => item.code === cell.key).block_to_date = this.convertDateToMomentUTC(e.value);
    var items = this.dataSource.items()[0].items;
    for(var i = 0 ; i < items.length ; i++){
      var item1 = this.dataSource.items()[0].items[i].items;
      const updatedItem = item1.find((item: any) => item.code === cell.key);
  
      if (updatedItem) {
        updatedItem[cell.column.name] = e.value;
        this.dataGrid.instance.refresh();
        break;
      }
    }
    // this.dataSource = new DataSource({
    //   store: new ArrayStore({
    //     data: this.SYS_List_Voucher,
    //     key: 'code' // Specify the unique identifier field
    //   })
    // });
    // this.dataGrid.instance.refresh();
  }
  onCellPrepared(e: any) {
    if (e.rowType === 'data' && e.column.allowEditing) {
    debugger
      // Customize the cell's value as needed
      const dataItem = e.data;
      if (e.column.dataField === 'name' && dataItem.id === 1) {
        e.cellElement.innerText = 'Modified Name';
      }
    }
  }
  zoomDrawer(){
    if(!this.zooming){
      $('.dx-drawer-panel-content').css('width','700px');
      $('.dx-drawer-panel-content .dbody').css('width','700px');
    }else{
      $('.dx-drawer-panel-content').css('width','400px');
      $('.dx-drawer-panel-content .dbody').css('width','400px');
    }

    this.zooming = !this.zooming;
  }
  onCloseMenuMini(){
    $('.btn-navbar-toggler')[0].click()
  }
  onChangeVoucherDate(v:any){
    //this.voucher_date = v;
    this.selectedYear = v.value;
    this.dialogChangeVoucherDate.open();
  }
  onChangeBlockBookBranch(v:any){
    this.selectedBranch = v.value;
  }
  async onChangeVoucherBranch(e:any){
    var bran = this.List_Branch.find(b=>b.code == e.value)
    var obj = await localStorage.getItem('userStorage');
    var user = JSON.parse(obj);
    user['branch'] = bran.code;
    user['company_code'] = bran.company_code;
    user['branch_name'] = bran.name;
    await localStorage.removeItem('userStorage');
    await localStorage.setItem('userStorage',JSON.stringify(user));
    await this.cookieService.remove('userlogin');
    await this.cookieService.putObject('userlogin', user);
    location.reload();
  }
  confirmChangeVoucherDate() {
    localStorage.removeItem('voucherDate');
    localStorage.setItem('voucherDate',this.selectedYear.toString());
    location.reload();
    this.UpdateView();
  }
  async onLoadVoucherYear(){
    if(this.List_Voucher_Year.length == 0)
      this.List_Voucher_Year = await this.eRPCommonService.sYS_Voucher_Year_Search(new SYS_Voucher_Year_ENTITY()).toPromise();
    if(this.List_Branch.length == 0 && (this.selectedBlockBookId==2 || this.selectedBlockBookId==1))
      this.List_Branch = await this.hRM_BranchService.hRM_Branch_Search(new HRM_Branch_ENTITY()).toPromise();
    
    if(this.SYS_List_Voucher.length == 0 )
    {
      this.SYS_List_Voucher = await this.eRPCommonService.sYS_List_Voucher_Search(new SYS_Voucher_Year_ENTITY({company_code:this.appSession.user.company_code})).toPromise();
    }
    this.isBlockAuto = this.SYS_List_Voucher[0].is_block_auto;
    this.perDayBlockAuto = this.SYS_List_Voucher[0].per_day?this.SYS_List_Voucher[0].per_day:2;

    if(this.selectedBlockBookId==3)
    {
      this.zoomDrawer()
      this.dataSource = new DataSource({
        store: new ArrayStore({
          data: this.SYS_List_Voucher,
          key: 'code' // Specify the unique identifier field
        })
      });
      this.dataGrid.instance.refresh();
    }
  }
  public onChangeValue(v:any) {
    var default_link = this.List_Apps.find(e=>e.key_app == v).default_link;
    this.appName = this.List_Apps.find(e=>e.key_app == v).name;
    localStorage.setItem('localStorageapp',v);
    this.cookieService.put('cookiedefaultlink',default_link);
    localStorage.setItem('cookieappName', this.appName)
  }
  onSettingVoucher(){

  }
}
