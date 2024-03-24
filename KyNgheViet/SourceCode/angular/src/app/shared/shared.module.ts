import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
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
import { FormViewComponent } from './form/form-view/form-view.component';
import { GridViewComponent } from './grid/grid-view/grid-view.component';
import { RatingComponent } from './grid/grid-view/rating.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { FormEditComponent } from './form/form-edit/form-edit.component';
import { GridEditService } from './grid/grid-edit/grid-edit.service';
import { GridEditComponent } from './grid/grid-edit/grid-edit.component';
import { LoginComponent } from './form/login/login.component';
import { CookieModule, CookieService } from 'ngx-cookie';
import { SystemServiceProxy } from './service-proxies/service-proxies';
import { AccountService, AcctionService, ApiBase, API_BASE_URL, AuthenticateService, EmployeeService, FileManagerService, GenRowTableService, MenuService, ReferenceService, ReportViewerService, Tb_TestTheme_ENTITY, TestThemeService, UploadFilesService, WMSCategoryService, SalesCategoryService, SalesVATService, ConsolidationCategoryService } from './service-proxies/api-shared';
import { AppDrawerComponent } from './layout/drawer/drawer.component';
import { DrawerService } from './shared.service';
import { BreadcrumbComponent } from './layout/breadcrumb/breadcrumb.component';
import { NavigationModule } from '@progress/kendo-angular-navigation';
import { InputViewComponent } from './layout/input-control/input-view/input-view.component';
import { InputEditComponent } from './layout/input-control/input-edit/input-edit.component';
import { CommonService } from './ultilities/commonService';
import { NotificationComponent } from './layout/notification/notification.component';
import { CommonModels } from './ultilities/common-model';
import { FilePickerComponent } from './layout/input-control/file-picker/file-picker.component';
import { DialogModule, WindowModule } from '@progress/kendo-angular-dialog';
import { EditPageState } from './ultilities/enum/edit-page-state';
import { InterfaceModels } from './ultilities/interface-base';
import { InputFilterComponent } from './layout/input-control/input-filter/input-filter.component';
import { FormAddComponent } from './form/form-add/form-add.component';
import { InputAddComponent } from './layout/input-control/input-add/input-add.component';
import { GridAddComponent } from './grid/grid-add/grid-add.component';
import { GridAddService } from './grid/grid-add/grid-add.service';
import { MycurrencyPipe } from './layout/layoutBase';
import { FormViewDetailComponent } from './form/form-view-detail/form-view-detail.component';
import { GridViewDetailComponent } from './grid/grid-view-detail/grid-view-detail.component';
import { GridViewDetailService } from './grid/grid-view-detail/grid-view-detail.service';
import { FilePickerInterface } from './layout/input-control/file-picker/file-picker-interface.service';
import { DialogAcctionComponent } from './layout/dialogs/acction/dialog-acction.component';
import { DialogAcctionV2Component } from './layout/dialogs/acction/dialog-acction.component-v2';
import { ForgotPasswordComponent } from './form/forgot-password/forgot-password.component';
import { VerifyPasswordComponent } from './form/verify-password/verify-password.component';
import { InputTextComponent } from './layout/input-control-simple/input-text/input-text.component';
import { InputNumberComponent } from './layout/input-control-simple/input-number/input-number.component';
import { InputTextareaComponent } from './layout/input-control-simple/input-textarea/input-textarea.component';
import { InputDatepickerComponent } from './layout/input-control-simple/input-datepicker/input-datepicker.component';
import { InputSelectComponent } from './layout/input-control-simple/input-select/input-select.component';
import { InputSelect2Component } from './layout/input-control-simple/input-select2/input-select2.component';
import { InputFilepickerComponent } from './layout/input-control-simple/input-filepicker/input-filepicker.component';
import { InputMoneyComponent } from './layout/input-control-simple/input-money/input-money.component';
import { InputFileUploadComponent } from './layout/input-control-simple/input-file-upload/input-file-upload.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { JqgridListComponent } from './jqgrid/jqgrid-list/jqgrid-list.component';
import { SidenavAddEditComponent } from './sidenav/sidenav-add-edit/sidenav-add-edit.component';
import { SidenavViewComponent } from './sidenav/sidenav-view/sidenav-view.component';
import { ToolbarEditComponent } from './layout/toolbar-edit/toolbar-edit.component';
import { JqgridEditComponent } from './jqgrid/jqgrid-edit/jqgrid-edit.component';
import { InputDatetimepickerComponent } from './layout/input-control-simple/input-datetimepicker/input-datetimepicker.component';
import { InputTimepickerComponent } from './layout/input-control-simple/input-timepicker/input-timepicker.component';
import { InputCheckboxComponent } from './layout/input-control-simple/input-checkbox/input-checkbox.component';
import { InputSelectComponentV2 } from './layout/input-control-simple/input-select-v2/input-select-v2.component';
import { DateFormatPipe } from './core/pipes/date-format.pipe';
import { RegisterComponent } from './form/register/register.component';
import { AlertMessageComponent } from './sidenav/alert-message/alert-message.component';
import { ImportComponent } from './core/import/import-component';
import { TimeFormatPipe } from './core/pipes/time-format.pipe';
import { AppConsts } from '../app-consts.component';
import { DateTimeFormatPipe } from './core/pipes/date-time-format.pipe';
import { InputImageCropperComponent } from './layout/input-control-simple/input-image-cropper/input-image-cropper.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { DateFormatUSPipe } from './core/pipes/date-format-us.pipe';
import { DateFormatYearPipe } from './core/pipes/date-format-year.pipe';
import { InputSelectComponentIMG } from './layout/input-control-simple/input-select-img/input-select-img.component';
import { MatSelectModule} from '@angular/material/select';
import { DxBulletModule, DxButtonModule, DxContextMenuModule, DxDataGridModule, DxDropDownBoxModule, DxListModule, DxTagBoxModule, DxTemplateModule, DxSelectBoxModule,
    DxTextAreaModule,
    DxFormModule,
    DxTooltipModule,
    DxFormComponent,
    DxNumberBoxModule,
    DxTextBoxModule,
    DxCheckBoxModule,
    DxDateBoxModule,
    DxValidatorModule,
    DxValidationSummaryModule,
    DxSwitchModule,
    DxTabsModule,
    DxTabPanelModule,
    DxAccordionModule,
    DxSliderModule,
    DxPopupModule,
    DxGanttModule,
    DxDropDownButtonModule, } from 'devextreme-angular';
