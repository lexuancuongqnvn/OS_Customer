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
import { GoodsIssueComponent } from './goods-issue/goods-issue.component';
import { SkuComponent } from './sku/sku.component';
import { AppConsts } from '../app-consts.component';
import { EditPageState } from '../shared/ultilities/enum/edit-page-state';
import { I42MEditComponent } from './voucher/I42/i42-m-edit/i42-m-edit.component';
import { WarehouseComponent } from './category/warehouse/warehouse.component';
import { WarehouseEditComponent } from './category/warehouse/warehouse-edit/warehouse-edit.component';
import { GoodsGroupComponent } from './category/goods-group/goods-group.component';
import { GoodsGroupEditComponent } from './category/goods-group/goods-group-edit/goods-group-edit.component';
import { GoodsUnitComponent } from './category/goods-unit/goods-unit.component';
import { GoodsUnitEditComponent } from './category/goods-unit/goods-unit-edit/goods-unit-edit.component';
import { GoodsComponent } from './category/goods/goods.component';
import { GoodsEditComponent } from './category/goods/goods-edit/goods-edit.component';
import { I44MListComponent } from './voucher/i44/i44-m-list/i44-m-list.component';
import { I44MEditComponent } from './voucher/i44/i44-m-edit/i44-m-edit.component';
import { ObInputOutputInventoryViewComponent } from './opening-balance/ob-input-output-inventory/ob-input-output-inventory-view/ob-input-output-inventory-view.component';
import { ObInputOutputInventoryEditComponent } from './opening-balance/ob-input-output-inventory/ob-input-output-inventory-edit/ob-input-output-inventory-edit.component';
import { ObGoodsViewComponent } from './opening-balance/ob-goods/ob-goods-view/ob-goods-view.component';
import { ObGoodsEditComponent } from './opening-balance/ob-goods/ob-goods-edit/ob-goods-edit.component';
import { I43MListComponent } from './voucher/i43/i43-m-list/i43-m-list.component';
import { I43MEditComponent } from './voucher/i43/i43-m-edit/i43-m-edit.component';
import { I41MEditComponent } from './voucher/i41/i41-m-edit/i41-m-edit.component';
import { I41MListComponent } from './voucher/i41/i41-m-list/i41-m-list.component';
import { I45MListComponent } from './voucher/i45/i45-m-list/i45-m-list.component';
import { I45MEditComponent } from './voucher/i45/i45-m-edit/i45-m-edit.component';
import { I45DamagedToolsEquipmentEditComponent } from './voucher/i45-damaged-tools-equipment/i45-damaged-tools-equipment-edit/i45-damaged-tools-equipment-edit.component';
import { I45DamagedToolsEquipmentListComponent } from './voucher/i45-damaged-tools-equipment/i45-damaged-tools-equipment-list/i45-damaged-tools-equipment-list.component';
import { GoodsUnitConversionFactorListComponent } from './category/goods-unit-conversion-factor/goods-unit-conversion-factor-list/goods-unit-conversion-factor-list.component';
import { GoodsUnitConversionFactorEditComponent } from './category/goods-unit-conversion-factor/goods-unit-conversion-factor-edit/goods-unit-conversion-factor-edit.component';
import { I42MComponent } from './voucher/I42/i42-m-list/i42-m.component';
import { GoodsReportListComponent } from './report/goods-report/goods-report-list/goods-report-list.component';
import { ReportInventoryListComponent } from './report-inventory/report-inventory-list/report-inventory-list.component';
import { ReportI45ListComponent } from './report/report-i45/report-i45-list/report-i45-list.component';
import { ReportI45EditComponent } from './report/report-i45/report-i45-edit/report-i45-edit.component';
import { ReportI44ListComponent } from './report/report-i44/report-i44-list/report-i44-list.component';
import { ReportI44EditComponent } from './report/report-i44/report-i44-edit/report-i44-edit.component';
import { ReportI43ListComponent } from './report/report-i43/report-i43-list/report-i43-list.component';
import { ReportI43EditComponent } from './report/report-i43/report-i43-edit/report-i43-edit.component';
import { ReportI42ListComponent } from './report/report-i42/report-i42-list/report-i42-list.component';
import { ReportI42EditComponent } from './report/report-i42/report-i42-edit/report-i42-edit.component';
import { ReportI41ListComponent } from './report/report-i41/report-i41-list/report-i41-list.component';
import { ReportI41EditComponent } from './report/report-i41/report-i41-edit/report-i41-edit.component';
import { ReportAllocationListComponent } from './report/report-allocation/report-allocation-list/report-allocation-list.component';
import { ReportAllocationEditComponent } from './report/report-allocation/report-allocation-edit/report-allocation-edit.component';
import { PrepaidExpenseAllocationListComponent } from './report/prepaid-expense-allocation/prepaid-expense-allocation-list/prepaid-expense-allocation-list.component';
import { PrepaidExpenseAllocationEditComponent } from './report/prepaid-expense-allocation/prepaid-expense-allocation-edit/prepaid-expense-allocation-edit.component';
import { DxDataGridModule } from 'devextreme-angular';
import { ReportInventoryMaterialLedgerListComponent } from './report/report-inventory-material-ledger/report-inventory-material-ledger-list/report-inventory-material-ledger-list.component';
import { ReportInventoryBookDetailListComponent } from './report/report-inventory-book-detail/report-inventory-book-detail-list/report-inventory-book-detail-list.component';
import { ReportInventoryByWarehouseListComponent } from './report/report-inventory-by-warehouse/report-inventory-by-warehouse-list/report-inventory-by-warehouse-list.component';
import { ReportInventoryImportExportListComponent } from './report/report-inventory-import-export/report-inventory-import-export-list/report-inventory-import-export-list.component';
import { ReportInventoryIncomingSummaryListComponent } from './report/report-inventory-incoming-summary/report-inventory-incoming-summary-list/report-inventory-incoming-summary-list.component';
import { ReportInventoryIssuedSummaryListComponent } from './report/report-inventory-issued-summary/report-inventory-issued-summary-list/report-inventory-issued-summary-list.component';
import { ReportGoodsImportListComponent } from './report/report-goods-import/report-goods-import-list/report-goods-import-list.component';

