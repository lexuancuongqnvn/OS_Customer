import { formatCurrency, getCurrencySymbol } from "@angular/common";
import { HttpHeaders } from "@angular/common/http";
import { ApplicationRef, ChangeDetectorRef, ElementRef, InjectionToken, Injector, Pipe, PipeTransform } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import * as signalR from '@microsoft/signalr';
import { GridDataResult } from "@progress/kendo-angular-grid";
import { BreadCrumbItem } from "@progress/kendo-angular-navigation";
import { NotificationService } from "@progress/kendo-angular-notification";
import { AnyTxtRecord } from "dns";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { CookieService } from "ngx-cookie";
import { AppConsts } from "src/app/app-consts.component";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import { AppSession } from "../app-session/app-session";
import { User } from "../models/system/account";
import { ChatModel, FileManagerService, NotificationModel, SYS_Menu } from "../service-proxies/api-shared";
import { EditPageState } from "../ultilities/enum/edit-page-state";
import { Location } from '@angular/common';
import { NotificationComponent } from "./notification/notification.component";
import moment from "moment";
//import { Moment } from "node_modules_old/moment/moment";

const _defaultItems: BreadCrumbItemCustom[] = [
    {
        text: 'Home',
        title: 'Home',
        icon: 'home',
        level: 0
    }
];
const _listVoucher: Object = 
    {
        I42: 'PNH',
        I44: 'PDC',
        I43: 'PXK',
        I41: 'NSX',
        I45: 'PXC',
        S32: 'HDB',
        S33: 'HTL',
        P22: 'PNM',
        P23: 'PNK',
        P24: 'PXT',
        CAT_Warranty_Certificate :'PX'
    };
const con_notification=  new signalR.HubConnectionBuilder()  
.configureLogging(signalR.LogLevel.Information)  
.withUrl(AppConsts.baseUrl + '/notificationHub')  
.build(); 
const con_chat = new signalR.HubConnectionBuilder()  
      .configureLogging(signalR.LogLevel.Information)  
      .withUrl(AppConsts.baseUrl + '/chatHub')  
      .build();  
declare var showNotification;
let _newUpload: any[] = [];
let _arrayFiles: any[] = [];
const _inputMaster: Object = {};
let _requestEdit: Object = {};
let _objValueByID: Object = {};
let _objGenrowTable: Object = {};
let _changeDetected: Boolean = false;
let _isTypeFile: Boolean = false;
let _CountItems: number = 0;
let _idSelected: string = '';
let _listAcction: any[] = [];
let _listDataGrid: Object = {};
let _currentForm: number;
let _role: string;
let _acctionName: string;
let dataMenu: SYS_Menu[] = [];
let _new_message:number = 0;
let _currenFrom:string = '';
let _side_edit_refresh_action:boolean = true;
let _arrHistory:any[]=[];
let _currentTitle:string = 'Phần mềm quản lý ERP';

export class LayoutComponentBase {
    cdr: ChangeDetectorRef;
    ref: ElementRef;
    appRef: ApplicationRef;
    notificationService: NotificationService;
    cookieService: CookieService;
    defaultItems = _defaultItems;
    inputMaster = _inputMaster;
    requestEdit = _requestEdit;
    objValueByID = _objValueByID;
    objGenrowTable = _objGenrowTable;
    CountItems = _CountItems;
    role = _role;
    router: Router;
    location:Location;
    activeRoute: ActivatedRoute;
    acctionName = _acctionName;
    isTypeFile = _isTypeFile;
    voucher_date: Date | undefined;
    stylingMode:string = 'outlined';// 'outlined' | 'underlined' | 'filled'

    labelMode:string = 'static';
    constructor(
        injector: Injector
    ) {
        this.cdr = injector.get(ChangeDetectorRef);
        this.ref = injector.get(ElementRef);
        this.appRef = injector.get(ApplicationRef);
        this.router = injector.get(Router);
        this.location = injector.get(Location);
        this.activeRoute = injector.get(ActivatedRoute);
        this.notificationService = injector.get(NotificationService);
        this.cookieService = injector.get(CookieService);
    }
    private Notification: NotificationComponent;
    public isLoading: boolean = false;
    public isRender: boolean = false;
    @BlockUI() blockUI: NgBlockUI;
    //init form edit/ viewdetail
    storedName: string;
    param: string;
    keyService: string;
    idSelect: string;
    BASE_URL:string = AppConsts.baseUrl;
    notificationModel:NotificationModel = new NotificationModel();
    appCurrent:string = '';
    changeDetected = _changeDetected;
    listAcction = _listAcction;
    listColModelGridEdit:any = {};
    dataMenuWrapper:any[] = [];
    AddItemsBread(item: Object) {
        this.defaultItems.push(item);
    }
    
