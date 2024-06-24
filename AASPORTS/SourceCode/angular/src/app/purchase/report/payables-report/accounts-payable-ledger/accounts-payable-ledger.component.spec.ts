import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsPayableLedgerComponent } from './accounts-payable-ledger.component';

describe('AccountsPayableLedgerComponent', () => {
  let component: AccountsPayableLedgerComponent;
  let fixture: ComponentFixture<AccountsPayableLedgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsPayableLedgerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsPayableLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
