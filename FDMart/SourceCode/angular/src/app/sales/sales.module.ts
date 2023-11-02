import { LOCALE_ID, NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { CookieModule } from "ngx-cookie";
import { AppConsts } from "../app-consts.component";
import { AppRoutingModule } from "../app-routing.module";
import { AppComponent } from "../app.component";
import { API_BASE_URL, SalesCategoryService, SalesVATService, SalesVoucherService } from "../shared/service-proxies/api-shared";
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
        S34MListComponent
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
        SalesCategoryService 
    ],
    bootstrap: [AppComponent]
})
export class SalesModule { }