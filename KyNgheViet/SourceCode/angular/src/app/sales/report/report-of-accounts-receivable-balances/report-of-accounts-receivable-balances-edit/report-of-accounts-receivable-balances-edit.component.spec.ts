import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportOfAccountsReceivableBalancesEditComponent } from './report-of-accounts-receivable-balances-edit.component';

describe('ReportOfAccountsReceivableBalancesEditComponent', () => {
  let component: ReportOfAccountsReceivableBalancesEditComponent;
  let fixture: ComponentFixture<ReportOfAccountsReceivableBalancesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportOfAccountsReceivableBalancesEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportOfAccountsReceivableBalancesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
