import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTimesheetListComponent } from './employee-timesheet-list.component';

describe('EmployeeTimesheetListComponent', () => {
  let component: EmployeeTimesheetListComponent;
  let fixture: ComponentFixture<EmployeeTimesheetListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeTimesheetListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeTimesheetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
