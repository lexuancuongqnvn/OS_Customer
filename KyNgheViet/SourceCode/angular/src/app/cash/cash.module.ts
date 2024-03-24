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
import { AcctionService, API_BASE_URL, ERPCommonService, OBWMSService, ToolService, WarehouseService, WMSCategoryService, WMSReportService, WMSVoucherService,CashCategoryService, CashVoucherService, CashReportService } from '../shared/service-proxies/api-shared';
import { ShareModule } from '../shared/shared.module';
import { DashboardHomeComponent } from '../plugin/dashboard/dashboard-home/dashboard-home.component';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { EditPageState } from '../shared/ultilities/enum/edit-page-state';
import { DxDataGridModule } from 'devextreme-angular';
import { AppConsts } from '../app-consts.component';
import { ForeignCurrencyListComponent } from './category/foreign-currency/foreign-currency-list/foreign-currency-list.component';
import { ForeignCurrencyEditComponent } from './category/foreign-currency/foreign-currency-edit/foreign-currency-edit.component';
import { CustomerGroupListComponent } from '../sales/category/customer-group/customer-group-list/customer-group-list.component';
import { CustomerGroupEditComponent } from '../sales/category/customer-group/customer-group-edit/customer-group-edit.component';
import { CustomerListComponent } from '../sales/category/customer/customer-list/customer-list.component';
import { CustomerEditComponent } from '../sales/category/customer/customer-edit/customer-edit.component';
import { C11MListComponent } from './voucher/c11-m/c11-m-list/c11-m-list.component';
import { C11MEditComponent } from './voucher/c11-m/c11-m-edit/c11-m-edit.component';
import { C12MListComponent } from './voucher/c12-m/c12-m-list/c12-m-list.component';
import { C12MEditComponent } from './voucher/c12-m/c12-m-edit/c12-m-edit.component';
import { C15MEditComponent } from './voucher/c15-m/c15-m-edit/c15-m-edit.component';
import { C15MListComponent } from './voucher/c15-m/c15-m-list/c15-m-list.component';
import { C16MListComponent } from './voucher/c16-m/c16-m-list/c16-m-list.component';
import { C16MEditComponent } from './voucher/c16-m/c16-m-edit/c16-m-edit.component';
import { PaymentVoucherReportComponent } from './report/payment-voucher-report/payment-voucher-report.component';
import { ReceiptReportComponent } from './report/receipt-report/receipt-report.component';
import { CashDisbursementJournalComponent } from './report/cash-disbursement-journal/cash-disbursement-journal.component';
import { CashReceiptsLedgerComponent } from './report/cash-receipts-ledger/cash-receipts-ledger.component';
import { BankDepositLedgerComponent } from './report/bank-deposit-ledger/bank-deposit-ledger.component';
import { CashLedgerReportComponent } from './report/cash-ledger-report/cash-ledger-report.component';

