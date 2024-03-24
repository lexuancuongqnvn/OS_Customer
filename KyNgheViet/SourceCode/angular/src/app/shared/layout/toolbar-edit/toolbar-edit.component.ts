import { Component, Injector, Input, OnInit } from '@angular/core';
import { AppSession } from '../../app-session/app-session';
import { User } from '../../models/system/account';
import { AcctionService } from '../../service-proxies/api-shared';
import { EditPageState } from '../../ultilities/enum/edit-page-state';
import { IUiAction } from '../../ultilities/ui-action';
import { LayoutComponentBase } from '../layoutBase';

@Component({
  selector: 'app-toolbar-edit',
  templateUrl: './toolbar-edit.component.html',
  styleUrls: ['./toolbar-edit.component.css']
})
export class ToolbarEditComponent extends LayoutComponentBase implements OnInit {
  @Input() tableName: string;
  @Input() CurrenFrom: string;
  @Input() classInsert: string='';
  enable: boolean;

  buttonAddEnable: boolean;
  buttonUpdateEnable: boolean;
  buttonSaveEnable: boolean;
  buttonViewDetailEnable: boolean;
  buttonDeleteEnable: boolean;
  buttonApproveEnable: boolean;
  buttonSearchEnable: boolean;
  buttonResetSearchEnable: boolean;

  buttonAddVisible: boolean;
  buttonUpdateVisible: boolean;
  buttonSaveVisible: boolean;
  buttonViewDetailVisible: boolean;
  buttonDeleteVisible: boolean;
  buttonApproveVisible: boolean;
  buttonSearchVisible: boolean;
  buttonResetSearchVisible: boolean;

  buttonAddHidden: boolean;
  buttonUpdateHidden: boolean;
  buttonSaveHidden: boolean;
  buttonViewDetailHidden: boolean;
  buttonDeleteHidden: boolean;
  buttonApproveHidden: boolean;
  buttonSearchHidden: boolean;
  buttonResetSearchHidden: boolean;

  selectedItem: any;

  uiAction: IUiAction<any>;

  isList: boolean = false;
  isEdit: boolean = false;

  isAssUpdateReport = false;

  funct: string;

  editLabel: string;


  constructor(
    injector: Injector,
    private appSession: AppSession,
    private acctionService: AcctionService
  ) {
    super(injector);
    this.setButtonAddVisible(false);
    this.setButtonUpdateVisible(false);
    this.setButtonSaveVisible(false);
    this.setButtonDeleteVisible(false);
    this.setButtonApproveVisible(false);
    this.setButtonViewDetailVisible(true);
    this.setButtonSearchVisible(true);
    this.setButtonResetSearchVisible(false);
    this.setButtonSaveVisible(true);
    this.enable = true;

    // this.editLabel = this.l("Edit");
  }

  ngOnInit(): void {
    var user = new User();
    user = this.appSession.user;
    this.acctionService.acction_Search_byTableName(user.id, this.tableName).subscribe(
      (data: any[]) => {
        this.completeCallback(data);
      },
      (err) => this.UnBlockUI(),
      () => {
        this.UnBlockUI();
      }
    );
  }
  completeCallback(data: any[]) {
    this.setAcctionForm(data);
    var t = this.getRoleCurren_byFormName(this.CurrenFrom);
    this.setRoleCurrent(t.id);
    switch (this.CurrenFrom) {
      case EditPageState.add:
        var t = data.find(e => e['classForm'] == EditPageState.add);
        this.acctionName = t['name']
        this.requestEdit['storedName'] = t['storedName'];
        this.requestEdit['param'] = t['param'];
        this.requestEdit['keyService'] = t['keyService'];
        this.setRoleCurrent(t['id']);
        this.refreshAcction();
        this.setRequestEdit({ 'onInit': t['onInit'] });
        break;
      case EditPageState.edit:
        var t = data.find(e => e['classForm'] == EditPageState.edit);
        this.acctionName = t['name']
        this.requestEdit['storedName'] = t['storedName'];
        this.requestEdit['param'] = t['param'];
        this.requestEdit['keyService'] = t['keyService'];
        this.setRoleCurrent(t['id']);
        this.refreshAcction();
        this.setRequestEdit({ 'onInit': t['onInit'] });
        break;
      case EditPageState.viewDetail:
        var t = data.find(e => e['classForm'] == EditPageState.viewDetail);
        this.acctionName = t['name']
        this.requestEdit['storedName'] = t['storedName'];
        this.requestEdit['param'] = t['param'];
        this.requestEdit['keyService'] = t['keyService'];
        this.setRoleCurrent(t['id']);
        this.refreshAcction();
        this.setRequestEdit({ 'onInit': t['onInit'] });
        break;
    }
    this.UpdateView();
  }
  onButtonClick(): void {
    console.log("click");
  }
  public setUiAction(uiAction: IUiAction<any>): void {
    this.uiAction = uiAction;
  }

