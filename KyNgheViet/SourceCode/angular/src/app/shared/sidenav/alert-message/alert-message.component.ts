import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { LayoutComponentBase } from '../../layout/layoutBase';
import * as $ from 'jquery';
@Component({
  selector: 'alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.css']
})
export class AlertMessageComponent extends LayoutComponentBase  implements OnInit,AfterViewInit  {

  constructor(
    private injector: Injector
  ) { 
    super(injector);
  }
  ngAfterViewInit(): void {
    this.UpdateView();
  }

  ngOnInit(): void {
  }
  message:string = '';
  typeAlert:string = '';
  public AlertSuccess(msg:string){
    this.message=msg;
    this.typeAlert = 'success';
    var id = (new Date()).getTime();
    $('#div-alert-message').empty();
    $('#div-alert-message').html(`
        <div class="alert alert-success col-12">
        <button type="button" class="close btn-${id}" data-dismiss="alert" aria-label="Close">
            <i class="material-icons">close</i>
        </button>
        <span><b> </b>`+this.message+`</span>
    </div>
    `);
    setTimeout(() => {
      $(`.btn-${id}`)[0].click();
    }, 5000);
  }
  public AlertWarning(msg:string){
    this.message=msg;
    this.typeAlert = 'warning';
    var id = (new Date()).getTime();
    $('#div-alert-message').empty();
    $('#div-alert-message').html(`
        <div class="alert alert-warning col-12">
        <button type="button" class="close btn-${id}" data-dismiss="alert" aria-label="Close">
            <i class="material-icons">close</i>
        </button>
        <span><b> </b>`+this.message+`</span>
    </div>
    `);
    setTimeout(() => {
      $(`.btn-${id}`)[0].click();
    }, 5000);
  }
  public AlertError(msg:string){
    this.message=msg;
    this.typeAlert = 'danger';
    var id = (new Date()).getTime();
    $('#div-alert-message').empty();
    $('#div-alert-message').html(`
        <div class="alert alert-danger col-12">
        <button type="button" class="close btn-${id}" data-dismiss="alert" aria-label="Close">
            <i class="material-icons">close</i>
        </button>
        <span><b> </b>`+this.message+`</span>
    </div>
    `);
    setTimeout(() => {
      $(`.btn-${id}`)[0].click();
    }, 5000);
  }
}
