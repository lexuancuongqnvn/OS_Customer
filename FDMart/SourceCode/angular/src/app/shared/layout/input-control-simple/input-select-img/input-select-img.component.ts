import { ChangeDetectorRef, Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import { LayoutComponentBase } from '../../layoutBase';
declare var selectIMGpicker;
declare var multiselectIMGpicker;
declare var setOpptionSelectIMGpicker;
@Component({
  selector: 'input-selectpicker-img',
  templateUrl: './input-select-img.component.html',
  styleUrls: ['./input-select-img.component.css']
})

export class InputSelectComponentIMG extends LayoutComponentBase implements OnInit {

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
  @Input() textSmall:string = '';
  @Input() FieldIMG:string = '';
  @Input() FieldDisplay:string = '';
  @Input() Class:string = '';
  @Input() ColumnName:string = '';
  @Input() title:string = '';
  @Input() value:any = '';
  @Input() multiple:Boolean = false;
  @Input() disabled:Boolean = false;
  @Input() required:Boolean = false;
  @Output() ValueOutput: EventEmitter<any> = new EventEmitter();
  listSelected:any[] = [];
  get isViewDetail():boolean{
    return this.disabled?true:(this.getCurrenFrom == EditPageState.viewDetail?true:false);
  }
  public renderSelectPicker(){
    if(this.value == null || this.value == undefined) this.value = '';
   
    if(this.multiple){
      var values = this.value.toString().split(';');
      multiselectIMGpicker(this.ColumnName,values,this.disabled,this.FieldValue,this.FieldIMG,this.textSmall);
    }
    else
    {
      // if(this.list.length > 0)
      // this.list.forEach(e=>{
      //   if(e[this.FieldValue] == this.value) e['selected'] = true;
      //   else e['selected'] = false;
      // })
      if(!this.isViewDetail)this.disabled = false;
      selectIMGpicker(this.ColumnName, this.value,this.isViewDetail,this.FieldValue,this.FieldIMG,this.textSmall);
    }
    this.UpdateView();
  }
  public setList(listOpption:any[]){
    if(listOpption){
      listOpption.forEach(e=>{
        e['text'] = e[this.FieldDisplay];
        e['id'] = e[this.FieldValue];
      })
      console.log(this.ColumnName)
      setOpptionSelectIMGpicker(this.ColumnName, this.value, this.isViewDetail,listOpption,this.multiple)
    }
    else{
      setOpptionSelectIMGpicker(this.ColumnName, this.value, this.isViewDetail,[],this.multiple)
    }
  }
  public onChangeValue(val: any) {
   try{
    let v = val.target.value;
    this.ValueOutput.emit(v);
   }catch{}
  }
}
