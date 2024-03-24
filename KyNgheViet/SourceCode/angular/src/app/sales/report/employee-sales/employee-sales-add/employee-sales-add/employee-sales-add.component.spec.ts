import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSalesAddComponent } from './employee-sales-add.component';

describe('EmployeeSalesAddComponent', () => {
  let component: EmployeeSalesAddComponent;
  let fixture: ComponentFixture<EmployeeSalesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeSalesAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSalesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
