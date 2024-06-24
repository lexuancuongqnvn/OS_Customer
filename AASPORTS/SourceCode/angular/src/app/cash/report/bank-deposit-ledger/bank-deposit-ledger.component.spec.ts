import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankDepositLedgerComponent } from './bank-deposit-ledger.component';

describe('BankDepositLedgerComponent', () => {
  let component: BankDepositLedgerComponent;
  let fixture: ComponentFixture<BankDepositLedgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankDepositLedgerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankDepositLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
