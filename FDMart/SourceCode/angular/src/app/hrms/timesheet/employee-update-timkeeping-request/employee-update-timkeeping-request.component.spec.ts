import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeUpdateTimkeepingRequestComponent } from './employee-update-timkeeping-request.component';

describe('EmployeeUpdateTimkeepingRequestComponent', () => {
  let component: EmployeeUpdateTimkeepingRequestComponent;
  let fixture: ComponentFixture<EmployeeUpdateTimkeepingRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeUpdateTimkeepingRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeUpdateTimkeepingRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
