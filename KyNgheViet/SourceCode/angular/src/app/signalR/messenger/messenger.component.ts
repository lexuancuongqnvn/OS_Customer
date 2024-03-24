import { ChangeDetectorRef, Component, Injector, OnInit, ViewChild } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { MessengerService } from './messenger.service';
import * as moment from 'moment';
import { environment } from '../signalR';
import { ChatModel, Chat_ContentModel, EmployeeService, HRM_Employee_ENTITY, Messenger, MessengerApiService, SignalRService, SYS_Account_Infomation } from 'src/app/shared/service-proxies/api-shared';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { FilePickerComponent } from 'src/app/shared/layout/input-control/file-picker/file-picker.component';
import { LayoutComponentBase } from 'src/app/shared/layout/layoutBase';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';
import { DialogAcctionComponent } from 'src/app/shared/layout/dialogs/acction/dialog-acction.component';
import { type } from 'os';
import { InputSelectComponentV2 } from 'src/app/shared/layout/input-control-simple/input-select-v2/input-select-v2.component';
import { InputFilepickerComponent } from 'src/app/shared/layout/input-control-simple/input-filepicker/input-filepicker.component';
import { AppConsts } from 'src/app/app-consts.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

declare var showBannerCompany;
declare var ShowNotification;
// const connection = new signalR.HubConnectionBuilder()  
//       .configureLogging(signalR.LogLevel.Information)  
//       .withUrl(environment.baseUrl + 'chatHub')  
//       .build();  
@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css']
})
export class MessengerComponent extends LayoutComponentBase implements OnInit, IUiAction<any> {

  constructor(
    private injector: Injector,
    // private messengerService:MessengerService,
    private signalRService:SignalRService,
    private filePickerComponent: FilePickerComponent,
    private messengerApiService:MessengerApiService,
    private appSession: AppSession ,
    private Filesfilepicker: InputFilepickerComponent,
    private employeeService:EmployeeService,
    public sanitizer: DomSanitizer
  ) {
    super(injector);
  }
  @ViewChild('dialogEdit') dialogEdit: DialogAcctionComponent;
  @ViewChild('dialogEditBackground') dialogEditBackground: DialogAcctionComponent;
  @ViewChild('dialogAddChat') dialogAddChat: DialogAcctionComponent;
  @ViewChild('dialogAddChats') dialogAddChats: DialogAcctionComponent;
  @ViewChild('SelectAddChatPicker') SelectAddChatPicker: InputSelectComponentV2;
  @ViewChild('SelectAddChatsPicker') SelectAddChatsPicker: InputSelectComponentV2;