import { DXDataGridViewComponent } from './dx-data-grid/dx-data-grid-view/dx-data-grid-view.component';
import { DxDataGridEditComponent } from './dx-data-grid/dx-data-grid-edit/dx-data-grid-edit/dx-data-grid-edit.component';
import { Service1 } from './dx-data-grid/dx-data-grid-edit/dx-data-grid-edit/dx-data-grid-edit.service';
import { FormEditV2Component } from './form/form-edit-v2/form-edit-v2.component';
import { Service3 } from './form/form-edit-v2/form-edit-v2-test.service';
import { DxInputDatepickerComponent } from './layout/input-control-simple/dx-input-datepicker/dx-input-datepicker.component';
import { DxInputDatetimepickerComponent } from './layout/input-control-simple/dx-input-datetimepicker/dx-input-datetimepicker.component';
import { DxInputTimepickerComponent } from './layout/input-control-simple/dx-input-timepicker/dx-input-timepicker.component';
import { CardCarouselComponent } from './sidenav/card-carousel/card-carousel.component';
import { DXDataGridViewReportComponent } from './dx-data-grid/dx-data-grid-view-report/dx-data-grid-view-report.component';
import { DialogFormComponent } from './layout/dialogs/form/dialog-from.component';
import { FormEditV2ForPopupComponent } from './form/form-edit-v2-for-popup/form-edit-v2-for-popup.component';
import { DialogPreviewPrintComponent } from './layout/dialogs/dialog-preview-print/dialog-preview-print.component';
import { DxDataGridViewReportFilterComponent } from './dx-data-grid/dx-data-grid-view-report-filter/dx-data-grid-view-report-filter.component';

const drawerRoutes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    
    { path: 'grid-view-template', component: GridViewComponent },
    { path: 'jqgrid-list', component: JqgridListComponent },

    { path: 'app-form-edit-v2', component: FormEditV2Component },
    { path: 'form-view-template', component: FormViewComponent },
    { path: 'form-edit-template', component: FormEditComponent },

    { path: 'test-theme-add', component: FormAddComponent, data: { table: 'tb_TestTheme', key: 'TestThemeService', editPageState: EditPageState.add } },
    { path: 'test-theme-list', component: FormViewComponent, data: { table: 'tb_TestTheme', key: 'TestThemeService', editPageState: EditPageState.add } },
    { path: 'test-theme-edit', component: FormEditComponent, data: { table: 'tb_TestTheme', key: 'TestThemeService', editPageState: EditPageState.edit } },
    { path: 'test-theme-view-detail', component: FormViewDetailComponent, data: { table: 'tb_TestTheme', key: 'TestThemeService', editPageState: EditPageState.viewDetail } },
    { path: 'DX-Data-Grid-View-Component', component: DXDataGridViewComponent },
    { path: 'DX-Data-Grid-edit-Component', component: DxDataGridEditComponent },
];

