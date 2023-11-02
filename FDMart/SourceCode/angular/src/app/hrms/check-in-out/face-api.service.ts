import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AppConsts } from "src/app/app-consts.component";

import { ChatModel, Messenger,Chat_ContentModel, NotificationModel, SYS_Account_Infomation, HRM_Employee_Check_In_Out_ENTITY } from 'src/app/shared/service-proxies/api-shared';

@Injectable({  
    providedIn: 'root'  
  })  
  export class DeepFaceAPIService {  
    private MessengersUrl = AppConsts.baseUrl + 'api/SignalR';  
    constructor(
      private http: HttpClient
      ) { }  
    Verify(Messenger: HRM_Employee_Check_In_Out_ENTITY): Observable<HRM_Employee_Check_In_Out_ENTITY> {  
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
      var body =  {
        model_name:"SFace",
        img1_path:"https://cloudfront-us-east-2.images.arcpublishing.com/reuters/5TP57OUJTNKLLNWIGWEO24LU7U.jpg",
        img2_path:"https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg"
      }
      return this.http.post<HRM_Employee_Check_In_Out_ENTITY>('https://ai.erp.osoft.vn', body, { headers: headers })  
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
  }  