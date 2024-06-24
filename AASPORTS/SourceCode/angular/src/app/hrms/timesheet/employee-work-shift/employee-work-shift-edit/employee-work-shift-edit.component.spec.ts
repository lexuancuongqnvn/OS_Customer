import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeWorkShiftEditComponent } from './employee-work-shift-edit.component';

describe('EmployeeWorkShiftEditComponent', () => {
  let component: EmployeeWorkShiftEditComponent;
  let fixture: ComponentFixture<EmployeeWorkShiftEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeWorkShiftEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeWorkShiftEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
