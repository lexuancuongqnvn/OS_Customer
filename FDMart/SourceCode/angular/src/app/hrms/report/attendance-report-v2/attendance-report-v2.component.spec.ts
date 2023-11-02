import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceReportV2Component } from './attendance-report-v2.component';

describe('AttendanceReportV2Component', () => {
  let component: AttendanceReportV2Component;
  let fixture: ComponentFixture<AttendanceReportV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceReportV2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceReportV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
