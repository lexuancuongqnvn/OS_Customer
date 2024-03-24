import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSalaryByAttendanceReportV2Component } from './employee-salary-by-attendance-report-v2.component';

describe('EmployeeSalaryByAttendanceReportV2Component', () => {
  let component: EmployeeSalaryByAttendanceReportV2Component;
  let fixture: ComponentFixture<EmployeeSalaryByAttendanceReportV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeSalaryByAttendanceReportV2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSalaryByAttendanceReportV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
