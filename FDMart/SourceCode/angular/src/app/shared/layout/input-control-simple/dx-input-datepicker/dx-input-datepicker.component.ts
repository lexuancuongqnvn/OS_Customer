import { Component, EventEmitter, Injector, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import moment from 'moment';
import { LayoutComponentBase } from '../../layoutBase';

@Component({
  selector: 'dx-input-datepicker',
  templateUrl: './dx-input-datepicker.component.html',
  styleUrls: ['./dx-input-datepicker.component.css']
})
export class DxInputDatepickerComponent extends LayoutComponentBase implements OnInit,OnChanges {

  constructor(
    private injector: Injector
  ) { 
    super(injector);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.value)
    {
      try {
        if(!this.value.isUTC()){
          this.ValueOutput.emit(this.value.utc(true));
          this.date = this.value.utc(true).subtract(this.hourUTC(),'hours')
        }else if(!this.date || this.date['_i'] !== this.value.utc(true)['_i'])
        {
          if (typeof this.value === "string") 
            this.value = moment(this.value)
          if(typeof this.value['_i'] === "string")
            this.date = this.value.utc(true).subtract(this.hourUTC(),'hours')
          else 
            this.date = this.value
        }
      } catch (error) {
        if (typeof this.value === "string") this.value = moment(this.value)
        this.date = this.value.utc(true).subtract(this.hourUTC(),'hours')
        this.ValueOutput.emit(this.value);
      }
    }
  }

  @Input() format: string = 'DD-MM-YYYY';
  @Input() name: string = '';
  @Input() placeholder: string = '';
  @Input() value: moment.Moment = null;
  @Input() ColumnName: string = '';
  @Input() type: string = 'date';
  @Input() disabled:Boolean = false;
  @Input() required:Boolean = false;
  @Output() ValueOutput: EventEmitter<any> = new EventEmitter();
  date:moment.Moment = null;
  ngOnInit(): void {

  }
  onValueChanged(e:any,v:any){
    // if(!e.previousValue){
    //   var val = moment(e.value).utc(true);
    //   if(val['_i']=='Invalid Date' || val['_i'].toString().toUpperCase() == 'NAN')this.ValueOutput.emit(undefined);
    //   else this.ValueOutput.emit(val);
    //   // this.ValueOutput.emit(e.value);
    // }
   try{
    if (!v || e.value.getTime() !== v._d.getTime()) {
      var val = moment(e.value);//.utc(true);
      if (val['_i'] == 'Invalid Date' || val['_i'].toString().toUpperCase() == 'NAN')
        this.ValueOutput.emit(undefined);
      else
        this.ValueOutput.emit(val);
    }
   }catch{}
    
    // try{
    //   if(e.value.getDate()){
    //     var val = moment(e.value);//.utc(true);
    //     if(val['_i']=='Invalid Date' || val['_i'].toString().toUpperCase() == 'NAN')
    //       this.ValueOutput.emit(undefined);
    //     else 
    //       this.ValueOutput.emit(val);
    //   }
    // }catch{
    //   var val = moment(e.value._d);//.utc(true);
    //   if(val['_i']=='Invalid Date' || val['_i'].toString().toUpperCase() == 'NAN')
    //     this.ValueOutput.emit(undefined);
    //   else 
    //     this.ValueOutput.emit(val);
    // }
  
  }
}