const drawerRoutes = [
    { path: 'cash/foreign-currency', component: ForeignCurrencyListComponent, data: {editPageState: EditPageState.view ,tbName:'CAT_Foreign_Currency'} },
    { path: 'cash/foreign-currency-add', component: ForeignCurrencyEditComponent, data: {editPageState: EditPageState.add ,tbName:'CAT_Foreign_Currency' } },
    { path: 'cash/foreign-currency-edit', component: ForeignCurrencyEditComponent, data: {editPageState: EditPageState.edit ,tbName:'CAT_Foreign_Currency' } },
    { path: 'cash/foreign-currency-view-detail', component: ForeignCurrencyEditComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'CAT_Foreign_Currency' } },  
 
    { path: 'cash/employee', component: CustomerListComponent, data: {editPageState: EditPageState.view ,tbName:'CAT_Customer'} },
    { path: 'cash/employee-add', component: CustomerEditComponent, data: {editPageState: EditPageState.add ,tbName:'CAT_Customer' } },
    { path: 'cash/employee-edit', component: CustomerEditComponent, data: {editPageState: EditPageState.edit ,tbName:'CAT_Customer' } },
    { path: 'cash/employee-view-detail', component: CustomerEditComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'CAT_Customer' } },
    
    { path: 'cash/employee-group', component: CustomerGroupListComponent, data: {editPageState: EditPageState.view ,tbName:'CAT_Customer_Group'} },
    { path: 'cash/employee-group-add', component: CustomerGroupEditComponent, data: {editPageState: EditPageState.add ,tbName:'CAT_Customer_Group' } },
    { path: 'cash/employee-group-edit', component: CustomerGroupEditComponent, data: {editPageState: EditPageState.edit ,tbName:'CAT_Customer_Group' } },
    { path: 'cash/employee-group-view-detail', component: CustomerGroupEditComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'CAT_Customer_Group' } },
 
    { path: 'cash/receipt', component: C11MListComponent, data: {editPageState: EditPageState.view ,tbName:'C11_M',voucher_code:'PT'} },
    { path: 'cash/receipt-add', component: C11MEditComponent, data: {editPageState: EditPageState.add ,tbName:'C11_M' ,voucher_code:'PT'} },
    { path: 'cash/receipt-edit', component: C11MEditComponent, data: {editPageState: EditPageState.edit ,tbName:'C11_M' ,voucher_code:'PT'} },
    { path: 'cash/receipt-view-detail', component: C11MEditComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'C11_M',voucher_code:'PT' } },

    { path: 'cash/payment-voucher', component: C12MListComponent, data: {editPageState: EditPageState.view ,tbName:'C12_M',voucher_code:'PC'} },
    { path: 'cash/payment-voucher-add', component: C12MEditComponent, data: {editPageState: EditPageState.add ,tbName:'C12_M' ,voucher_code:'PC'} },
    { path: 'cash/payment-voucher-edit', component: C12MEditComponent, data: {editPageState: EditPageState.edit ,tbName:'C12_M' ,voucher_code:'PC'} },
    { path: 'cash/payment-voucher-view-detail', component: C12MEditComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'C12_M',voucher_code:'PC' } },

    { path: 'cash/credit-note', component: C15MListComponent, data: {editPageState: EditPageState.view ,tbName:'C15_M',voucher_code:'PBC'} },
    { path: 'cash/credit-note-add', component: C15MEditComponent, data: {editPageState: EditPageState.add ,tbName:'C15_M' ,voucher_code:'PBC'} },
    { path: 'cash/credit-note-edit', component: C15MEditComponent, data: {editPageState: EditPageState.edit ,tbName:'C15_M' ,voucher_code:'PBC'} },
    { path: 'cash/credit-note-view-detail', component: C15MEditComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'C15_M',voucher_code:'PBC' } },

    { path: 'cash/debit-note', component: C16MListComponent, data: {editPageState: EditPageState.view ,tbName:'C16_M',voucher_code:'PBN'} },
    { path: 'cash/debit-note-add', component: C16MEditComponent, data: {editPageState: EditPageState.add ,tbName:'C16_M' ,voucher_code:'PBN'} },
    { path: 'cash/debit-note-edit', component: C16MEditComponent, data: {editPageState: EditPageState.edit ,tbName:'C16_M' ,voucher_code:'PBN'} },
    { path: 'cash/debit-note-view-detail', component: C16MEditComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'C16_M',voucher_code:'PBN' } },
    
    { path: 'cash/payment-voucher-report', component: PaymentVoucherReportComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'CASH_Payment_voucher_report_Search',voucher_code:'PC' } },
    { path: 'cash/receipt-report', component: ReceiptReportComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'CASH_Receipt_report_Search',voucher_code:'PT' } },
    { path: 'cash/cash-ledger-report', component: CashLedgerReportComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'CASH_Cash_Ledger_Report_Search',voucher_code:'' } },
    { path: 'cash/bank-deposit-ledger', component: BankDepositLedgerComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'CASH_Bank_Deposit_Ledger_Search',voucher_code:'PBN' } },
    { path: 'cash/cash-receipts-ledger', component: CashReceiptsLedgerComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'CASH_Receipts_Ledger_Search',voucher_code:'PBN' } },
    { path: 'cash/cash-disbursement-journal', component: CashDisbursementJournalComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'CASH_Disbursement_Journal_Search',voucher_code:'PBN' } },

];

@NgModule({
    declarations: [
        ForeignCurrencyListComponent,
        ForeignCurrencyEditComponent,
        C11MListComponent,
        C11MEditComponent,
        C12MListComponent,
        C12MEditComponent,
        C15MEditComponent,
        C15MListComponent,
        C16MListComponent,
        C16MEditComponent,
        PaymentVoucherReportComponent,
        ReceiptReportComponent,
        CashDisbursementJournalComponent,
        CashReceiptsLedgerComponent,
        BankDepositLedgerComponent,
        CashLedgerReportComponent
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
        CashVoucherService,
        CashReportService
    ],
    bootstrap: [AppComponent]
})
export class CashModule { }
