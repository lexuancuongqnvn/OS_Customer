import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashDisbursementJournalComponent } from './cash-disbursement-journal.component';

describe('CashDisbursementJournalComponent', () => {
  let component: CashDisbursementJournalComponent;
  let fixture: ComponentFixture<CashDisbursementJournalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashDisbursementJournalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashDisbursementJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
