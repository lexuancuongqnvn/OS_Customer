import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "../signalR";

import { ChatModel, Messenger,Chat_ContentModel, NotificationModel, SYS_Account_Infomation } from 'src/app/shared/service-proxies/api-shared';

@Injectable({  
    providedIn: 'root'  
  })  
  export class MessengerService {  
    private MessengersUrl = environment.baseUrl + 'api/SignalR';  
    constructor(
      private http: HttpClient
      ) { }  
    SendMessageToUser(Messenger: Messenger): Observable<Messenger> {  
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
      return this.http.post<Messenger>(environment.baseUrl+'api/SendMessageToUser', Messenger, { headers: headers })  
        .pipe(  
          catchError(this.handleError)  
        );  
    } 
    SendMessage(Messenger: Messenger): Observable<Messenger> {  
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
      return this.http.post<Messenger>(environment.baseUrl + 'api/MessengerApi', Messenger, { headers: headers })  
        .pipe(  
          catchError(this.handleError)  
        );  
    } 
    private handleError(err: { error: { message: any; }; status: any; body: { error: any; }; }) {  
      let errorMessage: string;  
      if (err.error instanceof ErrorEvent) {  
        errorMessage = `An error occurred: ${err.error.message}`;  
      } else {  
        errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;  
      }  
      console.error(err);  
      return throwError(errorMessage);  
    }  
    getHistoryMessage(Messenger: ChatModel): Observable<ChatModel[]> {  
      this.MessengersUrl = environment.baseUrl_DataChat + 'api/MessengerApi/Chat_GetHistoryMessenger';  
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
      return this.http.post<ChatModel[]>(this.MessengersUrl, Messenger, { headers: headers })  
        .pipe(  
          catchError(this.handleError)  
        );  
    }
    Chat_Friend_Search(keyword: string): Observable<SYS_Account_Infomation[]> {  
      this.MessengersUrl = environment.baseUrl_DataChat + 'api/MessengerApi/Chat_Friend_Search';  
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
      return this.http.post<SYS_Account_Infomation[]>(this.MessengersUrl, '"'+keyword+'"', { headers: headers })  
        .pipe(  
          catchError(this.handleError)  
        );  
    }
    Chat_Get_New_Messenger_By_Chat_ID(chat_id: number): Observable<Chat_ContentModel[]> {  
      this.MessengersUrl = environment.baseUrl_DataChat + 'api/MessengerApi/Chat_Get_New_Messenger_By_Chat_ID?chat_id='+chat_id;  
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
      return this.http.post<Chat_ContentModel[]>(this.MessengersUrl, Chat_ContentModel, { headers: headers })  
        .pipe(  
          catchError(this.handleError)  
        );  
    } 
    getHistoryMessage_by_chat_id(Chat_ContentModel: Chat_ContentModel): Observable<Chat_ContentModel[]> {  
      this.MessengersUrl = environment.baseUrl_DataChat + 'api/MessengerApi/Chat_GetHistoryMessenger_By_Chat_ID';  
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
      return this.http.post<Chat_ContentModel[]>(this.MessengersUrl, Chat_ContentModel, { headers: headers })  
        .pipe(  
          catchError(this.handleError)  
        );  
    } 
    Chat_Inserst(ChatModel: ChatModel): Observable<ChatModel> {  
      this.MessengersUrl = environment.baseUrl_DataChat + 'api/MessengerApi/Chat_Inserst';  
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
      return this.http.post<ChatModel>(this.MessengersUrl, ChatModel, { headers: headers })  
        .pipe(  
          catchError(this.handleError)  
        );  
    } 
    PostNotification(Notification: NotificationModel): Observable<NotificationModel> {  
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
      return this.http.post<NotificationModel>(environment.baseUrl + 'api/SignalR/NotificationModel', Notification, { headers: headers })  
        .pipe(  
          catchError(this.handleError)  
        );  
    } 

    currentMessage = new BehaviorSubject(null);

    receiveMessage(){

    }
  }  