@NgModule({
    declarations: [
        FormViewComponent,
        FormViewDetailComponent,
        FormEditComponent,
        FormAddComponent,
        GridViewComponent,
        GridViewDetailComponent,
        GridEditComponent,
        GridAddComponent,
        RatingComponent,
        ToolbarComponent,
        ToolbarEditComponent,
        LoginComponent,
        BreadcrumbComponent,
        InputViewComponent,
        InputEditComponent,
        InputFilterComponent,
        NotificationComponent,
        FilePickerComponent,
        InputAddComponent,
        MycurrencyPipe,
        DialogAcctionComponent,
        DialogAcctionV2Component,
        DialogFormComponent,
        ForgotPasswordComponent,
        VerifyPasswordComponent,
        InputTextComponent,
        InputNumberComponent,
        InputTextareaComponent,
        InputDatepickerComponent,
        InputSelectComponent,
        InputSelect2Component,
        InputFilepickerComponent,
        InputMoneyComponent,
        InputFileUploadComponent,
        JqgridListComponent,
        SidenavAddEditComponent,
        SidenavViewComponent,
        JqgridEditComponent,
        InputDatetimepickerComponent,
        InputTimepickerComponent,
        InputCheckboxComponent,
        InputSelectComponentV2,
        DateFormatPipe,
        DateFormatUSPipe,
        DateFormatYearPipe,
        DateTimeFormatPipe,
        RegisterComponent,
        TimeFormatPipe,
        AlertMessageComponent,
        ImportComponent,
        InputImageCropperComponent,
        InputSelectComponentIMG,
        DXDataGridViewComponent,
        DXDataGridViewReportComponent,
        DxDataGridEditComponent,
        FormEditV2Component,
        DxInputDatepickerComponent,
        DxInputDatetimepickerComponent,
        DxInputTimepickerComponent,
        CardCarouselComponent,
        FormEditV2ForPopupComponent,
        DialogPreviewPrintComponent,
        DxDataGridViewReportFilterComponent
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
        ImageCropperModule,
        MatSelectModule,
        BrowserTransferStateModule, 
        DxButtonModule,
        DxDataGridModule,
        DxTemplateModule,
        DxBulletModule,
        DxContextMenuModule,
        DxListModule,
        DxDropDownBoxModule,
        DxTagBoxModule,
        DxSelectBoxModule,
        DxTextAreaModule,
        DxFormModule,
        DxTooltipModule,
        DxNumberBoxModule,
        DxTextBoxModule,
        DxCheckBoxModule,
        DxDateBoxModule,
        DxValidatorModule,
        DxValidationSummaryModule,
        DxSwitchModule,
        DxTabsModule,
        DxTabPanelModule,
        DxAccordionModule,
        DxSliderModule,
        DxPopupModule,
        DxGanttModule,
        DxDropDownButtonModule,
    ],
    exports: [
        FormViewComponent,
        FormViewDetailComponent,
        FormEditComponent,
        FormAddComponent,
        GridViewComponent,
        GridViewDetailComponent,
        GridEditComponent,
        GridAddComponent,
        RatingComponent,
        ToolbarComponent,
        ToolbarEditComponent,
        LoginComponent,
        BreadcrumbComponent,
        InputViewComponent,
        InputEditComponent,
        InputFilterComponent,
        NotificationComponent,
        FilePickerComponent,
        InputAddComponent,
        MycurrencyPipe,
        DialogAcctionComponent,
        DialogAcctionV2Component,
        DialogFormComponent,
        InputDatepickerComponent,
        InputSelect2Component,
        InputFileUploadComponent,
        InputSelectComponent,
        SidenavAddEditComponent,
        JqgridListComponent,
        JqgridEditComponent,
        InputCheckboxComponent,
        InputSelectComponentV2,
        InputSelectComponentIMG,
        InputFilepickerComponent,
        RegisterComponent,
        InputMoneyComponent,
        InputTimepickerComponent,
        AlertMessageComponent,
        InputDatetimepickerComponent,
        InputImageCropperComponent,
        MatSelectModule,
        DXDataGridViewComponent,
        DXDataGridViewReportComponent,
        FormEditV2Component,
        DxDataGridEditComponent,
        DxInputDatepickerComponent,
        CardCarouselComponent,
        FormEditV2ForPopupComponent,
        DialogPreviewPrintComponent,
        DxDataGridViewReportFilterComponent
    ],
    providers: [
        {
            provide: LOCALE_ID, useValue: 'en-US'//,useClass:HashLocationStrategy 
            //provide: LocationStrategy, useClass: HashLocationStrategy
        },
        {
            provide: API_BASE_URL, 
            // useValue: 'https://localhost:44342'
            useValue: AppConsts.baseUrl
        },
        GridEditService,
        GridViewDetailService,
        GridAddService,
        CookieService,
        //user login
        AccountService,
        //gen table
        GenRowTableService,
        //menu
        MenuService,
        LoginComponent,
        AppComponent,
        CommonService,
        ToolbarComponent,
        AcctionService,
        TestThemeService,
        ReferenceService,
        CommonModels,
        FileManagerService,
        InterfaceModels,
        FilePickerInterface,
        EmployeeService,
        UploadFilesService ,
        InputFilepickerComponent,
        AuthenticateService,
        Service1,
        Service3,
        ReportViewerService,
        WMSCategoryService,
        SalesCategoryService,
        SalesVATService,
        ConsolidationCategoryService
    ],
    bootstrap: [AppComponent]
})
export class ShareModule { }


