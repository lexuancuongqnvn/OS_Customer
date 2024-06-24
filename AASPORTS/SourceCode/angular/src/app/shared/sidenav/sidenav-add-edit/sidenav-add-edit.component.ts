import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import $ from 'jquery'
import { LayoutComponentBase } from '../../layout/layoutBase';
import { EditPageState } from '../../ultilities/enum/edit-page-state';
declare var setFormValidation;
@Component({
  selector: 'sidenav-add-edit',
  templateUrl: './sidenav-add-edit.component.html',
  styleUrls: ['./sidenav-add-edit.component.css']
})
export class SidenavAddEditComponent extends LayoutComponentBase implements OnInit {

  constructor(
    private injector: Injector
  ) {
    super(injector);
  }
  @Input() title:string='';
  @Input() tbName:string='';
  @Output() OnClose?: EventEmitter<boolean> = new EventEmitter();
  @Output() OnFullscreen?: EventEmitter<any> = new EventEmitter();
  isFullscreen:Boolean = true;
  
  ngOnInit(): void {
  }

  open():void{
    $('#div-alert-message').html('')
    document.getElementById("mySidenav").style.width = "90vw";
    $('.overlay').addClass('active');
    $('#dismiss, .overlay').on('click', function() {
        $('.closebtn')[0].click()
    });
    // setTimeout(() => {
    //   setFormValidation('#form-'+this.tbName);
    // }, 1000);
    this.findAndSetAcctionForm();
    this.ClearValid();
  }

  fullscreen():void{
    if(this.isFullscreen) document.getElementById("mySidenav").style.width = "98vw";
    else document.getElementById("mySidenav").style.width = "90vw";
    this.isFullscreen = !this.isFullscreen;
  }

  close():void{
    document.getElementById("mySidenav").style.width = "0";
    $('.overlay').removeClass('active');
    if(this.get_side_edit_refresh_action)
      this.setCurrenFrom(EditPageState.view);
    else this.setCurrenFrom(this.getCurrenFrom);
      this.findAndSetAcctionForm();
    this.OnClose.emit(true);
  }
}
