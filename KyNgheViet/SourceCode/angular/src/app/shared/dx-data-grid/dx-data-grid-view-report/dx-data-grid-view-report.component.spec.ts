import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DXDataGridViewReportComponent } from './dx-data-grid-view-report.component';

describe('DXDataGridViewReportComponent', () => {
  let component: DXDataGridViewReportComponent;
  let fixture: ComponentFixture<DXDataGridViewReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DXDataGridViewReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DXDataGridViewReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