  public setEnable(enable: boolean) {
    this.enable = enable;
  }
  setButtonAddEnable(enable: boolean): void {
    if (!this.buttonAddVisible) {
      enable = false;
    }
    this.buttonAddEnable = enable;
  }

  setButtonUpdateEnable(enable: boolean): void {
    if (!this.buttonUpdateVisible) {
      enable = false;
    }
    this.buttonUpdateEnable = enable;
  }

  setButtonSaveEnable(enable: boolean): void {
    if (!this.buttonSaveVisible) {
      enable = false;
    }
    this.buttonSaveEnable = enable;
  }

  setButtonViewDetailEnable(enable: boolean): void {
    if (!this.buttonViewDetailVisible) {
      enable = false;
    }
    this.buttonViewDetailEnable = enable;
  }

  setButtonDeleteEnable(enable: boolean): void {
    if (!this.buttonDeleteVisible) {
      enable = false;
    }
    this.buttonDeleteEnable = enable;
  }

  setButtonApproveEnable(enable: boolean): void {
    if (!this.buttonApproveVisible) {
      enable = false;
    }
    this.buttonApproveEnable = enable;
  }

  setButtonSearchEnable(enable: boolean): void {
    if (!this.buttonSearchVisible) {
      enable = false;
    }
    this.buttonSearchEnable = enable;
  }

  setButtonResetSearchEnable(enable: boolean): void {
    if (!this.buttonResetSearchVisible) {
      enable = false;
    }
    this.buttonResetSearchEnable = enable;
  }

  setButtonAddVisible(visible: boolean): void {
    this.buttonAddVisible = visible;
  }

  setButtonUpdateVisible(visible: boolean): void {
    this.buttonUpdateVisible = visible;
  }

  setButtonSaveVisible(visible: boolean): void {
    this.buttonSaveVisible = visible;
  }

  setButtonViewDetailVisible(visible: boolean): void {
    this.buttonViewDetailVisible = visible;
  }

  setButtonDeleteVisible(visible: boolean): void {
    this.buttonDeleteVisible = visible;
  }

  setButtonApproveVisible(visible: boolean): void {
    this.buttonApproveVisible = visible;
  }

  setButtonSearchVisible(visible: boolean): void {
    this.buttonSearchVisible = visible;
  }

  setButtonResetSearchVisible(visible: boolean): void {
    this.buttonResetSearchVisible = visible;
  }
  add(): void {
    if (this.uiAction) {
      this.uiAction.onAdd();
    }
  }

  update(): void {
    if (this.selectedItem && this.uiAction) {
      this.uiAction.onUpdate(this.selectedItem);
    }
  }

  save(): void {
    if (this.uiAction) {
      this.uiAction.onSave();
    }
  }

  viewDetail(): void {
    if (this.selectedItem && this.uiAction) {
      this.uiAction.onViewDetail(this.selectedItem);
    }
  }

  delete(): void {
    if (this.selectedItem && this.uiAction) {
      this.uiAction.onDelete(this.selectedItem);
    }
  }

  approve(): void {
    if (this.uiAction) {
      this.uiAction.onApprove(this.selectedItem);
    }
  }

  search(): void {
    if (this.uiAction) {
      // $('#alert-message').remove();
      this.uiAction.onSearch();
    }
  }

  resetSearch(): void {
    if (this.uiAction) {
      this.uiAction.onResetSearch();
    }
  }
  ClickAcction(id, storedName: string, param: string, keyService: string, classForm: string): void {
    if (this.uiAction) {
      this.setCurrenFrom(classForm);
      this.uiAction.onClickAcction(id, storedName, param, keyService, classForm);
    }
  }
}
