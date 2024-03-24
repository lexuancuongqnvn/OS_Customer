import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ToolbarComponent } from '../../toolbar/toolbar.component';
import { IUiAction } from 'src/app/shared/ultilities/ui-action';

@Component({
    selector: 'dialog-acction-v2',
    template: `
        <dx-popup [width]="width?width:'60vw'" [height]="height?height:'80vh'" [showTitle]="true" title="{{title}}" [resizeEnabled]="true" [(visible)]="opened" position="center" [dragEnabled]="true" container=".dx-viewport">
        <app-toolbar *ngIf="showToolbar" #toolbar [tableName]="tbName" [CurrenFrom]="CurrenFrom" [classInsert]="'form-30082023'"></app-toolbar>    
        <ng-content></ng-content>
        </dx-popup>
    `
})
export class DialogAcctionV2Component implements IUiAction<any> {
    public opened = false;  
    widthScreen: number =  ($('body').width() *0.85) ;
    saveButtonOptions:any;
    closeButtonOptions:any;
    @Input() content: string = '';
    @Input() title: string = '';
    @Input() width: any = '60vw';
    @Input() height: any = '80vh';
    @Input() tbName: string = '80vh';
    @Input() CurrenFrom: string = '';
    @Input() showToolbar: boolean = false;
    @Output() confirmOutput: EventEmitter<any> = new EventEmitter();
    @Output() onClickAcctionOutput: EventEmitter<any> = new EventEmitter();
    @ViewChild('toolbar') toolbar: ToolbarComponent;

    constructor(
        ) {
        const that = this;
        
        this.saveButtonOptions = {
            icon: 'save',
            text: 'Lưu',
            onClick(e:any) {
                debugger;
            },
        };
        this.closeButtonOptions = {
        text: 'Close',
        onClick(e) {
            that.close('yes')
        },
        };
        if(this.showToolbar)this.setAcction();
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
       this.onClickAcctionOutput.emit({id: id, storedName: storedName, param: param, keyService: keyService, classForm: classForm})
    }
    getDataByID(storedName: string, param: string, keyService: string): void {
        throw new Error('Method not implemented.');
    }
    
    setAcction(){
        if(this.toolbar){
           this.toolbar.setUiAction(this);
        }
        else
          setTimeout(() => {
            this.setAcction();
          }, 50);
      }
    public close(status) {
        if (status == 'yes') this.confirmOutput.emit();
        this.opened = false;
    }

    public open() {
        this.opened = true;
    }
}
