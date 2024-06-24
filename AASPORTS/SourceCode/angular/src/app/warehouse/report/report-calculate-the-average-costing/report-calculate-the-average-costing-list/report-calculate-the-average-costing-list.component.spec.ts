import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCalculateTheAverageCostingListComponent } from './report-calculate-the-average-costing-list.component';

describe('ReportCalculateTheAverageCostingListComponent', () => {
  let component: ReportCalculateTheAverageCostingListComponent;
  let fixture: ComponentFixture<ReportCalculateTheAverageCostingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportCalculateTheAverageCostingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCalculateTheAverageCostingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
