import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportGoodsImportListComponent } from './report-goods-import-list.component';

describe('ReportGoodsImportListComponent', () => {
  let component: ReportGoodsImportListComponent;
  let fixture: ComponentFixture<ReportGoodsImportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportGoodsImportListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportGoodsImportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
