import { Component, EventEmitter, Injector, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataStateChangeEvent, GridComponent, GridDataResult } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { stringify } from 'querystring';
import { Observable } from 'rxjs';
import { AppSession } from '../../app-session/app-session';
import { LayoutComponentBase } from '../../layout/layoutBase';
import { User } from '../../models/system/account';
import { ReferenceService, REFERENCE_ENTITY, SYS_GenRowTable } from '../../service-proxies/api-shared';
import { CommonModels } from '../../ultilities/common-model';
import { GridAddService } from './grid-add.service';

const createFormGroup = (dataItem) =>
  new FormGroup({
    Discontinued: new FormControl(dataItem.Discontinued),
    ProductID: new FormControl(dataItem.ProductID),
    ProductName: new FormControl(dataItem.ProductName, Validators.required),
    UnitPrice: new FormControl(dataItem.UnitPrice),
    UnitsInStock: new FormControl(dataItem.UnitsInStock, Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,3}')]))
  });

const matches = (el, selector) => (el.matches || el.msMatchesSelector).call(el, selector);
@Component({
  selector: 'grid-add',
  templateUrl: './grid-add.component.html',
  styleUrls: ['./grid-add.component.css']
})


export class GridAddComponent extends LayoutComponentBase implements OnInit, OnChanges {

  @ViewChild(GridComponent)
  grid: GridComponent;

  @Input() GenRowTable: SYS_GenRowTable[];
  @Input() GenRowTableMaster: SYS_GenRowTable;
  @Input() InputMaster: Object;
  @Input() title: string;
  @Input() colFather: string;
  @Input() tableNameFather: string;
  @Input() IdFather: number;
  @Input() dataGrid: any[];
  formGroup!: FormGroup | undefined;
  mySelection: string[] = [];
  editedRowIndex!: number | undefined;
  docClickSubscription: any;
  isNew: boolean;
  modelDetailJSON: string = '';
  tbName: string = '';
  arrayFiles: any[] = this.getArrayFiles();
  refValue: any;
  @Output() ValueOutput: EventEmitter<any> = new EventEmitter();
  public textboxValue = '';
  constructor(
    private injector: Injector,
    private service: GridAddService,
    private referenceService: ReferenceService,
    private commonModels: CommonModels,
    private appSession: AppSession,
    private renderer: Renderer2) {
    super(injector);
  }
  public view: Observable<GridDataResult>;
  public gridView: GridDataResult;
  public state: State = {
    skip: 0,
    take: 10
  };
  ngOnChanges(changes: SimpleChanges): void {
    if (this.dataGrid != undefined && this.InputMaster != undefined && this.IdFather >= 0) {
      this.BlockUI();
      this.tbName = this.GenRowTable[0].tablE_NAME;
      this.setGenrowTable(this.tbName, this.GenRowTable);
      var t = this.dataGrid[this.tbName] = [];
      var user = new User();
      user = this.appSession.user;
      let input = new REFERENCE_ENTITY();
      input['genRowTable'] = this.GenRowTableMaster;
      input['idEdit'] = this.IdFather;
      input['tablE_NAME'] = this.tableNameFather;
      input['userID'] = user.id;
      input['type'] = 1;
      input['tablE_NAME_DETAIL'] = this.tbName;
      let obj = this.commonModels.ListModel.find(e =>
        e.Key == this.tbName
      )[this.tbName];
      for (const [key, value] of Object.entries(obj)) {
        if (this.modelDetailJSON != '') this.modelDetailJSON += '-';
        this.modelDetailJSON += key;
      }
      input['modelDetailJSON'] = this.modelDetailJSON

      this.referenceService.reference_Search(input).subscribe(
        (data: any) => {
          data[0]['outputData'].forEach(element => {
            for (const [key, value] of Object.entries(element)) {
              if (typeof element[key] === 'object')
                element[key] = null;
            }
          });
          this.dataGrid = data[0]['outputData'];
          this.InputMaster[this.tbName] = this.dataGrid;
          this.gridView = {
            data: this.dataGrid.slice(this.state.skip, this.state.skip + this.state.take),
            total: this.dataGrid.length
          };
          this.setDataGrid(this.gridView, this.tbName);
          this.UpdateView();
        },
        (err) => this.UnBlockUI(),
        () => {
          this.UnBlockUI();
          //isloading = true
        }
      )
    } else if (this.dataGrid != undefined && this.InputMaster != undefined && this.IdFather < 0) {
      this.tbName = this.GenRowTable[0].tablE_NAME;
      this.setGenrowTable(this.tbName, this.GenRowTable);
      this.InputMaster[this.tbName] = [];
    }
  }
  geenGridView(tbName: string): GridDataResult {
    return this.getDataGrid(tbName);
  }
  public dataStateChange(state: DataStateChangeEvent, tbName: string): void {
    this.gridView = {
      data: this.InputMaster[this.tbName].slice(state.skip, state.skip + state.take),
      total: this.InputMaster[this.tbName].length
    };
    this.state.skip = state.skip;
    this.setDataGrid(this.gridView, this.tbName);
    this.UpdateView();
  }
  public ngOnInit(): void {
    // this.view = this.service.products();
    this.docClickSubscription = this.renderer.listen('document', 'click', this.onDocumentClick.bind(this));
  }

  public ngOnDestroy(): void {
    this.docClickSubscription();
  }

