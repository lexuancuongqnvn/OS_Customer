import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { EditorModule } from '@progress/kendo-angular-editor';
import { ExcelModule, GridModule, PDFModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { IntlModule } from '@progress/kendo-angular-intl';
import { LabelModule } from '@progress/kendo-angular-label';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { SchedulerModule } from '@progress/kendo-angular-scheduler';
import { FileSelectModule } from '@progress/kendo-angular-upload';
import { AppRoutingModule } from '../app-routing.module';
import { AppComponent } from '../app.component';
import { CookieModule, CookieService } from 'ngx-cookie';
import { NavigationModule } from '@progress/kendo-angular-navigation';
import { DialogModule, WindowModule } from '@progress/kendo-angular-dialog';
import { GenrowTableComponent } from './genrow-table/genrow-table.component';
import { AcctionComponent } from './acction/acction.component';
import { FilePickerComponent } from '../shared/layout/input-control/file-picker/file-picker.component';
import { DialogAcctionComponent } from '../shared/layout/dialogs/acction/dialog-acction.component';
import { InputAddComponent } from '../shared/layout/input-control/input-add/input-add.component';
import { MycurrencyPipe } from '../shared/layout/layoutBase';
import { AcctionService, API_BASE_URL, GenRowTableService, SYSCommonService, ToolService } from '../shared/service-proxies/api-shared';
import { ToolbarComponent } from '../shared/layout/toolbar/toolbar.component';
import { AppModule } from '../app.module';
import { ShareModule } from '../shared/shared.module';
import { GenrowTableDetailComponent } from './genrow-table/genrow-table-detail/genrow-table-detail.component';
import { DashboardHomeComponent } from '../plugin/dashboard/dashboard-home/dashboard-home.component';
import { MyProfileComponent } from './user/my-profile/my-profile.component';
import { SettingLoginComponent } from './settings/setting-login/setting-login.component';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { MenuListComponent } from './menu/menu-list/menu-list.component';
import { MenuAddEditComponent } from './menu/menu-add-edit/menu-add-edit.component';
import { EncryptDecryptStringComponent } from './encrypt-decrypt-string/encrypt-decrypt-string.component';
import { UserGroupComponent } from './user/user-group/user-group.component';
import { UsersComponent } from './user/users/users.component';
import { ForgotPasswordComponent } from '../shared/form/forgot-password/forgot-password.component';
import { AppConsts } from '../app-consts.component';
import { SysListAppComponent } from './sys-list-app/sys-list-app.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { GenrowTableV2Component } from './genrow-table-v2/genrow-table-v2/genrow-table-v2.component';
import { GenrowTableV2EditComponent } from './genrow-table-v2/genrow-table-v2/genrow-table-v2-edit/genrow-table-v2-edit.component';
import { InsertTableOptionComponent } from './insert-table-option/insert-table-option.component';
import { InsertTableOptionEditComponent } from './insert-table-option/insert-table-option-edit/insert-table-option-edit.component';
import { EditPageState } from '../shared/ultilities/enum/edit-page-state';
import { LanguageTranslateEditComponent } from './language-translate/language-translate-edit/language-translate-edit.component';
import { LanguageTranslateListComponent } from './language-translate/language-translate-list/language-translate-list.component';
import { AlterTableVoucherListComponent } from './alter-table-voucher/alter-table-voucher-list/alter-table-voucher-list.component';
import { AlterTableVoucherEditComponent } from './alter-table-voucher/alter-table-voucher-edit/alter-table-voucher-edit.component';
import { ColumnInfoListComponent } from './column-info/column-info-list/column-info-list.component';
import { ColumnInfoEditComponent } from './column-info/column-info-edit/column-info-edit.component';
import { ReportTemplateListComponent } from './report-template/report-template-list/report-template-list.component';
import { ReportTemplateEditComponent } from './report-template/report-template-edit/report-template-edit.component';
import { ReportTemplateVersionListComponent } from './report-template-version/report-template-version-list/report-template-version-list.component';
import { ReportTemplateVersionEditComponent } from './report-template-version/report-template-version-edit/report-template-version-edit.component';
import { ReportTemplateSignatureListComponent } from './report-template-signature/report-template-signature-list/report-template-signature-list.component';
import { ReportTemplateSignatureEditComponent } from './report-template-signature/report-template-signature-edit/report-template-signature-edit.component';

const drawerRoutes = [
    { path: 'dashboard', component: DashboardHomeComponent },
    { path: 'acction', component: AcctionComponent },
    { path: 'genrow-table', component: GenrowTableComponent },

    { path: 'genrow-table-v2-edit', component: GenrowTableV2EditComponent, data: {editPageState: EditPageState.edit,tbName:'SYS_GenRowTable' } },
    { path: 'genrow-table-v2', component: GenrowTableV2Component , data: {editPageState: EditPageState.view,tbName:'SYS_GenRowTable' }},

    { path: 'genrow-table-detail', component: GenrowTableDetailComponent , data: {editPageState: EditPageState.add,tbName:'SYS_GenRowTable' }},

    { path: 'menu-list', component: MenuListComponent },
    
    { path: 'encrypt-decrypt-string', component: EncryptDecryptStringComponent },

    { path: 'user-group', component: UserGroupComponent },
    { path: 'users', component: UsersComponent },
    
    { path: 'sys-list-app', component: SysListAppComponent },
    
    { path: 'system/insert-table-option', component: InsertTableOptionComponent, data: {editPageState: EditPageState.add,tbName:'SYS_GenRowTable_Opption' } },
    { path: 'system/insert-table-option-edit', component: InsertTableOptionEditComponent, data: {editPageState: EditPageState.edit,tbName:'SYS_GenRowTable_Opption' }},
    { path: 'system/insert-table-option-add', component: InsertTableOptionEditComponent, data: {editPageState: EditPageState.add,tbName:'SYS_GenRowTable_Opption' }},

    { path: 'system/language-translate', component: LanguageTranslateListComponent, data: {editPageState: EditPageState.view ,tbName:'SYS_Language_Translate'} },
    { path: 'system/language-translate-add', component: LanguageTranslateEditComponent, data: {editPageState: EditPageState.add ,tbName:'SYS_Language_Translate'} },
    { path: 'system/language-translate-edit', component: LanguageTranslateEditComponent, data: {editPageState: EditPageState.edit ,tbName:'SYS_Language_Translate' } },
    { path: 'system/language-translate-view-detail', component: LanguageTranslateEditComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'SYS_Language_Translate'} },

    { path: 'system/insert-table-option-add', component: InsertTableOptionEditComponent, data: {editPageState: EditPageState.add,tbName:'SYS_GenRowTable_Opption' }},    
    
    { path: 'system/alter-table-voucher', component: AlterTableVoucherListComponent, data: {editPageState: EditPageState.add,tbName:'SYS_Alter_Table_Voucher' } },
    { path: 'system/alter-table-voucher-edit', component: AlterTableVoucherEditComponent, data: {editPageState: EditPageState.edit,tbName:'SYS_Alter_Table_Voucher' }},
    { path: 'system/alter-table-voucher-add', component: AlterTableVoucherEditComponent, data: {editPageState: EditPageState.add,tbName:'SYS_Alter_Table_Voucher' }},
    { path: 'system/alter-table-voucher-view-detail', component: AlterTableVoucherEditComponent, data: {editPageState: EditPageState.viewDetail,tbName:'SYS_Alter_Table_Voucher' }},

    { path: 'system/column-info', component: ColumnInfoListComponent, data: {editPageState: EditPageState.view ,tbName:'SYS_Column_Info'} },
    { path: 'system/column-info-add', component: ColumnInfoEditComponent, data: {editPageState: EditPageState.add ,tbName:'SYS_Column_Info'} },
    { path: 'system/column-info-edit', component: ColumnInfoEditComponent, data: {editPageState: EditPageState.edit ,tbName:'SYS_Column_Info' } },
    { path: 'system/column-info-view-detail', component: ColumnInfoEditComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'SYS_Column_Info'} },
    
    { path: 'system/sys-report-infomation', component: ReportTemplateListComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'SYS_Report_Infomation'} },
    { path: 'system/sys-report-infomation-add', component: ReportTemplateEditComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'SYS_Report_Infomation'} },
    { path: 'system/sys-report-infomation-edit', component: ReportTemplateEditComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'SYS_Report_Infomation'} },
    { path: 'system/sys-report-infomation-view-detail', component: ReportTemplateEditComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'SYS_Report_Infomation'} },

];