    con_notification:any= con_notification;
    con_chat:any = con_chat;
    // get getCookieUser():ChatModel{
    //     chatModel.user_login = this.cookieService.getObject('userlogin')['userlogin'];
    // }
    getStartEndDateInMonth(inputDate: moment.Moment = this.getFullVoucherDate): { startDate: moment.Moment; endDate: moment.Moment; }{
        const currentYear = inputDate.year();
        const currentMonth = inputDate.month() + 1; 
        let startDate = moment().startOf('day').set('year',currentYear).set('month',currentMonth - 1).set('date',1).utc(true);
        let endDate = moment().startOf('day').set('year',currentYear).set('month',currentMonth).set('date',1).utc(true);
        endDate = endDate.subtract(1, 'day')
        return { startDate, endDate };
    }
    getQuarterDates(inputDate: Date): { startDate: Date; endDate: Date } {
        const year = inputDate.getFullYear();
        const month = inputDate.getMonth();
      
        let quarterStartMonth: number;
        let quarterEndMonth: number;
      
        if (month >= 0 && month <= 2) {
          // First quarter (Q1): January 1 - March 31
          quarterStartMonth = 0;
          quarterEndMonth = 2;
        } else if (month >= 3 && month <= 5) {
          // Second quarter (Q2): April 1 - June 30
          quarterStartMonth = 3;
          quarterEndMonth = 5;
        } else if (month >= 6 && month <= 8) {
          // Third quarter (Q3): July 1 - September 30
          quarterStartMonth = 6;
          quarterEndMonth = 8;
        } else {
          // Fourth quarter (Q4): October 1 - December 31
          quarterStartMonth = 9;
          quarterEndMonth = 11;
        }
        const endDateFist = new Date(year, quarterEndMonth, 1);
        const nextMonthFirstDay = new Date(endDateFist.getFullYear(), endDateFist.getMonth() + 1, 1);
        const lastDayOfMonth = new Date(nextMonthFirstDay.getTime() - 1);
    
        const startDate = new Date(year, quarterStartMonth, 1);
        const endDate = new Date(year, quarterEndMonth, lastDayOfMonth.getDate());
      
        return { startDate, endDate };
      }
      hourUTC():number{
    
        // Current hour in UTC
        const currentHourUTC = moment.utc().hour();
        
        // Current hour in local time zone
        const currentHourLocal = moment().hour();
        
        // console.log('Current hour in UTC:', currentHourUTC);
        // console.log('Current hour in local time zone:', currentHourLocal);
        return currentHourLocal - currentHourUTC;
      }
    public ClearValid(){
        $('.invalid').removeClass('invalid');
    }
    public getVoucherCodeByName(name:string):string{
        return _listVoucher[name];
    }
    public get CheckValid():boolean{
        var check = false;
        try{
            for(var i = 0 ; i < $('.required').length ; i++){
                var e = $('#'+$('.required')[i].id)
                if(!e.val()){
                    e.addClass('invalid');
                    check = true;
                }
            }
        }catch{}
        
        return check;
    }
    public rendersidebarmini(){
        if ($('.layout-soft').hasClass('sidebar-mini'))
        {
          this.cookieService.remove('sidebar-mini');
          this.cookieService.put('sidebar-mini',"0");
          $('.layout-soft').removeClass('sidebar-mini');
          $('.form-30082023').removeClass('form-30082023-mini');
        }
        else if(!$('.layout-soft').hasClass('sidebar-mini')){
          this.cookieService.put('sidebar-mini',"1");
          $('.layout-soft').addClass('sidebar-mini');
          $('.form-30082023').addClass('form-30082023-mini');
        }
    }
    public checkAndSetClassSidebarMini(){
        if (this.cookieService.get('sidebar-mini') == '0') {
            $('.layout-soft').removeClass('sidebar-mini');
            $('.form-30082023').removeClass('form-30082023-mini');
        }
        else if (this.cookieService.get('sidebar-mini') == '1') {
            $('.layout-soft').addClass('sidebar-mini');
            $('.form-30082023').addClass('form-30082023-mini');
        }
    }
    public get getClassSidebarMini():string{
        if (!$('.layout-soft').hasClass('form-30082023-mini') && this.cookieService.get('sidebar-mini') == '1') {
            return 'form-30082023-mini'
        }
        return '';
    }
    public formatDefaultNumber(v:number):number{
        return v?v:0;
    }
    public replaceAsync(key:string,rep:any,s:string):string{
        while(s.includes(key)){ s=s.replace(key,rep)}
        return s;
    }
    public convertNumber(v:string):number{
        return Number(v.replace(',','.'));
    }
    public getVoucherDate():number{
        let y = localStorage.getItem('voucherDate');
        return y?Number(y):moment().year();
    }
    public get getFullVoucherDate():moment.Moment{
        let y = localStorage.getItem('voucherDate');
        let now = moment();
        if(y) now = now.set('year',Number(y))
        return now;
    }
    
