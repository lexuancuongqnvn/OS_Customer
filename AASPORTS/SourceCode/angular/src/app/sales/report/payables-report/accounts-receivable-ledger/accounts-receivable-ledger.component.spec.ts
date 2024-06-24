import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsReceivableLedgerComponent } from './accounts-receivable-ledger.component';

describe('AccountsReceivableLedgerComponent', () => {
  let component: AccountsReceivableLedgerComponent;
  let fixture: ComponentFixture<AccountsReceivableLedgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsReceivableLedgerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsReceivableLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
