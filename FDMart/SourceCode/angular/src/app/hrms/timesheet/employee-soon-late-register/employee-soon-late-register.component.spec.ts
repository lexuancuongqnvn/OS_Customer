import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSoonLateRegisterComponent } from './employee-soon-late-register.component';

describe('EmployeeSoonLateRegisterComponent', () => {
  let component: EmployeeSoonLateRegisterComponent;
  let fixture: ComponentFixture<EmployeeSoonLateRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeSoonLateRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSoonLateRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
