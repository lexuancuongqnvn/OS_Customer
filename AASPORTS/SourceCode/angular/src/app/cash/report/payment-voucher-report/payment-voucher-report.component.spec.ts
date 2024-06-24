import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentVoucherReportComponent } from './payment-voucher-report.component';

describe('PaymentVoucherReportComponent', () => {
  let component: PaymentVoucherReportComponent;
  let fixture: ComponentFixture<PaymentVoucherReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentVoucherReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentVoucherReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
