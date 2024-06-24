import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesRevenueReportListComponent } from './sales-revenue-report-list.component';

describe('SalesRevenueReportListComponent', () => {
  let component: SalesRevenueReportListComponent;
  let fixture: ComponentFixture<SalesRevenueReportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesRevenueReportListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesRevenueReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
