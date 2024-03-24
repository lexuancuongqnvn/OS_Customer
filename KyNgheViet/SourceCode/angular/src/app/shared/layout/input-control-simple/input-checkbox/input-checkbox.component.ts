import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { LayoutComponentBase } from '../../layoutBase';

@Component({
  selector: 'input-checkbox',
  templateUrl: './input-checkbox.component.html',
  styleUrls: ['./input-checkbox.component.css']
})
export class InputCheckboxComponent extends LayoutComponentBase implements OnInit,AfterViewInit {
  constructor(
    private injector: Injector,
  ) {
    super(injector);
  }
  ngAfterViewInit(): void {
    console.log(this.value)
    this.UpdateView();
  }
  @Input() title: string='';
  @Input() type: string='';
  @Input() name: string;
  @Input() value: Boolean = false;
  @Input() disabled: Boolean = false;
  @Output() ValueOutput: EventEmitter<any> = new EventEmitter();
  get isViewDetail():boolean{
    return this.disabled?true:(this.getCurrenFrom == EditPageState.viewDetail?true:false);
  }

  ngOnInit(): void {
  } 

  public onChangeValue(val: any) {
    this.ValueOutput.emit(val);
  }

}
