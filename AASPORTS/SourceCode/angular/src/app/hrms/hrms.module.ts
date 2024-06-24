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
import {
  ExcelModule,
  GridModule,
  PDFModule,
} from '@progress/kendo-angular-grid';
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
import { FilePickerComponent } from '../shared/layout/input-control/file-picker/file-picker.component';
import { DialogAcctionComponent } from '../shared/layout/dialogs/acction/dialog-acction.component';
import { InputAddComponent } from '../shared/layout/input-control/input-add/input-add.component';
import { MycurrencyPipe } from '../shared/layout/layoutBase';
import {
  AcctionService,
  API_BASE_URL,
  ERPCommonService,
  FaceAPIService,
  HRM_BranchService,
  HRM_WorkingTimeService,
  ProjectManagementService,
  TimeSheetService,
  WarrantyService,
  WMSCategoryService,
  WMSReportService,
  WorkspaceService,
} from '../shared/service-proxies/api-shared';
import { ToolbarComponent } from '../shared/layout/toolbar/toolbar.component';
import { AppModule } from '../app.module';
import { ShareModule } from '../shared/shared.module';
import { DashboardHomeComponent } from '../plugin/dashboard/dashboard-home/dashboard-home.component';
import {
  HashLocationStrategy,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import { CalendarMonth1Component } from './calendar/calendar-month-1/calendar-month-1.component';
import { CalendarMonthViewDetailComponent } from './calendar/calendar-month-view-detail/calendar-month-view-detail.component';
import { CalendarMonthAddEditComponent } from './calendar/calendar-month-add-edit/calendar-month-add-edit.component';
import { CalendarMonthListComponent } from './calendar/calendar-month-list/calendar-month-list.component';
import { EditPageState } from '../shared/ultilities/enum/edit-page-state';
import { WorkflowManagementListComponent } from './workflow-management/workflow-management-list/workflow-management-list.component';
import { WorkflowManagementAddEditComponent } from './workflow-management/workflow-management-add-edit/workflow-management-add-edit.component';
import { WorkflowManagementViewDetailComponent } from './workflow-management/workflow-management-view-detail/workflow-management-view-detail.component';
import { ProjectManagementListComponent } from './project-management/project-management-list/project-management-list.component';
import { ProjectManagementEditComponent } from './project-management/project-management-edit/project-management-edit.component';
import { TaskManagementListComponent } from './project-management/task-management-list/task-management-list.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { WorkTimeComponent } from './work-time/work-time/work-time.component';
import { TimesheetComponent } from './work-time/timesheet/timesheet.component';
import { DepartmentComponent } from './category/department/department.component';
import { PriorityLevelComponent } from './category/priority-level/priority-level.component';
import { TypeOfIssueComponent } from './category/type-of-issue/type-of-issue.component';
import { AppConsts } from '../app-consts.component';
import { WorkShiftComponent } from './timesheet/work-shift/work-shift.component';
import { EmployeeWorkShiftListComponent } from './timesheet/employee-work-shift/employee-work-shift-list/employee-work-shift-list.component';
import { EmployeeWorkShiftEditComponent } from './timesheet/employee-work-shift/employee-work-shift-edit/employee-work-shift-edit.component';
import { CheckInOutComponent } from './check-in-out/check-in-out.component';
import { WebcamModule } from 'ngx-webcam';
import { FaceidSettingComponent } from './check-in-out/faceid-setting/faceid-setting.component';
import { EmployeeAttendanceComponent } from './timesheet/employee-attendance/employee-attendance.component';
import { EmployeeSoonLateRegisterComponent } from './timesheet/employee-soon-late-register/employee-soon-late-register.component';
import { EmployeeInfoComponent } from './employee-management/employee-info/employee-info.component';
import { EmployeeMissionAllowanceComponent } from './timesheet/employee-mission-allowance/employee-mission-allowance.component';
import { EmployeeLabourContractComponent } from './employee-management/employee-labour-contract/employee-labour-contract.component';
import { EmployeeWorkProcedureComponent } from './employee-management/employee-work-procedure/employee-work-procedure.component';
import { EmployeeTimesheetListComponent } from './timesheet/employee-timesheet/employee-timesheet-list/employee-timesheet-list.component';
import { EmployeeTimesheetEditComponent } from './timesheet/employee-timesheet/employee-timesheet-edit/employee-timesheet-edit.component';
import { AgmCoreModule } from '@agm/core';
import { ImageCropperModule } from 'ngx-image-cropper';
import { SetupReadyCheckInOutComponent } from './check-in-out/setup-ready/setup-ready-check-in-out/setup-ready-check-in-out.component';
import { EmployeeOvertimeComponent } from './timesheet/employee-overtime/employee-overtime.component';
import { EmployeeUpdateTimkeepingRequestComponent } from './timesheet/employee-update-timkeeping-request/employee-update-timkeeping-request.component';
import { HolidayComponent } from './category/holiday/holiday.component';
import { AttendanceReportComponent } from './report/attendance-report/attendance-report.component';
import { BranchComponent } from './category/branch/branch.component';
import { WarrantyComponent } from './drag-drop/ky-nghe-viet/warranty/warranty.component';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {OverlayModule} from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { WarrantyListComponent } from './warranty/warranty-list/warranty-list.component';
import { FaceApiComponent } from './check-in-out/face-api/face-api.component';
import { EmployeeSalaryByAttendanceReportComponent } from './employee-management/employee-salary-by-attendance-report/employee-salary-by-attendance-report.component';
import { AttendanceReportV2Component } from './report/attendance-report-v2/attendance-report-v2.component';
import { FaceWarningComponent } from './check-in-out/face-warning/face-warning.component';
import { CheckInOutMobileComponent } from './check-in-out/check-in-out-mobile/check-in-out-mobile.component';
import { WorkShiftV2ListComponent } from './timesheet/work-shift-v2/work-shift-v2-list/work-shift-v2-list.component';
import { WorkShiftV2EditComponent } from './timesheet/work-shift-v2/work-shift-v2-edit/work-shift-v2-edit.component';
import { BranchV2EditComponent } from './category/branch-v2/branch-v2-edit/branch-v2-edit.component';
import { BranchV2ListComponent } from './category/branch-v2/branch-v2-list/branch-v2-list.component';
import { HolidayV2ListComponent } from './category/holiday-v2/holiday-v2-list/holiday-v2-list.component';
import { HolidayV2EditComponent } from './category/holiday-v2/holiday-v2-edit/holiday-v2-edit.component';
import { DepartmentV2ListComponent } from './category/department-v2/department-v2-list/department-v2-list.component';
import { DepartmentV2EditComponent } from './category/department-v2/department-v2-edit/department-v2-edit.component';
import { WarrantyCustomerListComponent } from './warranty/warranty-customer/warranty-customer-list/warranty-customer-list.component';
import { WarrantyWarehouseListComponent } from './warranty/warranty-warehouse/warranty-warehouse-list/warranty-warehouse-list.component';
import { EmployeeSalaryByAttendanceReportV2Component } from './employee-management/employee-salary-by-attendance-report-v2/employee-salary-by-attendance-report-v2.component';

const drawerRoutes = [
  { path: 'app', component: DashboardHomeComponent },
  //cuonglx 1/12/2021
  { path: 'calender-month-1', component: CalendarMonth1Component },
  { path: 'calender-month-list', component: CalendarMonthListComponent },
  { path: 'calender-month-edit', component: CalendarMonthAddEditComponent, data: { table: 'HRM_Workspace_Master', key: '', editPageState: EditPageState.edit,}, },
  { path: 'calender-month-add', component: CalendarMonthAddEditComponent, data: { table: 'HRM_Workspace_Master', key: '',  editPageState: EditPageState.add, }, },
  { path: 'calender-month-view-detail', component: CalendarMonthViewDetailComponent,data: { table: 'HRM_Workspace_Master', key: '',editPageState: EditPageState.viewDetail, },},

  //cuonglx 13/12/2021
  { path: 'workflow-management-list',component: WorkflowManagementListComponent, },
  { path: 'workflow-management-edit', component: WorkflowManagementAddEditComponent,data: {table: 'HRM_Workspace_Master',key: '',editPageState: EditPageState.edit,},},
  { path: 'workflow-management-add',component: WorkflowManagementAddEditComponent,data: {table: 'HRM_Workspace_Master',key: '',editPageState: EditPageState.add,},},
  {path: 'workflow-management-view-detail',component: WorkflowManagementViewDetailComponent,data: {table: 'HRM_Workspace_Master',key: '',editPageState: EditPageState.viewDetail,},},

  //cuonglx 03/03/2022
  { path: 'project-manage-list', component: ProjectManagementListComponent },
  {path: 'workflow-management-edit',component: WorkflowManagementAddEditComponent,data: { table: 'HRM_Workspace_Master',key: '',editPageState: EditPageState.edit,},},
  {path: 'workflow-management-add',component: WorkflowManagementAddEditComponent,data: {table: 'HRM_Workspace_Master',key: '',editPageState: EditPageState.add,},},
  {path: 'workflow-management-view-detail', component: WorkflowManagementViewDetailComponent, data: { table: 'HRM_Workspace_Master',key: '',editPageState: EditPageState.viewDetail, },},

  { path: 'task-manage-list', component: TaskManagementListComponent },
  { path: 'work-time', component: WorkTimeComponent },
  { path: 'timesheet', component: TimesheetComponent },

  { path: 'department', component: DepartmentComponent },
  { path: 'type-of-issue', component: TypeOfIssueComponent },
  { path: 'priority-level', component: PriorityLevelComponent },

  { path: 'timesheet/work-shift', component: WorkShiftV2ListComponent, data: {editPageState: EditPageState.view ,tbName:'HRM_TimeSheet_Work_Shift'} },
  { path: 'timesheet/work-shift-add', component: WorkShiftV2EditComponent, data: {editPageState: EditPageState.add ,tbName:'HRM_TimeSheet_Work_Shift'} },
  { path: 'timesheet/work-shift-edit', component: WorkShiftV2EditComponent, data: {editPageState: EditPageState.edit ,tbName:'HRM_TimeSheet_Work_Shift'} },
  { path: 'timesheet/work-shift-view-detail', component: WorkShiftV2EditComponent, data: {editPageState: EditPageState.viewDetail ,tbName:'HRM_TimeSheet_Work_Shift'} },

  { path: 'timesheet/employee-work-shift-list',component: EmployeeWorkShiftListComponent,},
  { path: 'timesheet/employee-work-shift-edit',component: EmployeeWorkShiftEditComponent,data: {table: 'HRM_TimeSheet_Employee_Work_Shift',key: '',editPageState: EditPageState.edit,},},
  { path: 'timesheet/employee-work-shift-view-detail',component: EmployeeWorkShiftEditComponent,data: {table: 'HRM_TimeSheet_Employee_Work_Shift',key: '',editPageState: EditPageState.edit,},},
  { path: 'check-in-out', component: CheckInOutComponent },
  { path: 'check-in-out-app', component: CheckInOutMobileComponent },
  { path: 'check-in-out/faceid-setting', component: FaceidSettingComponent },
  { path: 'employee-info', component: EmployeeInfoComponent },
  //SANGTL 18/07/2022
  { path: 'timesheet/attendance', component: EmployeeAttendanceComponent },
  { path: 'timesheet/employee-mission-allowance', component: EmployeeMissionAllowanceComponent },
  { path: 'timesheet/employee-soon-late-register', component: EmployeeSoonLateRegisterComponent },
  { path: 'employee/labour-contract', component: EmployeeLabourContractComponent },
  { path: 'employee/work-procedure', component: EmployeeWorkProcedureComponent },
  { path: 'employee/timesheet', component: EmployeeTimesheetEditComponent },
  { path: 'check-in-out/set-up-ready', component: SetupReadyCheckInOutComponent }, 
  { path: 'timesheet/overtime-request', component: EmployeeOvertimeComponent },
  { path: 'timesheet/update-timkeeping-request', component: EmployeeUpdateTimkeepingRequestComponent },
  { path: 'holiday', component: HolidayComponent },
  { path: 'hrm/attendance-report', component: AttendanceReportComponent },
  { path: 'hrm/attendance-report-v2', component: AttendanceReportV2Component },
  
  { path: 'hrm/branch', component: BranchComponent },
  // { path: 'hrm/branch', component: BranchV2ListComponent, data: {editPageState: EditPageState.view ,tbName:'HRM_Branch'}  },
  // { path: 'hrm/branch-add', component: BranchV2EditComponent , data: {editPageState: EditPageState.add ,tbName:'HRM_Branch'} },
  // { path: 'hrm/branch-edit', component: BranchV2EditComponent , data: {editPageState: EditPageState.edit ,tbName:'HRM_Branch'} },
  // { path: 'hrm/branch-view-detail', component: BranchV2EditComponent , data: {editPageState: EditPageState.viewDetail ,tbName:'HRM_Branch'} },

  { path: 'hrms/holiday', component: HolidayV2ListComponent, data: {editPageState: EditPageState.view ,tbName:'HRM_Holiday'}  },
  { path: 'hrms/holiday-add', component: HolidayV2EditComponent , data: {editPageState: EditPageState.add ,tbName:'HRM_Holiday'} },
  { path: 'hrms/holiday-edit', component: HolidayV2EditComponent , data: {editPageState: EditPageState.edit ,tbName:'HRM_Holiday'} },
  { path: 'hrms/holiday-view-detail', component: HolidayV2EditComponent , data: {editPageState: EditPageState.viewDetail ,tbName:'HRM_Holiday'} },
 
  { path: 'hrms/department', component: DepartmentV2ListComponent, data: {editPageState: EditPageState.view ,tbName:'Department'}  },
  { path: 'hrms/department-add', component: DepartmentV2EditComponent , data: {editPageState: EditPageState.add ,tbName:'Department'} },
  { path: 'hrms/department-edit', component: DepartmentV2EditComponent , data: {editPageState: EditPageState.edit ,tbName:'Department'} },
  { path: 'hrms/department-view-detail', component: DepartmentV2EditComponent , data: {editPageState: EditPageState.viewDetail ,tbName:'Department'} },

  //Kỹ nghệ việt
  {path:'warehouse/warranty',component:WarrantyComponent},
  {path:'customer/warranty',component:WarrantyComponent},
//  {path:'warranty-warehouse-list',component:WarrantyListComponent},
//  {path:'warranty-customer-list',component:WarrantyListComponent},
{ path: 'warranty-warehouse-list', component: WarrantyWarehouseListComponent, data: {editPageState: EditPageState.view ,tbName:'Warranty_Laptop_List_Warehouse'}  },
{ path: 'warranty-customer-list', component: WarrantyCustomerListComponent, data: {editPageState: EditPageState.view ,tbName:'Warranty_Laptop_List_Customer'}  },

  {path:'face-api',component:FaceApiComponent},
  //Cuong LC
  {path:'face-warning',component:FaceWarningComponent},
  // {path:'hrm/employee-salary-by-attendance-report',component:EmployeeSalaryByAttendanceReportComponent},
  {path:'hrm/employee-salary-by-attendance-report',component:EmployeeSalaryByAttendanceReportV2Component},
];

@NgModule({
  declarations: [
    CalendarMonth1Component,
    CalendarMonthViewDetailComponent,
    CalendarMonthAddEditComponent,
    CalendarMonthListComponent,
    WorkflowManagementListComponent,
    WorkflowManagementAddEditComponent,
    WorkflowManagementViewDetailComponent,
    ProjectManagementListComponent,
    ProjectManagementEditComponent,
    TaskManagementListComponent,
    WorkTimeComponent,
    TimesheetComponent,
    DepartmentComponent,
    PriorityLevelComponent,
    TypeOfIssueComponent,
    WorkShiftComponent,
    EmployeeWorkShiftListComponent,
    EmployeeWorkShiftEditComponent,
    CheckInOutComponent,
    FaceidSettingComponent,
    EmployeeAttendanceComponent,
    EmployeeSoonLateRegisterComponent,
    EmployeeMissionAllowanceComponent,
    EmployeeInfoComponent,
    EmployeeLabourContractComponent,
    EmployeeWorkProcedureComponent,
    EmployeeTimesheetListComponent,
    EmployeeTimesheetEditComponent,
    SetupReadyCheckInOutComponent,
    EmployeeOvertimeComponent,
    EmployeeUpdateTimkeepingRequestComponent,
    HolidayComponent,
    AttendanceReportComponent,
    BranchComponent,
    WarrantyComponent,
    WarrantyListComponent,
    FaceApiComponent,
    EmployeeSalaryByAttendanceReportComponent,
    AttendanceReportV2Component,
    FaceWarningComponent,
    CheckInOutMobileComponent,
    WorkShiftV2ListComponent,
    WorkShiftV2EditComponent,
    BranchV2ListComponent,
    BranchV2EditComponent,
    HolidayV2ListComponent,
    HolidayV2EditComponent,
    DepartmentV2ListComponent,
    DepartmentV2EditComponent,
    WarrantyCustomerListComponent,
    WarrantyWarehouseListComponent,
    EmployeeSalaryByAttendanceReportV2Component
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
    CookieModule.forRoot(),
    NotificationModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDuB4e9twNFIH4KKmHLuATA5s_O7_Y5zlM',
      libraries: ['places']
    }),
    NavigationModule,
    LabelModule,
    WindowModule,
    DialogModule,
    ShareModule,
    AngularEditorModule,
    WebcamModule,
    ImageCropperModule,
    DragDropModule,
    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  exports: [
    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'en-US', //,useClass:HashLocationStrategy
      //provide: LocationStrategy, useClass: HashLocationStrategy
    },
    {
      provide: API_BASE_URL,
      useValue: AppConsts.baseUrl,
    },
    AppComponent,
    AcctionService,
    ToolbarComponent,
    FilePickerComponent,
    InputAddComponent,
    MycurrencyPipe,
    HRM_WorkingTimeService,
    HRM_BranchService,
    WorkspaceService,
    ProjectManagementService,
    TimeSheetService,
    FaceAPIService ,
    WarrantyService,
    WMSReportService,
    WMSCategoryService,
    ERPCommonService
  ],
  bootstrap: [AppComponent],
})
export class HRMSModule {}
