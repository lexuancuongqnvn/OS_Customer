import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeWorkProcedureComponent } from './employee-work-procedure.component';

describe('EmployeeWorkProcedureComponent', () => {
  let component: EmployeeWorkProcedureComponent;
  let fixture: ComponentFixture<EmployeeWorkProcedureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeWorkProcedureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeWorkProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
