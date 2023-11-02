import { Component, ElementRef, EventEmitter, Injector, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DxFormComponent, DxValidatorComponent } from 'devextreme-angular';
import ArrayStore from 'devextreme/data/array_store';
import { AppSession } from '../../app-session/app-session';
import { LayoutComponentBase } from '../../layout/layoutBase';
import { ToolbarComponent } from '../../layout/toolbar/toolbar.component';
import { GenRowTableService, ReferenceService, REFERENCE_ENTITY, REFERENCE_V3_Param, SYS_GenRowTable, SYS_GenRowTable_Detail, SYS_Menu, Token, User } from '../../service-proxies/api-shared';
import { AlertMessageComponent } from '../../sidenav/alert-message/alert-message.component';
import { EditPageState } from '../../ultilities/enum/edit-page-state';
import { IUiAction } from '../../ultilities/ui-action';
import { Employee, Service3 } from './form-edit-v2-test.service';
import { DxDropDownBoxComponent } from 'devextreme-angular';
import { AnyAaaaRecord } from 'dns';
import moment from 'moment';

@Component({
  selector: 'form-edit-v2',
  templateUrl: './form-edit-v2.component.html',
  styleUrls: ['./form-edit-v2.component.css']
})
export class FormEditV2Component extends LayoutComponentBase implements OnInit, IUiAction<any> {
  @ViewChild(DxFormComponent, { static: false }) myform: DxFormComponent;
  @ViewChild('toolbarEdit') toolbarEdit: ToolbarComponent;
  @ViewChild('buttonSubmit', { static: false }) buttonSubmit: ElementRef;
  @ViewChildren(DxDropDownBoxComponent) dropdowns: QueryList<DxDropDownBoxComponent>;

  // @ViewChild('alertMessage') alertMessage: AlertMessageComponent;
  tabContent: string;
  tabIndex: number=0;

  @Input() InputMaster: any;
  @Input() editPageState: string = EditPageState.edit;
  @Input() tbName: string = '';
  @Input() onRefreshGrid: boolean = false;

  @Output() selectedRowsGridDataOutput: EventEmitter<any> = new EventEmitter();
  @Output() HandleValueChangedOutput: EventEmitter<any> = new EventEmitter();
  @Output() HandleRowsDataGridOutput: EventEmitter<any> = new EventEmitter();
  @Output() onClickAcctionOutput: EventEmitter<any> = new EventEmitter();
  @Output() selectedRowsDataOutput: EventEmitter<any> = new EventEmitter();
  @Output() callBackDataMultirowOutput: EventEmitter<any> = new EventEmitter();
  @Output() onRefreshGridOutput: EventEmitter<boolean> = new EventEmitter();



  employee: Employee;

  positions: string[];

  nameEditorOptions: Object;

  positionEditorOptions: Object;

  validationRules: Object;

  hireDateEditorOptions: Object;

  birthDateEditorOptions: Object;

  notesEditorOptions: Object;

  phoneEditorOptions: Object;

  labelTemplates: Object;

  menuCode: string = '';

  menu: SYS_Menu = new SYS_Menu()

  genRowTable: SYS_GenRowTable = new SYS_GenRowTable();

  genRowTableDetail: SYS_GenRowTable_Detail[] = [];

  groups: any[] = [];
  panels: any[] = [];

  arrayColumnRequired:any[] = [];

  isDropBoxOpened: boolean = false;
  onRefreshGridT: boolean = false;

  buttonOptions: any = {
    text: 'Register',
    type: 'success',
    useSubmitBehavior: true,
  };


  birthDate = new Date(1981, 5, 3);

  states: string[];

  phoneRules: any = {
    X: /[02-9]/,
  };
  longtabs: any[];

  companies: any[]=[{
    id: 0,
    text: 'user',
    icon: 'user',
    content: 'User tab content',
  },
  {
    id: 1,
    text: 'comment',
    icon: 'comment',
    content: 'Comment tab content',
  },
  {
    id: 2,
    text: 'find',
    icon: 'find',
    content: 'Find tab content',
  }];