    public convertDateToMomentUTC(v:any,hour:number = 0,minute:number = 0,seconds:number = 0,milliseconds:number = 0):moment.Moment{
        try{
            
            let now = moment(v).startOf('day');
            // now.set('year', v.getFullYear());
            // now.set('month', v.getMonth());
            // now.set('date', v.getDate());
            if(hour !== 0)
                now.set('hour', hour);
            if(minute !== 0)
                now.set('minute', minute);
            if(seconds !== 0)
                now.set('seconds', seconds);
            if(milliseconds !== 0)
                now.set('milliseconds', milliseconds);
            if(!now.isUTC()){
                now = now.utc(true)
              }
            return now;//.utc(true).subtract(this.hourUTC(),'hours');
        } catch {
            return null;
        }
    }
    public convertMomentToMomentUTC(v:any,hour:number = 0,minute:number = 0,seconds:number = 0,milliseconds:number = 0):moment.Moment{
        try{
            let now = moment(v);
            // now.set('year',v.year());
            // now.set('month',v.month());
            // now.set('date',v.date());
            now.set('hour',hour);
            now.set('minute',minute);
            now.set('seconds',seconds);
            now.set('milliseconds',milliseconds);
            if(!now.isUTC()){
                now = now.utc(true)
              }
            return now;//.utc(true).subtract(this.hourUTC(),'hours');
        }catch{
            return this.convertDateToMomentUTC(v,hour,minute,seconds,milliseconds);
        }
    }
    public clearOninit(): void {
        _newUpload = [];
        _arrayFiles = [];
        this.inputMaster = {};
        _objValueByID = {};
        this.objValueByID = _objValueByID;
        _CountItems = 0;
    }
    public getKey(tbName: string, colName: string, id: any): string {
        var keyId = '';
        if (id < 0) keyId = 'new' + (id * (-1));
        else keyId = id;
        return tbName + '_' + colName + '_' + keyId;
    }

    setDataMenu(item: SYS_Menu[]) {
        dataMenu = item;
    }
    get newID():string{
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomText = '';
      
        for (let i = 0; i < 16; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          randomText += characters.charAt(randomIndex);
        }
       return 'NEW-' +randomText;
    }
    get titleApp():string{
        let url = location.pathname.split(';')[0];let title;
        if(_arrHistory.length == 0)
        {
            let obj = this.cookieService.get('cookieUrlInfo');
            if(obj) {
                _arrHistory = JSON.parse(this.cookieService.get('cookieUrlInfo'));
                title = _arrHistory.find(f=>f.url == url);
            }
        }else  title = _arrHistory.find(f=>f.url == url);
        
        if(title)  _currentTitle = title.title;
        else {
            _currentTitle = this.cookieService.get('coolieName');
        }
        
        return _currentTitle;
    }
    get getModule():string{
        //return 'HRM';
         return localStorage.getItem('localStorageapp')?localStorage.getItem('localStorageapp'):'';
    }
   get get_side_edit_refresh_action(): boolean {
        return _side_edit_refresh_action;
    }
    set_side_edit_refresh_action(v:boolean) {
        _side_edit_refresh_action = v;
    }
    get getDataMenu(): SYS_Menu[] {
        return dataMenu;
    }
    setisTypeFile() {
        _isTypeFile = true;
    }
    get getisTypeFile(): Boolean {
        return _isTypeFile;
    }
    setCurrenFrom(v: string) {
        _currenFrom = v;
        document.getElementById('inputCurrentForm')['value'] = v;
    }
    get getCurrenFrom(): string {
        return _currenFrom;
    }
    getDataGrid(tbName: string): GridDataResult {
        if (_listDataGrid[tbName])
            return _listDataGrid[tbName];
        else {
            let a: GridDataResult = {
                data: [],
                total: 0
            }; return a;
        }
    }
    setDataGrid(gridView: GridDataResult, tbName: string) {
        _listDataGrid[tbName] = gridView;
    }
    setRequestEdit(rq: Object) {
        this.requestEdit = rq;
        _requestEdit = this.requestEdit;
    }
    getRequestEdit(): Object {
        return _requestEdit;
    }
    setIdSelected(id: string) {
        _idSelected = id;
    }
    getIdSelected(): string {
        return _idSelected;
    }
    setRoleCurrent(id: number) {
        _currentForm = id;
    }
    get getListAcction():any{
        return _listAcction;
    }
    getRoleCurren_byId(id: number): any {
        return _listAcction.find(e => e['id'] == id);
    }
    getRoleCurren_byFormName(n: string): any {
        return _listAcction.find(e => e['onForm'] == n);
    }

