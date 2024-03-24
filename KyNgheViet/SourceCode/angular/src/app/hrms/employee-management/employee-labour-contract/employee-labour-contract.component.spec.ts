import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeLabourContractComponent } from './employee-labour-contract.component';

describe('EmployeeLabourContractComponent', () => {
  let component: EmployeeLabourContractComponent;
  let fixture: ComponentFixture<EmployeeLabourContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeLabourContractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeLabourContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
