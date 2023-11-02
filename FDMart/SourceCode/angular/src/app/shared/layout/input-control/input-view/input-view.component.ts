import { formatCurrency } from '@angular/common';
import { AfterContentChecked, Component, DoCheck, EventEmitter, Injector, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { PaletteSettings } from '@progress/kendo-angular-inputs';
import * as moment from 'moment';
import { AppSession } from 'src/app/shared/app-session/app-session';
import { ReferenceService, REFERENCE_ENTITY } from 'src/app/shared/service-proxies/api-shared';
import { LayoutComponentBase } from '../../layoutBase';
@Component({
  selector: 'input-view',
  templateUrl: './input-view.component.html',
  styleUrls: ['./input-view.component.css']
})
export class InputViewComponent extends LayoutComponentBase implements OnInit, OnChanges, DoCheck {
  @Input() inputMaster: Object;
  @Input() value: any = null;
  @Input() myFiles: any[] = [];
  @Input() name: string;
  @Input() id: number;
  @Input() codeEdit: string;
  @Input() colName: string;
  @Input() tableName: string;
  @Input() format: string;
  @Input() CurrenFrom: string;
  @Input() reference: string;
  @Input() isloadingData: boolean;
  @Input() storeD_PROCEDURES: string;
  @Input() shoW_REFERENCE: boolean;
  @Input() displaY_LIST: boolean;
  @Input() displaY_EDIT: boolean;
  @Input() disablE_EDIT: boolean;
  @Input() type: number;
  @Input() callbackFunction: (args: any) => void;
  @Output() ValueOutput: EventEmitter<any> = new EventEmitter();
  @Output() ValueFilesOutput: EventEmitter<any[]> = new EventEmitter();
  public boundedPrintValue = this.renderType.bind(this);
  public sliderValue = 5;
  public numericValue = 5;
  public switchValue = false;

  public textareaValue = '';
  public min = 0;
  public max = 10;
  public smallStep = 1;
  public checked = true;
  public radioValue = 'foo';
  public rangeSliderValue = [3, 6];
  public idInput = 'dfdfdfdf';
  public valueDate: Date = new Date(2000, 2, 10);
  public valueFiles = [];
  public key: string = '';
  public keyId: string = '';
  public idUser: number;
  public refValue: any;
  public numberFile: number = 0;
  constructor(
    private appSession: AppSession,
    private injector: Injector,
    private referenceService: ReferenceService
  ) {
    super(injector);
  }
  ngDoCheck(): void {
    if (this.isChangeDetected()) {
      this.myFiles = this.getArrayFiles();
      this.refresh();
      if (Object.keys(this.objValueByID).length == this.getCountItems())
        this.unChangeDetected();
      else
        this.PlusCountItems();
    }
    return;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (!this.isloadingData && this.tableName != undefined && this.colName != undefined) {
      this.refresh();
    }
  }
  refresh() {
    if (this.tableName != undefined && this.colName != undefined && this.id != undefined) {
      this.key = this.getKey(this.tableName, this.colName, this.id);
      try {
        if (this.type == 1 || this.type == 19) { //number
          var v = 0;
          if (this.value != undefined)
            v = parseInt(this.value);
          if (v >= 0 || v < 0)
            this.value = v;
          else
            this.value = 0;
        }
        if (this.type == 5 || this.type == 9 || this.type == 11) { //DateTimePicker
          var v9 = null;
          if (this.value != undefined && this.value != "") {
            if (this.value._i != undefined) {
              v9 = new Date(moment.utc(this.value, 'MM-DD-YYYY').format("YYYY-MM-DD HH:mm"))
              this.refValue = { v: v9, id: this.id }
              this.ValueOutput.emit(this.refValue);
            }
            else
              v9 = new Date(this.value);
          }
          this.value = v9;
        }
        if (this.type == 15) {
          if (!this.value) this.value = 0;
          this.setValueEdit(this.key + 'str', formatCurrency(this.value, 'en', '', null, '',));
        }
        if (this.type == 10) {//range
          try {
            this.range.start = new Date(JSON.parse(this.value)['start']);
            this.range.end = new Date(JSON.parse(this.value)['end']);
          } catch {
          }
          this.value = this.range;
        }
        if (this.type == 12 && this.listItemsMultivalue.length == 0) {
          this.onLoadSelect(this.tableName + '_' + this.colName + '_' + this.id, this.storeD_PROCEDURES, this.tableName, this.colName, this.id);
        }
        if (this.type == 24 && this.listItemsCombobox.length == 0) {
          this.onLoadCombobox(this.tableName + '_' + this.colName + '_' + this.id, this.storeD_PROCEDURES, this.tableName, this.colName, this.id);
        }
        if (this.type == 25 && this.listItems.length == 0) {
          this.BlockUI();
          let input = new REFERENCE_ENTITY();
          input.stored = this.storeD_PROCEDURES;
          input.type = 1;
          this.referenceService.reference_Search(input).subscribe(
            (data: any) => {
              this.listItems = data;
              this.UpdateView()
            },
            (err) => this.UnBlockUI(),
            () => {
              this.UnBlockUI();
            }
          )
        }
        if ((this.type == 6 || this.type == 7 || this.type == 8)) {
          console.log(this.value)
          this.setisTypeFile();
          this.numberFile = this.value.length;
        }
        if (this.type != 12 && this.type != 24) this.setValueEdit(this.key, this.value);
        if (this.value == undefined) this.value = null;
        // if (this.value == null && (this.type == 2 || this.type == 3 || this.type == 13
        //   || this.type == 16 || this.type == 17 || this.type == 18 || this.type == 22)) this.value = "";
        if (this.myFiles == undefined) this.myFiles = [];
      } catch { }
    }

  }
  onEvent() {
    this.callbackFunction(this.value);
  }

  ngOnInit(): void {
    this.idUser = this.appSession.user.id;
  }
  onLoadSelect(key: string, stored: string, tbName: string, colName: string, id: any) {
    let input = new REFERENCE_ENTITY();
    input.stored = stored;
    input.tablE_NAME = tbName;
    input.columN_NAME = colName;
    input.type = 2;
    input.idEdit = parseInt(id);
    input.userID = this.idUser;
    input.values = this.value;
    this.referenceService.reference_Search(input).subscribe(
      (data: any) => {
        if (data == null) return;
        this.listItemsMultivalue = data[0].outputData;
        var t, v = [];
        if (data[0].values) {
          t = data[0].values.split(';'), v = [];
          t.forEach(element => {
            var temp = this.listItemsMultivalue.filter(e => e['id'] == parseInt(element));
            if (temp.length > 0)
              v.push(temp[0]);
          });
        }
        this.objValueByID[key] = v;
        this.UpdateView()
      },
      (err) => console.error(err),
      () => {
      }
    )
  }
  onLoadCombobox(key: string, stored: string, tbName: string, colName: string, id: any) {
    this.BlockUI();
    let input = new REFERENCE_ENTITY();
    input.stored = stored;
    input.tablE_NAME = tbName;
    input.columN_NAME = colName;
    input.type = 2;
    input.idEdit = parseInt(id);
    input.userID = this.idUser;
    if (this.value)
      input.values = this.value.toString();
    input.key = key;
    this.referenceService.reference_Search(input).subscribe(
      (data: any) => {
        if (data == null) return;
        this.listItemsCombobox = data[0].outputData;
        var t = parseInt(data[0].values);
        if (t)
          this.objValueByID[key] = this.listItemsCombobox.find(e => e['id'] == t)['Name'];
        else
          this.objValueByID[key] = [];
        this.UpdateView()
      },
      (err) => console.error(err),
      () => {
        this.UnBlockUI()
      }
    )
  }
  renderType(type: any) {

  }
  public onChangeValueFile(val: any[], id: number) {
    this.refValue = { v: val, id: id }
    this.ValueFilesOutput.emit(this.refValue);
  }
  public onChangeValueCombobox(val: any, id: number) {
    this.refValue = { v: val['id'], id: id }
    this.ValueOutput.emit(this.refValue);
  }
  public onChangeValue(val: any, id: number) {
    this.refValue = { v: val, id: id }
    this.ValueOutput.emit(this.refValue);
  }
  public onChangeValueMultivalue(val: any, id: number) {
    this.refValue = { v: val.map(({ id }) => id).join(';'), id: id }
    this.ValueOutput.emit(this.refValue);
  }
  public onAfterValueChange(e: any) {

  }
  public onAfterValueRange_S(val: any, id: number) {
    this.range.start = val;
    this.refValue = { v: JSON.stringify(this.range), id: id }
    this.ValueOutput.emit(this.refValue);
  }
  public onAfterValueRange_E(val: any, id: number) {
    this.range.end = val;
    this.refValue = { v: JSON.stringify(this.range), id: id }
    this.ValueOutput.emit(this.refValue);
  }
  //ColorPicker
  valueColor: string = '';
  public getValue(key: string): any {
    return this.getValueEdit(key);
  }
  public settings: PaletteSettings = {
    tileSize: 30
  };
  // public onChangeColorPicker(val: string): void {
  //   this.valueColor = val;
  //   this.ValueOutput.emit(val);
  // }
  //MaskedTextBox
  public maskedValue: string;
  // public onChangeMaskedTextBox(val: string): void {
  //   this.valueColor = val;
  //   this.ValueOutput.emit(val);
  // }
  //textbox
  public textboxValue = '';
  // public onChangeTextBox(val: string): void {
  //   this.textboxValue = val;
  //   this.ValueOutput.emit(val);
  // }
  //number
  // public onChangeNumber(val: number) {
  //   this.ValueOutput.emit(val);
  // }
  //Date
  //File

  public clearModel(): void {
    this.myFiles = [];
  }
  //<!-- 10	dateranges -->
  public range = { start: null, end: null };
  //<!--12	Multivalue-- >
  public listItemsMultivalue: Array<{ id: number, name: string }> = [];
  public valueMultivalue: any = ["Baseball"];
  //combobox
  public listItemsCombobox: Array<{ id: number, name: string }> = [];
  public selectedSize = "Medium";
  //autocomplete
  public listItems: Array<{ id: number, name: string }> = [];
  formatMoney(v: number): number {
    if (!v) return 0;
    return v;
  }
  formatDate(v: any, f: string): string {
    if (v == null || v == undefined) return "";
    f = f.replace('dd', 'DD')
    return moment.utc(v, 'MM-DD-YYYY').format(f);
  }
  formatDateRanges(v: any, f: string): string {
    if (v == null || v == undefined) return "";
    f = f.replace('dd', 'DD');
    v = '{' + v + '}';
    v = v.replace(/\\/gi, '')
    var fr = '', to = '';
    try {
      if (JSON.parse(v)['start'] != '' && JSON.parse(v)['start'] != undefined && JSON.parse(v)['start'] != null)
        fr = moment.utc(new Date(JSON.parse(v)['start']), 'MM-DD-YYYY').format(f);
      if (JSON.parse(v)['end'] != '' && JSON.parse(v)['end'] != undefined && JSON.parse(v)['end'] != null)
        to = moment.utc(new Date(JSON.parse(v)['end']), 'MM-DD-YYYY').format(f);
    } catch {
      return '';
    }
    return fr + ' - ' + to;
  }
}
