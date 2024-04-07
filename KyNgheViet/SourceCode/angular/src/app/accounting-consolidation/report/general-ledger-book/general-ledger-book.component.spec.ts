import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralLedgerBookComponent } from './general-ledger-book.component';

describe('GeneralLedgerBookComponent', () => {
  let component: GeneralLedgerBookComponent;
  let fixture: ComponentFixture<GeneralLedgerBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralLedgerBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralLedgerBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
