import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeMissionAllowanceComponent } from './employee-mission-allowance.component';

describe('EmployeeMissionAllowanceComponent', () => {
  let component: EmployeeMissionAllowanceComponent;
  let fixture: ComponentFixture<EmployeeMissionAllowanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeMissionAllowanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeMissionAllowanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
