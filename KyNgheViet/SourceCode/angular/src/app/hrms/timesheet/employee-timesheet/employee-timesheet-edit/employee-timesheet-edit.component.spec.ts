import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTimesheetEditComponent } from './employee-timesheet-edit.component';

describe('EmployeeTimesheetEditComponent', () => {
  let component: EmployeeTimesheetEditComponent;
  let fixture: ComponentFixture<EmployeeTimesheetEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeTimesheetEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeTimesheetEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