    getRoleCurren(): any {
        return _listAcction.find(e => e['id'] == _currentForm);
    }
    setAcctionForm(acc: any) {
        this.listAcction = acc;
        _listAcction = this.listAcction;
    }
    refreshAcction() {
        try{
            this.refreshMenuWrapper();
        }catch{}
        try {
            var fCrr = _listAcction.find(e => e['id'] == _currentForm);
            var obj = fCrr['lisT_ACCTIONS'].split(';');
            if(_listAcction[0]['roleT'] == undefined)
            {
                for (var j = 0; j < _listAcction.length; j++)_listAcction[j]['roleT'] = _listAcction[j]['role'];
            }
            for (var i = 0; i < _listAcction.length; i++) {
               
                _listAcction[i]['role'] = true;
            }
            
            if(fCrr['onForm'] == 'View'){
                for (var i = 0; i < _listAcction.length; i++)
                        _listAcction[i]['role'] = _listAcction[i]['roleT']
                obj.forEach(element => {
                    for (var i = 0; i < _listAcction.length; i++) {
                        if(this.idSelect){
                            if (parseInt(element) == _listAcction[i]['id']) {
                                _listAcction[i]['role'] = false; break;
                            }
                        }
                    }
                });
            }
            else {
                obj.forEach(element => {
                    for (var i = 0; i < _listAcction.length; i++) {
                        if (parseInt(element) == _listAcction[i]['id']) {
                            _listAcction[i]['role'] = false;
                        }
                    }
                });
            }
            this.listAcction = _listAcction;
            
            // $('.'+fCrr.tbName+fCrr.onForm)[0].click()
            this.UpdateView();
        } catch { }
    }
    translate(vn:string,orther:string):string{
        var user_login = this.cookieService.getObject('userlogin');
        return user_login['language_id'] == 1?vn:orther
    }
    get formatDateDefault():string{
        var user_login = this.cookieService.getObject('userlogin');
        return user_login['language_id'] == 1?'dd/MM/yyyy':'yyyy/MM/dd'
    }
    refreshMenuWrapper(){
        this.dataMenuWrapper = [];
        var menuCurrent = localStorage.getItem('stateMenu');
        menuCurrent = JSON.parse(menuCurrent);
        this.dataMenuWrapper.push({
            url:'javascript:;',
            text:menuCurrent['lv0'].name
        })
        if(this.getCurrenFrom == EditPageState.add || this.getCurrenFrom == EditPageState.edit || this.getCurrenFrom == EditPageState.viewDetail){
            var formName = '';
            var user_login = this.cookieService.getObject('userlogin');
            switch(this.getCurrenFrom){
                case EditPageState.add: formName = user_login['language_id'] == 1?'Thêm mới':'Create'
                break;
                case EditPageState.edit: formName = user_login['language_id'] == 1?'Chỉnh sửa':'Edit'
                break;
                case EditPageState.viewDetail: formName = user_login['language_id'] == 1?'Xem chi tiết':'View detail'
                break;
            }
            this.dataMenuWrapper.push({
                url:menuCurrent['lv1'].link,
                text:menuCurrent['lv1'].name
            })
            this.dataMenuWrapper.push({
                url:menuCurrent['lv1'].link,
                text: formName + ' - '+ menuCurrent['lv1'].name
            })
        }else if(this.getCurrenFrom == EditPageState.view){
            this.dataMenuWrapper.push({
                url:menuCurrent['lv1'].link,
                text:menuCurrent['lv1'].name
            })
        }
    }
    get getDataMenuWrapper():any[]{
        return this.dataMenuWrapper;
    }
    getAcctionForm(): any {
        return _listAcction;
    }
    setInputMaster(item: any, tbName: string) {
        _inputMaster[tbName] = item;
        this.inputMaster = _inputMaster;
    }
    getInputMaster(tbName: string): any {
        if (_inputMaster[tbName])
            return _inputMaster[tbName];
        else
            return null;
    }
    GetChildData(data: any): any {
        return data;
    }
    UpdateView() {
        this.cdr.detectChanges();
    }
    UpdateEditV2() {
        if($('#refreshDataFormV2').length > 0)
            $('#refreshDataFormV2')[0].click();
    }
    PlusCountItems() {
        _CountItems = _CountItems + 1;
        this.CountItems = _CountItems;
    }
    public getCountItems(): number {
        return _CountItems;
    };

