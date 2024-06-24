import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSalaryByAttendanceReportComponent } from './employee-salary-by-attendance-report.component';

describe('EmployeeSalaryByAttendanceReportComponent', () => {
  let component: EmployeeSalaryByAttendanceReportComponent;
  let fixture: ComponentFixture<EmployeeSalaryByAttendanceReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeSalaryByAttendanceReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSalaryByAttendanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
