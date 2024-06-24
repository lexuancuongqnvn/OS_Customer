import { LOCALE_ID, NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { CookieModule } from "ngx-cookie";
import { AppConsts } from "../app-consts.component";
import { AppRoutingModule } from "../app-routing.module";
import { AppComponent } from "../app.component";
import { API_BASE_URL, CashReportService, SalesCategoryService, SalesReportService, SalesVATService, SalesVoucherService } from "../shared/service-proxies/api-shared";
import { ShareModule } from "../shared/shared.module";
import { EditPageState } from "../shared/ultilities/enum/edit-page-state";
import { GoodsEditComponent } from "../warehouse/category/goods/goods-edit/goods-edit.component";
import { GoodsComponent } from "../warehouse/category/goods/goods.component";
import { S32MEditComponent } from "./voucher/s32/s32-m-edit/s32-m-edit.component";
import { S32MListComponent } from "./voucher/s32/s32-m-list/s32-m-list.component";
import { CustomerListComponent } from './category/customer/customer-list/customer-list.component';
import { CustomerGroupListComponent } from './category/customer-group/customer-group-list/customer-group-list.component';
import { ContractListComponent } from './category/contract/contract-list/contract-list.component';
import { WarrantyCertificateEditComponent } from './category/warranty-certificate/warranty-certificate-edit/warranty-certificate-edit.component';
import { WarrantyCertificateListComponent } from './category/warranty-certificate/warranty-certificate-list/warranty-certificate-list.component';
import { ContractEditComponent } from "./category/contract/contract-edit/contract-edit.component";
import { CustomerEditComponent } from "./category/customer/customer-edit/customer-edit.component";
import { CustomerGroupEditComponent } from "./category/customer-group/customer-group-edit/customer-group-edit.component";
import { S33MListComponent } from "./voucher/s33/s33-m-list/s33-m-list.component";
import { S33MEditComponent } from "./voucher/s33/s33-m-edit/s33-m-edit.component";
import { S31MListComponent } from './voucher/s31/s31-m-list/s31-m-list.component';
import { S31MEditComponent } from './voucher/s31/s31-m-edit/s31-m-edit.component';
import { S34MEditComponent } from './voucher/s34/s34-m-edit/s34-m-edit.component';
import { S34MListComponent } from './voucher/s34/s34-m-list/s34-m-list.component';
import { ReportOnSalesInvoicesListComponent } from './report/report-on-sales-invoices/report-on-sales-invoices-list/report-on-sales-invoices-list.component';
import { ReportOfGoodsReturnNoteListComponent } from './report/report-of-goods-return-note/report-of-goods-return-note-list/report-of-goods-return-note-list.component';
import { SalesRevenueReportListComponent } from './report/sales-revenue-report-note/sales-revenue-report-list/sales-revenue-report-list.component';
import { MerchandiseGrossProfitReportListComponent } from './report/merchandise-gross-profit-report/merchandise-gross-profit-report-list/merchandise-gross-profit-report-list.component';
import { SalesDayBookListComponent } from './report/sales-day-book/sales-day-book-list/sales-day-book-list.component';
import { AccountsReceivableSubsidiaryLedgerListComponent } from './report/accounts-receivable-subsidiary-ledger/accounts-receivable-subsidiary-ledger-list/accounts-receivable-subsidiary-ledger-list.component';
import { EmployeeSalesComponent } from './report/employee-sales/employee-sales.component';
import { EmployeeSalesEditComponent } from './report/employee-sales/employee-sales-edit/employee-sales-edit.component';
import { ConfigurationReportBySalesInvoicesComponent } from './report/configuration-report-by-sales-invoices/configuration-report-by-sales-invoices.component';
import { EmployeeSalesAddComponent } from './report/employee-sales/employee-sales-add/employee-sales-add/employee-sales-add.component';
import { AccountsReceivableLedgerComponent } from './report/payables-report/accounts-receivable-ledger/accounts-receivable-ledger.component';
import { TheDetailedAccountsReceivableLedgerByInvoiceComponent } from './report/payables-report/the-detailed-accounts-receivable-ledger-by-invoice/the-detailed-accounts-receivable-ledger-by-invoice.component';
import { StatementOfChangesInFinancialPositionComponent } from './report/payables-report/statement-of-changes-in-financial-position/statement-of-changes-in-financial-position.component';
import { YearEndBalanceSheetCompilationComponent } from './report/payables-report/year-end-balance-sheet-compilation/year-end-balance-sheet-compilation.component';
import { S35MEditComponent } from './voucher/s35/s35-m-edit/s35-m-edit.component';
import { S35MListComponent } from './voucher/s35/s35-m-list/s35-m-list.component';
import { DxButtonModule } from "devextreme-angular";

const drawerRoutes = [
    { path: 'sales/service-invoice', component: S31MListComponent, data: {editPageState: EditPageState.view ,tbName:'S31_M',voucher_code:'HDV'} },
    { path: 'sales/service-invoice-add', component: S31MEditComponent, data: {editPageState: EditPageState.add ,tbName:'S31_M',voucher_code:'HDV'} },
    { path: 'sales/service-invoice-edit', component: S31MEditComponent, data: {editPageState: EditPageState.edit ,tbName:'S31_M',voucher_code:'HDV'} },
    { path: 'sales/service-invoice-view-detail', component: S31MEditComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'S31_M',voucher_code:'HDV'}},
    
    { path: 'sales-invoice-with-goods-delivery-note', component: S32MListComponent, data: {editPageState: EditPageState.view ,tbName:'S32_M',voucher_code:'HDB'} },
    { path: 'sales-invoice-with-goods-delivery-note-add', component: S32MEditComponent, data: {editPageState: EditPageState.add ,tbName:'S32_M',voucher_code:'HDB'} },
    { path: 'sales-invoice-with-goods-delivery-note-edit', component: S32MEditComponent, data: {editPageState: EditPageState.edit ,tbName:'S32_M',voucher_code:'HDB'} },
    { path: 'sales-invoice-with-goods-delivery-note-view-detail', component: S32MEditComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'S32_M',voucher_code:'HDB'}},
    
    { path: 'sales/discount-invoice-and-sales-return', component: S33MListComponent, data: {editPageState: EditPageState.view ,tbName:'S33_M',voucher_code:'HTL'} },
    { path: 'sales/discount-invoice-and-sales-return-add', component: S33MEditComponent, data: {editPageState: EditPageState.add ,tbName:'S33_M',voucher_code:'HTL'} },
    { path: 'sales/discount-invoice-and-sales-return-edit', component: S33MEditComponent, data: {editPageState: EditPageState.edit ,tbName:'S33_M',voucher_code:'HTL'} },
    { path: 'sales/discount-invoice-and-sales-return-view-detail', component: S33MEditComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'S33_M',voucher_code:'HTL'}},

    { path: 'sales/receipt-of-accounts-receivable-by-invoice', component: S34MListComponent, data: {editPageState: EditPageState.view ,tbName:'S34_M',voucher_code:'PTH'} },
    { path: 'sales/receipt-of-accounts-receivable-by-invoice-add', component: S34MEditComponent, data: {editPageState: EditPageState.add ,tbName:'S34_M',voucher_code:'PTH'} },
    { path: 'sales/receipt-of-accounts-receivable-by-invoice-edit', component: S34MEditComponent, data: {editPageState: EditPageState.edit ,tbName:'S34_M',voucher_code:'PTH'} },
    { path: 'sales/receipt-of-accounts-receivable-by-invoice-view-detail', component: S34MEditComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'S34_M',voucher_code:'PTH'}},

    { path: 'sales/customer-group', component: CustomerGroupListComponent, data: {editPageState: EditPageState.view ,tbName:'CAT_Customer_Group'} },
    { path: 'sales/customer-group-add', component: CustomerGroupEditComponent, data: {editPageState: EditPageState.add ,tbName:'CAT_Customer_Group' } },
    { path: 'sales/customer-group-edit', component: CustomerGroupEditComponent, data: {editPageState: EditPageState.edit ,tbName:'CAT_Customer_Group' } },
    { path: 'sales/customer-group-view-detail', component: CustomerGroupEditComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'CAT_Customer_Group' } },
 
    { path: 'sales/customer', component: CustomerListComponent, data: {editPageState: EditPageState.view ,tbName:'CAT_Customer'} },
    { path: 'sales/customer-add', component: CustomerEditComponent, data: {editPageState: EditPageState.add ,tbName:'CAT_Customer' } },
    { path: 'sales/customer-edit', component: CustomerEditComponent, data: {editPageState: EditPageState.edit ,tbName:'CAT_Customer' } },
    { path: 'sales/customer-view-detail', component: CustomerEditComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'CAT_Customer' } },

    { path: 'sales/contract', component: ContractListComponent, data: {editPageState: EditPageState.view ,tbName:'CAT_Contract'} },
    { path: 'sales/contract-add', component: ContractEditComponent, data: {editPageState: EditPageState.add ,tbName:'CAT_Contract' } },
    { path: 'sales/contract-edit', component: ContractEditComponent, data: {editPageState: EditPageState.edit ,tbName:'CAT_Contract' } },
    { path: 'sales/contract-view-detail', component: ContractEditComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'CAT_Contract' } },
 
    { path: 'sales/warranty-certificate', component: WarrantyCertificateListComponent, data: {editPageState: EditPageState.view ,tbName:'CAT_Warranty_Certificate',voucher_code:'PX'} },
    { path: 'sales/warranty-certificate-add', component: WarrantyCertificateEditComponent, data: {editPageState: EditPageState.add ,tbName:'CAT_Warranty_Certificate' ,voucher_code:'PX'} },
    { path: 'sales/warranty-certificate-edit', component: WarrantyCertificateEditComponent, data: {editPageState: EditPageState.edit ,tbName:'CAT_Warranty_Certificate' ,voucher_code:'PX'} },
    { path: 'sales/warranty-certificate-view-detail', component: WarrantyCertificateEditComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'CAT_Warranty_Certificate',voucher_code:'PX' } },

    { path: 'category/goods', component: GoodsComponent, data: {editPageState: EditPageState.view ,tbName:'CAT_Goods'} },
    { path: 'category/goods-add', component: GoodsEditComponent, data: {editPageState: EditPageState.add ,tbName:'CAT_Goods' } },
    { path: 'category/goods-edit', component: GoodsEditComponent, data: {editPageState: EditPageState.edit ,tbName:'CAT_Goods' } },
    { path: 'category/goods-view-detail', component: GoodsEditComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'CAT_Goods' } },
  
    { path: 'employee/sales', component: EmployeeSalesComponent, data: {editPageState: EditPageState.view ,tbName:'HRM_Employee_Labour_Contract_Appendix_Sales'} },
    { path: 'employee/sales-add', component: EmployeeSalesAddComponent, data: {editPageState: EditPageState.edit ,tbName:'HRM_Employee_Labour_Contract_Appendix_Sales_Add' } },
    { path: 'employee/sales-edit', component: EmployeeSalesEditComponent, data: {editPageState: EditPageState.edit ,tbName:'HRM_Employee_Labour_Contract_Appendix_Sales' } },
    { path: 'employee/sales-view-detail', component: EmployeeSalesEditComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'HRM_Employee_Labour_Contract_Appendix_Sales' } },

    { path: 'payables/automatic-adjustment-of-accounts-receivable', component: S35MListComponent, data: {editPageState: EditPageState.view ,tbName:'S35_M'} },
    { path: 'payables/automatic-adjustment-of-accounts-receivable-add', component: S35MEditComponent, data: {editPageState: EditPageState.edit ,tbName:'S35_M' } },
    { path: 'payables/automatic-adjustment-of-accounts-receivable-edit', component: S35MEditComponent, data: {editPageState: EditPageState.edit ,tbName:'S35_M' } },
    { path: 'payables/automatic-adjustment-of-accounts-receivable-view-detail', component: S35MEditComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'S35_M' } },


    //Báo cáo hóa đơn bán hàng (Report on Sales Invoices)
    { path: 'sales/report/report-on-sales-invoices-list', component: ReportOnSalesInvoicesListComponent, data: {editPageState: EditPageState.view ,tbName:'SALES_Report_S32',voucher_code:'HDB'} },
     //Báo cáo phiếu nhập hàng trả lại (Report of Goods Return Note)
    { path: 'sales/report/report-of-goods-return-note-list', component: ReportOfGoodsReturnNoteListComponent, data: {editPageState: EditPageState.add ,tbName:'SALES_Report_S33',voucher_code:'HTL' } },
    //Báo cáo doanh số bán hàng (Sales Revenue Report)
    { path: 'sales/report/sales-revenue-report-list', component: SalesRevenueReportListComponent, data: {editPageState: EditPageState.edit ,tbName:'SALES_Report_S32_Sales' } },
    //Báo cáo lãi gộp hàng hóa (Merchandise Gross Profit Report)
    { path: 'sales/report/merchandise-gross-profit-report-list', component: MerchandiseGrossProfitReportListComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'SALES_Report_Gross_Profit' } },
    //Sổ nhật ký bán hàng (Sales Day Book)
    { path: 'sales/report/sales-day-book-list', component: SalesDayBookListComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'SALES_Report_Sales_Daybook' ,voucher_code:'HTL',voucher_code_s31:'HDV',voucher_code_s32:'HDB'} },
    //Số chi tiết công nợ phải thu (Accounts Receivable Subsidiary Ledger)
    { path: 'sales/report/accounts-receivable-subsidiary-ledger-list', component: AccountsReceivableSubsidiaryLedgerListComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'SALES_Report_Accounts_Receivable_Subsidiary_Ledger' } },
    //Báo cáo cấu hình theo hóa đơn
    { path: 'sales/configuration-report-by-sales-invoices', component: ConfigurationReportBySalesInvoicesComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'Sales_CAT_Goods_Configuration_Report',voucher_code_s32:'HDB' } },
    
    { path: 'payables/accounts-receivable-ledger-report', component: AccountsReceivableLedgerComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'SALE_Accounts_Receivable_Ledger_Search',voucher_code_s32:'' } },
    { path: 'payables/the-detailed-accounts-receivable-ledger-by-invoice-report', component: TheDetailedAccountsReceivableLedgerByInvoiceComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'SALE_The_detailed_Accounts_Receivable_Ledger_By_Invoice_Search',voucher_code_s32:'' } },
    { path: 'payables/statement-of-changes-in-financial-position-report', component: StatementOfChangesInFinancialPositionComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'SALE_Statement_Of_Changes_In_Financial_Position_Search',voucher_code_s32:'' } },
    { path: 'payables/year-end-balance-sheet-compilation-report', component: YearEndBalanceSheetCompilationComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'SALE_Year_End_Balance_Sheet_Compilation_Search',voucher_code_s32:'' } },
    
]

