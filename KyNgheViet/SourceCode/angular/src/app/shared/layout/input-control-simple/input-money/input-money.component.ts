import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { LayoutComponentBase } from '../../layoutBase';

let dollarUSLocale = Intl.NumberFormat('en-US');
@Component({
  selector: 'input-money',
  templateUrl: './input-money.component.html',
  styleUrls: ['./input-money.component.css']
})

export class InputMoneyComponent extends LayoutComponentBase  implements OnInit {

  constructor(
    private injector: Injector,
  ) { 
    super(injector);
  }
  @Input() fractionDigits: number = 0;
  @Input() value: any = 0;
  @Input() colName: string = '';
  @Input() disabled: boolean = false;
  @Output() ValueOutput: EventEmitter<any> = new EventEmitter();
  values:any = 0;
  ngOnInit(): void {
  }
  get isViewDetail():boolean{
    return this.disabled?true:(this.getCurrenFrom == EditPageState.viewDetail?true:false);
  }
  get valueConvert():string{
    if(!this.value) this.value = 0;
    var v_f = (this.value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').replace('.00','')
    return v_f; 
  }
  public onChangeValue(e:any) {
    var v =Number(e.target.value.toString().replaceAll(',',''));
    this.value = v;
    this.ValueOutput.emit(this.value);
  }
}