  urlSafe: SafeResourceUrl;
  host:string = AppConsts.baseUrl;
  my_avt:string = this.appSession.user.avatar;
  addChatModel:ChatModel = new ChatModel();
  url:string = '/messenger-v2'
  h:number = 0;
  download_file(targetUrl: string, fileName: string):void{
    this.Filesfilepicker.download(targetUrl,fileName);
  }
  display(e:boolean):string{
    return e?'block':'none';
  }
  onAdd(): void {
    throw new Error('Method not implemented.');
  }
  onUpdate(item: any): void {
    throw new Error('Method not implemented.');
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
    var p = new ChatModel();
    p.body = this.email_search;
    p.user_login = this.appSession.user.username;
    p.type = 'BYFRIEND';
    this.listChatSearch = [];
    this.messengerApiService.chat_Friend_Search(p).subscribe(respond=>{
      respond.forEach(e=>{
        var rs = new ChatModel();
        rs.chat_id = e.chat_id;
        rs.chat_name = e.chat_name;
        rs.type = 'user';
        rs.client_avt = e.client_avt;
        if(!rs.client_avt)rs.client_avt = '../assets/img/default-avatar.png';
        rs.chat_review = '';
        rs.list_user = e.list_user;
        this.listChatSearch.push(rs);
      })
      
      this.isShowResult = true;
      this.UpdateView();
    })
  }
  confirmAddChat(t:number){
    if(t==1){
      var chat = this.listHistory.find(e=>e.list_user == this.addChatModel.list_user+';'+this.appSession.user.username 
      || e.list_user == this.appSession.user.username+';'+this.addChatModel.list_user)
      if(chat) this.onClickChat(chat.chat_id);
      else {
        this.idSelect = '-1';
        this.status_send = '';
        var p = new Chat_ContentModel();
        p.chat_id = -1;
        p.user_send = this.appSession.user.username;

        this.chatModel = new ChatModel();
        this.chatModel.chat_id = -1;
        this.chatModel.type = 'user';
        this.chatModel.user_create = this.appSession.user.username;
        this.chatModel.list_user = this.appSession.user.username+';'+this.addChatModel.list_user;
        this.chatModel.chat_name = this.appSession.user.username+' && '+this.addChatModel.list_user;
        this.chatModel.background = this.host+'/UploadFiles/chat/background-chat-default.jpg';
        this.list_chat_content = [];
        this.onScroll();
        // this.initLoadHistory();
      }
    }else{
      this.idSelect = '-1';
      this.status_send = '';
      var p = new Chat_ContentModel();
      p.chat_id = -1;
      p.user_send = this.appSession.user.username;

      this.chatModel = new ChatModel();
      this.chatModel.chat_id = -1;
      this.chatModel.type = 'group';
      this.chatModel.user_create = this.appSession.user.username;
      this.chatModel.list_user = this.appSession.user.username+';'+this.addChatModel.list_user;
      this.chatModel.chat_name = this.appSession.user.username+' && '+this.addChatModel.list_user;
      this.chatModel.background = this.host+'/UploadFiles/chat/background-chat-default.jpg';
      this.list_chat_content = [];
      this.onScroll();
    }
    this.setHeight();
  }
  setHeight(){
    setTimeout(() => {
      if(this.h == 0) this.h = $('.msg_history').height();
      $('.msg_history').attr('style', 'height: '+(12+(this.h-$('.header_msg').height()))+'px !important');
    }, 100);
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
  onSelect_for_chat(email:string){
    let item = this.listEmployee.find(e=>e.email == email);
    this.current_chat.type = 'user';
    this.current_chat.to_user = item.email;
    this.current_chat.to_user_first_name = item.firstName;
    this.current_chat.to_user_last_name = item.lastName;
    this.UpdateView()
  }
  // messenger:Messenger= new Messenger();
  id_user:string = this.appSession.user.username.toString();
  img_avt:string = this.appSession.user.avatar;
  content_message:string = '';
  email_search:string = '';
  baseUrl_Upload:string = environment.baseUrl_Upload;
  list_message:Messenger[] = [];
  list_chat_content:Chat_ContentModel[] = [];
  chat_ContentModel:Chat_ContentModel = new Chat_ContentModel();
  current_chat:Messenger = new Messenger();
  listEmployee:HRM_Employee_ENTITY[] = [];
  listEmployee_Search:HRM_Employee_ENTITY[] = [];
  listChatSearch:ChatModel[]=[];
  listHistory:ChatModel[] = [];
  isShowResult:boolean = false;
  chatModel:ChatModel = new ChatModel();
  status_send:string='';
  ngOnInit(): void {
    this.initLoadHistory();
    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    this.con_chat['on']('ReceiveMessage', (respond:ChatModel) => {  
      if(this.chatModel.chat_id < 0 && respond.to == this.appSession.user.username){
        this.chatModel.chat_id = respond.chat_id;
      }
      if(respond.from != this.appSession.user.username && respond.arr_to.includes(this.appSession.user.username))
      {
        this.GetMessageNew(parseInt(respond.to));
        this.initLoadHistory();
        this.UpdateView();
      }
    }); 
    
    this.initCombobox();
  }
  initCombobox(){
    var p = new HRM_Employee_ENTITY();
    this.employeeService.hRM_Employee_Search(p).subscribe((respond)=>{
      this.listEmployee = respond.filter(e=>e.email != this.appSession.user.username);
      this.listEmployee.forEach(e=>{
        e['name'] = e.firstName + ' '+ e.lastName;
      })
    },
    (err) => {
        if (err.status == 401) {
          this.Respond401();
        }
    },
    () => {
      this.UnBlockUI();
    });
  }
  initLoadHistory():void{
    let p = new HRM_Employee_ENTITY();
    this.chatModel.user_login = this.appSession.user.username;
    this.messengerApiService.chat_GetHistoryMessenger(this.chatModel).subscribe(result => {
        this.listHistory = result;
        var new_message = 0;
        this.listHistory.forEach(e=>{
          if(e.chat_id.toString() == this.idSelect) e['active']='active';
          else e['active']='';
          e.my_avt = this.appSession.user.avatar;
          new_message += e.new_message;
        })
        this.set_new_message(new_message);
        this.UpdateView();
      },
      (err) => {
        if (err.status == 401) {
          this.Respond401();
        }
      },
      () => {
        this.UnBlockUI();
      })
  }
  onSelectUser(v:any){
    this.addChatModel.list_user = v;
  }
  AddChat(){
    this.dialogAddChat.open();
    setTimeout(() => {
      this.SelectAddChatPicker.renderSelectPicker();
      this.SelectAddChatPicker.setList(this.listEmployee);
    }, 50);
  }
  AddChats(){
    this.dialogAddChats.open();
    setTimeout(() => {
      this.SelectAddChatsPicker.renderSelectPicker();
      this.SelectAddChatsPicker.setList(this.listEmployee);
    }, 50);
  }
  GetMessageNew(chat_id:number):void{
    this.messengerApiService.chat_Get_New_Messenger_By_Chat_ID(chat_id).subscribe(respond=>{
      if(this.list_chat_content.filter(c=>c.chat_content_id == respond[0].chat_content_id).length == 0)
      {
        respond.forEach(e=>{
          ShowNotification(e.user_send,e.client_avt,e.message_text,'/messenger');
          try{e.arr_img = e.message_img.split(';');} catch{}
          try{e.arr_file = e.message_file.split(';');} catch{}
        })
      }
   
      if(respond[0].chat_id == this.chatModel.chat_id){
        this.list_chat_content.push(respond[0]);
        this.onScroll();
      }
        this.UpdateView();
    })
  }
  onClickChatFromSearch(item:any){

  }
  
  onClickChat(chat_id:number){
    this.idSelect = chat_id.toString();
    $('.chat_list').removeClass('active');
    $('.chat_list-'+chat_id).addClass('active');
    this.setHeight();
    this.status_send = '';
    var p = new Chat_ContentModel();
    p.chat_id = chat_id;
    p.user_send = this.appSession.user.username;
    if(chat_id > 0) this.chatModel = this.listHistory.find(e=>e.chat_id == chat_id);
    else this.chatModel = this.listChatSearch.find(e=>e.chat_id == chat_id);
    this.messengerApiService.chat_GetHistoryMessenger_By_Chat_ID(p).subscribe(respond=>{
      this.list_chat_content = respond;
      this.list_chat_content.forEach(e=>{
        try{e.arr_img = e.message_img.split(';');} catch{}
        try{e.arr_file = e.message_file.split(';');} catch{}
      })
      this.onScroll();
      this.initLoadHistory();
    })
  }
  onScroll():void{
    setTimeout(() => {
      var content = document.getElementsByClassName('msg_history');
      content[0].scrollTop = content[0].scrollHeight;
    }, 100);
  }
  deleteAttach_file(name:string,type:string){
    if(type == 'img'){
      this.chat_ContentModel.arr_img = this.chat_ContentModel.arr_img.filter(r=>r.indexOf(name) < 0);
      try{
        var temp = this.chat_ContentModel.message_img.split(';');
        this.chat_ContentModel.message_img = temp.filter(r=>r.indexOf(name) < 0).join(';')
      }catch{}
    }else{
      this.chat_ContentModel.arr_file = this.chat_ContentModel.arr_file.filter(r=>r.indexOf(name) < 0);
      try{
        var temp = this.chat_ContentModel.message_file.split(';');
        this.chat_ContentModel.message_file = temp.filter(r=>r.indexOf(name) < 0).join(';')
      }catch{}
    }
  }
  attach_file(v:string,field:string){
    var link_files = v.split(';');
    link_files.forEach(f=>{
      // if(f.toUpperCase().indexOf('.JPG') >= 0 || f.toUpperCase().indexOf('.JPEG') >= 0 || f.toUpperCase().indexOf('.GIF') >= 0 ||f.toUpperCase().indexOf('.PNG') >= 0)
      // {
      //   if(this.chat_ContentModel.message_img)this.chat_ContentModel.message_img += ';';
      //   else this.chat_ContentModel.message_img = '';
      //   this.chat_ContentModel.message_img += f;
      //   if(this.chat_ContentModel.arr_img == null)this.chat_ContentModel.arr_img=[];
      //   var name = f.split('/')[f.split('/').length - 1];
      //   this.chat_ContentModel.arr_img.push(name)
      // }
      // else{
      //   if(this.chat_ContentModel.message_file)this.chat_ContentModel.message_file += ';';
      //   else this.chat_ContentModel.message_file = '';
      //   this.chat_ContentModel.message_file += f;
      //   var name = f.split('/')[f.split('/').length - 1];
      //   if(this.chat_ContentModel.arr_file == null)this.chat_ContentModel.arr_file=[];
      //   this.chat_ContentModel.arr_file.push(name)
      // }
      if(this.chat_ContentModel.message_file)this.chat_ContentModel.message_file += ';';
        else this.chat_ContentModel.message_file = '';
        this.chat_ContentModel.message_file += f;
        var name = f.split('/')[f.split('/').length - 1];
        if(this.chat_ContentModel.arr_file == null)this.chat_ContentModel.arr_file=[];
        this.chat_ContentModel.arr_file.push(name)
    })
  }
  confirmEditChatName(){
    var p = new ChatModel();
    p = this.chatModel;
    p.type = 'C_NAME';
    this.messengerApiService.chat_Update(p).subscribe(respond=>
    {
      if(respond['status'] == '0') this.showMessageSuccess(respond['message'])
    })
  }

  confirmEditBackground(){
    var p = new ChatModel();
    p = this.chatModel;
    p.type = 'C_BACKGROUND';
    this.messengerApiService.chat_Update(p).subscribe(respond=>
    {
      if(respond['status'] == '0') this.showMessageSuccess(respond['message'])
    })
  }
  valueUpload(v:any,field:string){
    this.chatModel.background=v;
    this.UpdateView();
  }
  onSend():void{
    if(this.content_message == null || this.content_message == '') return;
    this.status_send = 'Đang gửi';
    this.chat_ContentModel.chat_id = this.chatModel.chat_id;
    this.chat_ContentModel.user_send = this.appSession.user.username;
    this.chat_ContentModel.message_text = this.content_message;
    this.chat_ContentModel.status = 'sent';
    this.chat_ContentModel.to_user = this.chatModel.list_user.split(';').find(l=>l!=this.appSession.user.username);
    this.chatModel.chat_Content = [];
    this.chatModel.user_login = this.appSession.user.username;
    this.chatModel.from = this.appSession.user.username;
    this.chatModel.chat_Content.push(this.chat_ContentModel);
    try{
      var temp = this.chat_ContentModel.message_img.split(';');
      this.chat_ContentModel.arr_img = temp;
    }catch{}
    try{
      var temp = this.chat_ContentModel.message_file.split(';');
      this.chat_ContentModel.arr_file = temp
    }catch{}
    this.list_chat_content.push(this.chat_ContentModel);
    this.chat_ContentModel = new Chat_ContentModel();
    this.onScroll();
    this.notificationModel.message ='Tin nhắn mới:'+this.content_message;
    this.content_message = null;
    this.messengerApiService.chat_Inserst(this.chatModel).subscribe(respond=>{
      this.chatModel.chat_id = respond[0].chat_id;
      this.current_chat.account_id= this.id_user;
      this.current_chat.account_send= this.id_user;
      this.current_chat.to_user= this.chatModel.list_user;
      this.current_chat.chat_id= this.chatModel.chat_id;
      this.list_message.push(this.current_chat);
      this.status_send = 'Đã gửi';
      this.initLoadHistory();

      var pn = new ChatModel();
        pn.title = "Tin nhắn mới";
        pn.body = this.appSession.user.firstName + " " + this.appSession.user.lastName+": "+this.content_message;
        pn.to = this.chatModel.chat_id.toString();
        pn.from = this.appSession.user.username;
        pn.image_url = ""
        
        this.con_chat.invoke("SendMessage",pn).then((rs)=>{
          console.log(rs);
        });
    })
    this.notificationModel.user_send = this.appSession.user.firstName +' '+this.appSession.user.lastName;
    
    this.notificationModel.arr_to = [];
    this.notificationModel.client_avt = this.appSession.user.avatar;
    this.notificationModel.arr_to = this.chatModel.list_user.split(';').filter(e=>e != this.appSession.user.username);
    this.notificationModel.link_direct = '/messenger';
    this.notificationModel.account_id = this.appSession.user.id;
    this.con_notification.invoke("Task_Notifi_Message",this.notificationModel).then((rs)=>{
      console.log(rs);
    });
    this.setHeight();
  }
}
