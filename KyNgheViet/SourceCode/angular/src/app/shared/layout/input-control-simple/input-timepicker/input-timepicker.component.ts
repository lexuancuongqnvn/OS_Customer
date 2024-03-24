import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Injector, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import moment from 'moment';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { LayoutComponentBase } from '../../layoutBase';

declare var timepicker;
declare var pipeTimepicker;
@Component({
  selector: 'input-timepicker',
  templateUrl: './input-timepicker.component.html',
  styleUrls: ['./input-timepicker.component.css']
})
export class InputTimepickerComponent extends LayoutComponentBase implements OnInit,OnChanges  {

  constructor(
    private injector: Injector,
  ) { 
    super(injector);
  }
  ngOnChanges(changes: SimpleChanges): void {
    pipeTimepicker(this.value,this.ColumnName);
  }
  
  @Input() format: string = 'HH:mm';
  @Input() name: string = '';
  @Input() value: any = '';
  @Input() ColumnName: string = '';
  @Output() ValueOutput: EventEmitter<any> = new EventEmitter();
  @Input() disabled:Boolean = false;
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  get isViewDetail():boolean{
    return this.disabled?true:(this.getCurrenFrom == EditPageState.viewDetail?true:false);
  }
  ngOnInit(): void {
    timepicker(this.ColumnName);
  }

  public onChangeValue(e: any) {
    // var val = moment(e.target.value)
    // this.ValueOutput.emit(val);
    var val = moment(e.target.value).utc(true);
    if(val['_i']=='Invalid Date' || val['_i'].toString().toUpperCase() == 'NAN')this.ValueOutput.emit(undefined);
    else this.ValueOutput.emit(val);
  }
  public formatDate(v):any{
    return this.pipe.transform(v, this.format);
  }
}
