import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralLedgerJournalComponent } from './general-ledger-journal.component';

describe('GeneralLedgerJournalComponent', () => {
  let component: GeneralLedgerJournalComponent;
  let fixture: ComponentFixture<GeneralLedgerJournalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralLedgerJournalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralLedgerJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
