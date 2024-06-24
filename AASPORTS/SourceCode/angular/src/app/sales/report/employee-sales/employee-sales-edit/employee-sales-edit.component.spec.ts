import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSalesEditComponent } from './employee-sales-edit.component';

describe('EmployeeSalesEditComponent', () => {
  let component: EmployeeSalesEditComponent;
  let fixture: ComponentFixture<EmployeeSalesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeSalesEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSalesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
