import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePurchasePnvoiceReportComponent } from './service-purchase-pnvoice-report.component';

describe('ServicePurchasePnvoiceReportComponent', () => {
  let component: ServicePurchasePnvoiceReportComponent;
  let fixture: ComponentFixture<ServicePurchasePnvoiceReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicePurchasePnvoiceReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicePurchasePnvoiceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
