import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsPayableReportByInvoiceComponent } from './accounts-payable-report-by-invoice.component';

describe('AccountsPayableReportByInvoiceComponent', () => {
  let component: AccountsPayableReportByInvoiceComponent;
  let fixture: ComponentFixture<AccountsPayableReportByInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsPayableReportByInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsPayableReportByInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
