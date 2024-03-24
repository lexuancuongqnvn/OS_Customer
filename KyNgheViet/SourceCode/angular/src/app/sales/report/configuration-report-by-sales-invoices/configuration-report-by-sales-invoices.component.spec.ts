import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationReportBySalesInvoicesComponent } from './configuration-report-by-sales-invoices.component';

describe('ConfigurationReportBySalesInvoicesComponent', () => {
  let component: ConfigurationReportBySalesInvoicesComponent;
  let fixture: ComponentFixture<ConfigurationReportBySalesInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigurationReportBySalesInvoicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationReportBySalesInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
