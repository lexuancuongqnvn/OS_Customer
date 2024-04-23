import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/layout/header/header.component';

import { ExcelModule, GridModule, PDFModule } from '@progress/kendo-angular-grid';
import { LabelModule } from '@progress/kendo-angular-label';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { SchedulerModule } from '@progress/kendo-angular-scheduler';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { EditorModule } from '@progress/kendo-angular-editor';
import { FileSelectModule } from '@progress/kendo-angular-upload';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { IntlModule } from '@progress/kendo-angular-intl';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { MessageService } from '@progress/kendo-angular-l10n';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormViewComponent } from './shared/form/form-view/form-view.component';
import { GridViewComponent } from './shared/grid/grid-view/grid-view.component';
import { GridEditComponent } from './shared/grid/grid-edit/grid-edit.component';
import { RatingComponent } from './shared/grid/grid-view/rating.component';
// const drawerRoutes = [
//   { path: 'form-view-template', component: FormViewComponent },
//   { path: 'grid-view-template', component: GridViewComponent }
// ];
 import 'hammerjs';
import { ShareModule } from './shared/shared.module';
import { LoginComponent } from './shared/form/login/login.component';
import { SystemServiceProxy } from './shared/service-proxies/service-proxies';
import { CookieService } from 'ngx-cookie';
import { AppSession } from './shared/app-session/app-session';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';
import { BlockUIModule } from 'ng-block-ui';
import { AppDrawerComponent } from './shared/layout/drawer/drawer.component';
import { Globals } from 'src/globals';
import { DrawerService } from './shared/shared.service';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { SystemModule } from './system/system.module';
import { ToolbarComponent } from './shared/layout/toolbar/toolbar.component';
import { DialogAcctionComponent } from './shared/layout/dialogs/acction/dialog-acction.component';
import { DashboardHomeComponent } from './plugin/dashboard/dashboard-home/dashboard-home.component';
import { LayoutComponent } from './plugin/layout/layout.component';
import { DatePipe, HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { SettingLoginComponent } from './system/settings/setting-login/setting-login.component';
import { MyProfileComponent } from './system/user/my-profile/my-profile.component';
import { HRMSModule } from './hrms/hrms.module';
import { MessengerComponent } from './signalR/messenger/messenger.component';
import { MoneyFormatPipe } from './shared/core/pipes/money-format.pipe';
import { TermFormatPipe } from './shared/core/pipes/term-format.pipe';
import { MessengerService } from './signalR/messenger/messenger.service';
import { DepartmentService, ExportAPIService, MessengerApiService, NotificationHRMService, ProductService, SignalRService } from './shared/service-proxies/api-shared';
import { ExportComponent } from './shared/core/export/export-component';
import { ImportComponent } from './shared/core/import/import-component';
import { WarehouseModule } from './warehouse/warehouse.module';
import { WebcamModule } from 'ngx-webcam';
import { DashboardWorkflowComponent } from './plugin/dashboard/dashboard-hrm/dashboard-workflow.component';
import { MessengerV2Component } from './signalR/messenger-v2/messenger-v2.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSliderModule } from '@angular/material/slider';
import { POSModule } from './pos/pos.module';
import { DxButtonModule, DxChartModule, DxDataGridModule, DxDateBoxModule, DxDrawerModule, DxListModule, DxNumberBoxModule, DxPieChartModule, DxPopoverModule, DxPopupModule, DxRadioGroupModule, DxSelectBoxModule, DxTabsModule, DxTextBoxModule, DxToolbarModule } from 'devextreme-angular';
import { ListAppsComponent } from './plugin/layout/list-apps/list-apps.component';
import { S32MListComponent } from './sales/voucher/s32/s32-m-list/s32-m-list.component';
import { S32MEditComponent } from './sales/voucher/s32/s32-m-edit/s32-m-edit.component';
import { SalesModule } from './sales/sales.module';
import { PurchaseModule } from './purchase/purchase.module';
import { CashModule } from './cash/cash.module';
import { TaxModule } from './tax/tax.module';
import { BlockTemplateCmp } from './app-block-template.component';
import { AccoutingConsolidationModule } from './accounting-consolidation/accounting-consolidation.module';
import { FullStackedBarComponent } from './plugin/layout/charts/full-stacked-bar/full-stacked-bar.component';
import { PieWithSmallValuesGroupedComponent } from './plugin/layout/charts/pie-with-small-values-grouped/pie-with-small-values-grouped.component';
import { StandardBarComponent } from './plugin/layout/charts/standard-bar/standard-bar.component';
import { DoughnutComponent } from './plugin/layout/charts/doughnut/doughnut.component';
import { SplineAreaComponent } from './plugin/layout/charts/spline-area/spline-area.component';
import { DashboardWorkflowV2Component } from './plugin/dashboard/dashboard-hrm/dashboard-workflow-v2/dashboard-workflow-v2.component';
import { PageMenuComponent } from './plugin/layout/page-menu/page-menu.component';
import { LayoutContentOnlyComponent } from './plugin/layout/layout-content-only/layout-content-only.component';


export const commonDeclarationDeclarations = [

]
const routes: Routes = [
  { path: '', component: PageMenuComponent },
  { path: 'verify-user', component: LoginComponent },
  { path: 'setting-login', component: SettingLoginComponent },
  { path: 'user-my-profile', component: MyProfileComponent },

  { path: 'messenger', component: MessengerComponent },
  { path: 'messenger-v2', component: MessengerV2Component },
  { path: 'dashboard-workflow', component: DashboardWorkflowComponent },
  

];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AppDrawerComponent,
    DashboardHomeComponent,
    LayoutComponent,
    MessengerComponent,
    TermFormatPipe,
    MoneyFormatPipe,
    DashboardWorkflowComponent,
    ListAppsComponent,
    BlockTemplateCmp,
    FullStackedBarComponent,
    PieWithSmallValuesGroupedComponent,
    StandardBarComponent,
    DoughnutComponent,
    SplineAreaComponent,
    DashboardWorkflowV2Component,
    PageMenuComponent,
    LayoutContentOnlyComponent
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
    ShareModule,
    FileSelectModule,
    HttpClientModule,
    ChartsModule,
    IntlModule,
    DateInputsModule,
    InputsModule,
    DropDownsModule,
    NotificationModule,
    IndicatorsModule,
    DialogsModule,
    SystemModule,
    HRMSModule,
    POSModule,
    RouterModule.forRoot(routes),
    BlockUIModule.forRoot({
      template: BlockTemplateCmp
    }),
    WarehouseModule,
    SalesModule,
    CashModule,
    PurchaseModule,
    TaxModule,
    AccoutingConsolidationModule,
    WebcamModule,
    DragDropModule ,
    MatSliderModule,
    DxDateBoxModule,
    DxPopupModule,
    DxPopoverModule,
    DxDrawerModule,
    DxListModule,
    DxRadioGroupModule,
    DxToolbarModule,
    DxSelectBoxModule,
    DxDataGridModule,
    DxButtonModule,
    DxTextBoxModule,
    DxNumberBoxModule,
    DxChartModule,
    DxPieChartModule,
  ],
  exports: [
    ShareModule,
    ListAppsComponent,
    FullStackedBarComponent,
    PieWithSmallValuesGroupedComponent,
    StandardBarComponent,
    SplineAreaComponent,
    WarehouseModule,
    LayoutContentOnlyComponent
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'en-US'},
    SystemServiceProxy,
    AppSession,
    CookieService,
    Globals,
    DrawerService,
    SignalRService,
    DatePipe,
    ProductService,
    ExportComponent,
    ExportAPIService,
    ImportComponent,
    DepartmentService,
    MessengerApiService,
    NotificationHRMService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
