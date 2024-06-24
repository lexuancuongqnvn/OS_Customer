import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { LayoutComponentBase } from '../../layoutBase';

@Component({
  selector: 'input-select2',
  templateUrl: './input-select2.component.html',
  styleUrls: ['./input-select2.component.css']
})
export class InputSelect2Component extends LayoutComponentBase implements OnInit {

  constructor(
    private injector: Injector,
  ) { 
    super(injector);
  }

  @Input() name: string;
  @Input() value: any = [];
  @Input() fieldValue: string;
  @Input() textField: string;
  @Input() checkboxes: boolean=false;
  @Input() disabled: boolean=false;
  @Input() listItemsMultivalue: Array<any> = [];
  @Output() ValueOutput: EventEmitter<any> = new EventEmitter();
  get isViewDetail():boolean{
    return this.disabled?true:(this.getCurrenFrom == EditPageState.viewDetail?true:false);
  }
  ngOnInit(): void {
   
  }

  public onChangeValue(val: any) {
    let v = val[0][this.fieldValue];
    this.ValueOutput.emit(v);
  }
}
