import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsReceivableSubsidiaryLedgerListComponent } from './accounts-receivable-subsidiary-ledger-list.component';

describe('AccountsReceivableSubsidiaryLedgerListComponent', () => {
  let component: AccountsReceivableSubsidiaryLedgerListComponent;
  let fixture: ComponentFixture<AccountsReceivableSubsidiaryLedgerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsReceivableSubsidiaryLedgerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsReceivableSubsidiaryLedgerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
