import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchandiseGrossProfitReportListComponent } from './merchandise-gross-profit-report-list.component';

describe('MerchandiseGrossProfitReportListComponent', () => {
  let component: MerchandiseGrossProfitReportListComponent;
  let fixture: ComponentFixture<MerchandiseGrossProfitReportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchandiseGrossProfitReportListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchandiseGrossProfitReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
