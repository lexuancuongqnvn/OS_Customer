import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { LayoutComponentBase } from '../../layout/layoutBase';
declare var render_jqgrid; 
declare var getSelectedRows;
declare var setData;
declare var exportTableToExcel;
@Component({
  selector: 'jqgrid-list',
  templateUrl: './jqgrid-list.component.html',
  styleUrls: ['./jqgrid-list.component.css']
})

export class JqgridListComponent extends LayoutComponentBase implements OnInit {

  constructor(
    private injector: Injector
  ) {
    super(injector);
  }
  @Output() ValueOutput: EventEmitter<string> = new EventEmitter();
  @Input() colModel:any[];
  @Input() groupField:any[];
  @Input() title:string = '';
  @Input() table:string;
  @Input() min_width:number = $('.card-component')?$('.card-component').width():window.innerWidth*0.8;
  @Input() export:Boolean = true;  
  @Input() grouping:Boolean = false;
  @Input() rowNum:number = 20;
  id_jqgrid:string = 'jqGrid_';
  id_pager:string = 'jqGridPager_';
  public isLoading: boolean = false;
  ngOnInit(): void {
    this.id_jqgrid += this.table;
    this.id_pager += this.table;
    this.isLoading = true;
    this.UpdateView();
    render_jqgrid([],this.colModel,this.table,this.min_width,this.grouping,this.rowNum,this.groupField);
  }
  exportExcel(){
    $('#table-export-'+this.table.trim()).empty();
    $('#table-export-'+this.table.trim()).append($('table[aria-labelledby="gbox_jqGrid_'+this.table.trim()+'"]')[0].innerHTML);
    setTimeout(() => {
      $('#table-export-'+this.table.trim()).append($('table[aria-labelledby="gbox_jqGrid_'+this.table.trim()+'"]')[1].innerHTML);
      setTimeout(() => {
        exportTableToExcel('table-export-'+this.table.trim(),this.title);
        $('#table-export-'+this.table.trim()).empty();
      }, 100);
    }, 100);
  }
  public setData(data:any[],colModel:any[],table:string){
    if(!data)data=[];
    setData(data,this.table);
  }

  public onSelectRows(e:any){
    this.ValueOutput.emit(e.target.value);
  }
  public getSelectedRows(tbName:string):any{
    return getSelectedRows(tbName);
  }
}
