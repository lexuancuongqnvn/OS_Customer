import { Component, DoCheck, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { MessageService } from '@progress/kendo-angular-l10n';
import { employees } from '../resources/employees';
import { process } from '@progress/kendo-data-query';
import { images } from '../resources/images';
import { Employee } from '../../models/employee.model';
import { ActiveColorClickEvent } from '@progress/kendo-angular-inputs';
import { SYS_GenRowTable } from '../../service-proxies/api-shared';
import { DrawerService } from '../../shared.service';
import { LayoutComponentBase } from '../../layout/layoutBase';
import { IntlService } from "@progress/kendo-angular-intl";
import moment, { invalid } from 'moment';
import { isNull } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.css']
})
export class GridViewComponent extends LayoutComponentBase implements OnInit, DoCheck {

  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  @Input() GenRowTable: SYS_GenRowTable[];
  @Input() Data: any[] = [];
  @Input() tableName: string;

  title: string = "title";
  placeholder: string = "placeholder";
  gridData: Employee[] = employees;
  gridView: any[];
  
  mySelection: string[] = [];

  public value: Date = new Date(2000, 2, 10);

  constructor(
    private injector: Injector,
    public intl: IntlService
  ) {
    super(injector);
  }
  ngDoCheck(): void {
    this.RefreshGrid();
  }

  ngOnInit() {
    if (this.Data == undefined) this.Data = []
    this.gridView = this.Data.slice(25, 50);
  }
  // selectRow(event: any) {
  //   this.idSelect = event.dataItem.code;
  //   this.setIdSelected(this.idSelect);
  //   this.refreshAcction();
  // }
  renderData() {
    var i = 1;
    this.Data.forEach(e => {
      e['indexRow'] = i; i++;
    })
    this.UpdateView();
  }
  RefreshGrid() {
    // this.renderData(data);
    if (this.getInputMaster(this.tableName)) {
      this.Data = this.getInputMaster(this.tableName);
      this.renderData();
    }

    this.gridView = this.Data.slice(0, 50);
    this.UpdateView();
  }
  // Update Grid collection during changing My Team/All Team
  onTeamChange(pageSize: number): void {
    pageSize === 25
      ? (this.gridView = this.Data.slice(pageSize, pageSize * 2))
      : (this.gridView = this.Data.slice(0, pageSize));
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
  formatOptions: any = {
    style: "currency",
    currency: "VNĐ",
    currencyDisplay: "name",
  };
  onFilter(inputValue: any) {
    this.gridView = process(this.Data, {
      filter: {
        logic: 'or',
        filters: [
          {
            field: this.getField,
            operator: 'contains',
            value: inputValue
          }
        ]
      }
    }).data;

    this.dataBinding.skip = 0;
  }
  public onOpen(e: any): void {

  }

  public onClose(e: any): void {

  }
  public onChange(color: string): void {

  }
  public activeColor(event: ActiveColorClickEvent): void {

  }
  getField = (args: Employee) => {
    return `${args.fullName}_${args.jobTitle}_${args.budget}_${args.phone}_${args.address}`;
  }

  photoURL(dataItem: any): string {
    const code: string = dataItem.imgId + dataItem.gender;
    const image: any = images;

    return image[code];
  }

  flagURL(dataItem: any): string {
    const code: string = dataItem.country;
    const image: any = images;
    return image[code];
  }
}
