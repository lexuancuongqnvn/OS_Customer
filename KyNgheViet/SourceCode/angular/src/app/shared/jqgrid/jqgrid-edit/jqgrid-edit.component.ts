import { AfterViewInit, Component, EventEmitter, Injector, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import moment from 'moment';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import { isBuffer } from 'util';
import { ExportComponent } from '../../core/export/export-component';
import { ImportComponent } from '../../core/import/import-component';
import { LayoutComponentBase } from '../../layout/layoutBase';
import { EditPageState } from '../../ultilities/enum/edit-page-state';
import { EditGridState } from './editGrid-state.component';
declare var render_jqgrid_edit;
declare var getSelectedRows;
declare var setData;
declare var getAllData;
declare var getAllData2;
declare var DeleteRowData;
declare var exportTableToExcel;
declare var appendOpptionSelectpickerByClass;

@Component({
  selector: 'jqgrid-edit',
  templateUrl: './jqgrid-edit.component.html',
  styleUrls: ['./jqgrid-edit.component.css']
})

export class JqgridEditComponent<T extends Object>  extends LayoutComponentBase implements OnInit   {

  constructor(
    private injector: Injector,
    private exportComponent:ExportComponent
  ) {
    super(injector);
    this.tableState =new EditGridState();
  }
  @ViewChild('excelImport') excelImport:ImportComponent;
  @Output() ValueOutput: EventEmitter<string> = new EventEmitter();
  @Output() ValueSearchOutput: EventEmitter<any> = new EventEmitter();
  @Input() colModel:any[]=[];
  @Input() title:string = '';
  @Input() sheetName:string = 'Sheet1';
  @Input() filter:string = '';
  @Input() storedExport:string = '';
  @Input() table:string;
  @Input() fieldValue:string = 'code';
  @Input() import:Boolean = false;
  @Input() export:Boolean = false;
  @Input() footerrow:Boolean = false;
  @Input() minHeight:any = 500;
  @Input() rowNum:number = 20;
  @Input() isAdd:Boolean = true;
  @Input() isEdit:Boolean = false;
  @Input() isDel:Boolean = true;
  @Input() isCopy:Boolean = false;
  id_jqgrid:string = 'jqGrid_';
  id_pager:string = 'jqGridPager_';
  public isLoading: boolean = false;
  tableState: EditGridState;

  public conver_width_edit(input:any):any {
      if ($('.form-jqgrid-edit').width() == 0) {
          setTimeout(() => {
              this.conver_width_edit(input);
          }, 500);
      } else {
          let width_screem = $('.form-jqgrid-edit').width(),
              padding = 0.0225;
          var total = 0;
          input.forEach(element => {
              if (!element.hidden) {
                  total += element.width;
              }
              // element.editable ? element.editable = (getCurrentForm() != EditPageState.viewDetail) : element.editable = element.editable
          });
          if (total > 100) total = 100;
          input.forEach(element => {
              let w = (element.width / total) * width_screem;
              element.width = w - (w * padding);
          });
      }
      return input;
  }
  exportExcel(){
    debugger
    try{
      if(this.storedExport != "")
      {
        this.tableState.allData.forEach(e => {
          if (this.filter != '') this.filter += ';';
          this.filter += e[this.fieldValue];
        })
        this.exportComponent.ExportTOExcel(this.title, this.title, this.sheetName, this.storedExport, this.filter, 'HRM');

      }else
       {
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
    }catch{
      exportTableToExcel('jqGrid_'+this.table,this.title);
    }
   
  }
  inport(id:string){
    document.getElementById(id).click();
  }
  Respond(data:any){
    var result = [], t = [], count = 1;
    var limit = this.colModel.length-(this.colModel.filter(e=>e.hidden == true).length);
    for (const [key, value] of Object.entries(data)) {
      if (value['v'] && key != 'A1') {
        if (count > limit) {
          result.push(t); t = []; count = 1;
        }
        t.push(value['v']); count++;
      }
    }
    if(t.length > 0) result.push(t);
    this.convertDataTotype(result);
  }
  convertDataTotype(data:any){
    var rows = data[0].length,reuslt = [];
    for(var j = 1 ; j < data.length ; j++){
      reuslt.push({});
    }
    for(var i =0 ; i < rows ; i++){
      var colName = data[0][i];
      var sorttype = this.colModel.find(e=>e.label == colName).sorttype,
      name = this.colModel.find(e=>e.label == colName).name,c=false;
        switch (sorttype) {
          case 'int':
            for(var j = 0 ; j < data.length-1 ; j++){
              reuslt[j][name] = Number(data[j+1][i].replace(',',''));
            }
            c=true;
              break;
          case 'checkbox':
            c=true;
            break;
          case 'select':
            var editoptions_value = this.colModel.find(e=>e.label == colName).editoptions.value;
            for(var j = 0 ; j < data.length -1; j++){
              var code = editoptions_value.find(e=>e['name'] == data[j+1][i])['code'];
              reuslt[j][name] = code;
            }
            c=true;
            break;
          case 'multiselect':
            var editoptions_value = this.colModel.find(e=>e.label == colName).editoptions.value;
            for(var j = 0 ; j < data.length-1 ; j++){
              var v = data[j+1][i].split(';'),codes='';
              v.forEach(vs => {
                if(codes != '') codes += ';';
                codes += editoptions_value.find(e=>e['name'] == vs)['code'];
              });
              reuslt[j][name] = codes;
            }
            c=true;
              break;
          case 'date':
            c=true;
              break;
          case 'datetime':

            c=true;
              break;
          case 'time':

            c=true;
              break;
          case 'money':
            for(var j = 0 ; j < data.length-1 ; j++){
              reuslt[j][name] = Number(data[j+1][i].replace(',',''));
            }
            c=true;
              break;
      }
      if(!c){
        for(var j = 0 ; j < data.length -1; j++){
          reuslt[j][name] = data[j+1][i];
        }
      }
    }
    var dataTable = this.tableState.allData;
    reuslt.forEach(e=>{
      dataTable.push(e);
    })
    this.setData(dataTable);
  }
  handleFileInput(e:any){
    this.excelImport.incomingfile(e);
  }
  ImportExcel(){
    const ExcelJS = require('exceljs');

    const wb = new ExcelJS.Workbook();

    const fileName = 'items.xlsx';

    wb.xlsx.readFile(fileName).then(() => {
        
        const ws = wb.getWorksheet('Sheet1');

        const c1 = ws.getColumn(1);
        
        c1.eachCell(c => {

            console.log(c.value);
        });

        const c2 = ws.getColumn(2);
        
        c2.eachCell(c => {

            console.log(c.value);
        });
    }).catch(err => {
        console.log(err.message);
    });
  }
  resetOpptionSelectpicker(id:string, value:string, disabled:boolean=false, listOpption:any, isMulti:boolean, textSearch = ''){
    listOpption.forEach(e=>{
      e['text'] = e['name'];
      e['id'] = e['code'];
    })
    appendOpptionSelectpickerByClass(id,value,disabled,listOpption,isMulti,textSearch)
  }
  ngOnInit(): void {
    this.id_jqgrid += this.table;
    this.id_pager += this.table;
    this.isLoading = true;
    this.UpdateView();
    // render_jqgrid_edit([],this.colModel,this.table,this.footerrow,this.getCurrenFrom != EditPageState.viewDetail);
  }
  public create_jqgrid(){
    render_jqgrid_edit([],this.colModel,this.table,this.footerrow,this.minHeight,this.rowNum,this.isAdd,this.isEdit,this.isDel,this.isCopy);
  }
  public setData(data:T[]){
    render_jqgrid_edit([],this.colModel,this.table,this.footerrow,this.minHeight,this.rowNum,this.isAdd,this.isEdit,this.isDel,this.isCopy);
    this.tableState.allData = data;
    setData(data,this.table,this.colModel,this.footerrow,500);
  }
  public get allData():T[]{ 
    this.genAllData();
    return this.tableState.allData;
  }
  public CheckIsDate (input:any):boolean {
    try{
      if (Object.prototype.toString.call(input) === "[object Date]")
      return true;
    }catch{
      return false;
    }
    return false;
  };
  public genAllData(){
    let data = getAllData2(this.table);
    data.forEach(dt=>{
      $.each(dt, function (key, val) {
        try{
          if (Object.prototype.toString.call(val) === "[object Date]" || ( val instanceof moment))
          {
            dt[key] = moment(val).utc(true);
          }
        }catch{}
      });
    })
    // var data_old = this.tableState.allData;
    // data.forEach(e => {
    //   if(e.code != '' && e.code){
    //     if(e.code.toString().indexOf('jqg') >= 0 && data_old.filter(f=>f['code'].toString() == e.code.toString()).length == 0){
    //       e.id = -1;
    //       data_old.push(e);
    //     }else{
    //       data_old.forEach(old=>{
    //         if(old['code'] == e.code){
    //           $.each(old, function (key, val) {
    //             if(e[key] != undefined){
    //               if (Object.prototype.toString.call(e[key]) === "[object Date]")
    //                 old[key] = moment(e[key]).utc(true);
    //               else
    //                 old[key] = e[key];
    //             }
    //           });
    //         }
    //       })
    //     } 
    //   }
    // });
    this.tableState.allData = data;
  }
  public isDate(value: any): boolean {
    try{
      return Object.prototype.toString.call(value) === "[object Date]"
    }catch{
      return false;
    }
  }
  public isMoment(value: any): boolean {
    try{
      return value instanceof moment;
    }catch{
      return false;
    }
  }
  public autocomplatedText(e:any,tbName:string){
    var t = e.currentTarget.value.split('[]');
    var obj = {id:t[0],text:t[1],tbName:tbName}
    this.ValueSearchOutput.emit(obj);
  }
  public DeleteRow(table:string){
    var listIdDel = DeleteRowData(table);
    if(listIdDel.length > 0){
      for(var i = 0 ; i < listIdDel.length ; i++)
        this.tableState.allData = this.tableState.allData.filter(f=>f['code'] != listIdDel[i]);
    }
  }
  public onSelectRows(e:any){
    this.ValueOutput.emit(e.target.value);
  }
  public getSelectedRows(tbName:string):any{
    return getSelectedRows(tbName);
  }
}