    UpdateData() {
        _CountItems = this.CountItems = 0;
        _changeDetected = true;
        this.UpdateView();
        // this.renderForBindingFile();
    }
    isChangeDetected(): Boolean {
        return _changeDetected;
    }
    unChangeDetected() {
        _changeDetected = false;
        return this.changeDetected;
    }
    Detach() {
        this.cdr.detach();
    }
    selectRow(event: any) {
        if(event.dataItem != undefined){
            this.idSelect = event.dataItem.code;
            this.setIdSelected(this.idSelect);
        }else if (event instanceof Array){
            this.idSelect = event.join(';');
            this.setIdSelected(this.idSelect );
        }
        else{
            this.idSelect = event;
            this.setIdSelected(event);
        }
        this.refreshAcction();
    }
    // showSuccess(content: string) {
    //     this.Notification.show();
    // }
    // showWarning(content: string) {

    // }
    // showError(content: string) {

    // }
    Respond401(){
        this.cookieService.remove('userlogin');
        this.cookieService.remove('allowShowTheme');
        this.navigateByUrl('/login');
    }
    BlockUI(message:string = 'Loading...') {
        this.isLoading = true;
        this.blockUI.start(message);
    }
    UnBlockUI() {
        this.isLoading = false;
        this.blockUI.stop();
    }
    pushArrayFiles(data: any) {
        _arrayFiles.push(data);
    }
    setArrayFiles(data: any) {
        _arrayFiles = data;
    }

    getArrayFiles(): any[] {
        return _arrayFiles;
    }
    setNewFile(data: any) {
        _newUpload = data;
    }

