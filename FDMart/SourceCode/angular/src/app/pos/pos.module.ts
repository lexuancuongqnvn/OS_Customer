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
import { AcctionService, API_BASE_URL, ProductService, ToolService, WarehouseService } from '../shared/service-proxies/api-shared';
import { ShareModule } from '../shared/shared.module';
import { ColorComponent } from './category/color/color.component';
import { ExportComponent } from '../shared/core/export/export-component';
import { GiftComponent } from './category/gift/gift.component';
import { GroupProductComponent } from './category/group-product/group-product.component';
import { ProductComponent } from './category/product/product.component';
import { SizeComponent } from './category/size/size.component';
import { UnitComponent } from './category/unit/unit.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SalesComponent } from './sale/sales/sales.component';
import { SalesManagementComponent } from './sale/sales-management/sales-management.component';
import { SalesStatisticsComponent } from './sale/sales-statistics/sales-statistics.component';

const drawerRoutes = [
    { path: 'nhom-hang-hoa', component: GroupProductComponent },
    { path: 'don-vi-tinh', component: UnitComponent },
    { path: 'mau-sac', component: ColorComponent },
    { path: 'kich-thuoc', component: SizeComponent },
    { path: 'qua-tang', component: GiftComponent },
    { path: 'san-pham', component: ProductComponent },
    { path: 'sales', component: SalesComponent },
    { path: 'sales-management', component: SalesManagementComponent },
    { path: 'sales-statistics', component: SalesStatisticsComponent },
];

@NgModule({
    declarations: [
        GroupProductComponent,
        UnitComponent,
        ColorComponent,
        SizeComponent,
        GiftComponent,
        ProductComponent,
        ExportComponent,
        SalesComponent,
        SalesManagementComponent,
        SalesStatisticsComponent,
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
        AngularEditorModule
    ],
    exports: [
    ],
    providers: [
        {
             provide: LOCALE_ID, useValue: 'en-US'//,useClass:HashLocationStrategy 
            //provide: LocationStrategy, useClass: HashLocationStrategy
        },
        {
            provide: API_BASE_URL, useValue: 'https://localhost:44390'
        },
        ProductService ,
    ],
    
    bootstrap: [AppComponent]
})
export class POSModule { }
