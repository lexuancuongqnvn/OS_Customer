import { LOCALE_ID, NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { CookieModule } from "ngx-cookie";
import { AppConsts } from "../app-consts.component";
import { AppRoutingModule } from "../app-routing.module";
import { AppComponent } from "../app.component";

import { API_BASE_URL, PurchaseVoucherService, SalesCategoryService, SalesVATService, SalesVoucherService,OBPurchaseService, PurchaseReportService } from "../shared/service-proxies/api-shared";
import { ShareModule } from "../shared/shared.module";
import { EditPageState } from "../shared/ultilities/enum/edit-page-state";
import { P22MEditComponent } from "./voucher/p22/p22-m-edit/p22-m-edit.component";
import { P22MListComponent } from "./voucher/p22/p22-m-list/p22-m-list.component";
import { P23MEditComponent } from "./voucher/p23/p23-m-edit/p23-m-edit.component";
import { P23MListComponent } from "./voucher/p23/p23-m-list/p23-m-list.component";
import { P24MListComponent } from './voucher/p24/p24-m-list/p24-m-list.component';
import { P24MEditComponent } from './voucher/p24/p24-m-edit/p24-m-edit.component';
import { P25MEditComponent } from './voucher/p25/p25-m-edit/p25-m-edit.component';
import { P25MListComponent } from './voucher/p25/p25-m-list/p25-m-list.component';
import { P26MListComponent } from './voucher/p26/p26-m-list/p26-m-list.component';
import { P26MEditComponent } from './voucher/p26/p26-m-edit/p26-m-edit.component';
import { P21MEditComponent } from './voucher/p21/p21-m-edit/p21-m-edit.component';
import { P21MListComponent } from './voucher/p21/p21-m-list/p21-m-list.component';
import { ObAccountListComponent } from './ob/ob-account/ob-account-list/ob-account-list.component';
import { ObAccountEditComponent } from './ob/ob-account/ob-account-edit/ob-account-edit.component';
import { CustomerListComponent } from "../sales/category/customer/customer-list/customer-list.component";
import { CustomerEditComponent } from "../sales/category/customer/customer-edit/customer-edit.component";
import { CustomerGroupListComponent } from "../sales/category/customer-group/customer-group-list/customer-group-list.component";
import { CustomerGroupEditComponent } from "../sales/category/customer-group/customer-group-edit/customer-group-edit.component";
import { ObCustomerEditComponent } from './ob/ob-customer/ob-customer-edit/ob-customer-edit.component';
import { ObCustomerListComponent } from './ob/ob-customer/ob-customer-list/ob-customer-list.component';
import { P35MListComponent } from './voucher/p35/p35-m-list/p35-m-list.component';
import { P35MEditComponent } from './voucher/p35/p35-m-edit/p35-m-edit.component';
import { AccountsPayableLedgerComponent } from './report/payables-report/accounts-payable-ledger/accounts-payable-ledger.component';
import { AccountsPayableReportByInvoiceComponent } from './report/payables-report/accounts-payable-report-by-invoice/accounts-payable-report-by-invoice.component';

const drawerRoutes = [
    { path: 'purchase/service-purchase-invoice', component: P21MListComponent, data: {editPageState: EditPageState.view ,tbName:'P21_M',voucher_code:'MDV'} },
    { path: 'purchase/service-purchase-invoice-add', component: P21MEditComponent, data: {editPageState: EditPageState.add ,tbName:'P21_M',voucher_code:'MDV'} },
    { path: 'purchase/service-purchase-invoice-edit', component: P21MEditComponent, data: {editPageState: EditPageState.edit ,tbName:'P21_M',voucher_code:'MDV'} },
    { path: 'purchase/service-purchase-invoice-view-detail', component: P21MEditComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'P21_M',voucher_code:'MDV'} },

    { path: 'purchase/purchase-invoice-with-inventory-receipt', component: P22MListComponent, data: {editPageState: EditPageState.view ,tbName:'P22_M',voucher_code:'PNM'} },
    { path: 'purchase/purchase-invoice-with-inventory-receipt-add', component: P22MEditComponent, data: {editPageState: EditPageState.add ,tbName:'P22_M',voucher_code:'PNM'} },
    { path: 'purchase/purchase-invoice-with-inventory-receipt-edit', component: P22MEditComponent, data: {editPageState: EditPageState.edit ,tbName:'P22_M',voucher_code:'PNM'} },
    { path: 'purchase/purchase-invoice-with-inventory-receipt-view-detail', component: P22MEditComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'P22_M',voucher_code:'PNM'} },

    { path: 'purchase/import-invoice-with-warehouse-receipt', component: P23MListComponent, data: {editPageState: EditPageState.view ,tbName:'P23_M',voucher_code:'PNK'} },
    { path: 'purchase/import-invoice-with-warehouse-receipt-add', component: P23MEditComponent, data: {editPageState: EditPageState.add ,tbName:'P23_M',voucher_code:'PNK'} },
    { path: 'purchase/import-invoice-with-warehouse-receipt-edit', component: P23MEditComponent, data: {editPageState: EditPageState.edit ,tbName:'P23_M',voucher_code:'PNK'} },
    { path: 'purchase/import-invoice-with-warehouse-receipt-view-detail', component: P23MEditComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'P23_M',voucher_code:'PNK'} },

    { path: 'purchase/return-merchandise-authorization-with-outbound-delivery-note', component: P24MListComponent, data: {editPageState: EditPageState.view ,tbName:'P24_M',voucher_code:'PXT'} },
    { path: 'purchase/return-merchandise-authorization-with-outbound-delivery-note-add', component: P24MEditComponent, data: {editPageState: EditPageState.add ,tbName:'P24_M',voucher_code:'PXT'} },
    { path: 'purchase/return-merchandise-authorization-with-outbound-delivery-note-edit', component: P24MEditComponent, data: {editPageState: EditPageState.edit ,tbName:'P24_M',voucher_code:'PXT'} },
    { path: 'purchase/return-merchandise-authorization-with-outbound-delivery-note-view-detail', component: P24MEditComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'P24_M',voucher_code:'PXT'} },

    { path: 'purchase/purchase-cost-documents', component: P25MListComponent, data: {editPageState: EditPageState.view ,tbName:'P25_M',voucher_code:'MCP'} },
    { path: 'purchase/purchase-cost-documents-add', component: P25MEditComponent, data: {editPageState: EditPageState.add ,tbName:'P25_M',voucher_code:'MCP'} },
    { path: 'purchase/purchase-cost-documents-edit', component: P25MEditComponent, data: {editPageState: EditPageState.edit ,tbName:'P25_M',voucher_code:'MCP'} },
    { path: 'purchase/purchase-cost-documents-view-detail', component: P25MEditComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'P25_M',voucher_code:'MCP'} },

    { path: 'purchase/payment-documents-based-on-invoices', component: P26MListComponent, data: {editPageState: EditPageState.view ,tbName:'P26_M',voucher_code:'PTT'} },
    { path: 'purchase/payment-documents-based-on-invoices-add', component: P26MEditComponent, data: {editPageState: EditPageState.add ,tbName:'P26_M',voucher_code:'PTT'} },
    { path: 'purchase/payment-documents-based-on-invoices-edit', component: P26MEditComponent, data: {editPageState: EditPageState.edit ,tbName:'P26_M',voucher_code:'PTT'} },
    { path: 'purchase/payment-documents-based-on-invoices-view-detail', component: P26MEditComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'P26_M',voucher_code:'PTT'} },

    { path: 'purchase/beginning-balance-of-accounts-payable', component: ObCustomerListComponent, data: {editPageState: EditPageState.view ,tbName:'OB_Customer',account_code:'3'} },
    { path: 'purchase/beginning-balance-of-accounts-payable-add', component: ObCustomerEditComponent, data: {editPageState: EditPageState.add ,tbName:'OB_Customer',account_code:'3'} },
    { path: 'purchase/beginning-balance-of-accounts-payable-edit', component: ObCustomerEditComponent, data: {editPageState: EditPageState.edit ,tbName:'OB_Customer',account_code:'3'} },
    { path: 'purchase/beginning-balance-of-accounts-payable-view-detail', component: ObCustomerEditComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'OB_Customer',account_code:'3'} },

    { path: 'con/ob-accounts', component: ObAccountListComponent, data: {editPageState: EditPageState.view ,tbName:'OB_Account_Con'} },
    { path: 'con/ob-accounts-add', component: ObAccountEditComponent, data: {editPageState: EditPageState.add ,tbName:'OB_Account_Con'} },
    { path: 'con/ob-accounts-edit', component: ObAccountEditComponent, data: {editPageState: EditPageState.edit ,tbName:'OB_Account_Con'} },
    { path: 'con/ob-accounts-view-detail', component: ObAccountEditComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'OB_Account_Con'} },

    { path: 'purchase/supplier', component: CustomerListComponent, data: {editPageState: EditPageState.view ,tbName:'CAT_Customer'} },
    { path: 'purchase/supplier-add', component: CustomerEditComponent, data: {editPageState: EditPageState.add ,tbName:'CAT_Customer' } },
    { path: 'purchase/supplier-edit', component: CustomerEditComponent, data: {editPageState: EditPageState.edit ,tbName:'CAT_Customer' } },
    { path: 'purchase/supplier-view-detail', component: CustomerEditComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'CAT_Customer' } },

    { path: 'purchase/supplier-group', component: CustomerGroupListComponent, data: {editPageState: EditPageState.view ,tbName:'CAT_Customer_Group'} },
    { path: 'purchase/supplier-group-add', component: CustomerGroupEditComponent, data: {editPageState: EditPageState.add ,tbName:'CAT_Customer_Group' } },
    { path: 'purchase/supplier-group-edit', component: CustomerGroupEditComponent, data: {editPageState: EditPageState.edit ,tbName:'CAT_Customer_Group' } },
    { path: 'purchase/supplier-group-view-detail', component: CustomerGroupEditComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'CAT_Customer_Group' } },
 
    { path: 'payables/beginning-accounts-receivable-balance', component: ObCustomerListComponent, data: {editPageState: EditPageState.view ,tbName:'OB_Customer',account_code:'1'} },
    { path: 'payables/beginning-accounts-receivable-balance-add', component: ObCustomerEditComponent, data: {editPageState: EditPageState.add ,tbName:'OB_Customer',account_code:'1'} },
    { path: 'payables/beginning-accounts-receivable-balance-edit', component: ObCustomerEditComponent, data: {editPageState: EditPageState.edit ,tbName:'OB_Customer',account_code:'1'} },
    { path: 'payables/beginning-accounts-receivable-balance-view-detail', component: ObCustomerEditComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'OB_Customer',account_code:'1'} },
    
    { path: 'payables-report/accounts-payable-ledger', component: AccountsPayableLedgerComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'PUR_Accounts_Payable_Ledger_Search',account_code:'1'} },
    { path: 'payables-report/accounts-payable-report-by-invoice', component: AccountsPayableReportByInvoiceComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'PUR_Accounts_Payable_Report_by_Invoice_Search',account_code:'1'} },

    // { path: 'purchase/purchase-invoice-with-inventory-receipt', component: P22MListComponent,Outlet:'P22Voucher', data: {editPageState: EditPageState.view ,tbName:'P22_M',voucher_code:'PNM'} },
    // { path: 'purchase/purchase-invoice-with-inventory-receipt-add', component: P22MEditComponent,Outlet:'P22Voucher', data: {editPageState: EditPageState.add ,tbName:'P22_M',voucher_code:'PNM'} },
    // { path: 'purchase/purchase-invoice-with-inventory-receipt-edit', component: P22MEditComponent,Outlet:'P22Voucher', data: {editPageState: EditPageState.edit ,tbName:'P22_M',voucher_code:'PNM'} },
    // { path: 'purchase/purchase-invoice-with-inventory-receipt-view-detail', component: P22MEditComponent,Outlet:'P22Voucher', data: {editPageState: EditPageState.viewDetail ,tbName:'P22_M',voucher_code:'PNM'} },

]

@NgModule({
    declarations: [
        P22MListComponent,
        P22MEditComponent,
        P23MListComponent,
        P23MEditComponent,
        P24MListComponent,
        P24MEditComponent,
        P25MEditComponent,
        P25MListComponent,
        P26MListComponent,
        P26MEditComponent,
        P21MEditComponent,
        P21MListComponent,
        ObAccountListComponent,
        ObAccountEditComponent,
        ObCustomerEditComponent,
        ObCustomerListComponent,
        P35MListComponent,
        P35MEditComponent,
        AccountsPayableLedgerComponent,
        AccountsPayableReportByInvoiceComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        RouterModule.forRoot(drawerRoutes),
        CookieModule.forRoot(),
        ShareModule
    ],
    exports: [
        P22MListComponent,
        P22MEditComponent,
        P24MEditComponent
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
        SalesVoucherService ,
        SalesVATService,
        SalesCategoryService ,
        PurchaseVoucherService,
        PurchaseReportService,
        OBPurchaseService
    ],
    bootstrap: [AppComponent]
})
export class PurchaseModule { }