    get getNewFile(): any[] {
        return _newUpload;
    }
    setValueEditNoUpdate(key: string, val: any) {
        _objValueByID[key] = val;
        this.objValueByID = _objValueByID;
    }
    setValueEdit(key: string, val: any) {
        _objValueByID[key] = val;
        this.objValueByID = _objValueByID;
        this.UpdateView();
    }
    getValueEdit(Key: string): any {
        return this.objValueByID[Key] ? undefined : null;
    }
    setGenrowTable(tbName: string, data: any) {
        _objGenrowTable[tbName] = data;
    }
    getGenrowTable(tbName: string): any {
        return _objGenrowTable[tbName];
    }
    renderForBindingFile() {
        var keyTemp = [];
        _arrayFiles.forEach(e => {
            var key = e['tbName'] + '_' + e['colName'] + '_' + e['ref_MasterID'];
            if (keyTemp.indexOf(key) <= 0) {
                var v = _arrayFiles.filter(_e => _e['tbName'] == e['tbName'] && _e['colName'] == e['colName'] && _e['ref_MasterID'] == e['ref_MasterID'])
                this.setValueEdit(key, v);
                keyTemp.push(key);
            }
        })
        _changeDetected = true;
        this.UpdateView();
    }
    navigateByUrl(url){
        this.router.navigateByUrl(url);
    }
    saveStorage(url:any,data:any){
        try{
            localStorage.removeItem('stateMenu');
            localStorage.setItem('stateMenu', JSON.stringify(data));
        }catch{}
    }
    navigate(url:any,data:any){
        try{
            localStorage.removeItem('stateMenu');
            localStorage.setItem('stateMenu', JSON.stringify(data));
        } catch{}
        this.router.navigate([url]);
    }
    goBack(){
        window.history.back();
    }
    goToList() {
        try {
            let url = location.pathname.split(';');
            for(var i=url.length;i>1;i--)
            {
                window.history.back();
            }
        } catch {
            location.href = '/'
        }
    }
    navigatePassParam(url: string, params: any, deepParams: any,tbName:string='', skipLocationChange: boolean = true) {
        var array = [url];
        deepParams['sys_TableName'] = tbName;
        if (params) {
            array.push(params);
        }
        this.router.navigate(array, { queryParams: deepParams, skipLocationChange: skipLocationChange });
        if (params) {
            url = url + ';' + $.map(params, (v, k) => { return v.toString().replace(',','=') }).join(';')
        }
        
        window.history.pushState(deepParams, tbName, url);
    }
    getRouteParam(key: string): any {
        return (this.activeRoute.params as any).value[key];
    }
    getRouteParamObj(key: string): any {
        let _value = this.activeRoute.params['_value'];
        if(_value){
            for (const [key2, value] of Object.entries(_value)) {
                if(value)if(value.toString().split(',')[0] == key) return value.toString().split(',')[1];
            }
        }
        return '';
    }
    getRouteData(key: string): any {
        return (this.activeRoute.data as any).value[key];
    }

    // Notification

