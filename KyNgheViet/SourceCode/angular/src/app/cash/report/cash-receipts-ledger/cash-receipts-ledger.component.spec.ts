import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashReceiptsLedgerComponent } from './cash-receipts-ledger.component';

describe('CashReceiptsLedgerComponent', () => {
  let component: CashReceiptsLedgerComponent;
  let fixture: ComponentFixture<CashReceiptsLedgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashReceiptsLedgerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashReceiptsLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
