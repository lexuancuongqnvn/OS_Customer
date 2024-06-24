import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSalesComponent } from './employee-sales.component';

describe('EmployeeSalesComponent', () => {
  let component: EmployeeSalesComponent;
  let fixture: ComponentFixture<EmployeeSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeSalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
