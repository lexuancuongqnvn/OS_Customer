import { ChangeDetectorRef, Component, Injector, OnInit, ViewChild } from '@angular/core';
import * as signalR from '@microsoft/signalr';
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

declare var showBannerCompany;
declare var ShowNotification;
// const connection = new signalR.HubConnectionBuilder()  
//       .configureLogging(signalR.LogLevel.Information)  
//       .withUrl(environment.baseUrl + 'chatHub')  
//       .build();  
@Component({
  selector: 'app-messenger-v2',
  templateUrl: './messenger-v2.component.html',
  styleUrls: ['./messenger-v2.component.css']
})
export class MessengerV2Component extends LayoutComponentBase implements OnInit, IUiAction<any> {
    constructor(
        private injector: Injector,
        // private messengerService:MessengerService,
        private signalRService:SignalRService,
        private filePickerComponent: FilePickerComponent,
        private messengerApiService:MessengerApiService,
        private appSession: AppSession ,
        private Filesfilepicker: InputFilepickerComponent,
        private employeeService:EmployeeService
      ) {
        super(injector);
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
    ngOnInit(): void {
        $('#action_menu_btn').click(function(){
            $('.action_menu').toggle();
        });
    }
}