@NgModule({
    declarations: [
        S32MListComponent,
        S32MEditComponent,
        S33MListComponent,
        S33MEditComponent,
        ContractEditComponent,
        ContractListComponent,
        CustomerListComponent,
        CustomerEditComponent,
        CustomerGroupListComponent,
        CustomerGroupEditComponent,
        WarrantyCertificateListComponent,
        WarrantyCertificateEditComponent,
        S31MListComponent,
        S31MEditComponent,
        S34MEditComponent,
        S34MListComponent,
        ReportOnSalesInvoicesListComponent,
        ReportOfGoodsReturnNoteListComponent,
        SalesRevenueReportListComponent,
        MerchandiseGrossProfitReportListComponent,
        SalesDayBookListComponent,
        AccountsReceivableSubsidiaryLedgerListComponent,
        EmployeeSalesComponent,
        EmployeeSalesEditComponent,
        ConfigurationReportBySalesInvoicesComponent,
        EmployeeSalesAddComponent,
        AccountsReceivableLedgerComponent,
        TheDetailedAccountsReceivableLedgerByInvoiceComponent,
        StatementOfChangesInFinancialPositionComponent,
        YearEndBalanceSheetCompilationComponent,
        S35MEditComponent,
        S35MListComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        RouterModule.forRoot(drawerRoutes),
        CookieModule.forRoot(),
        ShareModule,
        DxButtonModule
    ],
    exports: [
        S32MListComponent,
        S32MEditComponent,
        S33MListComponent,
        S33MEditComponent,
        AccountsReceivableLedgerComponent
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
        SalesReportService,
        CashReportService
    ],
    bootstrap: [AppComponent]
})
export class SalesModule { }