    public showDefault(): void {
        this.notificationService.show({
            content: 'Default notification',
            hideAfter: 600,
            position: { horizontal: 'right', vertical: 'bottom' },
            animation: { type: 'fade', duration: 400 },
            type: { style: 'none', icon: true }
        });
    }
    public showSuccess(): void {
        this.notificationService.show({
            content: 'Success notification',
            hideAfter: 3 * 1000,
            position: { horizontal: 'right', vertical: 'bottom' },
            animation: { type: 'fade', duration: 400 },
            type: { style: 'success', icon: true }
        });
        this.UpdateView();
    }
    public showMessageSuccess(msg): void {
        if(!msg) msg = 'Success!'
        showNotification('top','right',3,msg);
    }
    public showMessage(msg,status): void {
        if(status == 0) this.showMessageSuccess(msg);
        else if(status > 0) this.showMessageWarning(msg);
        else if(status < 0) this.showMessageError(msg);
    }
    public showWarning(): void {
        this.notificationService.show({
            content: 'Warning notification',
            hideAfter: 600,
            position: { horizontal: 'right', vertical: 'bottom' },
            animation: { type: 'fade', duration: 400 },
            type: { style: 'warning', icon: true }
        });
    }
    public showMessageWarning(msg): void {
        if(!msg) msg = 'Warning!'
        showNotification('top','right',4,msg);
    }
    public showInfo(): void {
        this.notificationService.show({
            content: 'Info notification',
            hideAfter: 600,
            position: { horizontal: 'right', vertical: 'bottom' },
            animation: { type: 'fade', duration: 400 },
            type: { style: 'info', icon: true }
        });
    }
    public showMessageInfo(msg): void {
        if(!msg) msg = 'Info!'
        showNotification('top','right',1,msg);
    }
    public showError(message): void {
        this.notificationService.show({
            content: message,
            hideAfter: 600,
            position: { horizontal: 'right', vertical: 'bottom' },
            animation: { type: 'fade', duration: 400 },
            type: { style: 'error', icon: true }
        });
    }
    public showMessageError(msg): void {
        if(!msg) msg = 'Error!'
        showNotification('top','right',2,msg);
    }
    public getRandomInt(min, max) : number{
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; 
    }
    public set_new_message(v:number ){
        _new_message= v;
        this.UpdateView();
    }
    public get get_new_message():number{
        return _new_message;
    }
    public isNullOrEmpty(str: string | null | undefined): boolean {
        return str === null || str === undefined || str.trim() === '';
    }
    public groupBy<T, K>(list: T[], getKey: (item: T) => K): Map<K, T[]> {
        return list.reduce((map, item) => {
          const key = getKey(item);
          const collection = map.get(key);
          if (!collection) {
            map.set(key, [item]);
          } else {
            collection.push(item);
          }
          return map;
        }, new Map<K, T[]>());
      }
    public get_icon_by_name_file(name:string):string{
        var icon = '';
        if (name.toUpperCase().endsWith('.APNG')) icon = 'insert_photo';
        else if (name.toUpperCase().endsWith('.AVIF')) icon = 'insert_photo';
        else if (name.toUpperCase().endsWith('.GIF')) icon = 'insert_photo';
        else if (name.toUpperCase().endsWith('.JPG') || name.toUpperCase().endsWith('.jpeg') || name.toUpperCase().endsWith('.jfif') || name.toUpperCase().endsWith('.pjpeg') || name.toUpperCase().endsWith('.pjp')) icon = 'insert_photo';
        else if (name.toUpperCase().endsWith('.PNG')) icon = 'insert_photo';
        else if (name.toUpperCase().endsWith('.SVG')) icon = 'insert_photo';
        else if (name.toUpperCase().endsWith('.WEBP')) icon = 'insert_photo';
        else if (name.toUpperCase().endsWith('.BMP')) icon = 'insert_photo';
        else if (name.toUpperCase().endsWith('.ICO')) icon = 'insert_photo';
        else if (name.toUpperCase().endsWith('.CUR')) icon = 'insert_photo';
        else if (name.toUpperCase().endsWith('.TIF')) icon = 'insert_photo';
        else if (name.toUpperCase().endsWith('.TIFF')) icon = 'insert_photo';
        else icon = 'attachment'
        return icon;
    }
    public isImage (name:string):Boolean{
        if (name.toUpperCase().endsWith('.APNG') || name.toUpperCase().endsWith('.AVIF') || name.toUpperCase().endsWith('.GIF') || name.toUpperCase().endsWith('.JPG')
        || name.toUpperCase().endsWith('.JPEG') || name.toUpperCase().endsWith('.JFIF') || name.toUpperCase().endsWith('.PJPEG') || name.toUpperCase().endsWith('.PJP')
        || name.toUpperCase().endsWith('.PNG') || name.toUpperCase().endsWith('.SVG') || name.toUpperCase().endsWith('.WEBP') || name.toUpperCase().endsWith('.BMP') || name.toUpperCase().endsWith('.ICO')
        || name.toUpperCase().endsWith('.CUR') || name.toUpperCase().endsWith('.TIF') || name.toUpperCase().endsWith('.TIFF'))
                 return true;
             return false;
    }
    checkAndConvertToObject(obj:Object):any{
        var result = {};
        for (const [key, value] of Object.entries(obj)){
            if (typeof value === 'object' && !Array.isArray(value)) {
                result[key] = JSON.stringify(value)
              } else if (Array.isArray(value)) {
                result[key] = value.join(';')
              }else{
                result[key] = value+'';
              }
        };
        return result;
    }
    findAndSetAcctionForm(){
        try{
            var t = this.getRoleCurren_byFormName(this.getCurrenFrom);
            this.setRoleCurrent(t.id);
            this.refreshAcction();
            this.UpdateView();
        }catch{}
    }
    completeCallback(data: any[]) {
        try{
            this.setAcctionForm(data);
            var t = this.getRoleCurren_byFormName(this.getCurrenFrom);
            this.setRoleCurrent(t.id);
            switch (this.getCurrenFrom) {
              case EditPageState.add:
                var t = data.find(e => e['classForm'] == EditPageState.add);
                this.acctionName = t['name']
                this.requestEdit['storedName'] = t['storedName'];
                this.requestEdit['param'] = t['param'];
                this.requestEdit['keyService'] = t['keyService'];
                this.setRoleCurrent(t['id']);
                // this.refreshAcction();
                this.setRequestEdit({ 'onInit': t['onInit'] });
                break;
              case EditPageState.edit:
                var t = data.find(e => e['classForm'] == EditPageState.edit);
                this.acctionName = t['name']
                this.requestEdit['storedName'] = t['storedName'];
                this.requestEdit['param'] = t['param'];
                this.requestEdit['keyService'] = t['keyService'];
                this.setRoleCurrent(t['id']);
                // this.refreshAcction();
                this.setRequestEdit({ 'onInit': t['onInit'] });
                break;
              case EditPageState.viewDetail:
                var t = data.find(e => e['classForm'] == EditPageState.viewDetail);
                this.acctionName = t['name']
                this.requestEdit['storedName'] = t['storedName'];
                this.requestEdit['param'] = t['param'];
                this.requestEdit['keyService'] = t['keyService'];
                this.setRoleCurrent(t['id']);
                // this.refreshAcction();
                this.setRequestEdit({ 'onInit': t['onInit'] });
                break;
            }
            this.refreshAcction();
            this.UpdateView();
        }catch{}
      }
      getColSpanByTypeID(id:number,class_insert:string = ''):string{
        if(class_insert) return class_insert;
        return (id == 5 || id == 9 || id == 10 || id == 11)?'col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3':'col-12 col-sm-6 col-md-3 col-lg-2 col-xl-2'
      }
      setItemWithExpiry(key: string, value: any, expirySeconds: number) {
       try{
        const now = new Date();
        const item = {
            value: value,
            expiry: now.getTime() + expirySeconds * 1000,
        };
        localStorage.setItem(key, JSON.stringify(item));
       }catch{}
    }
    removeItemWithExpiry(key: string) {
        const itemStr = localStorage.getItem(key);
        if (itemStr) {
            const item = JSON.parse(itemStr);
            const now = new Date().getTime();
            if (now > item.expiry) {
                localStorage.removeItem(key);
            }
        }
    }
    getItemWithExpiry(key: string) {
        const itemStr = localStorage.getItem(key);
        if (!itemStr) {
            return null;
        }
        const item = JSON.parse(itemStr);
        const now = new Date().getTime();
        if (now > item.expiry) {
            localStorage.removeItem(key);
            return null;
        }
        return item.value;
    }
    removeNonAlphanumeric(input: string): string {
        return input.replace(/[^a-zA-Z0-9]/g, '');
    }
    openWindownForm(url:string){
        const w = screen.width * 0.9;
        const h = screen.height * 0.8;
        const left = screen.width / 2 - w / 2;
        const top = screen.height / 2 - h / 2;
        const randomnumber = Math.floor(Math.random() * 100 + 1);
        // tslint:disable-next-line:max-line-length
        window.open(
            url,
            '_blank',
            'PopUp' +
            randomnumber +
            ',scrollbars=1,menubar=0,resizable=1,width = ' +
            w +
            ', height = ' +
            h +
            ', top = ' +
            top +
            ', left = ' +
            left +
            ', modal=yes'
        );
    }
    generateRandomCustomerCode(): string {
        let result = '';
        for (let i = 0; i < 6; i++) {
          result += Math.floor(Math.random() * 10); // Generate a random digit (0-9)
        }
        return result;
      }
}

