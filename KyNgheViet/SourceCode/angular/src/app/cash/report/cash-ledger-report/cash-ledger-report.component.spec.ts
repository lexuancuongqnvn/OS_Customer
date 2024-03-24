import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashLedgerReportComponent } from './cash-ledger-report.component';

describe('CashLedgerReportComponent', () => {
  let component: CashLedgerReportComponent;
  let fixture: ComponentFixture<CashLedgerReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashLedgerReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashLedgerReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
