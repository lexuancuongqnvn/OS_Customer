import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'dialog-acction',
    template: `
        <button kendoButton *ngIf="!opened" (click)="open()" style="z-index: -111;"></button>
        <kendo-dialog title="{{title}}" *ngIf="opened" (close)="close('cancel')" [minWidth]="250" [width]="widthScreen > width ? width : widthScreen" [maxHiegh]="hieghtScreen">
            <ng-content></ng-content>
            <p style="margin: 30px; text-align: center;">{{content}}</p>
            <kendo-dialog-actions>
                <button kendoButton (click)="close('no')">Cancel</button>
                <button kendoButton (click)="close('yes')" primary="true">OK</button>
            </kendo-dialog-actions>
        </kendo-dialog>
    `
})
export class DialogAcctionComponent {
    public opened = false;
    @Input() content: string = '';
    @Input() title: string = '';
    @Input() width: number = 450;
    widthScreen: number =  ($('body').width() *0.85) ;
    hieghtScreen: number =  screen.height ;
    @Output() confirmOutput: EventEmitter<any> = new EventEmitter();
    public close(status) {
        if (status == 'yes') this.confirmOutput.emit();
        this.opened = false;
    }

    public open() {
        this.opened = true;
    }
}