  public addHandler(): void {
    this.closeEditor();

    this.formGroup = createFormGroup({
      Discontinued: false,
      ProductName: '',
      UnitPrice: 0,
      UnitsInStock: ''
    });
    this.isNew = true;

    this.grid.addRow(this.formGroup);
  }
  public addNewRow(tbName: string): void {
    var newRow = {},
      arr = this.getGenrowTable(tbName);
    arr.forEach(element => {
      newRow[element['columN_NAME']] = null;
    });
    newRow['id'] = this.getRandomID(tbName);
    newRow['indexRow'] = this.InputMaster[tbName].length + 1;
    this.InputMaster[tbName].push(newRow);
    this.gridView = {
      data: this.InputMaster[tbName].slice(this.state.skip, this.state.skip + this.state.take),
      total: this.InputMaster[tbName].length
    };
    this.setDataGrid(this.gridView, this.tbName);
    this.UpdateView();
  }
  getRandomID(tbName: string): number {
    var min = Math.ceil(-999999999);
    var max = Math.floor(-1);
    var id = Math.floor(Math.random() * (max - min + 1)) + min;
    if (this.InputMaster[tbName].filter(e => e['id'] == id).length > 0) this.getRandomID(tbName);
    return id;
  }
  public refreshIndex(tbName: string) {
    var i = 1;
    this.InputMaster[tbName].forEach(element => {
      element['indexRow'] = i; i++;
    });
  }
  public ClearSelected(tbName: string): void {
    var arr = document.getElementsByClassName(tbName);
    let t = [];
    for (var i = 0; i < arr.length; i++)
      if (arr[i].children[0]['checked'] == true)
        t.push({ id: this.InputMaster[tbName][i]['id'] });
    t.forEach(e => {
      this.InputMaster[tbName] = this.InputMaster[tbName].filter(_e => _e['id'] != e['id']);
    })
    this.refreshIndex(tbName);
    this.gridView = {
      data: this.InputMaster[tbName].slice(this.state.skip, this.state.skip + this.state.take),
      total: this.InputMaster[tbName].length
    };
    this.setDataGrid(this.gridView, this.tbName);
    this.UpdateView();
  }
  public saveRow() {
    if (this.formGroup && this.formGroup.valid) {
      this.saveCurrent();
    }
  }
  getValueFile(value: any[], col: string, tbName: string, ref_MasterID: number): void {
    let _value = value['v']['fileOld'];
    //begin gen new upload
    let _fileNew = value['v']['fileNew'];
    let fileNew = _value.filter(e => e['id'] < 0);
    _fileNew.forEach(e => {
      let _v = this.getNewFile; _v.push(e)
      this.setNewFile(_v);
    });

    //delete file validate
    // let _v = this.getNewFile, __v = this.getNewFile;
    // for (var _i = 0; _i < _v.length; _i++) {
    //   if (fileNew.filter(e => e['lastModified'] == _v[_i]['lastModified']).length == 0)
    //     __v = __v.splice(__v.indexOf(_v[_i]), 1);
    // }
    // this.setNewFile(__v);
    let k = [];
    this.objValueByID[value['key']].forEach(e => {
      if (!e['key']) k.push(e);
    });
    //end gen new upload
    if (ref_MasterID == undefined) {

    }

    let v_Of = this.arrayFiles.filter(e => e['tbName'] != tbName && e['colName'] != col && e['ref_MasterID'] != ref_MasterID);
    _value.forEach(element => {
      v_Of.push(element);
    });
    _value.push({ key: value['key'] })
    this.setValueEditNoUpdate(value['key'], _value);
    this.setArrayFiles(v_Of);
    this.UpdateData();
  }
  getId(): number {
    let id = -Math.floor(Math.random() * 1001);
    if (this.arrayFiles.filter(e => e['id'] == id).length > 0) this.getId();
    return id;
  }
  cellClickHandler({ isEdited, dataItem, rowIndex }): void {
    if (isEdited || (this.formGroup && !this.formGroup.valid)) {
      return;
    }

    if (this.isNew) {
      rowIndex += 1;
    }

    this.saveCurrent();

    this.formGroup = createFormGroup(dataItem);
    this.editedRowIndex = rowIndex;

    this.grid.editRow(rowIndex, this.formGroup);
  }

  public cancelHandler(): void {
    this.closeEditor();
  }

  private closeEditor(): void {
    this.grid.closeRow(this.editedRowIndex);

    this.isNew = false;
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }

  private onDocumentClick(e: any): void {
    if (
      this.formGroup &&
      this.formGroup.valid &&
      !matches(e.target, '#' + this.tbName + ' tbody *, #' + this.tbName + ' .k-grid-toolbar .k-button')
    ) {
      this.saveCurrent();
    }
  }
  GetdData(obj: any, tbName: string, col: string, type: number): void {
    if (type == 6 || type == 7 || type == 8) {
      this.arrayFiles.push(obj['v']);
    }
    else if (obj['v'] != null) {
      var item = this.InputMaster[tbName].find(e => e['id'] == obj['id'])
      var p = this.InputMaster[tbName].indexOf(item);
      this.refValue = { v: obj['v'], id: obj['id'], key: this.getKey(tbName, col, obj['id']), tbName: tbName, col: col, p: p }
      this.ValueOutput.emit(this.refValue);
    }
    this.UpdateView();
  }
  private saveCurrent(): void {
    if (this.formGroup) {
      this.service.save(this.formGroup.value, this.isNew);
      this.closeEditor();
    }
  }
}

