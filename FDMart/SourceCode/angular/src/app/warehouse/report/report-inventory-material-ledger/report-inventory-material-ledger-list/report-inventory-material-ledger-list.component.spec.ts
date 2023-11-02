import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportInventoryMaterialLedgerListComponent } from './report-inventory-material-ledger-list.component';

describe('ReportInventoryMaterialLedgerListComponent', () => {
  let component: ReportInventoryMaterialLedgerListComponent;
  let fixture: ComponentFixture<ReportInventoryMaterialLedgerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportInventoryMaterialLedgerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportInventoryMaterialLedgerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
