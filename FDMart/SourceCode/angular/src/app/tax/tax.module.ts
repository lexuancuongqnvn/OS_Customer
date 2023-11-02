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
import { AcctionService, API_BASE_URL, ERPCommonService, OBWMSService, ToolService, WarehouseService, WMSCategoryService, WMSReportService, WMSVoucherService } from '../shared/service-proxies/api-shared';
import { ShareModule } from '../shared/shared.module';
import { DashboardHomeComponent } from '../plugin/dashboard/dashboard-home/dashboard-home.component';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { EditPageState } from '../shared/ultilities/enum/edit-page-state';
import { DxDataGridModule } from 'devextreme-angular';
import { AppConsts } from '../app-consts.component';
import { TaxListComponent } from './category/tax/tax-list/tax-list.component';
import { TaxEditComponent } from './category/tax/tax-edit/tax-edit.component';

const drawerRoutes = [
    { path: 'tax/tax', component: TaxListComponent, data: {editPageState: EditPageState.view ,tbName:'CAT_Tax'} },
    { path: 'tax/tax-add', component: TaxEditComponent, data: {editPageState: EditPageState.add ,tbName:'CAT_Tax' } },
    { path: 'tax/tax-edit', component: TaxEditComponent, data: {editPageState: EditPageState.edit ,tbName:'CAT_Tax' } },
    { path: 'tax/tax-view-detail', component: TaxEditComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'CAT_Tax' } },  
 
];

@NgModule({
    declarations: [
        
    
    TaxListComponent,
    TaxEditComponent
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
        WMSReportService
    ],
    bootstrap: [AppComponent]
})
export class TaxModule { }
