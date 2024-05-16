import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregateCostCouponPrintComponent } from './aggregate-cost-coupon-print.component';

describe('AggregateCostCouponPrintComponent', () => {
  let component: AggregateCostCouponPrintComponent;
  let fixture: ComponentFixture<AggregateCostCouponPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggregateCostCouponPrintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggregateCostCouponPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