const drawerRoutes = [
    { path: 'sku', component: SkuComponent },

    { path: 'warehouse/goods-group', component: GoodsGroupComponent, data: {editPageState: EditPageState.view,tbName:'CAT_Goods_Group' } },
    { path: 'warehouse/goods-group-add', component: GoodsGroupEditComponent, data: {editPageState: EditPageState.add,tbName:'CAT_Goods_Group' } },
    { path: 'warehouse/goods-group-edit', component: GoodsGroupEditComponent, data: {editPageState: EditPageState.edit,tbName:'CAT_Goods_Group' } },
    { path: 'warehouse/goods-group-view-detail', component: GoodsGroupEditComponent, data: {editPageState: EditPageState.viewDetail,tbName:'CAT_Goods_Group' } },
    
    { path: 'warehouse/finished-goods-receipt-from-production', component: I41MListComponent, data: {editPageState: EditPageState.view ,tbName:'I41_M',voucher_code:'NSX'} },
    { path: 'warehouse/finished-goods-receipt-from-production-add', component: I41MEditComponent, data: {editPageState: EditPageState.add ,tbName:'I41_M',voucher_code:'NSX'} },
    { path: 'warehouse/finished-goods-receipt-from-production-edit', component: I41MEditComponent, data: {editPageState: EditPageState.edit ,tbName:'I41_M',voucher_code:'NSX'} },
    { path: 'warehouse/finished-goods-receipt-from-production-view-detail', component: I41MEditComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'I41_M',voucher_code:'NSX'} },

    { path: 'warehouse/goods-received-note', component: I42MComponent, data: {editPageState: EditPageState.view ,tbName:'I42_M',voucher_code:'PNH'} },
    { path: 'warehouse/goods-received-note-add', component: I42MEditComponent, data: {editPageState: EditPageState.add ,tbName:'I42_M',voucher_code:'PNH'} },
    { path: 'warehouse/goods-received-note-edit', component: I42MEditComponent, data: {editPageState: EditPageState.edit ,tbName:'I42_M',voucher_code:'PNH'} },
    { path: 'warehouse/goods-received-note-view-detail', component: I42MEditComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'I42_M',voucher_code:'PNH'} },

    { path: 'warehouse/goods-delivery-note', component: I43MListComponent, data: {editPageState: EditPageState.view ,tbName:'I43_M',voucher_code:'PXK'} },
    { path: 'warehouse/goods-delivery-note-add', component: I43MEditComponent, data: {editPageState: EditPageState.add ,tbName:'I43_M',voucher_code:'PXK'} },
    { path: 'warehouse/goods-delivery-note-edit', component: I43MEditComponent, data: {editPageState: EditPageState.edit ,tbName:'I43_M',voucher_code:'PXK'} },
    { path: 'warehouse/goods-delivery-note-view-detail', component: I43MEditComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'I43_M',voucher_code:'PXK'} },

    { path: 'warehouse/goods-transfer', component: I44MListComponent, data: {editPageState: EditPageState.view ,tbName:'I44_M',voucher_code:'PDC'} },
    { path: 'warehouse/goods-transfer-add', component: I44MEditComponent, data: {editPageState: EditPageState.add ,tbName:'I44_M',voucher_code:'PDC'} },
    { path: 'warehouse/goods-transfer-edit', component: I44MEditComponent, data: {editPageState: EditPageState.edit ,tbName:'I44_M',voucher_code:'PDC'} },
    { path: 'warehouse/goods-transfer-view-detail', component: I44MEditComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'I44_M',voucher_code:'PDC'} },

    { path: 'warehouse/goods-delivery-note-tools-equipment', component: I45MListComponent, data: {editPageState: EditPageState.view ,tbName:'I45_M',voucher_code:'PXC'} },
    { path: 'warehouse/goods-delivery-note-tools-equipment-add', component: I45MEditComponent, data: {editPageState: EditPageState.add ,tbName:'I45_M',voucher_code:'PXC'} },
    { path: 'warehouse/goods-delivery-note-tools-equipment-edit', component: I45MEditComponent, data: {editPageState: EditPageState.edit ,tbName:'I45_M',voucher_code:'PXC'} },
    { path: 'warehouse/goods-delivery-note-tools-equipment-view-detail', component: I45MEditComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'I45_M',voucher_code:'PXC'} },
    
    { path: 'damaged-tools-equipment', component: I45DamagedToolsEquipmentListComponent, data: {editPageState: EditPageState.view ,tbName:'I45_Damaged_Tools_Equipment',voucher_code:'PXC'} },
    { path: 'damaged-tools-equipment-add', component: I45DamagedToolsEquipmentEditComponent, data: {editPageState: EditPageState.add ,tbName:'I45_Damaged_Tools_Equipment',voucher_code:'PXC'} },
    { path: 'damaged-tools-equipment-edit', component: I45DamagedToolsEquipmentEditComponent, data: {editPageState: EditPageState.edit ,tbName:'I45_Damaged_Tools_Equipment',voucher_code:'PXC'} },
    { path: 'damaged-tools-equipment-view-detail', component: I45DamagedToolsEquipmentEditComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'I45_Damaged_Tools_Equipment',voucher_code:'PXC'} },

    { path: 'warehouse/goods-unit', component: GoodsUnitComponent, data: {editPageState: EditPageState.view ,tbName:'CAT_Goods_Unit'} },
    { path: 'warehouse/goods-unit-add', component: GoodsUnitEditComponent, data: {editPageState: EditPageState.add,tbName:'CAT_Goods_Unit' } },
    { path: 'warehouse/goods-unit-edit', component: GoodsUnitEditComponent, data: {editPageState: EditPageState.edit ,tbName:'CAT_Goods_Unit'} },
    
    { path: 'warehouse/goods-unit-conversion-factor', component: GoodsUnitConversionFactorListComponent, data: {editPageState: EditPageState.view ,tbName:'CAT_Goods_Unit_Conversion_Factor'} },
    { path: 'warehouse/goods-unit-conversion-factor-add', component: GoodsUnitConversionFactorEditComponent, data: {editPageState: EditPageState.add,tbName:'CAT_Goods_Unit_Conversion_Factor' } },
    { path: 'warehouse/goods-unit-conversion-factor-edit', component: GoodsUnitConversionFactorEditComponent, data: {editPageState: EditPageState.edit ,tbName:'CAT_Goods_Unit_Conversion_Factor'} },
    { path: 'warehouse/goods-unit-conversion-factor-view-detail', component: GoodsUnitConversionFactorEditComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'CAT_Goods_Unit_Conversion_Factor'} },
 
    { path: 'warehouse/category-warehouse', component: WarehouseComponent, data: {editPageState: EditPageState.view ,tbName:'CAT_Warehouse'} },
    { path: 'warehouse/category-warehouse-add', component: WarehouseEditComponent, data: {editPageState: EditPageState.add ,tbName:'CAT_Warehouse'} },
    { path: 'warehouse/category-warehouse-edit', component: WarehouseEditComponent, data: {editPageState: EditPageState.edit ,tbName:'CAT_Warehouse'} },
    { path: 'warehouse/category-warehouse-view-detail', component: WarehouseEditComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'CAT_Warehouse'} },
 
    { path: 'warehouse/goods', component: GoodsComponent, data: {editPageState: EditPageState.view ,tbName:'CAT_Goods'} },
    { path: 'warehouse/goods-add', component: GoodsEditComponent, data: {editPageState: EditPageState.add ,tbName:'CAT_Goods' } },
    { path: 'warehouse/goods-edit', component: GoodsEditComponent, data: {editPageState: EditPageState.edit ,tbName:'CAT_Goods' } },
    { path: 'warehouse/goods-view-detail', component: GoodsEditComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'CAT_Goods' } },

    { path: 'warehouse/opening-balance-input-output-inventory', component: ObInputOutputInventoryViewComponent, data: {editPageState: EditPageState.view ,tbName:'OB_Input_Output_Inventory'} },
    { path: 'warehouse/opening-balance-input-output-inventory-add', component: ObInputOutputInventoryEditComponent, data: {editPageState: EditPageState.add ,tbName:'OB_Input_Output_Inventory'} },
    { path: 'warehouse/opening-balance-input-output-inventory-edit', component: ObInputOutputInventoryEditComponent, data: {editPageState: EditPageState.edit ,tbName:'OB_Input_Output_Inventory'} },
    { path: 'warehouse/opening-balance-input-output-inventory-view-detail', component: ObInputOutputInventoryEditComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'OB_Input_Output_Inventory'} },

    { path: 'warehouse/opening-balance-goods', component: ObGoodsViewComponent, data: {editPageState: EditPageState.view ,tbName:'OB_Goods'} },
    { path: 'warehouse/opening-balance-goods-add', component: ObGoodsEditComponent, data: {editPageState: EditPageState.add ,tbName:'OB_Goods'} },
    { path: 'warehouse/opening-balance-goods-edit', component: ObGoodsEditComponent, data: {editPageState: EditPageState.edit ,tbName:'OB_Goods'} },
    { path: 'warehouse/opening-balance-goods-view-detail', component: ObGoodsEditComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'OB_Goods'} },

    { path: 'warehouse/goods-report', component: GoodsReportListComponent, data: {editPageState: EditPageState.view ,tbName:'WMS_Report_Inventory_Movement'} },

    { path: 'warehouse/report-inventory', component: ReportInventoryListComponent, data: {editPageState: EditPageState.view ,tbName:'WMS_Report_Inventory'} },
    { path: 'warehouse/goods-delivery-note-tools-equipment-report', component: ReportI45ListComponent, data: {editPageState: EditPageState.view ,tbName:'WMS_Report_I45_Search',voucher_code:'PXC'} },
    { path: 'warehouse/transfer-voucher-report', component: ReportI44ListComponent, data: {editPageState: EditPageState.view ,tbName:'WMS_Report_I44_Search',voucher_code:'PDC'} },
    { path: 'warehouse/inventory-issue-report', component: ReportI43ListComponent, data: {editPageState: EditPageState.view ,tbName:'WMS_Report_I43_Search',voucher_code:'NSX'} },
    { path: 'warehouse/inventory-receipt-report', component: ReportI42ListComponent, data: {editPageState: EditPageState.view ,tbName:'WMS_Report_I42_Search'} },
    { path: 'warehouse/finished-goods-receipt-report', component: ReportI41ListComponent, data: {editPageState: EditPageState.view ,tbName:'WMS_Report_I41_Search'} },
    { path: 'warehouse/report-allocation', component: ReportAllocationListComponent, data: {editPageState: EditPageState.view ,tbName:'WMS_Report_Allocation_Search'} },
    { path: 'warehouse/prepaid-expense-allocation', component: PrepaidExpenseAllocationListComponent, data: {editPageState: EditPageState.view ,tbName:'WMS_Prepaid_Expense_Allocation'} },
    { path: 'warehouse/prepaid-expense-allocation-edit', component: PrepaidExpenseAllocationEditComponent, data: {editPageState: EditPageState.view ,tbName:'WMS_Prepaid_Expense_Allocation'} },

    { path: 'warehouse/inventory-material-ledger', component: ReportInventoryMaterialLedgerListComponent, data: {editPageState: EditPageState.view ,tbName:'WMS_Report_Inventory_Material_Ledger'} },
    { path: 'warehouse/inventory-book-detail', component: ReportInventoryBookDetailListComponent, data: {editPageState: EditPageState.view ,tbName:'WMS_Report_Inventory_Book_Detail'} },
    { path: 'warehouse/inventory-by-warehouse', component: ReportInventoryByWarehouseListComponent, data: {editPageState: EditPageState.view ,tbName:'WMS_Report_Inventory_By_Warehouse'} },
    { path: 'warehouse/inventory-import-export', component: ReportInventoryImportExportListComponent, data: {editPageState: EditPageState.view ,tbName:'WMS_Report_Inventory_Import_Export'} },
    { path: 'warehouse/goods-import', component: ReportGoodsImportListComponent, data: {editPageState: EditPageState.view ,tbName:'WMS_Report_Goods_Import'} },
    { path: 'warehouse/inventory-incoming-summary', component: ReportInventoryIncomingSummaryListComponent, data: {editPageState: EditPageState.view ,tbName:'WMS_Report_Inventory_Incoming_Summary'} },
    { path: 'warehouse/inventory-issued-summary', component: ReportInventoryIssuedSummaryListComponent, data: {editPageState: EditPageState.view ,tbName:'WMS_Report_Inventory_Issued_Summary'} },

];

