import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Injector, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import moment from 'moment';
import { DateTimeFormatPipe } from 'src/app/shared/core/pipes/date-time-format.pipe';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { LayoutComponentBase } from '../../layoutBase';
declare var datetimepicker;
declare var pipeDateTimepicker;
@Component({
  selector: 'input-datetimepicker',
  templateUrl: './input-datetimepicker.component.html',
  styleUrls: ['./input-datetimepicker.component.css']
})
export class InputDatetimepickerComponent extends LayoutComponentBase implements OnInit,OnChanges   {
  constructor(
    private injector: Injector,
  ) { 
    super(injector);
  }
  ngOnChanges(changes: SimpleChanges): void {
    pipeDateTimepicker(this.value,this.ColumnName);
  }
  @Input() format: string = 'DD/MM/YYYY HH:mm';
  @Input() name: string = '';
  @Input() value: any = null;
  @Input() ColumnName: string = '';
  @Input() disabled:Boolean = false;
  @Output() ValueOutput: EventEmitter<any> = new EventEmitter();
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  get isViewDetail():boolean{
    return this.disabled?true:(this.getCurrenFrom == EditPageState.viewDetail?true:false);
  }
  ngOnInit(): void {
    if(!this.value) this.value = '';
    datetimepicker(this.ColumnName);
  }

  public onChangeValue(e: any,v:any) {
    // var val = moment(e.target.value).utc(true);
    // if(val['_i']=='Invalid Date' || val['_i'].toString().toUpperCase() == 'NAN')this.ValueOutput.emit(undefined);
    // else this.ValueOutput.emit(val);

    try{
      if (!v || new Date(e.target.value).getTime() !== v._d.getTime()) {
        var val = moment(e.target.value);//.utc(true);
        if (val['_i'] == 'Invalid Date' || val['_i'].toString().toUpperCase() == 'NAN')
          this.ValueOutput.emit(undefined);
        else
          this.ValueOutput.emit(val);
      }
     }catch{

     }
  }
}
