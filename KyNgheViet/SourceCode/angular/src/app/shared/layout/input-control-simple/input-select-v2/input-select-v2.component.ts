import { ChangeDetectorRef, Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import { LayoutComponentBase } from '../../layoutBase';
declare var selectpicker;
declare var multiselectpicker;
declare var setOpptionSelectpicker;
declare var appendOpptionSelectpicker;
@Component({
  selector: 'input-selectpicker-v2',
  templateUrl: './input-select-v2.component.html',
  styleUrls: ['./input-select-v2.component.css']
})

export class InputSelectComponentV2 extends LayoutComponentBase implements OnInit {

  constructor(
    private injector: Injector,
  ) { 
    super(injector);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.renderSelectPicker();
    }, 150);
  }
  @Input() list:any[] = [];
  @Input() FieldValue:string = '';
  @Input() FieldDisplay:string = '';
  @Input() Class:string = '';
  @Input() ColumnName:string = '';
  @Input() title:string = '';
  @Input() value:any = '';
  @Input() multiple:Boolean = false;
  @Input() disabled:Boolean = false;
  @Input() required:Boolean = false;
  @Output() ValueOutput: EventEmitter<any> = new EventEmitter();
  @Output() ValueSearchOutput: EventEmitter<any> = new EventEmitter();
  listSelected:any[] = [];
  get isViewDetail():boolean{
    return this.disabled?true:(this.getCurrenFrom == EditPageState.viewDetail?true:false);
  }
  public renderSelectPicker(){
    if(this.value == null || this.value == undefined) this.value = '';
   
    if(this.multiple){
      var values = this.value.toString().split(';');
      multiselectpicker(this.ColumnName,values,this.disabled);
    }
    else
    {
      if(!this.isViewDetail)this.disabled = false;
      selectpicker(this.ColumnName, this.value,this.isViewDetail);
    }
    this.UpdateView();
  }
  public appendList(listOpption:any[],textSearch:string = ''){
    if(listOpption){
      listOpption.forEach(e=>{
        e['text'] = e[this.FieldDisplay];
        e['id'] = e[this.FieldValue];
      })
      appendOpptionSelectpicker(this.ColumnName, this.value, this.isViewDetail,listOpption,this.multiple,textSearch)
    }
  }
  public setList(listOpption:any[]){
    if(listOpption){
      listOpption.forEach(e=>{
        e['text'] = e[this.FieldDisplay];
        e['id'] = e[this.FieldValue];
      })
      setOpptionSelectpicker(this.ColumnName, this.value, this.isViewDetail,listOpption,this.multiple)
    }
    else{
      setOpptionSelectpicker(this.ColumnName, this.value, this.isViewDetail,[],this.multiple)
    }
  }
  public onChangeValue(val: any) {
   try{
    let v = val.target.value;
    if(v != this.value)
      {
        this.value = v;
        this.ValueOutput.emit(v);
      }
   }catch{}
  }
  public onSearchOption(val: any) {
   try{
    let v = val.target.value;
    this.ValueSearchOutput.emit(v);
   }catch{}
  }
}