@NgModule({
    declarations: [
        GoodsIssueComponent,
        SkuComponent,
        GoodsGroupComponent,
        GoodsGroupEditComponent,
        I42MComponent,
        I42MEditComponent,
        I44MListComponent,
        I44MEditComponent,
        GoodsUnitComponent,
        GoodsUnitEditComponent,
        WarehouseComponent,
        WarehouseEditComponent,
        GoodsComponent,
        GoodsEditComponent,
        ObInputOutputInventoryViewComponent,
        ObInputOutputInventoryEditComponent,
        ObGoodsViewComponent,
        ObGoodsEditComponent,
        I43MListComponent,
        I43MEditComponent,
        I41MEditComponent,
        I41MListComponent,
        I45MListComponent,
        I45MEditComponent,
        I45DamagedToolsEquipmentEditComponent,
        I45DamagedToolsEquipmentListComponent,
        GoodsUnitConversionFactorListComponent,
        GoodsUnitConversionFactorEditComponent,
        GoodsReportListComponent,
        ReportInventoryListComponent,
        ReportI45ListComponent,
        ReportI45EditComponent,
        ReportI44ListComponent,
        ReportI44EditComponent,
        ReportI43ListComponent,
        ReportI43EditComponent,
        ReportI42ListComponent,
        ReportI42EditComponent,
        ReportI41ListComponent,
        ReportI41EditComponent,
        ReportAllocationListComponent,
        ReportAllocationEditComponent,
        PrepaidExpenseAllocationListComponent,
        PrepaidExpenseAllocationEditComponent,
        ReportInventoryBookDetailListComponent,
        ReportInventoryMaterialLedgerListComponent,
        ReportInventoryByWarehouseListComponent,
        ReportInventoryImportExportListComponent,
        ReportInventoryIncomingSummaryListComponent,
        ReportInventoryIssuedSummaryListComponent,
        ReportGoodsImportListComponent
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
export class WarehouseModule { }