@NgModule({
    declarations: [
        AcctionComponent,
        GenrowTableComponent,
        GenrowTableDetailComponent,
        MyProfileComponent,
        SettingLoginComponent,
        MenuListComponent,
        MenuAddEditComponent,
        EncryptDecryptStringComponent,
        UserGroupComponent,
        UsersComponent,
        SysListAppComponent,
        GenrowTableV2Component,
        GenrowTableV2EditComponent,
        InsertTableOptionComponent,
        InsertTableOptionEditComponent,
        LanguageTranslateEditComponent,
        LanguageTranslateListComponent,
        AlterTableVoucherListComponent,
        AlterTableVoucherEditComponent,
        ColumnInfoListComponent,
        ColumnInfoEditComponent,
        ReportTemplateListComponent,
        ReportTemplateEditComponent,
        ReportTemplateVersionListComponent,
        ReportTemplateVersionEditComponent,
        ReportTemplateSignatureListComponent,
        ReportTemplateSignatureEditComponent,
        
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        GridModule,
        PDFModule,
        ExcelModule,
        LayoutModule,
        SchedulerModule,
        ButtonsModule,
        EditorModule,
        FileSelectModule,
        HttpClientModule,
        ChartsModule,
        IntlModule,
        DateInputsModule,
        InputsModule,
        DropDownsModule,
        RouterModule.forRoot(drawerRoutes),
        NotificationModule,
        CookieModule.forRoot(),
        NavigationModule,
        LabelModule,
        WindowModule,
        DialogModule,
        ShareModule,
        AngularEditorModule
    ],
    exports: [
    ],
    providers: [
        {
             provide: LOCALE_ID, useValue: 'en-US'//,useClass:HashLocationStrategy 
            //provide: LocationStrategy, useClass: HashLocationStrategy
        },
        {
            provide: API_BASE_URL, 
            useValue: AppConsts.baseUrl
        },
        AppComponent,
        AcctionService,
        ToolbarComponent,
        FilePickerComponent,
        InputAddComponent,
        MycurrencyPipe,
        ToolService,
        SYSCommonService,
        GenRowTableService
    ],
    bootstrap: [AppComponent]
})
export class SystemModule { }
