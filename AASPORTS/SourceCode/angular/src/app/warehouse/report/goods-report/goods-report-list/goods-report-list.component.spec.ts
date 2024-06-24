import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsReportListComponent } from './goods-report-list.component';

describe('GoodsReportListComponent', () => {
  let component: GoodsReportListComponent;
  let fixture: ComponentFixture<GoodsReportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoodsReportListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
