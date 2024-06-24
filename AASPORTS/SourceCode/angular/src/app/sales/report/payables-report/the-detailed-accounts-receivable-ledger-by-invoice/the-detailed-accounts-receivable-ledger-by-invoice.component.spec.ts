import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheDetailedAccountsReceivableLedgerByInvoiceComponent } from './the-detailed-accounts-receivable-ledger-by-invoice.component';

describe('TheDetailedAccountsReceivableLedgerByInvoiceComponent', () => {
  let component: TheDetailedAccountsReceivableLedgerByInvoiceComponent;
  let fixture: ComponentFixture<TheDetailedAccountsReceivableLedgerByInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheDetailedAccountsReceivableLedgerByInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TheDetailedAccountsReceivableLedgerByInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
