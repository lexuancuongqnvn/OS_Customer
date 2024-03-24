import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeWorkShiftListComponent } from './employee-work-shift-list.component';

describe('EmployeeWorkShiftListComponent', () => {
  let component: EmployeeWorkShiftListComponent;
  let fixture: ComponentFixture<EmployeeWorkShiftListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeWorkShiftListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeWorkShiftListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
