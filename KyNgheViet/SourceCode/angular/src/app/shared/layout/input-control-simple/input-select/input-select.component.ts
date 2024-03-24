import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { LayoutComponentBase } from '../../layoutBase';
declare var CallSelectPickerByClass;
declare var GetValueSelectPickerByClass;
@Component({
  selector: 'input-selectpicker',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.css']
})

export class InputSelectComponent extends LayoutComponentBase implements OnInit {

  constructor(
    private injector: Injector,
  ) { 
    super(injector);
  }

  ngOnInit(): void {
    
  }
  @Input() list:any[] = [];
  @Input() FieldValue:string = '';
  @Input() FieldDisplay:string = '';
  @Input() Class:string = 'selectpicker-filter-working';
  @Input() title:string = '';
  @Input() multiple:Boolean = false;
  @Input() disabled:Boolean = false;
  @Output() ValueOutput: EventEmitter<any> = new EventEmitter();
  get isViewDetail():boolean{
    return this.disabled?true:(this.getCurrenFrom == EditPageState.viewDetail?true:false);
  }
  public renderSelectPicker(){
    CallSelectPickerByClass(this.Class,this.isViewDetail);
  }
  public onChangeValue(val: any) {
    let v = GetValueSelectPickerByClass(this.Class);
    this.ValueOutput.emit(v);
  }
}
