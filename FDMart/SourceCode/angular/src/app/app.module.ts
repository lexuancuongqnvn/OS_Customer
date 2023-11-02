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
import { DxButtonModule, DxDataGridModule, DxDateBoxModule, DxDrawerModule, DxListModule, DxNumberBoxModule, DxPopoverModule, DxPopupModule, DxRadioGroupModule, DxSelectBoxModule, DxTabsModule, DxTextBoxModule, DxToolbarModule } from 'devextreme-angular';
import { ListAppsComponent } from './plugin/layout/list-apps/list-apps.component';
import { S32MListComponent } from './sales/voucher/s32/s32-m-list/s32-m-list.component';
import { S32MEditComponent } from './sales/voucher/s32/s32-m-edit/s32-m-edit.component';
import { SalesModule } from './sales/sales.module';
import { PurchaseModule } from './purchase/purchase.module';
import { CashModule } from './cash/cash.module';
import { TaxModule } from './tax/tax.module';


export const commonDeclarationDeclarations = [

]
const routes: Routes = [
  // { path: '', component: DashboardWorkflowComponent },
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
    ListAppsComponent
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
    BlockUIModule.forRoot(),
    WarehouseModule,
    SalesModule,
    CashModule,
    PurchaseModule,
    TaxModule,
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
  ],
  exports: [
    ShareModule,
    ListAppsComponent
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