  simpleProducts: string[] = [
    'HD Video Player',
    'SuperHD Video Player',
    'SuperPlasma 50',
    'SuperLED 50',
    'SuperLED 42',
    'SuperLCD 55',
    'SuperLCD 42',
    'SuperPlasma 65',
    'SuperLCD 70',
    'Projector Plus',
    'Projector PlusHT',
    'ExcelRemote IR',
    'ExcelRemote Bluetooth',
    'ExcelRemote IP',
  ];
  onFormSubmit = function (e) {
   
    e.preventDefault();
  };
  asyncValidation(params) {
    return this.sendRequest(params.value);
  }
  sendRequest(value){
    const invalidEmail = 'test@dx-email.com';
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(value !== invalidEmail);
      }, 1000);
    });
  };
  constructor(
    service: Service3,
    injector: Injector,
    private appSession: AppSession,
    private genRowTableService: GenRowTableService,
    private referenceService: ReferenceService
  ) {
    super(injector);
    this.employee = service.getEmployee();

    this.nameEditorOptions = { disabled: true };
    this.positionEditorOptions = { items: service.getPositions(), searchEnabled: true, value: '' };
    this.hireDateEditorOptions = { width: '100%', value: null };
    this.birthDateEditorOptions = { width: '100%', disabled: true };
    this.notesEditorOptions = { height: 90, maxLength: 200 };
    this.phoneEditorOptions = { mask: '+1 (X00) 000-0000', maskRules: { X: /[02-9]/ } };
    this.validationRules = {
      position: [
        { type: 'required', message: 'Position '+this.translate('Không được phép trống','is not required')+'.' },
      ],
      hireDate: [
        { type: 'required', message: 'Hire Date '+this.translate('Không được phép trống','is not required')+'.' },
      ]
    };
    this.labelTemplates = [
      { name: 'name', icon: 'dx-icon-user' },
      { name: 'position', icon: 'dx-icon-info' },
      { name: 'date', icon: 'dx-icon-event' },
      { name: 'address', icon: 'dx-icon-home' },
      { name: 'phone', icon: 'dx-icon-tel' },
      { name: 'email', icon: 'dx-icon-email' },
    ];
    this.editPageState = this.getRouteData('editPageState');
    this.setCurrenFrom(this.editPageState);
  }
  onAdd(): void {
    throw new Error('Method not implemented.');
  }
  onUpdate(item: any): void {
    throw new Error('Method not implemented.');
  }
  onDelete(item: any): void {
    throw new Error('Method not implemented.');
  }
  onApprove(item: any): void {
    throw new Error('Method not implemented.');
  }
  onViewDetail(item: any): void {
    throw new Error('Method not implemented.');
  }
  onSave(): void {
    throw new Error('Method not implemented.');
  }
  onSearch(): void {
    throw new Error('Method not implemented.');
  }
  onResetSearch(): void {
    throw new Error('Method not implemented.');
  }
  onClickAcction(id: number, storedName: string, param: string, keyService: string, classForm: string): void {
    document.getElementById('buttonSubmit').click()
    if(this.checkAndShowRequired()){
      this.execDefaultValue();
      this.onClickAcctionOutput.emit({
        id:id, storedName:storedName, param:param, keyService:keyService, classForm:classForm,data:this.InputMaster
      })
      try {$('#div-grid-edit').click()} catch (error) {}
      this.UpdateView();
    }
  }
  getDataByID(storedName: string, param: string, keyService: string): void {
    throw new Error('Method not implemented.');
  }
  selectedRowsDataGridDropdown(event: any, indexGroup: number, column: SYS_GenRowTable_Detail){
    this.execDefaultValue();
    this.HandleRowsDataGridOutput.emit({ dataField: column.columN_NAME, value: event });
    try {$('#div-grid-edit').click()} catch (error) {}
    this.UpdateView();
  }
  selectedRowsDataGridDropdownTab(event: any, indexGroup: number, column: SYS_GenRowTable_Detail){
    this.execDefaultValue();
    this.HandleRowsDataGridOutput.emit({ dataField: column.columN_NAME, value: event });
    try {$('#div-grid-edit').click()} catch (error) {}
    this.UpdateView();
  }
  onSelectRowGridDropdown(event: any, indexGroup: number, column: SYS_GenRowTable_Detail,j:number) {
    let v;
    if (event.dataItem != undefined) {
      v = event.dataItem.code;
    } else if (event instanceof Array) {
      v = event.join(';');
      if (column.typE_ID == 28) {
        this.InputMaster[column.columN_NAME] = v;
        //this.groups[indexGroup].data.find(gr => gr.code == column.code).editoroptions.value = event;
      }
      else {
        this.InputMaster[column.columN_NAME] = v;
        //this.groups[indexGroup].data.find(gr => gr.code == column.code).editoroptions.value = v;
      }
    }
    
    this.mapRequired(column.columN_NAME,v);
    if(column.typE_ID == 27) {
      this.groups[indexGroup].data[j].editoroptions.isDropBoxOpened = false;
      this.dropdowns.forEach((dropdown) => {
        dropdown.instance.close();
      });
    }
    this.HandleValueChangedOutput.emit({ dataField: column.columN_NAME, value: v });

    this.execDefaultValue();
    this.resetDataEditorOptions();
    try {$('#div-grid-edit').click()} catch (error) {}
    this.UpdateView();
  }
  onSelectRowGridDropdownTab(event: any, indexGroup: number, column: SYS_GenRowTable_Detail, indexTab: number, indexTabCol: number) {
    let v;
    if (event.dataItem != undefined) {
      v = event.dataItem.code;
    } else if (event instanceof Array) {
      v = event.join(';');
      if (column.typE_ID == 28) {
        this.InputMaster[column.columN_NAME] = v;
        //this.groups[indexGroup].tabs.tabs[indexTab].data[indexTabCol].data.find(gr => gr.code == column.code).editoroptions.value = event;
      }
      else {
        this.InputMaster[column.columN_NAME] = v;
        //this.groups[indexGroup].tabs.tabs[indexTab].data[indexTabCol].data.find(gr => gr.code == column.code).editoroptions.value = v;
      }
    }
    this.groups[indexGroup].tabs.tabs[indexTab].data[indexTabCol].data.find(gr => gr.code == column.code).editoroptions.isDropBoxOpened = false;
    if(column.typE_ID == 27) {
      this.dropdowns.forEach((dropdown) => {
        dropdown.instance.close();
      });
    }
    this.HandleValueChangedOutput.emit({ dataField: column.columN_NAME, value: v });

    this.mapRequired(column.columN_NAME,v);
    this.execDefaultValue();
    this.resetDataEditorOptions();
    try {$('#div-grid-edit').click()} catch (error) {}
    this.UpdateView();
  }
  ngAfterViewInit() {
    if (this.isRender)
      this.myform.instance.validate();
  }

  ngOnInit(): void {
    this.onLoadGenRowTableDetail();
    this.setAcction();
  }
  setAcction(){
    if(this.toolbarEdit){
       this.toolbarEdit.setUiAction(this);
    }
    else
      setTimeout(() => {
        this.setAcction();
      }, 50);
  }
  myFormData: any = {
    name: '',
    email: ''
  };
  get isNew():boolean{
    return this.InputMaster.code?false:true;
  }
  get isDisabled():boolean{
    return this.editPageState == EditPageState.viewDetail?true:false;
  }
  public customizeNameItem = (item: any) => {
    item.template = 'customNameTemplate';
  };

  public customizeEmailItem = (item: any) => {
    item.template = 'customEmailTemplate';
  };
  onLoadGenRowTableDetail() {
    this.BlockUI()
    this.genRowTableService.sYS_GenRowTable_Search({
      ...new SYS_GenRowTable(),
      tablE_NAME: this.tbName,
      userID: this.appSession.user.id,
      form:this.editPageState,
      type:'BY-TABLE-NAME',
      syS_GenRowTable_Detail:[
        new SYS_GenRowTable_Detail({
          displaY_EDIT:true
        }as SYS_GenRowTable_Detail)
      ]
    } as SYS_GenRowTable).subscribe((data: SYS_GenRowTable[]) => {
      this.genRowTable = data[0];
      this.genRowTableDetail = this.genRowTable.syS_GenRowTable_Detail;
      this.setEditorOptions(this.genRowTableDetail);
      this.UpdateView();
      this.UnBlockUI();
    })
  }
  getDataSourceInGrid(col:SYS_GenRowTable_Detail,i:number,j:number,k:number):any{
    if(!this.InputMaster[col.columN_NAME])return col.editoroptions.items;
    if(this.InputMaster[col.columN_NAME].length > col.editoroptions.items.length){
      let arrInserted = this.InputMaster[col.columN_NAME].filter(item1=>!col.editoroptions.items.some(item2 => item2[col.valueexpr] === item1[col.valueexpr]));
      const mappedArray: any = [...col.editoroptions.items,...arrInserted];
      if(k!==-1)    
        this.groups[i].tabs.tabs[j].data[k].data.find(gr => gr.code == col.code).editoroptions.items = mappedArray;
      else 
        this.groups[i].data.find(gr => gr.code == col.code).editoroptions.items = mappedArray;
      this.onRefreshGrid = !this.onRefreshGrid;
      this.onRefreshGridT = this.onRefreshGrid;
      this.onRefreshGridOutput.emit(this.onRefreshGrid)
        return mappedArray;
    }else if(this.onRefreshGridT != this.onRefreshGrid){
      //TH1:
      let listGroups = this.groups.filter(e=>e.isTab == true);
      listGroups.forEach(tab=>{
        for(var l = 0 ; l < tab.tabs.tabs.length ; l++){
          if(l !== this.tabIndex){
            let gr = tab.tabs.tabs[l];
            gr.data.forEach(data=>{
              data.data.forEach(genrRow=>{
                if(genrRow.columN_NAME != col.columN_NAME && genrRow.typE_ID == 16){
                  Object.entries(genrRow).forEach(([key, item]) => {
                    if (key === 'editoroptions'){
                      item['items'].map(item1 => {
                        let item2 = this.InputMaster[genrRow.columN_NAME].find(i2=>i2[genrRow.valueexpr] == item1[genrRow.valueexpr]);
                        Object.entries(item1).forEach(([key, value]) => {
                          if (typeof value !== 'object' && !Array.isArray(value)) {
                            item1[key] = item2[key];
                          }
                        });
                        return item1;
                      });
                    }
                  }); 
                }
              })
            })
          }
        }
      })
      //TH2:
      try{
        listGroups = this.groups.filter(e=>e.isTab == false && e.data[0].typE_ID == 16);
        listGroups.forEach(tab => {
          tab.data.forEach(genrRow => {
            if(genrRow.typE_ID == 16){
              Object.entries(genrRow).forEach(([key, item]) => {
                if (key === 'editoroptions') {
                  item['items'].map(item1 => {
                    let item2 = this.InputMaster[genrRow.columN_NAME].find(i2 => i2[genrRow.valueexpr] == item1[genrRow.valueexpr]);
                    Object.entries(item1).forEach(([key, value]) => {
                      if (typeof value !== 'object' && !Array.isArray(value)) {
                        item1[key] = item2[key];
                      }
                    });
                    const keys1 = Object.keys(item1);
                    const keys2 = Object.keys(item2);
                    const keysDiff = keys2.filter(e=>!keys1.includes(e))
                    keysDiff.forEach(diff=>{
                      item1[diff]=item2[diff];
                    })
                    return item1;
                  });
                }
              });
            }
          })
        })
      }catch{}
      this.onRefreshGridT = this.onRefreshGrid;
      this.onRefreshGridOutput.emit(this.onRefreshGrid)
    }
    return col.editoroptions.items;
  }
  setDataEditorOptions(col:SYS_GenRowTable_Detail,indexGroup: number, indexTab: number=-1, indexTabCol: number=0): any {
    try{
      switch (col.editortype) {
        case 'dxTextBox':
          return this.InputMaster[col.columN_NAME]
          break;
        case 'dxNumberBox':
          if(this.InputMaster[col.columN_NAME]) return Number(this.InputMaster[col.columN_NAME])
          else return this.InputMaster[col.columN_NAME]
          break;
        case 'dxDateBox':
          if(this.InputMaster[col.columN_NAME])
            return moment(this.InputMaster[col.columN_NAME]).utc(true)
          else return this.InputMaster[col.columN_NAME]
          break;
        case 'dxSelectBox':
          let slbValue = null;
          if (col.typE_ID == 27 || col.typE_ID == 28) 
            slbValue = this.InputMaster[col.columN_NAME].split(';')
          else 
            slbValue = this.InputMaster[col.columN_NAME];

          // if(col.typE_ID == 27 || col.typE_ID == 28){
          //   if(indexTab != -1)
          //     this.groups[indexGroup].data.find(gr => gr.code == col.code).editoroptions.value = slbValue;
          //   else
          //     this.groups[indexGroup].data.find(gr => gr.code == col.code).editoroptions.value = slbValue;
          // }
          if (col.typE_ID == 24) {
            return slbValue
          } else {
            return slbValue
          }
          break;
        case 'dxCheckBox':
          return this.InputMaster[col.columN_NAME]
          break;
        case 'dxSwitch':
          return this.InputMaster[col.columN_NAME]
          break;
        case 'dxRadioGroup':
          return this.InputMaster[col.columN_NAME]
          break;
        case 'dxTextArea':
          return this.InputMaster[col.columN_NAME]
          break;
        case 'dxTagBox':
          let value = [];
          if (this.InputMaster[col.columN_NAME])return this.InputMaster[col.columN_NAME].split(';')
          return value
          break;
          case 'Multirow':

          break;
        case 'dxTextPhoneBox':
          return this.InputMaster[col.columN_NAME]
          break;
          default:
            return null;
      }
      
    }catch{}
  }
  resetDataEditorOptions(): any {
    for(var i = 0 ;i < this.groups.length;i++){
      let group = this.groups[i];
      if(group.isTab == true){
        for(var j = 0 ;j < group.tabs.tabs.length;j++){
          for(var k = 0 ;k < group.tabs.tabs[j].data.length;k++){
            for(var h = 0 ;h < group.tabs.tabs[j].data[k].data.length;h++){
              group.tabs.tabs[j].data[k].data[h].editoroptions.value = this.setDataEditorOptions(group.tabs.tabs[j].data[k].data[h],i)
            }
          }
        }
        // group.tabs.tabs.forEach(tabs=>{
        //   tabs.data.forEach(grouplv2=>{
        //     grouplv2.data.forEach( column=>{
        //       column.editoroptions.value = this.setDataEditorOptions(column,i)
        //     })
        //   })
        // })
      }else{
        group.data.forEach( column=>{
          column.editoroptions.value = this.setDataEditorOptions(column,i)
        })
      }
    }
  }
  async setEditorOptions(data: SYS_GenRowTable_Detail[]): Promise<void> {
    try{
      for (var i = 0; i < data.length; i++) {
        let dt = data[i];
        let disabled = false;
        if(dt.disabled_arised == true && this.InputMaster[dt.columN_NAME] !== null && this.InputMaster[dt.columN_NAME] !== undefined) disabled=true;
        switch (dt.editortype) {
          case 'dxTextBox':
            dt.editoroptions = {
              disabled: disabled==true?true:(this.isDisabled?this.isDisabled:(this.isDisabled?this.isDisabled:(this.isNew?false:!dt.alloW_EDIT))),
              width: '100%',
              value: this.InputMaster[dt.columN_NAME],
              showClearButton: true,
              isDropBoxOpened:false
            }
            break;
          case 'dxNumberBox':
            dt.editoroptions = {
              disabled:  disabled==true?true:(this.isDisabled?this.isDisabled:(this.isNew?false:!dt.alloW_EDIT)),
              width: '100%',
              value: this.InputMaster[dt.columN_NAME],
              showClearButton: true,
              isDropBoxOpened:false
            }
            break;
          case 'dxDateBox':
            dt.editoroptions = {
              disabled:  disabled==true?true:(this.isDisabled?this.isDisabled:(this.isNew?false:!dt.alloW_EDIT)),
              width: '100%',
              value: this.InputMaster[dt.columN_NAME],
              showClearButton: true,
              isDropBoxOpened:false
            }
            break;
          case 'dxSelectBox':
            let items1 = await this.referenceService.reference_V2_Search(new REFERENCE_ENTITY({
              code: dt.code,
              userID: this.appSession.user.id,
              code_master: this.InputMaster.code,
              user: new User({
                id: this.appSession.user.id,
                username: this.appSession.user.username,
                // password:this.appSession.user.password,
                // confirm_password:this.appSession.user,
                token: new Token({
                  value: this.appSession.user.token
                }) as Token,
                avatar: this.appSession.user.avatar,
                firstName: this.appSession.user.firstName,
                lastName: this.appSession.user.lastName,
                roleID: this.appSession.user.roleID,
                roleName: this.appSession.user.roleName,
                languageId: Number(this.appSession.user.language ? this.appSession.user.language : '1'),
                code: this.appSession.user.code,
                branch: this.appSession.user.branch,
                department: this.appSession.user.department,
                title_code: this.appSession.user.title_code,
                position_code: this.appSession.user.position_code,
                level: this.appSession.user.level,
                company_code:this.appSession.user.company_code,
                voucher_year:this.getVoucherDate()
              })
            }) as REFERENCE_ENTITY).toPromise()
            let slbValue = null;
            if (dt.typE_ID == 28) slbValue = this.InputMaster[dt.columN_NAME].split(';')
            else slbValue = this.InputMaster[dt.columN_NAME];
            if (dt.typE_ID == 24) {
              dt.editoroptions = {
                disabled:  disabled==true?true:(this.isDisabled?this.isDisabled:(this.isNew?false:!dt.alloW_EDIT)),
                width: '100%',
                value: slbValue,
                items: new ArrayStore({
                  data: items1[0].outputData,
                  key: dt.valueexpr,
                }),
                dataSource:items1[0].outputData,
                searchEnabled: true,
                showClearButton: true,
                optionWidth:(screen.width * 0.6),
                isDropBoxOpened:false
              }
            } else {
              dt.editoroptions = {
                disabled:  disabled==true?true:(this.isDisabled?this.isDisabled:(this.isNew?false:!dt.alloW_EDIT)),
                width: '100%',
                value: slbValue,
                items: items1[0].outputData,
                searchEnabled: true,
                showClearButton: true,
                optionWidth:(screen.width * 0.6),
                isDropBoxOpened:false
              }
            }
  
            break;
          case 'dxCheckBox':
            dt.editoroptions = {
              disabled:  disabled==true?true:(this.isDisabled?this.isDisabled:(this.isNew?false:!dt.alloW_EDIT)),
              width: '100%',
              value: this.InputMaster[dt.columN_NAME],
              isDropBoxOpened:false,
              showClearButton: true
            }
            break;
          case 'dxSwitch':
            dt.editoroptions = {
              disabled:  disabled==true?true:(this.isDisabled?this.isDisabled:(this.isNew?false:!dt.alloW_EDIT)),
              width: 50,
              value: this.InputMaster[dt.columN_NAME],
              showClearButton: true,
              isDropBoxOpened:false
            }
            break;
          case 'dxRadioGroup':
            dt.editoroptions = {
              disabled:  disabled==true?true:(this.isDisabled?this.isDisabled:(this.isNew?false:!dt.alloW_EDIT)),
              width: '100%',
              value: this.InputMaster[dt.columN_NAME],
              showClearButton: true,
              isDropBoxOpened:false
            }
            break;
          case 'dxTextArea':
            dt.editoroptions = {
              disabled:  disabled==true?true:(this.isDisabled?this.isDisabled:(this.isNew?false:!dt.alloW_EDIT)),
              width: '100%',
              value: this.InputMaster[dt.columN_NAME],
              showClearButton: true,
              height: 90,
              maxLength: 200,
              isDropBoxOpened:false
            }
            break;
          case 'dxTagBox':
            let items = await this.referenceService.reference_V2_Search(new REFERENCE_ENTITY({
              code: dt.code,
              userID: this.appSession.user.id,
              code_master: this.InputMaster.code,
              user: new User({
                id: this.appSession.user.id,
                username: this.appSession.user.username,
                // password:this.appSession.user.password,
                // confirm_password:this.appSession.user,
                token: new Token({
                  value: this.appSession.user.token
                }) as Token,
                avatar: this.appSession.user.avatar,
                firstName: this.appSession.user.firstName,
                lastName: this.appSession.user.lastName,
                roleID: this.appSession.user.roleID,
                roleName: this.appSession.user.roleName,
                languageId: Number(this.appSession.user.language ? this.appSession.user.language : '1'),
                code: this.appSession.user.code,
                branch: this.appSession.user.branch,
                department: this.appSession.user.department,
                title_code: this.appSession.user.title_code,
                position_code: this.appSession.user.position_code,
                level: this.appSession.user.level,
                company_code:this.appSession.user.company_code,
                voucher_year:this.getVoucherDate()
              })
            }) as REFERENCE_ENTITY).toPromise()
            let value = [];
            if (this.InputMaster[dt.columN_NAME])
              value = this.InputMaster[dt.columN_NAME].split(';')
            let itemsNo = [];
            items[0].outputData.forEach((data, index)=>{
              itemsNo.push({...data,no:index+1}) 
            });
            dt.editoroptions = {
              disabled:  disabled==true?true:(this.isDisabled?this.isDisabled:(this.isNew?false:!dt.alloW_EDIT)),
              width: '100%',
              value: value,
              items: itemsNo,
              searchEnabled: true,
              showClearButton: true,
              optionWidth: (screen.width * 0.6),
              isDropBoxOpened:false
              // optionWidth: items[0].outputData.reduce((total, obj) => total + obj.WIDTH, 0)
            }
            break;
          case 'dxTextPhoneBox':
            dt.editoroptions = {
              disabled:  disabled==true?true:(this.isDisabled?this.isDisabled:(this.isNew?false:!dt.alloW_EDIT)),
              width: '100%',
              value: this.InputMaster[dt.columN_NAME],
              mask: '+1 (X00) 000-0000',
              maskRules: { X: /[02-9]/ },
              showClearButton: true,
              isDropBoxOpened:false
            }
            break;
          case 'Multirow':
            let items2 = await this.referenceService.reference_V2_Search(new REFERENCE_ENTITY({
              code: dt.code,
              userID: this.appSession.user.id,
              code_master: this.InputMaster.code?this.InputMaster.code:'ADD-',
              type_id: 16,
              user: new User({
                id: this.appSession.user.id,
                username: this.appSession.user.username,
                // password:this.appSession.user.password,
                // confirm_password:this.appSession.user,
                token: new Token({
                  value: this.appSession.user.token
                }) as Token,
                avatar: this.appSession.user.avatar,
                firstName: this.appSession.user.firstName,
                lastName: this.appSession.user.lastName,
                roleID: this.appSession.user.roleID,
                roleName: this.appSession.user.roleName,
                languageId: Number(this.appSession.user.language ? this.appSession.user.language : '1'),
                code: this.appSession.user.code,
                branch: this.appSession.user.branch,
                department: this.appSession.user.department,
                title_code: this.appSession.user.title_code,
                position_code: this.appSession.user.position_code,
                level: this.appSession.user.level,
                company_code:this.appSession.user.company_code,
                voucher_year:this.getVoucherDate()
              })
            }) as REFERENCE_ENTITY).toPromise();
            let outputData1 = items2[0].outputData;
            outputData1.forEach(obj => {
              Object.entries(obj).forEach(([key, value]) => {
                if (typeof value === 'object') {
                  obj[key] = null;
                }
                else if (value) 
                    if(value.toString().startsWith('ARRAY[') && value.toString().endsWith(']')){
                      obj[key] = obj[key].toString().replace('ARRAY[','');
                      let index = obj[key].lastIndexOf(']');
                      obj[key] = obj[key].slice(0, index).trim().split(';');
                    }
              });
            })
            dt.editoroptions = {
              disabled:  disabled==true?true:(this.isDisabled?this.isDisabled:(this.isNew?false:!dt.alloW_EDIT)),
              width: '100%',
              items: outputData1,
              searchEnabled: true,
              showClearButton: true,
              isDropBoxOpened:false
            }
            break;
          default:
            dt.editoroptions = {
              disabled:  disabled==true?true:(this.isDisabled?this.isDisabled:(this.isNew?false:!dt.alloW_EDIT)),
              width: '100%',
              showClearButton: true,
              isDropBoxOpened:false
            }
            break;
        }
  
      }
    }catch{}
    this.genRowTableDetail = data;
    let arrGROUP = data[0].lisT_GROUP.split(';');
    let arrTabs = data[0].tabs.split(';');
    let groupArrTab=[];
    //var listPanels = arrGROUP.filter(e=>e.toString().split('&')[1]);
    if(arrTabs.length>0 && this.isNullOrEmpty(data[0].tabs)==false){
      arrTabs.forEach(tag => {
        let level = tag.split('&')[0].split('.')[0];
        let objTag={
          id:tag.split('&')[2],
          tabs:[],
          listRows:[]
        }
        let listRows = this.genRowTableDetail.filter(row=>row.taB_LEVEL.startsWith(level+'.')==true);
        let groupTab = this.groupBy(listRows, item => item.taB_LEVEL);
        groupTab.forEach((g, key)=>{
          var dt = [];
          arrGROUP.forEach(g1 => {
            var index = g1.toString().split('&')[0];
            let d = g.filter(e => e.group == Number(index));
            if(d.length>0){
              dt.push({
                name:g1.toString().split('&')[1],
                data:d
              })
            }
          })
          objTag.tabs.push({
            id: (new Date()).getTime(),
            text: g[0].grouP_NAME,
            icon: '',
            data:dt
          })
        })
        objTag.listRows = listRows;
        const filteredArray = this.genRowTableDetail.filter(item =>
          !listRows.some(filterItem => filterItem.id === item.id)
        );
        this.genRowTableDetail = filteredArray;
        groupArrTab.push(objTag);
      });
    }
    
    arrGROUP.forEach(g => {
      var index = g.toString().split('&')[0];
      var data = [];
      var tabs = groupArrTab.find(f=>f.id == g.toString().split('&')[2])
      if(!tabs){
        data = this.genRowTableDetail.filter(e => e.group == Number(index));
      }
      this.groups.push({
        name:g.toString().split('&')[1],
        data:data,
        tabs:tabs,
        isTab:tabs?true:false
      })
    });
    // if(listPanels.length > 0){
    //   var code = ''
    //   for(var i = 0 ; i < arrGROUP.length ;i++){
    //     var p = arrGROUP[i].split('&');
    //     if(p[1]) {
    //       code = 'li-'+i;
    //       this.panels.push({
    //         id: i,
    //         text: p[1],
    //         icon: 'user',
    //         content: p[1]+' tab content',
    //         code:code,
    //         name:p[1],
    //         groups:[Number(p[0])]
    //       });
    //     }else {
    //       this.panels.map(e=>e.code == code && (e.groups.push(Number(p[0]))))
    //     }
    //   }
    //   arrGROUP.forEach(g => {
    //     var index = g.toString().split('&')[0];
    //     var panelCode = this.panels.find(f=>f.groups.includes(Number(index))).code;
    //     this.groups.push({
    //       name:g.toString().split('&')[1],
    //       panelCode:panelCode,
    //       data:this.genRowTableDetail.filter(e => e.group == Number(index))
    //     })
    //   });
    // }else{
    //   arrGROUP.forEach(g => {
    //     var index = g.toString().split('&')[0]
    //     this.groups.push({
    //       name:g.toString().split('&')[1],
    //       data:this.genRowTableDetail.filter(e => e.group == Number(index))
    //     })
    //   });
    // }
    
    this.genRowTableDetail.filter(e=>e.required == true).forEach(e=>{
      this.arrayColumnRequired.push({
        col:e.columN_NAME,
        invalid:false,
        name:e.name,
        message:''
      })
    })
    this.isRender = true;
  }
  onSubmitClick() {
    // Handle form submission logic
  }
  mapRequired(col:string,v:any){
    this.arrayColumnRequired.map((e)=>e.col==col&&((v!==undefined && v!==null)?e.invalid=true:e.invalid=false))
  }
  checkAndShowRequired():boolean{
    for (const [key, value] of Object.entries(this.InputMaster)){
      this.mapRequired(key,value)
    }
    return this.arrayColumnRequired.filter(e=>e.invalid == false).length == 0?true:false;
  } 
  changeNumberBox(event: any,col:any,indexGroup: number, indexTab: number, indexTabCol: number) {
    // Handle the value change event
    this.mapRequired(col.columN_NAME,event.value);
    this.execDefaultValue();
    this.resetDataEditorOptions();
    this.HandleValueChangedOutput.emit({ dataField: col.columN_NAME, value: event.value });
    try {$('#div-grid-edit').click()} catch (error) {}
    this.UpdateView();
  }
  handleValueChanged2(event: any,col:any) {
    // Handle the value change event
    this.HandleValueChangedOutput.emit({ dataField: col.columN_NAME, value: event.value });

    this.mapRequired(col.columN_NAME,event.value);
    this.execDefaultValue();
    this.resetDataEditorOptions();
    try {$('#div-grid-edit').click()} catch (error) {}
    this.UpdateView();
  }
  handleValueChangedDate(event: any,col:any) {
    try{
      this.HandleValueChangedOutput.emit({ dataField: col.columN_NAME, value: event });
      this.mapRequired(col.columN_NAME,event);
      this.execDefaultValue();
      this.resetDataEditorOptions();
     
      try {$('#div-grid-edit').click()} catch (error) {}
      this.UpdateView();
    }catch{}
  }
  handleValueChangedTextArea(event: any,col:any) {
    this.HandleValueChangedOutput.emit({ dataField: col.columN_NAME, value: event.value });
    this.mapRequired(col.columN_NAME,event.value);
    this.execDefaultValue();
    this.resetDataEditorOptions();
    try {$('#div-grid-edit').click()} catch (error) {}
    this.UpdateView();
  }
  handleValueChanged(event: any) {
    // Handle the value change event
    this.HandleValueChangedOutput.emit({ dataField: event.dataField, value: event.value });

    this.mapRequired(event.dataField,event.value);
    this.execDefaultValue();
    this.resetDataEditorOptions();
    try {$('#div-grid-edit').click()} catch (error) {}
    this.UpdateView();
  }
  selectedRowsGridData(obj: any,cell:any){
    this.selectedRowsGridDataOutput.emit({e:obj,cell:cell})
  }
  DataGridHandleCopydOutput(obj: any,cell:any) {
    let rowExample =  this.InputMaster[cell.columN_NAME][0];
    let newObj = {};
    for (const [key, value] of Object.entries(rowExample)){
      for (const [key2, value2] of Object.entries(obj)){
        let v ;
        if(Array.isArray(value2)) v = value2.join(';')
        else v = value2
        if(key.toUpperCase()==key2.toUpperCase()){
          if(key2.toUpperCase() == 'ID')
          newObj[key] = -1;
          else newObj[key] = v;
          break;
        }
      }
    }
    this.InputMaster[cell.columN_NAME].push(newObj);
    this.mapRequired(cell.columN_NAME,this.InputMaster[cell.columN_NAME]);
    this.execDefaultValue();
    this.HandleValueChangedOutput.emit({ dataField: cell.columN_NAME, value: this.InputMaster[cell.columN_NAME] });
    try {$('#div-grid-edit').click()} catch (error) {}
    this.UpdateView();
  }
  DataGridHandleAdddOutput(obj: any,cell:any) {
    if(!this.InputMaster[cell.columN_NAME]) this.InputMaster[cell.columN_NAME] = [];
    this.InputMaster[cell.columN_NAME].push(obj);
    this.HandleValueChangedOutput.emit({ dataField: cell.columN_NAME, value: this.InputMaster[cell.columN_NAME] });

    this.mapRequired(cell.columN_NAME,this.InputMaster[cell.columN_NAME]);
    this.execDefaultValue();
    this.resetDataEditorOptions();
    try {$('#div-grid-edit').click()} catch (error) {}
    this.UpdateView();
  }
  DataGridHandleDeletedOutput(event: any,cell:any) {
    let arrT = this.InputMaster[cell.columN_NAME];
    this.InputMaster[cell.columN_NAME].forEach(obj=>{
      for (const [key, value] of Object.entries(obj)) {
        if(key.toUpperCase() == event.key.toUpperCase()){
          arrT = this.InputMaster[cell.columN_NAME].filter(e=>e[key] != event.item);
          break;
        }
      }
    }) 
    this.InputMaster[cell.columN_NAME] = arrT;
    this.HandleValueChangedOutput.emit({ dataField: cell.columN_NAME, value: this.InputMaster[cell.columN_NAME] });

    this.mapRequired(cell.columN_NAME,this.InputMaster[cell.columN_NAME]);
    this.execDefaultValue();
    this.resetDataEditorOptions();
    try {$('#div-grid-edit').click()} catch (error) {}
    this.UpdateView();
  }
  deleteWordStartingWithE(inputString: string, wordToDelete: string): string {
    // Create a regular expression pattern to match "wordToDelete" at the start of the string
    const pattern = new RegExp(`^${wordToDelete}`, 'i');
  
    // Use the replace() method with the regular expression to delete the word
    const resultString = inputString.replace(pattern, '');
  
    return resultString;
  }
  
  isDisplay(s:string):boolean{
    if(!s) return true;
    return this.mapDataCondittons(s);
  }
  mapDataCondittons(caculate:string):any{
    try{
      if (this.InputMaster)
      {
        for (const [key, value] of Object.entries(this.InputMaster)) {
          caculate = caculate.replace(`[${key}]`, `${value}`);
        };  
        if(caculate.startsWith('='))
          caculate = this.deleteWordStartingWithE(caculate,'=');
        let result = eval(caculate);
        return result;
      }
      return true;
    }catch{
      return true;
    }
  }
  mapReferenceInputMaster(s:string):string{
    if (this.InputMaster)
     {
      for (const [key, value] of Object.entries(this.InputMaster)) {
         s = this.replaceAsync(`[${key}]`,value,s);
      };
     }
    return s;
  }
  async onOpenedDropDownOption(event: any, indexGroup: number, column: SYS_GenRowTable_Detail){
    try{
      let reference = this.groups[indexGroup].data.find(gr => gr.code == column.code).reference;
      if(reference.includes('[') && reference.includes(']') && !reference.includes('dbo')){
        reference = this.mapReferenceInputMaster(reference);
        let itemReload = await this.referenceService.reference_V3_Search(new REFERENCE_V3_Param({
          reference: reference,
          master_data: this.checkAndConvertToObject(this.InputMaster)
        }) as REFERENCE_V3_Param).toPromise()
        this.groups[indexGroup].data.find(gr => gr.code == column.code).editoroptions.items=itemReload ? itemReload[0].outputData : [];
       }
    }catch(e){
      console.log(e)
    }
    this.groups[indexGroup].data.find(gr => gr.code == column.code).editoroptions.isDropBoxOpened = true;
  }
  onOpenedDropDownOptionTab(event: any, indexGroup: number, column: SYS_GenRowTable_Detail, indexTab: number, indexTabCol: number){
    this.groups[indexGroup].tabs.tabs[indexTab].data[indexTabCol].data.find(gr => gr.code == column.code).editoroptions.isDropBoxOpened = true;
  }
  onSaveDropDownOption(event: any, indexGroup: number, column: SYS_GenRowTable_Detail){
    this.groups[indexGroup].data.find(gr => gr.code == column.code).editoroptions.isDropBoxOpened = false;
    this.dropdowns.forEach((dropdown) => {
      dropdown.instance.close();
    });
  }
  onSaveDropDownOptionTab(event: any, indexGroup: number, column: SYS_GenRowTable_Detail, indexTab: number, indexTabCol: number){
    this.groups[indexGroup].tabs.tabs[indexTab].data[indexTabCol].data.find(gr => gr.code == column.code).editoroptions.isDropBoxOpened = false;
    this.dropdowns.forEach((dropdown) => {
      dropdown.instance.close();
    });
  }
  onSelectedRowsDataOutput(event: any, indexGroup: number, column: SYS_GenRowTable_Detail){
    this.execDefaultValue();
    this.selectedRowsDataOutput.emit({ indexGroup: indexGroup, value: event.value,column:column });
    try {$('#div-grid-edit').click()} catch (error) {}
    this.UpdateView();
  }
  FindAndMapDataObject(obj:any,col:any,v:any):any{
    for (const property in obj) {
      if(property.toUpperCase() == col.toUpperCase()) {
        obj[property]=v;
      }
    }
    return obj;

  }
  async DataGridValueChangedOutput(event: any,cell:any) {
    if(!this.InputMaster[cell.columN_NAME]){
      this.InputMaster[cell.columN_NAME] = []
    }
    switch(event.row.typE_ID){
      case 12:
      case 28:
      var obj = this.InputMaster[cell.columN_NAME][event.rowIndex];
      if(!obj) obj = {};
      if(!obj[event.dataField]) obj[event.dataField] = event.value.join(';');
      Object.keys(obj).forEach(function(key) {
        if(key.toUpperCase() == event.dataField.toUpperCase())
        obj[key] = event.value.join(';');
      });
      this.InputMaster[cell.columN_NAME][event.rowIndex] = obj;
      break;
      default:
        var obj = this.InputMaster[cell.columN_NAME][event.rowIndex];
        if(!obj) obj = {};
        if(!obj[event.dataField]) {
          var v = event.value;
          if(event.row.typE_ID == 27) 
            if(Array.isArray(event.value))v = event.value[0];
            else v = event.value;
            if(event.row.typE_ID == 4 || event.row.typE_ID == 20 || event.row.typE_ID == 23)  {
              obj = await this.FindAndMapDataObject(obj,event.dataField,v)
              //  obj[event.dataField] = v;
            }
            else {
              if(event.dataField.toUpperCase().endsWith('ID'))
              {
                obj = await this.FindAndMapDataObject(obj,event.dataField,Number(v))
                // obj[event.dataField] = Number(v);
              }
              else {
                obj = await this.FindAndMapDataObject(obj,event.dataField,v)
                // obj[event.dataField] = v;
              }
            }
        }
        Object.keys(obj).forEach(function(key) {
          if(key.toUpperCase() == event.dataField.toUpperCase()){
            var v = event.value;
            if(event.row.typE_ID == 27) 
            {
              if(Array.isArray(event.value))v = event.value[0];
              else v = event.value;
            }
            if(event.row.typE_ID == 4 || event.row.typE_ID == 20 || event.row.typE_ID == 23)  
              obj[key] = v;
            else{
              if(key.toUpperCase().endsWith('ID'))obj[key] = Number(v);
              else obj[key] = v;
            }
          }
        });
        this.InputMaster[cell.columN_NAME][event.rowIndex] = obj;
        break;
    }
    this.mapRequired(cell.columN_NAME,this.InputMaster[cell.columN_NAME]);
    this.execDefaultValue();
    this.HandleValueChangedOutput.emit({ dataField: cell.columN_NAME, value: this.InputMaster[cell.columN_NAME] });
    try {$('#div-grid-edit').click()} catch (error) {}
    this.UpdateView();
  }
  async onGetReference(code: string): Promise<void> {
    let data = await this.referenceService.reference_V2_Search(new REFERENCE_ENTITY({
      code: code,
      userID: this.appSession.user.id,
      code_master: this.InputMaster.code,
      user: new User({
        id: this.appSession.user.id,
        username: this.appSession.user.username,
        // password:this.appSession.user.password,
        // confirm_password:this.appSession.user,
        token: new Token({
          value: this.appSession.user.token
        }) as Token,
        avatar: this.appSession.user.avatar,
        firstName: this.appSession.user.firstName,
        lastName: this.appSession.user.lastName,
        roleID: this.appSession.user.roleID,
        roleName: this.appSession.user.roleName,
        languageId: Number(this.appSession.user.language ? this.appSession.user.language : '1'),
        code: this.appSession.user.code,
        branch: this.appSession.user.branch,
        department: this.appSession.user.department,
        title_code: this.appSession.user.title_code,
        position_code: this.appSession.user.position_code,
        level: this.appSession.user.level,
        company_code:this.appSession.user.company_code,
        voucher_year:this.getVoucherDate()
      })
    }) as REFERENCE_ENTITY).toPromise()
  }
  selectTab(e) {
    this.tabIndex = e.itemIndex
  }
  getDisplayCondittions(conditionString:string):string{
    if(this.isNullOrEmpty(conditionString)) return 'block';
    try{
      var obj = this.InputMaster;
      Object.keys(obj).forEach(function(key) {
        conditionString = conditionString.replace('{'+key+'}',obj[key]);
      });
      const result = eval(conditionString);
      return result==false?'none':'block'
    }catch{
      return 'none';
    }
  }
  execDefaultValue(){
    try{
      this.genRowTableDetail.filter(row=>!this.isNullOrEmpty(row.defaulT_VALUE)).forEach(item=>{
        var obj = this.InputMaster;
        let conditionString = item.defaulT_VALUE;
        let val;
        Object.keys(obj).forEach(function(key) {
          if(conditionString.includes('{'+key+'}'))
          {
            if(conditionString.startsWith('='))
              conditionString = conditionString.replace('{'+key+'}',obj[key]);
            else  val = this.InputMaster[item.columN_NAME];
          }
        });
        if(conditionString.startsWith('='))
          this.InputMaster[item.columN_NAME] = eval(conditionString.replace('=',''));
        else  this.InputMaster[item.columN_NAME] = val;
        //this.HandleRowsDataGridOutput.emit({ dataField: item.columN_NAME, value: this.InputMaster[item.columN_NAME] });
        try {$('#div-grid-edit').click()} catch (error) {}
        this.UpdateView()
      })
    }catch{
    }
  }
}
