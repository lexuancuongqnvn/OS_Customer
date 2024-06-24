import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxDataGridViewReportFilterComponent } from './dx-data-grid-view-report-filter.component';

describe('DxDataGridViewReportFilterComponent', () => {
  let component: DxDataGridViewReportFilterComponent;
  let fixture: ComponentFixture<DxDataGridViewReportFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxDataGridViewReportFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxDataGridViewReportFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
