import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportInventoryIssuedSummaryListComponent } from './report-inventory-issued-summary-list.component';

describe('ReportInventoryIssuedSummaryListComponent', () => {
  let component: ReportInventoryIssuedSummaryListComponent;
  let fixture: ComponentFixture<ReportInventoryIssuedSummaryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportInventoryIssuedSummaryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportInventoryIssuedSummaryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
