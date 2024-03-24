import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportInventoryIncomingSummaryListComponent } from './report-inventory-incoming-summary-list.component';

describe('ReportInventoryIncomingSummaryListComponent', () => {
  let component: ReportInventoryIncomingSummaryListComponent;
  let fixture: ComponentFixture<ReportInventoryIncomingSummaryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportInventoryIncomingSummaryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportInventoryIncomingSummaryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
