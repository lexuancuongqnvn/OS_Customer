import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportOfAccountsReceivableBalancesListComponent } from './report-of-accounts-receivable-balances-list.component';

describe('ReportOfAccountsReceivableBalancesListComponent', () => {
  let component: ReportOfAccountsReceivableBalancesListComponent;
  let fixture: ComponentFixture<ReportOfAccountsReceivableBalancesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportOfAccountsReceivableBalancesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportOfAccountsReceivableBalancesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
