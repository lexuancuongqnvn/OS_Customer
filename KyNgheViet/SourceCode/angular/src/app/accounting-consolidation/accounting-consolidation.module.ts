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
import { CookieModule, CookieService } from 'ngx-cookie';
import { NavigationModule } from '@progress/kendo-angular-navigation';
import { DialogModule, WindowModule } from '@progress/kendo-angular-dialog';
import { AcctionService, API_BASE_URL, ERPCommonService, OBWMSService, ToolService, WarehouseService, WMSCategoryService, WMSReportService, WMSVoucherService,CashCategoryService, ConsolidationVoucherService, ConsolidationCategoryService } from 'src/app/shared/service-proxies/api-shared';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { DxDataGridModule } from 'devextreme-angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ShareModule } from 'src/app/shared/shared.module';
import { AppConsts } from 'src/app/app-consts.component';
import { AppComponent } from 'src/app/app.component';
import { AccountingVoucherEditComponent } from './voucher/accounting-voucher/accounting-voucher-edit/accounting-voucher-edit.component';
import { AccountingVoucherListComponent } from './voucher/accounting-voucher/accounting-voucher-list/accounting-voucher-list.component';
import { EditPageState } from 'src/app/shared/ultilities/enum/edit-page-state';
import { AccountListComponent } from './category/account/account-list/account-list.component';
import { AccountEditComponent } from './category/account/account-edit/account-edit.component';
import { ProfessionListComponent } from './category/profession/profession-list/profession-list.component';
import { ProfessionEditComponent } from './category/profession/profession-edit/profession-edit.component';
import { CarryForwardListComponent } from './category/carry-forward/carry-forward-list/carry-forward-list.component';
import { CarryForwardEditComponent } from './category/carry-forward/carry-forward-edit/carry-forward-edit.component';


const drawerRoutes = [
    { path: 'accounting-voucher', component: AccountingVoucherListComponent, data: {editPageState: EditPageState.view ,tbName:'C51_M',voucher_code:'PKT'} },
    { path: 'accounting-voucher-add', component: AccountingVoucherEditComponent, data: {editPageState: EditPageState.add ,tbName:'C51_M',voucher_code:'PKT'} },
    { path: 'accounting-voucher-edit', component: AccountingVoucherEditComponent, data: {editPageState: EditPageState.edit ,tbName:'C51_M',voucher_code:'PKT'} },
    { path: 'accounting-voucher-view-detail', component: AccountingVoucherEditComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'C51_M',voucher_code:'PKT'}},

    { path: 'con/account', component: AccountListComponent, data: {editPageState: EditPageState.view ,tbName:'CAT_Account'} },
    { path: 'con/account-add', component: AccountEditComponent, data: {editPageState: EditPageState.add ,tbName:'CAT_Account' } },
    { path: 'con/account-edit', component: AccountEditComponent, data: {editPageState: EditPageState.edit ,tbName:'CAT_Account' } },
    { path: 'con/account-view-detail', component: AccountEditComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'CAT_Account' } },

    { path: 'con/profession', component: ProfessionListComponent, data: {editPageState: EditPageState.view ,tbName:'CAT_Profession'} },
    { path: 'con/profession-add', component: ProfessionEditComponent, data: {editPageState: EditPageState.add ,tbName:'CAT_Profession' } },
    { path: 'con/profession-edit', component: ProfessionEditComponent, data: {editPageState: EditPageState.edit ,tbName:'CAT_Profession' } },
    { path: 'con/profession-view-detail', component: ProfessionEditComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'CAT_Profession' } },
    
    { path: 'con/carry-forward', component: CarryForwardListComponent, data: {editPageState: EditPageState.view ,tbName:'CAT_Carry_Forward'} },
    { path: 'con/carry-forward-add', component: CarryForwardEditComponent, data: {editPageState: EditPageState.add ,tbName:'CAT_Carry_Forward' } },
    { path: 'con/carry-forward-edit', component: CarryForwardEditComponent, data: {editPageState: EditPageState.edit ,tbName:'CAT_Carry_Forward' } },
    { path: 'con/carry-forward-view-detail', component: CarryForwardEditComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'CAT_Carry_Forward' } },

]
@NgModule({
    declarations: [
        AccountingVoucherListComponent,
        AccountingVoucherEditComponent,
        AccountListComponent,
        AccountEditComponent,
        ProfessionListComponent,
        ProfessionEditComponent,
        CarryForwardListComponent,
        CarryForwardEditComponent
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
        DxDataGridModule,
    ],
    exports: [
    ],
    providers: [
        {
             provide: LOCALE_ID, 
             useValue: 'en-US'//,useClass:HashLocationStrategy 
            //provide: LocationStrategy, 
            //useClass: HashLocationStrategy
        },
        {
            provide: API_BASE_URL, 
            useValue: AppConsts.baseUrl
        },
        WarehouseService,
        WMSCategoryService,
        ERPCommonService,
        OBWMSService,
        WMSVoucherService ,
        WMSReportService,
        CashCategoryService,
        ConsolidationVoucherService,
        ConsolidationCategoryService
    ],
    bootstrap: [AppComponent]
})
export class AccoutingConsolidationModule { }
