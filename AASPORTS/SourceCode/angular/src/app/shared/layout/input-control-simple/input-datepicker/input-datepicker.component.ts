import { Component, EventEmitter, Injector, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import moment from 'moment';
import { DatePipe } from '@angular/common';
import { DateFormatPipe } from 'src/app/shared/core/pipes/date-format.pipe';
import { DateFormatYearPipe } from 'src/app/shared/core/pipes/date-format-year.pipe';
import { LayoutComponentBase } from '../../layoutBase';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
declare var datepicker;
declare var pipeDatepicker;
@Component({
  selector: 'input-datepicker',
  templateUrl: './input-datepicker.component.html',
  styleUrls: ['./input-datepicker.component.css']
})
export class InputDatepickerComponent extends LayoutComponentBase implements OnInit,OnChanges {

  constructor(
    private injector: Injector
  ) { 
    super(injector);
  }
  ngOnChanges(changes: SimpleChanges): void {
    pipeDatepicker(this.value,this.ColumnName);
  }

  @Input() format: string = 'DD/MM/YYYY';
  @Input() name: string = '';
  @Input() value: any = '';
  @Input() ColumnName: string = '';
  @Input() disabled:Boolean = false;
  @Input() required:Boolean = false;
  @Output() ValueOutput: EventEmitter<any> = new EventEmitter();
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  get isViewDetail():boolean{
    return this.disabled?true:(this.getCurrenFrom == EditPageState.viewDetail?true:false);
  }
  ngOnInit(): void {
    if(!this.value) this.value = '';
    datepicker(this.ColumnName, this.format);
  }
  public ConvertDateTimeUTC = (date: Date): Date => {
      let dateUTC = new Date(
          date.getUTCFullYear(),
          date.getUTCMonth(),
          date.getUTCDate(),
          date.getUTCHours(),
          date.getUTCMinutes(),
          date.getUTCSeconds()
      )
      let utc = dateUTC.getTime();
      let h = date.getTime();
      let diffutc = utc - h;
      let result = new Date(date.setTime(date.getTime() - diffutc))
      return result;
  }
  public onChangeValue(e: any) {
    // if(e.target.value == 'Invalid Date') return
    // debugger
    // var date = new Date(e.target.value);
    // var dateString = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate();
    var val = moment(e.target.value).utc(true);
    if(val['_i']=='Invalid Date' || val['_i'].toString().toUpperCase() == 'NAN')this.ValueOutput.emit(undefined);
    else this.ValueOutput.emit(val);
  }
  public formatDate(v):any{
    return this.pipe.transform(v, this.format);
  }
}