export interface BreadCrumbItemCustom {
    /**
     * Specifies the text content rendered inside the item. The numeric item index is rendered by default.
     */
    text?: string;
    /**
     * Sets the title of the item ([see example]({% slug overview_breadcrumb %})). Rendered as a `title` attribute on the item.
     */
    title?: string;
    /**
     * Specifies if the item is disabled ([see example]({% slug item_appearance_breadcrumb %})#toc-disabled-items). Rendered as an `aria-disabled` attribute on the item.
     */
    disabled?: boolean;
    /**
     * Defines the name for a [built-in icon]({% slug icons %}) in a Kendo UI theme ([see example]({% slug item_appearance_breadcrumb %}#toc-item-icon)).
     * The icon is rendered inside the item by a `span.k-icon element`.
     */
    icon?: string;
    /**
     * Defines a CSS class—or multiple classes separated by spaces— which are applied to a `span` element inside the item ([see example]({% slug item_appearance_breadcrumb %}#toc-item-icon)).
     * Allows the usage of custom icons.
     */
    iconClass?: string;
    /**
     * Defines a URL which is used for an `img` element inside the item ([see example]({% slug item_appearance_breadcrumb %}#toc-item-image)).
     * The URL can be relative or absolute. If relative, it is evaluated with relation to the web page URL.
     */
    imageUrl?: string;

    link?: string;

    level?: number;
}

@Pipe({
    name: 'CurrencyCustom',
})
export class MycurrencyPipe implements PipeTransform {
    transform(
        value: number,
        currencyCode: string = 'VND',
        display:
            | 'code'
            | 'symbol'
            | 'symbol-narrow'
            | string
            | boolean = 'symbol',
        digitsInfo: string = '3.2-2',
        locale: string = 'en',
    ): string | null {
        return formatCurrency(
            value,
            locale,
            '',
            null,
            '',
        );
    }
}